// SIDEBAR FUNCTIONALITY
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
    
    // Close mobile sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.left-sidebar') && 
            !event.target.closest('.nav-toggle') && 
            leftSidebar.classList.contains('show')) {
            leftSidebar.classList.remove('show');
        }
    });
}