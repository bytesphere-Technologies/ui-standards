# AGENTS.md — rules for AI coding agents

You build UI for a software company's product. Follow this file exactly. It is the executable distillation of `/ui-standards`.

## 0a. Reuse before you build (prompt template: 09-agent-rules/vibe-coding-guide.md)
Open `packages/ui/catalog/AI-INDEX.md` and `packages/ui/catalog/COMPONENTS.md` (or `09-agent-rules/COMPONENT-INDEX.md`). Import from `@bytesphere/ui`. If a component exists, use it; if a variant is missing, extend it there and add its entry to `packages/ui/catalog/catalog.data.ts`, then run `npm run catalog`. Use `<Logo>` for the company name. Never hardcode dark mode, corner radius or navigation style; they are user choices via `useAppearance()`.

## 0. Before you write any UI
1. Read `/ui-standards/README.md`.
2. Read every file in `/ui-standards/01-foundations/`.
3. Read the spec in `03-components/` for each component you touch and the blueprint in `05-reusable-pages/` for the page type.
4. Read `07-antipatterns/ai-slop-detector.md`.
If a rule below conflicts with a user request, follow the rule and say so in one line; do not silently deviate.

## 1. Tokens only
1. Never write hex, `rgb()`, arbitrary px (`p-[13px]`), arbitrary z-index, or raw shadows. Use semantic classes: `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`, `text-primary|secondary|tertiary`, `border-subtle|control|strong`, `bg-action-primary`, `ring-focus`, `rounded-tag|control|card|modal`, `shadow-raised|dropdown|modal`.
2. Never use the default Tailwind palette (`bg-blue-500`, `text-gray-600`). Never reference primitive ramps.
3. Spacing only from: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px. Parent `gap-*` owns spacing.
4. z-index only: base 0, sticky 10, dropdown 20, overlay 30, modal 40, toast 50, tooltip 60.
5. Colors for status: `status-{success|warning|danger|info|neutral}-{bg|border|fg|dot|solid}`; banners `…-banner-{bg|border|fg}`.

## 2. Which library for what
Components, tokens and styles come from `@bytesphere/ui`; the rows below are the approved choices only for needs the package does not cover yet. The package itself currently needs only React, Tailwind v4 and `lucide-react`.

| Need | Use |
|---|---|
| Components | `@bytesphere/ui` (this repo, `packages/ui`). Do not fork, do not rewrite. |
| Behavior/a11y | Radix Primitives (default); React Aria for date picker/combobox gaps |
| Variants | `cva` + `cn` (clsx + tailwind-merge) |
| Icons | `lucide-react`, 16/20/24, `strokeWidth` 1.75 (1.5 at 24); no other set, no emoji |
| Toasts | `sonner` |
| Command palette | `cmdk` |
| Mobile drawers | `vaul` |
| Tables | TanStack Table v9 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts (simple) / Apache ECharts (scale), lazy-loaded, colors `--color-data-1…6` |
| Animation | CSS first; Motion only if CSS can't; ≤ 200ms for UI, ≤ 400ms max |
| Font | Inter (UI), Poppins 600/700 (marketing display only), Geist Mono (code); self-host via Fontsource |
Do not add a dependency. If one is truly needed, stop and list the 7-question justification from `06-engineering/stack-and-library-catalog.md`.

## 3. Hard bans (anti-slop)
No: gradients (except marketing hero ≤ 1 and chart area fade), gradient text, glassmorphism/backdrop-blur, glow/orbs/blobs, `rounded-2xl`/`rounded-full` on buttons/cards/pills, shadows on flat cards, emoji or ✨ anywhere in UI/copy, icon-in-circle above headings, three-card icon grids, centered paragraphs, pill-shaped everything, animated counters, logo marquees, scroll-triggered fade-ins, confetti, bounce easing, dotted-grid/noise backgrounds, neon dark mode, invented metrics/logos/testimonials, "Alex/Sarah/James" sample users, copy with "Supercharge/Seamlessly/Effortlessly/Unlock/Elevate/Empower", Title Case UI, 72px hero text.
Sample data must be varied, realistic, and specific. Never lorem ipsum.

## 4. The four-states rule
Every component or page that renders async data MUST implement and wire **loading, empty, error, partial/stale**:
- loading → skeleton matching final geometry, shown after 150ms (`DelayedFallback`), never a spinner for shaped content
- empty → `StatePanel`: what this is + one primary action; distinguish first-run vs no-results
- error → what failed + `Retry` + support/reference id; preserve input
- partial/stale → render what works; "Updated {time} · Refresh"
No code is complete without all four.

## 5. Page and component rules
- One `<h1>`; page header: title 24px, description, **one** primary button top-right.
- Layout archetypes A/B/C only (`04-patterns/page-anatomy-and-layout.md`). Max width 1280 (1440 data). Section gap 24/40; card padding 20; field gap 16.
- Buttons: sizes 32/36/40, verb-first sentence-case labels, loading keeps label. Inputs: visible label above, never placeholder-as-label.
- Tables: dividers not zebra, numbers right + `tabular-nums`, skeleton rows, sticky header, URL-synced filters/sort/page.
- Active nav = tinted bg + semibold (never also a bar). Max ~7 primary nav items, depth ≤ 3.
- Status = pill (4px radius, tint, dot, word). Max 2 pill colors per row.
- Destructive = confirm with consequence, or undo toast. Typed confirmation only for irreversible mass actions.
- Toasts: Sonner, bottom-right, ≤ 3, errors persist with Retry, never for validation.
- Modals ≤ 3 fields; otherwise page or sheet. Mobile → bottom sheet.
- Strings go through i18n; logical properties only (`ms-*`, `ps-*`, `start-*`, `text-start`); `Intl` for numbers/dates.

## 6. Accessibility gate (WCAG 2.2 AA)
Before you finish, verify and state that:
1. Every interactive element is keyboard-operable with a visible 2px focus ring (`focus-visible:ring-2 ring-focus ring-offset-2`); never `outline-none` without it.
2. Every control has an accessible name; icon-only buttons have `aria-label` + tooltip.
3. Labels visible; errors linked with `aria-describedby`, `aria-invalid`; status never color-only.
4. Targets ≥ 24px (44px on touch).
5. Contrast: use only token pairs; text ≥ 4.5:1, UI ≥ 3:1.
6. Modals trap focus and return it; Esc closes.
7. Respect `prefers-reduced-motion`; no autoplay; zoom 200% and 320px reflow OK.
8. Headings sequential; landmarks present; live regions for toasts.
9. Add stories per state and run axe; zero violations.

## 7. Output format when you build
1. List files you created/changed.
2. State which registry components you used and which tokens.
3. Run `08-checklists/page-qa-checklist.md` and report pass/fail per section; list any deviations and why.
4. Never claim a checklist item you did not verify.

## 8. When unsure
Pick the documented default; do not invent a new pattern. If no default exists, choose the closest existing component, note the gap in one line, and continue.
