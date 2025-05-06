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



document.addEventListener('DOMContentLoaded', () => {

  buildSidebar();
  buildContentSections();
  buildRightSidebar();


  initializeSidebar();
  initializeContentNavigation();
  initializeVoiceRecognition();
  initializeHistoryAndBookmarks();


  initializePurchaseLinks();


  initializeTheme();
  loadUserSettings();


  initializeEvents();

  console.log('Application initialized successfully');
}); 
function initializeEvents() {

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }


  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      document.querySelector('.left-sidebar').classList.toggle('active');
    });
  }


  document.addEventListener('click', function (e) {
    const sidebar = document.querySelector('.left-sidebar');
    const navToggle = document.querySelector('.nav-toggle');

    if (sidebar && sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    navToggle && !navToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });


  initKeyboardShortcuts();
} 
function initKeyboardShortcuts() {
  document.addEventListener('keydown', function (e) {

    if (e.altKey && e.key === 'v') {
      e.preventDefault();
      if (isListening) {
        stopVoiceRecognition(recognition);
      } else {
        startVoiceRecognition(recognition);
      }
    }


    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      showSection('help');
    }


    if (e.altKey && e.key === 's') {
      e.preventDefault();
      showSection('settings');
    }


    if (e.altKey && e.key === 't') {
      e.preventDefault();
      toggleTheme();
    }
  });
} 
function loadUserSettings() {

  const fontSize = localStorage.getItem('fontSize') || 'medium';
  document.body.setAttribute('data-font-size', fontSize);


  const fontSizeSelect = document.getElementById('font-size');
  if (fontSizeSelect) {
    fontSizeSelect.value = fontSize;
  }


  const highContrast = localStorage.getItem('highContrast') === 'true';
  if (highContrast) {
    document.body.classList.add('high-contrast');


    const highContrastToggle = document.getElementById('high-contrast');
    if (highContrastToggle) {
      highContrastToggle.checked = true;
    }
  }


  loadAudioPreferences();
} 
function addPurchaseLinksToSidebar() {


  console.log('Purchase links added to sidebar via the UI builder');
}