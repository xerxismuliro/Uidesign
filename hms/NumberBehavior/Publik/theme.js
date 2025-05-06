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

  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-icon-dark');
  const lightIcon = document.getElementById('theme-icon-light');


  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'inline-block';
  } else {
    darkIcon.style.display = 'inline-block';
    lightIcon.style.display = 'none';
  }


  themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme');


    if (document.body.classList.contains('dark-theme')) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'inline-block';
      localStorage.setItem('theme', 'dark');
    } else {
      darkIcon.style.display = 'inline-block';
      lightIcon.style.display = 'none';
      localStorage.setItem('theme', 'light');
    }
  });
});