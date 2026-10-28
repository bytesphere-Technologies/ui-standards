# Banners, alerts, and inline callouts

## 1. Purpose
Keep a page- or section-level status visible until it is resolved or dismissed.

## 2. When to use / when not to
| Use | Component |
|---|---|
| Account/system state affecting the whole app (payment failed, outage, trial ends in 3 days, maintenance) | **Banner** (page top) |
| Context inside content (a note under a setting, a warning above a destructive section) | **Inline callout** |
| Result of an action | toast (`toasts-and-notifications.md`) |
| Field error | inline field error |
Not: marketing announcements in product; banners carrying primary navigation; stacked banners.

## 3. Anatomy
```
┌──────────────────────────────────────────────────────────────────────┐
│ ⚠  Payment failed. Update your card by 14 Mar to keep access. [Update card]   ✕ │
└──────────────────────────────────────────────────────────────────────┘
 1 status icon 20px · 2 message (14px; bold lead optional) · 3 one action (button sm or link) · 4 dismiss (when allowed)
```
Banner: full-width inside the content column (below topbar, above page header), min height 44px, padding 12×16, 1px bottom border in status border color, bg step 50 (dark: 18% tint), text step 800 (dark 300).

## 4. Variants
| Tier | Icon | bg | border | text | Contrast |
|---|---|---|---|---|---|
| info | `info` | info-50 `#F5F8FA` | info-300 `#9CCEE8` | info-800 `#184D67` | 8.57:1 |
| success | `circle-check` | success-50 `#F5FAF7` | success-300 `#A2E2C2` | success-800 `#1F6140` | 7.00:1 |
| warning | `triangle-alert` | warning-50 `#FBF8F4` | warning-300 `#F8CD8C` | warning-800 `#784B08` | 7.06:1 |
| danger | `circle-x` | danger-50 `#FAF5F5` | danger-300 `#E8A19C` | danger-800 `#671D18` | 11.01:1 |
Tokens: `color-status-{tier}-banner-bg` / `-banner-border` / `-banner-fg` (light = steps 50 / 300 / 800 as listed; dark = 18% tint / step 700 / step 300).
Persistence: **dismissible** (info/success; dismissal remembered per user + banner id in the profile, re-shown only if the content version changes) · **persistent** (compliance, outage, payment failure; no dismiss, resolves with the condition).
Inline callout: same colors, radius 8, padding 12×16, 1px border, no dismiss, placed inside the content flow with 16px margin.

## 5. Sizes
Banner min-height 44px (single line), max 2 lines on desktop, 3 on mobile. Inline callout ≤ 3 lines. Action: button sm (32px) or text link. Max width = content column.

## 6. States
default · dismissed (removed with 200ms height collapse) · action loading (button `loading`) · resolved (banner swaps to success for 4s then removes) · hover/active only on action · focus-visible ring on action/dismiss. Disabled/selected/read-only/error: n/a.
**Max 1 banner at a time.** Priority: danger > warning > info > success. Queue lower priorities; show a "+2 more" link on the banner only for danger/warning.

## 7. Content rules
One sentence, ≤ 120 chars, states the problem, the consequence, and the deadline: "Payment failed. Update your card by 14 Mar to keep access." Action is a verb ("Update card"). Never "Important!" or all caps. Banners **never carry primary navigation** or a list of links.

## 8. Keyboard & screen reader behavior
Banner: `role="status"` (info/success/warning, polite) or `role="alert"` (danger, only when it appears dynamically). Static banners rendered on load use `role="region" aria-label="Billing notice"`. Dismiss: `aria-label="Dismiss billing notice"`, Enter/Space; focus moves to the next landmark (page `h1`). Action precedes dismiss in tab order.

## 9. Tokens used
`color-status-{info,success,warning,danger}-{banner-bg,banner-border,banner-fg,solid}` · `radius-card` (inline) · `size-icon-md` · `typography-body` · `space-inset-*` · `duration-base`.

## 10. Accessibility notes
Icon + text (SC 1.4.1); contrast ≥ 7:1 in all tiers; reflow at 320px wraps text, action drops under the message; dismissal state not lost on reload (SC 3.2.3 consistency). Don't auto-dismiss (SC 2.2.1).

## 11. Do / Don't
- Do: one danger banner at the top: "Payment failed… [Update card]". Don't: three banners stacked.
- Do: remember a dismissed info banner. Don't: re-show it every session.
- Do: callout inside Settings above the destructive section. Don't: toast for the same message.
- Do: link to billing settings as the action. Don't: a banner with a 4-link nav.

## 12. Code example
```tsx
import { cva } from "class-variance-authority";
const banner = cva("flex items-start gap-3 border px-4 py-3 text-body", {
  variants: {
    tone: {
      info: "bg-status-info-banner-bg border-status-info-banner-border text-status-info-banner-fg",
      success: "bg-status-success-banner-bg border-status-success-banner-border text-status-success-banner-fg",
      warning: "bg-status-warning-banner-bg border-status-warning-banner-border text-status-warning-banner-fg",
      danger: "bg-status-danger-banner-bg border-status-danger-banner-border text-status-danger-banner-fg",
    },
    kind: { banner: "w-full border-x-0 border-t-0", callout: "rounded-card" },
  },
  defaultVariants: { tone: "info", kind: "callout" },
});
```
Banner tokens `color-status-{tone}-banner-{bg,border,fg}` map to ramp steps 50 / 300 / 800 in light and to the 18% tint / step 700 / step 300 in dark.
```tsx
export function Banner({ tone, children, action, onDismiss, role = "status" }: BannerProps) {
  const Icon = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleX }[tone];
  return (
    <div role={role} className={banner({ tone, kind: "banner" })}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p className="flex-1">{children}</p>
      {action}
      {onDismiss && <Button variant="ghost" size="icon" aria-label="Dismiss notice" onClick={onDismiss}><X /></Button>}
    </div>
  );
}
```

## 13. Anti-patterns
Multiple simultaneous banners; banners with nav; unremembered dismissal; auto-dismissing banners; all-caps "IMPORTANT"; banner for marketing; success banner that stays forever; danger banner for non-blocking issues; rounded floating banners with shadow.

## 14. Responsive & density
320px: icon + text wrap, action below text full-width, dismiss top-end 44px target. 768+: single line with inline action. Density unaffected.
