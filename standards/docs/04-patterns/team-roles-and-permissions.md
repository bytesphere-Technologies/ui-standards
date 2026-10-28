# Team, roles, and permissions

Blueprint: `05-reusable-pages/team-and-members.md`.

## 1. Member table
| Column | Spec |
|---|---|
| Member | avatar 32 + name (14/500) + email (13 secondary) |
| Role | select in-row for admins (Radix Select, 32px) or plain text for others |
| Status | pill: Active (success), Invited (info), Suspended (neutral) |
| Last active | relative date, `title` absolute |
| Actions | "⋯" menu: Change role, Resend invite, Remove from workspace (destructive, last) |
Toolbar: search, role filter chips, "Invite members" primary button (page header). Bulk: select rows → "Change role", "Remove". Empty (only you): "It's just you. Invite teammates to collaborate." + invite button. Row count and plan seat usage at the top: "18 of 25 seats".

## 2. Invite flow
1. Click "Invite members" → modal md (560px): email list input (paste comma/newline separated, validated chips), role select (default = least privilege "Member"), optional message, footer [Cancel] [Send invites].
2. Invalid emails get chip error state and message "2 addresses look invalid. Fix or remove them."
3. Seat limit: if invites exceed seats, inline callout: "You have 2 seats left. Add seats or remove 3 addresses." with action.
4. Success toast "3 invitations sent"; invited members appear in the table as **Invited** with "Resend" and "Revoke".
5. Invites expire in 7 days (stated in the modal); expired invites show "Expired · Resend".
6. Domain-restricted workspaces state the allowed domain.

## 3. Role matrix
A read-only reference table available in a "Roles and permissions" tab/section.
| Capability | Owner | Admin | Member | Viewer |
|---|---|---|---|---|
| View content | ✓ | ✓ | ✓ | ✓ |
| Create / edit content | ✓ | ✓ | ✓ | — |
| Delete content | ✓ | ✓ | own only | — |
| Manage members and roles | ✓ | ✓ | — | — |
| Manage billing | ✓ | — | — | — |
| Delete workspace | ✓ | — | — | — |
Rules: icons are `check` (with sr-text "Allowed") and `minus` ("Not allowed"); role columns ≤ 5; custom roles (enterprise) add columns; each role has a one-line description; the last owner cannot be removed or demoted (UI explains: "Transfer ownership first").

## 4. Permission-denied states
| Situation | UI |
|---|---|
| Whole page forbidden (403) | page-level state: "You don't have access to Billing" + who can grant it (owner names) + "Request access" button (sends a request) + "Go to dashboard" |
| Action forbidden | control rendered `aria-disabled` with tooltip reason: "Only admins can invite members" (not hidden when users can ask for access; hidden when the capability doesn't exist for their plan or never could) |
| Feature requires plan | locked row with plan name and "See plans" |
| Read-only data | fields read-only with lock icon and reason line |
| Pending request | "Access requested 2 days ago · Withdraw" |
Never show a bare "Forbidden" or "401". Permission checks are enforced on the server; the UI mirrors but never replaces them.

## 5. Rules
1. Least privilege default role.
2. Role changes confirm when they reduce the actor's own access or remove the last admin.
3. Removing a member asks what happens to their content (reassign / keep) and names the count.
4. Audit trail: every change appears in an Activity log (who, what, when).
5. SCIM/SSO-managed members show a lock and "Managed by your identity provider".
