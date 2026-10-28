# Logo and brand usage

Source files: ByteSphere Technologies brand folder (`Logo.svg`, `logo VERTICAL.svg`, icon). The product uses outlined versions in `apps/showcase/public/brand/` and the `<Logo>` component. Live: showcase → Standard → Brand and logo.

## 1. Why we do not use the original horizontal SVG in UI
`Logo.svg` draws "ByteSphere" as live text in Poppins. Inside an `<img>` or an email the page's fonts are not available, so the wordmark falls back to a system font and looks wrong. The vertical file is fully outlined. We rebuilt the horizontal lockup from the vertical file's outlines, keeping the original proportions (mark : wordmark width ≈ 0.36, text block vertically centered on the mark). Originals are kept in `public/brand/original/` for print.

## 2. Forms and files
| Form | Component | Files | Use |
|---|---|---|---|
| Horizontal | `<Logo />` | `logo-horizontal(.svg \| -dark \| -white)` | headers, sidebars, email, invoices |
| Stacked | `<Logo variant="stacked" />` | `logo-stacked(...)` | auth, splash, print, covers |
| Mark | `<Logo variant="mark" />` | `logo-mark(...)`, `favicon.svg`, `logo-icon.png` | favicon, app icon, avatar, collapsed rail |
| Wordmark | `<Logo variant="wordmark" />` | (component only) | invoice headers where the mark appears elsewhere |

## 3. Tones
| Tone | Mark | Wordmark | On |
|---|---|---|---|
| `auto` | theme-aware navy/azure (lighter in dark modes) | current text color | any page surface, light or dark |
| `navy` | navy + azure | Rich Black | white, Pale Blue, light gray |
| `white` / `on-brand` | white, second half 60% | white | Corporate Navy, Azure Blue, Rich Black, patterns |
| `black` | Rich Black, second half 60% | Rich Black | one-color print, stamps |

## 4. Size and space
- Clear space: half the mark's height on all sides.
- Minimum: mark 24px; horizontal 96px wide; stacked 32px high.
- The tagline "TECHNOLOGIES" is drawn only where it renders at 8px or taller: horizontal ≥ 43px high, wordmark ≥ 31px, stacked ≥ 78px. `<Logo>` drops it automatically below that. Under 24px: mark only.
- In the 56px top bar: horizontal without tagline at 28–32px, or the stacked sidebar slot at 32px.

## 5. Where the name and logo must appear
| Place | Form | Rule |
|---|---|---|
| App sidebar / top bar | horizontal, no tagline; mark when collapsed | links to the home page, `aria-label="ByteSphere Technologies, home"` |
| Marketing header and footer | horizontal with tagline | header 36px, footer 34px |
| Auth screens | horizontal 40px (desktop panel) or 34px (mobile) | above the heading |
| Loading screens | animated mark (`BootLoader`) | no wordmark until 1s |
| Email, invoices, receipts | horizontal navy, ≥ 26px | SVG as inline image with alt text |
| Browser tab, bookmarks | `favicon.svg` | 16/32/180/512 set |
| Document title | `{Page} · ByteSphere` | |
| Error pages | mark animation on maintenance only | |
Never type the company name in a font as a logo substitute.

## 6. Never
Stretch, recolor, rotate, add shadows or effects, place on low-contrast or busy backgrounds, crop the mark, outline or stroke it, retype the name, or animate it outside the approved loaders. See the "Never" gallery on the Brand page.
