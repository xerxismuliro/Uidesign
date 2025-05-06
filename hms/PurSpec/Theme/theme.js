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



class ThemeManager {constructor() {this.themeToggle = document.querySelector('.theme-toggle');
    this.body = document.body;
    this.initialize();
  } initialize() {

    this.loadSavedTheme();


    this.themeToggle.addEventListener('click', () => this.toggleTheme());


    document.addEventListener('themeChange', (event) => {
      if (event.detail.theme === 'dark') {
        this.setDarkTheme();
      } else if (event.detail.theme === 'light') {
        this.setLightTheme();
      }
    });
  } loadSavedTheme() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.setDarkTheme();
    } else if (savedTheme === 'light') {
      this.setLightTheme();
    } else {

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setDarkTheme();
      } else {
        this.setLightTheme();
      }
    }
  } toggleTheme() {
    if (this.body.classList.contains('light-theme')) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  } setDarkTheme() {
    this.body.classList.remove('light-theme');
    this.body.classList.add('dark-theme');
    this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'dark');
  } setLightTheme() {
    this.body.classList.remove('dark-theme');
    this.body.classList.add('light-theme');
    this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'light');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});