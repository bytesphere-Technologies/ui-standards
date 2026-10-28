# Charts and data visualization

Libraries: **Apache ECharts** (Apache-2.0, echarts.apache.org) for scale, large datasets, and complex charts; **Recharts** (MIT, recharts.org) or **visx** (MIT, airbnb.io/visx) for simple React SVG charts; Nivo (MIT, nivo.rocks) allowed for heatmaps/sankeys. One engine per chart type per product. Charts are lazy-loaded; never on the critical path.

## 1. Purpose
Make a comparison, trend, or distribution legible faster than a table would.

## 2. When to use / when not to
| Question | Chart |
|---|---|
| Change over time | **line** (≤ 6 series), area (1 series, 24%→0% primary fill — the sanctioned data-viz gradient) |
| Compare categories | **bar** (horizontal for long labels) |
| Part of whole (≤ 4 parts) | stacked bar / **pie or donut ≤ 4 slices**; otherwise bar |
| Distribution | histogram / box plot |
| Relationship | scatter |
| Single KPI | big number + sparkline, not a gauge |
| Exact values matter | table |
Not: 3D; pie > 4 slices; gauges/donut soup; dual-axis unless scales are labeled and justified; radar for non-experts.

## 3. Anatomy
```
Title (h3 16/600)                                    1 title: what is measured
Subtitle: unit · period · comparison (13px secondary) 2 subtitle: "Revenue (USD) · last 30 days vs. prior 30"
Legend (top-left, direct labels preferred)           3 legend (≤ 6 items)
 ┌───────────────────────────────────────┐
 │ y-axis labels (12px, tabular)  gridlines │          4 axes: ticks 12px `text-tertiary`; 5 gridlines 1px `border-subtle` horizontal only
 │            ╱╲_╱‾                         │          6 marks: 2px lines, bars radius 2 top
 └───────────────────────────────────────┘
 Tooltip on hover/focus: date, series, value, delta     7 tooltip (shadow-dropdown)
Source: "Source: Billing, updated 12:04"  (12px)       8 source note
```

## 4. Variants
Categorical palette derived from brand, **max 6 hues, fixed order**:
| # | Token | Hex (light) |
|---|---|---|
| 1 | `color-data-1` | `#116CB3` |
| 2 | `color-data-2` | `#A46E04` |
| 3 | `color-data-3` | `#2F8F83` |
| 4 | `color-data-4` | `#7B5EA7` |
| 5 | `color-data-5` | `#B8457B` |
| 6 | `color-data-6` | `#768693` (other/baseline) |
Rules: single-series charts use #1. Order never changes between charts for the same entity (Product A is always #1). Sequential scale (heatmap): primary-100→primary-800 in 5 steps. Diverging: `data-2` ↔ neutral ↔ `data-1` (not red/green). Neon/gradient fills banned. Series that differ only by hue also differ by marker/dash/label. Each palette is checked with Chrome vision-deficiency emulation (protan, deutan, tritan, achromatopsia) before release; a series pair that collapses gets a pattern or direct label.
Dark: lighter variants of the same hues (`#4A9BDE`, `#F2A104`, `#3FA698`, `#9479C2`, `#CF5F95`, `#8A99A5`) via the dark values of `color-data-*`; gridlines `border-subtle`.

## 5. Sizes
Min chart height 240px (sparklines 32–40px high, 96–120px wide). Aspect: 16:9 default, 2:1 for time series. Stroke 2px lines, 1px gridlines, bar gap 25%, bar corner radius 2 (top only). Axis font 12px tabular-nums. Max 6 charts per dashboard view.

## 6. States
| State | Spec |
|---|---|
| loading | **chart skeleton**: axis lines + 5–7 bar blocks or flat polyline at the final box size (`skeletons.md`) |
| empty | axis frame with message "No data for this period" + action (change period) |
| error | message + Retry; legend/title preserved |
| partial/stale | "Updated 12 min ago" strip; missing points shown as gaps (never interpolated silently; dashed segment if interpolated, with note) |
| hover/focus | crosshair 1px `border-strong`; point 8px; tooltip |
| selected | series isolated (others 30% opacity); legend item `aria-pressed` |
| disabled/read-only | n/a |

## 7. Content rules
Title states the measure ("Revenue by plan"), not a slogan. Subtitle states unit, period, comparison. Every number: tabular-nums, `Intl.NumberFormat` with compact notation on axes (`12K`), full precision in tooltips. Axis starts at 0 for bars, may break for lines with an explicit label. No chart junk: no drop shadows, glows, 3D, background images, rounded-pill bars, emoji. Delta uses ▲/▼ and sign + word ("+4.2% vs. prior period"). Direct-label the last point of each line when ≤ 4 series.

## 8. Keyboard & screen reader behavior
Chart region `role="figure"` with `aria-labelledby` (title) and `aria-describedby` (text summary: "Revenue rose 12% from $41K to $46K; peak on 14 Mar."). **Provide a table alternative**: "View as table" toggle (or adjacent `<details>`) with the same data, sortable. Keyboard: focusable chart; ←/→ moves between data points, ↑/↓ between series, Esc hides tooltip; tooltip content mirrored in a polite live region. ECharts `aria: { enabled: true, decal: { show: true } }` enables auto descriptions and decal patterns.

## 9. Tokens used
`color-data-1..6` · `color-border-subtle` · `color-border-strong` · `color-text-{primary,secondary,tertiary}` · `typography-caption` · `typography-numeric` · `color-surface-raised` · `shadow-dropdown` · `radius-card`.

## 10. Accessibility notes
Marks ≥ 3:1 vs surface (SC 1.4.11). No information in color alone (SC 1.4.1). Text alternatives (SC 1.1.1). Animations ≤ 400ms, none when `prefers-reduced-motion`. Provide data download (CSV).

Measured series contrast on white `#FFFFFF`: #1 5.50 · #2 4.37 · #3 3.91 · #4 5.25 · #5 5.03 · #6 3.75 — all ≥ 3:1. Dark on `#0A121C`: 6.30 · 8.85 · 6.38 · 5.17 · 5.13 · 6.43.

## 11. Do / Don't
- Do: line chart with 4 series, direct-labeled endpoints, 1px horizontal gridlines. Don't: 3D donut with 9 slices and a rainbow legend.
- Do: "+4.2% ▲ vs. prior 30 days". Don't: green arrow with no number.
- Do: skeleton with axes and bars while loading. Don't: spinner on a gray rectangle.
- Do: "View as table". Don't: chart as image with no alt.

## 12. Code example
```tsx
// Recharts (simple) — lazy: const RevenueChart = dynamic(() => import("./revenue-chart"), { ssr: false, loading: () => <ChartSkeleton /> })
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const fmt = new Intl.NumberFormat("en-US", { notation: "compact" });
export default function RevenueChart({ data }: { data: { date: string; revenue: number }[] }) {
  return (
    <figure aria-labelledby="rev-t" aria-describedby="rev-d" className="rounded-card border border-subtle bg-surface-raised p-5">
      <figcaption><h3 id="rev-t" className="text-h4 font-semibold text-primary">Revenue</h3><p className="text-body-sm text-secondary">USD · last 30 days vs. prior 30</p></figcaption>
      <p id="rev-d" className="sr-only">Revenue rose 12% from $41K to $46K, peaking on 14 March.</p>
      <div className="h-60"><ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--color-text-tertiary)" }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(v) => fmt.format(v)} tick={{ fontSize: 12, fill: "var(--color-text-tertiary)" }} tickLine={false} axisLine={false} width={40} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="var(--color-data-1)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer></div>
      <p className="mt-2 text-caption text-tertiary">Source: Billing · updated 12:04</p>
    </figure>
  );
}
```
ECharts: register only used modules (`echarts/core` + `LineChart`, `GridComponent`, `TooltipComponent`, `CanvasRenderer`) to keep the bundle small.

## 13. Anti-patterns
3D; pie > 4 slices; gradient fills (except the single-series area fade); red/green-only encoding; dual axes unlabeled; truncated bar axes; animated count-up; charts without units; > 6 series; legends far from marks; auto-playing chart animations on scroll; charts as images; more than 6 charts per dashboard view; gauge/donut soup.

## 14. Responsive & density
320px: one chart per row, height 200px min, legend below, tooltip tap-to-open, axis ticks reduced to 4. 768px: 2 per row. 1440px: 3–4 per row on grid spans (see `spacing-and-layout.md`). Compact: padding 16px, axis 12px unchanged.
