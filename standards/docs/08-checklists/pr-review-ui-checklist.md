# PR review: UI checklist

Copy into the PR description. Every box ticked or marked N/A with a reason. Reviewer cites rejection codes from `00-governance/contribution-and-review.md`.

## Tokens and style
- [ ] No raw hex / rgb / arbitrary px / arbitrary z-index (`grep -E '#[0-9a-fA-F]{3,8}\b|rgba?\(|\[[0-9]+px\]|z-\[' ` clean)
- [ ] Only semantic/component tokens; no primitive ramps (`bg-neutral-*`, `text-primary-700` absent)
- [ ] Spacing from the 4px scale; section gap 24/40; card padding 20 (16 compact)
- [ ] Radius per class: control 4 · button 6 · card 8 · modal 12 · round (avatar/dot) only
- [ ] No shadows on in-flow surfaces; shadow only on menu/popover/modal/toast
- [ ] No gradients (outside marketing hero / chart fill); no blur; no glow
- [ ] One icon family (Lucide), 16/20/24; no emoji in UI or copy
- [ ] Type from the scale; ≤ 3 weights on screen; tabular-nums on numbers; sentence case

## Components and API
- [ ] Uses registry components; no local fork of `components/ui/*`
- [ ] No new dependency (or the 7-question template filled in)
- [ ] Props follow vocabulary (`variant`, `size`, `tone`, `loading`, `asChild`); ≤ 3 booleans
- [ ] Controlled + uncontrolled where stateful; refs forwarded; types exported

## Behavior and states
- [ ] Exactly one primary button in the view
- [ ] Loading (shaped skeleton after 150ms), empty, error (retry + reference), partial/stale — all designed and storied
- [ ] Hover, focus-visible, active, disabled-with-reason, selected, read-only states present
- [ ] Forms: validate on blur, input preserved on failure, double-submit prevented, unsaved-changes guard
- [ ] Destructive actions confirmed with consequence, or undoable
- [ ] URL holds filter/sort/page/tab state

## Accessibility
- [ ] axe: zero violations on every touched story and page
- [ ] Keyboard-only pass: logical Tab order, no traps, Esc closes layers, focus returns
- [ ] Visible 2px focus ring (no `outline-none` without replacement)
- [ ] Every control has an accessible name; icon-only has `aria-label` + tooltip
- [ ] Labels visible; errors via `aria-describedby`; status not color-only
- [ ] Targets ≥ 24px (44px touch)
- [ ] Contrast ≥ 4.5:1 text / 3:1 UI (new pairs added to `color.md` table)
- [ ] `prefers-reduced-motion` respected

## Responsive, theme, locale
- [ ] Verified at 320 · 768 · 1440 and 200% zoom — no clipped content, no 2D scroll
- [ ] Dark mode checked; contrast re-measured
- [ ] Both densities checked (tables, forms)
- [ ] RTL story passes; logical properties only; no hard-coded strings; `Intl` formatting

## Performance and robustness
- [ ] Bundle delta in PR (≤ 5 kB gzip or waiver); charts/editors lazy-loaded
- [ ] Images have width/height, alt, lazy-loading (except LCP)
- [ ] No layout shift on load (CLS ≈ 0)
- [ ] Error boundary around new async widget

## Copy
- [ ] Buttons verb-first; errors "what + how to fix"; no "Oops/Awesome/Supercharge"
- [ ] No lorem ipsum, "John Doe", invented metrics or logos

## Anti-slop
- [ ] Nothing from `07-antipatterns/ai-slop-detector.md`; positive test passed

## Docs and tests
- [ ] Stories per state/theme/density; play functions for keyboard
- [ ] Spec updated (`03-components/`), changelog entry, analytics events in the tracking plan
