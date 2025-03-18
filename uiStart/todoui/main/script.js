
$("document").ready(function() {

$("#Events-saved-via-Browser").css({
    "border-color": "#2a5dbd",
    "border-style": "solid",
    "border-width": "1px",
});

});



document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation elements
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const leftSidebar = document.querySelector('.leftSidebarDiv');
    const overlay = document.querySelector('.sidebar-overlay');
    const menuItems = document.querySelectorAll('.section div');
    const mobileSearchContainer = document.getElementById('mobile-search-container');
    const mobileSearchBox = document.getElementById('mobileSearchBox');
    const browserEventsButton = document.getElementById('Events-saved-via-Browser');
    
    // Toggle sidebar when hamburger menu is clicked
    hamburgerMenu.addEventListener('click', function() {
        leftSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', function() {
        leftSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Hide all content divs
            document.querySelectorAll('.contentDiv').forEach(div => {
                div.style.display = 'none';
            });
            
            // Show the target content
            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                targetDiv.style.display = 'block';
                
                // Show search bar only for browser events content on mobile
                if (targetId === 'browserEventsContent') {
                    mobileSearchContainer.style.display = 'block';
                } else {
                    mobileSearchContainer.style.display = 'none';
                }
            }
            
            // Close sidebar on mobile when an item is clicked
            if (window.innerWidth <= 768) {
                leftSidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
    
    // Handle "Upcoming Events" button click (top bar)
    browserEventsButton.addEventListener('click', function() {
        // Hide all content divs
        document.querySelectorAll('.contentDiv').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show browser events content
        const browserEventsContent = document.getElementById('browserEventsContent');
        if (browserEventsContent) {
            browserEventsContent.style.display = 'block';
            
            // Show mobile search container
            if (window.innerWidth <= 768) {
                mobileSearchContainer.style.display = 'block';
            }
        }
    });
    
    // Mobile search functionality
    if (mobileSearchBox) {
        mobileSearchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const todoItems = document.querySelectorAll('#browserTodoTableBody tr');
            
            todoItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Screen resize handler
    window.addEventListener('resize', function() {
        // Show/hide mobile search container based on content and screen size
        const browserEventsContent = document.getElementById('browserEventsContent');
        
        if (window.innerWidth <= 768 && browserEventsContent && 
            browserEventsContent.style.display === 'block') {
            mobileSearchContainer.style.display = 'block';
        } else if (window.innerWidth > 768) {
            mobileSearchContainer.style.display = 'none';
        }
        
        // Hide sidebar and overlay when resizing to larger screens
        if (window.innerWidth > 768) {
            leftSidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
    
    // Function to show search bar when browser events content is displayed on mobile
    function updateMobileSearchVisibility() {
        const browserEventsContent = document.getElementById('browserEventsContent');
        
        if (window.innerWidth <= 768 && browserEventsContent && 
            browserEventsContent.style.display === 'block') {
            mobileSearchContainer.style.display = 'block';
        } else {
            mobileSearchContainer.style.display = 'none';
        }
    }
    
    // Initial update
    updateMobileSearchVisibility();
});


// Default content handling - show browserEventsContent if nothing else is shown
function showDefaultContent() {
    let anyContentVisible = false;
    document.querySelectorAll('.contentDiv').forEach(div => {
        if (div.style.display === 'block') {
            anyContentVisible = true;
        }
    });
    
    if (!anyContentVisible) {
        const browserEvents = document.getElementById('browserEventsContent');
        if (browserEvents) {
            browserEvents.style.display = 'block';
            
            // Show mobile search container if on mobile
            const mobileSearchContainer = document.getElementById('mobile-search-container');
            if (window.innerWidth <= 768 && mobileSearchContainer) {
                mobileSearchContainer.style.display = 'block';
            }
        }
    }
}

// Run after a short delay to ensure other scripts have run
setTimeout(showDefaultContent, 100);