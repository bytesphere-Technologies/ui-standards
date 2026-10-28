# Data fetching and state

Library: **TanStack Query** for server state, plain React state for local UI state, URL for shareable state (filters, tab, page, sort). No global store unless two distant parts truly share non-server state.

## What goes where

| State | Home |
|---|---|
| Lists, records, anything from the API | TanStack Query cache |
| Filters, sort, page, selected tab, open record | URL search params |
| Form values | React Hook Form |
| Open or closed, hover, draft text | `useState` in the component |
| Theme, density, sidebar | `useAppearance` (localStorage) |
| Auth and current user | Query (`useMe`) plus a route guard |

## The four states (every query)

```tsx
const q = useQuery({ queryKey: ["deals", filters], queryFn: () => api.deals(filters), staleTime: 30_000 });
if (q.isPending) return <SkeletonKit kind="table" />;
if (q.isError) return <StatePanel tone="error" title="Couldn’t load deals" description={friendly(q.error)} action={<Button onClick={() => q.refetch()}>Try again</Button>} />;
if (!q.data.length) return <StatePanel title="No deals yet" description="Create one to start your pipeline." action={<Button variant="primary">New deal</Button>} />;
return <DealsTable rows={q.data} stale={q.isFetching} />; // show a subtle "Updating" while refetching
```

Rules: never a blank screen; skeleton shaped like the final layout; keep old data visible while refetching (`placeholderData: keepPreviousData`); errors name what failed and offer retry.

## Mutations

1. **Optimistic** for reversible, low-risk actions (star, check, reorder): update the cache in `onMutate`, roll back in `onError` with a toast, invalidate in `onSettled`.
2. **Pessimistic** for money, deletion of shared data and anything with server-side rules: show pending on the control and update after success.
3. Always disable duplicate submits and show a pending label.
4. After create: navigate to the new record. After delete: toast with Undo (soft delete) or confirm first (hard delete).

## Error handling

| Status | Behaviour |
|---|---|
| 400 and 422 | Map `errors[field]` to the form; otherwise banner |
| 401 | Redirect to sign-in with a return URL (`status/401` rules) |
| 403 | In-shell "no access" with who can grant it |
| 404 | Not-found page for the route; inline empty for a missing child |
| 409 | "Someone changed this" with Reload and Compare |
| 429 | Honour `Retry-After`; backoff; countdown UI |
| 5xx | Retry up to 2 times with exponential backoff (idempotent GETs only), then error panel with request ID |
| Network | Offline banner; queue writes only where the feature is built for it (scanning) |

All pages for these live in `05-reusable-pages/status-and-error-pages.md`. Use RFC 9457 problem bodies; show `request_id`.

## Performance

- Prefetch on hover or focus of links to detail pages.
- Paginate or cursor-page lists over 100 rows; virtualize over 1,000 (`VirtualList`).
- Debounce search inputs 150 ms; cancel in-flight requests (`signal`).
- Code-split routes; skeleton while the chunk loads.
- Budgets: first load under 200 KB JS gzipped for the app shell; interactions respond within 100 ms; API reads under 400 ms at p95.

## Realtime and offline

- Prefer polling with `refetchInterval` (30 s) before WebSockets. Use SSE or WebSockets for presence, chat and scanning feeds.
- Live data shows a "Live" indicator and a pause control (`LiveChart`).
- Offline-capable features (scanning) write to a local queue first, show "n pending", sync in order, and surface conflicts as a list, never silently.

## Test checklist

- Throttle to Slow 3G: skeletons appear, no layout shift.
- Kill the API: error panel with retry; retry works.
- Two tabs edit one record: the second gets the 409 flow.
- Back button restores filters and page from the URL.
