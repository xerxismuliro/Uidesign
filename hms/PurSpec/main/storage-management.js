// HISTORY AND BOOKMARKS
function initializeHistoryAndBookmarks() {
    // Load saved data
    loadHistoryFromStorage();
    loadBookmarksFromStorage();
    
    // Setup clear history button
    setupClearHistoryButton();
    
    // Setup bookmark functionality
    setupBookmarkHandlers();
    setupAddBookmarkButton();
}

function setupClearHistoryButton() {
    const clearHistoryBtn = document.querySelector('.clear-history');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            // Clear from localStorage
            localStorage.removeItem('browsing_history');
            
            // Clear UI
            const historyList = document.querySelector('.history-list');
            if (historyList) {
                historyList.innerHTML = '';
            }
        });
    }
}

function setupBookmarkHandlers() {
    const bookmarkItems = document.querySelectorAll('.bookmark-item:not(.add-bookmark)');
    bookmarkItems.forEach(item => {
        item.addEventListener('click', () => {
            const websiteName = item.querySelector('span').textContent;
            navigateToWebsite(websiteName);
        });
    });
}

function setupAddBookmarkButton() {
    const addBookmarkBtn = document.querySelector('.add-bookmark');
    if (addBookmarkBtn) {
        addBookmarkBtn.addEventListener('click', () => {
            addNewBookmark();
        });
    }
}

function addNewBookmark() {
    const bookmarkName = prompt("Enter website name:");
    if (!bookmarkName || bookmarkName.trim() === '') return;
    
    const bookmarksGrid = document.querySelector('.bookmarks-grid');
    const addBookmarkBtn = document.querySelector('.add-bookmark');
    
    if (!bookmarksGrid || !addBookmarkBtn) return;
    
    // Create bookmark element
    const newBookmark = createBookmarkElement(bookmarkName);
    
    // Insert before the add button
    bookmarksGrid.insertBefore(newBookmark, addBookmarkBtn);
    
    // Store in localStorage
    saveBookmarkToStorage(bookmarkName);
}

function createBookmarkElement(bookmarkName) {
    const newBookmark = document.createElement('div');
    newBookmark.className = 'bookmark-item';
    newBookmark.innerHTML = `
        <i class="fas fa-globe"></i>
        <span>${bookmarkName}</span>
    `;
    
    // Add click handler
    newBookmark.addEventListener('click', () => {
        navigateToWebsite(bookmarkName);
    });
    
    return newBookmark;
}