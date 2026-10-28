# UX anti-patterns

Each is rejected in review with code `UX`. Format: **Pattern** → why it hurts → fix.

| # | Anti-pattern | Why it hurts | Fix |
|---|---|---|---|
| 1 | **"Are you sure?" with Yes/No and no consequence** | User can't judge risk; Yes/No ambiguous | Title the object, state consequence and reversibility; confirm verb "Delete report" |
| 2 | **Confirm dialog for every reversible action** | Habituation; users click through | Do it and offer Undo (6s toast) |
| 3 | **Two (or more) primary buttons** | No obvious next step | One primary; others secondary |
| 4 | **Primary action position changes between pages** | Violates predictability | Header top-right, dialog bottom-right everywhere |
| 5 | **Spinner for content with a known shape** | Layout jump; feels slower | Skeleton matching final geometry |
| 6 | **Full-screen blocking for background work** | Prevents other work | Non-blocking status + inbox notification |
| 7 | **Infinite scroll for records users compare or cite** | Lose position; footer unreachable; can't link to page 3 | Pagination, URL-synced |
| 8 | **Modal for long forms / modal in modal** | Cramped; focus nightmares | Full page or sheet |
| 9 | **Auto-opening modals on load (newsletter/tour)** | Interrupts the task | In-context prompts after value |
| 10 | **Validation on every keystroke / blocking typing** | Errors before the user finishes | Validate on blur; never strip input |
| 11 | **Form reset on error** | Data loss, rage | Preserve all input |
| 12 | **"Something went wrong" alone** | No cause, no next step | What failed + retry + support + reference id |
| 13 | **Empty states with mascots and no action** | Dead end | Explain value + one primary action |
| 14 | **Disabled controls with no explanation** | Users can't fix it | Disabled-with-reason; tooltip |
| 15 | **Hidden destructive actions in primary flows** | Accidental loss | Destructive last in menu, separated, confirmed |
| 16 | **Toasts for errors that need decisions / validation** | Vanish; steals attention | Inline error; banner; modal |
| 17 | **Dashboard as a landing page with no action** | Looks, doesn't help | Attention items + next action |
| 18 | **Numbers without time window or comparison** | Uninterpretable | "Last 30 days vs prior" on every metric |
| 19 | **Gauge/donut soup; pie with 8 slices** | Hard to compare | Bar/line; KPI + delta |
| 20 | **Filters that silently persist or hide** | "Where did my data go?" | Chips, counts, Clear all, URL state |
| 21 | **Search requiring Enter for local lists; no results guidance** | Friction | Instant filter; recovery tips |
| 22 | **Inconsistent terminology** (Project/Workspace/Space) | Cognitive load | Glossary; one term per concept |
| 23 | **Settings buried or auto-saving some, manual saving others in one card** | Unpredictable | One save model per section, labeled |
| 24 | **Account menu with 15 items; org switcher hidden** | Slow, confusing | Fixed 6-8 items, org switcher first-class |
| 25 | **Onboarding as forced product tour** | Skips; no memory | Checklist + empty states; skippable |
| 26 | **Dark patterns**: fake urgency, roach-motel cancel, pre-checked upsell, confirmshaming | Trust and legal risk | `pricing-page.md` §4 |
| 27 | **Pagination without total or page size** | Can't orient | "1–50 of 1,284", size selector |
| 28 | **Tabs that change content but not URL** | Can't share/back | Deep-linked tabs |
| 29 | **Nested tabs; > 7 tabs** | Hidden structure | Split pages; secondary nav |
| 30 | **Tooltip as the only place information lives** | Invisible on touch | Put it in the UI; tooltip is supplementary |
| 31 | **Optimistic UI without rollback** | Lies to the user | Rollback + error with Retry |
| 32 | **Double submit possible** | Duplicate orders/records | Loading state + idempotency key |
| 33 | **Unsaved changes lost silently** | Rage | Guard dialog; drafts |
| 34 | **Mixed density in one table / inconsistent row heights** | Visual noise | One density per table |
| 35 | **Overloaded header: search, 5 icons, 3 buttons, banner** | Competes with content | Search, help, bell, avatar; max 1 banner |
| 36 | **Copy that sells inside the product** ("Supercharge your workflow!") | Noise in a work tool | Instructional, specific copy |
| 37 | **Auto-refresh that moves content under the cursor** | Mis-clicks | "3 new items — Show" bar |
| 38 | **Requiring account creation before showing value** | Drop-off | Let users try; ask when needed |
| 39 | **Sorting that resets on refresh; page that resets on filter change** | Lost context | URL-synced sort/filter; reset page only when filters change |
| 40 | **Timestamp ambiguity** ("3/4/26") | Locale confusion | `4 Mar 2026`, relative with absolute `title` |
