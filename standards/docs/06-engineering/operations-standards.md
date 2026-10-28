# Operations standards

Cross-cutting rules not covered elsewhere: feature flags, error boundaries, print, UI security and release.

## Analytics and performance

Covered in `analytics-and-instrumentation.md` (event names, properties, consent) and `performance-budget.md` (budgets and CI checks). Failure handling is in `robustness-and-failure-handling.md`.

## Feature flags

- Flag names describe the feature: `new_checkout`, not `test3`. Flags have an owner and a removal date.
- Default off in production. Percentage rollouts by workspace, not by request.
- A flagged-off UI must not leave empty space or dead links.
- Remove a flag within two releases of full rollout.

## Error boundaries and logging

- Wrap each route in an error boundary rendering `status/500` in the shell, with the request or error ID. A failing widget uses an inline `StatePanel` and does not take down the page (see the dashboard "Simulate a widget failure").
- Log client errors with route, user agent, release, and the error ID shown to the user. Never log secrets, tokens, form values.
- 4xx = info or warn; 5xx = error and alert on-call.

## Print

Invoices, receipts, reports and legal pages must print cleanly: `@media print` hides navigation, buttons and backgrounds; black text on white; no shadows; links show their URL; tables avoid page breaks inside rows. The showcase invoice already renders on white regardless of theme.

## Security in the UI

- Mask secrets by default; Reveal and Copy are explicit; rotate shows the grace period.
- Destructive actions name their target and count.
- Session timeout warns 2 minutes before and preserves unsaved input.
- Never put tokens or personal data in URLs. Sanitize anything rendered as HTML (the Markdown preview escapes input first).
- Content Security Policy forbids inline scripts in production; styles are classes, not inline strings.

## Release and versioning

Semantic versions for the design system. A removed or renamed component keeps a deprecated alias for one minor version with a console warning and a changelog line (`00-governance/versioning-and-deprecation.md`). Every release runs `npm run build && npm test`.
