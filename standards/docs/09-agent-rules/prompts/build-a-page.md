# Prompt: build a page that complies by default

Copy everything in the fenced block, fill the four inputs, and send to the coding agent. The agent builds the page and self-checks against `08-checklists/page-qa-checklist.md`.

```text
You are building one page for our product. Follow /ui-standards exactly.

INPUTS
- Page purpose: {{PAGE_PURPOSE}}            e.g. "Let admins review, filter, and archive customer accounts"
- Product type: {{PRODUCT_TYPE}}            one of: admin-saas | analytics | dev-docs | multi-product | marketing | workflow-inbox | settings | mobile
- Data surfaces: {{DATA_SURFACES}}          e.g. "accounts table (name, plan, status, owner, MRR), revenue chart, activity feed"
- Actions: {{ACTIONS}}                      e.g. "create account (primary), import CSV, archive (bulk), export"

STEP 1 — READ (do not skip)
Read /ui-standards/README.md and every file in /ui-standards/01-foundations/.
Read /ui-standards/09-agent-rules/AGENTS.md.
Pick the matching shell from /ui-standards/04-patterns/navigation-per-product-type.md.
Pick the closest blueprint in /ui-standards/05-reusable-pages/ and the layout archetype (A index / B detail / C focus) from 04-patterns/page-anatomy-and-layout.md.
Read the spec file in /ui-standards/03-components/ for each component you will use.
Read /ui-standards/07-antipatterns/ai-slop-detector.md.

STEP 2 — PLAN (output before coding)
Write a short plan: shell, archetype, page header (title, description, the ONE primary action), regions in order, components per region (registry names), data states per surface, URL state (filters/sort/page/tab), keyboard path, responsive behavior at 320/768/1440.

STEP 3 — BUILD
- Next.js/React + Tailwind v4 + shadcn/ui registry components. Tokens only; no raw values; no new dependencies.
- For EACH data surface implement all four states: loading (shaped skeleton, delayed 150ms), empty (first-run vs no-results, one action), error (what failed + Retry + reference id, input preserved), partial/stale (widget-level; "Updated {time} · Refresh").
- Exactly one primary button. Destructive actions confirm with consequence or offer undo.
- Forms: React Hook Form + Zod, validate on blur, visible labels, error summary if > 6 fields.
- Tables: TanStack Table v9, dividers, right-aligned tabular numbers, sticky header, responsive card collapse < 768px.
- Realistic, varied sample data (no lorem ipsum, no Alex/Sarah/James, no invented marketing metrics).
- All strings through i18n keys; logical CSS properties; Intl formatting.
- Add Storybook stories for each state (light/dark, comfortable/compact) and an axe-checked Playwright test.

STEP 4 — SELF-CHECK
Open /ui-standards/08-checklists/page-qa-checklist.md. For every section, report PASS / FAIL / N-A with a one-line reason and evidence (file:line or test name). Fix every FAIL, then re-run. Do not mark an item PASS without verifying it. Also report:
- anti-slop positive test: "Does this look like it was designed by someone who had to answer to a design review?" with 3 pieces of evidence;
- a list of any deviations from the standard and why;
- the analytics events you added (object.action, no PII).

OUTPUT
1. Plan  2. Files created/changed  3. Checklist report  4. Deviations/open questions
```

## Filled example

- Page purpose: "Let finance owners review overdue invoices, filter by customer and age, and send reminders in bulk."
- Product type: admin-saas
- Data surfaces: "invoices table (number, customer, due date, amount USD, status), aging chart (0–30, 31–60, 61–90, 90+), recent reminders feed"
- Actions: "send reminder (bulk, primary), export CSV, mark as paid (row)"

Expected agent output: archetype A (Index) in the admin shell; header "Overdue invoices" with one primary "Send reminders"; toolbar with search, customer and age filters, URL-synced; aging chart in a widget card with its own four states; invoice table compact density toggle; bulk bar when rows selected; reminder confirm dialog naming the count; empty state "No overdue invoices. Invoices appear here after their due date." with link to all invoices; tests: axe, keyboard, 320/768/1440 screenshots.
