
/**
 * Builds the left sidebar items
 */
function buildSidebar() {
    const sidebar = document.querySelector('.left-sidebar');
    if (!sidebar) return;
    
    // Clear existing content
    sidebar.innerHTML = '';
    
    // Create container for scrollable items
    const sidebarItemsContainer = document.createElement('div');
    sidebarItemsContainer.className = 'sidebar-items-container';
    sidebar.appendChild(sidebarItemsContainer);
    
    // Define sidebar items
    const sidebarItems = [
        {
            id: 'purchase-links',
            icon: 'fas fa-university',
            text: 'Purchase College',
            iconClass: 'icon-purchase'
        },
        {
            id: 'voice-commands',
            icon: 'fas fa-microphone',
            text: 'Voice Commands',
            iconClass: 'icon-voice'
        },
        {
            id: 'bookmarks',
            icon: 'fas fa-bookmark',
            text: 'Bookmarks',
            iconClass: 'icon-bookmarks'
        },
        {
            id: 'history',
            icon: 'fas fa-history',
            text: 'History',
            iconClass: 'icon-history'
        },
        {
            id: 'settings',
            icon: 'fas fa-cog',
            text: 'Settings',
            iconClass: 'icon-settings'
        },
        {
            id: 'help',
            icon: 'fas fa-question-circle',
            text: 'Help',
            iconClass: 'icon-help'
        },
        {
            id: 'accessibility',
            icon: 'fas fa-universal-access',
            text: 'Accessibility',
            iconClass: 'icon-accessibility'
        }
    ];
    
    // Build each sidebar item - now append to the container instead of sidebar
    sidebarItems.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.className = 'sidebar-item';
        
        sidebarItem.innerHTML = `
            <a href="#" class="content-trigger" data-content="${item.id}">
                <div class="icon-container ${item.iconClass}">
                    <i class="${item.icon}"></i>
                </div>
                <span>${item.text}</span>
            </a>
        `;
        
        sidebarItemsContainer.appendChild(sidebarItem);
    });
    
    // Add credits footer - append directly to sidebar, not to container
    addCreditsFooter(sidebar);
    
    // Re-attach event listeners
    attachSidebarEventListeners();
}

/**
 * Adds a credits footer to the sidebar
 * @param {HTMLElement} sidebar - The sidebar DOM element
 */
function addCreditsFooter(sidebar) {
    const creditsFooter = document.createElement('div');
    creditsFooter.className = 'sidebar-credits';
    
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
    
    creditsFooter.innerHTML = `
        <div class="credits-content">
            <p>Developed by</p>
            <p class="developer-name">Isaac Muliro</p>
            <p class="copyright">&copy; ${currentYear}</p>
        </div>
    `;
    
    sidebar.appendChild(creditsFooter);
}

/**
 * Re-attach event listeners to sidebar items
 */
function attachSidebarEventListeners() {
    const contentTriggers = document.querySelectorAll('.content-trigger');
    
    contentTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');
            showSection(contentId);
        });
    });
}

// Initialize the sidebar when the DOM is loaded
document.addEventListener('DOMContentLoaded', buildSidebar);