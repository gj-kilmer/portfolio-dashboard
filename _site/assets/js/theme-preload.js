// /assets/js/theme-preload.js
(function () {
  try {
    let theme = localStorage.getItem('theme');
    if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    if (!theme) theme = 'dark';
    if (theme === 'dark') document.documentElement.classList.add('theme-dark');
    else document.documentElement.classList.remove('theme-dark');
  } catch {
    document.documentElement.classList.add('theme-dark');
  }
})();