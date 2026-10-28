# Radius, borders, elevation

## 1. Radius scale

| Token | px | Applies to (exclusive) |
|---|---|---|
| `radius-tag` (sm) | **4** | status pills, filter tags, checkboxes, kbd hints, tooltips, skeleton blocks |
| `radius-control` (md) | **6** | buttons, inputs, selects, textareas, segmented controls, tab focus shape, menu items (inner 5px), icon buttons |
| `radius-button` / `radius-menu-item` (md) | **6** | buttons, menu items, segmented-control items, tabs' focus shape |
| `radius-card` (lg) | **8** | cards, panels, popovers, menus, toasts, table container, images in cards |
| `radius-modal` (xl) | **12** | modals, sheets, large containers, dropzones |
| `radius-round` (full) | 9999 | avatars, count dots, status dots **only** |

Hard rules:
1. **One radius per element class. Never mix.** Buttons, inputs and selects share **6px** so a field and its button sit flush as one family. Tags, pills, checkboxes and tooltips are **4px**. Cards and popovers 8, modals 12.
2. Nested radius: inner radius = outer radius − padding, min 4. A 8px card with 4px padding holds a 4px child.
3. `rounded-2xl`, `rounded-3xl`, `rounded-full` on buttons, cards, or pills are banned.
4. Tailwind classes: `rounded-control`, `rounded-button`, `rounded-card`, `rounded-modal`, `rounded-round`. The stock `rounded-md` etc. are not used in product code.
5. Table rows, dividers, and full-bleed images have radius 0.
6. Edges where a surface touches a viewport edge (sidebar, topbar, sheet at screen edge) have radius 0 on that edge.

## 2. Borders

| Use | Spec |
|---|---|
| Default surface edge (card, panel, table) | 1px `color-border-subtle` |
| Control boundary (input, checkbox, radio, switch, secondary button) | 1px `color-border-control` (3.75:1) |
| Hover on control | 1px `color-border-strong` → `text-secondary` for inputs |
| Selected card/tile | 1px `color-border-strong` + `color-selected-bar` 2px inline-start indicator |
| Focus | 2px ring via `box-shadow`, not border (§ `accessibility.md`) |
| Internal dividers | 0 or 1px `border-subtle`. Prefer spacing; add a divider only when groups collide |
| Section dividers | 1px `border-subtle`, full width of container |

Banned: 2px+ decorative borders, colored left-border "accent cards", dashed borders except dropzones (1px dashed `border-control`), gradient borders, double borders, border + shadow on the same flat surface.

## 3. Elevation

Four levels. Product UI is flat: **borders separate surfaces; shadows are only for floating layers** (popover, menu, modal, toast, tooltip). Every shadow includes a 1px hairline ring so the edge reads on any background.

| Level | Token | Used by | Light value | Dark value |
|---|---|---|---|---|
| 0 | `shadow-0` | everything in-flow: page, cards, tables, panels, sidebar | none | none |
| 1 | `shadow-raised` | card on hover (interactive cards only), sticky header when scrolled | `0 0 0 1px rgb(16 24 32 / .06), 0 1px 2px rgb(16 24 32 / .06)` | none (border only) |
| 2 | `shadow-dropdown` | menu, popover, select list, tooltip, toast | `0 0 0 1px rgb(16 24 32 / .08), 0 4px 12px -2px rgb(16 24 32 / .12)` | `0 0 0 1px rgb(255 255 255 / .08), 0 4px 12px -2px rgb(0 0 0 / .5)` |
| 3 | `shadow-modal` | modal, sheet, command palette | `0 0 0 1px rgb(16 24 32 / .10), 0 12px 32px -4px rgb(16 24 32 / .20)` | `0 0 0 1px rgb(255 255 255 / .10), 0 12px 32px -4px rgb(0 0 0 / .6)` |

Rules:
1. Flat data cards, KPI cards, table containers, settings sections: **no shadow**, 1px border only.
2. Shadow on hover only for cards that are links/buttons; level 1 only.
3. Colored shadows, glows, and `blur > 32px` are banned.
4. In dark mode, elevation is expressed by surface lightness first (`night-1 → 2 → 3`), shadow second (`dark-mode.md`).
5. Backdrop blur (`backdrop-blur-*`) is banned on product surfaces. The modal scrim is a flat 48% (light) / 64% (dark) overlay.
6. Z-index follows the ladder in `spacing-and-layout.md` §6.

## 4. Tailwind v4

```css
@theme {
  --radius-tag: 0.25rem;
  --radius-control: 0.375rem;
  --radius-button: 0.375rem;
  --radius-card: 0.5rem;
  --radius-modal: 0.75rem;
  --shadow-raised: 0 0 0 1px rgb(16 24 32 / .06), 0 1px 2px rgb(16 24 32 / .06);
  --shadow-dropdown: 0 0 0 1px rgb(16 24 32 / .08), 0 4px 12px -2px rgb(16 24 32 / .12);
  --shadow-modal: 0 0 0 1px rgb(16 24 32 / .10), 0 12px 32px -4px rgb(16 24 32 / .20);
}
```
