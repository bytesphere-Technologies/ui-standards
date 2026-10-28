# Profile and account menu

## 1. Purpose
One predictable place for identity, organization context, preferences, and sign out.

## 2. When to use / when not to
Use in every authenticated shell, top-right of the top bar. Not: in the sidebar footer simultaneously (pick one per product; this system picks the topbar); for destructive account actions (those live in Settings → Account).

## 3. Anatomy
```
[🔔 3] [?]  [ (MM) ▾ ]                     ← trigger: 32px avatar button
┌───────────────────────────────┐
│ Mia Moreno                    │  1 header: name 14/600, email 13 secondary (truncate)
│ mia@acme.com                  │
├───────────────────────────────┤
│ Acme Inc.            ⌄ switch │  2 org switcher row (multi-tenant)
├───────────────────────────────┤
│ Account settings              │  3 items 36px
│ Notifications            (3)  │
│ Theme            System ▸     │  4 theme submenu: System / Light / Dark (radio)
│ Keyboard shortcuts       ?    │
│ Help and support              │
├───────────────────────────────┤
│ Sign out                      │  5 sign out: last, after a divider
└───────────────────────────────┘
```

## 4. Variants
| Variant | Use |
|---|---|
| Single-tenant | no org row |
| Multi-tenant | org row opens a switcher submenu/popover (search when > 7 orgs) with the current org checked, "Create organization" at the bottom |
| Impersonation (support) | persistent banner + menu shows "Stop viewing as …" |

## 5. Sizes
Trigger avatar **32px**, 36px hit area. Menu width 280px, item height 36px, header padding 12×12, org row 44px with 24px org avatar. Max height `min(480px, 100dvh − 72px)`, scroll inside.

## 6. States
Trigger: default · hover `action-ghost-hover` ring · focus-visible ring · open (`aria-expanded`) · loading (avatar skeleton circle) · error (initials fallback, never broken image). Org switching: item shows spinner 16px while the switch resolves; on success the page reloads in the new org context with a toast "Switched to Beta Co." Disabled item (no permission): hidden if never available, `aria-disabled` + reason if plan-gated.

## 7. Content rules
Order is fixed: identity header → org → account settings → notifications → theme → help → keyboard shortcuts → divider → sign out. Sentence case. Notification count is a badge on the item (max `99+`). **Never place destructive actions (delete account, leave org, revoke sessions) in the header menu.** Sign out has no confirm dialog unless unsaved work exists.

## 8. Keyboard & screen reader behavior
Trigger `<button aria-label="Account menu for Mia Moreno" aria-haspopup="menu" aria-expanded>`. Menu per APG menu button (↑↓, Home/End, type-ahead, →/← submenus, Esc returns focus to trigger). Org switcher is a submenu: → opens, current org `role="menuitemradio" aria-checked`. Theme: `menuitemradio`. Shortcut `⌘⇧A` optional to open the menu.

## 9. Tokens used
`component-menu-*` · `size-icon-md` · `color-surface-overlay` · `color-border-subtle` · `color-action-ghost-hover` · `color-text-{primary,secondary}` · `z-dropdown`.

## 10. Accessibility notes
Avatar image `alt=""` because the button has a name. Email never truncated without title. Sign out is a `<form method="post">` button, not a link, to avoid prefetch/CSRF issues. SC 3.2.6 consistent help (Help item in the same position everywhere).

## 11. Do / Don't
- Do: avatar 32px, name + email header, sign out last after a divider. Don't: sign out in the middle among settings.
- Do: org switcher shows the current org checked and searchable past 7. Don't: a full-page tenant chooser on every login.
- Do: theme as System/Light/Dark radios. Don't: a sun/moon toggle with no System option.
- Do: "Account settings" leads to a page with delete-account. Don't: "Delete account" in the dropdown.

## 12. Code example
```tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@bytesphere/ui/ui/avatar";

export function AccountMenu({ user, orgs, currentOrgId, onSwitch, onTheme, theme }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label={`Account menu for ${user.name}`} className="rounded-round focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focus-offset">
        <Avatar size={32} name={user.name} id={user.id} src={user.image} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={8} className="z-dropdown w-70 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">
          <div className="px-3 py-2"><p className="truncate text-body font-semibold text-primary">{user.name}</p><p className="truncate text-body-sm text-secondary" title={user.email}>{user.email}</p></div>
          <DropdownMenu.Separator className="my-1 h-px bg-[--color-border-subtle]" />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="menu-item">Organization: {orgs.find(o => o.id === currentOrgId)?.name}</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="z-dropdown min-w-56 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">
              <DropdownMenu.RadioGroup value={currentOrgId} onValueChange={onSwitch}>
                {orgs.map(o => <DropdownMenu.RadioItem key={o.id} value={o.id} className="menu-item">{o.name}</DropdownMenu.RadioItem>)}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Item asChild className="menu-item"><a href="/settings/account">Account settings</a></DropdownMenu.Item>
          <DropdownMenu.Item asChild className="menu-item"><a href="/notifications">Notifications</a></DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="menu-item">Theme</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="z-dropdown rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">
              <DropdownMenu.RadioGroup value={theme} onValueChange={onTheme}>
                {["system", "light", "dark"].map(t => <DropdownMenu.RadioItem key={t} value={t} className="menu-item capitalize">{t}</DropdownMenu.RadioItem>)}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Item asChild className="menu-item"><a href="/help">Help and support</a></DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-[--color-border-subtle]" />
          <form action="/auth/sign-out" method="post"><DropdownMenu.Item asChild className="menu-item"><button type="submit" className="w-full text-start">Sign out</button></DropdownMenu.Item></form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
// .menu-item = "flex h-9 items-center gap-2 rounded-button px-3 text-body text-primary outline-none data-[highlighted]:bg-action-ghost-hover"
```

## 13. Anti-patterns
Destructive actions in the header menu; sign out mid-list; unlabeled avatar trigger; generic silhouette for a known user; user's email as only identity; org switcher hidden in settings for multi-tenant products; theme toggle without System; menu that opens on hover.

## 14. Responsive & density
< 768px: the trigger remains 32px with a 44px hit area; menu becomes a bottom sheet with the same order. Org switcher becomes a full-height sheet with search. Density unaffected for the topbar.
