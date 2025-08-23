// assets/js/theme.js
(function () {
  const KEY = 'bc_theme';
  const docEl = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const label = btn ? btn.querySelector('.theme-label') : null;

  function log(...args){ try{ console.log('[theme]', ...args); }catch(_){} }

  function getPreferredTheme(){
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }

  function applyTheme(theme){
    if (theme === 'dark'){
      docEl.setAttribute('data-theme', 'dark');
      if (btn) btn.setAttribute('aria-pressed','true');
      if (label) label.textContent = 'Light mode';
      log('applied', theme);
    } else {
      docEl.removeAttribute('data-theme');
      if (btn) btn.setAttribute('aria-pressed','false');
      if (label) label.textContent = 'Dark mode';
      log('applied', theme);
    }
  }

  const initial = getPreferredTheme();
  applyTheme(initial);

  if (btn){
    btn.addEventListener('click', () => {
      const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(KEY, next);
      applyTheme(next);
    });
  } else {
    log('toggle button not found');
  }

  if (!localStorage.getItem(KEY) && window.matchMedia){
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', e => applyTheme(e.matches ? 'dark' : 'light'));
  }

  window.addEventListener('storage', (e) => {
    if (e.key === KEY && e.newValue) applyTheme(e.newValue);
  });
})();