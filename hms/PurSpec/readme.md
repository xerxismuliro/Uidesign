# Creating a Simple Link Scraper and JSON Generator for Purchase.edu

I'll create a simplified version that scrapes links from Purchase.edu and writes them to a JSON file. This script can be run directly in the browser console to avoid CORS issues.

## Console Script to Run on Purchase.edu

```javascript
// Purchase.edu Link Scraper to JSON
javascript:(function() {
    // Find all links on the page
    const links = document.querySelectorAll('a[href]');
    const linkData = [];
    
    // Process links
    links.forEach(link => {
        try {
            // Get absolute URL
            const url = new URL(link.href, window.location.origin).href;
            
            // Only include purchase.edu links
            if (url.includes('purchase.edu')) {
                // Get link text or fallback to URL
                const text = link.innerText.trim() || link.title || url;
                
                linkData.push({
                    url: url,
                    text: text
                });
            }
        } catch (e) {
            // Skip invalid URLs
        }
    });
    
    // Convert to JSON string with nice formatting
    const jsonData = JSON.stringify(linkData, null, 2);
    
    // Create a download link for the JSON file
    const blob = new Blob([jsonData], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'purchase_edu_links.json';
    
    // Add to body, click it, then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Also output to console for copy-paste
    console.log('PURCHASE.EDU LINKS JSON:');
    console.log(jsonData);
    console.log(`Successfully scraped ${linkData.length} links. JSON file download should start automatically.`);
})();
```

## How to Use This Script

1. Visit https://www.purchase.edu/ in your browser
2. Open the browser console (F12 or Ctrl+Shift+J in Chrome/Firefox)
3. Copy and paste the above script into the console and press Enter
4. The script will automatically download a `purchase_edu_links.json` file
5. The JSON is also output to the console for easy copy-pasting



## Alternative: Node.js Script to Extract Links
If you prefer to run this on your local machine instead of in the browser, here's a Node.js script that uses Puppeteer to scrape the links and save them to a file:

```javascript
// Save this as scrape-purchase-links.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapePurchaseLinks() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to Purchase.edu...');
  await page.goto('https://www.purchase.edu/', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  
  console.log('Extracting links...');
  const links = await page.evaluate(() => {
    const allLinks = document.querySelectorAll('a[href]');
    const linkData = [];
    
    allLinks.forEach(link => {
      try {
        const url = new URL(link.href).href;
        if (url.includes('purchase.edu')) {
          linkData.push({
            url: url,
            text: link.innerText.trim() || link.title || url
          });
        }
      } catch (e) {
        // Skip invalid URLs
      }
    });
    
    return linkData;
  });
  
  await browser.close();
  console.log(`Found ${links.length} links on Purchase.edu`);
  
  // Save to JSON file
  const outputPath = path.join(__dirname, 'purchase_edu_links.json');
  fs.writeFileSync(outputPath, JSON.stringify(links, null, 2));
  
  console.log(`Links saved to ${outputPath}`);
  return links;
}

// Run the scraper
scrapePurchaseLinks().catch(console.error);
```

To use this Node.js script:
1. Make sure you have Node.js installed
2. Install puppeteer: `npm install puppeteer`
3. Run the script: `node scrape-purchase-links.js`
4. It will create a `purchase_edu_links.json` file in the same directory

## Sample JSON Output Format

The JSON file will look something like this:

```json
[
  {
    "url": "https://www.purchase.edu/",
    "text": "Home"
  },
  {
    "url": "https://www.purchase.edu/admissions/",
    "text": "Admissions"
  },
  {
    "url": "https://www.purchase.edu/academics/",
    "text": "Academics"
  },
  {
    "url": "https://www.purchase.edu/campus-life/",
    "text": "Campus Life"
  }
]
```
