/**
 * Builds the left sidebar items
 */
function buildSidebar() {
    const sidebar = document.querySelector('.left-sidebar');
    if (!sidebar) return;
    
    // Clear existing content
    sidebar.innerHTML = '';
    
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
    
    // Build each sidebar item
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
        
        sidebar.appendChild(sidebarItem);
    });
    
    // Re-attach event listeners
    attachSidebarEventListeners();
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