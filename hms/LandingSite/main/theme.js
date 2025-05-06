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


  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }


  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });


  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}); 
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';


  document.body.classList.add('theme-transition');


  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);


  updateThemeIcon(newTheme);


  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 1000);
} function updateThemeIcon(theme) {const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
} function navigateTo(url) {
  window.location.href = url;
}