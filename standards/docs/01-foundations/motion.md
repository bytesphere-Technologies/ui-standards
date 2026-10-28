# Motion

Motion explains a state change. It never entertains.

## 1. Durations

| Token | ms | Use |
|---|---|---|
| `duration-instant` | 100 | hover/pressed color, checkbox tick, focus ring appearance, tooltip fade-in |
| `duration-fast` | 150 | button state, menu/popover open, switch thumb, tab indicator |
| `duration-base` | 200 | accordion / disclosure height, toast enter, dropdown close, sidebar item reveal |
| `duration-slow` | 300 | modal / sheet / drawer enter, sidebar collapse |
| `duration-slower` | 400 | upper bound: chart first draw, onboarding step transition |

Nothing exceeds 400ms. **Page transitions longer than 200ms are banned.** Exit animations are ~30% shorter than enter (modal enter 300, exit 200).

## 2. Easing

| Token | cubic-bezier | Use |
|---|---|---|
| `easing-standard` | `(0.2, 0, 0, 1)` | state changes of elements staying on screen (move, resize, color) |
| `easing-enter` | `(0, 0, 0, 1)` | elements entering (decelerate) |
| `easing-exit` | `(0.3, 0, 1, 1)` | elements leaving (accelerate) |
| linear | `(0, 0, 1, 1)` | progress bars, spinners, shimmer only |

No spring or overshoot easing. No `ease-in-out` keyword defaults.

## 3. What may animate

| Property | Allowed | Notes |
|---|---|---|
| `opacity` | ✓ | |
| `transform` (translate ≤ 8px, scale 0.96→1) | ✓ | popover scale origin at the trigger |
| `color`, `background-color`, `border-color`, `box-shadow` | ✓ | 100–150ms |
| `height` | ✓ for disclosure/accordion only | use `grid-template-rows: 0fr → 1fr` or Radix Collapsible height var |
| `width`, `top/left`, `margin`, `padding` | ✗ | causes layout thrash |
| content layout on load | ✗ | no layout jumps; reserve space (skeleton, fixed aspect ratio) |
| `filter: blur`, `backdrop-filter` | ✗ | |

## 4. Entrance patterns

| Element | Animation | Duration |
|---|---|---|
| Menu / popover / select list | opacity 0→1 + translateY(−4px→0) + scale .96→1 | 150 enter / 100 exit |
| Tooltip | opacity only, 500ms open delay, 0 delay when moving between tooltips | 100 |
| Modal | opacity (scrim) + translateY(8px→0) + opacity (panel) | 300 / 200 |
| Sheet / drawer | translateX(100%→0) | 300 / 200 |
| Toast | translateY(8px→0) + opacity | 200 |
| Accordion | height | 200 |
| Tab indicator | translateX + width | 150 |
| Page route | none; 2px top progress bar if > 300ms | — |

### Staggered list entrance
1. Allowed only on first render of a list after an explicit user action (open a drawer, load a search result set).
2. Max **6 items** staggered; the rest appear immediately.
3. **40ms** between items, each item 150ms, translateY(4px→0) + opacity.
4. Never on re-render, refetch, sort, filter, pagination, or scroll.
5. Never on tables.

## 5. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Rules: replace transform animations with opacity or instant swaps; keep state-change color transitions ≤ 100ms; spinners remain (they signal progress) but switch to a static-friendly 1.2s rotation; no auto-advancing anything. Motion (motion.dev) users call `useReducedMotion()` and `<MotionConfig reducedMotion="user">` at the app root.

## 6. Banned
1. Bounce, elastic, overshoot easing.
2. Parallax on data screens (and anywhere in product).
3. Scroll-jacking and scroll-linked pinning in product.
4. Auto-playing carousels. Content rotates only on user action.
5. Animated number counters (count-up on load).
6. Scroll-triggered fade-in on every section.
7. Looping decorative animation (floating blobs, pulsing glows).
8. Skeleton shimmer faster than 1.5s per sweep.
9. Animating on every re-render.
10. Hover animations that move the target (button lifts, card tilts).

## 7. Animation recipes (the full catalog)

Twenty named recipes (M-01 to M-20). If an animation is not in this table it does not ship; propose a new recipe through the RFC process. All are implemented as CSS classes in the showcase (`m-fade`, `m-pop`, …) and demonstrated on its **Animation** page. Library: **CSS first**. Motion (motion.dev) only for layout and exit animations CSS cannot do. Lottie, GSAP scroll effects and parallax libraries are not used.

| ID | Name | Use | Duration | Easing | Properties | Reduced motion |
|---|---|---|---|---|---|---|
| M-01 | Fade | image reveal, tooltip, route content | 150ms | enter | opacity | instant |
| M-02 | Pop | menus, popovers, select lists, dialogs | 150ms in / 100ms out | enter / exit | opacity, translateY(−4px→0), scale(.96→1) | opacity only |
| M-03 | Rise | toasts, cards entering after an action | 200ms | enter | opacity, translateY(8px→0) | opacity only |
| M-04 | Sheet | side drawers, bottom sheets | 300ms in / 200ms out | enter / exit | translateX or translateY | instant |
| M-05 | Collapse | accordion, disclosure, filter row | 200ms | standard | `grid-template-rows` 0fr→1fr | instant |
| M-06 | Shake | invalid field after a failed submit (once; never on blur) | 240ms | standard | translateX ±4px | none |
| M-07 | Draw | success tick | 300ms | standard | stroke-dashoffset | final state |
| M-08 | Flash | row that just changed or was added | 1.2s | standard | background-color to `selected` | none |
| M-09 | Stagger | first render of a list after an action; max 6 items | 40ms step, 200ms each | enter | opacity, translateY(8px→0) | none |
| M-10 | Press | pressed buttons | 100ms | standard | scale(.985), translateY(.5px) | none |
| M-11 | Ping | live indicator, new-item dot | 1.6s loop | exit | scale, opacity | static dot |
| M-13 | Underline | nav link hover, current and open | 150ms | standard | scaleX from the start edge | instant |
| M-14 | Flyout | mega menus and panels opening | 200ms | enter | clip-path inset reveal + opacity | opacity only |
| M-15 | Burst | success ring, once, no confetti | 400ms | exit | scale .55→1.7, opacity .55→0 | none |
| M-16 | Line draw | first draw of a line chart | 400ms | standard | stroke-dashoffset (pathLength 1) | final state |
| M-17 | Grow | bars and columns on first render | 300ms + 40ms stagger | enter | scaleY from baseline | none |
| M-18 | Bell | new notification, once | 400ms | standard | rotate ±14° decaying | none |
| M-19 | Crossfade | skeleton → content | 150ms | standard | opacity | instant |
| M-20 | Drill | drill-down panels slide in and back | 200ms | enter | translateX 24px + opacity | opacity only |
| M-12 | Scan | scanner viewfinder line (operations only) | 2s loop | in-out | top 14% ↔ 86% | static, centered |

### Brand loader timing

| Loader | Cycle | Easing | Notes |
|---|---|---|---|
| Swirl | 1.6s; turns 72% of the cycle, rests 28% | in-out `(.65,0,.35,1)` | the only place in-out easing is allowed |
| Split | 1.6s; halves travel ±7% and return | in-out | quiet background work |
| Trace | 1.5s; halves alternate opacity .18→1 | linear | 16–24px inline |
| Fill | 300ms per update | standard | determinate; bottom-up |
| Route bar | 1.2s slide, 2px | linear | appears after 300ms, stays ≥ 300ms |
| Orbit | 2s; halves circle each other ±7% in opposite phase | in-out | onboarding and empty-panel waits |
| Bloom | 1.8s; halves scale .9↔1.04 and fade in turn, 0.9s offset | in-out | listening, waiting for a device |
| Button | 900ms linear spin of the mono mark | linear | label and width unchanged |

### Rules for adding or using motion
1. Animate only opacity, transform, color, and disclosure height.
2. Interaction feedback ≤ 150ms; entrance ≤ 300ms; nothing over 400ms.
3. Entrance animation runs on the first render caused by a user action, never on refetch, sort, filter or pagination.
4. No animation on elements the user is trying to read or click while they move.
5. Every recipe is checked with `prefers-reduced-motion: reduce` and with the "Preview reduced motion" toggle on the Animation page.
6. Looping animation is limited to loaders, the ping dot, the skeleton pulse, the logo marquee (pauses on hover, off under reduced motion), and `m-float` / `m-glow` on one empty-state illustration or one onboarding hint per page. Nothing else loops.

## Recipes M-21 to M-36

All are CSS classes in `packages/ui/src/styles/index.css` or helpers in `src/lab.tsx`. Every one has a reduced-motion fallback (pulse or none).

| ID | Name | Class or helper | Duration | Use for |
|---|---|---|---|---|
| M-21 | Dots wave | `m-wave` | 1.2 s loop | Inline loading, typing |
| M-22 | Equalizer | `m-eq` | 1 s loop | Processing |
| M-23 | Radar | `m-radar` | 1.8 s loop | Searching, scanning |
| M-24 | Shimmer text | `m-shimmer-text` | 2.2 s loop | AI or long task label |
| M-25 | Caret | `m-caret` | 1 s steps | Typewriter |
| M-26 | Float | `m-float` | 3.2 s loop | One empty-state illustration |
| M-27 | Wiggle | `m-wiggle` (hover) | 360 ms | Gentle attention on an icon button |
| M-28 | Elastic pop | `m-elastic` | 520 ms | Achievement badge, success icon |
| M-29 | Marquee | `m-marquee` | 28 s loop | Customer logos |
| M-30 | Heartbeat | `m-heartbeat` | 900 ms once | Reaction toggled on |
| M-31 | Glow pulse | `m-glow` | 2 s loop | One onboarding hint |
| M-32 | Ripple | `RippleButton` | 520 ms | Primary touch action |
| M-33 | Notification in | `m-notif-in` | 220 ms | New item in a list |
| M-34 | Count pop | `m-count-pop` | 260 ms | Number changed by the user |
| M-35 | Flip | `.flip` | 500 ms | Two-sided card |
| M-36 | Confetti | `fireConfetti()` | 1.1 to 1.6 s | Real milestones only |
