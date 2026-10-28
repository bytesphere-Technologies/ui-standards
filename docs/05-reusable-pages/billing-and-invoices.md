# Billing and invoices

**Purpose:** let owners see plan, usage, payment method, and invoices, and fix payment problems. **Reuse when:** any paid product. Rules: `04-patterns/billing-invoices-and-plans.md`.

## Wireframe
```
Billing
[! Payment failed. Update your card by 14 Mar to avoid interruption. [Update card]]   ← only when relevant
┌ Current plan ─────────────────────────────────────────────────────────┐
│ Team · $24 / seat / month, billed annually       ● Active              │
│ 18 seats · Renews 1 Apr 2026 · $432.00                                  │
│                                    [Change plan]   Cancel plan          │
└─────────────────────────────────────────────────────────────────────────┘
┌ Usage ────────────────────────────────────────────────────────────────┐
│ Seats            18 of 25    ▓▓▓▓▓▓▓░░░                                  │
│ API calls   92,400 of 100,000 ▓▓▓▓▓▓▓▓▓░  Approaching limit · Upgrade     │
│ Storage        41 of 100 GB   ▓▓▓▓░░░░░░           Resets 1 Apr           │
└─────────────────────────────────────────────────────────────────────────┘
┌ Payment method ───────────────────────┐ ┌ Billing details ──────────────┐
│ Visa •••• 4242  exp 08/27   [Update]  │ │ billing@acme.com · VAT DE…     │
└───────────────────────────────────────┘ └───────────────────────────────┘
Invoices
 Invoice   Date         Description               Amount (USD)  Status    
 INV-1042  1 Mar 2026   Team · 18 seats · Mar     432.00        ● Paid     ⬇
 INV-1041  1 Feb 2026   …                         414.00        ● Paid     ⬇
                                              View all invoices
```

## Required regions
Dunning banner (conditional) · current plan card · usage meters · payment method · billing details (email, address, tax ID) · invoice table (last 12) · upgrade callout (conditional).

## Components
`Banner`, `Card`, `StatusPill`, `Meter` (role="meter"), `Button`, `Dialog` (payment update with hosted fields), `Table`, icon buttons with names ("Download invoice INV-1042"), `AlertDialog` (cancel/downgrade).

## States
loading (card skeletons) · free plan (upgrade card, no payment method) · trial ("14 days left · Add payment method") · past due (danger banner + pill) · read-only grace (read-only banner) · usage ≥ 80% / ≥ 100% · no invoices (explain first-invoice date) · non-owner (read-only view, "Ask an owner"; owner names listed) · payment update loading/error (processor message verbatim) · plan change pending (effective date).

## Responsive
< 768: cards stack; invoice table → cards (number + status + amount + download); meters full width; actions full-width buttons. ≥ 768: two-column row for payment/billing details; table full width (max 1280).

## Copy rules
Amounts with currency, dates `1 Mar 2026`, plain consequence statements, buttons name the amount when money moves ("Upgrade to Team — $432 today"). No upsell modals. Cancel plan link on this page, not hidden.

## Implementation (shadcn/ui)
`Card`, `Progress` (role switched to `meter` wrapper), `Table`, `Dialog`; payment fields via Stripe Elements/Payment Element (stripe.com/docs/payments/elements) or provider equivalent in a hosted iframe; invoices PDF from provider; permissions check server-side (`billing:read`, `billing:write`).
