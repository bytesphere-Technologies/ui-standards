# Pricing page (blueprint)

**Purpose:** let a buyer choose a plan with full price clarity. **Reuse when:** public pricing or in-app "Compare plans". Rules and dark-pattern bans: `04-patterns/pricing-page.md`.

## Wireframe
```
[ topbar: logo · Product · Pricing · Docs ................. Sign in  [Start free trial] ]

            Pricing that scales with your team                   ← h1 (clamp 32–40), left or centered ≤ 6 words
            Pay per seat. Change or cancel any time.             ← body-lg

                 Billing period   ( Monthly | •Annual  Save 20% )

┌ Free ─────────┐ ┌ Team ◆ Most popular ─┐ ┌ Business ──────┐ ┌ Enterprise ────┐
│ $0            │ │ $24 / seat / month    │ │ $48 / seat / mo │ │ Custom          │
│ For individuals│ │ billed annually $288  │ │ billed annually │ │ SSO, SLA, DPA   │
│ [Start free]  │ │ [Start free trial]    │ │ [Choose Business]│ │ [Contact sales] │
│ ✓ 3 projects  │ │ ✓ Unlimited projects  │ │ ✓ Everything in │ │ ✓ Everything in │
│ ✓ 1 GB        │ │ ✓ 100 GB              │ │   Team + …      │ │   Business + …  │
└───────────────┘ └───────────────────────┘ └─────────────────┘ └─────────────────┘
        ▼ Compare all features  (sticky header: plan names + CTAs)
 Feature                         Free   Team    Business  Enterprise
 ── Projects ───────────────────────────────────────────────────────
 Projects                        3      ✓ Unlimited  ✓      ✓
 Storage                         1 GB   100 GB   1 TB      Custom
 ── Security ───────────────────────────────────────────────────────
 SSO (SAML)                      —      —        ✓         ✓
 Audit log retention             —      30 days  1 year    Custom
 ── Support ────────────────────────────────────────────────────────
 Response time                   Community  2 business days  8 h  1 h SLA
┌ Need volume pricing, security review, or a custom contract? ─────────────┐
│ Talk to sales — we reply within 1 business day.            [Contact sales]│
└───────────────────────────────────────────────────────────────────────────┘
 Trust: SOC 2 Type II (report on request) · 99.95% uptime SLA (status page) · Data policy (EU/US regions, DPA)
 FAQ (accordion, 6–8)       Footer
```

## Required regions
Heading + one sentence · billing toggle · ≤ 4 plan cards · comparison table with grouped rows · enterprise row · trust row · FAQ · footer. Taxes/currency statement under the table.

## Components
`SegmentedControl` (billing), `PlanCard` (`Card` + `StatusPill` + `Button`), `ComparisonTable` (real `<table>`, sticky header), `Accordion`, `Banner`/callout (enterprise), icons `check`, `minus`.

## States
toggle changes prices in place (no shift) · selected-currency · plan CTA loading → checkout · logged-in current plan shows "Current plan" disabled-with-reason and others "Upgrade/Downgrade" · plan unavailable for region (reason) · loading prices (skeleton numbers) · price fetch error (static fallback + "Prices may vary" link) · coupon applied line item.

## Responsive
≥ 1024 four columns; 768–1023 two columns of plan cards, table keeps horizontal scroll with sticky first column; < 768 plans as tabs (one plan at a time) with comparison rows below and a sticky bottom CTA; toggle full-width.

## Copy rules
No superlatives, no "Supercharge", no "Unlimited" without a fair-use link, every plan has audience sentence ≤ 8 words, prices include period and unit, CTAs verb + object. "Most popular" is a pill, not a banner ribbon. No countdowns, no crossed-out prices.

## Implementation (shadcn/ui)
shadcn `Card`, `Tabs` (mobile), `ToggleGroup` (billing), `Accordion`, `Table`; no pricing block ships in shadcn — build from registry `PlanCard`. Prices from billing provider API (Stripe Prices) server-rendered; annual math computed server-side. Analytics: `pricing.toggle_changed`, `pricing.plan_cta_clicked`.
