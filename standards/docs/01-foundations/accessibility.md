# Accessibility

**Floor: WCAG 2.2 level AA** (W3C Recommendation, w3.org/TR/WCAG22). Not a target; a release gate. Reference implementations: **GOV.UK Design System** (design-system.service.gov.uk — user-tested components, WCAG 2.2 AA) and **USWDS** (designsystem.digital.gov). When our pattern is undecided, read theirs first. Behavior patterns follow the **WAI-ARIA Authoring Practices** (w3.org/WAI/ARIA/apg).

## 1. Focus
1. Visible focus ring on every focusable element: **2px solid `color-focus-ring`, 2px offset** (`ring-2 ring-focus ring-offset-2 ring-offset-focus-offset`), via `:focus-visible`. Light 5.50:1, dark 7.59:1.
2. `outline: none` is banned unless replaced by the ring in the same rule. Lint rule `no-outline-none`.
3. Ring never clipped: containers with `overflow:hidden` give 4px inner padding or use `ring-inset` (tables, menus).
4. Focus appearance ≥ 3:1 against adjacent colors, area ≥ 2px perimeter (SC 2.4.11, 2.4.13).
5. Focus is never obscured by sticky headers/footers/toasts (SC 2.4.11): `scroll-padding-top: 72px` (topbar 56 + 16), toasts never overlap focused content (they live bottom-end).
6. Focus order = DOM order = visual order. No positive `tabindex`. `tabindex="0"` only on custom widgets; `-1` for programmatic focus.
7. Skip link: first focusable element on every page, "Skip to main content", visible on focus, targets `<main id="main" tabindex="-1">`.
8. After route change, move focus to the page `<h1>` (or `main`) and announce the new title.

## 2. Target size
1. Minimum **24×24 CSS px** for every pointer target (SC 2.5.8), including hit-area padding.
2. **44×44 preferred** on touch layouts (< 768px) and for primary actions.
3. If a target is < 24px, spacing to the nearest target ≥ 24px minus its size.
4. Inline text links are exempt.

## 3. Forms and errors
1. Labels are always visible and programmatically associated (`<label for>` / `aria-labelledby`). **No placeholder-as-label.**
2. Required: `required` + `aria-required` + visible marking convention (`forms-and-validation.md`).
3. Autocomplete tokens on personal-data fields (SC 1.3.5): `autocomplete="email|name|current-password|new-password|one-time-code|street-address|…"`.
4. Error identification: text message adjacent to the field, `aria-invalid="true"`, `aria-describedby` → error id. Color is never the only cue (icon + text).
5. Error suggestion: say what to do ("Enter a date as DD/MM/YYYY"), SC 3.3.3.
6. Error prevention for legal/financial/destructive submits: confirm, review, or undo (SC 3.3.4).
7. Redundant entry: never ask for info already entered in the same flow (SC 3.3.7).
8. Authentication: allow paste into password fields and password managers; offer a non-cognitive-test alternative (SC 3.3.8). No CAPTCHA that requires puzzle solving as the sole option.
9. Consistent help: help link in the same place on every page (SC 3.2.6).

## 4. Keyboard map conventions

| Key | Behavior |
|---|---|
| Tab / Shift+Tab | Move between widgets; never trapped except inside modals (trap with wrap) |
| Enter | Activate button/link, submit form, open selected item |
| Space | Activate button, toggle checkbox/switch, select option in multi-select |
| Esc | Close the topmost layer (popover > modal > sheet), cancel inline edit, clear search; never destroys unsaved data without confirm |
| Arrow keys | Move within composite widgets: menu, tabs, radio group, listbox, grid, tree, slider (roving tabindex) |
| Home / End | First / last item in a composite widget |
| PageUp / PageDown | ±10 items in lists/grids; ±10% on sliders |
| Type-ahead | Menus, listboxes: jump to the item starting with the typed characters |
| `/` | Focus global search (when not in a field) |
| ⌘K / Ctrl+K | Command palette |
| `?` | Keyboard shortcut cheat sheet |

Every single-character shortcut can be turned off or remapped (SC 2.1.4). Dragging has a non-drag alternative (SC 2.5.7): reorder lists get "Move up/down" buttons.

## 5. Screen readers and live regions
1. Landmarks: one `<header>`, `<nav aria-label>` per nav, one `<main>`, `<aside>`, `<footer>`.
2. One `<h1>` per page; headings nest without skipping levels.
3. Toast container: `role="region" aria-label="Notifications"`; each toast `role="status"` (`aria-live="polite"`); errors `role="alert"` (`aria-live="assertive"`). The live region exists in the DOM before content is injected.
4. Async loading: `aria-busy="true"` on the region while loading; announce completion ("12 results") via a polite region; do not announce every skeleton.
5. Table sort: `aria-sort` on the active `th`.
6. Dynamic status changes (saved, copied) use polite live regions; never move focus for them.
7. Icon-only controls have accessible names. Decorative images `alt=""`.
8. Names: visible label text is contained in the accessible name (SC 2.5.3).

## 6. Modals and return focus
1. Opening a modal moves focus into it (first focusable, or the heading `tabindex="-1"` for long content; destructive dialogs focus the Cancel button).
2. Focus is trapped; Tab wraps; background is `inert`.
3. Esc closes (unless a blocking operation runs).
4. On close, focus returns to the element that opened it. If that element no longer exists, to the nearest logical container heading.
5. Scroll lock on `body` without layout shift (`scrollbar-gutter: stable`).

## 7. Zoom and reflow
1. Content works at **200%** browser zoom without loss (SC 1.4.4) and at **320 CSS px** width with no 2D scrolling, except data tables, maps, code (SC 1.4.10).
2. Text spacing overrides (line-height 1.5, paragraph 2×, letter 0.12em, word 0.16em) cause no clipping (SC 1.4.12). No fixed-height text containers.
3. Never disable pinch-zoom (`user-scalable=no`, `maximum-scale=1` banned).
4. Content on hover/focus (tooltips) is dismissible (Esc), hoverable, persistent (SC 1.4.13).

## 8. Motion
`prefers-reduced-motion` honored (`motion.md` §5). No flashing > 3 times per second (SC 2.3.1). No auto-updating content without a pause control (SC 2.2.2).

## 9. Common failures → fix

| Failure | Fix |
|---|---|
| Placeholder used as label | Add visible `<label>` above the field |
| Icon button with no name | `aria-label="Delete invoice"` + tooltip |
| `outline: none` | Use `focus-visible:ring-2 ring-focus ring-offset-2` |
| Error shown only in red | Add icon + text message; `aria-describedby` |
| Div with `onClick` | `<button type="button">`; links navigate with `<a href>` |
| Custom select not keyboard operable | Use Radix Select / React Aria ComboBox |
| Modal without focus trap / return | Use Radix Dialog; test Esc and focus return |
| Toast with decision or auto-dismiss < 4s | Banner or modal; toasts persist ≥ 4s, errors until dismissed |
| Low-contrast gray text (`#9CA3AF` on white = 2.5:1) | `text-tertiary` (5.40:1) |
| Hover-only action buttons in rows | Show on `focus-within` too, or always visible |
| Color-only chart legend | Direct labels + marker shapes |
| Auto-advancing carousel | Static grid or user-controlled with pause |
| Drag-only reorder | Add Move up / Move down buttons (SC 2.5.7) |
| Sticky header covers focused element | `scroll-padding-top` ≥ header height + 16 |
| `target="_blank"` with no warning | Add `external-link` icon and visually hidden "(opens in new tab)" |
| Disabled submit with no explanation | Keep enabled; show validation on submit, or adjacent reason text |
| Link text "Click here" | Describe destination: "View billing history" |
| Text in images | Real text; if unavoidable, matching `alt` |

## 10. Testing gate
axe-core via `@axe-core/playwright` on every story and every page, zero violations (`06-engineering/testing-and-a11y-automation.md`); keyboard-only pass; VoiceOver + NVDA spot check each release; 200% zoom and 320px check. Automated tools find ~30–40% of issues; manual passes are not optional.
