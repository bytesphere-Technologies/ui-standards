# Avatars and identity

## 1. Purpose
Identify a person, team, or organization at a glance, consistently.

## 2. When to use / when not to
Use for users, teams, orgs in tables, comments, menus, assignee pickers. Not: decoration; representing non-identity objects (use icons); anonymous system events (use a system icon tile, 4px radius).

## 3. Anatomy
```
( photo | initials )   1 circle (radius-round) · 2 image or initials · 3 optional presence dot (bottom-end) · 4 optional ring (selected)
(AB)(CD)(EF)(+4)       group: overlap −8px, 2px surface-colored ring separates, max 4 shown then "+N"
```

## 4. Variants
| Variant | Spec |
|---|---|
| Photo | `object-fit: cover`, focal point honored |
| Initials | first letters of first + last name (1 letter for single names), 600 weight |
| Org/team | **square, radius 6** (not round) with initials or logo — distinguishes orgs from people |
| Group | up to 4 avatars + "+N" count avatar (neutral) |
| With label | avatar + name (14/500) + secondary (13) in rows |
**No photo = initials, never a generic silhouette for a known user.** A silhouette is permitted only for truly anonymous/unknown identity ("Guest").

## 5. Sizes
**24 / 32 / 40 / 64 px.** Initials font: 24→11px, 32→12px, 40→14px, 64→20px. 32 = topbar, table cells; 24 = dense lists, group stacks; 40 = menus, cards; 64 = profile headers. Presence dot: 8px on 24/32, 10px on 40, 14px on 64, 2px surface ring.

## 6. States
default · hover (only when interactive: ring `border-strong`) · focus-visible (2px ring) · selected (2px `action-primary-rest` ring + 2px offset) · loading (skeleton circle) · image error (falls back to initials silently) · disabled (opacity 0.5 not used; `text-disabled` on initials) · read-only n/a.
**Presence dot:** online `status-success-dot`, away `status-warning-dot`, busy `status-danger-dot`, offline = ring only with `border-control` (hollow). Presence is always paired with text elsewhere or in `aria-label` ("Mia Moreno, online").

## 7. Content rules
Initials fallback color is **deterministic from a token ramp, not random**: `index = hash(user.id) % 6` over a stable string hash (FNV-1a 32-bit); pair = `color-avatar-{index+1}-bg` / `-fg` (light: series hue at 16% over white, text = hue mixed 45% with black; dark: hue at 24% over `#111B27`, text = hue mixed 45% with white). Same user → same color on every device and session. Measured fg/bg: light 9.19 / 8.19 / 7.72 / 8.97 / 8.78 / 7.62; dark 6.64 / 7.21 / 6.72 / 6.52 / 6.53 / 6.87 (all ≥ 4.5:1).

## 8. Keyboard & screen reader behavior
Static avatar next to a visible name: `alt=""`/`aria-hidden` (name carries the info). Standalone avatar: `role="img" aria-label="Mia Moreno"`. Interactive avatar is a button/link with the name as label. Groups: `role="group" aria-label="Assignees: Mia Moreno, Ken Ito and 2 others"`; "+N" is a button opening the full list when interactive.

## 9. Tokens used
`radius-round` · `radius-button` (org) · `color-avatar-{1..6}-{bg,fg}` · `color-surface-default` (group ring) · `color-status-{success,warning,danger}-dot` · `color-border-control`.

## 10. Accessibility notes
Initials contrast ≥ 4.5:1 (SC 1.4.3). Presence is not color-only (label/aria). Hit area of interactive avatars ≥ 24px; 32px in topbar has a 36px hit area. Don't encode role/permission in avatar border color.

## 11. Do / Don't
- Do: "MM" in a deterministic blue tint for Mia Moreno everywhere. Don't: a random color on every render.
- Do: group of 4 + "+3". Don't: 12 overlapping circles.
- Do: square avatar for an organization. Don't: round for both people and orgs.
- Do: initials when no photo. Don't: grey silhouette for a person we know.

## 12. Code example
```tsx
const hue = (id: string) => { let h = 0x811c9dc5; for (const c of id) { h ^= c.charCodeAt(0); h = Math.imul(h, 0x01000193); } return (h >>> 0) % 6; };
const tint = ["data-1", "data-2", "data-3", "data-4", "data-5", "data-6"] as const;
// Tailwind classes bg-avatar-1-bg text-avatar-1-fg … bg-avatar-6-bg text-avatar-6-fg come from tokens color-avatar-{1..6}-{bg,fg}
const size = { 24: "size-6 text-[11px]", 32: "size-8 text-caption", 40: "size-10 text-body", 64: "size-16 text-h3" } as const;

export function Avatar({ id, name, src, size: s = 32, presence }: { id: string; name: string; src?: string; size?: 24 | 32 | 40 | 64; presence?: "online" | "away" | "busy" | "offline" }) {
  const [err, setErr] = React.useState(false);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  return (
    <span role="img" aria-label={presence ? `${name}, ${presence}` : name} className={cn("relative inline-flex shrink-0 select-none items-center justify-center rounded-round font-semibold", size[s], !src || err ? `bg-avatar-${hue(id) + 1}-bg text-avatar-${hue(id) + 1}-fg` : "")}>
      {src && !err ? <img src={src} alt="" width={s} height={s} onError={() => setErr(true)} className="size-full rounded-round object-cover" /> : initials}
      {presence && <span aria-hidden className={cn("absolute bottom-0 end-0 size-2 rounded-round ring-2 ring-surface", presence === "online" && "bg-status-success-dot", presence === "away" && "bg-status-warning-dot", presence === "busy" && "bg-status-danger-dot", presence === "offline" && "bg-surface ring-border-control")} />}
    </span>
  );
}
```
(Tailwind classes cannot be built from template strings at runtime — keep a static map of the six class pairs in the real component.)

## 13. Anti-patterns
Random colors per render; generic silhouette for known users; gradient avatar rings; avatar stacks > 4; emoji as avatars; photo avatars with filters; presence by color only; round org logos; avatars used as decoration in empty states; stock-photo "team" images.

## 14. Responsive & density
Sizes do not change by breakpoint; at < 768px stacks show max 3 + "+N". Compact: use 24px in rows.
