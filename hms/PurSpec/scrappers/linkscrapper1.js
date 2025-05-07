// // Save this as scrape-purchase-links.js
// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// async function scrapePurchaseLinks() {
//   console.log('Launching browser...');
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  
//   console.log('Navigating to Purchase.edu...');
//   await page.goto('https://www.purchase.edu/', {
//     waitUntil: 'networkidle2',
//     timeout: 60000
//   });
  
//   console.log('Extracting links...');
//   const links = await page.evaluate(() => {
//     const allLinks = document.querySelectorAll('a[href]');
//     const linkData = [];
    
//     allLinks.forEach(link => {
//       try {
//         const url = new URL(link.href).href;
//         if (url.includes('purchase.edu')) {
//           linkData.push({
//             url: url,
//             text: link.innerText.trim() || link.title || url
//           });
//         }
//       } catch (e) {
//         // Skip invalid URLs
//       }
//     });
    
//     return linkData;
//   });
  
//   await browser.close();
//   console.log(`Found ${links.length} links on Purchase.edu`);
  
//   // Save to JSON file
//   const outputPath = path.join(__dirname, 'purchase_edu_links.json');
//   fs.writeFileSync(outputPath, JSON.stringify(links, null, 2));
  
//   console.log(`Links saved to ${outputPath}`);
//   return links;
// }

// // Run the scraper
// scrapePurchaseLinks().catch(console.error);



const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Settings for the crawler
const CRAWLER_CONFIG = {
  maxDepth: 2,                // How deep to crawl (0 = just homepage, 1 = homepage + direct links, 2 = go one level deeper)
  maxPages: 50,               // Maximum number of pages to crawl to prevent excessive crawling
  crawlDelay: 500,            // Delay between requests in ms to avoid overwhelming the server
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
    'linkedin.com'
  ]
};

async function scrapePurchaseLinks() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",         // Use new headless mode for better performance
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  // Store discovered links
  const discoveredLinks = new Map(); // URL -> { url, text, title, valid, depth }
  const pagesVisited = new Set();
  const pagesToVisit = [];
  let pagesVisitedCount = 0;
  
  // Start with the homepage
  pagesToVisit.push({
    url: 'https://www.purchase.edu/',
    depth: 0
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a reasonable timeout and viewport
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800 });
    
    // Process pages until queue is empty or we reach limits
    while (pagesToVisit.length > 0 && pagesVisitedCount < CRAWLER_CONFIG.maxPages) {
      const currentPage = pagesToVisit.shift();
      const { url, depth } = currentPage;
      
      // Skip if we've already visited this page
      if (pagesVisited.has(url)) continue;
      
      // Mark as visited
      pagesVisited.add(url);
      pagesVisitedCount++;
      
      console.log(`Crawling page ${pagesVisitedCount}/${CRAWLER_CONFIG.maxPages}: ${url} (depth: ${depth})`);
      
      try {
        // Navigate to the page and wait until it's loaded
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });
        
        // Check if page is valid (200 status code)
        const isValidPage = response && response.ok();
        
        if (isValidPage) {
          // Extract links from the current page
          const pageLinks = await extractLinksFromPage(page);
          
          // Process each link
          for (const link of pageLinks) {
            // Normalize the URL
            const normalizedUrl = normalizeUrl(link.url);
            
            // Skip if it doesn't match our include patterns or matches exclude patterns
            if (!shouldCrawl(normalizedUrl)) continue;
            
            // Update the discovered links map
            updateDiscoveredLinks(discoveredLinks, {
              url: normalizedUrl,
              text: link.text,
              title: link.title,
              valid: true,  // We assume it's valid as we found it on a valid page
              depth: depth
            });
            
            // Add to crawling queue if we're not at max depth
            if (depth < CRAWLER_CONFIG.maxDepth && !pagesVisited.has(normalizedUrl)) {
              pagesToVisit.push({
                url: normalizedUrl,
                depth: depth + 1
              });
            }
          }
        } else {
          console.log(`  ⚠️ Invalid page: ${url}`);
        }
        
        // Add a small delay between requests to be nice to the server
        await new Promise(resolve => setTimeout(resolve, CRAWLER_CONFIG.crawlDelay));
        
      } catch (error) {
        console.error(`  ❌ Error processing ${url}: ${error.message}`);
        
        // Mark the link as invalid in our discovered links
        if (discoveredLinks.has(url)) {
          const linkData = discoveredLinks.get(url);
          linkData.valid = false;
          discoveredLinks.set(url, linkData);
        }
      }
    }
    
    // Convert Map to Array and sort by URL
    const linksArray = Array.from(discoveredLinks.values())
      .filter(link => link.valid)
      .sort((a, b) => a.url.localeCompare(b.url));
    
    console.log(`Discovered ${linksArray.length} valid links on Purchase.edu`);
    
    // Save to JSON file
    const outputPath = path.join(__dirname, 'purchase_edu_links.json');
    fs.writeFileSync(outputPath, JSON.stringify(linksArray, null, 2));
    
    console.log(`Links saved to ${outputPath}`);
    return linksArray;
    
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
    throw error;
  } finally {
    await browser.close();
  }
}

// Extract all links from the current page
async function extractLinksFromPage(page) {
  return await page.evaluate(() => {
    const links = [];
    const linkElements = document.querySelectorAll('a[href]');
    
    linkElements.forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin).href;
        const text = link.innerText.trim();
        const title = link.getAttribute('title') || '';
        
        // Skip empty URLs or javascript: links
        if (!url || url.startsWith('javascript:')) return;
        
        links.push({
          url: url,
          text: text || title || url,
          title: title
        });
      } catch (e) {
        // Skip invalid URLs
      }
    });
    
    return links;
  });
}

// Update the discovered links map
function updateDiscoveredLinks(discoveredLinks, newLink) {
  const url = newLink.url;
  
  if (discoveredLinks.has(url)) {
    // Link already exists, decide if we should update it
    const existingLink = discoveredLinks.get(url);
    
    // If the existing link is invalid but the new one is valid, update it
    if (!existingLink.valid && newLink.valid) {
      discoveredLinks.set(url, newLink);
      return;
    }
    
    // If we found a better text representation, update it
    const existingText = existingLink.text || '';
    const newText = newLink.text || '';
    
    // Better text is:
    // - Not empty when existing is empty
    // - Shorter but still descriptive (>3 chars, not just the URL)
    // - Contains spaces (likely more descriptive) when existing doesn't
    if (
      (!existingText && newText) ||
      (newText.length > 3 && newText.length < existingText.length && newText !== url) ||
      (!existingText.includes(' ') && newText.includes(' '))
    ) {
      existingLink.text = newText;
      discoveredLinks.set(url, existingLink);
    }
    
    // If new link has a title and existing doesn't, add it
    if (newLink.title && !existingLink.title) {
      existingLink.title = newLink.title;
      discoveredLinks.set(url, existingLink);
    }
  } else {
    // New link, add it to the map
    discoveredLinks.set(url, newLink);
  }
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

// Verify a link is valid by trying to access it
async function verifyLink(browser, url) {
  const page = await browser.newPage();
  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });
    return response && response.ok();
  } catch {
    return false;
  } finally {
    await page.close();
  }
}

// Post-process links to detect and clean up patterns
function postProcessLinks(links) {
  return links.map(link => {
    // Clean up text that has newlines or excessive whitespace
    link.text = link.text.replace(/\s+/g, ' ').trim();
    
    // Use title as text if text is empty or just a number/symbol
    if (!link.text || link.text.length < 2 || /^\d+$/.test(link.text)) {
      link.text = link.title || link.url;
    }
    
    return link;
  });
}

// Run the scraper
scrapePurchaseLinks()
  .then(() => console.log('Scraping completed successfully!'))
  .catch(error => console.error('Scraping failed:', error));
