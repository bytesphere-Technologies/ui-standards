# Website navigation for large sites

For sites with dozens of sections or thousands of categories. Three reference models, each a component plus a full-page demo in the showcase (Navigation → Global bar, Marketplace header, Platform bar). Code: `packages/ui/src/components/ (see mega-menu, global-bar, marketplace-header)`. Smaller shells are in `navigation-systems.md`.

## 1. Choose the model
| Model | Reference style | Use when | Components |
|---|---|---|---|
| **Global bar** | Apple-style | a brand or product site with 5–9 top sections, each with rich content | `GlobalBar` |
| **Marketplace header** | Amazon / Walmart-style | a catalog with 1,000+ categories, search is the main entry, account and cart matter | `MarketplaceHeader`, `DepartmentDrawer`, `Typeahead`, `CategoryTree` |
| **Platform bar** | Meta-style | a suite or social product: several apps, messages, notifications, an account with workspaces | `PlatformBar`, `AppLauncher`, `AccountPanel`, `Popover` |
Smaller stores use `EcomHeader`; ordinary marketing sites use `SiteHeader`.

## 2. Global bar
| Part | Spec |
|---|---|
| Bar | 48px, nav style tokens, logo mark left, 5–9 items centered, search and one action right |
| Flyout | full width under the bar; left: lead column (24px/32px semibold links, ≤ 5), right: 2–4 columns of 14px links with a 12px muted heading; ≤ 6 links per column |
| Open | hover intent 120ms, or focus, or click; moving between items swaps content without closing |
| Close | pointer leaves for 150ms, Esc, click on the dimmed page, route change |
| Dim | flat scrim (`overlay-scrim`), no blur; page content stays in the DOM |
| Motion | panel reveal M-14 (200ms), links stagger M-09 (40ms, max 6), underline M-13 (150ms) |
| Search | icon opens a full-width panel: 24px input, quick links |
| Mobile | hamburger opens a right drawer; sections are accordions (M-05); one section open at a time |
| Tone | `light` or `dark` (Ink nav style) |
Keyboard: Tab to the bar; Left/Right move between top items; Down or Enter opens; Tab walks into the flyout; Esc closes and returns focus to the trigger.

## 3. Marketplace header
Rows: **utility** (navy: logo, deliver-to, search, language, account and lists, returns and orders, cart) → **department strip** (All button, 4–7 links, one promo line).
| Part | Spec |
|---|---|
| Search | one control: category select (≥ 640px) + input + 48px search button; 44px high; focus ring on the whole control |
| Typeahead | opens on focus. Empty: recent searches. Typing: suggestions with the typed part bold, "query in Category" chips, up to 3 product hits (art, name, price). Arrows move, Enter searches, Esc closes |
| Account flyout | hover or click; two columns (lists, account); Sign out on the first row; keeps the pointer path open (no flicker) |
| Cart | icon with count badge (99+), links to the cart; announces "Cart, 3 items" |
| All → drawer | `DepartmentDrawer` 22rem: Trending, then Shop by department; choosing a department slides in its groups (M-20) with a "Main menu" back row; footer links |
| Left tree | on category pages `CategoryTree` with counts; expandable, one tab stop per row |
| Delivery | "Deliver to Berlin 10435" opens a postcode dialog; stored per user |
Rules: search is always visible; categories never hide behind hover only (the All button is the full list); promo text is one line; no auto-rotating banners.

## 4. Platform bar
| Part | Spec |
|---|---|
| Layout | 56px, three zones: logo mark + search pill · five icon tabs · launcher, chats, notifications, account |
| Tabs | 24px icons in 64–112px targets, active icon in link color with a 3px bar that grows from the center (M-17), badges for counts |
| App launcher | popover 34rem: left product grid (3 columns, 44px colored tiles) with search; right "Create" list |
| Chats and notifications | popovers 20rem with the latest 5 and "See all" |
| Account panel | profile card with "See all workspaces", then Settings and privacy, Help and support, Display and accessibility (opens Customize), Give feedback, Log out |
| Popover behavior | click to open, Esc and outside click close, focus returns to the trigger |
Use sparingly: more than 5 tabs or 12 launcher products needs a different model.

## 5. Content and size limits
- Top level: ≤ 9 items (global), ≤ 7 department strip links, ≤ 5 tabs.
- Flyout: ≤ 4 columns, ≤ 6 links per column, ≤ 1 feature card. Link labels ≤ 28 characters.
- Depth: top level, flyout/drawer group, link. No third nested flyout.
- Badges ("New") expire after 60 days.

## 6. Performance and accessibility
1. Flyout content renders only when open (no hidden megabytes of links); prefetch the top 3 destinations on intent.
2. No layout shift when a flyout opens: it overlays, never pushes.
3. Disclosure pattern (`aria-expanded`, `aria-haspopup="true"`), not `role="menu"` (these are navigation lists).
4. Hover is never the only way: every flyout opens with keyboard and touch.
5. The scrim is not focusable; the page behind remains reachable if the flyout is closed with Esc.
6. Reduced motion: flyout appears without the reveal; stagger and underline become instant.
7. Skip link first; logo links home with an accessible name.
8. Typeahead announces result counts politely; never autoplay suggestions.
