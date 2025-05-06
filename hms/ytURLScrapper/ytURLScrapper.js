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


async function scrapeYouTube(options = {}) {
    
    const config = {
        searchQuery: options.searchQuery || "Bethel Music",
        channelName: options.channelName || "Bethel Music",
        scrollCount: options.scrollCount || 5,
        outputFile: options.outputFile || 'youtube-results.json',
        maxResults: options.maxResults || 1000,
        headless: options.headless !== undefined ? options.headless : false,
        debug: options.debug || false,
        excludeShorts: options.excludeShorts !== undefined ? options.excludeShorts : true,
        format: options.format || 'json',
        category: options.category || '',
        playlistId: options.playlistId || '',
        rateLimit: options.rateLimit || 1000 
    };

    
    let searchUrl;
    if (config.playlistId) {
        searchUrl = `https:
        console.log(`Scraping playlist: ${config.playlistId}`);
    } else {
        
        const channelSearchQuery = `${config.searchQuery} ${config.channelName}`;
        console.log(`Searching for: "${channelSearchQuery}"`);
        searchUrl = `https:
    }

    
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36"
    ];

    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    let browser;
    try {
        
        browser = await puppeteer.launch({ 
            headless: config.headless, 
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
        });
        
        const page = await browser.newPage();
        await page.setUserAgent(randomUserAgent);
        
        
        await page.setViewport({ width: 1200, height: 800 });

        
        if (config.debug) {
            page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
        }

        console.log(`Navigating to YouTube...`);
        
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        
        await sleep(config.rateLimit);

        
        try {
            const acceptButton = await page.$('button[aria-label="Accept all"]');
            if (acceptButton) {
                console.log('Accepting cookies...');
                await acceptButton.click();
                await sleep(config.rateLimit);
            }
        } catch (e) {
            console.log('No cookie consent dialog or could not interact with it.');
        }

        
        async function autoScroll(page) {
            console.log(`Scrolling to load more videos...`);
            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    const distance = 500; 
                    const timer = setInterval(() => {
                        const scrollHeight = document.documentElement.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight || totalHeight > 10000) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 300);
                });
            });
            
            await sleep(config.rateLimit);
        }

        
        console.log('Waiting for results to load...');
        try {
            if (config.playlistId) {
                await page.waitForSelector('ytd-playlist-video-renderer', { timeout: 10000 });
                console.log('Found playlist video elements');
            } else {
                await page.waitForSelector('ytd-video-renderer, ytd-rich-item-renderer, ytd-grid-video-renderer', { timeout: 10000 });
                console.log('Found video elements on the page');
            }
        } catch (e) {
            console.log('Warning: Could not find standard video elements, but continuing...');
        }

        
        for (let i = 0; i < config.scrollCount; i++) {
            console.log(`Scroll ${i+1}/${config.scrollCount}`);
            await autoScroll(page);
            await sleep(config.rateLimit); 
        }

        
        console.log('Extracting video data...');
        const allVideos = await page.evaluate((config) => {
            const videos = [];
            
            
            let videoElements;
            if (config.playlistId) {
                videoElements = Array.from(document.querySelectorAll('ytd-playlist-video-renderer'));
            } else {
                
                videoElements = Array.from(document.querySelectorAll(`
                    ytd-video-renderer, 
                    ytd-rich-item-renderer, 
                    ytd-grid-video-renderer,
                    ytd-compact-video-renderer
                `));
            }
            
            console.log(`Found ${videoElements.length} video elements to analyze`);
            
            videoElements.forEach(video => {
                try {
                    
                    const titleElement = 
                        video.querySelector('#video-title') || 
                        video.querySelector('a#video-title-link') || 
                        video.querySelector('h3 a');
                    
                    if (!titleElement) return;
                    
                    const title = titleElement.innerText.trim();
                    const url = titleElement.href;
                    
                    if (!title || !url) return;
                    
                    
                    const isShort = url.includes('/shorts/');
                    
                    
                    const channelElement = 
                        video.querySelector('#channel-name a') || 
                        video.querySelector('#channel-info a') || 
                        video.querySelector('.ytd-channel-name a') ||
                        video.querySelector('ytd-channel-name a');
                    
                    const channel = channelElement ? channelElement.innerText.trim() : "";
                    
                    
                    const durationElement = 
                        video.querySelector('#overlays #text.ytd-thumbnail-overlay-time-status-renderer') ||
                        video.querySelector('#overlays span.ytd-thumbnail-overlay-time-status-renderer') ||
                        video.querySelector('span.ytd-thumbnail-overlay-time-status-renderer') ||
                        video.querySelector('#text.ytd-thumbnail-overlay-time-status-renderer') ||
                        video.querySelector('.ytd-thumbnail-overlay-time-status-renderer') ||
                        video.querySelector('.ytp-time-duration') ||
                        video.querySelector('[id*="time-status"]');
                    
                    const duration = durationElement ? durationElement.innerText.trim() : "Unknown";
                    
                    
                    const metaElements = Array.from(video.querySelectorAll('#metadata-line span, .ytd-video-meta-block span'));
                    const metaTexts = metaElements.map(el => el.innerText.trim()).filter(text => text);
                    
                    
                    let category = "regular";
                    const lowerTitle = title.toLowerCase();
                    
                    
                    if (lowerTitle.includes("official") && (lowerTitle.includes("video") || lowerTitle.includes("mv"))) {
                        category = "official";
                    } else if (lowerTitle.includes("live") || lowerTitle.includes("performance")) {
                        category = "live";
                    } else if (lowerTitle.includes("lyric") || lowerTitle.includes("lyrics")) {
                        category = "lyrics";
                    } else if (lowerTitle.includes("acoustic")) {
                        category = "acoustic";
                    } else if (lowerTitle.includes("cover")) {
                        category = "cover";
                    } else if (duration && parseInt(duration.split(':')[0]) > 20) {
                        
                        category = "album";
                    }
                    
                    videos.push({
                        title,
                        url,
                        channel,
                        isShort,
                        duration,
                        meta: metaTexts,
                        category
                    });
                } catch (e) {
                    console.log(`Error analyzing video: ${e.message}`);
                }
            });
            
            return videos;
        }, config);

        console.log(`Found ${allVideos.length} total videos before filtering`);
        
        
        if (config.debug) {
            console.log("Channels found:");
            const channels = [...new Set(allVideos.map(v => v.channel).filter(Boolean))];
            channels.forEach(c => console.log(`- "${c}"`));

            console.log("Categories found:");
            const categories = [...new Set(allVideos.map(v => v.category).filter(Boolean))];
            categories.forEach(c => console.log(`- "${c}"`));
        }

        
        const validVideos = allVideos.filter(video => {
            
            if (config.excludeShorts && video.isShort) {
                return false;
            }
            
            
            if (!video.url || video.url === "No URL") {
                return false;
            }
            
            
            if (config.category && video.category !== config.category) {
                return false;
            }
            
            
            if (!config.channelName || config.playlistId) {
                return true;
            }
            
            
            const videoChannel = (video.channel || "").toLowerCase();
            const targetChannel = config.channelName.toLowerCase();
            
            return videoChannel.includes(targetChannel) || targetChannel.includes(videoChannel);
        });

        console.log(`Found ${validVideos.length} videos after filtering (excluding shorts: ${config.excludeShorts}${config.category ? `, category: ${config.category}` : ''})`);
        
        
        const finalVideos = validVideos.slice(0, config.maxResults).map(video => ({
            title: video.title,
            url: video.url,
            channel: video.channel,
            duration: video.duration,
            meta: video.meta,
            category: video.category
        }));

        
        const urlsOnly = finalVideos.map(video => video.url);

        
        const baseFileName = path.parse(config.outputFile).name;
        const filePrefix = config.channelName.replace(/\s/g, '-');
        
        
        fs.writeFileSync(config.outputFile, JSON.stringify(finalVideos, null, 2));
        console.log(`Results saved to ${config.outputFile}`);

        
        const urlsFile = `${filePrefix}-urls.json`;
        fs.writeFileSync(urlsFile, JSON.stringify(urlsOnly, null, 2));
        console.log(`URLs only saved to ${urlsFile}`);
        
        
        if (config.format === 'text' || config.format === 'all') {
            const textContent = finalVideos.map(v => 
                `Title: ${v.title}\nURL: ${v.url}\nChannel: ${v.channel}\nDuration: ${v.duration}\nCategory: ${v.category}\n${v.meta.join(', ')}\n\n`
            ).join('---\n\n');
            
            const textFile = `${filePrefix}-results.txt`;
            fs.writeFileSync(textFile, textContent);
            console.log(`Text results saved to ${textFile}`);
        }
        
        
        if (config.format === 'csv' || config.format === 'all') {
            const header = 'Title,URL,Channel,Duration,Category,Views,Published\n';
            const csvRows = finalVideos.map(v => {
                
                const views = v.meta.find(m => m.includes('views')) || '';
                const published = v.meta.find(m => m.includes('ago')) || '';
                
                
                const escapeCSV = (field) => `"${(field || '').replace(/"/g, '""')}"`;
                
                return [
                    escapeCSV(v.title),
                    escapeCSV(v.url),
                    escapeCSV(v.channel),
                    escapeCSV(v.duration),
                    escapeCSV(v.category),
                    escapeCSV(views),
                    escapeCSV(published)
                ].join(',');
            }).join('\n');
            
            const csvFile = `${filePrefix}-results.csv`;
            fs.writeFileSync(csvFile, header + csvRows);
            console.log(`CSV results saved to ${csvFile}`);
        }
        
        
        await page.screenshot({ 
            path: 'youtube-search-results.png', 
            fullPage: false,
            clip: { x: 0, y: 0, width: 1280, height: 800 }
        });
        console.log("Saved screenshot to youtube-search-results.png");
        
        
        if (!config.headless) {
            console.log('Browser will stay open for 10 seconds. You can inspect the results visually.');
            await new Promise(resolve => setTimeout(resolve, 10000)); 
        }
        
        await browser.close();
        return finalVideos;
    } catch (error) {
        console.error(`Error during scraping: ${error.message}`);
        if (browser) {
            try {
                const page = (await browser.pages())[0];
                if (page) {
                    await page.screenshot({ 
                        path: 'error-screenshot.png',
                        fullPage: false
                    });
                    console.log("Saved error screenshot to error-screenshot.png");
                }
            } catch (e) {
                console.error("Could not take error screenshot:", e.message);
            }
            await browser.close();
        }
        throw error;
    }
}


function parseArgs() {
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--query' && i + 1 < args.length) {
            options.searchQuery = args[i + 1];
            i++;
        } else if (args[i] === '--channel' && i + 1 < args.length) {
            options.channelName = args[i + 1];
            i++;
        } else if (args[i] === '--scrolls' && i + 1 < args.length) {
            options.scrollCount = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--output' && i + 1 < args.length) {
            options.outputFile = args[i + 1];
            i++;
        } else if (args[i] === '--max' && i + 1 < args.length) {
            options.maxResults = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--headless') {
            options.headless = true;
        } else if (args[i] === '--visible') {
            options.headless = false;
        } else if (args[i] === '--debug') {
            options.debug = true;
        } else if (args[i] === '--include-shorts') {
            options.excludeShorts = false;
        } else if (args[i] === '--format' && i + 1 < args.length) {
            options.format = args[i + 1]; 
            i++;
        } else if (args[i] === '--category' && i + 1 < args.length) {
            options.category = args[i + 1]; 
            i++;
        } else if (args[i] === '--playlist' && i + 1 < args.length) {
            options.playlistId = args[i + 1];
            i++;
        } else if (args[i] === '--rate-limit' && i + 1 < args.length) {
            options.rateLimit = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--help') {
            console.log(`
YouTube URL Scraper - Usage:
  --query "search terms"   : What to search for on YouTube (default: "Bethel Music")
  --channel "Channel Name" : Specific channel to filter by (default: "Bethel Music")
  --scrolls N             : Number of times to scroll down (default: 5)
  --output filename.json  : Where to save full results (default: youtube-results.json)
  --max N                 : Maximum number of results to collect (default: 100)
  --headless              : Run in headless mode (no visible browser)
  --visible               : Run with visible browser (default)
  --debug                 : Show extra debug information
  --include-shorts        : Include YouTube Shorts in results (excluded by default)
  --format FORMAT         : Output format: json (default), text, csv, or all
  --category CATEGORY     : Filter by category: official, live, lyrics, acoustic, cover, album, regular
  --playlist PLAYLIST_ID  : Scrape a specific YouTube playlist instead of search results
  --rate-limit MS         : Time in milliseconds between actions (default: 1000)
  --help                  : Show this help message

Examples:
  node ytURLScrapper.js --channel "Bethel Music" --query "worship songs"
  node ytURLScrapper.js --channel "Hillsong Worship" --query "praise" --format csv
  node ytURLScrapper.js --playlist "PLiuLCKjm0v0br7H3kICC2IYDWaO9c1tBJ" --scrolls 10
  node ytURLScrapper.js --channel "Bethel Music" --category live
            `);
            process.exit(0);
        }
    }
    
    return options;
}


(async () => {
    try {
        const options = parseArgs();
        options.debug = true; 
        await scrapeYouTube(options);
    } catch (error) {
        console.error('Scraping failed:', error);
        process.exit(1);
    }
})();









