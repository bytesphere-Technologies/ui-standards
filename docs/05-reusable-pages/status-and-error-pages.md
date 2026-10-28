# Status and error pages

Every system page a product needs, defined once. 50 pages in 6 groups. Rendered by one component (`apps/showcase/src/pages/Status.tsx`) from one data file (`apps/showcase/src/data/status.ts`). Open them at `#/status` in the showcase.

## Rules

1. **One layout, many messages.** Header with the logo, status code in mono with a pill, one headline, one paragraph, one primary action, one optional secondary, an optional widget. Keep the illustration small and secondary to the text.
2. **Say what happened, then what to do.** Headline 3 to 7 words. Body 1 to 2 sentences, 40 words max. Never blame the user, never apologise twice, no jokes on 5xx or billing pages.
3. **Always one way out.** The primary button either fixes the problem (Sign in, Try again, Update payment) or leaves it (Go to overview).
4. **Show a reference** (request ID, `req_8f2a91`) on every 5xx and 4xx that support might need. It must be copyable.
5. **Retry only when it is safe.** 429 and 503 show a countdown from `Retry-After` and disable the primary button until it ends, with a visible reason.
6. **No redirects hide errors.** A missing page returns 404 with the status code, not a redirect to home. Private resources the user may not know about also return 404, not 403.
7. **Where they render.** In-shell (inside the app layout, nav still works): 403, 404 inside the app, empty-permission states. Full page (own layout, logo only): 401, 5xx, maintenance, session, billing blocks. Static edge page (no JS, no app assets, inline CSS, under 14 KB): 502, 503, 504, 522, because the app may be down.
8. **API responses use RFC 9457** (`application/problem+json`) with `type`, `title`, `status`, `detail`, `instance`. Browsers get HTML, API clients get JSON, chosen by `Accept`.
9. **Log level follows blame.** 4xx = info or warn (client). 5xx = error and page the on-call. 429 = warn and count. Always log the request ID shown to the user.
10. **Accessibility.** Page title is "{code} {name} · ByteSphere"; focus moves to the h1; countdowns announce at start and end only, never every second.

## Catalog

### Client errors (4xx)

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/400` | 400 | We couldn’t read that request | After the user acts | Syntax the server cannot parse: bad JSON, missing required header, invalid query string. Not for validation of correct syntax (use 422). | warn, with the rejected field names (never values) |
| `status/401` | 401 | Sign in to continue | After the user acts | No valid credentials. Send the user to sign-in with a return URL. Do not use for 'signed in but not allowed' (403). | info; count by route to spot expiring tokens |
| `status/402` | 402 | This needs a paid plan | After the user acts | Payment required: feature gated by plan or an unpaid balance. Return the plan that unlocks it in the body. | info; this is a conversion signal, track it |
| `status/403` | 403 | You don’t have access to this | No | Authenticated but not authorized. Show who can grant access. For private resources the caller must not know exist, return 404 instead. | warn for repeated attempts on the same resource |
| `status/404` | 404 | We can’t find that page | No | No resource at this URL. Also the answer for private resources hidden from the caller. Keep the URL; do not redirect to the home page. | info; log referrer, aggregate to find broken links |
| `status/405` | 405 | That action isn’t allowed here | No | Method not supported on this route (POST to a read-only URL). | warn; usually a client bug |
| `status/408` | 408 | That took too long | Yes | Server timed out waiting for the client to finish sending. Safe to retry idempotent requests. | info; spike means a network problem |
| `status/409` | 409 | Someone changed this first | After the user acts | Conflict with current state: edit collisions, duplicate unique value. Return the current version so the client can merge. | info |
| `status/410` | 410 | This was deleted | No | Resource existed and is permanently gone. Better than 404 for SEO and for link cleanup. | info |
| `status/413` | 413 | That file is too large | After the user acts | Body exceeds the limit. Check Content-Length early, state the limit, and stop reading the body. | info; log size and limit |
| `status/414` | 414 | That address is too long | No | URI exceeds the server limit (often huge filter state in the query string). Move state to the body or shorten ids. | warn; fix the producer |
| `status/415` | 415 | We can’t open that file type | After the user acts | Content-Type or file signature not supported. Verify by magic bytes, not by extension. | info |
| `status/422` | 422 | Some details need fixing | After the user acts | Syntax is valid, semantics are not: validation errors. Return field-level errors in the body; the UI shows them inline, this page is the fallback. | info; never log values |
| `status/423` | 423 | This is locked right now | After a delay | Resource locked by another session. Include who holds the lock and when it expires. | info |
| `status/428` | 428 | Reload before you save | After the user acts | Precondition required: the server demands If-Match to prevent lost updates. | info |
| `status/429` | 429 | Too many requests | After a delay | Rate limit exceeded. Always send Retry-After; the UI counts down and re-enables itself. | warn per client; alert on spikes |
| `status/451` | 451 | Not available in your region | No | Unavailable for legal reasons: sanctions, court orders, regional law. Name the reason class without legal detail. | info; retain per policy |

### Server errors (5xx)

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/500` | 500 | Something broke on our side | Yes | Unhandled exception. Never expose stack traces. Show a request id that maps to the full log. | error with stack, route, user hash, request id; page on-call above threshold |
| `status/501` | 501 | We don’t support that yet | No | Server does not implement the requested functionality. Not for temporary failure (503). | info |
| `status/502` | 502 | We hit a bad connection | Yes | Gateway received an invalid response from upstream. | error; correlate with upstream deploys |
| `status/503` | 503 | We’re temporarily unavailable | After a delay | Overload or maintenance. Serve a static page from the edge; include Retry-After. | error; page on-call |
| `status/504` | 504 | That took too long to answer | Yes | Gateway timeout waiting for upstream. | error; record upstream and duration |
| `status/507` | 507 | Storage is full | After the user acts | Insufficient storage to complete the request (quota or disk). | warn; notify owners at 80% and 95% |
| `status/511` | 511 | Sign in to the network | After the user acts | Network authentication required (captive portals). Generated by the intercepting proxy, not by us; show helpful copy if the client detects it. | none |
| `status/522` | 522 | We couldn’t reach our servers | Yes | CDN origin connection timed out (Cloudflare 520–524 family). Treat as origin down: fail over, then investigate. | error; page on-call |

### Access and sessions

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/session-expired` | — | Your session expired | After the user acts | Token expired or revoked. Preserve unsaved input locally and re-authenticate in place when possible. | info |
| `status/signed-out` | — | You’re signed out | After the user acts | Session ended remotely (sign out everywhere, admin revocation). | info |
| `status/account-suspended` | — | This account is suspended | No | Account or workspace blocked by policy or fraud review. Say who can fix it; avoid accusatory language. | warn with case id |
| `status/account-locked` | — | Too many sign-in attempts | After a delay | Brute-force protection. Show the unlock time; never reveal whether the email exists. | warn; alert on bursts per IP |
| `status/mfa-required` | — | Set up two-step verification | After the user acts | Policy requires MFA enrollment before access (403 with a specific problem type). | info |
| `status/sso-required` | — | Use single sign-on | After the user acts | Domain policy blocks password and social sign-in. Redirect to the IdP; do not show a password field. | info |
| `status/email-unverified` | — | Verify your email to continue | After the user acts | Feature requires a verified email. Offer resend with a visible cooldown. | info |
| `status/invite-expired` | — | This invitation expired | After the user acts | Invite token expired, used, or revoked. Say which when it is safe to. | info |
| `status/link-expired` | — | This link has expired | After the user acts | Single-use token expired or already consumed (410 or 400 with a typed problem). | info |

### Billing and plans

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/trial-ended` | — | Your trial has ended | After the user acts | Trial expired. Switch the workspace to read-only; never delete data on expiry. | info; funnel event |
| `status/plan-limit` | — | You’ve reached your plan limit | After the user acts | Quota reached (seats, projects, API calls). Return limit, usage, and the cheapest fix. | info; upsell signal |
| `status/payment-failed` | — | We couldn’t take your payment | After the user acts | Invoice payment failed (dunning). State the date and consequence; admins only see the action. | warn; retry schedule day 1, 3, 5, 7 |
| `status/subscription-canceled` | — | Your subscription has ended | After the user acts | After cancellation: read-only grace period, then deletion per retention policy (stated here). | info |
| `status/read-only` | — | This workspace is read-only | After the user acts | Soft lock for unpaid accounts. Never delete data; keep read and export working. | warn |

### Platform states

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/maintenance` | — | Down for scheduled maintenance | After a delay | Planned downtime. Serve a static page from the CDN (no JS dependency) with 503 and Retry-After. | info |
| `status/outage` | — | We’re having a problem | After a delay | Known incident. Link to the status page and show affected components. | error; incident id |
| `status/offline` | — | You’re offline | Yes | Client detects no network. Show a banner when cached data is usable; this full page only when nothing can be shown. | none (client-side) |
| `status/region-unavailable` | — | Not available in your country yet | No | Geo-restricted for non-legal reasons (launch regions). Legal blocks use 451. | info |
| `status/browser-unsupported` | — | Please update your browser | After the user acts | Feature detection failed. Detect by capability, not user agent; keep the page tiny and static. | info; aggregate by UA family |
| `status/js-required` | — | This app needs JavaScript | After the user acts | Served inside <noscript>. Keep readable content working without JS where possible (docs, pricing). | none |
| `status/cookies-blocked` | — | Cookies are blocked | After the user acts | Sign-in cookie could not be set. Only first-party, essential cookies are required. | info |
| `status/coming-soon` | — | Something new is on the way | No | Feature or product not yet released. Collect an email with a clear purpose and one email only. | info; waitlist signup event |
| `status/update-required` | — | Update the app to continue | After the user acts | Client older than the minimum supported API version (426 Upgrade Required or a typed 400). | info; version histogram |

### Content

| Page | Code | Headline (user sees) | Retry | Developer use | Log |
|---|---|---|---|---|---|
| `status/file-not-found` | — | That file isn’t here | No | A specific file or record is missing inside a valid page. Keep the shell; do not replace the whole page. | info |
| `status/workspace-not-found` | — | We can’t find that workspace | No | Tenant slug does not exist or the user is not a member (return the same page for both). | info |

## Headers that matter

| Status | Header | Value |
|---|---|---|
| 401 | `WWW-Authenticate` | `Bearer realm="api"` |
| 405 | `Allow` | `GET, HEAD` (the methods the route supports) |
| 429 | `Retry-After` | seconds or HTTP date; also `RateLimit-Remaining` |
| 503 | `Retry-After` | seconds until expected recovery |
| 301/308 | `Location` | new URL; use 308 to keep the method |
| 410 | none | cache it: gone is permanent |

## Problem body (RFC 9457)

```json
{ "type": "https://errors.bytesphere.example/rate-limited", "title": "Too many requests", "status": 429, "detail": "Limit is 100 per minute for this key.", "instance": "/v1/deals?page=3", "request_id": "req_8f2a91" }
```

## Test checklist

- Every page reachable at `#/status/<slug>` and renders in light and dark.
- 429 and 503 disable the primary action and show why while the countdown runs.
- No page uses red for non-errors: 404 is neutral, 401 is info, 5xx is danger.
- Reference line is present on all 5xx and copyable.
- Static edge pages work with JavaScript disabled.

