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
  console.log('Document loaded');
  window.electronAPI.onPinWindowReply((data) => {
    console.log('Received pin window reply');
    const contentDiv = document.querySelector('.contentDiv');
    console.log('Updating contentDiv with data:', data);
    contentDiv.textContent += data + '\n';
  });
});

document.getElementById('pinWindowButton').addEventListener('click', () => {
  console.log('Pin Window button clicked');

  window.focus();

  window.electronAPI.pinWindow();
  console.log('Pin Window command sent');
});