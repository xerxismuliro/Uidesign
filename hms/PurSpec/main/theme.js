
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.body = document.body;
        this.initialize();
    }

    initialize() {
        // Set initial theme based on system preference or saved preference
        this.loadSavedTheme();
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for theme changes via voice command
        document.addEventListener('themeChange', (event) => {
            if (event.detail.theme === 'dark') {
                this.setDarkTheme();
            } else if (event.detail.theme === 'light') {
                this.setLightTheme();
            }
        });
    }

    loadSavedTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            this.setDarkTheme();
        } else if (savedTheme === 'light') {
            this.setLightTheme();
        } else {
            // Check system preference if no saved preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.setDarkTheme();
            } else {
                this.setLightTheme();
            }
        }
    }

    toggleTheme() {
        if (this.body.classList.contains('light-theme')) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    setDarkTheme() {
        this.body.classList.remove('light-theme');
        this.body.classList.add('dark-theme');
        this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }

    setLightTheme() {
        this.body.classList.remove('dark-theme');
        this.body.classList.add('light-theme');
        this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});