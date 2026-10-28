# Admin pages

Showcase group "Admin". All use the `app` layout.

| Page | Route | Core interactions | Rules |
|---|---|---|---|
| Roles and permissions | `admin/roles` | Pick a role, toggle resource by action cells, row "All" with indeterminate, new role copies the selected one, unsaved-changes bar | Owner is locked. Show member count. Warn that edits apply to everyone with the role. Sensitive rows (Billing) are labelled |
| Webhooks | `admin/webhooks` | Endpoints with on/off switch, add endpoint with URL validation and event picker, delivery log with Replay, signing secret reveal, copy, rotate | HTTPS only. Failed deliveries (3xx and up) can be replayed. Rotating keeps the old secret for 24 h |
| Single sign-on | `admin/sso` | Four steps: provider, configure (ACS URL and entity ID with copy), verify domain by DNS TXT, test sign-in then turn on, optional enforcement | Turn on only after a successful test. Owners keep a recovery path when enforced |
| Two-step setup | `admin/two-step` | QR plus manual key, 6-digit verification, recovery codes with copy and download, confirm checkbox | Recovery codes shown once. Done is disabled until saved is confirmed |
| Active sessions | `admin/sessions` | List devices, flag unrecognized, sign out one or all others | Current device cannot be signed out here. Confirm bulk sign-out |
| Import wizard | `admin/import` | Upload, map columns, review row errors, skip invalid rows, progress, report of skipped rows | Never import silently. Show every error with row and field. Users can leave while it runs |
| Reports | `admin/reports` | Choose metrics and grouping, live preview, export CSV, XLSX or PDF, schedule by email | Preview matches the export. Scheduling states frequency and recipients |
| API reference | `admin/api` | Endpoint list, snippets (curl, JavaScript), Try it with status and timing | Show the method with a status pill. Responses use the problem format in `status-and-error-pages.md` |

## Shared patterns

1. **Wizards** use `Stepper`, one decision per step, Back always available, the forward action disabled with a reason until valid.
2. **Destructive or wide-impact actions** (sign out all, rotate secret, delete endpoint) either confirm with a named count or offer Undo.
3. **Secrets** are masked by default with Reveal, Copy and Rotate. Never log them or place them in URLs.
4. **Permissions UI** uses a matrix with a header checkbox per row. Never hide a permission; show it locked.
5. **Unsaved changes** are announced in a live region and the Save button is disabled when clean.
6. **Test coverage:** roles, webhooks flows, import and two-step setup are covered in `apps/showcase/tests/flows.spec.ts`; all pages are covered by smoke, a11y and mobile specs.
