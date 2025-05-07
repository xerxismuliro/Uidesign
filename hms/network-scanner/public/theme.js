
document.addEventListener('DOMContentLoaded', function() {
    setupTheme();
});

function setupTheme() {
    try {
        // Clear any invalid theme in localStorage (optional)
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && savedTheme !== 'light' && savedTheme !== 'dark') {
            localStorage.removeItem('theme');
        }
        
        // Get theme preference with a fallback
        const preferredTheme = localStorage.getItem('theme') || 'light';
        
        // Apply theme
        setTheme(preferredTheme);
        
        // Set up event listener (using removeEventListener first to avoid duplicates)
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.removeEventListener('click', toggleTheme);
            themeToggle.addEventListener('click', toggleTheme);
            
            // Remove any inline onclick handlers
            themeToggle.removeAttribute('onclick');
        }
        
        console.log('Theme system initialized with theme:', preferredTheme);
    } catch (error) {
        console.error('Error setting up theme:', error);
    }
}

function toggleTheme() {
    try {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        console.log('Toggling theme from', isDark ? 'dark' : 'light', 'to', newTheme);
        setTheme(newTheme);
    } catch (error) {
        console.error('Error toggling theme:', error);
    }
}

function setTheme(theme) {
    try {
        const root = document.documentElement;
        const themeIcon = document.getElementById('theme-icon');
        
        // Update root class
        if (theme === 'dark') {
            root.classList.add('dark');
            
            // Update icon if it exists
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        } else {
            root.classList.remove('dark');
            
            // Update icon if it exists
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
        }
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        return true; // Indicate success
    } catch (error) {
        console.error('Error setting theme:', error);
        return false;
    }
}