# Page QA checklist

Run on every new or changed page before it leaves staging. Record viewport, browser, and theme tested.

## Structure
- [ ] One `<h1>` = page title; headings sequential
- [ ] Landmarks: `header`, `nav` (labelled), `main`, `footer`; skip link works
- [ ] Page header: title 24px, ≤ 1 primary action, top-right
- [ ] Layout matches archetype (Index / Detail / Focus); content ≤ 1280/1440px
- [ ] `document.title` = `{Page} · {Product}`; focus moves to h1 after navigation

## Data surfaces (each one)
- [ ] Loading: skeleton matches final geometry, appears after 150ms, times out at 15s to error
- [ ] Empty (first-run) has value statement + one primary action
- [ ] Empty (no results) echoes filters + "Clear filters"
- [ ] Error: says what failed, Retry works, input preserved, reference id shown
- [ ] Partial/stale: widget-level failure doesn't blank the page; stale badge shows
- [ ] Every number has unit, time window, comparison (dashboards)

## Interaction
- [ ] Tab order = visual order; all interactive elements reachable and operable
- [ ] Focus ring visible on every element, in light and dark
- [ ] Esc closes the top layer; focus returns to trigger
- [ ] Double-click / double-submit doesn't duplicate
- [ ] Back/forward restore filters, sort, page, tab
- [ ] Copy-link of the URL reproduces the view
- [ ] Unsaved-changes guard works on route change and tab close

## Visual
- [ ] Spacing on scale; consistent gaps; no stray margins
- [ ] One radius per element class; no shadows on flat cards
- [ ] Type hierarchy visible in a 3-second squint test
- [ ] Status never color-only; pills ≤ 2 colors per row
- [ ] No gradients, glass, glow, emoji, decorative blobs/dots/noise
- [ ] Numbers right-aligned, tabular; dates in locale format

## Responsive
- [ ] 320px: no horizontal scroll (except tables/code); touch targets 44px; table→cards
- [ ] 768px: layout adapts (sidebar rail/drawer, columns)
- [ ] 1440px: content not stretched; sticky stack correct
- [ ] 200% zoom: readable, nothing clipped, nothing overlapped by sticky UI
- [ ] Landscape phone OK

## Theme / density / locale
- [ ] Dark mode: contrast verified, images/logos have dark variants
- [ ] Compact density (tables) correct; comfortable default elsewhere
- [ ] RTL: mirrored layout, directional icons flipped, logos/charts not mirrored
- [ ] Pseudo-locale (+30%): no truncation of critical text, no broken buttons
- [ ] Long names, empty strings, 10-digit numbers, 0, negative values render sensibly

## Accessibility
- [ ] axe (Playwright) zero violations, light + dark
- [ ] Screen reader (VoiceOver and NVDA): headings, landmarks, names, states, live regions
- [ ] Forms: labels, `aria-describedby` errors, `autocomplete`, error summary on long forms
- [ ] Reduced motion: no transform animation
- [ ] Color-blind emulation: charts and statuses still distinguishable

## Performance
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (Lighthouse mobile + RUM)
- [ ] JS within route budget; charts lazy
- [ ] Images sized, lazy, correct formats; fonts preloaded

## Copy
- [ ] Sentence case; verb-first buttons; no filler marketing language in product
- [ ] Errors "what + how to fix"; consistent terminology (glossary)
- [ ] No lorem ipsum, placeholder names, invented metrics

## Anti-slop (positive test)
- [ ] "Does this look like it was designed by someone who had to answer to a design review?" — Yes, with evidence
