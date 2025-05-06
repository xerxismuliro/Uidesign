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



document.addEventListener('DOMContentLoaded', function () {
  setupTheme();
}); function setupTheme() {
  try {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'light' && savedTheme !== 'dark') {
      localStorage.removeItem('theme');
    }


    const preferredTheme = localStorage.getItem('theme') || 'light';


    setTheme(preferredTheme);


    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.removeEventListener('click', toggleTheme);
      themeToggle.addEventListener('click', toggleTheme);


      themeToggle.removeAttribute('onclick');
    }

    console.log('Theme system initialized with theme:', preferredTheme);
  } catch (error) {
    console.error('Error setting up theme:', error);
  }
} function toggleTheme() {
  try {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', newTheme);
    setTheme(newTheme);
  } catch (error) {
    console.error('Error toggling theme:', error);
  }
} function setTheme(theme) {try {const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');


    if (theme === 'dark') {
      root.classList.add('dark');


      if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
      }
    } else {
      root.classList.remove('dark');


      if (themeIcon) {
        themeIcon.className = 'fas fa-moon';
      }
    }


    localStorage.setItem('theme', theme);

    return true;
  } catch (error) {
    console.error('Error setting theme:', error);
    return false;
  }
}