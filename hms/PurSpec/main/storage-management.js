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



function initializeHistoryAndBookmarks() {

  loadHistoryFromStorage();
  loadBookmarksFromStorage();


  setupClearHistoryButton();


  setupBookmarkHandlers();
  setupAddBookmarkButton();
} function setupClearHistoryButton() {
  const clearHistoryBtn = document.querySelector('.clear-history');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {

      localStorage.removeItem('browsing_history');


      const historyList = document.querySelector('.history-list');
      if (historyList) {
        historyList.innerHTML = '';
      }
    });
  }
} function setupBookmarkHandlers() {
  const bookmarkItems = document.querySelectorAll('.bookmark-item:not(.add-bookmark)');
  bookmarkItems.forEach((item) => {
    item.addEventListener('click', () => {
      const websiteName = item.querySelector('span').textContent;
      navigateToWebsite(websiteName);
    });
  });
} function setupAddBookmarkButton() {
  const addBookmarkBtn = document.querySelector('.add-bookmark');
  if (addBookmarkBtn) {
    addBookmarkBtn.addEventListener('click', () => {
      addNewBookmark();
    });
  }
} function addNewBookmark() {
  const bookmarkName = prompt("Enter website name:");
  if (!bookmarkName || bookmarkName.trim() === '') return;

  const bookmarksGrid = document.querySelector('.bookmarks-grid');
  const addBookmarkBtn = document.querySelector('.add-bookmark');

  if (!bookmarksGrid || !addBookmarkBtn) return;


  const newBookmark = createBookmarkElement(bookmarkName);


  bookmarksGrid.insertBefore(newBookmark, addBookmarkBtn);


  saveBookmarkToStorage(bookmarkName);
} function createBookmarkElement(bookmarkName) {const newBookmark = document.createElement('div');newBookmark.className = 'bookmark-item';
  newBookmark.innerHTML = `
        <i class="fas fa-globe"></i>
        <span>${bookmarkName}</span>
    `;


  newBookmark.addEventListener('click', () => {
    navigateToWebsite(bookmarkName);
  });

  return newBookmark;
}