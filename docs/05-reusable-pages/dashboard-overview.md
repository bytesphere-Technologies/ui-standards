# Dashboard overview

**Purpose:** show current state, trends, and what needs attention, with the next action available. **Reuse when:** each product's home or a section overview. Rules: `04-patterns/dashboard-patterns.md`.

## Wireframe
```
Topbar ─────────────────────────────────────────────────────────────
Sidebar │ Overview                                   [Create project]
        │ Updated 12:04 · [Refresh]
        │ [Last 30 days ▾] [vs prior period ▾]  [Region ▾] [+ Add filter]   Clear all
        │ ┌ KPI ────┐ ┌ KPI ────┐ ┌ KPI ────┐ ┌ KPI ────┐   (3 cols each)
        │ │Revenue  │ │Active   │ │Churn    │ │Open     │
        │ │$46.2K   │ │1,284    │ │2.1%     │ │37       │
        │ │▲ +4.2% … │ │▲ +1.1%  │ │▼ −0.3pt │ │…        │
        │ │ spark   │ │         │ │         │ │         │
        │ └─────────┘ └─────────┘ └─────────┘ └─────────┘
        │ ┌ Revenue over time (8 cols) ────────┐ ┌ By plan (4 cols) ─┐
        │ │ line chart                          │ │ bar chart         │
        │ └─────────────────────────────────────┘ └───────────────────┘
        │ ┌ Needs attention (12 cols) ─────────────────────────────────┐
        │ │ table: 5 rows · [View all]                                  │
        │ └─────────────────────────────────────────────────────────────┘
```

## Required regions
Page header (title, updated-at, refresh, one primary action) · filter bar (sticky) · KPI row (≤ 4) · chart row (≤ 2 charts) · attention/activity table or feed (≤ 10 rows). Total widgets ≤ 6.

## Components
`PageHeader`, `FilterBar` (chips, `Popover`, period select), `WidgetCard`, `KpiCard`, `Sparkline`, Recharts/ECharts charts, `Table` (compact, 5 rows), `StatusPill`, `StatePanel`, `Skeleton`.

## States
Per widget: loading (shaped skeleton), empty ("No revenue in this period. Change the period"), error (Retry, others continue), stale (strip). Page-level: first-run (no data at all) replaces the grid with onboarding checklist + sample-data option. Filters applied: chips + count. Permission-limited widgets: hidden if never available, locked-with-reason otherwise.

## Responsive
1440: 4 KPI / 8+4 charts. 1024: KPI 2×2, charts 12/12. 768: KPI 2×2, one chart per row. 320: all stacked, KPI 2 per row if numbers fit (min 160px) else 1; charts 200px+; table → card list. Header primary action becomes full-width at 320px below the title.

## Copy rules
Widget titles are measures ("Revenue", "Active accounts"), not slogans. Deltas "▲ +4.2% vs. prior 30 days". Empty text states the cause and action. No "Welcome back, Alex! 👋". Greeting-free.

## Implementation (shadcn/ui)
shadcn `dashboard-01` block (ui.shadcn.com/blocks) as a skeleton; replace its chart styling with token colors; use `Card`, `Chart` (Recharts wrapper) or ECharts; `Sidebar` from `sidebar-07`; keep `SectionCards` → `KpiCard`. Data via TanStack Query with one query per widget (independent states); URL filters via `nuqs`.
