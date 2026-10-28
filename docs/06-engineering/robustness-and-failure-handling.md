# Robustness and failure handling

## 1. Rule of four states
**Every async surface designs 4 states: loading, empty, error, partial/stale.** A component receiving async data has a required `status` prop or a query-state switch covering all four (`03-components/empty-loading-error-and-partial-states.md`). CI lints for query hooks without `isPending`/`error` handling in rendered components (custom ESLint rule `acme/require-async-states`).

## 2. Error boundaries
| Level | Placement | Behavior |
|---|---|---|
| Root | `global-error.tsx` | full-page 500 with reference id; reset button |
| Route | `error.tsx` per route segment | keeps topbar/sidebar; shows StatePanel with "Try again" (`reset()`) |
| Widget | `ErrorBoundary` around each dashboard widget, chart, editor, third-party embed | failure isolated to the widget; others keep working |
Every boundary logs to error tracking (Sentry or equivalent) with route, user id (hashed), release, correlation id; users see only the reference id.

## 3. Network failures
1. **Retry policy**: TanStack Query `retry: 2` with exponential backoff (1s, 2s, ±jitter) for idempotent GETs; no automatic retry for non-idempotent mutations unless an idempotency key is attached.
2. **Timeouts**: request timeout 15s (reads), 30s (writes), 5 min (uploads w/ progress). On timeout: error state with Retry, not an infinite spinner.
3. **Offline**: `navigator.onLine` + failed-request detection → persistent banner "You're offline. Changes will sync when you reconnect."; reads served from cache with stale badge; writes queued (mutation persister) only for safe operations; unsafe operations disabled with reason.
4. **Retry UI**: every error state has a real Retry button; it shows `loading` and preserves the failed request's input.
5. **Rate limits (429)**: honor `Retry-After`, show countdown text.
6. **Auth expiry (401)**: preserve unsaved input locally, re-auth in a modal (not full redirect) where possible, then replay.

## 4. Optimistic updates and rollback
Optimistic only per `perceived-performance.md` rules. Implement `onMutate` (snapshot + apply), `onError` (restore snapshot + toast with Retry), `onSettled` (invalidate). Concurrent mutations on the same resource are serialized or keyed. Conflict (409/412): show "Updated by Ken 1 min ago" with Review/Overwrite.

## 5. Idempotent submit
Every create/pay/send mutation carries an `Idempotency-Key` (UUID generated when the form mounts, regenerated after success). Server dedupes for 24h. Client: submit button `loading`, extra submits ignored, Enter key and double-click guarded. Back-button after success does not resubmit (redirect-after-POST).

## 6. Loading-state timeouts
| Wait | UI |
|---|---|
| 0–150 ms | nothing |
| 150 ms–5 s | skeleton / inline spinner |
| 5–15 s | add text "Still loading… This is taking longer than usual." + Cancel (where supported) |
| > 15 s | abort → error state with Retry |
Skeletons never persist beyond the timeout.

## 7. Graceful degradation
1. Server-render meaningful HTML for content pages, auth, and marketing; they work (read, navigate, submit forms) without JS where feasible (`<form method="post">` fallbacks, `<a>` navigation, `<details>` for disclosure).
2. Feature detection over browser sniffing; no feature required that evergreen browsers lack.
3. `<noscript>` message on app routes: "This app needs JavaScript. Enable it to continue."
4. Third-party failure (analytics, chat, maps) never blocks the UI: load async with `try/catch`; widgets show their error state.
5. Fallback for failed images (placeholder at same ratio), fonts (system stack), charts (table view).

## 8. Data safety
Autosave drafts for long forms; unsaved-changes guard; never clear input on failure; destructive actions reversible (undo toast / soft delete) or confirmed with consequences; bulk operations report per-item results ("48 archived, 2 failed: View details"); background jobs show progress and completion in the inbox.

## 9. Testing failure
Storybook stories for each state (`play` functions); MSW (mswjs.io) handlers for 500/timeout/offline; Playwright tests with network throttling and `context.setOffline(true)`; chaos toggle in dev (`?fail=widget:revenue`).
