(function () {
  function applyHandler() {
    var html = document.documentElement;
    html.classList.remove('no-js');

    var btn =
      document.querySelector('#theme-toggle') ||
      document.querySelector('[data-theme-toggle]');

    if (!btn) return;

    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    var labelEl = btn.querySelector('[data-theme-label]');

    // Label now shows what will happen when clicked
    function setLabel(isDark) {
      if (!labelEl) return;
      labelEl.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }

    function currentIsDark() {
      return html.classList.contains('theme-dark');
    }

    setLabel(currentIsDark());

    btn.addEventListener('click', function () {
      var isDark = !currentIsDark();
      html.classList.toggle('theme-dark', isDark);
      setLabel(isDark);
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (_) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHandler, { once: true });
  } else {
    applyHandler();
  }
})();