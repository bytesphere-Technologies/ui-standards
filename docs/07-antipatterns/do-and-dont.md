# Do and don't

Paired visual descriptions across the system. Each pair is checkable by eye.

## Spacing
1. **Do:** 16px between fields in a group, 32px between groups, one gap owner (`gap-4` on the parent). **Don't:** `mb-4` on children plus `pt-5` on the next, producing 36px in one place and 16px in another.
2. **Do:** card padding 20px everywhere in the layout. **Don't:** one card at 24px, one at 16px, one at 32px.
3. **Do:** section gap 24px on mobile, 40px on desktop. **Don't:** 64px gaps between product sections.

## Hierarchy
4. **Do:** page title 24px/600, section titles 16px/600, body 14px/400, meta 13px `text-secondary`. **Don't:** every text 16px with only a bolder weight for headings.
5. **Do:** one filled primary button at the top-right of the page header. **Don't:** four equally loud filled buttons in the toolbar.
6. **Do:** bold only the row's identifier in a table. **Don't:** bold entire rows or all cell text.

## Color
7. **Do:** neutral surfaces with `border-subtle`, brand color only on the primary button, links, and the current nav item. **Don't:** brand-colored sidebar, header, cards, and buttons all at once.
8. **Do:** status expressed as tinted pill + dot + word ("Past due"). **Don't:** a red dot alone.
9. **Do:** `text-secondary` for supporting text (7.63:1). **Don't:** `gray-400` text at 2.5:1 for helper copy.
10. **Do:** deltas "▲ +4.2%" with sign and glyph in green plus text. **Don't:** green/red numbers with no sign or arrow.

## Shape and depth
11. **Do:** buttons 6px, inputs 4px, cards 8px, modals 12px. **Don't:** `rounded-2xl` on everything, or pill buttons next to square inputs.
12. **Do:** flat bordered cards; shadow only on menus, modals, toasts. **Don't:** a `shadow-lg` on every KPI card.
13. **Do:** modal scrim as a flat 48% overlay. **Don't:** backdrop blur with floating glass panels.

## Copy
14. **Do:** "Delete 3 invoices" on the confirm button, with "This can't be undone." **Don't:** "Yes" / "No" under "Are you sure?".
15. **Do:** error "Enter a date after 1 Mar 2026." **Don't:** "Invalid input".
16. **Do:** "Create project" (verb + object), sentence case. **Don't:** "Submit", "OK", "Click Here", Title Case.
17. **Do:** empty state "No invoices yet. They appear after your first billing cycle." **Don't:** "Nothing here yet! 🎉".
18. **Do:** "Couldn't load projects. Check your connection and retry." **Don't:** "Something went wrong."

## States
19. **Do:** 10 skeleton rows at 40px matching the columns while loading a table. **Don't:** a centered spinner in a blank table.
20. **Do:** one failed widget shows Retry while the other five render. **Don't:** the whole dashboard replaced by an error.
21. **Do:** "Updated 12 min ago · Refresh" on stale data. **Don't:** silently showing old numbers.
22. **Do:** disabled-with-reason: "Only admins can invite members" tooltip. **Don't:** a grayed button with no explanation.

## Tables
23. **Do:** right-aligned, tabular-nums amounts with the unit in the header. **Don't:** centered numbers in a proportional font, units repeated per cell.
24. **Do:** dividers between rows on a 6-column table. **Don't:** zebra stripes on narrow tables.
25. **Do:** card layout under 768px. **Don't:** a 9-column table squeezed to 320px.

## Forms
26. **Do:** a visible label above each field. **Don't:** placeholder text as the only label.
27. **Do:** validate on blur, keep input on failure. **Don't:** validate on first keystroke or reset the form after an error.
28. **Do:** one primary action bottom-right with Cancel to its left. **Don't:** Save on the left in one form and the right in another.
29. **Do:** mark the few optional fields "(optional)" when most are required. **Don't:** asterisks on every field.

## Navigation
30. **Do:** one active style: tinted background + semibold label. **Don't:** tint + left bar + bold + colored icon.
31. **Do:** 7 grouped primary items. **Don't:** 14 flat items or hidden-icon "mystery meat".
32. **Do:** breadcrumb at depth ≥ 3, last crumb plain text. **Don't:** breadcrumb on every top-level page.
33. **Do:** account menu with sign out last after a divider. **Don't:** destructive "Delete account" in the header menu.

## Motion and media
34. **Do:** 150ms fade for a menu. **Don't:** bounce, spring, or 600ms slide-ins.
35. **Do:** static grayscale logo row of real customers. **Don't:** infinite scrolling logo marquee.
36. **Do:** video user-initiated, captions on. **Don't:** autoplay with sound.
37. **Do:** real product screenshot with believable data. **Don't:** glowing mockup of a perfect upward chart.
