// BitCurrents theme toggler (robust + backwards compatible)
(() => {
  const STORAGE_KEY = 'bc-theme';
  const root = document.documentElement;
  const body = document.body;

  // pick the toggle button by data attribute or class
  function getToggleBtn() {
    return document.querySelector('[data-theme-toggle], .theme-toggle');
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function resolveTheme(input) {
    if (input === 'dark' || input === 'light') return input;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const t = resolveTheme(theme);

    // Support both strategies to match any existing CSS:
    // 1) attribute on :root (html)  2) .dark class on root/body
    root.setAttribute('data-theme', t);
    root.classList.toggle('dark', t === 'dark');
    body.classList.toggle('dark', t === 'dark');

    // Update button label if present
    const btn = getToggleBtn();
    const label = btn?.querySelector('.theme-label') || btn;
    if (label) {
      label.textContent = t === 'dark' ? 'Light mode ' : 'Dark mode';
    }
  }

  function currentTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    return resolveTheme('system');
  }

  // Initial paint
  applyTheme(currentTheme());

  // Wire click handler
  const btn = getToggleBtn();
  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  });

  // If user didn't explicitly choose, track system changes
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return; // user choice wins
      applyTheme(e.matches ? 'dark' : 'light');
    });
  } catch {}
})();