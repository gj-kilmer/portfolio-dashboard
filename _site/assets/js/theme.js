document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  const label = toggle?.querySelector('.theme-label');

  if (!toggle || !label) return;

  // Sync button label with current theme
  const isDark = document.documentElement.classList.contains('theme-dark');
  label.textContent = isDark ? 'Light mode' : 'Dark mode';

  toggle.addEventListener('click', () => {
    const darkNow = document.documentElement.classList.toggle('theme-dark');
    localStorage.setItem('theme', darkNow ? 'dark' : 'light');
    label.textContent = darkNow ? 'Light mode' : 'Dark mode';
  });
});