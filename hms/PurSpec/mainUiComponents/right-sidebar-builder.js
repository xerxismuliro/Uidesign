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



function buildRightSidebar() {
  const sidebar = document.querySelector('.right-sidebar');
  if (!sidebar) return;


  sidebar.innerHTML = '';


  const closePanel = document.createElement('div');
  closePanel.className = 'close-panel';
  closePanel.innerHTML = '<i class="fas fa-times"></i>';
  sidebar.appendChild(closePanel);


  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.id = 'panel1';
  panel.innerHTML = `
        <h2>Additional Information</h2>
        <p>This panel can be used for contextual help or additional features.</p>
    `;
  sidebar.appendChild(panel);


  closePanel.addEventListener('click', function () {
    sidebar.classList.remove('active');
  });
}


document.addEventListener('DOMContentLoaded', buildRightSidebar);