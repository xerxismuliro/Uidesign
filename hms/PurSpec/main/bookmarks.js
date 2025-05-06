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



function saveBookmarkToStorage(website) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');


  if (!bookmarks.includes(website)) {
    bookmarks.push(website);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
} function loadBookmarksFromStorage() {
  const bookmarksGrid = document.querySelector('.bookmarks-grid');
  const addBookmarkBtn = document.querySelector('.add-bookmark');
  if (!bookmarksGrid || !addBookmarkBtn) return;

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

  bookmarks.forEach((bookmark) => {
    const newBookmark = createBookmarkElement(bookmark);
    bookmarksGrid.insertBefore(newBookmark, addBookmarkBtn);
  });
}