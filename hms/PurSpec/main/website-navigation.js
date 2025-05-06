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







function navigateToWebsite(website) {
    
    website = formatWebsiteUrl(website);
    
    
    if (website.includes('purchase.edu')) {
        website = cleanupPurchaseUrl(website);
    }
    
    
    if (isKnownFrameBlockingSite(website)) {
        
        openInNewTab(website);
        return;
    }

    
    const browserUI = createBrowserUI(website);
    
    
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    
    const tempSection = createNavigationSection(website, browserUI);
    document.querySelector('.content').appendChild(tempSection);
    
    
    setTimeout(() => {
        setupIframeAndControls(website);
    }, 100);
    
    
    addToHistory(website);
}


function cleanupPurchaseUrl(url) {
    try {
        
        const urlObj = new URL(url);
        
        
        if (!urlObj.hostname.includes('purchase.edu')) {
            return url;
        }
        
        let path = urlObj.pathname;
        
        
        if (path.endsWith('.com')) {
            console.log(`Removing .com suffix from Purchase URL path: ${path}`);
            path = path.slice(0, -4);
            urlObj.pathname = path;
        }
        
        
        const segments = path.split('/').filter(segment => segment.length > 0);
        if (segments.length > 0) {
            let pathModified = false;
            
            
            const cleanedSegments = segments.map(segment => {
                if (segment.endsWith('.com')) {
                    pathModified = true;
                    return segment.slice(0, -4);
                }
                return segment;
            });
            
            
            if (pathModified) {
                path = '/' + cleanedSegments.join('/');
                if (!path.endsWith('/') && !path.includes('.')) {
                    path += '/'; 
                }
                urlObj.pathname = path;
            }
        }
        
        
        if (!path.endsWith('/') && !path.includes('.')) {
            urlObj.pathname = path + '/';
        }
        
        
        if (urlObj.searchParams.has('scrape')) {
            urlObj.searchParams.delete('scrape');
        }
        
        
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


function isKnownFrameBlockingSite(website) {
    const url = new URL(website);
    const hostname = url.hostname.toLowerCase();
    
    
    const framingBlockedDomains = [
        'google.com', 'youtube.com', 'facebook.com', 'twitter.com', 'instagram.com',
        'linkedin.com', 'amazon.com', 'netflix.com', 'apple.com', 'microsoft.com',
        'github.com', 'stackoverflow.com', 'reddit.com', 'nytimes.com', 'wsj.com',
        'cnn.com', 'bbc.com', 'shopify.com', 'ebay.com', 'zoom.us', 'dropbox.com',
        'paypal.com', 'chase.com', 'bankofamerica.com', 'wellsfargo.com',
        'hilcodigital.com', 'purchase.edu'  
    ];
    
    
    return framingBlockedDomains.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain));
}




    



        





        






function openInNewTab(website) {
    
    console.log(`Opening in new tab: ${website}`);
    
    
    const newTab = window.open(website, '_blank');
    
    
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        console.log('Popup was blocked or failed to open');
        alert(`Popup blocked! Please allow popups for ${window.location.hostname} to open websites directly.`);
        
        
        createDirectLinkUI(website);
    } else {
        console.log('Successfully opened in new tab');
        
        addToHistory(website);
        
        
        showOpenedConfirmation(website);
    }
}



function createDirectLinkUI(website) {
    const hostname = new URL(website).hostname;
    
    
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
    
    
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h3><i class="fas fa-globe"></i> External Link: ${hostname}</h3>` + directLinkUI;
    
    
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    
    document.querySelector('.content').appendChild(tempSection);
    
    
    setTimeout(() => {
        const homeButton = document.getElementById('browser-home');
        if (homeButton) {
            homeButton.addEventListener('click', () => {
                showSection('default');
            });
        }
    }, 100);
    
    
    addToHistory(website);
}

function showOpenedConfirmation(website) {
    const hostname = new URL(website).hostname;
    
    
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
    
    
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h2><i class="fas fa-globe"></i> External Link: ${hostname}</h2>` + confirmationUI;
    
    
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    
    document.querySelector('.content').appendChild(tempSection);
    
    
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
    
    
    if (!website.startsWith('http:
        website = 'https:
    }
    
    
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
    
    const existingNavResult = document.getElementById('navigation-result');
    if (existingNavResult) {
        existingNavResult.remove();
    }
    
    
    const tempSection = document.createElement('div');
    tempSection.className = 'content-section active';
    tempSection.id = 'navigation-result';
    tempSection.innerHTML = `<h2><i class="fas fa-globe"></i> Browsing: ${new URL(website).hostname}</h2>` + browserUI;
    
    return tempSection;
}