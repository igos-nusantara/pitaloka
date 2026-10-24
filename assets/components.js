/* Pitaloka component gallery — one entry per component.
   `html` is the real markup: it is injected live into the preview and shown as code.
   [[name]] is an icon placeholder (see assets/icons.js). */

window.PIT_COMPONENTS = [
  /* ------------------------------------------------ controls */
  {
    group: 'Controls', name: 'Switch', gtk: 'GtkSwitch', qt: 'QCheckBox + QStyle',
    html:
`<label class="pit-switch"><input type="checkbox" checked><span></span></label>
<label class="pit-switch"><input type="checkbox"><span></span></label>`,
  },
  {
    group: 'Controls', name: 'Checkbox', gtk: 'GtkCheckButton', qt: 'QCheckBox',
    html:
`<label class="pit-check"><input type="checkbox" checked><i></i>Checked</label>
<label class="pit-check"><input type="checkbox"><i></i>Unchecked</label>`,
  },
  {
    group: 'Controls', name: 'Radio', gtk: 'GtkCheckButton (group)', qt: 'QRadioButton',
    html:
`<label class="pit-radio"><input type="radio" name="demo-radio" checked><i></i>Selected</label>
<label class="pit-radio"><input type="radio" name="demo-radio"><i></i>Option</label>`,
  },
  {
    group: 'Controls', name: 'Slider', gtk: 'GtkScale', qt: 'QSlider',
    html: `<input class="pit-slider" type="range" min="0" max="100" value="45" style="--pit-fill:45%">`,
  },
  {
    group: 'Controls', name: 'Progress bar', gtk: 'GtkProgressBar', qt: 'QProgressBar',
    html: `<div class="pit-progress"><i style="width:60%"></i></div>`,
  },
  {
    group: 'Controls', name: 'Segmented control', gtk: 'GtkStackSwitcher', qt: 'QTabBar (document mode)',
    html:
`<div class="pit-segmented" role="tablist">
  <button role="tab" aria-selected="true">Output</button>
  <button role="tab" aria-selected="false">Input</button>
</div>`,
  },
  {
    group: 'Controls', name: 'Tab bar', gtk: 'AdwViewSwitcher', qt: 'QTabWidget',
    html:
`<div class="pit-tabs" role="tablist">
  <button role="tab" aria-selected="true">General</button>
  <button role="tab" aria-selected="false">Advanced</button>
</div>`,
  },
  {
    group: 'Controls', name: 'Select', gtk: 'GtkDropDown', qt: 'QComboBox',
    html: `<button class="pit-select">1280 × 800 [[chevron-down]]</button>`,
  },

  /* ------------------------------------------------ buttons & inputs */
  {
    group: 'Buttons & inputs', name: 'Button · Primary', gtk: 'GtkButton .suggested-action', qt: 'QPushButton[primary="true"]',
    html: `<button class="pit-btn pit-btn--primary">Connect</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Button · Secondary', gtk: 'GtkButton', qt: 'QPushButton',
    html: `<button class="pit-btn pit-btn--secondary">Cancel</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Button · Ghost', gtk: 'GtkButton .flat', qt: 'QToolButton',
    html: `<button class="pit-btn pit-btn--ghost">Show advanced options</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Button · Destructive', gtk: 'GtkButton .destructive-action', qt: 'QPushButton[danger="true"]',
    html: `<button class="pit-btn pit-btn--danger">Remove</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Button · Disabled', gtk: ':disabled', qt: 'setEnabled(false)',
    html: `<button class="pit-btn" disabled>Add</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Icon button', gtk: 'GtkButton .image-button', qt: 'QToolButton',
    html:
`<button class="pit-icon-btn">[[ellipsis]]</button>
<button class="pit-icon-btn" style="color:var(--pit-accent)">[[info]]</button>`,
  },
  {
    group: 'Buttons & inputs', name: 'Text field', gtk: 'GtkEntry', qt: 'QLineEdit',
    html:
`<input class="pit-field" placeholder="Optional">
<input class="pit-field" value="home-vpn" style="border-color:var(--pit-accent)">`,
  },
  {
    group: 'Buttons & inputs', name: 'Search field', gtk: 'GtkSearchEntry', qt: 'QLineEdit (clearable)',
    html: `<div class="pit-search">[[search]]<input placeholder="Search"></div>`,
  },

  /* ------------------------------------------------ navigation & chrome */
  {
    group: 'Navigation & chrome', name: 'Header bar', gtk: 'AdwHeaderBar', qt: 'QWidget + QToolButton', wide: true,
    html:
`<div class="pit-headerbar" style="background:var(--pit-bg-window);border-radius:12px">
  <div class="pit-headerbar__lead">
    [[chevron-left]] [[chevron-right]]
    <span class="pit-headerbar__title">Display</span>
  </div>
  <div class="pit-wincontrols">[[minus]] [[square]] [[x]]</div>
</div>`,
  },
  {
    group: 'Navigation & chrome', name: 'Dropdown menu', gtk: 'GtkPopoverMenu', qt: 'QMenu',
    html:
`<div class="pit-menu">
  <button class="pit-menu__item">1600 × 1200</button>
  <button class="pit-menu__item">1440 × 900</button>
  <button class="pit-menu__item">1280 × 800 (Recommended) [[check]]</button>
  <button class="pit-menu__item">1024 × 768</button>
</div>`,
  },
  {
    group: 'Navigation & chrome', name: 'Scrollbar', gtk: 'GtkScrollbar .overlay-indicator', qt: 'QScrollBar:vertical',
    html: `<div class="pit-scrollbar" style="height:72px"><i></i></div>`,
  },
  {
    group: 'Navigation & chrome', name: 'Sidebar item', gtk: 'GtkListBoxRow', qt: 'QListWidgetItem',
    html:
`<div style="width:216px">
  <button class="pit-sidebar__item" aria-current="page"><span class="pit-tile pit-tile--sm">[[wifi]]</span>Wi-Fi</button>
  <button class="pit-sidebar__item"><span class="pit-tile pit-tile--sm pit-tile--indigo">[[ethernet]]</span>Ethernet</button>
</div>`,
  },

  /* ------------------------------------------------ feedback & overlays */
  {
    group: 'Feedback & overlays', name: 'Toast', gtk: 'AdwToast', qt: 'frameless QFrame',
    html:
`<div class="pit-toast">
  <span class="pit-tile">[[bell]]</span>
  <div><b>Wi-Fi connected</b><span>Now connected to Biznet-5G</span></div>
</div>`,
  },
  {
    group: 'Feedback & overlays', name: 'Tooltip', gtk: 'GtkTooltip', qt: 'QToolTip',
    html: `<span class="pit-tooltip">Toggle Wi-Fi</span>`,
  },
  {
    group: 'Feedback & overlays', name: 'Badge', gtk: 'GtkLabel .pill', qt: 'QLabel[badge="true"]',
    html:
`<span class="pit-badge">Recommended</span>
<span class="pit-badge pit-badge--success">Connected</span>`,
  },
  {
    group: 'Feedback & overlays', name: 'Empty state', gtk: 'AdwStatusPage', qt: 'QLabel (centered)',
    html:
`<div style="display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--pit-text-tertiary)">
  [[volume-x]]<span class="pit-helper">No output devices</span>
</div>`,
  },
  {
    group: 'Feedback & overlays', name: 'Icon tile', gtk: 'GtkImage in .icon-tile box', qt: 'QLabel with rounded pixmap',
    html:
`<span class="pit-tile">[[wifi]]</span>
<span class="pit-tile pit-tile--red">[[volume-2]]</span>
<span class="pit-tile pit-tile--indigo">[[keyboard]]</span>
<span class="pit-tile pit-tile--green">[[image]]</span>`,
  },
  {
    group: 'Feedback & overlays', name: 'Dialog', gtk: 'AdwMessageDialog / GtkDialog', qt: 'QDialog + QDialogButtonBox', wide: true,
    html:
`<div class="pit-dialog">
  <div class="pit-dialog__head">Add VPN [[x]]</div>
  <div class="pit-dialog__body">
    <div class="pit-row"><span>Type</span><button class="pit-select">WireGuard [[chevron-down]]</button></div>
    <div class="pit-row"><span>Name</span><input class="pit-field" style="width:200px" placeholder="Optional"></div>
    <div class="pit-row"><span>Private key</span><input class="pit-field" style="width:200px" placeholder="Required"></div>
    <div class="pit-row"><button class="pit-btn pit-btn--ghost" style="padding-left:0">Show advanced options</button></div>
  </div>
  <div class="pit-dialog__foot">
    <button class="pit-btn pit-btn--secondary">Cancel</button>
    <button class="pit-btn" disabled>Add</button>
  </div>
</div>`,
  },

  /* ------------------------------------------------ choice & decoration */
  {
    group: 'Choice & decoration', name: 'Theme picker', gtk: 'GtkToggleButton group', qt: 'QButtonGroup of QToolButton', wide: true,
    html:
`<div style="display:flex;gap:16px">
  <button class="pit-option" aria-pressed="true">
    <span class="pit-option__preview"><span class="pit-option__bar"><i></i><i></i><i></i></span><span class="pit-option__canvas"><i></i><i></i></span></span>
    Light
  </button>
  <button class="pit-option pit-option--dark" aria-pressed="false">
    <span class="pit-option__preview"><span class="pit-option__bar"><i></i><i></i><i></i></span><span class="pit-option__canvas"><i></i><i></i></span></span>
    Dark
  </button>
  <button class="pit-option pit-option--auto" aria-pressed="false">
    <span class="pit-option__preview"><span class="pit-option__bar"><i></i><i></i><i></i></span><span class="pit-option__canvas"><i></i><i></i></span></span>
    Auto
  </button>
</div>`,
  },
  {
    group: 'Choice & decoration', name: 'Position picker', gtk: 'GtkToggleButton group', qt: 'QButtonGroup of QToolButton', wide: true,
    html:
`<div style="display:flex;gap:16px">
  <button class="pit-option pit-option--left" aria-pressed="false"><span class="pit-option__dock"><i></i><i></i><i></i></span>Left</button>
  <button class="pit-option" aria-pressed="true"><span class="pit-option__dock"><i></i><i></i><i></i></span>Bottom</button>
  <button class="pit-option pit-option--right" aria-pressed="false"><span class="pit-option__dock"><i></i><i></i><i></i></span>Right</button>
</div>`,
  },
  {
    group: 'Choice & decoration', name: 'Accent dots', gtk: 'GtkColorButton group', qt: 'QButtonGroup of QToolButton',
    html:
`<button class="pit-dot" aria-pressed="true">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-red)" aria-pressed="false">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-green)" aria-pressed="false">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-purple)" aria-pressed="false">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-pink)" aria-pressed="false">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-orange)" aria-pressed="false">[[check]]</button>
<button class="pit-dot" style="background:var(--pit-tile-gray)" aria-pressed="false">[[check]]</button>`,
  },
  {
    group: 'Choice & decoration', name: 'Banner', gtk: 'AdwBanner', qt: 'QFrame[banner="true"]',
    html: `<div class="pit-banner">[[info]]Changes apply to newly started applications.</div>`,
  },
  {
    group: 'Choice & decoration', name: 'Key cap', gtk: 'GtkShortcutLabel', qt: 'QLabel[keycap="true"]',
    html: `<span class="pit-keycap">Ctrl</span> + <span class="pit-keycap">Alt</span> + <span class="pit-keycap">T</span>`,
  },
];

/* list rows get their own full-width section */
window.PIT_ROWS = [
  ['Row · Toggle', `<div class="pit-row"><span>Natural scrolling</span><label class="pit-switch"><input type="checkbox" checked><span></span></label></div>`],
  ['Row · Value', `<div class="pit-row"><span>Layout</span><span class="pit-row__trail">English (US) [[chevron-right]]</span></div>`],
  ['Row · Navigation', `<div class="pit-row"><span class="pit-row__lead"><span class="pit-tile pit-tile--indigo">[[command]]</span>Keyboard Shortcuts</span><span class="pit-row__trail">[[chevron-right]]</span></div>`],
  ['Row · Select', `<div class="pit-row"><span>Refresh rate</span><button class="pit-select">74.99 Hz [[chevron-down]]</button></div>`],
  ['Row · Check', `<div class="pit-row"><span>Ctrl</span><span class="pit-check--row">[[check]]</span></div>`],
  ['Row · Radio', `<div class="pit-row"><label class="pit-radio"><input type="radio" name="demo-proxy" checked><i></i>No proxy</label></div>`],
  ['Row · Slider', `<div class="pit-row"><span>Pointer speed</span><input class="pit-slider" type="range" value="55" style="--pit-fill:55%;max-width:320px"></div>`],
  ['Row · Field', `<div class="pit-row"><span>Private key</span><input class="pit-field" style="width:280px" placeholder="Required"></div>`],
  ['Row · Empty state', `<div class="pit-row"><span class="pit-row__muted">No output devices</span></div>`],
];

window.PIT_ROW_ANATOMY = [
  ['Height', '44px minimum, grows with the control'],
  ['Padding', '12px vertical · 16px horizontal'],
  ['Label', 'Body 14 / text-primary, never truncated'],
  ['Trailing', 'one control, right aligned, 12px gap'],
  ['Divider', '1px divider token, inset 16px from the left'],
  ['Group', 'rounded 12px card on bg-window, never nested'],
  ['GTK', 'GtkListBox .boxed-list + GtkListBoxRow'],
  ['Qt', 'QFrame#Card + QWidget rows in a QVBoxLayout'],
];
