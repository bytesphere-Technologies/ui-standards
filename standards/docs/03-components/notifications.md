# Notifications

Showcase: `#/notifications/system` (every channel), `#/notifications` (full list), `#/notifications/settings` (preferences), bell in the top bar.

## Pick the channel by urgency

| Channel | Use for | Interrupts | Lifetime | Component |
|---|---|---|---|---|
| Inline message | Validation, field help | No | Until fixed | `Field` error |
| Toast | Result of what the user just did | Briefly | 5 s; errors stay | `useToast` |
| Banner | Page or account state (past due, maintenance) | No | Until resolved or dismissed | `Banner` |
| Badge / dot | Something new, count only | No | Until seen | `Count` |
| Notification center | Activity by others, assignments, alerts | No | 30 days, then archive | `NotificationCenter` |
| Email | Needs action later or leaves the app | Yes | Permanent | `EmailPreview` for design |
| Push | Time-sensitive: security, mentions, scan exceptions | Yes | Until dismissed | `PushPreview` for design |

Rule: never send the same event through more than two channels at once, and never use a higher channel than the urgency needs.

## Toast

- Only for the result of the user's own action. Someone else's action goes to the center.
- 5 s, pauses on hover and focus. Errors stay until dismissed.
- Maximum 3 stacked, newest on top. Desktop bottom right, mobile bottom above the tab bar.
- Title is the outcome in 2 to 5 words ("Invoice sent"). Description is one line, optional. At most one action ("Undo", "Retry").
- Never "Success!" and never an exclamation mark.

## Notification center

- Bell in the top bar, 40 px target, count badge (`99+` cap). The bell rings once (`m-bell`) when the count rises.
- Panel: 400 px wide (full width minus 24 px on mobile), max height 70% of the viewport, tabs All, Unread, Mentions, "Mark all read", footer with View all and settings.
- Item: actor avatar or kind icon · title (what happened, with the object) · optional one-line body · relative time · one primary action · read state (blue dot and tinted row).
- Opening the panel does not mark items read. Reading is explicit (click the item, an action, or Mark all read).
- Empty state: "You’re all caught up".
- Group by day only above 20 items. Archive after 30 days.

## Copy

| Do | Don't |
|---|---|
| "Kenji mentioned you in Wingtip expansion" | "You have a new mention!" |
| "Invoice INV-1041 is 12 days past due" | "Alert: invoice issue" |
| "New sign-in from Lagos, Nigeria" | "Security notification" |

Title 60 characters max. Push title 40, body 90. Email subject 50. Always name the object.

## Preferences

Matrix of category by channel (in app, email, push). Defaults: in app on; email on except product updates; push only for security and mentions. Security email cannot be turned off. Quiet hours delay email and push, never security.

## Test checklist

- Every channel has a designed example in the showcase.
- The bell announces its unread count to assistive tech.
- Dismiss and Mark read work with the keyboard; dismiss is visible on touch without hover.
- Count updates without moving the layout.
- Reduced motion: no bell ring, no slide.
