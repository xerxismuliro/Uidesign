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


const CRAWLER_CONFIG = {
  maxDepth: 2,                
  maxPages: 50,               
  crawlDelay: 500,            
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
    'linkedin.com'
  ]
};

async function scrapePurchaseLinks() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: "new",         
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  
  const discoveredLinks = new Map(); 
  const pagesVisited = new Set();
  const pagesToVisit = [];
  let pagesVisitedCount = 0;
  
  
  pagesToVisit.push({
    url: 'https:
    depth: 0
  });
  
  try {
    const page = await browser.newPage();
    
    
    page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1280, height: 800 });
    
    
    while (pagesToVisit.length > 0 && pagesVisitedCount < CRAWLER_CONFIG.maxPages) {
      const currentPage = pagesToVisit.shift();
      const { url, depth } = currentPage;
      
      
      if (pagesVisited.has(url)) continue;
      
      
      pagesVisited.add(url);
      pagesVisitedCount++;
      
      console.log(`Crawling page ${pagesVisitedCount}/${CRAWLER_CONFIG.maxPages}: ${url} (depth: ${depth})`);
      
      try {
        
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });
        
        
        const isValidPage = response && response.ok();
        
        if (isValidPage) {
          
          const pageLinks = await extractLinksFromPage(page);
          
          
          for (const link of pageLinks) {
            
            const normalizedUrl = normalizeUrl(link.url);
            
            
            if (!shouldCrawl(normalizedUrl)) continue;
            
            
            updateDiscoveredLinks(discoveredLinks, {
              url: normalizedUrl,
              text: link.text,
              title: link.title,
              valid: true,  
              depth: depth
            });
            
            
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
        
        
        await new Promise(resolve => setTimeout(resolve, CRAWLER_CONFIG.crawlDelay));
        
      } catch (error) {
        console.error(`  ❌ Error processing ${url}: ${error.message}`);
        
        
        if (discoveredLinks.has(url)) {
          const linkData = discoveredLinks.get(url);
          linkData.valid = false;
          discoveredLinks.set(url, linkData);
        }
      }
    }
    
    
    const linksArray = Array.from(discoveredLinks.values())
      .filter(link => link.valid)
      .sort((a, b) => a.url.localeCompare(b.url));
    
    console.log(`Discovered ${linksArray.length} valid links on Purchase.edu`);
    
    
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


async function extractLinksFromPage(page) {
  return await page.evaluate(() => {
    const links = [];
    const linkElements = document.querySelectorAll('a[href]');
    
    linkElements.forEach(link => {
      try {
        const url = new URL(link.href, window.location.origin).href;
        const text = link.innerText.trim();
        const title = link.getAttribute('title') || '';
        
        
        if (!url || url.startsWith('javascript:')) return;
        
        links.push({
          url: url,
          text: text || title || url,
          title: title
        });
      } catch (e) {
        
      }
    });
    
    return links;
  });
}


function updateDiscoveredLinks(discoveredLinks, newLink) {
  const url = newLink.url;
  
  if (discoveredLinks.has(url)) {
    
    const existingLink = discoveredLinks.get(url);
    
    
    if (!existingLink.valid && newLink.valid) {
      discoveredLinks.set(url, newLink);
      return;
    }
    
    
    const existingText = existingLink.text || '';
    const newText = newLink.text || '';
    
    
    
    
    
    if (
      (!existingText && newText) ||
      (newText.length > 3 && newText.length < existingText.length && newText !== url) ||
      (!existingText.includes(' ') && newText.includes(' '))
    ) {
      existingLink.text = newText;
      discoveredLinks.set(url, existingLink);
    }
    
    
    if (newLink.title && !existingLink.title) {
      existingLink.title = newLink.title;
      discoveredLinks.set(url, existingLink);
    }
  } else {
    
    discoveredLinks.set(url, newLink);
  }
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


function postProcessLinks(links) {
  return links.map(link => {
    
    link.text = link.text.replace(/\s+/g, ' ').trim();
    
    
    if (!link.text || link.text.length < 2 || /^\d+$/.test(link.text)) {
      link.text = link.title || link.url;
    }
    
    return link;
  });
}


scrapePurchaseLinks()
  .then(() => console.log('Scraping completed successfully!'))
  .catch(error => console.error('Scraping failed:', error));
