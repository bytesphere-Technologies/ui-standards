# Board page (pipeline)

**Purpose:** move items through stages and see load per stage. **Reuse when:** deals, tickets, tasks, approvals. Route `/pipeline`.

## Wireframe
```
Pipeline                                                   [+ New deal]
┌ Proposal 2      $12,400 ┐ ┌ Negotiation 2  $152,170 ┐ ┌ Closed won 2  $9,950 ┐
│ ┌ ⠿ Northwind renewal ┐ │ │ ┌ ⠿ Contoso …         ┐ │ │ …                    │
│ │ $12,400             │ │ │ │ $48,250             │ │ │                      │
│ │ (MM) 3 days ago ← →│ │ │ │ …                   │ │ │                      │
```
Column: `surface-sunken`, 8px radius, 8px padding. Card: `Card` p-3, 8px gap.

## Rules
1. Dragging is an enhancement. Every card has Move left / Move right buttons and the same actions in its menu (WCAG 2.5.7).
2. Column header shows name, count, and the sum of a numeric field.
3. Keyboard: Tab to a card; `Space` picks up; arrows move between columns and positions; `Space` drops; `Esc` cancels. Announce each move in a polite live region.
4. A move is optimistic with rollback and an error toast on failure.
5. Empty columns say "No deals in this stage" in tertiary text, not a large illustration.
6. Max 8 columns; beyond that use filters or a table.

## States
loading (3 columns of skeleton cards) · empty board (first-run panel) · drag-over (column gets `selected` background and 1px `action-primary` border) · move failed (card returns, toast with Retry).

## Responsive
< 1024: columns stack, or a segmented control picks one column at a time.

## Implementation
dnd-kit with `KeyboardSensor` and `PointerSensor`; stagger recipe (M-09) on first render; TanStack Query mutation with `onMutate` rollback.
