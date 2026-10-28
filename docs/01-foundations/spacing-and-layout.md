# Spacing and layout

## 1. Scale

Base unit 4px. **Only these values exist:** 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px.

| Token | px | rem | Tailwind | Typical use |
|---|---|---|---|---|
| `space-2` | 2 | 0.125 | `0.5` | hairline gap between stacked icon+badge |
| `space-4` | 4 | 0.25 | `1` | icon↔text inside tag, label↔helper |
| `space-6` | 6 | 0.375 | `1.5` | pill padding, menu item vertical |
| `space-8` | 8 | 0.5 | `2` | icon↔label in buttons, compact gaps |
| `space-12` | 12 | 0.75 | `3` | compact form field gap, table cell x-padding |
| `space-16` | 16 | 1 | `4` | default gap in components, card padding compact |
| `space-20` | 20 | 1.25 | `5` | card padding default |
| `space-24` | 24 | 1.5 | `6` | section gap mobile, page padding, grid gutter |
| `space-32` | 32 | 2 | `8` | between page-header and content on desktop |
| `space-40` | 40 | 2.5 | `10` | section gap desktop |
| `space-48` | 48 | 3 | `12` | marketing section inner |
| `space-64` | 64 | 4 | `16` | marketing section gap mobile |
| `space-80` | 80 | 5 | `20` | marketing section gap desktop |
| `space-96` | 96 | 6 | `24` | marketing hero vertical padding max |

Arbitrary values (`p-[13px]`, `mt-[22px]`) are banned. CI greps for `\[\d+px\]` in `className`.

## 2. Rules

1. **Section gap** = 24px mobile / 40px desktop (`gap-6 lg:gap-10`).
2. **Card padding** = 20px default, 16px compact.
3. **Gap inside a group** is smaller than the gap between groups. Ratio ≥ 1.5×: field↔field 16px, group↔group 24–32px.
4. **Never two spacings from the same scale adjacent** on one axis: no `mb-4` over `pt-5`. One element owns the gap; use `gap-*` on the parent flex/grid, not margins on children.
5. No margin on the root of a reusable component. Parents control outer spacing.
6. Related controls (label→field→helper) 4px apart. Field to next field 16px (comfortable) or 12px (compact).
7. Icon↔text gap 8px (button, menu), 6px (pill), 4px (inline meta).
8. Max one 48px+ gap per screen in product UI. A 48px gap between everything is banned.
9. Vertical rhythm: line-heights are multiples of 4px (16, 20, 24, 28, 32, 40, 64). Element heights are multiples of 4px.

## 3. Component internal padding

| Component | Padding (y × x) | Gap |
|---|---|---|
| Button md (36px) | 0 × 16 | 8 icon↔label |
| Button sm (32px) | 0 × 12 | 6 |
| Button lg (40px) | 0 × 20 | 8 |
| Input md | 0 × 12 | 8 prefix↔text |
| Card default | 20 | 16 between regions |
| Card compact | 16 | 12 |
| Table cell comfortable | 0 × 12 (row 40px) | — |
| Table cell compact | 0 × 12 (row 32px) | — |
| Menu item | 0 × 8 (row 36px) | 8 |
| Modal | 24 | 16 body→footer; 24 header→body |
| Toast | 12 × 16 | 8 |
| Pill | 0 × 8 (h 22px) | 6 dot↔label |
| Tooltip | 6 × 8 | — |
| Page header | 0 | 4 title↔description; 24 to toolbar |
| Banner | 12 × 16 | 12 |
| Tab (underline) | 0 × 12 (h 40px) | 8 |
| Sidebar item | 0 × 8 (h 36 comfortable / 32 compact) | 8 |

## 4. 12 vs 16px gaps (density)

| Context | Gap | Why |
|---|---|---|
| Form fields, comfortable (settings, create flows) | **16px** | scanning and touch accuracy |
| Form fields, compact (filters, inline editors, data screens) | **12px** | more fields per viewport |
| Toolbar items | 8px | |
| KPI cards in a row | 16px | |
| Grid gutter | 24px | |

Set by density mode (`density-modes.md`), not by developer preference.

## 5. Layout grid

| Property | Value |
|---|---|
| Columns | 12 |
| Gutter | 24px (16px below `md`) |
| Max content width | **1280px** default; **1440px** for data tables / analytics (`max-content-wide`) |
| Reading (prose) width | 68ch (≈ 720px) |
| Sidebar widths | **64px** (collapsed rail) / **240px** (default) / **280px** (wide, tree nav) |
| Topbar height | 56px (product) / 64px (marketing) |

Content is left-aligned inside the max width and the max-width container is centered on screens wider than it.

### Page padding per breakpoint

| Breakpoint | Page padding x | Page padding top |
|---|---|---|
| < 640 | 16 | 16 |
| 640–1023 | 24 | 24 |
| 1024–1279 | 24 | 24 |
| ≥ 1280 | 32 | 32 |

### Column spans

| Content | Desktop | Tablet | Mobile |
|---|---|---|---|
| KPI card | 3 of 12 | 6 | 12 |
| Chart (primary) | 8 | 12 | 12 |
| Chart (secondary) / side panel | 4 | 12 | 12 |
| Form (single) | 6 (max 560px) | 8 | 12 |
| Table | 12 | 12 | 12 (collapses to cards) |
| Detail + aside | 8 + 4 | 12 stacked | 12 stacked |

## 6. Z-axis and stacking

Only token z-indices: base 0 · sticky 10 · dropdown 20 · overlay 30 · modal 40 · toast 50 · tooltip 60. No arbitrary z-index, ever.
