// Sun/Moon animated theme toggle
(function() {
  var root = document.documentElement;
  var saved = localStorage.getItem('theme');
  if (saved === 'dark') root.classList.add('dark');
  else if (saved === 'light') root.classList.remove('dark');

  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Переключить тему');
    btn.innerHTML = '<svg class="tt-sun" viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg><svg class="tt-moon" viewBox="0 0 24 24" width="22" height="22"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function() {
      btn.classList.add('tt-spin');
      var isDark = root.classList.contains('dark') ||
        (!root.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });

    btn.addEventListener('animationend', function() {
      btn.classList.remove('tt-spin');
    });
  });
})();
