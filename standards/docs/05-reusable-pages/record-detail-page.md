# Record detail page

**Purpose:** show everything about one record and let the user act on it. **Reuse when:** project, customer, invoice, ticket detail. Archetype B.

## Wireframe
```
‹ Projects  (breadcrumb: Projects › Apollo)
Apollo                                                      [Duplicate] [Edit]  [⋯]
● Active · Owner (MM) Mia Moreno · Updated 3 days ago
[Overview] [Activity] [Members] [Files] [Settings]            ← tabs, deep-linked
┌ Main (8 cols) ───────────────────────────┐ ┌ Aside (4 cols, sticky) ───────┐
│ Summary card (description, key fields)    │ │ Details (dl)                  │
│ Section: Milestones (table)               │ │  Created   12 Jan 2026        │
│ Section: Recent activity (feed, 5)        │ │  Budget    $12,400.00         │
│                                           │ │  Tags      [Q1] [Internal]    │
└───────────────────────────────────────────┘ │ Related: Customer Acme ↗       │
                                              └───────────────────────────────┘
```
Condensed sticky header (48px: title + primary action) appears after scrolling past the full header.

## Required regions
Breadcrumb (depth ≥ 3) or back link · title + status + meta row · actions (primary Edit, secondary ≤ 2, overflow menu with destructive last) · tabs (≤ 7) · main · aside (description list) · activity/audit.

## Components
`Breadcrumb`, `PageHeader`, `StatusPill`, `Avatar`, `Tabs`, `Card`, description list (`dl` with 140px label column), `Table`, `ActivityFeed`, `DropdownMenu`, `AlertDialog`.

## States
loading: header skeleton + card skeletons (shaped) · not found (404 state with "Back to projects") · forbidden (403 with request access) · archived (callout "This project is archived. Restore") · read-only (no edit actions; reason) · error per section with Retry · stale-while-editing conflict ("Mia updated this 1 min ago. Reload to see changes") · empty tabs (each has its own empty state).

## Responsive
< 1024: aside stacks below main (or moves into an "Details" tab); tabs scroll horizontally; header actions: Edit stays, others to ⋯; title truncates with 2-line clamp; meta wraps. ≥ 1024: 8/4 split; aside sticky at `top-14 + 16`.

## Copy rules
Title = record name (user data, not truncated < 60 chars). Meta uses nouns and relative dates with absolute `title`. Action labels "Edit", "Duplicate", "Archive" (not "Delete" if soft). Tab names single nouns.

## Implementation (shadcn/ui)
`Tabs`, `Card`, `Breadcrumb`, `Badge` → `StatusPill`, `Separator`, `Sheet` (inline edit side panel option). Route as `/projects/[id]/[tab]` for deep links; parallel data queries per tab; prefetch adjacent tabs on hover.
