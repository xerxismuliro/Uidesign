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



function navigateTo(url) {
  window.open(url, '_blank');
} function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');

  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    html.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}