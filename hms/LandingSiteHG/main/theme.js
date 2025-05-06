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

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;


  if (savedTheme === 'dark' || prefersDark && !savedTheme) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }


  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        applyDarkTheme();
      } else {
        applyLightTheme();
      }
    }
  });
}); function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');

  if (isDark) {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }


  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 1000);
} function applyDarkTheme() {

  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');


  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
} function applyLightTheme() {

  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', 'light');


  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
} function navigateTo(url) {window.location.href = url;
}