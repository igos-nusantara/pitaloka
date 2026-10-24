# Pitaloka — Design Tokens

Design tokens for **Pitaloka**, one interface language for **GTK 4** and **Qt 6** on Linux.
One JSON file is the source of truth; a build step emits a web stylesheet, a GTK theme, a Qt style
sheet, a C header and a documentation page — so a token change lands everywhere in one commit.

Open **`index.html`** in a browser for the visual documentation (light/dark toggle, click any swatch
to copy its variable). **`TOKENS.md`** is the same reference in plain Markdown.

---

## Folder structure

```
bayu-design-token/
├── index.html              Documentation site (open directly, no server needed)
├── README.md               This guide
├── TOKENS.md               Generated token reference tables
├── tokens/
│   ├── tokens.json         ← the only file you edit
│   ├── pitaloka-web.css    CSS custom properties (light + dark)
│   ├── pitaloka.css        GTK 4 / libadwaita theme
│   ├── pitaloka.qss        Qt 6 style sheet
│   └── pitaloka.h          C constants
├── assets/
│   ├── site.css            Docs page styling (uses the tokens)
│   ├── site.js             Renders every section from the tokens
│   └── tokens-data.js      Generated — tokens.json inlined for the page
└── build/
    └── generate.py         The build step (Python 3, no dependencies)
```

## Regenerating

```bash
python3 build/generate.py
```

Reads `tokens/tokens.json` and rewrites every generated file listed above. Run it after any token
edit; never hand-edit a file whose header says *generated*.

---

## Naming

```
--pit-<role>            colour, e.g. --pit-bg-card, --pit-text-secondary, --pit-accent
--pit-radius-<name>     tile · control · menu · card · pill
--pit-space-<step>      1..6 on a 4px rhythm
--pit-<metric>          row-height, control-height, switch-width, sidebar-width, …
--pit-elevation-<level> card · menu · dialog
```

Tokens are named after their **role**, never their value: `--pit-bg-card`, not `--pit-white`.
That is what lets the same token resolve to `#FFFFFF` in light and `#2C2C2E` in dark.

In GTK the same names appear as `@pitaloka_bg_card` (hyphens become underscores); in Qt they are
inlined as literal values by the generator, because QSS has no variables.

## Theming

Every colour carries a `light` and a `dark` value.

- **Web** — `pitaloka-web.css` ships `:root` (light), `[data-theme="dark"]`, and a
  `prefers-color-scheme: dark` fallback. Force a theme with `<html data-theme="dark">`.
- **GTK** — the dark values live in a `.dark` block; follow `prefers-color-scheme` via
  `AdwStyleManager`.
- **Qt** — the generator writes light values; regenerate with a dark build or swap the sheet on
  `QEvent::PaletteChange`.

---

## Usage

### Web

```html
<link rel="stylesheet" href="tokens/pitaloka-web.css">
<style>
  .card { background: var(--pit-bg-card);
          border-radius: var(--pit-radius-card);
          box-shadow: var(--pit-elevation-card); }
  .row  { min-height: var(--pit-row-height);
          padding: var(--pit-space-3) var(--pit-space-4); }
  .row:hover { background: var(--pit-bg-hover); }
  .btn-primary { background: var(--pit-accent); color: var(--pit-text-on-accent); }
  .btn-primary:focus-visible {
    outline: var(--pit-focus-ring) solid var(--pit-accent);
    outline-offset: var(--pit-focus-offset);
  }
</style>
```

### GTK 4 / libadwaita

```python
provider = Gtk.CssProvider()
provider.load_from_path("tokens/pitaloka.css")
Gtk.StyleContext.add_provider_for_display(
    Gdk.Display.get_default(), provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION)

window.add_css_class("settings")          # window.settings
listbox.add_css_class("boxed-list")       # card + rows + dividers
save_button.add_css_class("suggested-action")
delete_button.add_css_class("destructive-action")
```

### Qt 6

```cpp
QFile f(":/tokens/pitaloka.qss");
f.open(QFile::ReadOnly);
qApp->setStyleSheet(QString::fromUtf8(f.readAll()));

window->setObjectName("SettingsWindow");
sidebar->setObjectName("Sidebar");
card->setObjectName("Card");
row->setObjectName("Row");

saveButton->setProperty("primary", true);
deleteButton->setProperty("danger", true);
```

The style sheet keys off object names (`SettingsWindow`, `Sidebar`, `Card`, `Row`) and the
properties `primary` and `danger`. Set them and the widget inherits the whole system.

---

## Widget mapping

| Component | GTK 4 / libadwaita | Qt 6 |
| --- | --- | --- |
| Window shell | `AdwApplicationWindow` | `QMainWindow` |
| Sidebar | `AdwNavigationSplitView` | `QListWidget#Sidebar` |
| Header bar | `AdwHeaderBar` | `QWidget#HeaderBar` |
| List group | `GtkListBox .boxed-list` | `QFrame#Card` |
| Row | `AdwActionRow` | `QWidget#Row` |
| Switch row | `AdwSwitchRow` | `QWidget#Row` + `QCheckBox` |
| Combo row | `AdwComboRow` | `QWidget#Row` + `QComboBox` |
| Entry | `AdwEntryRow` / `GtkEntry` | `QLineEdit` |
| Slider | `GtkScale` | `QSlider` |
| Menu | `GtkPopoverMenu` | `QMenu` |
| Dialog | `AdwMessageDialog` | `QDialog` |
| Badge | `GtkLabel .pill` | `QLabel[badge="true"]` |

---

## Rules

**Do**

- One suggested action per view.
- Group related rows into a single card with a caption above it.
- Label on the left, exactly one control on the right.
- Keep the focus ring visible — it is the only accessibility affordance you get for free.
- Ship light and dark together; both come from the same tokens.

**Don't**

- Nest a card inside another card.
- Signal state with colour alone.
- Add a second accent colour.
- Put two interactive controls in one row.
- Hard-code a hex value anywhere outside `tokens/tokens.json`.

---

## Notes

- `radius.menu` and `radius.pill` are documented constants: they are used inline in the design file
  but are not yet variables there. Everything else maps 1:1 to a variable in `ign-systemdesign.pen`.
- Icon-tile colours are fixed brand hues and intentionally do not change between themes.
- `index.html` loads Inter and JetBrains Mono from Google Fonts; offline, it falls back to the
  system UI and monospace faces.
