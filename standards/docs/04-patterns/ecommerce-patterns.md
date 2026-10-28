# E-commerce patterns

Live: showcase → Commerce (storefront, product, cart, checkout, orders). Code: `packages/ui/src/components/ (see product-card, cart-line, order-summary)`, `pages/Store.tsx`. Shell: `EcomHeader` + `SiteFooter variant="newsletter"`.

## 1. Pages and their regions
| Page | Regions in order |
|---|---|
| Storefront / category | promo banner (max 1) · trust strip (shipping, returns, warranty) · filters left (240px) + results · sort + layout toggle · grid or list · pagination or "Load more" |
| Product | breadcrumb · gallery (main + 4 thumbs) · title, rating, stock pill · price · options (color, size) · quantity + **Add to cart** + save · delivery and returns lines · tabs (description, specs, reviews) · related |
| Cart | lines · free-shipping nudge · order summary (sticky) |
| Checkout | stepper (Contact and delivery · Payment · Review) · form card · summary |
| Orders | list left · selected order: timeline + items + invoice |

## 2. Product card styles
| Variant | Use |
|---|---|
| `grid` | default catalog: 4:3 art, brand, name, rating, swatches, price, quick add |
| `list` | comparison and search results; adds blurb |
| `compact` | recommendations, cart upsells: 56px art, name, price |
| `featured` | one hero product: 2 columns, large title, blurb |
| `minimal` | editorial rows: portrait art, name and price only; wishlist on hover and focus |
Without photos use `ProductArt` (SVG: bottle, headphones, chair, lamp, bag, watch × tint, navy, azure, sunken). With photos keep the ratio (4:3 grid, 4:5 minimal, 1:1 gallery), explicit width/height, AVIF/WebP, alt text.

## 3. Rules
1. **Price**: currency symbol, tabular, sale price first, struck-through original with screen-reader text "Was", discount % in danger-fg, never a fake "original" price (≥ 28 days).
2. **Add to cart** gives a toast with "View cart" and updates the header count; it never opens a modal. Errors say what to do ("Only 4 left. Reduce quantity").
3. **Stock**: show "Low stock" only below 5 and only when true.
4. **Ratings**: stars + number + count; the number is text, not just stars.
5. **Filters**: checkbox groups with counts, price slider with value, active filters as tags, clear all; URL-synced; results announce count politely.
6. **Cart**: quantity stepper 1–99, Remove as text button, subtotal live, shipping threshold message, no pre-selected add-ons, promo code optional and collapsed.
7. **Checkout**: guest checkout allowed; card fields are provider-hosted (Stripe Elements), never our inputs; `autocomplete` on every field; total shown on the pay button ("Pay $112.00"); no countdown timers, no pre-checked marketing opt-in.
8. **Order tracking**: vertical timeline with done, current, upcoming; carrier and tracking number as text; "Start a return" within reach.
9. **Wishlist** is a toggle with `aria-pressed`.
10. **Empty states**: empty cart and no results each offer one action.
11. **Speed**: product images lazy except the first row; skeleton `product` shape while filtering; optimistic add to cart with rollback.

## 4. Analytics events (no PII)
`product.viewed`, `cart.item_added`, `cart.item_removed`, `checkout.step_completed`, `checkout.payment_failed`, `order.placed`, `filter.applied`.
