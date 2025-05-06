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
}


document.querySelectorAll('.nav-item').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });


      document.querySelectorAll('.nav-item').forEach((item) => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});