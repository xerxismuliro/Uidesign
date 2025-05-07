


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