# Page anatomy and layout

## 1. Canonical skeleton

```
┌──────────────────────────────────────────────────────────────────────────┐
│ TOPBAR 56px (sticky, z-sticky): logo · org · search ⌘K · help · bell · avatar │
├──────────┬───────────────────────────────────────────────────────────────┤
│ SIDEBAR  │ [Banner — max 1]                                                │
│ 240px    │ Breadcrumb (only if depth ≥ 3)                                  │
│ sticky   │ PAGE HEADER: Title (24/32) · description (14)      [Secondary][Primary] │
│          │ [Tabs]                                                          │
│          │ TOOLBAR: search · filter chips · sort ........ density · export  │
│          │ CONTENT (cards / table / form)                                  │
│          │ FOOTER (pagination / form actions / legal)                      │
└──────────┴───────────────────────────────────────────────────────────────┘
```
Order is fixed. A region is omitted when empty, never reordered.

## 2. Page header spec
| Property | Value |
|---|---|
| Title | `h2` 24px/32px, weight 600, `text-primary`, one line (truncate with title attr), sentence case |
| Description | 14px/20px, `text-secondary`, ≤ 120 chars, one line on desktop |
| Primary action | **exactly one** filled button, right-aligned, md (36px) |
| Secondary actions | ≤ 2 outline/ghost buttons left of the primary; further actions in a "⋯" menu |
| Gap title→description | 4px; header→toolbar/tabs 24px; header bottom border none (use spacing) |
| Back link | `‹ Projects` above the title on detail pages ≥ depth 2 on mobile |
| Meta row (detail pages) | status pill + "Updated 3 days ago" + owner avatar, 8px gaps, below title |
Page title equals the sidebar label of the current destination (consistent identification). `document.title` = `{Page} · {Product}`.

## 3. Grid and max widths
12 columns, 24px gutter. Max content width **1280px** (default), **1440px** for tables/analytics; forms 560px; reading pages 720px (68ch). Content is left-aligned inside the main area; with a 240px sidebar at a 1440px viewport, the content column is 1200px → fills. Page padding: 16 / 24 / 24 / 32px at <640 / 640 / 1024 / 1280.

## 4. Sticky behavior
| Element | Sticky? | Offset |
|---|---|---|
| Topbar | yes | top 0, z-sticky |
| Sidebar | yes | top 56px, own scroll |
| Page header | no (scrolls away); exception: record detail pages stick a **condensed header** (title + primary action, 48px) once the full header leaves the viewport |
| Tabs | yes below topbar on long pages | top 56px |
| Table header | yes | top 56px (+ tabs height if sticky) |
| Form action bar | yes bottom when form > viewport | bottom 0 |
| Bulk-action bar | yes bottom of table container | |
Sum of sticky stack ≤ 120px on desktop, ≤ 104px on mobile; set `scroll-padding-top` accordingly.

## 5. Three layout archetypes
| # | Archetype | Structure | Use for |
|---|---|---|---|
| A | **Index** | header → toolbar → table/cards → pagination. Width 1280/1440 | lists, reports, logs |
| B | **Detail** | header with meta + tabs → main (8 cols) + aside (4 cols, sticky) | records, projects, customers |
| C | **Focus** | single column 560–720px centered, no aside; action bar bottom | forms, settings sections, create flows, onboarding |
Dashboards are Index variants (KPI row + chart grid + table). Anything not A/B/C needs a design-lead exception.

## 6. Section spacing
Between page-level regions: 24px mobile / 32px desktop. Between sections inside content: 24px / 40px. Inside a card: 16px. Never combine margins; parent `gap-*` owns the spacing.

## 7. Rules (testable)
1. One `<h1>` per page = the page title (visually styled h2 in product).
2. Exactly one primary button in the page header.
3. Max 1 banner above the header.
4. Content column ≤ 1440px; text blocks ≤ 68ch.
5. Header actions stay in the same position on every page of the product.
6. A page that needs more than 3 levels of nav depth is restructured.
7. No hero sections in product pages.
