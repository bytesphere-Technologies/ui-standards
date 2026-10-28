# Pricing page (pattern)

Blueprint with wireframe: `05-reusable-pages/pricing-page.md`. This file defines the rules.

## 1. Mandatory anatomy
1. **Header**: h1 (≤ 8 words, states the value: "Pricing that scales with your team"), one sentence below (≤ 20 words).
2. **Billing toggle**: monthly / annual segmented control (2 items), default **annual**; annual shows the saving as text ("Save 20%", computed, not invented).
3. **Plan columns** (max **4**): name, one-line audience, price, billing period/unit, CTA, 3–5 headline features.
4. **Most-popular plan**: highlighted with a 1px `border-strong` + `selected-bar` 2px top edge and a "Most popular" status pill (info tone). No confetti, no scale-up, no glow, no gradient.
5. **Feature comparison table** below: rows grouped by category, aligned across plans.
6. **Per-plan CTA**: "Start free trial", "Choose Team", "Contact sales" (verb + object).
7. **Enterprise / contact-sales row**: separate full-width row below the table: what's included, response time ("We reply within 1 business day"), CTA.
8. **Trust signals** row: security (SOC 2 Type II / ISO 27001 — only if actually held), uptime SLA (state the number and where measured), data policy (region, retention, DPA link).
9. **FAQ**: 6–8 real questions in an accordion (billing, cancel, refunds, seats, data, taxes).
10. Footer links: terms, privacy, status.

## 2. Pricing-table rules
| Rule | Spec |
|---|---|
| Plans | ≤ 4 columns; 3 is ideal |
| Rows | same feature rows aligned across plans; one concept per row |
| Hierarchy | rows ordered by importance to the buyer; group headings (overline) |
| Cell values | check (`check` icon 16 + sr text "Included"), dash (`minus` + "Not included"), or concrete value ("10 GB", "5 seats"); never blank cells; never "Unlimited" without the fair-use link |
| No hidden asterisks | any qualifier appears in the cell ("100 / month, then $0.02 each") |
| Price | 32px 600 tabular, currency symbol and period always ("$29 per seat / month, billed annually"); taxes statement under table |
| Sticky header | plan names + CTAs stick under the topbar while scrolling the comparison |
| Mobile | plans become tabs or accordion per plan; comparison rows per selected plan; CTA sticky at bottom |

## 3. Annual toggle accessibility
`role="radiogroup"` (segmented) labeled "Billing period"; changing it updates prices in place with `aria-live="polite"` announcement "Annual billing selected. Team: $24 per seat per month, billed annually." Price changes without layout shift (reserved width, tabular nums). Keyboard ←/→. Not a switch (two named states).

## 4. No dark patterns (hard bans)
1. Fake countdown timers or "offer ends in…" without a real deadline.
2. Hidden fees revealed at checkout; price shown excluding mandatory fees.
3. Roach motel: cancel must be as easy as sign-up — a "Cancel plan" button in Billing, same session, no call-to-cancel.
4. Pre-checked add-ons or auto-upsells.
5. Crossed-out fake "original" prices (a crossed price is allowed only if the product was actually sold at that price for ≥ 28 days).
6. Confirmshaming ("No, I don't want to save money").
7. Forced account/credit card for a free plan that doesn't need it.
8. Default selection of the most expensive option except the highlighted plan; the highlighted plan is the one most customers choose, and the metric is documented.
9. Seat/usage price changes without notice and consent.
10. Annual plans pre-selected without showing the total billed amount.

## 5. Copy rules
Plain nouns: "Seats", "Projects", "Support". No "Supercharge", "Unlock", "Empower". Sentence case. Price in the user's currency (detect, allow change). Show the annual total on hover/in text ("$288 billed yearly").
