/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */





const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');


const CRAWLER_CONFIG = {
  maxDepth: 2,                
  maxPages: 50,               
  crawlDelay: 1000,           
  visualizeInBrowser: true,   
  openEveryNthPage: 5,        
  incrementalSave: true,      
  saveEveryNPages: 10,        
  includePatterns: [          
    'purchase.edu'
  ],
  excludePatterns: [          
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
    'my.purchase.edu',        
    'apply.purchase.edu'      
  ]
};


const TEMP_FILES = {
  links: path.join(__dirname, 'temp_links.json'),
  parent_child: path.join(__dirname, 'temp_parent_child.json'),
  visited: path.join(__dirname, 'temp_visited.json')
};


function openInBrowser(url) {
  if (!CRAWLER_CONFIG.visualizeInBrowser) return;
  
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {  
    command = `open "${url}"`;
  } else if (platform === 'win32') {  
    command = `start "" "${url}"`;
  } else {  
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


function loadTempFiles() {
  const result = {
    discoveredLinks: new Map(),
    pagesVisited: new Set(),
    parentChildRelations: new Map()
  };
  
  try {
    
    if (fs.existsSync(TEMP_FILES.visited)) {
      const visitedArray = JSON.parse(fs.readFileSync(TEMP_FILES.visited, 'utf8'));
      result.pagesVisited = new Set(visitedArray);
      console.log(`Loaded ${result.pagesVisited.size} previously visited pages`);
    }
    
    
    if (fs.existsSync(TEMP_FILES.links)) {
      const linksArray = JSON.parse(fs.readFileSync(TEMP_FILES.links, 'utf8'));
      linksArray.forEach(link => {
        result.discoveredLinks.set(link.url, link);
      });
      console.log(`Loaded ${result.discoveredLinks.size} previously discovered links`);
    }
    
    
    if (fs.existsSync(TEMP_FILES.parent_child)) {
      const relationsObj = JSON.parse(fs.readFileSync(TEMP_FILES.parent_child, 'utf8'));
      Object.entries(relationsObj).forEach(([parent, children]) => {
        result.parentChildRelations.set(parent, children);
      });
      console.log(`Loaded parent-child relations for ${result.parentChildRelations.size} parents`);
    }
  } catch (e) {
    console.error(`Error loading temp files: ${e.message}`);
    
    return {
      discoveredLinks: new Map(),
      pagesVisited: new Set(),
      parentChildRelations: new Map()
    };
  }
  
  return result;
}


function saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations) {
  try {
    
    fs.writeFileSync(TEMP_FILES.visited, JSON.stringify([...pagesVisited]));
    
    
    fs.writeFileSync(TEMP_FILES.links, JSON.stringify([...discoveredLinks.values()]));
    
    
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
  
  
  let { discoveredLinks, pagesVisited, parentChildRelations } = loadTempFiles();
  const pagesToVisit = [];
  let pagesVisitedCount = pagesVisited.size;
  
  
  const homepageUrl = 'https:
  if (pagesVisited.size === 0) {
    pagesToVisit.push({
      url: homepageUrl,
      depth: 0,
      parent: null,
      parentText: null
    });
    
    
    if (CRAWLER_CONFIG.visualizeInBrowser) {
      openInBrowser(homepageUrl);
      console.log('Opening homepage in browser for visualization');
    }
  } else {
    console.log(`Resuming from previous run with ${pagesVisited.size} pages already visited`);
    
    
    for (const [parentUrl, childUrls] of parentChildRelations.entries()) {
      childUrls.forEach(childUrl => {
        if (!pagesVisited.has(childUrl)) {
          const parentData = discoveredLinks.get(parentUrl);
          pagesToVisit.push({
            url: childUrl,
            depth: parentData ? 1 : 0, 
            parent: parentUrl,
            parentText: parentData ? parentData.text : null
          });
        }
      });
    }
    
    console.log(`Added ${pagesToVisit.length} unvisited pages to the queue`);
  }
  
  
  const incrementalLinksPath = path.join(__dirname, 'purchase_edu_links_incremental.jsonl');
  if (!fs.existsSync(incrementalLinksPath)) {
    fs.writeFileSync(incrementalLinksPath, '');
  }
  
  
  const progressPath = path.join(__dirname, 'crawl_progress.txt');
  if (!fs.existsSync(progressPath) || pagesVisited.size === 0) {
    fs.writeFileSync(progressPath, 'Purchase College Link Crawling Progress\n======================================\n\n');
  } else {
    fs.appendFileSync(progressPath, '\nResuming crawl at ' + new Date().toLocaleString() + '\n\n');
  }
  
  try {
    const page = await browser.newPage();
    
    
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800 });
    
    
    while (pagesToVisit.length > 0 && pagesVisitedCount < CRAWLER_CONFIG.maxPages) {
      const currentPage = pagesToVisit.shift();
      const { url, depth, parent, parentText } = currentPage;
      
      
      if (pagesVisited.has(url)) {
        continue;
      }
      
      
      pagesVisited.add(url);
      pagesVisitedCount++;
      
      console.log(`Crawling page ${pagesVisitedCount}/${CRAWLER_CONFIG.maxPages}: ${url} (depth: ${depth})`);
      
      
      fs.appendFileSync(progressPath, `Page ${pagesVisitedCount}: ${url}\n`);
      if (parent) {
        fs.appendFileSync(progressPath, `  Parent: ${parent} (${parentText || 'Unknown'})\n`);
      }
      
      
      if (CRAWLER_CONFIG.visualizeInBrowser && pagesVisitedCount % CRAWLER_CONFIG.openEveryNthPage === 0) {
        openInBrowser(url);
      }
      
      try {
        
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });
        
        
        const isValidPage = response && response.ok();
        
        if (isValidPage) {
          
          const pageTitle = await page.title();
          
          
          const linkData = {
            url: url,
            text: pageTitle || url.split('/').pop() || url,
            parent: parent,
            parentText: parentText,
            children: []
          };
          
          
          discoveredLinks.set(url, linkData);
          
          
          fs.appendFileSync(incrementalLinksPath, JSON.stringify(linkData) + '\n');
          
          
          const pageLinks = await extractLinksFromPage(page);
          console.log(`  Found ${pageLinks.length} links on this page`);
          
          
          const filteredLinks = pageLinks.filter(link => {
            const normalizedUrl = normalizeUrl(link.url);
            return shouldCrawl(normalizedUrl) && !pagesVisited.has(normalizedUrl);
          });
          
          console.log(`  ${filteredLinks.length} links remain after filtering`);
          fs.appendFileSync(progressPath, `  Found ${pageLinks.length} links, ${filteredLinks.length} unique new links\n`);
          
          
          if (!parentChildRelations.has(url)) {
            parentChildRelations.set(url, []);
          }
          
          
          for (const link of filteredLinks) {
            const normalizedUrl = normalizeUrl(link.url);
            
            
            if (pagesVisited.has(normalizedUrl)) continue;
            
            
            const childLink = {
              url: normalizedUrl,
              text: link.text,
              parent: url,
              parentText: pageTitle || url.split('/').pop() || url,
              children: []
            };
            
            
            parentChildRelations.get(url).push(normalizedUrl);
            
            
            if (!discoveredLinks.has(normalizedUrl)) {
              discoveredLinks.set(normalizedUrl, childLink);
              
              
              fs.appendFileSync(incrementalLinksPath, JSON.stringify(childLink) + '\n');
            }
            
            
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
        
        
        await new Promise(resolve => setTimeout(resolve, CRAWLER_CONFIG.crawlDelay));
        
        
        if (CRAWLER_CONFIG.incrementalSave && pagesVisitedCount % CRAWLER_CONFIG.saveEveryNPages === 0) {
          saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
        }
        
      } catch (error) {
        console.error(`  ❌ Error processing ${url}: ${error.message}`);
        fs.appendFileSync(progressPath, `  ❌ Error: ${error.message}\n`);
      }
      
      fs.appendFileSync(progressPath, `  Completed. Queue length: ${pagesToVisit.length}\n\n`);
    }
    
    
    saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
    
    
    await generateFinalOutputs(discoveredLinks, parentChildRelations);
    
    return { 
      linkCount: discoveredLinks.size,
      visitedCount: pagesVisited.size
    };
    
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    
    
    saveTempFiles(discoveredLinks, pagesVisited, parentChildRelations);
    throw error;
  } finally {
    await browser.close();
  }
}



async function generateFinalOutputs(discoveredLinks, parentChildRelations) {
  console.log("Generating final outputs from incremental data...");
  
  
  removeChildDuplicates(parentChildRelations);
  
  
  const hierarchicalLinks = buildSimplifiedHierarchy(discoveredLinks, parentChildRelations);
  
  
  const linksArray = Array.from(discoveredLinks.values()).map(link => {
    
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
  
  
  const hierarchyOutputPath = path.join(__dirname, 'purchase_edu_links_hierarchy.json');
  fs.writeFileSync(hierarchyOutputPath, JSON.stringify(hierarchicalLinks, null, 2));
  console.log(`Hierarchical links saved to ${hierarchyOutputPath}`);
  
  
  const flatOutputPath = path.join(__dirname, 'purchase_edu_links.json');
  fs.writeFileSync(flatOutputPath, JSON.stringify(linksArray, null, 2));
  console.log(`Flat links saved to ${flatOutputPath}`);
  
  
  generateHierarchyReport(hierarchicalLinks);
  
  
  const htmlPath = path.join(__dirname, 'purchase_links_report.html');
  console.log('Opening link report in browser...');
  openInBrowser(`file:
}


function removeChildDuplicates(parentChildRelations) {
  console.log("Removing duplicate child links...");
  let totalDuplicatesRemoved = 0;
  
  parentChildRelations.forEach((children, parent) => {
    
    const uniqueChildren = Array.from(new Set(children));
    const duplicatesRemoved = children.length - uniqueChildren.length;
    
    if (duplicatesRemoved > 0) {
      totalDuplicatesRemoved += duplicatesRemoved;
      parentChildRelations.set(parent, uniqueChildren);
    }
  });
  
  console.log(`Removed ${totalDuplicatesRemoved} duplicate child links`);
}





function buildSimplifiedHierarchy(linksMap, parentChildRelations) {
  const homepage = 'https:
  
  
  const hierarchy = {
    url: homepage,
    text: linksMap.has(homepage) ? linksMap.get(homepage).text : 'Purchase College',
    children: []
  };
  
  
  function buildChildrenFor(parentUrl) {
    
    const visitedUrls = new Set();
    const queue = [{ url: parentUrl, result: [] }];
    const result = []; 
    
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
        
        
        if (!visitedUrls.has(childUrl)) {
          queue.push({ url: childUrl, result: childNode.children });
        }
      }
    }
    
    return result;
  }
  
  
  if (linksMap.has(homepage)) {
    hierarchy.children = buildChildrenFor(homepage);
  } else {
    
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

async function extractLinksFromPage(page) {
  return await page.evaluate(() => {
    const links = [];
    const linkElements = document.querySelectorAll('a[href]');
    
    linkElements.forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin).href;
        
        
        if (!url || url.startsWith('javascript:')) return;
        
        
        let text = '';
        
        
        text = link.innerText.trim();
        
        
        if (!text) {
          text = link.getAttribute('aria-label') || 
                 link.getAttribute('title') || 
                 link.textContent.trim();
        }
        
        
        if (!text) {
          const img = link.querySelector('img[alt]');
          if (img && img.alt) {
            text = img.alt.trim();
          }
        }
        
        
        if (!text) {
          text = url.split('/').pop() || url;
        }
        
        links.push({ url, text });
      } catch (e) {
        
      }
    });
    
    return links;
  });
}


function shouldCrawl(url) {
  
  const matchesInclude = CRAWLER_CONFIG.includePatterns.some(pattern => url.includes(pattern));
  if (!matchesInclude) return false;
  
  
  const matchesExclude = CRAWLER_CONFIG.excludePatterns.some(pattern => url.includes(pattern));
  return !matchesExclude;
}


function normalizeUrl(url) {
  try {
    
    const urlObj = new URL(url);
    
    
    let cleanUrl = urlObj.origin + urlObj.pathname.replace(/\/$/, '');
    
    
    if (urlObj.search) {
      cleanUrl += urlObj.search;
    }
    
    return cleanUrl;
  } catch {
    return url; 
  }
}


function generateHierarchyReport(hierarchicalLinks) {
  const reportPath = path.join(__dirname, 'purchase_links_report.txt');
  let report = "Purchase College Link Hierarchy Report\n";
  report += "=====================================\n\n";
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  
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
  
  
  createHtmlReport(hierarchicalLinks);
}


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

  
  function addNodeToHtml(rootNode) {
    
    const stack = [{ node: rootNode, level: 0, parentDiv: '#hierarchy' }];
    const processedNodes = new Set();
    
    while (stack.length > 0) {
      const { node, level, parentDiv } = stack.pop();
      
      
      const nodeId = `node-${node.url.replace(/[^a-zA-Z0-9]/g, '-')}`;
      
      
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