// BitCurrents theme toggler (simple & robust)
(function () {
  const STORAGE_KEY = 'bc_theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* ignore */
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    // Our CSS keys off `.theme-dark` on the <html> element
    root.classList.toggle('theme-dark', isDark);

    // Update toggle button UI if present
    const btn = document.querySelector('.theme-toggle');
    const label = btn ? btn.querySelector('.theme-label') : null;
    if (btn) btn.setAttribute('aria-pressed', String(isDark));
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  function currentTheme() {
    const stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function init() {
    // Apply initial theme
    applyTheme(currentTheme());

    // Wire up toggle
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const now = root.classList.contains('theme-dark') ? 'dark' : 'light';
        const next = now === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        storeTheme(next);
      });
    }

    // If user hasn't explicitly chosen, follow OS changes
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const react = () => {
        const stored = getStoredTheme();
        if (stored === 'dark' || stored === 'light') return; // user choice wins
        applyTheme(systemPrefersDark() ? 'dark' : 'light');
      };
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', react);
      } else if (typeof mq.addListener === 'function') {
        // Safari < 14
        mq.addListener(react);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
