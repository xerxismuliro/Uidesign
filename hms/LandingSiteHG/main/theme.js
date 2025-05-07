document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (prefersDark && !savedTheme)) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
    
    // Add listener for OS theme change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                applyDarkTheme();
            } else {
                applyLightTheme();
            }
        }
    });
});

function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    
    if (isDark) {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
    
    // Add transition effects
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

function applyDarkTheme() {
    // Simply add the dark class to the root element
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // Update icon
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

function applyLightTheme() {
    // Simply remove the dark class from the root element
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    // Update icon
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function navigateTo(url) {
    window.location.href = url;
}