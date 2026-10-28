# List / index page

**Purpose:** find, compare, and act on many records. **Reuse when:** any collection (projects, customers, invoices, logs). Archetype A.

## Wireframe
```
Projects                                                     [Import] [Create project]
Manage and track every project in your workspace.
[🔍 Search projects…] [Status ▾] [Owner ▾] [+ Add filter]    Sort: [Updated ↓]  [≣ density] [Columns] [Export]
Applied: [Status: Active ✕]  Clear all                                    37 results
┌──┬────────────────┬────────┬─────────┬───────────┬──────┐
│☐ │ Name ▲         │ Status │ Owner   │ Budget USD│  ⋯   │
├──┼────────────────┼────────┼─────────┼───────────┼──────┤
│☐ │ Apollo         │ ● Active│ M. Ito  │  12,400.00│  ⋯   │
│  ...                                                      │
└──┴────────────────┴────────┴─────────┴───────────┴──────┘
1–50 of 1,284            Rows per page [50▾]       ‹ 1 2 [3] … 26 ›
```
Bulk mode: toolbar replaced by `3 selected · [Archive] [Delete…] · Clear`.

## Required regions
Page header · toolbar (search, filters, sort, density, columns, export) · applied-filter row · table/list · pagination footer · bulk bar (on selection) · empty/error/loading states.

## Components
`PageHeader`, `Input` (search), `FilterChip` + `Popover`, `Select` (sort), `ToggleGroup` (density), `DropdownMenu` (columns), TanStack Table v9 `DataTable`, `StatusPill`, `Checkbox`, `Pagination`, `Button`, `AlertDialog` (bulk delete), `Toast` (undo).

## States
| State | UI |
|---|---|
| loading | 10 skeleton rows at row height, toolbar live |
| empty (first run) | StatePanel: "No projects yet" + "Create project" |
| no results | echo query/filters + "Clear filters" |
| error | table body error panel + Retry; toolbar remains |
| stale | strip "Updated 12 min ago · Refresh" |
| partial | per-row error cell "—" with tooltip; never blank rows |
| selected | row tint + check; bulk bar |
| row action pending | row `aria-busy`, action menu spinner |
| deleted (undo) | row removed optimistically; toast "Project archived · Undo" 6s |

## Responsive
≥ 1024 full table; 768–1023 P3 columns hidden, "Columns" menu; < 768 card list (title, status pill, 2 key/values, ⋯ menu), toolbar → [Search][Filters (2)][Sort]; pagination compact; header actions: primary stays, secondary into ⋯.

## Copy rules
Page title = plural noun. Description ≤ 120 chars. Primary action "Create {noun}". Column headers nouns with units. Result count always shown. Empty text follows `empty-loading-error-and-partial-states.md`.

## Implementation (shadcn/ui)
shadcn Data Table pattern (ui.shadcn.com/docs/components/data-table) with TanStack Table v9; `Table`, `DropdownMenu`, `Checkbox`, `Pagination`; URL state with `nuqs`; server-side sort/filter/paginate; virtualization with TanStack Virtual > 200 rows. Block reference: `dashboard-01` data-table section.
