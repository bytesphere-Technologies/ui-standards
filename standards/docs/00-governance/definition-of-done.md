# Definition of done (component)

A component is done when **every** box is checked. Partial credit does not exist.

## States
- [ ] default, hover, focus-visible, active, selected, disabled, loading, error, read-only — each built as a Storybook story
- [ ] empty, loading, error, partial/stale — for any component that renders fetched data
- [ ] disabled has an adjacent reason (tooltip, helper text, or read-only variant) where the user can act to fix it

## Tokens
- [ ] zero raw hex / rgb / px color / shadow / z-index in the component (`grep -E '#[0-9a-fA-F]{3,8}|rgba?\(' ` returns nothing)
- [ ] references semantic or component tokens only; no `color.neutral.*` primitives
- [ ] spacing values all on the 4px scale; radius per `radius-borders-elevation.md`

## Themes and density
- [ ] light and dark stories side by side; contrast re-measured in dark (≥ 4.5:1 text, ≥ 3:1 UI)
- [ ] comfortable and compact densities both implemented (controls 36/32px, rows 40/32px)

## Resilience
- [ ] 200% browser zoom: no clipped content, no horizontal scroll (WCAG 1.4.4)
- [ ] 320px reflow: no two-dimensional scroll except data tables and code (WCAG 1.4.10)
- [ ] RTL-safe: logical properties only (`ms-*`, `ps-*`, `start-*`); directional icons flip; verified with `dir="rtl"` story
- [ ] long content: 80-char label truncates with ellipsis and title/tooltip; 30% longer German string fits

## Accessibility
- [ ] keyboard: Tab order, Enter/Space/Esc/arrows per the APG pattern (w3.org/WAI/ARIA/apg); documented in the spec
- [ ] focus ring: 2px, 2px offset, token `color.focus.ring`, never `outline: none` without replacement
- [ ] accessible name on every interactive element; icon-only has `aria-label` + tooltip
- [ ] screen reader spot check: VoiceOver (Safari) and NVDA (Firefox) announce role, name, state, and changes
- [ ] target size ≥ 24×24 CSS px (44 on touch layouts)
- [ ] `prefers-reduced-motion: reduce` removes transform/opacity animation, keeps state changes instant
- [ ] axe-core: zero violations in all stories (`@axe-core/playwright`)

## Delivery
- [ ] spec doc complete per `03-components/_component-spec-template.md`
- [ ] Storybook: one story per variant × state, one `Playground`, one `Docs` page with props table
- [ ] interaction test (Storybook `play` or Testing Library) for each keyboard behavior
- [ ] visual snapshot baseline committed for light/dark × comfortable/compact
- [ ] bundle delta recorded in PR (gzip); ≤ 5 kB unless waived
- [ ] exported from the registry index; changelog entry added
- [ ] sign-offs recorded: visual, a11y, engineering (see `contribution-and-review.md`)
