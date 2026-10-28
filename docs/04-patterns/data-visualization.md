# Data visualization

Library: **Recharts** (recommended; not installed in the showcase, which uses its own SVG components) for standard charts in product (line, bar, area, pie). Use the showcase `LineChart`, `ColumnBars`, `StackedBars`, `Donut`, `Sparkline`, `Heatmap`, `Funnel` for simple cases. **visx** or D3 only for custom charts. Never mix libraries on one page.

## Pick the chart

| Question | Chart | Not |
|---|---|---|
| How has it changed over time? | Line (area for volume) | Pie |
| Compare categories | Horizontal bar (sorted) | Pie with more than 5 slices |
| Part of a whole, 2 to 5 parts | Donut or stacked bar | 3D anything |
| Distribution | Histogram | Average only |
| Relationship of two numbers | Scatter | Dual-axis lines |
| Progress to a target | Bullet, gauge, progress ring | Pie |
| Many categories over time | Heatmap | 12-line spaghetti |
| Funnel steps | Funnel or ordered bars | Pie |
| Single number | Stat tile with delta and sparkline | Chart |

## Color

1. Series colors come from `--color-data-1` to `--color-data-6` in order. Check each new theme against 3:1 on the surface color before shipping (the a11y test does not cover chart marks).
2. Color is never the only signal: add direct labels, line styles (solid, dashed) or markers.
3. Sequential data (low to high) uses one hue in 5 steps of `--color-action-primary`; diverging data uses blue and amber with a neutral midpoint.
4. Good is not green and bad red alone; pair with arrows (▲ ▼) and words.
5. Maximum 6 series. More: group the tail into "Other".

## Anatomy and rules

- **Title** states the finding or the metric; subtitle gives the unit and period ("USD thousands, last 30 days").
- **Axes:** y starts at zero for bars. Lines may start elsewhere but say so. Light gridlines, 4 to 6 ticks, tabular figures, compact numbers (46.2K).
- **Legend** above or direct labels at line ends. Hover and focus highlight a series and dim others.
- **Tooltip** on hover, focus and tap: value, label and date, with unit. Appears within 100 ms.
- **Comparison:** show previous period as a dashed line in tertiary color.
- **Annotations** for events (release, outage) as small markers with labels.
- **Empty, loading, error:** skeleton of the chart frame; "No data for this range" with a way to widen the range; error with retry. Partial data is labelled "Incomplete".
- **Animation:** draw-in 600 ms once on first load only; no animation on refetch.

## Accessibility

- Every chart has an `aria-label` that states the headline and a visible or toggleable data table (`View as table`).
- Keyboard: focusable data points, arrow keys move, Enter or focus shows the tooltip.
- Patterns or markers as well as color; contrast of marks 3:1.
- Respect `prefers-reduced-motion`.

## Numbers

Percentages one decimal at most. Money with currency symbol and tabular figures. Deltas show sign, magnitude and comparison period ("▲ 4.2% vs. last 30 days"). Round consistently across a page.

## Test checklist

- Each chart reads correctly in grayscale.
- Tooltip reachable by keyboard.
- Dark modes keep series distinguishable.
- Axis labels never overlap at 360 px; fewer ticks on mobile.
- Table view matches the chart numbers.
