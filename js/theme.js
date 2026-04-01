
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
 
  const savedTheme = localStorage.getItem('inkspire_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('inkspire_theme', 'light');
        themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('inkspire_theme', 'dark');
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
      }
    });
  }
});
