# Management dashboards

For people, delivery and finance oversight: headcount, sprints, workload, approvals. Live: showcase → Dashboards → Management dashboard. Code: `apps/showcase/src/pages/Dashboards.tsx`.

## 1. Layout
Page header (title, period segmented control, one primary action) → stat row (4 `StatTile style="icon"`) → main row (2/3 sprint card with steps, goals and burndown; 1/3 workload) → second row (2/3 approvals list; 1/3 composition) → third row (funnel, columns, heatmap) → activity timeline.

## 2. Widgets
| Widget | Component | Rule |
|---|---|---|
| Headcount, leave today, open roles, time to hire | `StatTile style="icon"` | each has a comparison |
| Sprint | `ProgressSteps` + `ProgressGoal` + `LineChart` (ideal dashed, actual solid) | status pill "On track / At risk / Late" with a stated rule |
| Workload | `ProgressBar` per person, danger and words above 100% | capacity %, never a ranking of people |
| Approvals | list with Decline (secondary) and Approve (primary), optimistic with Undo toast | one decision per row; shows the days requested |
| Composition | `ProgressStacked` + two `ProgressRing`s | ≤ 5 parts |
| Funnel | `Funnel` | conversion between steps, not only totals |
| Absence by weekday | `Heatmap` | numbers in cells; legend not required because values are printed |

## 3. Rules
1. Every widget has a period and comparison; the period control changes all widgets together.
2. Individual performance data shows only to roles that need it; show aggregates by default.
3. Approvals are actions, not read-only lists: the decision is in the row.
4. Widget-level loading, empty and error states (`SkeletonKit kind="dashboard"`).
5. At most 6 widget groups; add a tab rather than a seventh.
