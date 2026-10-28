# Navigation per product type (the matrix)

Building blocks are specified in `03-components/navigation-topbar-sidebar-tabs-breadcrumb.md`. This file decides which shell to use.

## 1. Decision table

| # | Product type | App shell | Why |
|---|---|---|---|
| a | **Admin / back-office SaaS** (CRM, billing, ops) | Persistent left sidebar (240px, collapsible to 64) + top bar (56px) | 10–30 destinations across workflows; users switch between them constantly; sidebar keeps them one click away and shows location |
| b | **Data / analytics tool** | Top bar + **filter rail** (left, 280px, collapsible) + optional collapsible sidebar (rail 64px by default) | Canvas width is the scarce resource; filters are the primary control and must stay visible |
| c | **Developer tool / docs-heavy** | Top bar + left **tree nav** (280px) + right **TOC** (200px, ≥ 1280px) | Deep hierarchies, long documents, in-page anchors; users scan headings |
| d | **Multi-product platform** | Top **product switcher** (in the topbar's left slot) + per-product sidebar | Each product has its own IA; switcher is the only cross-product nav; keeps sidebars small |
| e | **Marketing / marketing-adjacent app** (public site, simple self-serve) | Horizontal top nav (64px), ≤ 6 items + 1 CTA, footer sitemap | Few destinations; discovery over density |
| f | **Workflow / approval tool** (inbox, queues, tickets) | Inbox-style **list + detail split pane** (list 360–420px, detail fluid) + slim sidebar of queues | Triage speed: next/previous without losing context |
| g | **Settings** (within any product) | Secondary settings nav (left, 220px) inside the content area; page is Focus archetype | Many parallel pages; unrelated to primary IA |
| h | **Mobile** (< 768px) | **Bottom tab bar** for ≤ 5 top destinations (56px + safe area); drawer (hamburger/"More") beyond 5 | Thumb reach; primary destinations always visible |

## 2. Screen-size rules
| Viewport | Shell behavior |
|---|---|
| < 640 | Topbar 56px with logo, search icon, avatar; navigation via bottom tab bar (≤ 5) or hamburger drawer; no persistent sidebar; secondary nav becomes a select or segmented list at the top of the page |
| 640–1023 | Sidebar hidden behind hamburger or collapsed rail (64px); filter rails become sheets |
| 1024–1279 | Sidebar collapsed rail by default (user can pin open); TOC hidden |
| ≥ 1280 | Sidebar 240px expanded; TOC visible; filter rail persistent |
Never horizontal scroll for nav. Never hide the only route to a destination behind hover.

## 3. Rules
1. **Max depth ≤ 3**: section › page › tab. Breadcrumbs from depth 3.
2. **Max primary items ~7** (hard cap 9); group with labelled sections beyond that.
3. One global nav per product; additional navs are local (tabs, secondary rail).
4. Same destination = same label, icon, and position on every screen size.
5. The product switcher (d) is the only element allowed to cross products; no cross-product items in sidebars.
6. Mobile bottom bar: 3–5 items, icon 24 + label 11px, current = tinted + semibold, no badges larger than a dot unless a count.
7. Every shell has a skip link, landmarks, and a global search entry (⌘K) except marketing sites (optional).

## 4. Persistent state
| State | Stored where | Key |
|---|---|---|
| Sidebar collapsed/expanded | `localStorage` + user profile (server) | `ui.sidebar` = `expanded | rail` |
| Sidebar group open/closed | `localStorage` | `ui.nav.group.<id>` |
| Filter rail open | `localStorage` per surface | `ui.filters.<surface>` |
| Table density | `localStorage` + profile | `ui.density.<surface>` |
| Last visited tab per record type | `sessionStorage` | `ui.tab.<type>` |
| Theme | `localStorage` + profile | `ui.theme` |
| Active filters/sort/page | **URL query string** (shareable, back-button safe) | `?q=&status=&sort=&page=` |
Rule: anything that changes what data is shown lives in the URL; anything that changes chrome lives in storage. Server profile wins on sign-in; localStorage is the immediate cache to avoid flash (read in a blocking head script for theme and sidebar).
