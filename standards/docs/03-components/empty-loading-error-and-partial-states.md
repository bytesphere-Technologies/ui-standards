# Empty, loading, error, and partial states

**Rule: every data surface (table, list, card grid, chart, widget, detail pane, search) designs all four states before it merges.**

## 1. Purpose
Make every non-happy path informative and actionable.

## 2. When to use / when not to
Applies to any region that renders fetched or user-created data. Not: static content; decorative sections.

## 3. Anatomy
```
[icon 24 text-tertiary — no mascot]         1 optional line icon (24px, no circle tile)
Headline (h4, 16/600)                        2 what this is / what happened
Explanation (body, secondary, ≤ 2 lines)     3 why it matters / why it failed
[Primary action]  [Secondary link]           4 one primary action (+ optional text link)
```
Centered within the region, max-width 360px, vertical padding 48px (region ≥ 240px high).

## 4. Variants
| State | Trigger | What to show | Primary action | Banned |
|---|---|---|---|---|
| **Empty — first run** | zero records ever | Value statement + the one action that creates the first record; optional 160×120 illustration (single-style brief) or none | "Create project" | mascot with no action; "Nothing here yet" alone |
| **Empty — cleared** | user finished/cleared (inbox zero) | Quiet confirmation, no illustration | optional "View archive" | congratulation confetti |
| **Empty — no results** | filters/search returned 0 | Echo the query/filters + how to widen | "Clear filters" | blaming the user |
| **Loading** | request in flight | Skeleton shaped like content after 150ms; nothing before | — | spinner for shaped content |
| **Error — recoverable** | request failed (network/5xx) | What failed (object) + why if known + retry + support path; **preserve user input** | "Retry" | "Something went wrong" alone |
| **Error — permission/not found** | 403/404 | Say which; give the route out (request access, go to list) | "Request access" / "Go to projects" | dead end |
| **Partial / stale** | some widgets failed, or data older than threshold | Render what works; badge on stale/failed part: "Updated 12 min ago" + "Retry" | "Refresh" | blank page because one widget failed |
| **Offline** | `navigator.onLine === false` | Banner "You're offline. Changes will sync when you reconnect." Cached data shown with stale badge | — | blocking modal |

## 5. Sizes
Region empty state: icon 24px (illustration 160×120 on first-run only), headline 16px/600, body 14px, 12px gaps, 16px between text and action. Inline (inside a card/table cell): no icon, headline 14px/600, 13px body, 8px gaps. Page-level (404): headline `h2` 24px.

## 6. States
This file *is* the state spec. Within each: action button states follow `button.md`; retry button shows `loading`; after a successful retry the region transitions with 150ms opacity, no layout jump.

## 7. Content rules
Formula: **what happened + what to do.** 
- Empty first run: "No projects yet. Create a project to start tracking deals." 
- No results: "No projects match ‘apolo’ and Status: Active. Clear filters or check the spelling." 
- Error: "Couldn't load invoices. Check your connection and try again. Still failing? Contact support (ref: 8f21)." Include a request/reference id when available. 
- Stale: "Updated 12 min ago · Refresh". 
Sentence case, no exclamation, no "Oops", no emoji, no blame. Error reference ids in `font-mono`.

## 8. Keyboard & screen reader behavior
Error states use `role="alert"` only when they replace content the user was reading; otherwise `role="status"`. Focus does not jump to empty states; after a failed submit, focus the retry button only when the user triggered the failing action. Retry is a real button. Loading: `aria-busy` on region (see `skeletons.md`).

## 9. Tokens used
`color-text-{primary,secondary,tertiary}` · `color-status-danger-fg` (error icon only) · `typography-h4|body|body-sm` · `space-stack-md` · `color-surface-sunken` · `size-icon-lg`.

## 10. Accessibility notes
Meaning is carried by text, not the icon (icon `aria-hidden`). Retry reachable by keyboard. Error text 4.5:1+ (danger-fg on surface 10.8:1 at step 800). SC 3.3.1/3.3.3 for form errors. Respect `prefers-reduced-motion` for the fade.

## 11. Do / Don't
- Do: "No invoices yet. Invoices appear here after your first billing cycle." + link to Billing settings. Don't: "No data".
- Do: keep the table header and toolbar visible in error/empty. Don't: replace the whole page.
- Do: show the 4 working widgets and a "Retry" on the failed one. Don't: blank the dashboard.
- Do: keep what the user typed after a failed save. Don't: reset.

## 12. Code example
```tsx
type StateProps = { icon?: LucideIcon; title: string; description?: string; action?: React.ReactNode; tone?: "default" | "error" };
export function StatePanel({ icon: Icon, title, description, action, tone = "default" }: StateProps) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className="mx-auto flex max-w-90 flex-col items-center gap-3 px-4 py-12 text-center">
      {Icon && <Icon className={tone === "error" ? "size-6 text-status-danger-fg" : "size-6 text-tertiary"} aria-hidden />}
      <h3 className="text-h4 font-semibold text-primary">{title}</h3>
      {description && <p className="text-body text-secondary">{description}</p>}
      {action && <div className="mt-1 flex items-center gap-2">{action}</div>}
    </div>
  );
}

// Surface switch — the four states are a closed union, TypeScript forces them all
function ProjectsTable({ q }: { q: Query }) {
  const { data, error, isPending, isFetching, refetch, dataUpdatedAt } = useQuery(projectsQuery(q)); // TanStack Query v5
  if (isPending) return <TableSkeleton />;
  if (error && !data) return <StatePanel tone="error" icon={CloudOff} title="Couldn’t load projects" description="Check your connection and try again." action={<Button variant="secondary" onClick={() => refetch()} loading={isFetching}>Retry</Button>} />;
  if (data.items.length === 0) return q.hasFilters
    ? <StatePanel icon={SearchX} title="No projects match these filters" description="Clear filters or check the spelling." action={<Button variant="secondary" onClick={q.clear}>Clear filters</Button>} />
    : <StatePanel icon={FolderPlus} title="No projects yet" description="Create a project to start tracking deals." action={<Button variant="primary">Create project</Button>} />;
  return (<>{error && <StaleStrip updatedAt={dataUpdatedAt} onRetry={refetch} />}<ProjectsTableBody rows={data.items} /></>);
}
```

## 13. Anti-patterns
"Something went wrong" alone; "No data"; mascots without actions; spinners on shaped content; error pages that destroy input; empty states with 3 equal CTAs; blame ("You haven't…"); confetti on inbox zero; showing the empty state during loading; error toasts as the only signal.

## 14. Responsive & density
320px: panel padding 32px 16px, buttons full width stacked. 768+: as specified. Compact: inline variant (no icon, 24px padding).
