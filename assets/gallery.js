/* Renders the component gallery and the list-row section from window.PIT_COMPONENTS. */
(function () {
  const ICON_RE = /\[\[([a-z0-9-]+)\]\]/g;
  const live = (html) => html.replace(ICON_RE, (_, n) => window.icon(n));
  const asCode = (html) => html.replace(ICON_RE, (_, n) => `<!-- icon: ${n} -->`);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function specCard(c) {
    const art = document.createElement('article');
    art.className = 'spec' + (c.wide ? ' spec--wide' : '');
    art.innerHTML =
      `<div class="spec__preview pit">${live(c.html)}</div>` +
      `<div class="spec__meta">` +
      `<h4>${c.name}</h4>` +
      `<p class="map">GTK&nbsp; ${c.gtk}</p>` +
      `<p class="map">Qt&nbsp;&nbsp;&nbsp; ${c.qt}</p>` +
      `</div>` +
      `<details class="spec__code"><summary>HTML</summary>` +
      `<div class="code"><header><span>${c.name}</span><button class="copy">copy</button></header>` +
      `<pre><code>${esc(asCode(c.html))}</code></pre></div></details>`;
    art.querySelector('.copy').addEventListener('click', () =>
      window.pitCopy(asCode(c.html), c.name)
    );
    return art;
  }

  const host = document.querySelector('#gallery');
  const groups = [...new Set(window.PIT_COMPONENTS.map((c) => c.group))];
  groups.forEach((g) => {
    const sec = document.createElement('section');
    sec.id = 'g-' + g.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
    sec.innerHTML = `<header><h3>${g}</h3></header>`;
    const grid = document.createElement('div');
    grid.className = 'grid';
    window.PIT_COMPONENTS.filter((c) => c.group === g).forEach((c) => grid.appendChild(specCard(c)));
    sec.appendChild(grid);
    host.appendChild(sec);
  });

  /* list rows */
  const rowsCard = document.querySelector('#rows-card');
  window.PIT_ROWS.forEach(([, html]) => {
    rowsCard.insertAdjacentHTML('beforeend', live(html));
  });
  const rowsCode = document.querySelector('#rows-code');
  rowsCode.textContent = window.PIT_ROWS.map(([name, html]) => `<!-- ${name} -->\n` + asCode(html)).join('\n\n');
  document.querySelector('#rows-copy').addEventListener('click', () =>
    window.pitCopy(rowsCode.textContent, 'List rows')
  );

  const anatomy = document.querySelector('#rows-anatomy');
  window.PIT_ROW_ANATOMY.forEach(([k, v]) => {
    anatomy.insertAdjacentHTML('beforeend', `<div class="row"><div class="key">${k}</div><div class="use">${v}</div></div>`);
  });

  /* sliders paint their own fill (webkit has no ::-webkit-slider-progress) */
  function paint(el) {
    const min = Number(el.min || 0), max = Number(el.max || 100);
    const pct = max > min ? ((Number(el.value) - min) / (max - min)) * 100 : 0;
    el.style.setProperty('--pit-fill', pct + '%');
  }
  document.querySelectorAll('.pit-slider').forEach((s) => {
    paint(s);
    s.addEventListener('input', () => paint(s));
  });

  /* segmented / tabs / option cards / dots behave like real pickers */
  document.querySelectorAll('.pit-segmented, .pit-tabs').forEach((grp) => {
    grp.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      grp.querySelectorAll('button').forEach((o) => o.setAttribute('aria-selected', String(o === b)));
    });
  });
  document.querySelectorAll('.spec__preview').forEach((prev) => {
    prev.addEventListener('click', (e) => {
      const b = e.target.closest('.pit-option, .pit-dot');
      if (!b) return;
      prev.querySelectorAll(b.classList.contains('pit-dot') ? '.pit-dot' : '.pit-option')
        .forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    });
  });
})();
