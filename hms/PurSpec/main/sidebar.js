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



function initializeSidebar() {
  const navToggle = document.querySelector('.nav-toggle');
  const leftSidebar = document.querySelector('.left-sidebar');
  const rightSidebar = document.querySelector('.right-sidebar');
  const closePanel = document.querySelector('.close-panel');

  navToggle.addEventListener('click', () => {
    leftSidebar.classList.toggle('show');
  });

  closePanel.addEventListener('click', () => {
    rightSidebar.classList.remove('show');
  });


  document.addEventListener('click', (event) => {
    if (!event.target.closest('.left-sidebar') &&
    !event.target.closest('.nav-toggle') &&
    leftSidebar.classList.contains('show')) {
      leftSidebar.classList.remove('show');
    }
  });
}