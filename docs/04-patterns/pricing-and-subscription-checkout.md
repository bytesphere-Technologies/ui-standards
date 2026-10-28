# Pricing, subscription checkout and billing

Ten pages cover the paid lifecycle. Showcase group "Pricing and billing". Existing pages they link to: `pricing` (marketing plans), `contact-sales`, `settings/billing` (overview).

| Page | Route | Layout | Purpose |
|---|---|---|---|
| Pricing calculator | `pricing/calculator` | site | Seats, API calls, storage sliders with live estimate and recommended plan |
| Compare plans | `pricing/compare` | site | Full feature matrix; sticky header; "only show differences" |
| Start free trial | `pricing/trial` | bare | Four fields, no card |
| Subscription checkout | `checkout/plan` | full | Plan, details, payment; sticky order summary; success screen |
| Change plan | `billing/change-plan` | app | Gain/lose lists, proration, "today" vs "at renewal" |
| Cancel plan | `billing/cancel` | app | Alternatives, optional reasons, plain confirmation |
| Payment methods | `billing/payment-methods` | app | Cards, bank debit, address, tax IDs, invoice recipients |
| Invoice detail | `billing/invoice` | app | Printable document; Paid, Open, Overdue, Refunded |
| Usage and limits | `billing/usage` | app | Meter, forecast, alerts, top consumers |
| Payment failed | `billing/payment-failed` | app | Update card, retry, dunning timeline |

## Rules

1. **Price is always per unit and period.** "$19 per seat per month, billed yearly". Totals are USD, tabular figures, two decimals.
2. **Show "due today" and "then".** A trial shows $0.00 due today and the first charge date and amount. Never hide the renewal amount.
3. **Tax is a line, not a surprise.** Country selects the rate; a valid VAT ID removes VAT for EU businesses. Label the rate.
4. **Checkout is a bare page.** Logo, "Secure checkout", no site navigation, no upsell banners. Three steps maximum. Summary stays visible (sticky on desktop, collapsible on mobile).
5. **Defaults favour the customer.** Add-ons unchecked. Annual may be the default period only if monthly is one click away.
6. **Never collect card data in our fields.** Card inputs are hosted fields from the payment provider; the page states this.
7. **Promo codes** are case-insensitive, give a specific error ("That code isn’t valid"), and show the discount as its own line.
8. **Plan changes explain consequences in two columns:** what you gain, what you lose, and a charge today vs at renewal. Downgrades default to renewal.
9. **Cancellation is as easy as signup.** Same number of clicks or fewer. Offer pause, downgrade and fewer seats once, as options, never as blockers. Reasons are optional. State access end date and data retention.
10. **Usage alerts** at 80% and 100%, to billing admins, before any overage charge. The meter turns warning at 90%.
11. **Dunning is honest.** State the failure reason, the retry schedule, the date access becomes read-only, and that data is never deleted for non-payment.
12. **Invoices** carry number, issue date, period, billed-to, tax ID, line items, subtotal, tax, total, and a way to ask questions. They print on white regardless of theme.

## Validation (checkout)

| Field | Rule | Error copy |
|---|---|---|
| Email | RFC-valid | "Enter an email like name@company.com" |
| Card | hosted field | provider message, shown inline |
| Terms | required, unchecked | "Accept the terms to start your trial." |
| Promo | optional | "That code isn’t valid" |

## Test checklist

- Every number in the order summary equals the sum of its lines at 1, 10 and 500 seats, monthly and annual.
- Changing country changes tax; VAT ID field is optional.
- Submit is disabled while processing and labelled with the action in progress.
- Cancel is reachable from Billing in two clicks.
- Invoice prints without the app shell.
