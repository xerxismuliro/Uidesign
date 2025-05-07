// BOOKMARK MANAGEMENT
function saveBookmarkToStorage(website) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    // Add new bookmark if it doesn't exist
    if (!bookmarks.includes(website)) {
        bookmarks.push(website);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

function loadBookmarksFromStorage() {
    const bookmarksGrid = document.querySelector('.bookmarks-grid');
    const addBookmarkBtn = document.querySelector('.add-bookmark');
    if (!bookmarksGrid || !addBookmarkBtn) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    bookmarks.forEach(bookmark => {
        const newBookmark = createBookmarkElement(bookmark);
        bookmarksGrid.insertBefore(newBookmark, addBookmarkBtn);
    });
}