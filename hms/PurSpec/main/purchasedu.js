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
        
        // Process children links for each entry if they exist
        filteredPurchaseLinks.forEach(link => {
            // Add a children property if not present
            if (!link.children) {
                link.children = [];
            }
        });
    } else {
        console.error('Fallback links not available');
        filteredPurchaseLinks = [];
    }
}

// Function to optimize Purchase links, accounting for new structure with children
function optimizePurchaseLinks(links) {
    if (!Array.isArray(links)) {
        console.error('Links data is not an array');
        return [];
    }
    
    // Create a map to store unique links by URL for deduplication
    const uniqueLinks = new Map();
    
    // First pass - collect all unique links by URL
    links.forEach(link => {
        // Skip invalid links
        if (!link.url || typeof link.url !== 'string') return;
        
        // Normalize URL to prevent duplicates with trailing slashes, etc.
        const normalizedUrl = normalizeUrl(link.url);
        
        // If we haven't seen this URL before, add it
        if (!uniqueLinks.has(normalizedUrl)) {
            // Create a clean link object with essential properties
            uniqueLinks.set(normalizedUrl, {
                url: normalizedUrl,
                text: link.text || extractTextFromUrl(normalizedUrl),
                parent: link.parent || null,
                parentText: link.parentText || null,
                children: []
            });
        }
    });
    
    // Second pass - establish parent-child relationships
    links.forEach(link => {
        if (!link.url || !link.parent) return;
        
        const normalizedUrl = normalizeUrl(link.url);
        const normalizedParent = normalizeUrl(link.parent);
        
        // Get the parent from our map
        const parentLink = uniqueLinks.get(normalizedParent);
        const childLink = uniqueLinks.get(normalizedUrl);
        
        // If both parent and child exist, establish relationship
        if (parentLink && childLink) {
            // Check if child is already in parent's children array
            const childExists = parentLink.children.some(child => 
                child.url === normalizedUrl
            );
            
            // Add child to parent's children if not already there
            if (!childExists) {
                parentLink.children.push({
                    url: normalizedUrl,
                    text: childLink.text
                });
            }
        }
    });
    
    // If the original data already has a children array, process those too
    links.forEach(link => {
        if (!link.url || !Array.isArray(link.children)) return;
        
        const normalizedUrl = normalizeUrl(link.url);
        const parentLink = uniqueLinks.get(normalizedUrl);
        
        if (parentLink) {
            // Process each child in the original children array
            link.children.forEach(child => {
                if (!child.url) return;
                
                const normalizedChildUrl = normalizeUrl(child.url);
                
                // Check if child is already in parent's children array
                const childExists = parentLink.children.some(existingChild => 
                    existingChild.url === normalizedChildUrl
                );
                
                // Add child to parent's children if not already there
                if (!childExists) {
                    parentLink.children.push({
                        url: normalizedChildUrl,
                        text: child.text || extractTextFromUrl(normalizedChildUrl)
                    });
                }
            });
        }
    });
    
    // Convert the map back to an array
    return Array.from(uniqueLinks.values());
}

// Helper function to normalize URLs
function normalizeUrl(url) {
    // Remove trailing slash if present
    return url.replace(/\/$/, '');
}

// Helper function to extract meaningful text from a URL
function extractTextFromUrl(url) {
    try {
        // Get the last part of the URL path
        const pathParts = new URL(url).pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2] || '';
        
        // Convert dashes/underscores to spaces and capitalize words
        return lastPart
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim() || url;
    } catch (e) {
        // If URL parsing fails, return the original URL
        return url;
    }
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
    
    // Create the UI structure for the header and controls
    purchaseSection.innerHTML = `
        <h3><i class="fas fa-university"></i> Purchase College Links</h3>
        
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
        </div>
    `;

    // Add the section to the content area
    const contentArea = document.querySelector('.content');
    if (contentArea) {
        contentArea.appendChild(purchaseSection);
    } else {
        console.error('Content area not found');
        document.body.appendChild(purchaseSection);
    }

    // Create the links list container as a separate div
    const purchaseLinksListContainer = document.createElement('div');
    purchaseLinksListContainer.className = 'purchase-links-list';
    purchaseLinksListContainer.id = 'purchase-links-list';
    
    // Add loading spinner inside the links list container
    purchaseLinksListContainer.innerHTML = `
        <div class="loading-links">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading Purchase College links...</p>
        </div>
    `;
    
    // Find the purchase-links-container and append the links list to it
    const container = purchaseSection.querySelector('.purchase-links-container');
    if (container) {
        container.appendChild(purchaseLinksListContainer);
    } else {
        // Fallback: append directly to the purchase section
        purchaseSection.appendChild(purchaseLinksListContainer);
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

// Replace the existing createLinkItem function
function createLinkItem(link) {
    const linkItem = document.createElement('div');
    linkItem.className = 'purchase-link-item';
    linkItem.dataset.url = link.url;
    linkItem.dataset.category = getLinkCategory(link);
    
    // Create icon container with the improved visual style
    const iconContainer = document.createElement('div');
    iconContainer.className = 'purchase-link-icon';
    
    // Add appropriate icon based on link type
    const icon = document.createElement('i');
    icon.className = `fas ${getLinkIcon(link)}`;
    iconContainer.appendChild(icon);
    
    // Create link details container
    const details = document.createElement('div');
    details.className = 'link-details';
    
    const text = document.createElement('div');
    text.className = 'link-text';
    text.textContent = link.text;
    
    const url = document.createElement('div');
    url.className = 'link-url';
    url.textContent = formatUrl(link.url);
    
    details.appendChild(text);
    details.appendChild(url);
    
    // Create action button container
    const action = document.createElement('div');
    action.className = 'link-action';
    
    const button = document.createElement('button');
    button.className = 'open-link-button';
    button.setAttribute('aria-label', `Open ${link.text}`);
    button.innerHTML = '<i class="fas fa-external-link-alt"></i>';
    
    action.appendChild(button);
    
    // Assemble the components
    linkItem.appendChild(iconContainer);
    linkItem.appendChild(details);
    linkItem.appendChild(action);
    
    // Add click handler
    linkItem.addEventListener('click', () => {
        navigateToWebsite(link.url);
    });
    
    // Stop propagation on button click to prevent triggering the parent click
    button.addEventListener('click', (e) => {
        e.stopPropagation();
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

