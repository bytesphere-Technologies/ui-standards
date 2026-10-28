# Dark mode

Dark mode is a first-class theme, built from the same semantic tokens. `data-theme="dark"` on `<html>`; default follows `prefers-color-scheme`; user override persisted (`system | light | dark`). Scope: **full product UI**. Marketing pages ship light only unless specified.

## 1. Surface rules
1. **Never pure black.** Surfaces live in `#000913`–`#192534`; `#000913` is the brand Rich Black and is used for the sunken layer only. Page = `#0A121C`.
2. **Elevation via lightness.** Higher layers are lighter, not shadowed: page `#0A121C` → raised `#111B27` → overlay `#192534` → hover/selected `#223142`. Sunken (code blocks, table header) goes darker: `#000913` (Rich Black).
3. Shadows in dark add a 1px white 8–10% hairline ring; blur shadows are weak and secondary.
4. Max text lightness neutral-50 `#F7F7F8`. Never `#FFFFFF` for body text (halation).

## 2. Mapping table (light → dark)

| Semantic token | Light | Dark |
|---|---|---|
| `surface-default` | `#FFFFFF` | `#0A121C` |
| `surface-raised` | `#FFFFFF` | `#111B27` |
| `surface-sunken` | `#F7F7F8` | `#000913` |
| `surface-overlay` | `#FFFFFF` | `#192534` |
| `overlay-scrim` | `rgba(16,24,32,.48)` | `rgba(0,0,0,.64)` |
| `border-subtle` | `#D7DCE0` | `#223142` |
| `border-strong` | `#98A5AE` | `#5E6D78` |
| `border-control` | `#768693` | `#768693` |
| `text-primary` | `#292E33` | `#F7F7F8` |
| `text-secondary` | `#4A555E` | `#BAC3C9` |
| `text-tertiary` | `#5E6D78` | `#98A5AE` |
| `text-inverse` | `#FFFFFF` | `#000913` |
| `text-link-rest` | `#1B5B8D` | `#98C7EB` |
| `focus-ring` | `#116CB3` | `#65ABE2` |
| `action-primary-rest/hover/active` | 600 (Azure Blue) / 700 / 800 | 400 / 300 / 200 |
| `action-primary-fg` | `#FFFFFF` | `#000913` |
| `selected-bg` | Pale Blue `#DBE7F7` | `#223142` |
| `status-*-fg` | step 800 | step 300 |
| `status-*-dot` | step 600 | step 400 |
| `status-*-bg` | 500 @ 14% | 500 @ 18% |

## 3. Brand color in dark
1. Brand fills move **lighter, not brighter**: Azure Blue (primary-600) → primary-400. Lightness up 25 pts; saturation of the step is held at 68%, so the result reads desaturated against dark surfaces.
2. Fill text flips to Rich Black (`#000913` on `#65ABE2` = 8.08:1). White on primary-500 is about 3.5:1 and fails.
3. Accent is not used as a fill in product dark UI.
4. Large brand-colored areas (> 120×120px) are banned in dark.

## 4. Images, illustration, borders
1. Photos: no filter; apply `opacity .92` only to marketing hero backgrounds if they glare. Product screenshots in dark mode have a dark variant (`<picture>` with `prefers-color-scheme`).
2. Raster logos need a dark variant; SVG logos use `currentColor` or token fills.
3. Illustrations are authored with token-based fills so they recolor; never invert with `filter: invert()`.
4. Borders: use `border-subtle` (`#223142`); dividers must remain visible at ≥ 1.3:1 against the surface; control borders stay `#768693` (5.02:1).
5. Charts: same hues, lightness +10% via dark data tokens; gridlines `border-subtle`; area fills 24% alpha max.
6. Code blocks: `surface-sunken`, syntax colors verified ≥ 4.5:1.

## 5. Contrast re-verification (mandatory)
Every component re-measured in dark. Reference results: text-primary/surface 17.57, text-secondary 10.52, text-tertiary 7.46, link 10.49, primary fill text 8.08, focus ring 7.59, control border 5.02 (full table in `color.md` §6). Status pills in dark: success 8.42, warning 8.52, danger 7.13, info 7.76.

## 6. Implementation
```css
:root { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { color-scheme: dark; /* same vars as [data-theme=dark] */ } }
```
Set the theme with a blocking inline script in `<head>` to prevent flash (reads `localStorage["ui.theme"]`). `color-scheme` must be set so native scrollbars and form controls match.

## 7. Banned
Neon glow, colored shadows, pure black, gradient surfaces, inverted images, 100% white text, shadows as the only elevation cue, different layout or copy between themes.
