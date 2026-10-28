# Billing, invoices, and plans

Blueprint: `05-reusable-pages/billing-and-invoices.md`.

## 1. Page structure (Focus archetype, 720px; invoice table 1280)
1. **Current plan card**: plan name, price + period, next renewal date, seats, "Change plan" (secondary) and "Cancel plan" (ghost text link, same page).
2. **Usage vs limit meters**: one row per metered resource.
3. **Upgrade path**: shown only where relevant (a meter ≥ 80%, or a locked feature).
4. **Payment method** card: brand + last 4 + expiry, "Update" button, billing email, billing address, tax ID.
5. **Invoice table** (last 12, "View all").
6. **Dunning / failure state**: banner + card state when a payment fails.

## 2. Usage meter
| Part | Spec |
|---|---|
| Label + value | "Seats · 18 of 25 used", `tabular-nums` |
| Bar | 8px track `surface-sunken`, fill `action-primary-rest`; 80–99% fill `status-warning-solid`; ≥ 100% `status-danger-solid`; each threshold also changes text ("Approaching limit", "Over limit") — never color alone |
| Reset info | "Resets 1 Apr" |
| Action | "Upgrade" link when ≥ 80%; "Add seats" when purchasable |
`role="meter"` with `aria-valuenow/max/valuetext="18 of 25 seats"`.

## 3. Upgrade paths
1. Inline, factual, one sentence: "You've used 92% of API calls. Team includes 5× more. Compare plans".
2. Locked features show the feature name, the plan that includes it, and one button "See plans". No blur-teasers, no modal on load.
3. Plan change dialog shows: new price, prorated amount today, next invoice date, features gained/lost; confirm button "Upgrade to Team — $432 today".
4. Downgrade: lists what will be lost and when it takes effect (end of period); confirm "Downgrade at end of period".
5. Cancel: reasons survey optional, one step, confirm button "Cancel plan", end-of-term access stated; reactivate link persists.

## 4. Invoice table
| Column | Align | Notes |
|---|---|---|
| Invoice # | left | link to detail |
| Date | left | `12 Mar 2026` |
| Description | left | "Team plan · 25 seats · Mar 2026" |
| Amount | right | `tabular-nums`, currency code in header |
| Status | left | pill: Paid (success), Open (info), Past due (danger), Refunded (neutral) |
| Actions | right | "Download PDF" icon button (named), "Pay now" if open |
Empty: "No invoices yet. Your first invoice is generated on 1 Apr." Sort by date desc; no pagination under 25 rows.

## 5. Payment method
Never display full card numbers. Update opens a modal with the processor's hosted fields (Stripe Elements or equivalent) — card fields are provider-hosted iframes. Show accepted brands. Billing country → tax ID field validated by format. Success toast "Payment method updated".

## 6. Dunning / billing-failure states
| Stage | UI |
|---|---|
| Day 0 failed charge | warning banner (dismissible once per day): "We couldn't charge your card ending 4242. Update your payment method by 14 Mar to avoid interruption. [Update card]" |
| Retry window (days 1–7) | persistent danger banner, plan card shows "Payment failed" pill (danger), invoice row "Past due" with "Pay now" |
| Grace end | read-only mode banner: "Your workspace is read-only until payment is received." Data is never deleted; export remains available |
| Recovered | success toast + banner removed |
Rules: state the date and consequence; one action; email and in-app messages match; admins see the banner, non-admins see "Ask an owner to update billing." with owner names.

## 7. Rules
1. Prices include currency; taxes shown as a line item; dates in user locale.
2. All billing actions available to owners/admins only; others see read-only with reason.
3. Every destructive or money-moving action confirms with the amount in the button.
4. Receipts/PDFs available for 7 years; link always present.
5. No dark patterns (see `pricing-page.md` §4).
