// document.addEventListener('DOMContentLoaded', () => {
//     // Initialize app components
//     initializeSidebar();
//     initializeContentNavigation();
//     initializeVoiceRecognition();
//     initializeHistoryAndBookmarks();
//     scrapePurchaseEduLinks();
// });


document.addEventListener('DOMContentLoaded', () => {
    // Initialize app components
    initializeSidebar();
    initializeContentNavigation();
    initializeVoiceRecognition();
    initializeHistoryAndBookmarks();
    
    // Add Purchase links component (no need for the styles function)
    initializePurchaseLinks();
    
    // Add Purchase links as a sidebar item
    addPurchaseLinksToSidebar();
});

function addPurchaseLinksToSidebar() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;
    
    const purchaseLinkItem = document.createElement('li');
    purchaseLinkItem.innerHTML = `
        <a href="#" class="content-trigger" data-content="purchase-links">
            <i class="fas fa-university"></i>
            <span>Purchase College</span>
        </a>
    `;
    
    sidebarNav.appendChild(purchaseLinkItem);
}