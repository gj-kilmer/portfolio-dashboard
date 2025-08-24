// BitCurrents theme toggler (synced with preload script)
(function () {
  const STORAGE_KEY = 'theme';       // <-- matches the inline preload script
  const root = document.documentElement;

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }
  function storeTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('theme-dark', isDark);

    const btn = document.querySelector('.theme-toggle');
    const label = btn ? btn.querySelector('.theme-label') : null;
    if (btn) btn.setAttribute('aria-pressed', String(isDark));
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  function currentTheme() {
    const saved = getStoredTheme();
    if (saved === 'dark' || saved === 'light') return saved;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function init() {
    // Apply initial theme (preload already set class; this keeps JS state aligned)
    applyTheme(currentTheme());

    // Toggle click
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const now = root.classList.contains('theme-dark') ? 'dark' : 'light';
        const next = now === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        storeTheme(next);
      });
    }

    // Follow OS changes only when user hasn't explicitly chosen
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const react = () => {
        const saved = getStoredTheme();
        if (saved === 'dark' || saved === 'light') return; // user choice wins
        applyTheme(systemPrefersDark() ? 'dark' : 'light');
      };
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', react);
      } else if (typeof mq.addListener === 'function') {
        mq.addListener(react); // Safari < 14
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();