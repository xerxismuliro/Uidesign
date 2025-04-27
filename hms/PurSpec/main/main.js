// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize app components
//     initializeSidebar();
//     initializeContentNavigation();
//     initializeVoiceRecognition();
//     initializeHistoryAndBookmarks();
    
//     // Add Purchase links component (no need for the styles function)
//     initializePurchaseLinks();
    
//     // Add Purchase links as a sidebar item
//     addPurchaseLinksToSidebar();
// });

// function addPurchaseLinksToSidebar() {
//     const sidebarNav = document.querySelector('.sidebar-nav');
//     if (!sidebarNav) return;
    
//     const purchaseLinkItem = document.createElement('li');
//     purchaseLinkItem.innerHTML = `
//         <a href="#" class="content-trigger" data-content="purchase-links">
//             <i class="fas fa-university"></i>
//             <span>Purchase College</span>
//         </a>
//     `;
    
//     sidebarNav.appendChild(purchaseLinkItem);
// }



document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components first
    buildSidebar();
    buildContentSections();
    buildRightSidebar();
    
    // Then initialize core functionality
    initializeSidebar();
    initializeContentNavigation();
    initializeVoiceRecognition();
    initializeHistoryAndBookmarks();
    
    // Add Purchase links component 
    initializePurchaseLinks();
    
    // Initialize theme and settings
    initializeTheme();
    loadUserSettings();
    
    // Initialize additional event listeners
    initializeEvents();
    
    console.log('Application initialized successfully');
});

/**
 * Initialize event listeners for the application
 */
function initializeEvents() {
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Navigation toggle (for mobile)
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.querySelector('.left-sidebar').classList.toggle('active');
        });
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.left-sidebar');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            navToggle && !navToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
}

/**
 * Initialize keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt+V to toggle voice recognition
        if (e.altKey && e.key === 'v') {
            e.preventDefault();
            if (isListening) {
                stopVoiceRecognition(recognition);
            } else {
                startVoiceRecognition(recognition);
            }
        }
        
        // Alt+H to show help
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            showSection('help');
        }
        
        // Alt+S to show settings
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            showSection('settings');
        }
        
        // Alt+T to toggle theme
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

/**
 * Load user settings from localStorage
 */
function loadUserSettings() {
    // Load font size
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    document.body.setAttribute('data-font-size', fontSize);
    
    // Update font size dropdown if it exists
    const fontSizeSelect = document.getElementById('font-size');
    if (fontSizeSelect) {
        fontSizeSelect.value = fontSize;
    }
    
    // Load high contrast setting
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        document.body.classList.add('high-contrast');
        
        // Update toggle if it exists
        const highContrastToggle = document.getElementById('high-contrast');
        if (highContrastToggle) {
            highContrastToggle.checked = true;
        }
    }
    
    // Load audio feedback preferences
    loadAudioPreferences();
}

/**
 * Backward compatibility function for adding Purchase links to sidebar
 * This is kept for compatibility with your existing code
 */
function addPurchaseLinksToSidebar() {
    // This functionality is now handled by buildSidebar()
    // But we keep the function for backward compatibility
    console.log('Purchase links added to sidebar via the UI builder');
}