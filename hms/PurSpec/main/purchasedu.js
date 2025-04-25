// PURCHASE COLLEGE LINKS COMPONENT
let filteredPurchaseLinks = []; // Optimized list after processing

// Initialize the Purchase links component
function initializePurchaseLinks() {
    // Use fallback links directly instead of loading from JSON
    useFallbackLinks();
    
    // Create the UI
    createPurchaseLinksUI();
    
    // Setup voice commands for Purchase links
    setupPurchaseLinksVoiceCommands();
}

// Use embedded fallback links directly
function useFallbackLinks() {
    console.log('Using fallback Purchase College links');
    
    // Use the fallback links defined in fallbackLinks.js
    if (typeof fallbackPurchaseLinks !== 'undefined' && fallbackPurchaseLinks && fallbackPurchaseLinks.length > 0) {
        // Set filtered links to be the optimized version of the fallback links
        filteredPurchaseLinks = optimizePurchaseLinks(fallbackPurchaseLinks);
        console.log(`Using ${filteredPurchaseLinks.length} Purchase College links`);
    } else {
        console.error('Fallback links not available');
        filteredPurchaseLinks = [];
    }
}

// Optimize the links by removing duplicates and organizing them
function optimizePurchaseLinks(allLinks) {
    // Step 1: Remove duplicate URLs and keep the best text representation
    const uniqueUrlMap = new Map();
    
    allLinks.forEach(link => {
        const url = link.url.toLowerCase();
        const text = link.text.trim();
        
        // Skip empty or useless links
        if (!text || text === url || text.length < 2 || 
            text === 'Skip to search' || text === 'Editor Login' ||
            text.includes('Calendar of Events') || // Calendar entry with date prefix
            url.includes('#') || // Skip anchors
            url.includes('?login') || // Skip login links
            url.includes('livewhale') || // Skip CMS links
            text === 'English' || text === 'Español') { // Skip language switchers
            return;
        }
        
        // Check if this URL is already in our map
        if (uniqueUrlMap.has(url)) {
            const existingLink = uniqueUrlMap.get(url);
            // If the new text is better (shorter but not too short, or more descriptive), use it
            if ((text.length < existingLink.text.length && text.length > 3) || 
                 (!existingLink.text.includes(' ') && text.includes(' '))) {
                uniqueUrlMap.set(url, { url: link.url, text: text });
            }
        } else {
            uniqueUrlMap.set(url, { url: link.url, text: text });
        }
    });
    
    // Step 2: Convert map back to array
    let optimizedLinks = Array.from(uniqueUrlMap.values());
    
    // Step 3: Sort by category priority and alphabetically within categories
    optimizedLinks.sort((a, b) => {
        const aCat = getLinkCategory(a);
        const bCat = getLinkCategory(b);
        
        // First sort by category priority
        const categoryOrder = {
            'main': 1,
            'academics': 2,
            'admissions': 3,
            'campus': 4,
            'about': 5,
            'other': 6
        };
        
        if (categoryOrder[aCat] !== categoryOrder[bCat]) {
            return categoryOrder[aCat] - categoryOrder[bCat];
        }
        
        // Then alphabetically by text
        return a.text.localeCompare(b.text);
    });
    
    return optimizedLinks;
}

// Create the UI container for Purchase links
function createPurchaseLinksUI() {
    // Check if the section already exists
    if (document.getElementById('purchase-links')) {
        console.log('Purchase links section already exists');
        return;
    }
    
    // Create the content section
    const purchaseSection = document.createElement('div');
    purchaseSection.className = 'content-section';
    purchaseSection.id = 'purchase-links';
    
    // Create the UI structure
    purchaseSection.innerHTML = `
        <h2><i class="fas fa-university"></i> Purchase College Links</h2>
        
        <div class="purchase-links-container">
            <div class="purchase-links-header">
                <div class="search-container">
                    <input type="text" id="purchase-links-search" placeholder="Search Purchase College links...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="purchase-links-info">
                    <span id="purchase-links-count">0</span> links available
                </div>
            </div>
            
            <div class="purchase-links-categories">
                <button class="category-button active" data-category="all">All</button>
                <button class="category-button" data-category="academics">Academics</button>
                <button class="category-button" data-category="admissions">Admissions</button>
                <button class="category-button" data-category="campus">Campus Life</button>
                <button class="category-button" data-category="about">About</button>
            </div>


            <div class="voice-command-hint">
                <i class="fas fa-microphone"></i>
                <p>Try saying: "Go to Purchase Academics" or "Open Purchase Admissions"</p>
            </div>
            
            <div class="purchase-links-list" id="purchase-links-list">
                <div class="loading-links">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading Purchase College links...</p>
                </div>
            </div>
            
            <div class="voice-command-hint">
                <i class="fas fa-microphone"></i>
                <p>Try saying: "Go to Purchase Academics" or "Open Purchase Admissions"</p>
            </div>
        </div>
    `;
    
    // Add to the content area
    const contentArea = document.querySelector('.content');
    if (contentArea) {
        contentArea.appendChild(purchaseSection);
    } else {
        console.error('Content area not found');
        document.body.appendChild(purchaseSection);
    }
    
    // Setup search functionality and category filtering
    setTimeout(() => {
        setupPurchaseSearch();
        setupCategoryFiltering();
        
        // Render the links immediately since we're not waiting for async loading
        renderPurchaseLinks(filteredPurchaseLinks);
    }, 100);
}

// Determine the category of a link
function getLinkCategory(link) {
    const url = link.url.toLowerCase();
    const text = link.text.toLowerCase();
    
    // Main navigation links
    if (url === 'https://www.purchase.edu/' || 
        text === 'purchase college' || 
        text === 'home') {
        return 'main';
    }
    
    // Academic links
    if (url.includes('/academics/') || 
        text.includes('academic') || 
        text.includes('school of') || 
        text.includes('studies') || 
        text.includes('program') || 
        url.includes('/library/')) {
        return 'academics';
    }
    
    // Admissions links
    if (url.includes('/admissions/') || 
        text.includes('admission') || 
        text.includes('apply') || 
        text.includes('tuition') || 
        text.includes('financial') || 
        text.includes('visit')) {
        return 'admissions';
    }
    
    // Campus life
    if (url.includes('/campus-life/') || 
        text.includes('campus') || 
        text.includes('housing') || 
        text.includes('dining') || 
        text.includes('student') || 
        url.includes('/current-students/')) {
        return 'campus';
    }
    
    // About
    if (url.includes('/about/') || 
        text.includes('about') || 
        text.includes('mission') || 
        text.includes('contact') || 
        text.includes('directory')) {
        return 'about';
    }
    
    return 'other';
}

// Render the links list with category headers
function renderPurchaseLinks(links) {
    const linksList = document.getElementById('purchase-links-list');
    const linksCount = document.getElementById('purchase-links-count');
    
    if (!linksList || !linksCount) return;
    
    // Update the count
    linksCount.textContent = links.length;
    
    // Clear loading message
    linksList.innerHTML = '';
    
    // Display links
    if (links.length === 0) {
        linksList.innerHTML = '<div class="no-links-message">No links found matching your search.</div>';
        return;
    }
    
    // Group links by category
    const categorizedLinks = {
        main: [],
        academics: [],
        admissions: [],
        campus: [],
        about: [],
        other: []
    };
    
    // Sort links into categories
    links.forEach(link => {
        const category = getLinkCategory(link);
        categorizedLinks[category].push(link);
    });
    
    // Category titles for display
    const categoryTitles = {
        main: 'Main',
        academics: 'Academics',
        admissions: 'Admissions & Enrollment',
        campus: 'Campus Life',
        about: 'About Purchase',
        other: 'Other Resources'
    };
    
    // Helper function to create category section
    const createCategorySection = (categoryName, categoryLinks) => {
        if (categoryLinks.length === 0) return '';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `<h3>${categoryTitles[categoryName]}</h3>`;
        linksList.appendChild(categoryHeader);
        
        // Add links for this category
        categoryLinks.forEach(link => {
            const linkItem = createLinkItem(link);
            linksList.appendChild(linkItem);
        });
    };
    
    // Create and add each category section in order
    ['main', 'academics', 'admissions', 'campus', 'about', 'other'].forEach(category => {
        if (categorizedLinks[category] && categorizedLinks[category].length > 0) {
            createCategorySection(category, categorizedLinks[category]);
        }
    });
}

// Create a link item element
function createLinkItem(link) {
    const linkItem = document.createElement('div');
    linkItem.className = 'purchase-link-item';
    linkItem.dataset.url = link.url;
    linkItem.dataset.category = getLinkCategory(link);
    
    linkItem.innerHTML = `
        <div class="link-icon">
            <i class="fas ${getLinkIcon(link)}"></i>
        </div>
        <div class="link-details">
            <div class="link-text">${link.text}</div>
            <div class="link-url">${formatUrl(link.url)}</div>
        </div>
        <div class="link-action">
            <button class="open-link-button" aria-label="Open ${link.text}">
                <i class="fas fa-external-link-alt"></i>
            </button>
        </div>
    `;
    
    // Add click handler
    linkItem.addEventListener('click', () => {
        navigateToWebsite(link.url);
    });
    
    return linkItem;
}

// Search functionality
function setupPurchaseSearch() {
    const searchInput = document.getElementById('purchase-links-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.trim() === '') {
            renderPurchaseLinks(filteredPurchaseLinks);
        } else {
            const searchResults = filteredPurchaseLinks.filter(link => 
                link.text.toLowerCase().includes(query) || 
                link.url.toLowerCase().includes(query)
            );
            renderPurchaseLinks(searchResults);
        }
    });
}

// Category filtering
function setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-button');
    if (!categoryButtons.length) return;
    
    // Add count badges to category buttons
    updateCategoryButtonCounts();
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.category-button').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter links
            const category = button.dataset.category;
            
            if (category === 'all') {
                renderPurchaseLinks(filteredPurchaseLinks);
            } else {
                const filteredLinks = filteredPurchaseLinks.filter(link => 
                    getLinkCategory(link) === category
                );
                renderPurchaseLinks(filteredLinks);
            }
        });
    });
}

// Add count of links to each category button
function updateCategoryButtonCounts() {
    if (!filteredPurchaseLinks || !filteredPurchaseLinks.length) return;
    
    const categoryCounts = {
        academics: 0,
        admissions: 0,
        campus: 0,
        about: 0,
        main: 0,
        other: 0,
        all: filteredPurchaseLinks.length
    };
    
    // Count links in each category
    filteredPurchaseLinks.forEach(link => {
        const category = getLinkCategory(link);
        if (categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
        }
    });
    
    // Update the buttons with counts
    document.querySelectorAll('.category-button').forEach(button => {
        const category = button.dataset.category;
        if (categoryCounts.hasOwnProperty(category)) {
            // Check if count span already exists
            let countSpan = button.querySelector('.count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'count';
                button.appendChild(countSpan);
            }
            countSpan.textContent = categoryCounts[category];
        }
    });
}

// Helper function to get an appropriate icon for a link
function getLinkIcon(link) {
    const url = link.url.toLowerCase();
    const text = link.text.toLowerCase();
    const category = getLinkCategory(link);
    
    // Main category icons
    switch(category) {
        case 'main':
            return 'fa-university';
        case 'academics':
            if (url.includes('/library/') || text.includes('library')) {
                return 'fa-book-open';
            } else if (url.includes('/programs/') || text.includes('program')) {
                return 'fa-graduation-cap';
            } else {
                return 'fa-book';
            }
        case 'admissions':
            if (text.includes('apply')) {
                return 'fa-edit';
            } else if (text.includes('financial') || text.includes('tuition')) {
                return 'fa-dollar-sign';
            } else if (text.includes('visit')) {
                return 'fa-map-marker-alt';
            } else {
                return 'fa-user-graduate';
            }
        case 'campus':
            if (text.includes('housing') || text.includes('dorm')) {
                return 'fa-home';
            } else if (text.includes('dining') || text.includes('food')) {
                return 'fa-utensils';
            } else if (text.includes('event') || text.includes('calendar')) {
                return 'fa-calendar-alt';
            } else {
                return 'fa-users';
            }
        case 'about':
            if (text.includes('contact')) {
                return 'fa-envelope';
            } else if (text.includes('map')) {
                return 'fa-map';
            } else if (text.includes('directory')) {
                return 'fa-address-book';
            } else {
                return 'fa-info-circle';
            }
        case 'other':
            if (url.includes('/news/') || text.includes('news')) {
                return 'fa-newspaper';
            } else if (url.includes('/athletics/') || text.includes('athletic')) {
                return 'fa-running';
            } else if (url.includes('/give') || text.includes('support') || text.includes('donate')) {
                return 'fa-gift';
            } else {
                return 'fa-link';
            }
        default:
            return 'fa-link';
    }
}

// Format URL for display
function formatUrl(url) {
    try {
        // Remove the https://www. part if present
        return url.replace(/^https?:\/\/(www\.)?/, '');
    } catch(e) {
        return url;
    }
}

// Add voice commands for Purchase College links
function setupPurchaseLinksVoiceCommands() {
    // This will integrate with your existing voice recognition system
    document.addEventListener('voiceCommand', function(event) {
        const command = event.detail.command.toLowerCase();
        
        // Handle "go to purchase X" or "open purchase X" commands
        if ((command.includes('go to purchase') || command.includes('open purchase')) && 
            filteredPurchaseLinks.length > 0) {
            
            // Extract the query part after "purchase"
            let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
            
            // Clean up query by removing common speech recognition issues
            query = query.replace(/dot com|\.com|dotcom/gi, '');
            
            // Find a matching link by text field
            const matchingLinks = filteredPurchaseLinks.filter(link => 
                link.text.toLowerCase().includes(query)
            );
            
            if (matchingLinks.length > 0) {
                // Navigate to the first matching link
                navigateToWebsite(matchingLinks[0].url);
                return true; // Command was handled
            }
        }
        
        // Handle "show purchase links" command
        if (command.includes('show purchase links') || command.includes('open purchase links')) {
            showSection('purchase-links');
            return true; // Command was handled
        }
        
        return false; // Command was not handled
    });
}

// Update the voice command handling function
function extendVoiceRecognitionForPurchase() {
    const existingHandleVoiceCommand = handleVoiceCommand;
    
    // Override the existing handleVoiceCommand function
    handleVoiceCommand = function(event, recognition) {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        document.getElementById('voice-status').textContent = `Command: "${command}"`;
        
        // Check for Purchase College specific commands
        if ((command.includes('go to purchase') || command.includes('open purchase'))) {
            
            // Extract the query part after "purchase"
            let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
            
            if (!query || query === '') {
                // If just "go to purchase", navigate to main site
                navigateToWebsite('https://www.purchase.edu/');
                return;
            }
            
            // Clean up query by removing common speech recognition issues
            query = query.replace(/dot com|\.com|dotcom/gi, '');
            
            // Find a matching link by text field
            const matchingLinks = filteredPurchaseLinks.filter(link => 
                link.text && link.text.toLowerCase().includes(query)
            );
            
            if (matchingLinks.length > 0) {
                // Navigate to the first matching link
                navigateToWebsite(matchingLinks[0].url);
                return;
            }
            
            // If no exact match found, try title field as fallback
            const titleMatches = filteredPurchaseLinks.filter(link => 
                link.title && link.title.toLowerCase().includes(query)
            );
            
            if (titleMatches.length > 0) {
                // Navigate to the first matching link
                navigateToWebsite(titleMatches[0].url);
                return;
            }
            
            // If no match found, try to construct a smarter URL guess
            const guessedUrl = constructSmartUrl(query);
            navigateToWebsite(guessedUrl);
            return;
        }
        
        // Show purchase links section
        if (command.includes('show purchase links') || command.includes('open purchase links')) {
            showSection('purchase-links');
            return;
        }
        
        // If no Purchase-specific command matched, call the original handler
        existingHandleVoiceCommand(event, recognition);
    };
}

// Function to construct better URL guesses
function constructSmartUrl(query) {
    // Clean the query
    query = query.toLowerCase().trim();
    
    // Replace spaces with hyphens
    const path = query.replace(/\s+/g, '-');
    
    // Figure out which section it might belong to based on keywords
    let sectionPrefix = '';
    
    if (query.includes('academic') || 
        query.includes('program') || 
        query.includes('major') || 
        query.includes('school of') || 
        query.includes('course')) {
        sectionPrefix = 'academics/';
    }
    else if (query.includes('admission') || 
             query.includes('apply') || 
             query.includes('application') || 
             query.includes('tuition') || 
             query.includes('financial aid')) {
        sectionPrefix = 'admissions/';
    }
    else if (query.includes('campus') || 
             query.includes('housing') || 
             query.includes('dining') || 
             query.includes('student life')) {
        sectionPrefix = 'campus-life/';
    }
    else if (query.includes('about') || 
             query.includes('history') || 
             query.includes('mission')) {
        sectionPrefix = 'about/';
    }
    
    // Construct the full URL
    return `https://www.purchase.edu/${sectionPrefix}${path}/`;
}

// Add this function to handle URL retries for Purchase.edu paths
function handlePurchasePathNotFound(originalUrl) {
    // Only apply to Purchase.edu URLs
    if (!originalUrl.includes('purchase.edu')) return null;
    
    // Extract the path
    try {
        const urlObj = new URL(originalUrl);
        const path = urlObj.pathname;
        
        // Check if it ends with .com
        if (path.endsWith('.com')) {
            // Try without the .com
            return originalUrl.replace('.com', '');
        }
        
        // Check if it has no trailing slash
        if (!path.endsWith('/') && !path.includes('.')) {
            // Add trailing slash and try again
            return originalUrl + '/';
        }
    } catch(e) {
        console.error('Error parsing URL:', e);
    }
    
    return null;
}

