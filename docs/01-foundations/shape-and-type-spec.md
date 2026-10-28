# Shape and type specification

The one page to settle arguments about corners, borders, heights and fonts. Every row is a rule; every value is a token. If an element is not listed, it inherits the row of the nearest class and the design lead adds it.

## 1. Corner radius

| Class | Radius | Token / class | Elements |
|---|---|---|---|
| Tag | **4px** | `radius-tag` / `rounded-tag` | status pills, filter tags, checkbox, kbd hints, tooltip, skeleton blocks, progress track in tables |
| Control | **6px** | `radius-control` / `rounded-control` | buttons, inputs, selects, textareas, segmented control, icon buttons, tab focus shape, nav items |
| Menu item | **5px** | `rounded-[5px]` | items inside a menu or listbox with 4px padding (6 − 1) |
| Card | **8px** | `radius-card` / `rounded-card` | cards, panels, table containers, popovers, menus, toasts, banners (callout), dropzone inner rows |
| Modal | **12px** | `radius-modal` / `rounded-modal` | dialogs, sheets (inner corners), command palette, dropzone, auth card, product screenshots |
| Round | **9999px** | `radius-round` / `rounded-round` | avatars, count badges, status dots, switch track and thumb, radio, progress bars |

Rules: one radius per class; nested radius = outer − padding (min 4); an element touching the viewport edge has 0 on that edge; `rounded-2xl`, `rounded-3xl`, and `rounded-full` on buttons, cards or pills are banned.

## 2. Borders

| Use | Spec | Token |
|---|---|---|
| Card, panel, table container | 1px | `border-subtle` |
| Row dividers, section dividers | 1px | `border-subtle` |
| Input, select, textarea, checkbox, radio (the only cue for the boundary) | 1px, 3.75:1 | `border-control` |
| Secondary button | 1px (the label identifies it) | `action-secondary-border` (neutral-300) |
| Hover on a control | 1px darker | `text-secondary` as border color |
| Selected card, active filter chip | 1px + 1px ring | `border-strong` / `action-primary` |
| Focus | 2px ring, 2px offset (not a border) | `focus-ring`, `focus-ring-offset` |
| Dashed | dropzone only | `border-control` |
| Error field | 1px | `status-danger-solid` |

Banned: 2px+ decorative borders, colored left-border cards, gradient borders, double borders, border plus shadow on one flat surface.

## 3. Heights

| Element | Comfortable | Compact | Touch (< 768px) |
|---|---|---|---|
| Button, input, select | 36 | 32 | 44 |
| Small button, segmented, pagination button | 32 | 28 | 44 |
| Icon button | 36 | 32 | 44 |
| Table row / header | 40 | 32 | card layout |
| Nav item (sidebar) | 36 | 32 | 44 |
| Menu item | 32 | 28 | 44 |
| Tab | 40 | 32 | 44 |
| Status pill | 22 (sm 20) | 20 | 22 |
| Tag (filter) | 24 | 24 | 28 |
| Top bar | 56 | 56 | 56 |
| Toolbar | 48 | 40 | 48 |

## 4. Fonts

| Family | Use | Weights | Where |
|---|---|---|---|
| **Inter** (variable) | all product UI, forms, tables, docs body | 400, 500, 600 | everywhere |
| **Poppins** | marketing display and h1, auth quote, brand moments | 500, 600, 700 | marketing, auth brand panel, logo lockup text only |
| **Geist Mono** (variable) | code, IDs, keys, shortcuts | 400, 500 | anywhere data is literal |

Stack: `"Inter Variable", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Body letter-spacing −0.006em; headings −0.012em; display −0.025em; overline +0.06em.

## 5. Type roles (size / line / weight)

| Role | Font | px | Line | Weight | Used for |
|---|---|---|---|---|---|
| Display | Poppins | 48 (clamp 32→48) | 1.12 | 600 | marketing hero only |
| H1 | Poppins | 32 | 40 | 600 | marketing section titles |
| Page title (h2) | Inter | 24 | 32 | 600 | every product page |
| H3 | Inter | 20 | 28 | 600 | large panel title, empty-state page |
| Card title (h4) | Inter | 16 | 24 | 600 | cards, dialogs, drawer titles |
| Body | Inter | 14 | 20 | 400 | default |
| Label, button, nav | Inter | 14 | 20 | 500 | field labels, buttons, menu items, tabs |
| Body small | Inter | 13 | 18 | 400 | helper text, table meta, descriptions |
| Caption | Inter | 12 | 16 | 400/600 | timestamps, pills (600), axis labels |
| Overline | Inter | 11 | 16 | 600 | the only uppercase style |
| KPI number | Inter | 28 | 36 | 600, tabular | stat tiles |
| Code | Geist Mono | 13 | 20 | 400 | inline code, IDs, logs |

Rules: ≤ 3 weights per screen; numbers in tables, KPIs and prices are tabular and right-aligned; sentence case; never centered paragraphs over 2 lines; line length 60–75ch; body never below 14px in product (16px marketing).

## 6. Spacing quick table

| Where | Value |
|---|---|
| Label → control | 6px |
| Control → helper | 6px |
| Field → field | 16 (12 compact) |
| Card padding | 20 (16 compact) |
| Card header → body | 16 |
| Page header → content | 24 |
| Section → section | 24 mobile / 40 desktop |
| Toolbar → table | 12 |
| Dialog padding | 24; footer 12 × 24 on `surface-sunken` |
| Page padding | 16 / 24 / 32 at <640 / ≥640 / ≥1280 |

## 7. Elevation

Borders everywhere in-flow. Level 1 (hover on linked cards), level 2 (menus, popovers, toasts), level 3 (dialogs, palette) only. Each has a 1px ring built in. See `radius-borders-elevation.md`.
