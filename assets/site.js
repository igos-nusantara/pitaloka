/* Pitaloka token docs — renders every section from window.PITALOKA_TOKENS. */
(function () {
  const T = window.PITALOKA_TOKENS;
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- theme ---------- */
  const saved = localStorage.getItem('pit-theme') || 'light';
  document.documentElement.dataset.theme = saved;
  document.querySelectorAll('.segmented button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.theme === saved));
    b.addEventListener('click', () => {
      document.documentElement.dataset.theme = b.dataset.theme;
      localStorage.setItem('pit-theme', b.dataset.theme);
      document.querySelectorAll('.segmented button').forEach((o) =>
        o.setAttribute('aria-pressed', String(o === b))
      );
      renderColors();
    });
  });

  /* ---------- copy ---------- */
  const toast = el('div', 'toast');
  document.body.appendChild(toast);
  function copy(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      toast.textContent = (label || 'Copied') + ' — ' + text;
      toast.classList.add('show');
      clearTimeout(copy.t);
      copy.t = setTimeout(() => toast.classList.remove('show'), 1600);
    });
  }

  /* ---------- meta ---------- */
  $('#meta-name').textContent = T.$meta.name;
  $('#meta-desc').textContent = T.$meta.description;
  $('#meta-version').textContent = 'v' + T.$meta.version;
  $('#stat-colors').textContent = Object.keys(T.color).length;
  $('#stat-tokens').textContent =
    Object.keys(T.color).length +
    Object.keys(T.radius).length +
    Object.keys(T.space).length +
    Object.keys(T.metric).length +
    Object.keys(T.type).length +
    Object.keys(T.elevation).length +
    2;

  /* ---------- colours ---------- */
  const GROUPS = [
    ['Surfaces', ['bg-window', 'bg-sidebar', 'bg-card', 'bg-field', 'bg-hover', 'bg-selected']],
    ['Text', ['text-primary', 'text-secondary', 'text-tertiary', 'text-on-accent']],
    ['Lines', ['border', 'divider', 'track-off']],
    ['Accent & status', ['accent', 'accent-hover', 'accent-soft', 'success', 'warning', 'danger', 'caution-text']],
    ['Icon tiles', Object.keys(T.color).filter((n) => n.startsWith('tile-'))],
  ];

  function renderColors() {
    const host = $('#colors');
    host.innerHTML = '';
    const theme = document.documentElement.dataset.theme;
    GROUPS.forEach(([title, names]) => {
      host.appendChild(el('div', 'group-label', title));
      const grid = el('div', 'swatches');
      names.forEach((name) => {
        const t = T.color[name];
        const b = el('button', 'swatch');
        b.innerHTML =
          `<div class="chipcolor" style="background:${t[theme]}"></div>` +
          `<div class="name">--pit-${name}</div>` +
          `<div class="val">${t.light} &nbsp;·&nbsp; ${t.dark}</div>` +
          `<div class="use">${t.use}</div>`;
        b.addEventListener('click', () => copy(`var(--pit-${name})`, name));
        grid.appendChild(b);
      });
      host.appendChild(grid);
    });
  }
  renderColors();

  /* ---------- typography ---------- */
  const typeHost = $('#type .rows');
  Object.entries(T.type).forEach(([name, t]) => {
    const row = el('div', 'row');
    const font = t.font === 'mono' ? T.font.mono : T.font.ui;
    row.innerHTML =
      `<div class="key">${name}</div>` +
      `<div class="spec">${t.size} / ${t.weight} / ${t.tracking}</div>` +
      `<div class="sample" style="font-family:'${font}',system-ui;font-size:${t.size}px;` +
      `font-weight:${t.weight};letter-spacing:${t.tracking}px">${
        t.font === 'mono' ? 'Ctrl + Alt + T' : t.size >= 40 ? 'Aa' : 'Aa Interface'
      }</div>` +
      `<div class="use">${t.use}</div>`;
    typeHost.appendChild(row);
  });

  /* ---------- scales ---------- */
  function scale(hostSel, data, fmt, demo) {
    const host = $(hostSel);
    Object.entries(data).forEach(([name, t]) => {
      const row = el('div', 'row');
      row.innerHTML =
        `<div class="key">${fmt(name)}</div>` +
        `<div class="spec">${t.value}px</div>` +
        `<div class="sample">${demo(t.value)}</div>` +
        `<div class="use">${t.use}</div>`;
      host.appendChild(row);
    });
  }
  scale('#radius .rows', T.radius, (n) => `--pit-radius-${n}`, (v) =>
    `<div class="radius-demo" style="border-radius:${Math.min(v, 22)}px"></div>`
  );
  scale('#space .rows', T.space, (n) => `--pit-space-${n}`, (v) =>
    `<div class="bar" style="width:${Math.min(v * 4, 160)}px"></div>`
  );
  const maxMetric = Math.max(...Object.values(T.metric).map((m) => m.value));
  scale('#metric .rows', T.metric, (n) => `--pit-${n}`, (v) =>
    `<div class="metric-demo" style="width:${Math.max(4, (v / maxMetric) * 180)}px"></div>`
  );

  const elevHost = $('#elevation .rows');
  Object.entries(T.elevation).forEach(([name, t]) => {
    const row = el('div', 'row');
    row.innerHTML =
      `<div class="key">--pit-elevation-${name}</div>` +
      `<div class="spec">${t.shadow}</div>` +
      `<div class="sample"><div class="elev-demo" style="box-shadow:${t.shadow}"></div></div>` +
      `<div class="use">${t.use}</div>`;
    elevHost.appendChild(row);
  });

  const stateHost = $('#state .rows');
  Object.entries(T.state).forEach(([name, text]) => {
    const row = el('div', 'row');
    row.innerHTML = `<div class="key">${name}</div><div class="use">${text}</div>`;
    stateHost.appendChild(row);
  });

  /* ---------- usage snippets ---------- */
  const SNIPPETS = {
    web: `<!-- 1. ship the generated variables -->
<link rel="stylesheet" href="tokens/pitaloka-web.css">

<style>
  .card {
    background: var(--pit-bg-card);
    border-radius: var(--pit-radius-card);
    box-shadow: var(--pit-elevation-card);
  }
  .row            { min-height: var(--pit-row-height);
                    padding: var(--pit-space-3) var(--pit-space-4); }
  .row:hover      { background: var(--pit-bg-hover); }
  .btn-primary    { background: var(--pit-accent);
                    color: var(--pit-text-on-accent);
                    border-radius: var(--pit-radius-control); }
  .btn-primary:focus-visible {
    outline: var(--pit-focus-ring) solid var(--pit-accent);
    outline-offset: var(--pit-focus-offset);
  }
</style>

<!-- dark mode: follows the OS, or force it -->
<html data-theme="dark">`,
    gtk: `# load the generated theme at start-up
from gi.repository import Gtk, Gdk

provider = Gtk.CssProvider()
provider.load_from_path("tokens/pitaloka.css")
Gtk.StyleContext.add_provider_for_display(
    Gdk.Display.get_default(),
    provider,
    Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION,
)

# the widgets the theme expects
window.add_css_class("settings")
listbox.add_css_class("boxed-list")
save_button.add_css_class("suggested-action")
delete_button.add_css_class("destructive-action")`,
    qt: `// load the generated style sheet at start-up
QFile f(":/tokens/pitaloka.qss");
f.open(QFile::ReadOnly);
qApp->setStyleSheet(QString::fromUtf8(f.readAll()));

// the object names and properties the sheet expects
window->setObjectName("SettingsWindow");
sidebar->setObjectName("Sidebar");
card->setObjectName("Card");
row->setObjectName("Row");

saveButton->setProperty("primary", true);
deleteButton->setProperty("danger", true);`,
  };
  Object.entries(SNIPPETS).forEach(([key, code]) => {
    const pre = $('#snippet-' + key);
    pre.textContent = code;
  });
  document.querySelectorAll('.copy').forEach((btn) => {
    btn.addEventListener('click', () => copy($('#snippet-' + btn.dataset.target).textContent, 'Snippet'));
  });

  /* ---------- nav highlight ---------- */
  const links = [...document.querySelectorAll('.nav a')];
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        $('#where').textContent = e.target.querySelector('h3, h2').textContent;
      });
    },
    { rootMargin: '-48px 0px -70% 0px' }
  );
  document.querySelectorAll('section').forEach((s) => obs.observe(s));
})();
