# Breakpoints and responsiveness

## 1. Breakpoints (mobile-first, `min-width`)
| Name | Min width | Typical device | Shell behavior |
|---|---|---|---|
| (base) | 0 | phones | single column, drawer/bottom bar |
| `sm` | 640px | large phones, small tablets portrait | 2-col grids allowed, toasts bottom-right |
| `md` | 768px | tablets | table columns P1+P2, modals centered |
| `lg` | 1024px | small laptops, tablets landscape | sidebar rail, 8/4 splits |
| `xl` | 1280px | laptops | sidebar expanded, TOC visible, page padding 32 |
| `2xl` | 1536px | desktops | content max 1280/1440 centered |
Tailwind v4: `--breakpoint-sm: 40rem; --breakpoint-md: 48rem; --breakpoint-lg: 64rem; --breakpoint-xl: 80rem; --breakpoint-2xl: 96rem;`.

## 2. Rules
1. **Mobile-first**: base classes are the mobile layout; `md:`/`lg:` add. No `max-*:` breakpoint hacks except for hover-capability queries.
2. **Container queries preferred** for components that live in variable-width regions (cards, widgets, sidebars): `@container` + `@sm:`/`@md:`. Viewport breakpoints are for page shells only.
3. **Fluid type via `clamp()`** for marketing display/h1 only (`typography.md`). Product type is fixed.
4. No horizontal page scroll at any width ≥ 320px. Tables, code, and maps may scroll inside their container.
5. Hover-only affordances need a touch/focus equivalent; style hover under `@media (hover: hover)`.
6. Layout never depends on device detection or user-agent sniffing.
7. Images and video use `srcset`/`sizes` and fixed aspect ratios.
8. Orientation changes must not lose state or reset scroll.

## 3. The test gate
Every page and component must be verified at **320px, 768px, 1440px, and at 200% zoom** (equivalent to 640px / 720px layouts) before merge. Storybook viewports: 320, 768, 1440; Playwright projects for the same; screenshots compared. A page with horizontal scroll or clipped content at any of these fails.

## 4. Touch targets
Pointer targets ≥ 24×24 CSS px (SC 2.5.8); **≥ 44×44 on touch layouts** (< 768px or `(pointer: coarse)`). Spacing between adjacent small targets ≥ 8px. Use `@media (pointer: coarse)` to bump control heights to 44px.

## 5. Table → card collapse rules
| Width | Rendering |
|---|---|
| ≥ 1024 | full table |
| 768–1023 | hide P3 columns (Columns menu to re-show) |
| < 768 | card list: line 1 = P1 identifier + status pill; lines 2–3 = up to 3 key/value pairs (13px, label tertiary); trailing ⋯ menu; selection via long-press/checkbox |
| Grids with > 8 required columns | keep table, horizontal scroll with sticky first column |
Never shrink table text below 13px.

## 6. Responsive behavior per component class
| Component class | 320 | 768 | 1440 |
|---|---|---|---|
| Navigation | drawer + bottom bar (≤ 5) | rail / drawer | expanded sidebar |
| Page header | title + full-width primary below | inline actions right | inline |
| Toolbar | Search + Filters(n) + Sort buttons | inline chips | full toolbar |
| Cards grid | 1 col | 2 col | 3–4 col |
| KPI row | 1–2 col | 2×2 | 4 col |
| Charts | 1 per row, 200px+ | 1–2 per row | grid spans |
| Forms | single col, full-width actions | single col 560px, paired short fields | 560px + optional help aside |
| Modals | bottom sheet (vaul) | centered 400/560/720 | centered |
| Sheets | full-width | 400/560 | up to 720 |
| Tabs | scroll horizontally | inline | inline |
| Pagination | compact | full | full |
| Toasts | top-center full-width | bottom-right 360px | bottom-right |
| Tooltips | replaced by labels | hover/focus | hover/focus |
| Banners | stacked text + action | single line | single line |
| Dropzone | button | zone | zone |

## 7. Safe areas and viewport units
Use `dvh`/`svh` (not `vh`) for full-height shells. Respect `env(safe-area-inset-*)` on bottom bars and sticky action bars. Never use `100vw` for width (scrollbar overflow); use `100%`.

## 8. Meta and zoom
`<meta name="viewport" content="width=device-width, initial-scale=1">`. Never `user-scalable=no` or `maximum-scale`. Inputs ≥ 16px on touch to avoid iOS zoom-on-focus.
