// assets/js/theme.js
(function(){
  const KEY = 'bc_theme';
  const docEl = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  // Decide initial theme
  function getPreferredTheme(){
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }

  function applyTheme(theme){
    if (theme === 'dark'){
      docEl.setAttribute('data-theme','dark');
      if (btn) btn.setAttribute('aria-pressed','true');
    } else {
      docEl.removeAttribute('data-theme');
      if (btn) btn.setAttribute('aria-pressed','false');
    }
  }

  const initial = getPreferredTheme();
  applyTheme(initial);

  if (btn){
    btn.addEventListener('click', () => {
      const nowDark = docEl.getAttribute('data-theme') !== 'dark';
      const next = nowDark ? 'dark' : 'light';
      localStorage.setItem(KEY, next);
      applyTheme(next);
    });
  }

  // Keep in sync if user changes system theme and no explicit choice saved
  if (!localStorage.getItem(KEY) && window.matchMedia){
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', e => {
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  // Sync across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === KEY && e.newValue){
      applyTheme(e.newValue);
    }
  });
})();