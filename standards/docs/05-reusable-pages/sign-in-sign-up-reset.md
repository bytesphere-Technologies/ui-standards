# Sign in / sign up / reset

**Purpose:** authenticate or create an account with the fewest steps. **Reuse when:** any product entry point. Rules: `04-patterns/auth-and-onboarding.md`.

## Wireframe
```
┌──────────────────────────────┬─────────────────────────────┐
│ (≥1024px only, optional)     │            [logo 32]         │
│  solid primary-700 panel     │      Sign in to Acme         │ ← h2 24px
│  logo · real quote ·         │  Use your work account.      │
│  attribution                 │ [G Continue with Google]     │ ← 40px, full width ≤ 400px
│                              │ [  Continue with Microsoft]  │
│                              │ [  Continue with SSO]        │
│                              │ ──────────  or  ──────────   │
│                              │ Work email                    │
│                              │ [__________________________] │
│                              │ Password          Forgot?     │
│                              │ [________________] [show]     │
│                              │ [        Sign in            ] │ ← primary lg 40px
│                              │ New to Acme? Create account   │
│                              │ Terms · Privacy · Help        │
└──────────────────────────────┴─────────────────────────────┘
```

## Required regions
1. Logo (links to marketing home). 2. h2 title + one-line description. 3. SSO group (only enabled providers). 4. Divider "or". 5. Form. 6. Alternate-route link. 7. Legal/help footer. 8. Live error region (`role="alert"`) above the form.

## Components
`Button` (secondary for SSO, primary for submit), `Field`, `Input` (email, password with show toggle), `Checkbox` ("Remember this device", unchecked), `InputOTP` (MFA), `Banner` (danger, inline), `Separator`.

## States
default · field errors on blur · submitting (button loading, fields read-only) · wrong credentials · unverified email · rate-limited (countdown text) · locked · SSO-required redirect · network error banner · MFA step · reset-sent confirmation · reset-link expired ("This link expired. Request a new one"). Sign-up adds password checklist (live) and consent line. Reset: step 1 email → "Check your email" screen (with resend 60s cooldown) → set-new-password page → success → redirect to sign-in with toast "Password updated".

## Responsive
< 768px: no brand panel; card padding 16px; controls 44px; 16px input font. 768–1023: centered 400px form. ≥ 1024: optional split. Max form width 400px (container 480px).

## Copy rules
Titles: "Sign in to {Product}", "Create your account", "Reset your password". Buttons: "Sign in", "Create account", "Send reset link", "Continue". Errors per `auth-and-onboarding.md` §3. No "Welcome back!!", no emoji, no marketing blurbs.

## Implementation (shadcn/ui)
shadcn blocks `login-01`…`login-05` and `signup-01` (ui.shadcn.com/blocks) as the base; remove gradient/decor from the block, set form width 400px, use registry `Field`. `InputOTP` from shadcn (`input-otp`). Auth logic via your provider (Auth.js / Clerk / WorkOS) — UI is provider-agnostic. Route group `(auth)` with its own layout (no sidebar).
