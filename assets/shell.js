/* Shared page shell: theme toggle, clipboard + toast, sidebar page highlight. */
(function () {
  const saved = localStorage.getItem('pit-theme') || 'light';
  document.documentElement.dataset.theme = saved;

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.segmented button[data-theme]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.theme === document.documentElement.dataset.theme));
      b.addEventListener('click', () => {
        document.documentElement.dataset.theme = b.dataset.theme;
        localStorage.setItem('pit-theme', b.dataset.theme);
        document.querySelectorAll('.segmented button[data-theme]').forEach((o) =>
          o.setAttribute('aria-pressed', String(o === b))
        );
        window.dispatchEvent(new CustomEvent('pit-theme', { detail: b.dataset.theme }));
      });
    });

    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a[data-page]').forEach((a) => {
      if (a.dataset.page === page) a.classList.add('active');
    });
  });

  const toast = document.createElement('div');
  toast.className = 'toast';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(toast));

  window.pitCopy = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      toast.textContent = (label || 'Copied') + ' — ' + text.split('\n')[0].slice(0, 48);
      toast.classList.add('show');
      clearTimeout(window.pitCopy.t);
      window.pitCopy.t = setTimeout(() => toast.classList.remove('show'), 1600);
    });
  };
})();
