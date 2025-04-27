/**
 * Builds the right sidebar
 */
function buildRightSidebar() {
    const sidebar = document.querySelector('.right-sidebar');
    if (!sidebar) return;
    
    // Clear existing content
    sidebar.innerHTML = '';
    
    // Add close button
    const closePanel = document.createElement('div');
    closePanel.className = 'close-panel';
    closePanel.innerHTML = '<i class="fas fa-times"></i>';
    sidebar.appendChild(closePanel);
    
    // Add panel content
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = 'panel1';
    panel.innerHTML = `
        <h2>Additional Information</h2>
        <p>This panel can be used for contextual help or additional features.</p>
    `;
    sidebar.appendChild(panel);
    
    // Add event listener for close button
    closePanel.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
}

// Initialize the right sidebar when the DOM is loaded
document.addEventListener('DOMContentLoaded', buildRightSidebar);