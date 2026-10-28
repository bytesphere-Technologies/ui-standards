# Analytics and instrumentation

## 1. Principles
1. Measure decisions, not clicks. Every event answers a question in the tracking plan.
2. **No PII in event payloads.** No emails, names, free text, IP, full URLs with identifiers, form values. IDs are opaque (hashed user id, workspace id).
3. Respect consent: no non-essential analytics before consent where required; honor Do Not Track / GPC (`navigator.globalPrivacyControl`); provide an opt-out in Settings → Privacy.
4. Instrumentation never blocks or breaks UI (async, try/catch, queued).
5. One analytics wrapper (`track()`); components never call vendor SDKs directly.

## 2. Canonical event naming
Format: **`object.action`** in `snake_case` pieces, past tense action, lowercase, ≤ 3 segments: `project.created`, `invoice.downloaded`, `filter.applied`, `search.performed`, `onboarding.task_completed`, `pricing.plan_cta_clicked`.
| Rule | Example |
|---|---|
| Object = noun, action = past-tense verb | `member.invited` not `invite_member` |
| UI-only events prefixed by surface | `command_palette.opened`, `table.density_changed` |
| No dynamic names | `filter.applied` + property `field: "status"`, not `filter_status_applied` |
| Versioned schemas | `schema_version: 2` property when payload changes |

## 3. Standard properties (auto-attached)
`event_id` (uuid), `timestamp` (ISO UTC), `user_id_hash`, `workspace_id`, `plan`, `role`, `route` (templated: `/projects/:id`), `app_version`, `locale`, `theme`, `density`, `viewport_class` (`mobile|tablet|desktop`), `session_id`. Never raw URLs.

## 4. Which UI events are tracked
| Category | Events | Properties |
|---|---|---|
| Navigation | `page.viewed`, `nav.item_clicked`, `breadcrumb.clicked`, `tab.changed` | `route`, `target`, `source` |
| Search | `search.performed`, `search.result_clicked`, `search.no_results`, `command_palette.opened`, `command_palette.command_run` | `query_length`, `result_count`, `rank` (**never the query text**) |
| Filters/tables | `filter.applied`, `filter.cleared`, `sort.changed`, `table.page_changed`, `table.density_changed`, `table.export_started` | `field`, `count`, `direction` |
| Forms | `form.started`, `form.submitted`, `form.validation_failed`, `form.abandoned` | `form_id`, `field_ids_with_errors`, `duration_ms` (no values) |
| Core actions | `{object}.created|updated|archived|deleted` | `object_id`, `source` |
| States | `state.error_shown`, `state.empty_shown`, `state.retry_clicked` | `surface`, `error_code`, `reference_id` |
| Notifications | `toast.shown`, `banner.dismissed`, `notification.opened` | `kind`, `id` |
| Billing | `plan.viewed`, `plan.upgrade_started`, `plan.upgraded`, `payment_method.updated` | `from_plan`, `to_plan` |
| Onboarding | `onboarding.task_completed`, `onboarding.dismissed` | `task_id`, `elapsed_s` |
| Performance (RUM) | `web_vital.reported` | `name`, `value`, `route` |
Not tracked: keystrokes, mouse movement, every hover, scroll depth in product, text content, file names.

## 5. Measuring feature adoption
For each feature define in the PRD: **eligible users** (denominator), **activation event** (first meaningful use), **retention event** (repeated use within 28 days), and **success outcome**. Dashboards: adoption % = users with activation / eligible; repeat rate; time-to-first-use; funnel (viewed → started → completed) with drop-off by step; segmented by plan, role, locale, viewport. Shipping a feature requires its events in the tracking plan before merge (`08-checklists/launch-readiness-checklist.md`).

## 6. Implementation
```ts
// lib/track.ts
import { z } from "zod";
const Event = z.object({ name: z.string().regex(/^[a-z_]+\.[a-z_]+$/), props: z.record(z.union([z.string().max(64), z.number(), z.boolean()])).default({}) });
const FORBIDDEN = /(email|name|phone|address|password|token|query|text|value)/i;

export function track(name: string, props: Record<string, string | number | boolean> = {}) {
  try {
    const e = Event.parse({ name, props });
    for (const k of Object.keys(e.props)) if (FORBIDDEN.test(k)) throw new Error(`PII-like prop: ${k}`);
    if (!consent.analytics || navigator.globalPrivacyControl) return;
    queueMicrotask(() => transport.send({ ...base(), ...e }));
  } catch (err) { if (process.env.NODE_ENV !== "production") console.error(err); }
}
```
Typed event catalog (`events.ts`) generates the `track` signature so unknown events fail typecheck. A CI check diffs the catalog against the tracking plan.

## 7. Data hygiene
Retention ≤ 14 months; user deletion propagates within 30 days; vendor DPA on file; server-side collection preferred for billing and security events; QA via a debug overlay (`?analytics=debug`) listing events as they fire.
