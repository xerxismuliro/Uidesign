document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-icon-dark');
  const lightIcon = document.getElementById('theme-icon-light');
  
  // Apply saved theme if available
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'inline-block';
  } else {
    darkIcon.style.display = 'inline-block';
    lightIcon.style.display = 'none';
  }

  // Set up theme toggle button
  themeToggle.addEventListener('click', () => {
    // Toggle dark theme class
    document.body.classList.toggle('dark-theme');
    
    // Update icons
    if (document.body.classList.contains('dark-theme')) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'inline-block';
      localStorage.setItem('theme', 'dark');
    } else {
      darkIcon.style.display = 'inline-block';
      lightIcon.style.display = 'none';
      localStorage.setItem('theme', 'light');
    }
  });
});










