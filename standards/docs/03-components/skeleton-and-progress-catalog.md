# Skeleton and progress catalog

Live: showcase → Kits → Stats, progress, skeletons. Code: `packages/ui/src/components/ (see stat, sparkline, progress-bar, skeleton-kit)`. Specs for the basic forms are in `skeletons.md` and `loaders-progress-and-spinners.md`; this file is the full catalog and how to choose.

## 1. Skeletons (`SkeletonKit kind=… anim=…`)
Shapes: `text · avatar · card · table · chart · list · media · form · kpi · profile · product · dashboard`. Each mirrors the final layout's heights, radii and column widths; build a new shape when a screen has a new geometry.

| Animation | Behavior | Use |
|---|---|---|
| `pulse` | opacity 1 → .55 over 1.5s | default |
| `wave` | same pulse, staggered 110ms per block | long lists and grids; reads as motion across the page |
| `static` | no motion | `prefers-reduced-motion`, print, low-power |
| `mark` | brand Trace loader centered over the shape | full-panel loads where the skeleton alone looks empty |
Pick one animation per product. Show after 150ms, hold ≥ 300ms, time out at 15s to the error state. No gradient shimmer.

## 2. Progress (choose by job)
| Component | Job | Notes |
|---|---|---|
| `ProgressBar` (xs 4 · sm 6 · md 8 · lg 12px) | single task | tones primary, success, warning, danger, navy; optional % |
| `ProgressSegmented` | n fixed steps (setup 3 of 5) | 2–8 segments |
| `ProgressSteps` | named stages | labels under the dots; current has an open ring |
| `ProgressStacked` | composition of a whole | legend with counts; ≤ 5 parts |
| `ProgressRing` | one % in a tight space | 40–72px; center shows % or a word |
| `ProgressHalf` | one KPI against capacity | the only gauge-like form; one per view |
| `ProgressBullet` | value vs target with bands | accuracy, SLA, quotas |
| `ProgressGoal` | amount toward a goal | quarter tick marks; turns success at 100% |
| `ProgressBuffer` | played vs buffered | media, streaming |
| `ProgressIndeterminate` | unknown duration | 2px–6px bar; cancel path after 5s |
| `FillLoader` | branded determinate | uploads and exports (brand loaders) |
Rules: label and value in text, never color alone; warning at 80%, danger at 100% with words; never animate the percentage number; no animated stripes.

## 3. Stat tiles (`StatTile style=…`)
`plain · spark · icon · bar · delta · split · ring · inverse`. Every tile has a label, a number, a delta with arrow and sign, and the comparison period. Rules: number tabular and 24–32px; max 4 tiles per row; one `inverse` per dashboard; delta color matches meaning, not direction (churn down is green).

## 4. Chart extras
`Heatmap` (token-mixed scale, numbers in cells), `Funnel` (conversion % per step), `ColumnBars` (one highlight), `StackedBars` (≤ 3 series, legend below). All have text alternatives and use `color-data-1…6`.
