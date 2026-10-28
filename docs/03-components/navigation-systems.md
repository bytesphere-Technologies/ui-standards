# Navigation systems

The building blocks and the shells they make. Live gallery: showcase → Kits → Navigation systems. Code: `packages/ui/src/components/ (see side-nav, top-bar, bottom-tabs)` (`@bytesphere/ui`). Styling: every component reads the `--nav-*` variables, so `data-nav="surface|tint|navy|ink"` restyles all of them.

## 1. Pick the shell
| Product | Shell | Components | Width / height |
|---|---|---|---|
| Business app with 6–20 destinations | sidebar + top bar | `SideNav` full, `TopBar` | 240 / 56 |
| Admin tool, many modules, dense tables | compact sidebar | `SideNav variant="compact"` | 208, items 32 |
| Data tool, field tool, scanners | rail + top bar, Ink | `SideNav collapsed`, `TopBar tone="nav"` | 64 / 56 |
| Focused tool, few destinations | floating sidebar | `SideNav variant="floating"` | 240, detached, level-2 shadow |
| Store | announcement + header + category row + mega menu | `EcomHeader`, `MegaMenu` | 36 + 64 + 44 |
| Marketing site | top header with optional mega menu | `SiteHeader`, `SiteFooter` | 64 |
| Docs | top bar + tree + on-this-page | `SideNav compact`, `SubNav` | 56 / 208 / 192 |
| Phone | bottom tabs (3–5) | `BottomTabs` | 56 + safe area |
| Settings | secondary rail inside the page | `SubNav`, `VerticalTabs` | 216 |

## 2. Components
| Component | Does | Key rules |
|---|---|---|
| `SideNav` | groups, nested items (1 level), badges, collapse to rail with tooltips, brand slot, footer slot | max ~7 items per group; depth ≤ 2 inside the sidebar; active = tinted background + semibold, never also a bar; persisted collapse state |
| `TopBar` | left / center / right slots; `tone="nav"` follows the nav style | search in the center, ≤ 4 icon actions on the right, avatar last |
| `SearchTrigger` | button styled as a field that opens the palette | shows ⌘K |
| `SiteHeader` | logo, ≤ 6 links, mega menu, sign in + one primary action, mobile drawer | closes on Esc and outside click; `aria-expanded` on triggers |
| `EcomHeader` | announcement, search, account, wishlist, cart with count, categories | cart count capped 99+; announcement dismissible and remembered |
| `MegaMenu` | 2–4 columns of icon links, optional feature card | ≤ 6 links per column; a feature card is a product, not an ad |
| `BottomTabs` | 3–5 destinations, badge, active pill | labels always visible; 44px targets |
| `Tabs` | underline tabs for views of one object | ≤ 7, no nesting, deep-linkable |
| `PillTabs` | filter or category switcher with counts | single-select; use `Segmented` for 2–4 view modes |
| `Segmented` | view mode switch | 2–4 items |
| `VerticalTabs` | settings-like sections with a description | one tab stop, arrow keys |
| `SubNav` | secondary rail | ≤ 12 items |
| `Breadcrumb` | location | from depth 3; last item plain text |
| `Pagination`, `Stepper` | paging and wizard steps | see component specs |

## 3. Navigation styles
| Style | Use |
|---|---|
| Light | default; works with every dark mode |
| Tinted | adds a little brand without a heavy block |
| Navy | internal tools and brand-forward products; logo `tone="white"` |
| Ink | operations, night shifts, kiosks; pairs with the Ink dark mode |
Measured contrast is in `themes-and-dark-modes.md` §4.

## 4. Behavior rules
1. One global navigation per product; everything else is local (tabs, sub-nav).
2. Same destination, same label and icon at every screen size.
3. Max depth 3 (section › page › tab). Mega menus are for marketing and stores only, never inside an app.
4. Collapse state, open groups and last tab are stored client-side and in the profile; filters and sort live in the URL.
5. Keyboard: Tab through items; groups are buttons with `aria-expanded`; menus use arrows, Home, End, Esc; skip link first; `⌘K` opens search.
6. Mobile: sidebar becomes a drawer; stores and consumer apps use `BottomTabs` instead.
7. The logo links to the home page and always has an accessible name.

## 5. Code
```tsx
<SideNav groups={groups} current={current} collapsed={rail} onToggle={() => setRail(!rail)}
  brand={<Logo height={32} tagline={false} />} />
<TopBar left={<Logo height={26} tagline={false} />} center={<SearchTrigger onClick={openPalette} />} right={<Avatar id={u.id} name={u.name} />} />
<EcomHeader categories={cats} cartCount={count} announcement="Free shipping over $75" />
```
