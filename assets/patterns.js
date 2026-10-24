/* Builds the settings-window sidebars and wires the live controls on the patterns page. */
(function () {
  const GROUPS = [
    ['Network', [['wifi', 'Wi-Fi', ''], ['ethernet', 'Ethernet', 'pit-tile--indigo'], ['globe', 'Network', 'pit-tile--cyan']]],
    ['Desktop', [['contrast', 'Appearance', 'pit-tile--cyan'], ['image', 'Wallpaper', 'pit-tile--green'],
                 ['panel-bottom', 'Dock', 'pit-tile--purple'], ['bell', 'Notifications', 'pit-tile--red']]],
    ['Devices', [['monitor', 'Display', ''], ['volume-2', 'Sound', 'pit-tile--red'],
                 ['keyboard', 'Keyboard', 'pit-tile--indigo'], ['pointer', 'Mouse', '']]],
  ];

  document.querySelectorAll('.pit-sidebar[data-active]').forEach((side) => {
    const active = side.dataset.active;
    let html = '<div class="pit-sidebar__title">Settings</div>' +
      `<div class="pit-search">${window.icon('search')}<input placeholder="Search"></div>`;
    GROUPS.forEach(([title, items]) => {
      html += `<div class="pit-sidebar__section">${title}</div>`;
      items.forEach(([ic, label, mod]) => {
        html +=
          `<button class="pit-sidebar__item"${label === active ? ' aria-current="page"' : ''}>` +
          `<span class="pit-tile pit-tile--sm ${mod}">${window.icon(ic)}</span>${label}</button>`;
      });
    });
    side.innerHTML = html;
  });

  /* deepest-first: a parent's innerHTML rewrite would detach already-processed children */
  [...document.querySelectorAll('[data-icon]')].reverse().forEach((el) => {
    el.innerHTML = window.icon(el.dataset.icon) + el.innerHTML;
  });

  function paint(el) {
    const min = Number(el.min || 0), max = Number(el.max || 100);
    const pct = max > min ? ((Number(el.value) - min) / (max - min)) * 100 : 0;
    el.style.setProperty('--pit-fill', pct + '%');
  }
  document.querySelectorAll('.pit-slider').forEach((s) => { paint(s); s.addEventListener('input', () => paint(s)); });

  document.querySelectorAll('.pit-segmented').forEach((grp) => {
    grp.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      grp.querySelectorAll('button').forEach((o) => o.setAttribute('aria-selected', String(o === b)));
    });
  });

  document.querySelectorAll('[data-picker]').forEach((grp) => {
    grp.addEventListener('click', (e) => {
      const b = e.target.closest('.pit-option, .pit-dot');
      if (!b) return;
      grp.querySelectorAll('.pit-option, .pit-dot').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    });
  });

  document.querySelectorAll('.pit-sidebar').forEach((side) => {
    side.addEventListener('click', (e) => {
      const b = e.target.closest('.pit-sidebar__item');
      if (!b) return;
      side.querySelectorAll('.pit-sidebar__item').forEach((o) => o.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'page');
      const title = b.closest('.pit-window').querySelector('.pit-headerbar__title');
      if (title) title.textContent = b.textContent.trim();
    });
  });
})();
