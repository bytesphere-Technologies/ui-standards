# 403, 404, 500, and maintenance pages

**Purpose:** give users a way out when the app cannot show what they asked for. **Reuse when:** global error boundaries and route-level `not-found`, `forbidden`, `error`, and maintenance mode. Same `StatePanel` anatomy as `03-components/empty-loading-error-and-partial-states.md`, at page scale.

## Wireframe (shared)
```
[topbar and sidebar remain when the user is signed in]
                         404
                 We can't find that page.                     ← h2 24px (code in overline above)
     The link may be broken, or the page was moved or deleted.
          [Go to dashboard]   Search…  ·  Contact support
                 Reference: 8f21-c9a3 (if applicable)
```
Centered column ≤ 480px, vertical padding 96px, no illustration (or one 160×120 line illustration in the single brief style), no jokes.

## Variants
| Page | Code | Headline | Body | Primary | Secondary |
|---|---|---|---|---|---|
| Not found | 404 | "We can't find that page." | "The link may be broken, or the page was moved or deleted." | "Go to dashboard" | Search field (⌘K), "Contact support" |
| Forbidden | 403 | "You don't have access to {resource}." | "Ask {owner names} to give you access." | "Request access" | "Go to dashboard", "Switch account" |
| Server error | 500 | "Something broke on our side." | "We've been notified. Try again in a moment. If it keeps happening, contact support and include this reference." | "Try again" | "Go to dashboard", "Status page" |
| Unauthenticated | 401 | "Sign in to continue." | "Your session expired." | "Sign in" (preserves return URL) | — |
| Maintenance (planned) | 503 | "Down for scheduled maintenance." | "We're back by 14:00 UTC (about 25 min). Your data is safe." | "Status page" | "Subscribe to updates" |
| Rate limited | 429 | "Too many requests." | "Try again in 30 seconds." live countdown text | "Try again" (disabled until timer ends, reason shown) | — |
| Offline | — | "You're offline." | "Changes will sync when you reconnect." | "Retry" | — |

## Required regions
Code (overline) · headline · explanation (≤ 2 lines) · one primary action · secondary routes · reference id (500/403/429 when available, `font-mono`, copy button) · support path.

## States
Static pages with: retry loading state on "Try again"; maintenance page served statically from CDN (no JS dependency, inline CSS ≤ 4 kB, passes AA) with `Retry-After` header and `<meta name="robots" content="noindex">`; error boundary preserves shell; 404 keeps URL, logs the referrer; 403 distinguishes "exists but forbidden" from "doesn't exist" only when safe (don't leak existence of private resources: show 404 to anonymous users).

## Responsive
Single column at all sizes; padding 16px at 320; buttons stack full-width < 480px.

## Copy rules
Say what happened and what to do, in the product's voice: plain, no blame, no humor, no "Oops". Never expose stack traces; show reference ids only. Match HTTP status codes in the response.

## Implementation (shadcn/ui)
Next.js: `not-found.tsx`, `error.tsx` (client boundary with `reset()`), `global-error.tsx`, `forbidden.tsx` (`forbidden()` API) or route-level 403 component; maintenance via edge middleware returning a static HTML with 503. Build on registry `StatePanel` with `Button`. Log errors with a correlation id surfaced as the reference.
