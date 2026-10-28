# Testing and accessibility automation

## 1. Pyramid
| Layer | Tool | Scope | Gate |
|---|---|---|---|
| Unit | Vitest (vitest.dev) | pure functions, hooks, formatters, token build | required, ≥ 80% lines on `lib/` |
| Component interaction | Testing Library + user-event, Storybook `play` functions (storybook.js.org/docs/writing-tests) | keyboard paths, state transitions, form validation | required on every component |
| Stories as visual contract | **Storybook 10.3** | one story per variant × state × theme × density; autodocs | required |
| Accessibility | **axe-core via @axe-core/playwright** (playwright.dev/docs/accessibility-testing) + Storybook a11y addon | every story and every page | **zero violations, CI gate** |
| Visual regression | Playwright `toHaveScreenshot` or Chromatic | stories and key pages, light/dark, 320/768/1440 | diff threshold 0.1%; changes need visual-reviewer approval |
| End-to-end | Playwright | critical flows: sign-in, create, edit, delete, invite, billing | required for P0 flows |
| Performance | Lighthouse CI, size-limit | budgets in `performance-budget.md` | required |

## 2. Stories are the contract
Each component has stories named `Default`, one per variant, and one per state (`Hover`, `FocusVisible`, `Disabled`, `Loading`, `Error`, `ReadOnly`, `Empty`), plus `Dark`, `Compact`, `RTL`, `LongContent`, `PseudoLocale`. `play` functions assert keyboard behavior (Tab order, Enter/Space/Esc, arrows). Stories use realistic data (see `ai-slop-detector.md` for sample-data rules).

## 3. axe in Playwright (CI gate)
```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/sign-in", "/projects", "/projects/apollo", "/settings/profile"]) {
  for (const scheme of ["light", "dark"] as const) {
    test(`a11y ${path} ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
```
Storybook test-runner runs the same rule set on every story. Waivers are per-rule per-selector in `a11y-waivers.json` with expiry date (CI fails on expired).

## 4. Manual passes (axe finds roughly 30–40% of issues)
| Pass | When | Method |
|---|---|---|
| **Keyboard-only** | every PR touching interaction; weekly on top 5 flows | unplug mouse; Tab/Shift+Tab/Enter/Space/Esc/arrows; verify visible focus, no traps, logical order, return focus |
| **Screen reader spot check** | every release | VoiceOver + Safari (macOS/iOS), NVDA + Firefox (Windows); verify headings, landmarks, names, states, live regions on 5 flows |
| **200% zoom & 320px reflow** | every new page/component | browser zoom 200%; DevTools 320px; no clipped content or 2D scroll |
| **Contrast** | any new color pairing | add to `color.md` table; `tokens:check` script |
| **Color-blind emulation** | charts, status UIs | DevTools Rendering → vision deficiency emulation |
| **Reduced motion** | any animation | OS setting on; verify no transform animations |
| **Text spacing** | new text containers | bookmarklet for SC 1.4.12 overrides |

## 5. Visual regression rules
Deterministic: fixed fonts (self-hosted), frozen time (`page.clock`), animations disabled, mocked data (MSW), masked dynamic regions. Baselines per OS in CI container only. Snapshot matrix: light/dark × comfortable/compact for components; light/dark × 320/768/1440 for pages. Snapshot updates require the visual reviewer.

## 6. Test data
Realistic and varied: names from diverse origins (not "Alex, Sarah, James" ×3), long names, RTL names, empty and max-length strings, large numbers, zero values, timestamps across zones. Factories with `@faker-js/faker` seeded for determinism. No lorem ipsum in stories except for body-text overflow tests.

## 7. CI pipeline order
`lint (eslint, jsx-a11y, token lint) → typecheck → unit → build tokens (--check) → storybook build → storybook tests + axe → playwright e2e + axe pages → visual regression → lighthouse/size-limit`. Fast checks first; PR cannot merge on any failure. Nightly full cross-browser (Chromium, Firefox, WebKit).

## 8. Definition of tested
Component merged only when `00-governance/definition-of-done.md` boxes for keyboard, screen reader, zoom, RTL, dark, and reduced motion are ticked with evidence (story links, recordings for SR passes).


## Implemented in the showcase

The Playwright and axe suite that runs today (smoke, a11y, mobile, flows) is documented in `08-checklists/automated-tests.md`. Unit tests, Storybook stories and visual regression from the pyramid above are not implemented in the showcase yet.
