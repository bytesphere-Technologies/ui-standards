# Loaders, progress, and spinners

## 1. Purpose
Tell the user that work is in progress, and how much, using the least intrusive indicator that fits.

## 2. When to use / when not to
Pick by the decision table; never default to a spinner.

### Loader decision table
| Situation | Indicator | Notes |
|---|---|---|
| Response expected < 150ms | **nothing** | no flash |
| Click on a button / submit | **inline spinner in that button** (label preserved) | `aria-busy` |
| Field async check (unique slug) | spinner 16px in the field suffix | |
| Content region with a known shape (table, card, chart) | **skeleton** (`skeletons.md`) | after 150ms |
| Route change > 300ms | **top progress bar**, 2px, indeterminate, full width under the topbar | `primary-700` / `primary-400` dark |
| Blocking operation (migration, restore) | **section overlay** with message + Cancel path | only when interaction would corrupt state |
| Known-duration/size task (upload, export, import, onboarding) | **determinate progress bar** with % or "3 of 12" | |
| Background task (sync, indexing) | **non-blocking status** in the topbar or status line; never block the screen | |
| Unknown shape, short wait in a popover/menu | spinner 20px centered | |

**Rule: never block the whole screen for a background task.** Rule: **a spinner is never the answer for content that has a shape.**

## 3. Anatomy
Spinner: 270° arc, round cap, rotating. Progress bar: track + fill + label ("42% · 3 of 7 files") + optional cancel.

## 4. Variants
| Variant | Spec |
|---|---|
| Spinner | single ring arc; color `currentColor` (button) or `text-tertiary` (standalone) |
| Top bar | 2px tall, fixed under topbar (`top-14`), `z-sticky`, indeterminate sliding 1.2s linear; appears after 300ms, minimum 300ms visible |
| Progress bar (determinate) | 8px track (`surface-sunken`), fill `status-info-solid`/`action-primary-rest`, radius 4, never gradient, never animated stripes |
| Overlay | scrim `surface-default` at 72%, no blur, centered spinner 32px + text, Cancel button |
| Steps | "Step 2 of 4" + bar; used in onboarding |

## 5. Sizes
Spinner **12 / 16 / 20 / 32px**, stroke consistent with icons (1.75px at 16, 1.5px at 20/32, 1.25px at 12). 12px: pills/inline text; 16px: buttons, fields; 20px: menus, popovers; 32px: overlays, empty regions.

## 6. States
default (running) · determinate: 0–100 · paused (shows "Paused", bar `neutral`) · success (fill → `status-success-solid`, "Done" text, bar remains 1.5s) · error (fill `status-danger-solid`, message + Retry) · canceled. Hover/focus: only the Cancel button. Reduced motion: spinner keeps rotating at 1.2s (progress signal) but top-bar slide becomes a pulse of opacity 0.5↔1.

## 7. Content rules
Say what is happening in the object's terms: "Importing 3 of 12 files". Present participle for ongoing ("Saving…" with the ellipsis character). No jokes, no rotating quips, no fake progress. Do not animate percentages (no count-up, no easing); show real values updated at most 4×/s. Show time remaining only if accurate within ±30%.

## 8. Keyboard & screen reader behavior
Spinner container `role="status"` with visually hidden text. Progress bar: `role="progressbar"` `aria-valuenow/min/max` + `aria-valuetext="3 of 12 files"` + `aria-labelledby`. Announce at 0%, 25/50/75/100% and on completion/failure only (polite). Cancel: reachable by Tab; Esc cancels overlay operations if safe.

## 9. Tokens used
`size-icon-{sm,md,lg}` · `color-text-tertiary` · `color-action-primary-rest` · `color-status-{info,success,danger}-solid` · `color-surface-sunken` · `duration` 1200ms linear · `z-sticky`.

## 10. Accessibility notes
SC 4.1.3, 2.2.2 (indeterminate animation > 5s needs a stop/cancel or end condition), 1.4.11 (bar fill vs track 3:1: primary-700 vs sunken ≥ 7:1). Never use color alone for error state in a bar: add text.

## 11. Do / Don't
- Do: spinner inside "Save changes" with the label intact. Don't: a full-screen spinner for a save.
- Do: determinate bar "Uploading 3 of 12" with Cancel. Don't: bouncing dots for a 2-minute import.
- Do: 2px top bar for route change after 300ms. Don't: show it at 40ms.
- Do: optimistic UI for toggle and rename. Don't: a spinner on a switch.

## 12. Code example
```tsx
import { Loader2 } from "lucide-react";
export const Spinner = ({ size = 16, label }: { size?: 12 | 16 | 20 | 32; label?: string }) => (
  <span role={label ? "status" : undefined} className="inline-flex">
    <Loader2 aria-hidden style={{ width: size, height: size }} strokeWidth={size <= 12 ? 1.25 : size === 16 ? 1.75 : 1.5} className="animate-spin motion-reduce:[animation-duration:1.2s]" />
    {label && <span className="sr-only">{label}</span>}
  </span>
);

export function Progress({ value, max, label, unit = "files" }: { value: number; max: number; label: string; unit?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-body-sm"><span className="text-primary">{label}</span><span className="tabular-nums text-secondary">{value} of {max} {unit}</span></div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value} of ${max} ${unit}`} className="h-2 overflow-hidden rounded-control bg-surface-sunken">
        <div className="h-full bg-action-primary transition-[width] duration-base ease-standard" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
```
**Optimistic UI rule:** for actions with > 99% expected success and a cheap rollback (toggle, rename, reorder, favorite, mark-read), update the UI immediately, send the request, and on failure roll back and show an error toast with Retry. Never optimistic for payments, deletes of shared data, permission changes, or irreversible actions.

## 13. Anti-patterns
Bouncing dots; multi-ring or gradient spinners; percentage count-up animation; fake progress; spinner for shaped content; full-screen blocking for background work; spinner inside a skeleton; spinner with no text for > 3s; indeterminate bar for known-size uploads; striped animated bars.

## 14. Responsive & density
Top bar spans full width at every breakpoint. Overlays use the section, not the viewport, except modal-level operations. Density: spinner sizes fixed; buttons keep label.

## 15. Brand loaders (ByteSphere mark)

Loaders are built from the two halves of the logo mark so the product's waiting states are recognizably ours, and stay simple: no dots, no rings, no bounce. All use `--color-brand-mark-a/b` (navy and azure in light; their lighter counterparts in dark). Live demo: **Loaders and skeletons** page of the showcase.

| Loader | Use | Size | Behavior |
|---|---|---|---|
| **Swirl** | content and page loads, > 300ms | 40–56px | one turn per 1.6s with a rest; label optional |
| **Split** | background sync, autosave, "saving" states | 32–44px | halves part and meet; calm |
| **Trace** | inline in table headers, input suffix, list footers | 16–24px | halves take turns |
| **Orbit** | onboarding and empty-panel waits | 36–48px | halves circle each other, 2s |
| **Bloom** | listening, waiting for a device or a person | 36–48px | halves breathe in turn, 1.8s |
| **Fill** | uploads, exports, imports, any known duration | 44–64px | fills bottom-up with the percentage beside it |
| **Route bar** | route change > 300ms | 2px | `action-primary`, slides, under the top bar |
| **Button mark** | click in progress | 16px | single-color mark spins; label stays; width fixed |
| **Boot** | first load of the app or a workspace | 56px | swirl; text appears after 1s |

Rules: 1) pick the loader by the situation, not by taste; 2) never two brand loaders in one region; 3) the swirl never appears inside a card that is also showing a skeleton; 4) with reduced motion the swirl and bar become a slow opacity pulse; 5) always `role="status"` with visually hidden text, or `role="progressbar"` with values for Fill; 6) the mark is never recolored outside navy/azure/currentColor.
