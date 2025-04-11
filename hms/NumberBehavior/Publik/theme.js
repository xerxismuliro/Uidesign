// Theme management

document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('theme-toggle');
  
  // Apply saved theme if available
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = 'Toggle Light Mode';
  } else {
    themeToggle.textContent = 'Toggle Dark Mode';
  }

  // Set up theme toggle button
  themeToggle.addEventListener('click', () => {
    // Toggle dark theme class
    document.body.classList.toggle('dark-theme');
    
    // Update button text
    if (document.body.classList.contains('dark-theme')) {
      themeToggle.textContent = 'Toggle Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = 'Toggle Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
});


// // Theme management

// document.addEventListener('DOMContentLoaded', () => {
//   // Check for saved theme preference
//   const savedTheme = localStorage.getItem('theme');
//   const themeToggle = document.getElementById('theme-toggle');
//   const themeIconDark = document.getElementById('theme-icon-dark');
//   const themeIconLight = document.getElementById('theme-icon-light');
//   const themeText = document.getElementById('theme-text');
  
//   // Function to update UI based on theme
//   function updateThemeUI(isDark) {
//     if (isDark) {
//       themeIconDark.style.display = 'none';
//       themeIconLight.style.display = 'inline-block';
//       themeText.textContent = 'Toggle Light Mode';
//     } else {
//       themeIconDark.style.display = 'inline-block';
//       themeIconLight.style.display = 'none';
//       themeText.textContent = 'Toggle Dark Mode';
//     }
//   }
  
//   // Apply saved theme if available
//   if (savedTheme === 'dark') {
//     document.body.classList.add('dark-theme');
//     updateThemeUI(true);
//   } else {
//     updateThemeUI(false);
//   }

//   // Set up theme toggle button
//   themeToggle.addEventListener('click', () => {
//     // Toggle dark theme class
//     document.body.classList.toggle('dark-theme');
//     const isDarkMode = document.body.classList.contains('dark-theme');
    
//     // Update UI
//     updateThemeUI(isDarkMode);
    
//     // Save preference
//     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
//   });
// });



