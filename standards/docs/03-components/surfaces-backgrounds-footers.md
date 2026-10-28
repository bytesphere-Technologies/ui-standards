# Surfaces, backgrounds, and footers

Live: showcase → Kits → Cards, backgrounds, footers. Code: `packages/ui/src/components/ (see surface-card, site-footer, backdrop)`.

## 1. Card surfaces (`SurfaceCard variant=…`)
| Variant | Look | Use | Never |
|---|---|---|---|
| `flat` | `surface-raised`, no edge | cards on a sunken page where spacing already separates | on a white page |
| `outlined` | + 1px `border-subtle` | **default** | |
| `raised` | + level-1 shadow | cards that are links or draggable | static data cards |
| `tinted` | Pale Blue | callouts, selected plan, tips | more than 1 in 4 cards |
| `brand` | Corporate Navy, white text | one hero stat or CTA per view | body content |
| `ink` | Rich Black, white text | operations hero stats, dark panels in light pages | |
| `glass` | translucent + blur | see §2 | data, tables, forms |
| `dashed` | dashed border | add-new and empty slots | |
Padding: `none | sm 12 | md 20 | lg 28`. Radius follows the corner style.

## 2. Blur and transparency (the guardrails)
The standard bans glass in product chrome because it lowers contrast and costs performance. It is allowed in exactly three places:
1. a **sticky bar over scrolling content** (header, toolbar);
2. a **card laid over a media or brand backdrop** (`<Glass over="brand|navy|pattern">`);
3. a **modal scrim**, which is a flat tint with **no blur**.
Rules: opacity ≥ 55% (default 70%); blur 8–12px; text Rich Black on light glass; the backdrop is part of the component so contrast can be measured: Rich Black on 70% white over Azure Blue 12.9:1, over Navy 11.3:1, over Ink 9.7:1; never nest glass; disable blur under `prefers-reduced-transparency` and when `backdrop-filter` is unsupported (fall back to the 95% opaque surface).

## 3. Rectangle layouts
| Component | Shape | Use |
|---|---|---|
| `MediaCard side="left|right|top"` | image or art + text | articles, guides, integrations |
| `BannerCard tone="tinted|brand|ink"` | wide, text left, action right | upgrade prompts, announcements (max 1 per page) |
| `PortraitCard` | 2:3 tall, text at the bottom | categories, collections, onboarding paths |
| `HeaderStripCard strip="primary|navy|success|warning|danger"` | 4px colored top strip | status-led summaries |
| `IconCard` | icon tile + title + body; `svg={false}` for no icon | feature grids (only for genuinely parallel items) |
| `ActionCard` | dashed, one primary action | add data source, create first item |
| `ListCard` | title, rows, "View all" | top-N lists |
| `ProfileCard` | cover, avatar, role, 3 stats | people directories |

## 4. Backgrounds (`Backdrop variant=…`)
| Group | Variants | Notes |
|---|---|---|
| Solid fills | `solid`, `tint`, `navy`, `ink`, `brand` | token colors |
| SVG patterns | `grid`, `dots`, `lines`, `rings`, `waves` | `currentColor` at 8–16% opacity; `rings` echoes the mark's circle |
| CSS only (no SVG) | `stripes`, `checks` | `repeating-linear-gradient` hairlines in `border-subtle` |
Allowed on: marketing heroes, auth panels, banners, empty states, scanner viewfinders. Not behind tables, forms or charts. No noise textures, no animated backgrounds, one pattern per page. Gradients exist only in the marketing hero (one, two stops, same hue family) and chart area fills.

## 5. Footers (`SiteFooter variant=…`)
| Variant | Use |
|---|---|
| `columns` | marketing default: logo, 4 link columns, legal line |
| `simple` | logo, 5 links, copyright |
| `minimal` | logo and copyright |
| `newsletter` | adds a subscribe form; one email field, consent line in the policy |
| `navy` | Corporate Navy band with white logo, for the last section of a marketing page |
| `app` | 32px bar inside the product: copyright, status, help, version |
Every footer has the legal links (Terms, Privacy), a status link on product sites, and the logo with its accessible name.
