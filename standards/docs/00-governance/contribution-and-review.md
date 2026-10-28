# Contribution and review

Rule zero: **no component ships without a documented keyboard path and designed empty, loading, and error states.** A PR missing any of them is closed, not commented on.

## Lifecycle

| Stage | Owner | Output | Exit criteria | SLA |
|---|---|---|---|---|
| 1. Proposal | Any engineer or designer | RFC issue using the template below | 2 product teams name a real screen that needs it. One team = build it locally in the product, not in the system | — |
| 2. Triage | Design systems lead | Accept / reject / "extend existing" | Check first: can an existing component take a `variant` or slot instead? | 5 working days |
| 3. Design spec | Proposing designer | Figma + spec file from `03-components/_component-spec-template.md` | All 14 template sections filled; all states drawn in light and dark, both densities | 10 days |
| 4. Build | Proposing engineer | Component in the registry, story per state, tests | Passes `00-governance/definition-of-done.md` | — |
| 5. Review | See table below | Approvals recorded on PR | All required sign-offs present | 3 working days per reviewer |
| 6. Release | Design systems team | Minor version + changelog entry | Published to registry; migration note if it replaces a local pattern | next weekly release |

## RFC template

```
Title: Add <Component>
Problem: <what users cannot do today>, with 2 screenshots from real screens
Screens that need it: <links, min 2 products or 2 flows>
Why existing components fail: <which ones you tried>
Proposed API: <props, slots, 10 lines of JSX>
Behavior: keyboard map, focus order, ARIA pattern (link to APG pattern)
States: default · hover · focus-visible · active · selected · disabled · loading · error · read-only
Library: <Radix/Base UI/React Aria primitive used, or "none, because...">
New dependency? <if yes, answer the 5 questions in 06-engineering/stack-and-library-catalog.md>
```

## Required sign-offs

| Reviewer | Signs off on | Blocks merge if |
|---|---|---|
| Visual reviewer (design) | Tokens used, spacing on the 4px scale, radius per class, density modes, dark mode, copy casing | any raw value, any off-scale spacing, any banned pattern from `07-antipatterns/` |
| A11y reviewer (named a11y champion, not the author) | Keyboard map, focus order, focus ring, labels, ARIA pattern, 200% zoom, reduced motion, SR spot check | any axe violation, any missing accessible name, any focus trap without return focus |
| Engineering reviewer | API conventions, bundle cost, tests, types, SSR safety | API violates `06-engineering/component-api-conventions.md`, bundle delta > 5 kB gzip without waiver |
| Design systems lead | Overlap with existing components, naming, versioning impact | duplicate of an existing component |

The author may not be their own visual or a11y reviewer. Two people minimum on every PR; the same person cannot hold both visual and a11y.

## Rejection reasons (use verbatim in review)

1. `DUP` — existing component covers this with a variant.
2. `STATE` — missing empty / loading / error / partial state.
3. `KBD` — no documented keyboard path.
4. `TOKEN` — raw value found at `file:line`.
5. `SLOP` — matches an item in `ai-slop-detector.md` (cite the item number).
6. `A11Y` — fails an axe rule or manual check (cite WCAG SC).
7. `FORK` — local copy of a registry component.

## Waivers

A waiver is a PR comment from the design systems lead naming: the rule, the screen, the reason, and an expiry date ≤ 90 days. Waivers are listed in `/WAIVERS.md`. Expired waivers fail CI.
