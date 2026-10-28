# Stack and library catalog

Only libraries in this catalog may be used. Anything else goes through §5. Licenses and URLs verified against the project sites as of this writing; re-verify on each MAJOR of this standard.

## 1. Catalog

| Layer | Choice | Why | License | Status |
|---|---|---|---|---|
| **Design systems to study (not depend on)** | | | | |
| Reference | GitHub **Primer** — primer.style | Dense, accessible data UI; strong tokens and a11y docs | MIT | Reference only |
| Reference | Microsoft **Fluent 2** / Fluent UI React v9 — fluent2.microsoft.design | Enterprise density, comprehensive component behavior | MIT (Fluent UI React) | Reference only |
| Reference | Google **Material 3** + M3 Expressive — m3.material.io | State layers, motion, adaptive layout guidance | Guidelines open; code Apache-2.0 | Reference only |
| Reference | Apple **Human Interface Guidelines** — developer.apple.com/design/human-interface-guidelines | Platform conventions, touch, accessibility | Guidelines (proprietary; no code) | Reference only |
| Reference | IBM **Carbon** — carbondesignsystem.com | Data-heavy enterprise patterns, data-viz guidance | Apache-2.0 | Reference only |
| Reference | Salesforce **Lightning Design System 2** — lightningdesignsystem.com | CRM-scale patterns, tokens | BSD-3-Clause / CC (docs) — check repo | Reference only |
| Reference | **Atlassian Design System** — atlassian.design (tokens + foundations) | Token architecture, content guidelines | Free to use per site terms | Reference only |
| Reference | Shopify **Polaris** (web components; the React package is archived) — polaris.shopify.com | Admin patterns and content guidelines | MIT | Reference only — do not depend |
| Reference | **NVIDIA Elements** — nvidia.github.io/elements | Data-dense, dark-first component patterns | Apache-2.0 | Reference only |
| Reference | **Radix Colors** — radix-ui.com/colors | 12-step scale logic, dark pairings | MIT | Reference only (informs our ramps) |
| Reference | **GOV.UK Design System** — design-system.service.gov.uk | User-tested, WCAG 2.2 AA components | MIT | Reference (a11y gold standard) |
| Reference | **US Web Design System (USWDS)** — designsystem.digital.gov | Rigorous accessibility and form patterns | Public domain / CC0, MIT | Reference (a11y gold standard) |
| **Inspiration only — no public system exists** | Tesla, SpaceX, Intel, Meta, Walmart Living Design | Visual attitude only | — | **Do not cite as a library. Do not copy their assets, logos, or type.** |
| **Implementation foundation** | | | | |
| CSS | **Tailwind CSS v4** — tailwindcss.com | CSS-first `@theme` tokens, no config file, small output | MIT | Required |
| Components | **shadcn/ui** + registry — ui.shadcn.com | We copy and own the code; registry distributes it internally | MIT | Required |
| Behavior / a11y primitives | **Radix Primitives** — radix-ui.com/primitives (default) · **Base UI** — base-ui.com · **React Aria** — react-aria.adobe.com | Accessible keyboard/focus/ARIA behavior without styling | MIT · MIT · Apache-2.0 | Radix default; one primitive library per component |
| Variants | **class-variance-authority** + **tailwind-merge** + **clsx** | Typed variant API; class conflict resolution | Apache-2.0 · MIT · MIT | Required |
| **Interaction** | | | | |
| Toasts | **Sonner** — sonner.emilkowalski.com | Accessible, queue/stack, promise toasts | MIT | Required |
| Command palette | **cmdk** — github.com/pacocoursey/cmdk | Composable, fast, keyboard-first | MIT | Required |
| Drawers | **vaul** — github.com/emilkowalski/vaul | Mobile bottom sheets | MIT | Required (mobile sheets) |
| Drag and drop | **dnd-kit** — dndkit.com | Accessible DnD with keyboard sensors | MIT | Approved (with Move up/down fallback) |
| Animation | **Motion** (formerly Framer Motion) — motion.dev | Layout/exit animations when CSS is insufficient | MIT | Approved; not on critical path |
| **Data** | | | | |
| Tables | **TanStack Table v9** — tanstack.com/table | Headless; sorting, filtering, selection, virtual | MIT | Required for data grids |
| Server state | **TanStack Query v5** — tanstack.com/query | Caching, optimistic updates, retries | MIT | Required |
| Virtualization | **TanStack Virtual** — tanstack.com/virtual | Large lists | MIT | Approved |
| Charts | **Apache ECharts** — echarts.apache.org (scale) · **Recharts** — recharts.org / **visx** — airbnb.io/visx (simple) · **Nivo** — nivo.rocks | Scale vs simplicity trade-off | Apache-2.0 · MIT · MIT · MIT | One per chart type per product |
| **Forms** | | | | |
| Forms | **React Hook Form** + **Zod** (ui.shadcn.com/docs/forms/react-hook-form) — or **TanStack Form** — tanstack.com/form | Performance, schema validation | MIT · MIT · MIT | **RHF + Zod is the default.** TanStack Form not used here; one per product |
| **Icons** | | | | |
| Primary | **Lucide** — lucide.dev | Consistent stroke set | ISC | Required |
| Alternate | **Phosphor** — phosphoricons.com | Weight variants | MIT | Approved per product (replaces Lucide there) |
| Alternates | **Heroicons** — heroicons.com · **Tabler** — tabler.io/icons | Gap fillers | MIT · MIT | As custom SVG only |
| **Fonts** | | | | |
| Sans | **Inter** — rsms.me/inter | Product UI face, tabular numbers | SIL OFL 1.1 | Required |
| Alternate | **Geist** (+ Geist Mono) — vercel.com/font | Alternate face / mono | SIL OFL 1.1 | Approved (mono required) |
| **Tokens** | | | | |
| Pipeline | **Style Dictionary** — styledictionary.com | DTCG tokens → CSS/TS/Tailwind | Apache-2.0 | Required |
| **Workflow** | | | | |
| Docs / visual contract | **Storybook** (10.3) — storybook.js.org | Stories per state; interaction + a11y addon | MIT | Required |
| A11y automation | **axe-core** via **@axe-core/playwright** — playwright.dev/docs/accessibility-testing | CI gate | MPL-2.0 · MIT/Apache | Required |
| E2E | **Playwright** — playwright.dev | Cross-browser E2E, visual comparisons | Apache-2.0 | Required |

## 2. Selection rules
1. Behavior comes from Radix (default); Base UI or React Aria only where Radix lacks the primitive (e.g. date picker, combobox → React Aria).
2. Never mix two primitive libraries inside one component.
3. Styling is Tailwind + tokens only. No CSS-in-JS runtime, no Bootstrap/MUI/Ant/Chakra in product code.
4. Fonts and icons: one family each per product.
5. One library per job (see "one-in-one-out").

## 3. "Do not add a new dependency without…" rule
A PR adding a dependency must answer, in the description:
| # | Question | Pass criteria |
|---|---|---|
| 1 | **Bundle cost** | Size from bundlephobia/`size-limit` on a tree-shaken import; ≤ 10 kB gzip, or a lazy boundary and a justification |
| 2 | **License** | MIT, ISC, Apache-2.0, BSD, OFL; **no GPL/AGPL/SSPL/commercial** without legal sign-off |
| 3 | **A11y record** | Documented keyboard + SR support, or passed our axe + manual checks in a Storybook story |
| 4 | **Maintenance** | Release in the last 6 months, ≥ 2 maintainers or org-backed, open-issue triage visible, TypeScript types shipped |
| 5 | **One-in-one-out** | If it overlaps an existing library's job, the old one is removed in the same PR or a removal ticket is scheduled with an owner and date ≤ 1 quarter |
| 6 | **Alternatives rejected** | Name two considered, with reason |
| 7 | **Security** | `npm audit` clean, no install scripts, pinned version, Socket/Snyk report attached |
Design systems lead + engineering lead both approve; the catalog is updated in the same PR.

## 4. Version policy
Pin exact versions; Renovate weekly. Tailwind v4, TanStack Table v9, Query v5, Storybook 10.x per catalog; MAJOR upgrades via a tracked migration ticket.

## 5. Not in the catalog
Material UI, Ant Design, Chakra, Mantine, Bootstrap, Semantic UI, styled-components/Emotion, FontAwesome, Moment.js (use `Intl`/date-fns), Lodash whole-package (use per-function), jQuery. Request via §3.

## 6. Library selector by use case

Find the job, use the library, respect the "avoid" column. The same table is searchable in the showcase (**Libraries** page).

| Need | Use | Avoid |
|---|---|---|
| Styling and tokens | Tailwind CSS v4 + Style Dictionary | CSS-in-JS runtimes, Bootstrap, MUI |
| Component source | shadcn/ui via the internal registry | forking installed files |
| Behavior and a11y primitives | Radix Primitives; React Aria for date and combobox gaps | hand-built menus, dialogs, tabs |
| Variants and class merge | class-variance-authority, tailwind-merge, clsx | string concatenation of classes |
| Fonts | Fontsource: Inter variable, Poppins (marketing), Geist Mono | Google Fonts at runtime, > 2 families per route |
| Icons | Lucide | emoji, multicolor sets, a second family |
| Data tables | TanStack Table v9 (+ TanStack Virtual past 200 rows) | custom table state machines |
| Server state and optimistic UI | TanStack Query v5 | fetch-in-effect |
| Charts, simple | Recharts or visx | 3D, gradient fills |
| Charts, large or dense | Apache ECharts, modular imports, lazy | on the critical path |
| Forms and validation | React Hook Form + Zod | two form libraries in one product |
| Dates and time zones | Intl API + date-fns; react-day-picker for calendars | Moment.js |
| Phone and address | libphonenumber-js | regex validation |
| File upload | react-dropzone; tus for resumable uploads | drag-only inputs |
| Rich text | Tiptap, lazy | on first paint |
| Toasts | Sonner | custom toast stacks |
| Command palette | cmdk | custom search overlays |
| Mobile sheets | vaul | full-screen modals on phones |
| Drag and drop | dnd-kit (always with Move up/down buttons) | drag-only interaction |
| Animation | CSS recipes; Motion for layout/exit | Lottie, GSAP scroll, parallax |
| URL state | nuqs | filters in component state only |
| Docs and MDX | Fumadocs or Nextra + Shiki | unsearchable static pages |
| Internationalization | next-intl (ICU) | string concatenation |
| Markdown rendering | react-markdown + rehype-sanitize | `dangerouslySetInnerHTML` |
| Auth | Auth.js, WorkOS or Clerk | custom session handling |
| Payments UI | Stripe Elements (hosted fields) | custom card inputs |
| Error tracking, RUM | Sentry + web-vitals | console logging |
| Component docs | Storybook 10 | screenshots in wikis |
| E2E and a11y gate | Playwright + @axe-core/playwright | manual-only accessibility checks |
| Unit tests and mocks | Vitest, Testing Library, MSW | testing implementation details |
