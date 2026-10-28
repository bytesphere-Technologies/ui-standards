# Auth and onboarding

Blueprints: `05-reusable-pages/sign-in-sign-up-reset.md`, `05-reusable-pages/onboarding-checklist.md`.

## 1. Auth layout
| Property | Spec |
|---|---|
| Layout | single column, centered card region **≤ 480px** (form width 400px), vertical center on ≥ 768px, top-aligned on mobile |
| Brand panel | optional on ≥ 1024px: 50% left panel, solid `surface-sunken` or brand-solid `primary-700` with logo + one customer quote (real, attributed); **no gradient, no stock photo, no animated art**; hidden < 1024px |
| Header | logo (32px) → h2 24px title ("Sign in to Acme") → one-line description |
| Footer | "Terms · Privacy · Help"; language selector; no marketing |

## 2. Sign in / sign up / reset
1. **SSO buttons first** when the product has SSO: order = Google, Microsoft, Apple (only providers actually supported), then "Continue with SSO" (enterprise), each a full-width secondary button 40px with the provider mark (monochrome-compliant brand guidelines). Then a divider "or" (text on 1px rule) then email form.
2. Email field first; password on the same step (single page) unless using email-first discovery for SSO domains (step 2 reveals password or redirects).
3. **Password rules shown up front** under the field: "At least 12 characters. No common passwords." (checklist ticks update as typed, as text + icon, not color alone). Show-password toggle (button, `aria-pressed`). Allow paste and password managers; `autocomplete="new-password"/"current-password"`.
4. Primary button: "Sign in" / "Create account" / "Send reset link", 40px, full width.
5. Secondary links: "Forgot password?" (right of password label), "Create an account" / "Sign in" at the bottom.
6. Consent text for sign-up: "By creating an account you agree to the Terms and Privacy Policy." (no pre-checked marketing opt-in; optional separate unchecked checkbox).
7. MFA step: OTP input (6 digits, `autocomplete="one-time-code"`), "Use a recovery code", "Resend code" with 30s cooldown shown as text.
8. Passkey option ("Sign in with a passkey") when supported.

## 3. Error and lockout states
| State | Message | Behavior |
|---|---|---|
| Wrong credentials | "That email and password don't match. Try again or reset your password." | no hint which was wrong; keep email; focus password |
| Unverified email | "Verify your email to continue. We sent a link to ma…@acme.com. Resend email" | resend cooldown 60s |
| Rate limit | "Too many attempts. Try again in 5 minutes, or reset your password." | live countdown as text, button disabled with reason |
| Locked account | "Your account is locked for security. Contact your admin or reset your password." | support path |
| SSO required | "Your organization requires SSO. Continue with SSO" | auto-redirect option |
| Network/server | danger banner in the form, "We couldn't reach the server. Try again." | input preserved |
| Reset sent | "If an account exists for ma…@acme.com, we've sent a link. It expires in 1 hour." | never reveal account existence |

## 4. Onboarding
1. **Checklist pattern**: a persistent card or page with 3–5 tasks, each: title, 1-line why, time estimate ("2 min"), action button, done check. Progress "2 of 4" with determinate bar. Dismissible after ≥ 1 completed; reopenable from Help.
2. **First-run empty states** are the primary onboarding: each major surface shows what it's for and the one action to start (`empty-loading-error-and-partial-states.md`).
3. **Progressive disclosure**: ask only what the next screen needs. Max 3 questions before the product; defer profile, team, billing.
4. **Skip paths**: every step has "Skip for now" (ghost) except legally required ones; skipped items remain in the checklist.
5. No forced product tours. Optional 3-step coach marks (popover, anchored, Esc dismiss, "Don't show again") only for non-obvious features.
6. Sample data: offer "Add sample data" (clearly labeled, removable in one click) instead of fake populated screens.
7. Invite teammates step is skippable and uses email-list input with paste support.
8. Completion: land in the product on the page where the first task continues; no celebratory modal, no confetti; a quiet checklist-complete toast "Setup complete".

## 5. Rules
1. Auth pages have no navigation chrome except logo and help.
2. Never ask for information you already have (SC 3.3.7).
3. No CAPTCHA puzzle as sole path (SC 3.3.8).
4. Auth forms follow `forms-and-validation.md` (validate on blur, error summary not needed for ≤ 3 fields).
5. Do not auto-focus the email field on mobile (keyboard covers context); do on desktop.
