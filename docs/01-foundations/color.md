# Color

All values below are derived from the ByteSphere Technologies brand colors (§2): Azure Blue `#116CB3`, Corporate Navy `#21346E`, Pale Blue `#DBE7F7`, Rich Black `#000913`. Product code uses only semantic tokens (§4). Hex appears here and in `02-tokens/tokens.primitive.json` only.

## 1. Rules

1. Product code references semantic tokens (`bg-surface-raised`, `text-secondary`). Raw hex and primitive ramps are forbidden outside `tokens.primitive.json`.
2. Azure Blue (primary) marks: the one primary button, the current nav item, links, focus ring, selected state. Nothing else.
3. Corporate Navy (accent) marks: logo, marketing bands, a single emphasis element. It is never a second button fill in product UI.
4. Neutrals carry the interface. 90% of pixels are `surface-*`, `border-*`, `text-*`.
5. Status colors (success / warning / danger / info) appear only when state is real. Never decorative.
6. Meaning is never encoded in hue alone (§8).
7. Gradients: allowed in **exactly two** named places — (a) marketing hero background (one gradient, ≤ 2 stops, same hue family), (b) data-viz area/series fill (primary hue, 24% → 0% alpha vertical). Banned everywhere else, including buttons, cards, headers, text, borders, avatars, progress bars.

## 2. Palette construction

Brand source: ByteSphere Technologies brand guidelines (2026, p.19).

| Brand color | Name | HEX | RGB | Role in the system |
|---|---|---|---|---|
| Primary | **Azure Blue** | `#116CB3` | 17, 108, 179 | primary ramp step 600: primary button, links' base, focus ring, current-nav icon |
| Secondary | **Corporate Navy** | `#21346E` | 33, 52, 110 | accent ramp step 800: accent fill, logo mark, marketing bands |
| Secondary | **Pale Blue** | `#DBE7F7` | 219, 231, 247 | primary ramp step 100: selected rows, subtle buttons, tinted panels |
| Secondary | **Rich Black** | `#000913` | 0, 9, 19 | neutral ramp step 950; dark-mode sunken surface (`night-0`); text on bright fills in dark mode |

Procedure (rerun on rebrand):
1. Seed → anchor. Azure Blue is step **600** (L 39%). Corporate Navy is the accent ramp's step **800** (L 27%). Pale Blue replaces primary step 100 exactly.
2. Build 11 steps at fixed HSL lightness: `50:97 100:93 200:86 300:76 400:64 500:52 600:42 700:33 800:25 900:18 950:11` (%). Hue = seed hue (Azure 206°, Navy 227°). Saturation = 68% (primary), 45% (accent). Steps 50/100 at 55% of that saturation; 900/950 at 85%.
3. Replace each anchor step with the exact brand hex; Pale Blue overrides primary-100; Rich Black overrides neutral-950.
4. Neutral ramp: hue 206° (Azure), saturation 12%, same lightness steps. Never `#808080`-type pure gray.
5. Semantic ramps: success hue 150° sat 52%; warning 36° sat 88%; danger 4° sat 62%; info 200° sat 62%.
6. Run the contrast table (§6). Nudge any failing step by ≤ 3 lightness points; re-run.

### Ramps (light→dark, 50–950)

| Step | primary | accent (navy) | neutral | success | warning | danger | info |
|---|---|---|---|---|---|---|---|
| 50 | `#F4F8FA` | `#F5F6F9` | `#F7F7F8` | `#F5FAF7` | `#FBF8F4` | `#FAF5F5` | `#F5F8FA` |
| 100 | `#DBE7F7` | `#E9EBF2` | `#ECEDEE` | `#E8F2ED` | `#F6EFE5` | `#F3E8E7` | `#E7EFF3` |
| 200 | `#C3DEF4` | `#CBD3EB` | `#D7DCE0` | `#C9EEDB` | `#FBE2BC` | `#F1C8C5` | `#C5E3F1` |
| 300 | `#98C7EB` | `#A6B4DD` | `#BAC3C9` | `#A2E2C2` | `#F8CD8C` | `#E8A19C` | `#9CCEE8` |
| 400 | `#65ABE2` | `#7A8ECD` | `#98A5AE` | `#73D3A3` | `#F4B352` | `#DC726A` | `#6AB6DC` |
| 500 | `#318FD8` | `#4E69BC` | `#768693` | `#45C485` | `#F09A19` | `#D04339` | `#399ED0` |
| 600 | **`#116CB3`** | `#3B539B` | `#5E6D78` | `#33A36B` | `#C97E0D` | `#AE3229` | `#2981AE` |
| 700 | `#1B5B8D` | `#2E417A` | `#4A555E` | `#288054` | `#9E630A` | `#882720` | `#206688` |
| 800 | `#14456B` | **`#21346E`** | `#384147` | `#1F6140` | `#784B08` | `#671D18` | `#184D67` |
| 900 | `#133148` | `#1C253F` | `#292E33` | `#1A422E` | `#50350C` | `#461916` | `#163646` |
| 950 | `#0C1E2C` | `#111727` | `#000913` | `#10281C` | `#312007` | `#2B0F0D` | `#0D212B` |

Dark-only surface steps (`night`): `0 #000913` (Rich Black) · `1 #0A121C` · `2 #111B27` · `3 #192534` · `4 #223142`.

## 3. Semantic roles → light / dark

| Role | Token | Light | Dark |
|---|---|---|---|
| Page surface | `color-surface-default` | white `#FFFFFF` | night-1 `#0A121C` |
| Raised surface (cards, panels) | `color-surface-raised` | white `#FFFFFF` | night-2 `#111B27` |
| Sunken surface (page bg behind cards, table header) | `color-surface-sunken` | neutral-50 `#F7F7F8` | night-0 `#000913` |
| Floating layer (menu, modal, toast) | `color-surface-overlay` | white | night-3 `#192534` |
| Scrim | `color-overlay-scrim` | `rgba(16,24,32,.48)` | `rgba(0,0,0,.64)` |
| Border, subtle | `color-border-subtle` | neutral-200 `#D7DCE0` | night-4 `#223142` |
| Border, strong | `color-border-strong` | neutral-400 `#98A5AE` | neutral-600 `#5E6D78` |
| Border, control | `color-border-control` | neutral-500 `#768693` | neutral-500 `#768693` |
| Text primary | `color-text-primary` | neutral-900 `#292E33` | neutral-50 `#F7F7F8` |
| Text secondary | `color-text-secondary` | neutral-700 `#4A555E` | neutral-300 `#BAC3C9` |
| Text tertiary | `color-text-tertiary` | neutral-600 `#5E6D78` | neutral-400 `#98A5AE` |
| Text inverse | `color-text-inverse` | white | neutral-950 `#000913` |
| Text disabled | `color-text-disabled` | neutral-400 `#98A5AE` | neutral-600 `#5E6D78` |
| Link rest / hover | `color-text-link-rest/hover` | primary-700 `#1B5B8D` / 800 | primary-300 / 200 |
| Focus ring | `color-focus-ring` | primary-600 `#116CB3` | primary-400 `#65ABE2` |

### Interactive states (primary action background)

| State | Token | Light | Dark |
|---|---|---|---|
| rest | `color-action-primary-rest` | **Azure Blue** primary-600 `#116CB3` | primary-400 `#65ABE2` |
| hover | `…-hover` | primary-700 `#1B5B8D` | primary-300 `#98C7EB` |
| active | `…-active` | primary-800 `#14456B` | primary-200 `#C3DEF4` |
| selected | `…-selected` | primary-700 | primary-300 |
| disabled | `…-disabled` | neutral-100 `#ECEDEE` + text neutral-400 | night-3 + text neutral-600 |
| foreground | `…-fg` | white | Rich Black `#000913` |

Secondary / ghost / subtle / danger / accent follow the same states (`color-action-{variant}-{state}`). The **accent** action uses Corporate Navy (`#21346E`, hover navy-900) with white text; reserve it for marketing CTAs on light bands and one-off emphasis, never as a second primary in product. Row/list **selected** uses `color-selected-bg` (**Pale Blue** `#DBE7F7` / night-4) plus a 2px `color-selected-bar` and a check or `aria-selected`; never background alone.

## 4. Status pairs

Tint = status-500 at 14% alpha (18% dark) over the surface. Border = status-600 at 35%. Text = step 800 (dark: 300). Dot = step 600 (dark: 400).

| Status | Tint on white | Text | Ratio | Dark tint on `#111B27` | Dark text | Ratio |
|---|---|---|---|---|---|---|
| success | `#E5F7EE` | `#1F6140` | **6.64** | `#1A3938` | `#A2E2C2` | **8.42** |
| warning | `#FDF1DF` | `#784B08` | **6.70** | `#393224` | `#F8CD8C` | **8.52** |
| danger | `#F8E5E3` | `#671D18` | **9.80** | `#33222A` | `#E8A19C` | **7.13** |
| info | `#E3F1F8` | `#184D67` | **7.93** | `#183345` | `#9CCEE8` | **7.76** |
| neutral | `#ECEEF0` | `#384147` | **8.96** | `#232E3A` | `#D7DCE0` | **9.98** |

Banner (full-width) uses step 50 background + step 800 text: success 7.00, warning 7.06, danger 11.01, info 8.57.

## 5. Brand-derived data palette (categorical, ordered 1→6)

| # | Token | Hex (light) | Dark | Rule |
|---|---|---|---|---|
| 1 | `color-data-1` | `#116CB3` (Azure Blue) | `#4A9BDE` | default single-series color |
| 2 | `color-data-2` | `#A46E04` | `#F2A104` | amber; not a brand color, chosen for max separation from blue |
| 3 | `color-data-3` | `#2F8F83` | `#3FA698` | teal |
| 4 | `color-data-4` | `#7B5EA7` | `#9479C2` | |
| 5 | `color-data-5` | `#B8457B` | `#CF5F95` | |
| 6 | `color-data-6` | `#768693` (neutral-500) | `#8A99A5` | "other" / baseline |

Series marks vs white: 5.50 / 4.37 / 3.91 / 5.25 / 5.03 / 3.75 (all ≥ 3:1). Dark vs `#0A121C`: 6.30 / 8.85 / 6.38 / 5.17 / 5.13 / 6.43. Max 6 series per chart. Order is fixed. Corporate Navy is not a series color: next to Azure Blue it fails lightness separation for color-blind users; use it for chart chrome and emphasis only.

## 6. Contrast table (WCAG 2.2, measured)

Computed with the WCAG relative-luminance formula. AA thresholds: 4.5:1 normal text, 3:1 large text (≥ 24px, or ≥ 18.66px bold) and UI components / focus rings (SC 1.4.3, 1.4.11).

### Light

| Foreground | Background | Ratio | Requirement | Pass |
|---|---|---|---|---|
| text-primary `#292E33` | surface `#FFFFFF` | **13.70** | 4.5 | ✓ |
| text-secondary `#4A555E` | surface `#FFFFFF` | **7.63** | 4.5 | ✓ |
| text-tertiary `#5E6D78` | surface `#FFFFFF` | **5.34** | 4.5 | ✓ |
| text-tertiary | sunken `#F7F7F8` | **4.99** | 4.5 | ✓ |
| placeholder `#5E6D78` | input `#FFFFFF` | **5.34** | 4.5 | ✓ |
| link `#1B5B8D` | surface | **7.17** | 4.5 | ✓ |
| action-primary-fg `#FFFFFF` | Azure Blue `#116CB3` | **5.50** | 4.5 | ✓ |
| action-primary-fg | primary-700 (hover) `#1B5B8D` | **7.17** | 4.5 | ✓ |
| action-primary-fg | primary-800 (active) `#14456B` | **10.03** | 4.5 | ✓ |
| white | Corporate Navy `#21346E` | **11.79** | 4.5 | ✓ |
| white | danger-600 `#AE3229` | **6.39** | 4.5 | ✓ |
| white | danger-700 `#882720` (hover) | **8.91** | 4.5 | ✓ |
| text-primary `#292E33` | Pale Blue `#DBE7F7` (selected row) | **10.95** | 4.5 | ✓ |
| action-subtle-fg `#14456B` | Pale Blue `#DBE7F7` | **8.02** | 4.5 | ✓ |
| focus-ring `#116CB3` | surface `#FFFFFF` | **5.50** | 3 | ✓ |
| focus-ring | sunken `#F7F7F8` | **5.13** | 3 | ✓ |
| border-control `#768693` | surface | **3.75** | 3 | ✓ |
| border-subtle `#D7DCE0` | surface | 1.38 | n/a — decorative divider, never the only boundary of an interactive control | — |
| text-disabled `#98A5AE` | neutral-100 `#ECEDEE` | ≈ 2.2 | exempt (SC 1.4.3 inactive components) | — |

### Dark

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| text-primary `#F7F7F8` | surface `#0A121C` | **17.57** | ✓ |
| text-primary | raised `#111B27` | **16.21** | ✓ |
| text-primary | selected `#223142` | **12.37** | ✓ |
| text-secondary `#BAC3C9` | surface | **10.52** | ✓ |
| text-secondary | raised | **9.70** | ✓ |
| text-tertiary `#98A5AE` | surface | **7.46** | ✓ |
| text-tertiary | raised | **6.88** | ✓ |
| link `#98C7EB` | surface | **10.49** | ✓ |
| link | raised | **9.67** | ✓ |
| action-primary-fg Rich Black `#000913` | primary-400 `#65ABE2` | **8.08** | ✓ |
| action-danger-fg `#000913` | danger-400 `#DC726A` | **6.35** | ✓ |
| focus-ring `#65ABE2` | surface | **7.59** | ✓ |
| border-control `#768693` | surface | **5.02** | ✓ |
| border-control | raised | **4.63** | ✓ |
| white | primary-500 `#318FD8` | ≈ 3.5 | ✗ — banned for text; use Rich Black on primary-400 |

Rule: every new pairing is added to this table with a measured ratio before merge. CI runs `scripts/contrast-check.ts` over `tokens.semantic.json` pairs and fails below threshold.

## 7. States on non-text UI

| Element | Minimum contrast vs adjacent |
|---|---|
| Input / select / checkbox / radio / switch boundary | 3:1 (`border-control`) |
| Focus ring | 3:1 against both the element and the surface |
| Selected indicator (bar, check) | 3:1 |
| Chart series line / bar edge | 3:1 against surface |
| Status dot | 3:1, and always accompanied by text |

## 8. Color-blind safety

1. Never encode meaning in hue alone. Status = color + icon or label text. Chart series = color + direct label, marker shape, or dash pattern.
2. Never use red vs green as the only difference (delta up/down uses ▲/▼ glyphs and a sign: `+4.2%`, `−1.1%`).
3. Categorical palette ordered so adjacent series differ in lightness as well as hue.
4. Review every new chart and status UI in Chrome DevTools → Rendering → Emulate vision deficiencies (protanopia, deuteranopia, tritanopia, achromatopsia). Pass = every state still distinguishable.
5. Disabled is communicated by reduced contrast **and** `disabled`/`aria-disabled` plus cursor `not-allowed`.

## 9. Dark mode mapping

See `dark-mode.md` for the full table and rules. Summary: surfaces step up in lightness with elevation (night-1 → 2 → 3), brand fills move from step 700 to 400, status text moves from 800 to 300, borders move from 200 to night-4.

## 10. Banned

1. Default Tailwind palette classes (`bg-blue-500`, `text-gray-400`, `border-slate-200`). Use `bg-action-primary`, `text-secondary`, `border-subtle`.
2. Pure black `#000000` or pure white text on dark surfaces. Max text lightness on dark is neutral-50.
3. Opacity utilities on text for hierarchy (`text-black/60`). Use `text-secondary` / `text-tertiary`.
4. Purple→blue, pink→orange, or any multi-hue gradient.
5. Brand color on large surfaces in product (sidebar fill, page header fill).
