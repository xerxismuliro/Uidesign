const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Settings for the crawler
const CRAWLER_CONFIG = {
  maxDepth: 2,                // How deep to crawl
  maxPages: 50,               // Maximum number of pages to crawl
  crawlDelay: 1000,           // Delay between requests in ms
  visualizeInBrowser: true,   // Open pages in system browser while crawling
  openEveryNthPage: 5,        // Open every Nth page to avoid overwhelming the system
  incrementalSave: true,      // Save links incrementally to reduce memory usage
  saveEveryNPages: 10,        // Save to disk every N pages
  includePatterns: [          // Only crawl URLs that match these patterns
    'purchase.edu'
  ],
  excludePatterns: [          // Skip URLs that match these patterns
    '/livewhale', 
    '?login', 
    '.pdf',
    '.jpg',
    '.mp4',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'youtube.com',
    'linkedin.com',
    'my.purchase.edu',        // Skip login-protected areas
    'apply.purchase.edu'      // Skip application system
  ]
};

// Paths for incremental saving
const TEMP_FILES = {
  links: path.join(__dirname, 'temp_links.json'),
  parent_child: path.join(__dirname, 'temp_parent_child.json'),
  visited: path.join(__dirname, 'temp_visited.json')
};

// Function to open URL in the default system browser
function openInBrowser(url) {
  if (!CRAWLER_CONFIG.visualizeInBrowser) return;
  
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {  // macOS
    command = `open "${url}"`;
  } else if (platform === 'win32') {  // Windows
    command = `start "" "${url}"`;
  } else {  // Linux and others
    command = `xdg-open "${url}"`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error.message}`);
    } else {
      console.log(`Opened in browser: ${url}`);
    }
  });
}

// Load data from temporary files if they exist
function loadTempFiles() {
  const result = {
    discoveredLinks: new Map(),
    pagesVisited: new Set(),
    parentChildRelations: new Map()
  };
  
  try {
    // Load visited pages
    if (fs.existsSync(TEMP_FILES.visited)) {
      const visitedArray = JSON.parse(fs.readFileSync(TEMP_FILES.visited, 'utf8'));
      result.pagesVisited = new Set(visitedArray);
      console.log(`Loaded ${result.pagesVisited.size} previously visited pages`);
    }
    
    // Load discovered links
    if (fs.existsSync(TEMP_FILES.links)) {
      const linksArray = JSON.parse(fs.readFileSync(TEMP_FILES.links, 'utf8'));
      linksArray.forEach(link => {
        result.discoveredLinks.set(link.url, link);
      });
      console.log(`Loaded ${result.discoveredLinks.size} previously discovered links`);
    }
    
    // Load parent-child relations
    if (fs.existsSync(TEMP_FILES.parent_child)) {
      const relationsObj = JSON.parse(fs.readFileSync(TEMP_FILES.parent_child, 'utf8'));
      Object.entries(relationsObj).forEach(([parent, children]) => {
        result.parentChildRelations.set(parent, children);
      });
      console.log(`Loaded parent-child relations for ${result.parentChildRelations.size} parents`);
    }
  } catch (e) {
    console.error(`Error loading temp files: ${e.message}`);
    // If there's an error, start fresh
    return {
      discoveredLinks: new Map(),
      pagesVisited: new Set(),
      parentChildRelations: new Map()
    };
  }
  
  return result;
}

// Save data to temporary files
function saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations) {
  try {
    // Save visited pages as array
    fs.writeFileSync(TEMP_FILES.visited, JSON.stringify([...pagesVisited]));
    
    // Save discovered links as array
    fs.writeFileSync(TEMP_FILES.links, JSON.stringify([...discoveredLinks.values()]));
    
    // Save parent-child relations as object
    const relationsObj = {};
    parentChildRelations.forEach((children, parent) => {
      relationsObj[parent] = children;
    });
    fs.writeFileSync(TEMP_FILES.parent_child, JSON.stringify(relationsObj));
    
    console.log(`Saved ${discoveredLinks.size} links and ${pagesVisited.size} visited pages to temp files`);
  } catch (e) {
    console.error(`Error saving temp files: ${e.message}`);
  }
}

async function scrapePurchaseLinks() {
  console.log('Launching headless browser for scraping...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Load or initialize data structures
  let { discoveredLinks, pagesVisited, parentChildRelations } = loadTempFiles();
  const pagesToVisit = [];
  let pagesVisitedCount = pagesVisited.size;
  
  // Start with the homepage if we're starting fresh
  const homepageUrl = 'https://www.purchase.edu/';
  if (pagesVisited.size === 0) {
    pagesToVisit.push({
      url: homepageUrl,
      depth: 0,
      parent: null,
      parentText: null
    });
    
    // Open the homepage in the system browser to visualize the start
    if (CRAWLER_CONFIG.visualizeInBrowser) {
      openInBrowser(homepageUrl);
      console.log('Opening homepage in browser for visualization');
    }
  } else {
    console.log(`Resuming from previous run with ${pagesVisited.size} pages already visited`);
    
    // Add unvisited children of visited pages to the queue
    for (const [parentUrl, childUrls] of parentChildRelations.entries()) {
      childUrls.forEach(childUrl => {
        if (!pagesVisited.has(childUrl)) {
          const parentData = discoveredLinks.get(parentUrl);
          pagesToVisit.push({
            url: childUrl,
            depth: parentData ? 1 : 0, // Assume 1 level deeper than parent
            parent: parentUrl,
            parentText: parentData ? parentData.text : null
          });
        }
      });
    }
    
    console.log(`Added ${pagesToVisit.length} unvisited pages to the queue`);
  }
  
  // File for incremental links (append mode)
  const incrementalLinksPath = path.join(__dirname, 'purchase_edu_links_incremental.jsonl');
  if (!fs.existsSync(incrementalLinksPath)) {
    fs.writeFileSync(incrementalLinksPath, '');
  }
  
  // Create a progress file to track crawling
  const progressPath = path.join(__dirname, 'crawl_progress.txt');
  if (!fs.existsSync(progressPath) || pagesVisited.size === 0) {
    fs.writeFileSync(progressPath, 'Purchase College Link Crawling Progress\n======================================\n\n');
  } else {
    fs.appendFileSync(progressPath, '\nResuming crawl at ' + new Date().toLocaleString() + '\n\n');
  }
  
  try {
    const page = await browser.newPage();
    
    // Set a reasonable timeout and viewport
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800 });
    
    // Process pages until queue is empty or we reach limits
    while (pagesToVisit.length > 0 && pagesVisitedCount < CRAWLER_CONFIG.maxPages) {
      const currentPage = pagesToVisit.shift();
      const { url, depth, parent, parentText } = currentPage;
      
      // Skip if already visited to prevent duplicate scraping
      if (pagesVisited.has(url)) {
        continue;
      }
      
      // Mark as visited immediately to prevent duplicates
      pagesVisited.add(url);
      pagesVisitedCount++;
      
      console.log(`Crawling page ${pagesVisitedCount}/${CRAWLER_CONFIG.maxPages}: ${url} (depth: ${depth})`);
      
      // Append to progress file
      fs.appendFileSync(progressPath, `Page ${pagesVisitedCount}: ${url}\n`);
      if (parent) {
        fs.appendFileSync(progressPath, `  Parent: ${parent} (${parentText || 'Unknown'})\n`);
      }
      
      // Open in system browser periodically for visual progress
      if (CRAWLER_CONFIG.visualizeInBrowser && pagesVisitedCount % CRAWLER_CONFIG.openEveryNthPage === 0) {
        openInBrowser(url);
      }
      
      try {
        // Navigate to the page in headless browser
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });
        
        // Check if page is valid (200 status code)
        const isValidPage = response && response.ok();
        
        if (isValidPage) {
          // Get the page title
          const pageTitle = await page.title();
          
          // Create or update the link in our map with simplified structure
          const linkData = {
            url: url,
            text: pageTitle || url.split('/').pop() || url,
            parent: parent,
            parentText: parentText,
            children: []
          };
          
          // Update in-memory storage
          discoveredLinks.set(url, linkData);
          
          // Write to incremental file immediately (one link per line)
          fs.appendFileSync(incrementalLinksPath, JSON.stringify(linkData) + '\n');
          
          // Extract links from the current page
          const pageLinks = await extractLinksFromPage(page);
          console.log(`  Found ${pageLinks.length} links on this page`);
          
          // Filter links to prevent excessive crawling
          const filteredLinks = pageLinks.filter(link => {
            const normalizedUrl = normalizeUrl(link.url);
            return shouldCrawl(normalizedUrl) && !pagesVisited.has(normalizedUrl);
          });
          
          console.log(`  ${filteredLinks.length} links remain after filtering`);
          fs.appendFileSync(progressPath, `  Found ${pageLinks.length} links, ${filteredLinks.length} unique new links\n`);
          
          // Initialize parent-child relation if needed
          if (!parentChildRelations.has(url)) {
            parentChildRelations.set(url, []);
          }
          
          // Process each link
          for (const link of filteredLinks) {
            const normalizedUrl = normalizeUrl(link.url);
            
            // Skip if we've already visited
            if (pagesVisited.has(normalizedUrl)) continue;
            
            // Add this link as a child of the current page
            const childLink = {
              url: normalizedUrl,
              text: link.text,
              parent: url,
              parentText: pageTitle || url.split('/').pop() || url,
              children: []
            };
            
            // Update parent-child relationship
            parentChildRelations.get(url).push(normalizedUrl);
            
            // Add to memory only if not already present
            if (!discoveredLinks.has(normalizedUrl)) {
              discoveredLinks.set(normalizedUrl, childLink);
              
              // Write to incremental file
              fs.appendFileSync(incrementalLinksPath, JSON.stringify(childLink) + '\n');
            }
            
            // Add to crawling queue if we're not at max depth
            if (depth < CRAWLER_CONFIG.maxDepth) {
              pagesToVisit.push({
                url: normalizedUrl,
                depth: depth + 1,
                parent: url,
                parentText: pageTitle || url.split('/').pop() || url
              });
            }
          }
        } else {
          console.log(`  ⚠️ Invalid page: ${url}`);
          fs.appendFileSync(progressPath, `  ⚠️ Invalid page (${response?.status() || 'unknown status'})\n`);
        }
        
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, CRAWLER_CONFIG.crawlDelay));
        
        // Save progress periodically to prevent data loss
        if (CRAWLER_CONFIG.incrementalSave && pagesVisitedCount % CRAWLER_CONFIG.saveEveryNPages === 0) {
          saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
        }
        
      } catch (error) {
        console.error(`  ❌ Error processing ${url}: ${error.message}`);
        fs.appendFileSync(progressPath, `  ❌ Error: ${error.message}\n`);
      }
      
      fs.appendFileSync(progressPath, `  Completed. Queue length: ${pagesToVisit.length}\n\n`);
    }
    
    // Save final state
    saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
    
    // Generate the final structured outputs
    await generateFinalOutputs(discoveredLinks, parentChildRelations);
    
    return { 
      linkCount: discoveredLinks.size,
      visitedCount: pagesVisited.size
    };
    
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    
    // Save progress on error
    saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
    throw error;
  } finally {
    await browser.close();
  }
}


// Generate final structured outputs from incremental data
async function generateFinalOutputs(discoveredLinks, parentChildRelations) {
  console.log("Generating final outputs from incremental data...");
  
  // First, remove duplicate child links from parentChildRelations
  removeChildDuplicates(parentChildRelations);
  
  // Build hierarchical structure
  const hierarchicalLinks = buildSimplifiedHierarchy(discoveredLinks, parentChildRelations);
  
  // Convert to flat array with simplified children
  const linksArray = Array.from(discoveredLinks.values()).map(link => {
    // Get children URLs from parent-child relations
    const childUrls = parentChildRelations.get(link.url) || [];
    
    return {
      url: link.url,
      text: link.text,
      parent: link.parent,
      parentText: link.parentText,
      children: childUrls.map(childUrl => {
        const child = discoveredLinks.get(childUrl);
        return child ? { url: childUrl, text: child.text } : { url: childUrl };
      })
    };
  });
  
  console.log(`Preparing to save ${linksArray.length} links`);
  
  // Save hierarchical structure
  const hierarchyOutputPath = path.join(__dirname, 'purchase_edu_links_hierarchy.json');
  fs.writeFileSync(hierarchyOutputPath, JSON.stringify(hierarchicalLinks, null, 2));
  console.log(`Hierarchical links saved to ${hierarchyOutputPath}`);
  
  // Save flat structure
  const flatOutputPath = path.join(__dirname, 'purchase_edu_links.json');
  fs.writeFileSync(flatOutputPath, JSON.stringify(linksArray, null, 2));
  console.log(`Flat links saved to ${flatOutputPath}`);
  
  // Generate human-readable report
  generateHierarchyReport(hierarchicalLinks);
  
  // Open the report in browser
  const htmlPath = path.join(__dirname, 'purchase_links_report.html');
  console.log('Opening link report in browser...');
  openInBrowser(`file://${htmlPath}`);
}

// Function to remove duplicate children from the parent-child relations
function removeChildDuplicates(parentChildRelations) {
  console.log("Removing duplicate child links...");
  let totalDuplicatesRemoved = 0;
  
  parentChildRelations.forEach((children, parent) => {
    // Use a Set to efficiently remove duplicates
    const uniqueChildren = Array.from(new Set(children));
    const duplicatesRemoved = children.length - uniqueChildren.length;
    
    if (duplicatesRemoved > 0) {
      totalDuplicatesRemoved += duplicatesRemoved;
      parentChildRelations.set(parent, uniqueChildren);
    }
  });
  
  console.log(`Removed ${totalDuplicatesRemoved} duplicate child links`);
}



// Build a simplified hierarchy for better visualization without recursion
// Fix the buildSimplifiedHierarchy function to properly initialize the result variable
function buildSimplifiedHierarchy(linksMap, parentChildRelations) {
  const homepage = 'https://www.purchase.edu/';
  
  // Create a top-level structure
  const hierarchy = {
    url: homepage,
    text: linksMap.has(homepage) ? linksMap.get(homepage).text : 'Purchase College',
    children: []
  };
  
  // Use a queue-based approach instead of recursion to avoid call stack issues
  function buildChildrenFor(parentUrl) {
    // Track visited URLs to prevent circular references
    const visitedUrls = new Set();
    const queue = [{ url: parentUrl, result: [] }];
    const result = []; // Initialize the result array here
    
    while (queue.length > 0) {
      const current = queue.shift();
      const url = current.url;
      const currentResult = current.result;
      
      if (visitedUrls.has(url)) {
        currentResult.push({ url, circular: true });
        continue;
      }
      
      visitedUrls.add(url);
      
      if (!linksMap.has(url) || !parentChildRelations.has(url)) {
        continue;
      }
      
      const parent = linksMap.get(url);
      const childUrls = parentChildRelations.get(url) || [];
      
      for (const childUrl of childUrls) {
        if (!linksMap.has(childUrl)) {
          currentResult.push({ url: childUrl, missing: true });
          continue;
        }
        
        const child = linksMap.get(childUrl);
        const childNode = {
          url: childUrl,
          text: child.text,
          parent: url,
          parentText: parent.text,
          children: []
        };
        
        currentResult.push(childNode);
        
        // Only process this child's children if not already visited
        if (!visitedUrls.has(childUrl)) {
          queue.push({ url: childUrl, result: childNode.children });
        }
      }
    }
    
    return result;
  }
  
  // Build the hierarchy starting from homepage
  if (linksMap.has(homepage)) {
    hierarchy.children = buildChildrenFor(homepage);
  } else {
    // If homepage wasn't found, find top-level entries
    for (const [url, link] of linksMap.entries()) {
      if (!link.parent) {
        const children = buildChildrenFor(url);
        hierarchy.children.push({
          url: url,
          text: link.text,
          children: children
        });
      }
    }
  }
  
  return hierarchy;
}
// Extract links from the current page
async function extractLinksFromPage(page) {
  return await page.evaluate(() => {
    const links = [];
    const linkElements = document.querySelectorAll('a[href]');
    
    linkElements.forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin).href;
        
        // Skip empty URLs or javascript: links
        if (!url || url.startsWith('javascript:')) return;
        
        // Get the best text for this link
        let text = '';
        
        // Check for innerText first
        text = link.innerText.trim();
        
        // If empty, try aria-label or title
        if (!text) {
          text = link.getAttribute('aria-label') || 
                 link.getAttribute('title') || 
                 link.textContent.trim();
        }
        
        // If still empty, try image alt text
        if (!text) {
          const img = link.querySelector('img[alt]');
          if (img && img.alt) {
            text = img.alt.trim();
          }
        }
        
        // If still empty, use URL
        if (!text) {
          text = url.split('/').pop() || url;
        }
        
        links.push({ url, text });
      } catch (e) {
        // Skip invalid URLs
      }
    });
    
    return links;
  });
}

// Check if a URL should be crawled
function shouldCrawl(url) {
  // Must match at least one include pattern
  const matchesInclude = CRAWLER_CONFIG.includePatterns.some(pattern => url.includes(pattern));
  if (!matchesInclude) return false;
  
  // Must not match any exclude pattern
  const matchesExclude = CRAWLER_CONFIG.excludePatterns.some(pattern => url.includes(pattern));
  return !matchesExclude;
}

// Normalize a URL to prevent duplicates
function normalizeUrl(url) {
  try {
    // Create URL object to standardize the format
    const urlObj = new URL(url);
    
    // Remove trailing slash if present
    let cleanUrl = urlObj.origin + urlObj.pathname.replace(/\/$/, '');
    
    // Add back search params if they exist
    if (urlObj.search) {
      cleanUrl += urlObj.search;
    }
    
    return cleanUrl;
  } catch {
    return url; // Return original if parsing fails
  }
}

// Generate a human-readable report
function generateHierarchyReport(hierarchicalLinks) {
  const reportPath = path.join(__dirname, 'purchase_links_report.txt');
  let report = "Purchase College Link Hierarchy Report\n";
  report += "=====================================\n\n";
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  // Non-recursive approach to building the report
  function addNodeToReport(node, level = 0) {
    const queue = [{ node, level }];
    
    while (queue.length > 0) {
      const { node, level } = queue.shift();
      const indent = '  '.repeat(level);
      
      report += `${indent}${node.text || node.url}\n`;
      report += `${indent}URL: ${node.url}\n`;
      
      if (node.circular) {
        report += `${indent}[Circular reference]\n`;
        continue;
      }
      
      if (node.missing) {
        report += `${indent}[Not crawled]\n`;
        continue;
      }
      
      if (node.parent) {
        report += `${indent}Parent: ${node.parent} (${node.parentText || 'Unknown'})\n`;
      }
      
      if (node.children && node.children.length > 0) {
        report += `${indent}Children (${node.children.length}):\n`;
        
        // Process only a limited number of children to keep the report manageable
        const maxChildrenToShow = 10;
        const shownChildren = node.children.slice(0, maxChildrenToShow);
        
        for (let i = 0; i < shownChildren.length; i++) {
          queue.push({ node: shownChildren[i], level: level + 1 });
        }
        
        if (node.children.length > maxChildrenToShow) {
          report += `${indent}  ... and ${node.children.length - maxChildrenToShow} more children\n`;
        }
      } else {
        report += `${indent}[No children]\n`;
      }
      
      report += '\n';
    }
  }
  
  addNodeToReport(hierarchicalLinks);
  
  fs.writeFileSync(reportPath, report);
  console.log(`Human-readable report saved to ${reportPath}`);
  
  // Also create an HTML version for better visualization
  createHtmlReport(hierarchicalLinks);
}

// Create an HTML version of the report
function createHtmlReport(hierarchicalLinks) {
  const htmlPath = path.join(__dirname, 'purchase_links_report.html');
  
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase College Link Hierarchy</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
    h1 { color: #036; }
    .node { margin-bottom: 10px; border-left: 2px solid #ccc; padding-left: 10px; }
    .node-content { margin-bottom: 5px; }
    .url { color: #06c; word-break: break-all; }
    .parent { color: #666; font-size: 0.9em; }
    .children { margin-left: 20px; }
    .circular { color: #c00; font-style: italic; }
    .missing { color: #999; font-style: italic; }
    .toggle { cursor: pointer; color: #666; user-select: none; }
    .toggle:hover { color: #000; }
    .hidden { display: none; }
    .controls { position: fixed; top: 10px; right: 10px; background: #f0f0f0; padding: 10px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <h1>Purchase College Link Hierarchy</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  
  <div class="controls">
    <button onclick="expandAll()">Expand All</button>
    <button onclick="collapseAll()">Collapse All</button>
  </div>
  
  <div id="hierarchy">
`;

  // Non-recursive HTML generation
  function addNodeToHtml(rootNode) {
    // Use a stack-based approach
    const stack = [{ node: rootNode, level: 0, parentDiv: '#hierarchy' }];
    const processedNodes = new Set();
    
    while (stack.length > 0) {
      const { node, level, parentDiv } = stack.pop();
      
      // Create a unique ID for this node
      const nodeId = `node-${node.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
      
      // Check if we've seen this node before (circular reference)
      const isCircular = processedNodes.has(node.url);
      if (isCircular && node.url !== rootNode.url) {
        html += `<div class="node" style="margin-left: ${level * 20}px">`;
        html += `<div class="node-content">`;
        html += `<strong>${escapeHtml(node.text || node.url)}</strong><br>`;
        html += `<span class="url">${escapeHtml(node.url)}</span>`;
        html += `<br><span class="circular">[Circular reference]</span>`;
        html += `</div></div>`;
        continue;
      }
      
      processedNodes.add(node.url);
      
      html += `<div id="${nodeId}" class="node" style="margin-left: ${level * 20}px">`;
      html += `<div class="node-content">`;
      
      // Add toggle if has children
      if (node.children && node.children.length > 0) {
        html += `<span class="toggle" onclick="toggleChildren('${nodeId}-children')">[-]</span> `;
      }
      
      html += `<strong>${escapeHtml(node.text || node.url)}</strong><br>`;
      html += `<span class="url"><a href="${escapeHtml(node.url)}" target="_blank">${escapeHtml(node.url)}</a></span>`;
      
      if (node.missing) {
        html += `<br><span class="missing">[Not crawled]</span>`;
      } else if (node.parent) {
        html += `<br><span class="parent">Parent: ${escapeHtml(node.parentText || 'Unknown')}</span>`;
      }
      
      html += `</div>`;
      
      if (node.children && node.children.length > 0) {
        html += `<div id="${nodeId}-children" class="children">`;
        
        // Push children onto stack in reverse order so they get processed in the right order
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ 
            node: node.children[i], 
            level: level + 1,
            parentDiv: `${nodeId}-children`
          });
        }
        
        html += `</div>`;
      }
      
      html += `</div>`;
    }
  }
  
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  addNodeToHtml(hierarchicalLinks);
  
  html += `
  </div>
  <script>
    function toggleChildren(id) {
      const childrenDiv = document.getElementById(id);
      const toggle = childrenDiv.previousElementSibling.querySelector('.toggle');
      
      if (childrenDiv.classList.contains('hidden')) {
        childrenDiv.classList.remove('hidden');
        toggle.textContent = '[-]';
      } else {
        childrenDiv.classList.add('hidden');
        toggle.textContent = '[+]';
      }
    }
    
    function expandAll() {
      document.querySelectorAll('.children').forEach(div => {
        div.classList.remove('hidden');
      });
      document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.textContent = '[-]';
      });
    }
    
    function collapseAll() {
      document.querySelectorAll('.children').forEach(div => {
        div.classList.add('hidden');
      });
      document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.textContent = '[+]';
      });
    }
  </script>
</body>
</html>
  `;
  
  fs.writeFileSync(htmlPath, html);
  console.log(`HTML report saved to ${htmlPath}`);
}

// Run the scraper
console.log("Starting Purchase College link scraper with memory optimization");
console.log(`Will visit up to ${CRAWLER_CONFIG.maxPages} pages with maximum depth of ${CRAWLER_CONFIG.maxDepth}`);
console.log(`Using incremental saving every ${CRAWLER_CONFIG.saveEveryNPages} pages to reduce memory usage`);

if (CRAWLER_CONFIG.visualizeInBrowser) {
  console.log(`Opening browser visualization for every ${CRAWLER_CONFIG.openEveryNthPage} pages`);
}

scrapePurchaseLinks()
  .then(results => {
    console.log('Scraping completed successfully!');
    console.log(`Processed ${results.visitedCount} pages and found ${results.linkCount} links`);
  })
  .catch(error => console.error('Scraping failed:', error));