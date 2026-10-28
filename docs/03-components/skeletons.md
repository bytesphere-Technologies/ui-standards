# Skeletons

## 1. Purpose
Show the shape of content that is loading so layout does not shift and waiting feels shorter.

## 2. When to use / when not to
Use for content regions whose shape is known and that take 300ms–10s to load: tables, cards, charts, detail panes, lists. Not: < 300ms loads (show nothing); unknown shape (use an inline spinner); button/field actions → in-control spinner; whole page when only a section loads; long operations with measurable progress → progress bar.

## 3. Anatomy
Placeholder blocks that replicate the final content box: 1 container (same border, radius, padding as real) · 2 blocks (same heights and widths as the text/media they replace) · 3 optional shimmer layer.

## 4. Variants
| Variant | Geometry |
|---|---|
| text line | height = line-height − 6px (14px body → 14px block in a 20px line), radius 4, widths vary 100/80/60% |
| heading | 20px block, 40% width |
| avatar | circle at final size (24/32/40/64) |
| image | final aspect ratio (16:9 etc.), radius per card |
| table rows | N rows × 40px (32 compact), cell blocks sized to the column's typical content, header rendered for real |
| card | same padding/regions: title block, 2 text lines, footer block |
| chart | axis lines + 5–7 bars (bar) or flat polyline (line); y-axis tick blocks; legend blocks |
| KPI | 12px label block, 32px number block, 16px delta block |
Fill: `surface-sunken` (light) / `night-3` (dark) — 1.1:1 vs surface is intentional (not content).

## 5. Sizes
Match the final content exactly. If a final height is variable, choose the median height; allow growth, never shrink.

## 6. States
| State | Behavior |
|---|---|
| hidden | for the first **150ms** of loading (avoid flash) |
| visible | after 150ms, shown until data resolves; minimum display time 300ms once shown (avoid flicker) |
| shimmer | only if expected duration > 600ms; implemented as a 1.5s linear opacity pulse (1 → 0.55 → 1) on the block fill, **one shimmer per screen region**; none on text that resolves in < 200ms. No gradient sweep (gradient rule in `color.md`) |
| reduced motion | static fill, no shimmer |
| error | skeleton replaced by error state; never leave skeleton forever (timeout 15s → error) |
| empty | replaced by empty state |
Hover/focus/selected/disabled/read-only: n/a.


## 7. Content rules
No text inside skeletons. No generic gray bars at arbitrary widths: widths mirror real content (a "Status" column gets a 64×22 pill block; a name column an 140×14 block).

## 8. Keyboard & screen reader behavior
Non-interactive and skipped by focus. Container: `aria-busy="true"` while loading; `aria-live="polite"` on the region; skeleton blocks `aria-hidden`. When data lands, announce once ("12 results") — do not announce skeletons. Provide visually hidden "Loading {name}…" text inside the region once.

## 9. Tokens used
`color-surface-sunken` · `radius-control` · `radius-card` · `duration` (shimmer 1500ms, linear) · `component-table-row-height-*`.

## 10. Accessibility notes
SC 4.1.3. Skeleton is not content; never the only indicator when loading > 5s (add "Still loading…" text after 5s with a Cancel/Retry path). No `aria-label` noise on blocks.

## 11. Do / Don't
- Do: 10 table rows at 40px with a header and column-shaped blocks. Don't: one big gray rectangle.
- Do: skeleton card matching padding and title line. Don't: skeleton plus spinner together.
- Do: skeleton for the chart area only while the rest of the page is live. Don't: skeleton the entire page when one widget loads.
- Do: wait 150ms before showing. Don't: flash a skeleton on a 60ms response.

## 12. Code example
```tsx
import { cn } from "@/lib/utils";

export function Skeleton({ className, shimmer = false }: { className?: string; shimmer?: boolean }) {
  return <div aria-hidden className={cn("rounded-control bg-surface-sunken", shimmer && "motion-safe:animate-shimmer", className)} />;
}

export function DelayedFallback({ delay = 150, children }: { delay?: number; children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return show ? <>{children}</> : null;
}

export function TableSkeleton({ rows = 10, cols = [160, 64, 120, 80] }: { rows?: number; cols?: number[] }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading deals…</span>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex h-(--row) items-center gap-3 border-b border-subtle px-3">
          {cols.map((w, c) => <Skeleton key={c} className={cn("h-3.5", c === 1 && "h-[22px]")} style={{ width: w }} />)}
        </div>
      ))}
    </div>
  );
}
// tailwind: @keyframes shimmer { 50% { opacity: .55 } } .animate-shimmer { animation: shimmer 1.5s linear infinite }
```

## 13. Anti-patterns
Generic gray bars; spinner inside a card; skeleton + spinner together; whole-page skeleton for a section load; shimmer on every block; skeleton shown for < 150ms; skeleton that never times out; skeleton heights that differ from content (causes shift).

## 14. Responsive & density
Skeleton follows the component's responsive layout (cards at 320px render one column of skeleton cards). Compact: 32px rows. Reduced motion: no shimmer.
