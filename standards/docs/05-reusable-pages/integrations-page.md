# Integrations and API keys

**Purpose:** connect other tools and manage programmatic access. **Reuse when:** any product with an API or third-party connections. Routes `/settings/integrations` and `/settings/api-keys`.

## Wireframe
```
Integrations
┌ Slack      ┐ ┌ GitHub     ┐       Card: icon tile 40 · name · one-line value · status pill
│ Post deal… │ │ Link PRs…  │       Connected → [Configure] [Disconnect]
│ ●Connected │ │ [Connect]  │       Not connected → [Connect] (primary only in this card)
API keys                                            [Create key]
 Name         Key                  Last used        
 Production   sk_live_••••4f2a     2 min ago        [Revoke]
```

## Rules
1. A key is shown **once**, in a dialog with a copy button; afterwards it is masked (`sk_live_••••4f2a`).
2. Revoke needs one confirmation naming the key; revoking the key in use warns first.
3. Scopes are listed per key; the default is read-only.
4. Disconnecting an integration says what stops working.
5. Webhook endpoints show last delivery status and a retry.

## States
empty (illustration, "No API keys", Create key) · created (dialog) · revoked (toast with the key name) · integration error (danger pill "Needs attention" and a reconnect button) · permission (non-admins see read-only list).

## Responsive
Cards 1 / 2 columns; the key table collapses to rows with name over masked key.

## Copy
"Create key", "Revoke", "Connect", "Disconnect". No "Supercharge your stack".

## Implementation
shadcn `Card`, `Dialog`, `Table`; secrets generated server-side; clipboard via `navigator.clipboard` with "Copied" state for 1.8s.
