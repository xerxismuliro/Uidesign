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



function initializeContentNavigation() {
  const contentTriggers = document.querySelectorAll('.content-trigger');
  const contentSections = document.querySelectorAll('.content-section');

  contentTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      const contentId = trigger.getAttribute('data-content');
      showSection(contentId);


      if (window.innerWidth <= 768) {
        document.querySelector('.left-sidebar').classList.remove('show');
      }
    });
  });
} function showSection(sectionId) {const contentSections = document.querySelectorAll('.content-section');
  contentSections.forEach((section) => section.classList.remove('active'));

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
}