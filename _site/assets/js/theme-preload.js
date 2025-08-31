// /assets/js/theme-preload.js
(function () {
  var html = document.documentElement;
  // ensure we don't show “no-js” styling
  html.classList.remove('no-js');

  // preferred theme: stored or system
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (_) {}

  var prefersDark = false;
  try {
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (_) {}

  var wantDark = stored ? (stored === 'dark') : prefersDark;

  html.classList.toggle('theme-dark', !!wantDark);
})();