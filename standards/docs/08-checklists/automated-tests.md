# Automated tests

The standard is enforced by tests in `apps/showcase/tests/`. They use Playwright with the system Chrome (set `CHROME_PATH` to change it) and axe-core. Run from `showcase/`.

| Command | What it checks | Fails when |
|---|---|---|
| `npm run test:smoke` | Every route renders a visible heading, no page errors, no console errors | A page throws, or React warns (duplicate keys, bad props) |
| `npm run test:a11y` | axe WCAG 2.1 A and AA on every route in light, Midnight and Ocean dark | Any serious or critical violation (contrast, names, roles, list structure) |
| `npm run test:mobile` | 360 px: no horizontal page scroll on any route; primary controls at least 40 px tall on key pages | The page scrolls sideways, or a button or field is under 40 px |
| `npm run test:flows` | Behaviour: notification bell, command palette, checkout, OTP paste, tasks undo, data table sort and select, kanban move, role permissions, import wizard, two-step setup, modal, 429 lockout, skip link | A promised interaction breaks |
| `npm test` | All of the above (about 12 minutes, 3 workers) | Any of the above |

The route list is read from `src/registry.tsx` and `src/data/status.ts`, so new pages are covered automatically.

## What the tests have already caught

- Duplicate React keys in `Pagination` and the plan comparison table.
- Dark-mode text contrast on surfaces that use `bg-action-accent` with hard-coded white text.
- `sr-only` elements escaping scroll containers and widening the page at 360 px (fixed globally: scroll and clip containers are positioned).
- Grid and flex children without `min-width: 0` overflowing on mobile.
- Buttons given a `reason` while enabled, which silently disabled them. `reason` means "disabled, and here is why": pass it only when disabled.
- A promo "Apply" button inside a form that never submitted because buttons default to `type="button"`.
- Carousel, scroll regions and progress rings missing names or focusability.

## Adding a test

1. A new page needs nothing: smoke, a11y and mobile pick it up.
2. A new interaction goes in `tests/flows.spec.ts`. Use roles and accessible names (`getByRole`, `getByLabel`), never CSS classes. If the test is hard to write with roles, the component has an accessibility problem.
3. Keep waits explicit (`expect(...).toBeVisible()`), not sleeps.

## Writing components so they pass

- Every interactive element has an accessible name. Icon-only buttons get `aria-label`.
- Text on tinted or brand backgrounds uses a token pair (`bg-action-accent` with `text-action-accent-fg`), never `text-white`.
- Do not use `text-tertiary` on `bg-selected`; use `text-secondary`.
- Scrollable regions are focusable (`tabIndex={0}`) and labelled.
- A grid or flex child that holds wide content gets `min-w-0`.
- Interactive controls are at least 40 px tall on mobile (the `--control-*` tokens do this).

## CI

Run `npm run build && npm test` on every pull request. Treat any new failure as a blocker; never relax a test to pass.
