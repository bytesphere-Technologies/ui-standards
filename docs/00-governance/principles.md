# Principles

Eight principles. Each has one implication you can check in review.

| # | Principle | Concrete implication |
|---|---|---|
| 1 | **Predictable over clever** | The same action is always in the same position. Primary action: top-right of a page header, bottom-right of a dialog. Cancel is always left of confirm. |
| 2 | **Density is respect** | Users work here 6 hours a day. Default body is 14px, default row is 40px, default control is 36px. Whitespace is spent on grouping, not on filling the viewport. |
| 3 | **State is part of the design** | A component spec without empty, loading, error, and partial states is rejected. Designing only the happy path is unfinished work. |
| 4 | **Keyboard first, pointer equal** | Every flow completes without a mouse. Every shortcut has a visible hint in a menu or tooltip. |
| 5 | **Quiet by default, loud by exception** | Neutral surfaces, one brand color, one primary button. Danger red and warning amber are used only when something is actually wrong, which makes them readable when they appear. |
| 6 | **Explain, don't decorate** | Every visual element answers a user question. If an element answers none, delete it. This bans icon-in-circle headings, background orbs, mascots, sparkle motifs. |
| 7 | **Own the code** | We copy shadcn/ui components into our registry and own them. We do not wrap, fork locally, or depend on a design system we cannot patch. |
| 8 | **Measure, then argue** | Disputes are settled by a contrast ratio, a Lighthouse number, a task-time test, or an axe result. Taste opinions need a measurement or lose. |

## How principles resolve conflicts

Order of precedence: accessibility > predictability > density > aesthetics. A prettier layout that moves the primary action loses. A denser table that fails a 24px target size loses.
