# Dashboard patterns

## 1. Layout
```
Page header: "Overview"  [Last 30 days ▾] [vs prior period ▾]                 [Primary: Create project]
Filter bar (global to the page; sticky): Segment · Region · Owner       (chips) · Clear all
KPI row      : 3–4 cards (3 cols each of 12)
Chart row    : 8 cols primary chart + 4 cols secondary chart
Activity row : table or feed (12 cols) with "View all"
```
Max **6 widgets** per view (KPI cards count as one widget group). More → separate pages or tabs.

## 2. KPI card
| Part | Spec |
|---|---|
| Label | 13px/500 `text-secondary`, ≤ 24 chars ("Net revenue") |
| Number | 32px/40px 600 `tabular-nums`, `Intl.NumberFormat` compact above 9,999 |
| Delta | ▲/▼ glyph + signed value + word: `▲ +4.2% vs. prior 30 days`; color `status-success-fg`/`status-danger-fg` **plus** glyph and sign; neutral if |Δ| < 0.1% |
| Sparkline | 96×32px line in `color-data-1`, 2px, no axes, no fill, no tooltip required; `aria-hidden` with delta text carrying meaning |
| Comparison period label | 12px `text-tertiary` under the delta: "Mar 1–30 vs. Jan 30–Feb 28" |
| Card | static card, padding 20, 1px border, no shadow, whole card not clickable unless it drills down (then card-as-link) |
**Every number has a time window and a comparison.** A number with neither is rejected.

## 3. Rules
1. No gauge / donut soup. KPI = number + delta; breakdown = bar; trend = line.
2. Max 6 widgets, max 4 KPI cards.
3. Widget-level loading / empty / error — one widget failing never blanks the page (`empty-loading-error-and-partial-states.md`).
4. Global filters affect all widgets and are shown in the URL; widget-level controls are limited to chart type toggle (segmented, ≤ 3) and a period override.
5. **No dashboard is a landing page**: it contains the next action (primary button in the header, and per-widget "View all"/"Fix" actions on attention items).
6. Defaults: period "Last 30 days", compare "Prior period".
7. Refresh: show "Updated 12:04" in the header meta; manual "Refresh" ghost button; auto-refresh ≥ 60s only if the user turns it on.
8. Order by importance: KPI → trend → breakdown → what needs attention.
9. Same metric = same name, format, and color everywhere.
10. No animated counters, no decorative backgrounds.

## 4. Widget-card contract
```ts
export interface WidgetCardProps {
  title: string;                       // "Revenue"
  description?: string;                // "USD · last 30 days"
  status: "loading" | "empty" | "error" | "ready" | "stale";   // the four states are mandatory
  updatedAt?: Date;                    // required when status === "stale"
  onRetry?: () => void;                // required when status === "error"
  action?: { label: string; href: string };   // "View all"
  span?: 3 | 4 | 6 | 8 | 12;           // grid columns on ≥ 1024
  emptyState: { title: string; description: string; action?: ReactNode };   // required, no default
  children: ReactNode;                 // rendered only when status === "ready" | "stale"
}
```
Behavior: header (title h3 16/600 + description + action, kebab menu for "Export CSV / View as table"), body min-height 240 (KPI 112), status handled by the card (skeleton shaped via `skeleton` slot prop, error panel with Retry, stale strip). Footer source note optional. Implementation: shadcn `Card` + `StatePanel` + `Skeleton`; charts lazy-loaded.

## 5. Filter bar
Chips for applied filters, "Add filter" popover, period selector at far right; sticky under topbar when scrolling; "Clear all" visible when ≥ 1 filter; applied filters summarized in the URL. Debounced 300ms for text fields; instant for selects.

## 6. Responsive
320: widgets stack one per row, KPI cards 2 per row (min 160px) if the numbers fit, else 1; charts 200px min; tables → cards. 768: KPI 2×2, charts full width. 1024+: grid per `spacing-and-layout.md`. Compact density does not apply to dashboards.
