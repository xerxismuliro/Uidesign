
// WEBSITE NAVIGATION
function navigateToWebsite(website) {
    // Clean up website input
    website = formatWebsiteUrl(website);
    
    // Special cleanup for Purchase.edu URLs
    if (website.includes('purchase.edu')) {
        website = cleanupPurchaseUrl(website);
    }
    
    // Check if it's a known site that blocks framing
    if (isKnownFrameBlockingSite(website)) {
        // For known frame-blocking sites, open in new tab directly
        openInNewTab(website);
        return;
    }

    // Create browser UI elements
    const browserUI = createBrowserUI(website);
    
    // Hide all sections first
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Create and add the new section
    const tempSection = createNavigationSection(website, browserUI);
    document.querySelector('.content').appendChild(tempSection);
    
    // Setup iframe and browser controls
    setTimeout(() => {
        setupIframeAndControls(website);
    }, 100);
    
    // Add to history
    addToHistory(website);
}

// Special cleanup function for Purchase.edu URLs
function cleanupPurchaseUrl(url) {
    try {
        // Parse the URL to work with its components
        const urlObj = new URL(url);
        
        // Check if this is a Purchase.edu domain
        if (!urlObj.hostname.includes('purchase.edu')) {
            return url;
        }
        
        let path = urlObj.pathname;
        
        // Remove .com suffix from the path if present
        if (path.endsWith('.com')) {
            console.log(`Removing .com suffix from Purchase URL path: ${path}`);
            path = path.slice(0, -4);
            urlObj.pathname = path;
        }
        
        // Check for any path segments ending with .com
        const segments = path.split('/').filter(segment => segment.length > 0);
        if (segments.length > 0) {
            let pathModified = false;
            
            // Check each segment for a .com ending
            const cleanedSegments = segments.map(segment => {
                if (segment.endsWith('.com')) {
                    pathModified = true;
                    return segment.slice(0, -4);
                }
                return segment;
            });
            
            // If we made changes, rebuild the path
            if (pathModified) {
                path = '/' + cleanedSegments.join('/');
                if (!path.endsWith('/') && !path.includes('.')) {
                    path += '/'; // Add trailing slash for directory paths
                }
                urlObj.pathname = path;
            }
        }
        
        // Ensure proper trailing slashes for directories
        if (!path.endsWith('/') && !path.includes('.')) {
            urlObj.pathname = path + '/';
        }
        
        // Remove any ?scrape=links or similar parameters
        if (urlObj.searchParams.has('scrape')) {
            urlObj.searchParams.delete('scrape');
        }
        
        // Log the cleanup
        const cleanedUrl = urlObj.toString();
        if (cleanedUrl !== url) {
            console.log(`Purchase URL cleaned: ${url} → ${cleanedUrl}`);
        }
        
        return cleanedUrl;
    } catch (e) {
        console.error('Error cleaning Purchase URL:', e);
        return url;
    }
}

// Add to your existing isKnownFrameBlockingSite function
function isKnownFrameBlockingSite(website) {
    const url = new URL(website);
    const hostname = url.hostname.toLowerCase();
    
    // List of domains known to use X-Frame-Options: SAMEORIGIN or CSP frame-ancestors
    const framingBlockedDomains = [
        'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'instagram.com',
        'linkedin.com', 'amazon.com', 'netflix.com', 'apple.com', 'microsoft.com',
        'github.com', 'stackoverflow.com', 'reddit.com', 'nytimes.com', 'wsj.com',
        'cnn.com', 'bbc.com', 'shopify.com', 'ebay.com', 'zoom.us', 'dropbox.com',
        'paypal.com', 'chase.com', 'bankofamerica.com', 'wellsfargo.com',
        'hilcodigital.com', 'purchase.edu'  // Add purchase.edu to the blocked domains
    ];
    
    // Check if the domain or any parent domain is in the list
    return framingBlockedDomains.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain));
}

// function openInNewTab(website) {
//     // Open the website in a new tab
//     const newTab = window.open(website, '_blank');
    
//     // If popup was blocked, show a message
//     if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
//         alert(`Popup blocked! Please allow popups for ${window.location.hostname} to open websites directly.`);
        
//         // As a fallback, create a click-to-open UI
//         createDirectLinkUI(website);
//     } else {
//         // Still add to history even though we opened in new tab
//         addToHistory(website);
        
//         // Show a brief confirmation
//         showOpenedConfirmation(website);
//     }
// }


function openInNewTab(website) {
    // Add debugging to track what's happening
    console.log(`Opening in new tab: ${website}`);
    
    // Open the website in a new tab
    const newTab = window.open(website, '_blank');
    
    // If popup was blocked, show a message
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        console.log('Popup was blocked or failed to open');
        alert(`Popup blocked! Please allow popups for ${window.location.hostname} to open websites directly.`);
        
        // As a fallback, create a click-to-open UI
        createDirectLinkUI(website);
    } else {
        console.log('Successfully opened in new tab');
        // Still add to history even though we opened in new tab
        addToHistory(website);
        
        // Show a brief confirmation
        showOpenedConfirmation(website);
    }
}



function createDirectLinkUI(website) {
    const hostname = new URL(website).hostname;
    
    // Create browser UI
    const directLinkUI = `
        <div class="browser-simulation">
            <div class="browser-toolbar">
                <div class="browser-actions">
                    <i class="fas fa-home" id="browser-home"></i>
                </div>
                <div class="browser-address-bar">
                    <i class="fas fa-lock"></i>
                    <span>${website}</span>
                </div>
            </div>
            <div class="browser-content direct-link-container">
                <div class="direct-link-message">
                    <i class="fas fa-external-link-alt"></i>
                    <h3>External Website</h3>
                    <p>The website <strong>${hostname}</strong> needs to be opened in a new window.</p>
                    <p>Click the button below to open it:</p>
                    <a href="${website}" target="_blank" class="primary-button">
                        <i class="fas fa-external-link-alt"></i> Open ${hostname}
                    </a>
                    <p class="small-note">Note: This website uses security features that prevent it from being displayed in our browser frame.</p>
                </div>
            </div>
        </div>
    `;
    
    // Hide all sections first
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Create new section
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h3><i class="fas fa-globe"></i> External Link: ${hostname}</h3>` + directLinkUI;
    
    // Remove any existing navigation-result section
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    // Add to the content area
    document.querySelector('.content').appendChild(tempSection);
    
    // Add event listener for the home button
    setTimeout(() => {
        const homeButton = document.getElementById('browser-home');
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                showSection('default');
            });
        }
    }, 100);
    
    // Add to history
    addToHistory(website);
}

function showOpenedConfirmation(website) {
    const hostname = new URL(website).hostname;
    
    // Create confirmation UI
    const confirmationUI = `
        <div class="browser-simulation">
            <div class="browser-toolbar">
                <div class="browser-actions">
                    <i class="fas fa-home" id="browser-home"></i>
                </div>
                <div class="browser-address-bar">
                    <i class="fas fa-lock"></i>
                    <span>${website}</span>
                </div>
            </div>
            <div class="browser-content confirmation-container">
                <div class="opened-confirmation">
                    <i class="fas fa-check-circle"></i>
                    <h3>Website Opened</h3>
                    <p><strong>${hostname}</strong> has been opened in a new tab.</p>
                    <p>If you don't see it, check your browser's tab bar or popup blocker settings.</p>
                    <div class="confirmation-actions">
                        <button id="return-home" class="secondary-button">
                            <i class="fas fa-home"></i> Return Home
                        </button>
                        <a href="${website}" target="_blank" class="primary-button">
                            <i class="fas fa-external-link-alt"></i> Open Again
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Hide all sections first
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Create new section
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h2><i class="fas fa-globe"></i> External Link: ${hostname}</h2>` + confirmationUI;
    
    // Remove any existing navigation-result section
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    // Add to the content area
    document.querySelector('.content').appendChild(tempSection);
    
    // Add event listeners
    setTimeout(() => {
        const homeButton = document.getElementById('browser-home');
        const returnHomeButton = document.getElementById('return-home');
        
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                showSection('default');
            });
        }
        
        if (returnHomeButton) {
            returnHomeButton.addEventListener('click', () => {
                showSection('default');
            });
        }
    }, 100);
}

function formatWebsiteUrl(website) {
    website = website.trim().toLowerCase();
    
    // Add http:// prefix if missing
    if (!website.startsWith('http://') && !website.startsWith('https://')) {
        website = 'https://' + website;
    }
    
    // Add .com if no TLD is specified - but NOT for Purchase.edu URLs
    if (!website.match(/\.[a-z]{2,}$/i) && !website.includes('purchase.edu')) {
        website = website + '.com';
    }
    
    return website;
}

function createBrowserUI(website) {
    return `
        <div class="browser-simulation">
            <div class="browser-toolbar">
                <div class="browser-actions">
                    <i class="fas fa-arrow-left" id="browser-back"></i>
                    <i class="fas fa-arrow-right" id="browser-forward"></i>
                    <i class="fas fa-redo" id="browser-reload"></i>
                    <i class="fas fa-home" id="browser-home"></i>
                </div>
                <div class="browser-address-bar">
                    <i class="fas fa-lock"></i>
                    <span>${website}</span>
                </div>
                <div class="browser-actions-right">
                    <i class="fas fa-external-link-alt" id="open-external"></i>
                </div>
            </div>
            <div class="browser-content">
                <div class="loading-message" id="loading-message">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading ${website}...</p>
                </div>
                <iframe 
                    id="website-frame" 
                    src="${website}" 
                    style="width:100%; height:500px; border:none; display:none;" 
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    scrolling="yes"
                ></iframe>
                <div id="fallback-message" style="display:none;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Unable to load this website in the frame</h3>
                    <p>Many websites prevent being loaded in frames for security reasons.</p>
                    <p>You can visit the website directly by clicking the button below:</p>
                    <a href="${website}" target="_blank" class="external-link-button">
                        <i class="fas fa-external-link-alt"></i> Open ${new URL(website).hostname} in a new tab
                    </a>
                </div>
            </div>
        </div>
    `;
}

function createNavigationSection(website, browserUI) {
    // Remove any existing navigation-result section
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    // Create new section
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h2><i class="fas fa-globe"></i> Browsing: ${new URL(website).hostname}</h2>` + browserUI;
    
    return tempSection;
}