# Team and members

**Purpose:** manage who has access and at what level. **Reuse when:** any multi-user workspace. Rules: `04-patterns/team-roles-and-permissions.md`.

## Wireframe
```
Members                                                         [Invite members]
18 of 25 seats used
[Members] [Pending invites (3)] [Roles and permissions]
[🔍 Search by name or email]  [Role ▾] [Status ▾]                       18 members
┌──┬───────────────────────────────┬─────────┬──────────┬──────────────┬────┐
│☐ │ Member                        │ Role    │ Status   │ Last active  │ ⋯  │
├──┼───────────────────────────────┼─────────┼──────────┼──────────────┼────┤
│☐ │ (MM) Mia Moreno  mia@acme.com │ Owner   │ ● Active │ 2 min ago    │ ⋯  │
│☐ │ (KI) Ken Ito     ken@acme.com │ [Admin▾]│ ● Active │ Yesterday    │ ⋯  │
│☐ │ (—) tara@acme.com             │ Member  │ ● Invited│ Sent 2 d ago │ ⋯  │
└──┴───────────────────────────────┴─────────┴──────────┴──────────────┴────┘
Invite modal (560px): emails (chips) · role · message · [Cancel] [Send invites]
```

## Required regions
Page header with primary "Invite members" · seat usage line · tabs (Members, Pending invites, Roles) · toolbar · member table · bulk bar · role matrix table (read-only) · invite modal · remove-member dialog.

## Components
`Table`, `Avatar`, `StatusPill`, `Select` (inline role), `DropdownMenu`, `Dialog`, `Combobox`/chips email input, `AlertDialog`, `Banner` (seat limit), `Tabs`.

## States
loading (skeleton rows with avatar circle + two text blocks) · empty (only you) · no results · invite validation errors (chip-level) · seat-limit callout · role change pending (optimistic with rollback) · last-owner guard message · SSO/SCIM-managed (lock, reason) · permission-limited viewer (read-only table, no actions) · removing member (dialog: reassign content, count) · expired invite.

## Responsive
< 768: table → cards (avatar + name/email, role, status pill, ⋯); invite modal → bottom sheet; tabs scroll. ≥ 1024: full table; role matrix horizontally scrollable with sticky first column.

## Copy rules
"Invite members", "Resend invite", "Revoke invite", "Remove from workspace". Role names fixed vocabulary (Owner, Admin, Member, Viewer). Errors: "2 addresses look invalid. Fix or remove them." Descriptions per role one line.

## Implementation (shadcn/ui)
shadcn `Table`/Data Table, `Select`, `Dialog`, `Command` for email suggestions, `Badge` → `StatusPill`; invites API idempotent; optimistic role changes with TanStack Query rollback; server enforces `members:write`.
