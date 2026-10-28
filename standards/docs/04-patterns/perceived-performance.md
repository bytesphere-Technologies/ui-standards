# Perceived performance

Speed is felt before it is measured. These rules make the product feel fast at the same actual latency.

## 1. Latency budgets
| Interaction | Budget | Response |
|---|---|---|
| Input feedback (click, key, toggle) | **≤ 100ms** to visible change (INP target ≤ 200ms p75) | optimistic update or pressed state |
| Navigation within the app | ≤ 300ms to first paint of new route shell | prefetch + route skeleton |
| Data load | ≤ 1s to first meaningful content | skeleton at 150ms |
| Search results | ≤ 400ms from last keystroke | keep prior results |
| Long operation (> 3s) | progress + cancel | determinate where possible |

## 2. Techniques (in order of preference)
1. **Optimism**: for high-success, reversible actions (toggle, rename, reorder, favorite, mark-read, add comment), update the UI immediately; roll back with an error toast + Retry on failure (TanStack Query `onMutate` / `onError` rollback). Never optimistic for payments, deletes of shared data, permission changes.
2. **Prefetch**: on hover/focus intent (≥ 65ms hover) and when a link enters the viewport (`IntersectionObserver` + `router.prefetch`); prefetch the next page of a table while the user views the current one; prefetch the top 3 command-palette results' routes.
3. **Skeleton timing**: show nothing for the first 150ms; skeleton after; hold ≥ 300ms once shown. Content-shaped (`skeletons.md`). No skeleton for sub-200ms loads.
4. **Streaming**: server-render the shell (topbar, sidebar, page header) immediately; stream data regions with Suspense boundaries (React `<Suspense>` + streaming SSR) so each widget resolves independently.
5. **Cache and revalidate**: TanStack Query v5 `staleTime` per resource (lists 30s, settings 5 min); show cached data instantly with a subtle "Updated 12:04" and revalidate in the background (stale-while-revalidate); never block on revalidation.
6. **Progressive image loading**: BlurHash/LQIP placeholder, explicit `width`/`height`, `loading="lazy"` below fold, 150ms opacity fade (`imagery-photo-and-assets.md`).
7. **Debounce/throttle**: search 300ms; resize/scroll handlers `requestAnimationFrame`; autosave 1s idle.
8. **Defer non-critical**: charts, editors, maps, and command palette load after first interaction or idle (`requestIdleCallback`).
9. **Keep previous content** while fetching new (`placeholderData: keepPreviousData`) for pagination/filter changes; dim to 60% instead of replacing with skeletons.

## 3. Rules
1. **A spinner is never the answer for content that has a shape.** Use a skeleton. Spinners are for actions in controls and unknown-shape waits.
2. Never block the whole screen for background work.
3. Don't animate to disguise slowness (no fake progress bars, no artificial delays).
4. Layout never shifts after paint: reserve space for images, ads, async widgets (CLS ≤ 0.05).
5. Don't re-fetch on window focus for forms with unsaved input.
6. Every optimistic mutation has a defined rollback and a visible failure.
7. Long lists virtualize above 200 rows (TanStack Virtual).
8. Measure real-user performance (web-vitals → analytics) and keep INP/LCP/CLS targets from `06-engineering/performance-budget.md`.

## 4. Code: optimistic toggle with rollback
```tsx
const qc = useQueryClient();
const toggle = useMutation({
  mutationFn: (v: { id: string; starred: boolean }) => api.star(v.id, v.starred),
  onMutate: async (v) => {
    await qc.cancelQueries({ queryKey: ["projects"] });
    const prev = qc.getQueryData<Project[]>(["projects"]);
    qc.setQueryData<Project[]>(["projects"], (old) => old?.map((p) => (p.id === v.id ? { ...p, starred: v.starred } : p)));
    return { prev };
  },
  onError: (_e, _v, ctx) => { qc.setQueryData(["projects"], ctx?.prev); toast.error("Couldn’t update star", { action: { label: "Retry", onClick: () => toggle.mutate(_v) } }); },
  onSettled: () => qc.invalidateQueries({ queryKey: ["projects"] }),
});
```
