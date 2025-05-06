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






let filteredPurchaseLinks = []; 


function initializePurchaseLinks() {
    
    useFallbackLinks();
    
    
    createPurchaseLinksUI();
    
    
    setupPurchaseLinksVoiceCommands();
}


function useFallbackLinks() {
    console.log('Using fallback Purchase College links');
    
    
    if (typeof fallbackPurchaseLinks !== 'undefined' && fallbackPurchaseLinks && fallbackPurchaseLinks.length > 0) {
        
        filteredPurchaseLinks = optimizePurchaseLinks(fallbackPurchaseLinks);
        console.log(`Using ${filteredPurchaseLinks.length} Purchase College links`);
        
        
        filteredPurchaseLinks.forEach(link => {
            
            if (!link.children) {
                link.children = [];
            }
        });
    } else {
        console.error('Fallback links not available');
        filteredPurchaseLinks = [];
    }
}


function optimizePurchaseLinks(links) {
    if (!Array.isArray(links)) {
        console.error('Links data is not an array');
        return [];
    }
    
    
    const uniqueLinks = new Map();
    
    
    links.forEach(link => {
        
        if (!link.url || typeof link.url !== 'string') return;
        
        
        const normalizedUrl = normalizeUrl(link.url);
        
        
        if (!uniqueLinks.has(normalizedUrl)) {
            
            uniqueLinks.set(normalizedUrl, {
                url: normalizedUrl,
                text: link.text || extractTextFromUrl(normalizedUrl),
                parent: link.parent || null,
                parentText: link.parentText || null,
                children: []
            });
        }
    });
    
    
    links.forEach(link => {
        if (!link.url || !link.parent) return;
        
        const normalizedUrl = normalizeUrl(link.url);
        const normalizedParent = normalizeUrl(link.parent);
        
        
        const parentLink = uniqueLinks.get(normalizedParent);
        const childLink = uniqueLinks.get(normalizedUrl);
        
        
        if (parentLink && childLink) {
            
            const childExists = parentLink.children.some(child => 
                child.url === normalizedUrl
            );
            
            
            if (!childExists) {
                parentLink.children.push({
                    url: normalizedUrl,
                    text: childLink.text
                });
            }
        }
    });
    
    
    links.forEach(link => {
        if (!link.url || !Array.isArray(link.children)) return;
        
        const normalizedUrl = normalizeUrl(link.url);
        const parentLink = uniqueLinks.get(normalizedUrl);
        
        if (parentLink) {
            
            link.children.forEach(child => {
                if (!child.url) return;
                
                const normalizedChildUrl = normalizeUrl(child.url);
                
                
                const childExists = parentLink.children.some(existingChild => 
                    existingChild.url === normalizedChildUrl
                );
                
                
                if (!childExists) {
                    parentLink.children.push({
                        url: normalizedChildUrl,
                        text: child.text || extractTextFromUrl(normalizedChildUrl)
                    });
                }
            });
        }
    });
    
    
    return Array.from(uniqueLinks.values());
}


function normalizeUrl(url) {
    
    return url.replace(/\/$/, '');
}


function extractTextFromUrl(url) {
    try {
        
        const pathParts = new URL(url).pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2] || '';
        
        
        return lastPart
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim() || url;
    } catch (e) {
        
        return url;
    }
}



function createPurchaseLinksUI() {
    
    if (document.getElementById('purchase-links')) {
        console.log('Purchase links section already exists');
        return;
    }
    
    
    const purchaseSection = document.createElement('div');
    purchaseSection.className = 'content-section';
    purchaseSection.id = 'purchase-links';
    
    
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

    
    const contentArea = document.querySelector('.content');
    if (contentArea) {
        contentArea.appendChild(purchaseSection);
    } else {
        console.error('Content area not found');
        document.body.appendChild(purchaseSection);
    }

    
    const purchaseLinksListContainer = document.createElement('div');
    purchaseLinksListContainer.className = 'purchase-links-list';
    purchaseLinksListContainer.id = 'purchase-links-list';
    
    
    purchaseLinksListContainer.innerHTML = `
        <div class="loading-links">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading Purchase College links...</p>
        </div>
    `;
    
    
    const container = purchaseSection.querySelector('.purchase-links-container');
    if (container) {
        container.appendChild(purchaseLinksListContainer);
    } else {
        
        purchaseSection.appendChild(purchaseLinksListContainer);
    }
    
    
    setTimeout(() => {
        setupPurchaseSearch();
        setupCategoryFiltering();
        
        
        renderPurchaseLinks(filteredPurchaseLinks);
    }, 100);
}


function getLinkCategory(link) {
    const url = link.url.toLowerCase();
    const text = link.text.toLowerCase();
    
    
    if (url === 'https:
        text === 'purchase college' || 
        text === 'home') {
        return 'main';
    }
    
    
    if (url.includes('/academics/') || 
        text.includes('academic') || 
        text.includes('school of') || 
        text.includes('studies') || 
        text.includes('program') || 
        url.includes('/library/')) {
        return 'academics';
    }
    
    
    if (url.includes('/admissions/') || 
        text.includes('admission') || 
        text.includes('apply') || 
        text.includes('tuition') || 
        text.includes('financial') || 
        text.includes('visit')) {
        return 'admissions';
    }
    
    
    if (url.includes('/campus-life/') || 
        text.includes('campus') || 
        text.includes('housing') || 
        text.includes('dining') || 
        text.includes('student') || 
        url.includes('/current-students/')) {
        return 'campus';
    }
    
    
    if (url.includes('/about/') || 
        text.includes('about') || 
        text.includes('mission') || 
        text.includes('contact') || 
        text.includes('directory')) {
        return 'about';
    }
    
    return 'other';
}


function renderPurchaseLinks(links) {
    const linksList = document.getElementById('purchase-links-list');
    const linksCount = document.getElementById('purchase-links-count');
    
    if (!linksList || !linksCount) return;
    
    
    linksCount.textContent = links.length;
    
    
    linksList.innerHTML = '';
    
    
    if (links.length === 0) {
        linksList.innerHTML = '<div class="no-links-message">No links found matching your search.</div>';
        return;
    }
    
    
    const categorizedLinks = {
        main: [],
        academics: [],
        admissions: [],
        campus: [],
        about: [],
        other: []
    };
    
    
    links.forEach(link => {
        const category = getLinkCategory(link);
        categorizedLinks[category].push(link);
    });
    
    
    const categoryTitles = {
        main: 'Main',
        academics: 'Academics',
        admissions: 'Admissions & Enrollment',
        campus: 'Campus Life',
        about: 'About Purchase',
        other: 'Other Resources'
    };
    
    
    const createCategorySection = (categoryName, categoryLinks) => {
        if (categoryLinks.length === 0) return '';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `<h3>${categoryTitles[categoryName]}</h3>`;
        linksList.appendChild(categoryHeader);
        
        
        categoryLinks.forEach(link => {
            const linkItem = createLinkItem(link);
            linksList.appendChild(linkItem);
        });
    };
    
    
    ['main', 'academics', 'admissions', 'campus', 'about', 'other'].forEach(category => {
        if (categorizedLinks[category] && categorizedLinks[category].length > 0) {
            createCategorySection(category, categorizedLinks[category]);
        }
    });
}


function createLinkItem(link) {
    const linkItem = document.createElement('div');
    linkItem.className = 'purchase-link-item';
    linkItem.dataset.url = link.url;
    linkItem.dataset.category = getLinkCategory(link);
    
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'purchase-link-icon';
    
    
    const icon = document.createElement('i');
    icon.className = `fas ${getLinkIcon(link)}`;
    iconContainer.appendChild(icon);
    
    
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
    
    
    const action = document.createElement('div');
    action.className = 'link-action';
    
    const button = document.createElement('button');
    button.className = 'open-link-button';
    button.setAttribute('aria-label', `Open ${link.text}`);
    button.innerHTML = '<i class="fas fa-external-link-alt"></i>';
    
    action.appendChild(button);
    
    
    linkItem.appendChild(iconContainer);
    linkItem.appendChild(details);
    linkItem.appendChild(action);
    
    
    linkItem.addEventListener('click', () => {
        navigateToWebsite(link.url);
    });
    
    
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateToWebsite(link.url);
    });
    
    return linkItem;
}


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


function setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-button');
    if (!categoryButtons.length) return;
    
    
    updateCategoryButtonCounts();
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            document.querySelectorAll('.category-button').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            
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
    
    
    filteredPurchaseLinks.forEach(link => {
        const category = getLinkCategory(link);
        if (categoryCounts.hasOwnProperty(category)) {
            categoryCounts[category]++;
        }
    });
    
    
    document.querySelectorAll('.category-button').forEach(button => {
        const category = button.dataset.category;
        if (categoryCounts.hasOwnProperty(category)) {
            
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


function getLinkIcon(link) {
    const url = link.url.toLowerCase();
    const text = link.text.toLowerCase();
    const category = getLinkCategory(link);
    
    
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


function formatUrl(url) {
    try {
        
        return url.replace(/^https?:\/\/(www\.)?/, '');
    } catch(e) {
        return url;
    }
}


function setupPurchaseLinksVoiceCommands() {
    
    document.addEventListener('voiceCommand', function(event) {
        const command = event.detail.command.toLowerCase();
        
        
        if ((command.includes('go to purchase') || command.includes('open purchase')) && 
            filteredPurchaseLinks.length > 0) {
            
            
            let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
            
            
            query = query.replace(/dot com|\.com|dotcom/gi, '');
            
            
            const matchingLinks = filteredPurchaseLinks.filter(link => 
                link.text.toLowerCase().includes(query)
            );
            
            if (matchingLinks.length > 0) {
                
                navigateToWebsite(matchingLinks[0].url);
                return true; 
            }
        }
        
        
        if (command.includes('show purchase links') || command.includes('open purchase links')) {
            showSection('purchase-links');
            return true; 
        }
        
        return false; 
    });
}


function extendVoiceRecognitionForPurchase() {
    const existingHandleVoiceCommand = handleVoiceCommand;
    
    
    handleVoiceCommand = function(event, recognition) {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        document.getElementById('voice-status').textContent = `Command: "${command}"`;
        
        
        if ((command.includes('go to purchase') || command.includes('open purchase'))) {
            
            
            let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
            
            if (!query || query === '') {
                
                navigateToWebsite('https:
                return;
            }
            
            
            query = query.replace(/dot com|\.com|dotcom/gi, '');
            
            
            const matchingLinks = filteredPurchaseLinks.filter(link => 
                link.text && link.text.toLowerCase().includes(query)
            );
            
            if (matchingLinks.length > 0) {
                
                navigateToWebsite(matchingLinks[0].url);
                return;
            }
            
            
            const titleMatches = filteredPurchaseLinks.filter(link => 
                link.title && link.title.toLowerCase().includes(query)
            );
            
            if (titleMatches.length > 0) {
                
                navigateToWebsite(titleMatches[0].url);
                return;
            }
            
            
            const guessedUrl = constructSmartUrl(query);
            navigateToWebsite(guessedUrl);
            return;
        }
        
        
        if (command.includes('show purchase links') || command.includes('open purchase links')) {
            showSection('purchase-links');
            return;
        }
        
        
        existingHandleVoiceCommand(event, recognition);
    };
}


function constructSmartUrl(query) {
    
    query = query.toLowerCase().trim();
    
    
    const path = query.replace(/\s+/g, '-');
    
    
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
    
    
    return `https:
}


function handlePurchasePathNotFound(originalUrl) {
    
    if (!originalUrl.includes('purchase.edu')) return null;
    
    
    try {
        const urlObj = new URL(originalUrl);
        const path = urlObj.pathname;
        
        
        if (path.endsWith('.com')) {
            
            return originalUrl.replace('.com', '');
        }
        
        
        if (!path.endsWith('/') && !path.includes('.')) {
            
            return originalUrl + '/';
        }
    } catch(e) {
        console.error('Error parsing URL:', e);
    }
    
    return null;
}

