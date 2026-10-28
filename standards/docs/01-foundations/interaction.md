# Interaction standard

How things respond. Every interactive element has these states, with these timings.

| State | Response | Timing |
|---|---|---|
| Hover (pointer only) | Background step or border darken | 100 ms |
| Press | Scale 0.98 (`press` class) | 80 ms |
| Focus-visible | 2 px focus ring with 2 px offset | instant |
| Loading | Button shows spinner and a present-participle label ("Saving"); stays the same width | on submit |
| Disabled | Opacity step, `reason` available on hover or tap | none |
| Success | Toast (4 s) or inline check; never a blocking dialog | 150 ms |
| Error | Inline message next to the cause, `m-shake` once, focus moved | 200 ms |

## Rules

1. **Optimistic by default for reversible actions** (star, complete a task, reorder). Update the UI immediately, roll back with an error toast if the request fails.
2. **Undo instead of confirm** for deletions that can be reversed. Toast with Undo for 6 s. Use a confirm dialog only for irreversible or costly actions, and name the thing being deleted on the button.
3. **Instant feedback within 100 ms.** Anything over 300 ms shows a skeleton or spinner; over 10 s shows progress with a cancel.
4. **Inline validation on blur,** not on every keystroke. Re-validate on change only after the first error.
5. **Selection is visible and countable.** Multi-select shows "3 selected" and the bulk actions appear in place.
6. **Search filters as you type** (debounce 150 ms), shows the result count, and has a useful empty state that echoes the query.
7. **Keyboard parity.** Everything works with Tab, Enter, Space, Escape and arrows. `/` focuses search, `Cmd/Ctrl+K` opens the palette, `Escape` closes the top overlay.
8. **Persist what people set:** filters, view mode, sort, density, theme. Store per browser; never store drafts of sensitive data.
9. **State survives navigation.** Back returns to the same scroll position, filter and page.
10. **Empty, loading, error, partial** are all designed for every list (see `states-gallery`).

## Shortcuts (reserved; the showcase implements only Cmd/Ctrl+K and Esc)

| Keys | Action |
|---|---|
| `Cmd/Ctrl+K` | Command palette |
| `/` | Focus search |
| `Esc` | Close overlay, clear selection |
| `?` | Shortcut help |
| `G` then `D` | Go to dashboard (two-key sequences use `G`) |
