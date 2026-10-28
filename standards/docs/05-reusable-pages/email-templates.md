# Email templates

Seven transactional emails cover most products. Email clients ignore modern CSS, so templates are **table-based HTML with inline styles**, 600 px wide, built with **MJML** or **React Email** (recommended; not installed). Preview in the showcase with `EmailPreview` (`#/notifications/system`).

## Templates

| Email | Subject (max 50 chars) | Preheader (max 90) | Button |
|---|---|---|---|
| Verify email | Confirm your email for ByteSphere | Confirm to finish creating your account. The link works for 24 hours. | Confirm email |
| Reset password | Reset your password | Use this link within 1 hour. If it wasn’t you, ignore this email. | Reset password |
| Invite | Mia invited you to Northwind | Join the workspace to see shared deals and invoices. | Accept invite |
| Receipt | Receipt for INV-1042: $680.68 | Thanks for your payment. Your receipt is below. | View invoice |
| Payment failed | Payment failed. Update your card by 14 March | We couldn’t charge the card ending 4242. Your data is safe. | Update payment |
| Security alert | New sign-in from Lagos, Nigeria | If this wasn’t you, secure your account now. | Review activity |
| Weekly summary | Your week: 4 deals closed | $38K new revenue, churn down 0.3 pt. | Open dashboard |

## Layout (top to bottom)

1. Logo (PNG at 2x, 140 px wide, `alt="ByteSphere Technologies"`), on white.
2. Headline (24 px, Poppins 600 with Arial fallback) stating the event.
3. 1 to 3 short paragraphs (16 px, 24 px line height, `#000913` on white).
4. One primary button (44 px tall, `#116CB3`, white text, 6 px radius, padded link not an image).
5. The same link as plain text under the button.
6. Facts table when needed (invoice lines, device, location).
7. Footer: company legal name and address, reason for the email, unsubscribe or preferences link where legal, support address.

## Rules

- One purpose, one button per email. No marketing in transactional mail.
- Every email works without images and without colors (dark mode inverts): use `bgcolor` and `color` attributes plus `color-scheme` meta; test in Apple Mail dark and Gmail dark.
- Use real text, no text baked into images. Alt text on every image.
- Links go to your domain, are HTTPS, and never use URL shorteners. Expire single-use links and say when.
- Plain-text part always included.
- Subjects state the fact ("Payment failed"), not teasers; no emoji, no ALL CAPS.
- Security emails never include a password or a one-time code in the subject.
- Send from `no-reply` only when replies are useless; otherwise from a monitored address.

## Test checklist

- Litmus or Email on Acid for Outlook, Gmail, Apple Mail, mobile.
- Passes at 360 px: single column, button full width.
- SPF, DKIM and DMARC aligned.
- Links tracked without exposing user data.
