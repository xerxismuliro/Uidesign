// IFRAME CONTROLS
function setupIframeAndControls(website) {
    const iframe = document.getElementById('website-frame');
    const loadingMessage = document.getElementById('loading-message');
    const fallbackMessage = document.getElementById('fallback-message');
    
    if (!iframe) return;
    
    // Setup iframe event handlers
    setupIframeEvents(iframe, loadingMessage, fallbackMessage, website);
    
    // Setup timeout for iframe loading
    setupIframeLoadingTimeout(iframe, loadingMessage, fallbackMessage);
    
    // Setup browser control buttons
    setupBrowserControls(iframe, website);
}

function setupIframeEvents(iframe, loadingMessage, fallbackMessage, website) {
    // Error event handling
    iframe.onerror = function() {
        loadingMessage.style.display = 'none';
        fallbackMessage.style.display = 'block';
        console.log(`Error loading: ${website}`);
    };
    
    // Load event handling
    iframe.addEventListener('load', () => {
        handleIframeLoad(iframe, loadingMessage, fallbackMessage, website);
    });
}

function handleIframeLoad(iframe, loadingMessage, fallbackMessage, website) {
    try {
        // This will throw an error if we can't access the content due to same-origin policy
        const iframeContent = iframe.contentWindow.document;
        
        // If we got here, the iframe loaded successfully
        loadingMessage.style.display = 'none';
        iframe.style.display = 'block';
        
        console.log(`Successfully loaded: ${website}`);
    } catch (e) {
        handleIframeLoadError(iframe, loadingMessage, fallbackMessage, website, e);
    }
}

function handleIframeLoadError(iframe, loadingMessage, fallbackMessage, website, error) {
    loadingMessage.style.display = 'none';
    
    // Check if it's a security error (most likely X-Frame-Options or CSP)
    if (error instanceof DOMException && 
       (error.name === 'SecurityError' || error.name === 'NotAllowedError')) {
        console.log(`Security policy prevents access to: ${website}`);
        
        // For security errors, we'll offer a more prominent external link option
        enhanceFallbackMessage(fallbackMessage, website);
        fallbackMessage.style.display = 'block';
    } else {
        // For Wikipedia and similar sites that load but show autofocus errors,
        // we still want to display the iframe
        if (website.includes('wikipedia') || iframe.contentWindow.length > 0) {
            iframe.style.display = 'block';
        } else {
            fallbackMessage.style.display = 'block';
        }
        
        console.warn(`Non-fatal error accessing iframe content: ${error.message}`);
    }
}

function enhanceFallbackMessage(fallbackMessage, website) {
    const hostname = new URL(website).hostname;
    
    fallbackMessage.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Cannot Display ${hostname}</h3>
        <p>This website has security measures that prevent it from being displayed in our browser frame.</p>
        <div class="fallback-options">
            <a href="${website}" target="_blank" class="primary-button">
                <i class="fas fa-external-link-alt"></i> Open in New Tab
            </a>
            <button id="try-another-site" class="secondary-button">
                <i class="fas fa-search"></i> Try Another Site
            </button>
        </div>
        <div class="sites-that-work">
            <h4>Try these sites that work well in our browser:</h4>
            <div class="quick-sites">
                <button class="quick-site-button" data-site="wikipedia.org">Wikipedia</button>
                <button class="quick-site-button" data-site="example.com">Example.com</button>
                <button class="quick-site-button" data-site="w3schools.com">W3Schools</button>
                <button class="quick-site-button" data-site="weather.gov">Weather.gov</button>
                <button class="quick-site-button" data-site="archive.org">Internet Archive</button>
            </div>
        </div>
    `;
    
    // Add event listeners for the buttons
    setTimeout(() => {
        const tryAnotherSiteBtn = document.getElementById('try-another-site');
        if (tryAnotherSiteBtn) {
            tryAnotherSiteBtn.addEventListener('click', () => {
                const newSite = prompt("Enter website URL to navigate to:");
                if (newSite && newSite.trim() !== '') {
                    navigateToWebsite(newSite);
                }
            });
        }
        
        const quickSiteButtons = document.querySelectorAll('.quick-site-button');
        quickSiteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const site = button.getAttribute('data-site');
                if (site) {
                    navigateToWebsite(site);
                }
            });
        });
    }, 100);
}

function setupIframeLoadingTimeout(iframe, loadingMessage, fallbackMessage) {
    setTimeout(() => {
        if (loadingMessage.style.display !== 'none') {
            loadingMessage.style.display = 'none';
            
            // Check if the iframe has content despite errors
            if (iframe.contentDocument && 
                iframe.contentDocument.body && 
                iframe.contentDocument.body.innerHTML.length > 0) {
                iframe.style.display = 'block';
            } else {
                fallbackMessage.style.display = 'block';
            }
            
            console.log('Loading timeout reached');
        }
    }, 10000); // 10-second timeout
}

function setupBrowserControls(iframe, website) {
    // Back button
    const backButton = document.getElementById('browser-back');
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateIframeBack(iframe);
        });
    }
    
    // Forward button
    const forwardButton = document.getElementById('browser-forward');
    if (forwardButton) {
        forwardButton.addEventListener('click', () => {
            navigateIframeForward(iframe);
        });
    }
    
    // Reload button
    const reloadButton = document.getElementById('browser-reload');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            reloadIframe(iframe);
        });
    }
    
    // Home button
    const homeButton = document.getElementById('browser-home');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            showSection('default');
        });
    }
    
    // External link button
    const openExternalButton = document.getElementById('open-external');
    if (openExternalButton) {
        openExternalButton.addEventListener('click', () => {
            window.open(website, '_blank');
        });
    }
    
    // Add handlers for quick site buttons
    const quickSiteButtons = document.querySelectorAll('.quick-site-button');
    quickSiteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const site = button.getAttribute('data-site');
            if (site) {
                navigateToWebsite(site);
            }
        });
    });
    
    // Add handler for the "Try Another Site" button
    const tryAnotherSiteBtn = document.getElementById('try-another-site');
    if (tryAnotherSiteBtn) {
        tryAnotherSiteBtn.addEventListener('click', () => {
            const newSite = prompt("Enter website URL to navigate to:");
            if (newSite && newSite.trim() !== '') {
                navigateToWebsite(newSite);
            }
        });
    }
}

function navigateIframeBack(iframe) {
    try {
        iframe.contentWindow.history.back();
    } catch (e) {
        console.log("Couldn't navigate back: " + e.message);
    }
}

function navigateIframeForward(iframe) {
    try {
        iframe.contentWindow.history.forward();
    } catch (e) {
        console.log("Couldn't navigate forward: " + e.message);
    }
}

function reloadIframe(iframe) {
    iframe.src = iframe.src;
}