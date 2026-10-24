/* Pitaloka icon set — 24×24, 2px stroke, round caps. No dependency, no network. */
window.PIT_ICONS = {
  'chevron-right': '<path d="M9 18l6-6-6-6"/>',
  'chevron-left': '<path d="M15 18l-6-6 6-6"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  square: '<rect x="4" y="4" width="16" height="16" rx="2"/>',
  ellipsis: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
  wifi: '<path d="M2 8.8a16 16 0 0120 0"/><path d="M5.5 12.6a11 11 0 0113 0"/><path d="M9 16.4a6 6 0 016 0"/><path d="M12 20h.01"/>',
  ethernet: '<rect x="3" y="7" width="18" height="9" rx="2"/><path d="M7 16v3M12 16v3M17 16v3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 010 18 15 15 0 010-18z"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 000 18z" fill="currentColor" stroke="none"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  'panel-bottom': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  'volume-2': '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M16 9a4 4 0 010 6"/><path d="M19.4 6.6a8 8 0 010 10.8"/>',
  'volume-x': '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  pointer: '<path d="M4 4l6 16 2.2-6.2L18.4 12z"/>',
  shield: '<path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7z"/>',
  command: '<path d="M6 9a3 3 0 113-3v12a3 3 0 11-3-3h12a3 3 0 113 3V6a3 3 0 11-3 3z"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'circle-check': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  'circle-x': '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
  sparkles: '<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/>',
};

window.icon = function (name, size) {
  const body = window.PIT_ICONS[name] || window.PIT_ICONS.square;
  const s = size ? ` width="${size}" height="${size}"` : '';
  return (
    `<svg${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
  );
};
