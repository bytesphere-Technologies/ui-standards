# Search, filter, and sort

## 1. Toolbar anatomy
```
[🔍 Search projects…]  [Status ▾] [Owner ▾] [+ Add filter]     Sort: [Updated ▾ ↓]     [Density] [Columns] [Export]
Applied: [Status: Active ✕] [Owner: Mia ✕]   Clear all                      1,284 results
```
Toolbar height 48px (40 compact). Search 280px min. Applied-filter row appears only when filters exist; it is part of the layout flow (no layout jump: reserve nothing, animate height 150ms).

## 2. Filter chips + advanced panel
1. **Filter chip**: button showing "Status" (unset) or "Status: Active" (set); click opens a popover (240–320px) with the control (checkbox list, radio, range, date range) and "Apply"/"Clear". Selected state = chip border `border-strong` + `selected-bg`.
2. **Add filter** menu lists remaining filterable fields (searchable when > 7).
3. **Advanced panel** (side sheet 400px) for ≥ 6 filters or boolean logic: AND/OR groups, saved views; opened by "All filters (3)".
4. Filter types: text contains, enum (multi), number range, date range (presets: today, 7d, 30d, custom), boolean, person.
5. Max 5 chips visible in the toolbar before overflow into "All filters".

## 3. Applied-filter summary
- Each applied filter is a removable tag (`pills-badges-tags.md`): "Status: Active ✕", accessible name "Remove filter Status: Active".
- Order = order applied. Multi-value filter shows first value + "+2".
- **Clear all** ghost button when ≥ 1 filter; Clear all does not clear search text unless it's the only thing applied.
- Result count updates polite live region ("1,284 results" → "37 results").
- Saved views: named filter sets in a select at the toolbar start; "Save view" appears when filters differ from the view.

## 4. URL-synced state
Every active control is in the query string: `?q=apollo&status=active,paused&owner=mia&sort=-updated&page=2&size=50`. Rules: stable, human-readable keys; arrays comma-separated; descending sort with `-`; defaults omitted; changing any filter/search/sort resets `page`; the back button restores the previous state; pages are shareable and bookmarkable; invalid params are ignored with a quiet "Some filters were removed" callout.

## 5. Search behavior
1. Debounce **300ms** after the last keystroke for remote search; local lists filter instantly (< 100ms).
2. Min 1 character (2 for expensive remote). Minimum request cancellation: abort the previous request.
3. Show an inline 16px spinner in the field suffix after 150ms; keep previous results visible, dimmed (60%).
4. Enter submits immediately; Esc clears; `/` focuses the field.
5. Highlight matches with weight 600 (no yellow).
6. Search matches multiple fields; state which ("Searches name, email, ID").
7. Typo tolerance and prefix matching on the server; sort by relevance when a query is present (sort shows "Relevance").

## 6. Sort
Single-column sort by default via column header or Sort select; multi-sort only in data grids (Shift+click). Default sort named in the UI. Sort direction glyph (↑/↓) + `aria-sort`. Stable secondary sort by ID.

## 7. No-results guidance
Echo the query and filters, offer exits: "No projects match ‘apolo’ with Status: Active. Check the spelling, remove a filter, or Clear all." Buttons: "Clear filters" (primary), "Clear search" (link). Suggest the closest term when available ("Did you mean ‘Apollo’?"). Never a blank table.

## 8. Rules
1. Filters never hide silently: if filters are applied, the count and chips are visible.
2. Filtering is non-destructive and instantly reversible.
3. The filtered state survives refresh and navigation to a detail page and back.
4. Facet counts in filter options ("Active (37)") are optional but, if shown, accurate and tabular.
5. Mobile: toolbar collapses to [Search] [Filters (2)] [Sort] buttons; filters open in a bottom sheet with Apply.
