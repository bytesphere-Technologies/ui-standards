# Settings and preferences

Blueprint: `05-reusable-pages/settings-page.md`.

## 1. Structure
| Element | Spec |
|---|---|
| Settings nav | left secondary nav, 220px, sticky; groups with overline labels (Account, Workspace, Billing, Developers); ≤ 12 items; current = tinted + semibold; mobile → select/list at top |
| Page | Focus archetype, content width 720px; page header (title only; no primary action) |
| Section cards | one card per topic: heading (h3 16/600), description (13px secondary, ≤ 2 lines), controls, optional footer with Save |
| Section gap | 24px; card padding 20px; field gap 16px |
| Destructive zone | last section on the page, titled "Danger zone" (sentence case: "Danger zone"), card with `status-danger-border` 1px and no tint, each action row: description left, danger/secondary button right |

## 2. Save model — pick one per section and label it
| Model | Use for | Label & behavior |
|---|---|---|
| **Auto-save** | toggles, selects, theme, notification switches, simple preferences | Immediate effect; status text "Saved" (polite) near the control for 2s; on failure revert + toast with Retry. Section header carries "Changes save automatically" (13px tertiary) |
| **Explicit Save** | text fields, names, URLs, security, anything validated or multi-field | Section footer: [Cancel] [Save changes]; Save stays enabled (validation runs on click, never a silently disabled button); Cancel resets the section; unsaved-changes guard on navigation |
Never mix both inside a single section card. Each card states its model. Page-level "Save all" is banned.

## 3. Notification preference table
| Event | Email | In-app | Push/Slack |
|---|---|---|---|
| Assigned to me | switch | switch | switch |
| Mentions | switch | switch | switch |
| Weekly summary | switch | — | — |
- Rows are events (noun phrase), columns are channels, cells are switches (auto-save). Row headers `<th scope="row">`, column headers `<th scope="col">`; each switch labeled `aria-label="Email: Assigned to me"`.
- Group rows under overline headings; "Mute all email" master switch at top (disables, doesn't hide, the column and says so).
- Defaults: security and billing events are locked on with a lock icon and reason ("Required for account security").
- Mobile: table → one card per event with three switches.

## 4. Destructive actions
1. Located only in the danger zone or the relevant section footer, never in the header.
2. Delete workspace/account/data: typed confirmation (`modals-sheets-drawers.md`), state what is deleted, retention period, and export path ("Export your data first").
3. Show who can do it; non-owners see the row read-only with reason ("Only owners can delete the workspace").
4. Cooling-off: deleting an account sends a confirmation email; soft-delete 14 days stated in the dialog.

## 5. Rules
1. Settings labels use nouns ("Time zone"), not questions.
2. Every setting has a helper line stating the effect in plain terms.
3. Defaults are safe and documented; a "Reset to defaults" link per section where meaningful.
4. API keys: show once on creation, copy button, masked afterward (`sk_live_••••4f2a`), revoke with confirmation.
5. Changing email/password requires re-authentication within 10 minutes.
6. Search settings with ⌘K entries for every settings page.
7. Permission-denied settings are shown read-only with reason, not hidden (except when the section does not exist for the plan).
