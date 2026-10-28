# Verify email and one-time codes

**Purpose:** confirm control of an email address or a second factor. **Reuse when:** sign-up, new-device sign-in, sensitive actions. Route `/verify-email`.

## Wireframe
```
Enter your code
We sent a 6-digit code to mia@northwind.example.
[ 4 ][ 2 ][ 4 ][ 2 ][ 4 ][ 2 ]        six boxes, 48px high, tabular numerals
✓ Verified   |  That code isn't right. Check the email and try again.
[ Verify and continue ]
Wrong email? Start over            Resend code (30s)
```

## Rules
1. `autocomplete="one-time-code"` on the first box, `inputmode="numeric"`; paste fills all six; Backspace on an empty box moves back.
2. Verification starts automatically on the sixth digit; the button remains for assistive tech.
3. Wrong code: boxes shake once (M-06), message states the fix, input stays editable.
4. Resend has a visible 30s cooldown shown as text; five wrong attempts lock for 5 minutes with the time stated.
5. Offer "Use a recovery code" and "Try another way" for MFA; never a CAPTCHA.
6. The code expires after 10 minutes; say so in the helper text.

## States
idle · typing · verifying (button loading) · verified (tick) · wrong · expired ("This code expired. Send a new one") · locked (countdown) · delivery delay after 60s ("Still waiting? Check spam or resend").

## Implementation
Plain inputs with refs (no heavy library); `aria-live="polite"` region for status; server enforces rate limits.
