# Tables and data grids

## 1. Purpose
Let users scan, compare, sort, filter, and act on many records of the same shape.

## 2. When to use / when not to
Use for ≥ 5 comparable records with ≥ 3 attributes. Not: ≤ 4 items with rich content → cards/list; a single record's fields → description list; hierarchical data → tree; spreadsheet-style editing of 1000s of cells → data grid with virtualization (below).

## 3. Anatomy
```
Toolbar: [search] [filter chips] ........ [density] [columns] [export]    ← 1
Bulk bar (replaces toolbar when rows selected): "3 selected · [Archive] [Delete] · Clear"   ← 2
┌─┬──────────────┬────────┬─────────┬──────────┬────┐
│☐│ Name ▲       │ Status │ Owner   │ Amount   │ ⋯  │ ← 3 sticky header (sunken bg, 12px/600 tertiary… 13px/600 secondary)
├─┼──────────────┼────────┼─────────┼──────────┼────┤
│☐│ Acme renewal │ ● Active│ M. Ito │ 12,400.00│ ⋯  │ ← 4 rows, 1px divider, hover bg
└─┴──────────────┴────────┴─────────┴──────────┴────┘
Footer: "1–50 of 1,284" · Rows per page [50▾] · ‹ 1 2 3 … 26 ›            ← 5 pagination
```
Container: 1px `border-subtle`, radius 8, `overflow-x:auto`, no shadow.

## 4. Variants
| Variant | Use |
|---|---|
| Standard | ≤ 12 columns, dividers |
| Zebra | > 12 columns only (`surface-sunken` on even rows); otherwise dividers, never zebra |
| Selectable | leading checkbox column 40px |
| Expandable | chevron column; detail row |
| Data grid (virtualized, editable) | TanStack Virtual; ≥ 1,000 rows rendered; cell focus model |

## 5. Sizes
| Mode | Row | Header | Cell x-padding | Font |
|---|---|---|---|---|
| Comfortable | 40px | 40px | 12px | 14px |
| Compact | 32px | 32px | 12px | 13px |
Column min-width 80px; actions column 48px; checkbox column 40px; text columns max 320px then ellipsis.

## 6. States
| State | Change |
|---|---|
| default | divider 1px `border-subtle` |
| hover | row bg `action-ghost-hover`; row actions appear (also on focus-within) |
| focus-visible | 2px inset ring on cell (grid) or row link |
| active | n/a |
| selected | row bg `selected-bg`, checkbox checked, `aria-selected="true"`; never color alone |
| disabled | row `text-disabled` (non-actionable records) with reason in a tooltip |
| loading | **skeleton rows** (same count as page size, up to 10; same row height and column widths). Not a spinner |
| error | table body replaced by error state with retry; header stays |
| read-only | no checkboxes/inline edits |
| empty | see `empty-loading-error-and-partial-states.md`: no data vs no results (with "Clear filters") |
| partial/stale | "Updated 4 min ago · Refresh" strip above header |

## 7. Content rules
Alignment: text left; numbers/currency/dates-as-numbers **right with `tabular-nums`**; status **left-aligned in its column (center-left, 12px inset)**; actions right. Header text matches column alignment. Header labels: noun, sentence case, ≤ 20 chars, no wrap. Units in header ("Amount (USD)"), not per cell. Dates: relative ≤ 7 days with absolute in title ("3 days ago"), else `12 Mar 2026`. Null = `—` in `text-tertiary`. Truncate with ellipsis + `title`.

Sorting: click header cycles none → asc → desc; `aria-sort`; chevron icon 16px shown on hover (faint) and active (full). Default sort stated in the UI. Filtering: column filters as chips in the toolbar, not per-header inputs. Column priority: P1 (always: identifier, status, primary metric), P2 (≥ 768), P3 (≥ 1280); user can show/hide P2/P3 via "Columns".

**Responsive collapse:** ≥ 1024 full table; 768–1023 hide P3 columns; < 768 table → **card list** (title row = P1 identifier + status pill; 2–3 key/value pairs; actions menu). Horizontal scroll with sticky first column is the fallback for grids with > 8 required columns.

**Selection & bulk:** header checkbox = page select (indeterminate when partial); after page select, a banner offers "Select all 1,284" . Bulk bar appears in place of the toolbar, sticky, with count and ≤ 3 actions; destructive bulk requires confirm naming the count.

**Pagination vs infinite scroll rule:** records addressed, compared, or exported → pagination (default 50, options 25/50/100, URL-synced `?page=&size=`). Feeds/logs consumed in time order and never compared → cursor "Load more" button (not auto-infinite). Infinite auto-scroll is banned in tables.

## 8. Keyboard & screen reader behavior
Semantic `<table>`, `<th scope>`, `<caption>` (visually hidden) — use `role="grid"` only for interactive cell navigation.
| Key | Behavior |
|---|---|
| Tab | into table, then to row link/actions (rows are not each a tab stop unless they contain controls) |
| Arrow keys (grid) | move cell focus; Ctrl+Home/End first/last cell |
| Space | toggle row selection (on checkbox) |
| Enter | open row (primary link) / enter edit (grid) |
| Esc | exit edit / clear selection |
| Shift+click / Shift+Space | range select |
Sorted header: `aria-sort`; loading: `aria-busy` on `<tbody>`; result count announced politely ("50 results"). Row actions menu: `aria-label="Actions for {name}"`.

## 9. Tokens used
`component-table-{row-height-comfortable,row-height-compact,header-bg,row-hover,row-selected,divider,cell-padding-x}` · `typography-body|body-sm|caption` · `typography-numeric` · `color-status-*` (pills) · `color-selected-bg`.

## 10. Accessibility notes
Headers keyed to cells (SC 1.3.1). Sort state not color-only (SC 1.4.1). Row hover actions reachable by keyboard (SC 2.1.1). Sticky header must not hide focused rows (`scroll-padding-top` = header + topbar). Target 24px for row checkboxes/menus. Zoom 200%: horizontal scroll inside the container is allowed (SC 1.4.10 exception).

## 11. Do / Don't
- Do: right-aligned `12,400.00` in tabular figures with a "USD" header. Don't: centered numbers in proportional font.
- Do: dividers between rows with a subtle hover. Don't: zebra stripes on a 6-column table.
- Do: 10 skeleton rows at 40px while loading. Don't: a centered spinner in an empty box.
- Do: one status pill per row. Don't: five colored tags per cell.

## 12. Code example (TanStack Table v9)
```tsx
import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel, type ColumnDef } from "@tanstack/react-table"; // v9 — tanstack.com/table
import { StatusPill } from "@bytesphere/ui/ui/status-pill";

type Deal = { id: string; name: string; status: "active" | "paused"; owner: string; amount: number };
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const columns: ColumnDef<Deal>[] = [
  { accessorKey: "name", header: "Name", cell: (c) => <a className="font-medium text-primary hover:underline" href={`/deals/${c.row.original.id}`}>{c.getValue<string>()}</a> },
  { accessorKey: "status", header: "Status", cell: (c) => <StatusPill tone={c.getValue() === "active" ? "success" : "neutral"}>{c.getValue<string>() === "active" ? "Active" : "Paused"}</StatusPill> },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "amount", header: () => <div className="text-end">Amount (USD)</div>, cell: (c) => <div className="text-end tabular-nums">{money.format(c.getValue<number>())}</div> },
];

export function DealsTable({ data, loading }: { data: Deal[]; loading?: boolean }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return (
    <div className="overflow-x-auto rounded-card border border-subtle bg-surface-raised">
      <table className="w-full border-collapse text-body">
        <caption className="sr-only">Deals</caption>
        <thead className="sticky top-14 z-sticky bg-surface-sunken text-body-sm font-semibold text-secondary">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="h-(--row) border-b border-subtle">
              {hg.headers.map((h) => (
                <th key={h.id} scope="col" aria-sort={h.column.getIsSorted() === "asc" ? "ascending" : h.column.getIsSorted() === "desc" ? "descending" : undefined} className="px-3 text-start">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody aria-busy={loading}>
          {loading
            ? Array.from({ length: 10 }, (_, i) => (<tr key={i} className="h-(--row) border-b border-subtle"><td colSpan={columns.length} className="px-3"><div className="h-4 w-2/3 rounded-control bg-surface-sunken" /></td></tr>))
            : table.getRowModel().rows.map((r) => (
                <tr key={r.id} className="h-(--row) border-b border-subtle last:border-0 hover:bg-action-ghost-hover aria-selected:bg-selected" aria-selected={r.getIsSelected() || undefined}>
                  {r.getVisibleCells().map((c) => (<td key={c.id} className="px-3">{flexRender(c.column.columnDef.cell, c.getContext())}</td>))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
```
(Skeleton cell widths must be column-shaped in production; see `skeletons.md`.)

## 13. Anti-patterns
Zebra on narrow tables; centered numbers; spinner for loading rows; infinite auto-scroll; per-header filter inputs; icons in every row; bold text across a whole row; 14 visible columns by default; row click that conflicts with inline controls; hover-only row actions; paginating client-side 50k rows.

## 14. Responsive & density
320px: card list. 768px: P1+P2 columns. 1440px: all columns, max width 1440. Compact: 32px rows, 13px text. Density toggle in the toolbar persists per table id.
