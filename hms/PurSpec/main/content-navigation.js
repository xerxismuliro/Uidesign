// CONTENT NAVIGATION
function initializeContentNavigation() {
    const contentTriggers = document.querySelectorAll('.content-trigger');
    const contentSections = document.querySelectorAll('.content-section');
    
    contentTriggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            
            const contentId = trigger.getAttribute('data-content');
            showSection(contentId);
            
            // Close sidebar on mobile when an item is selected
            if (window.innerWidth <= 768) {
                document.querySelector('.left-sidebar').classList.remove('show');
            }
        });
    });
}

function showSection(sectionId) {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}