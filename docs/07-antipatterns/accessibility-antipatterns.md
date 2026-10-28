# Accessibility anti-patterns

Each is a PR blocker (`A11Y`). Format: **Pattern** → why it fails (WCAG 2.2 SC) → fix.

| # | Anti-pattern | Why it fails | Fix |
|---|---|---|---|
| 1 | **Placeholder as label** | Label disappears on input; low contrast; unreliable name (1.3.1, 3.3.2, 4.1.2) | Visible `<label>` above the field; placeholder only for an example |
| 2 | **`outline: none` without replacement** | No visible focus (2.4.7, 2.4.11) | `focus-visible:ring-2 ring-focus ring-offset-2` |
| 3 | **Icon-only button with no accessible name** | Screen readers announce "button" (4.1.2, 2.5.3) | `aria-label` + tooltip |
| 4 | **Hover-only affordances** | Invisible to keyboard/touch (2.1.1, 1.4.13) | Show on `focus-within`; always visible on touch |
| 5 | **Color-only status** | Color-blind users miss it (1.4.1) | Icon + label text; pills have words |
| 6 | **Mystery-meat navigation** | Icons with no labels; meaning unknown (2.4.6, 3.2.4) | Labels visible at ≥ 240px sidebar; tooltips in rail |
| 7 | **Disabled submit with no reason** | Users can't discover what's wrong (3.3.1, 3.3.3) | Keep enabled; validate on submit; or show reason text |
| 8 | **`div` with `onClick`** | Not focusable, no role, no keyboard (2.1.1, 4.1.2) | `<button>` / `<a href>` |
| 9 | **Modal without focus trap / return** | Keyboard users lose place (2.4.3, 2.4.11) | Radix Dialog; test Esc and focus return |
| 10 | **Positive `tabindex`** | Breaks natural order (2.4.3) | DOM order; `tabindex="0"`/`-1` only |
| 11 | **Auto-dismissing toast with essential info** | Disappears before reading (2.2.1, 4.1.3) | ≥ 5s, pausable; errors persist; info also on page |
| 12 | **Low-contrast "tertiary" text** | Fails 4.5:1 (1.4.3) | `text-tertiary` token (5.40:1) |
| 13 | **Contrast of UI boundaries ignored** | Light-gray input borders at 1.4:1 (1.4.11) | `border-control` 3.75:1 |
| 14 | **Focus hidden by sticky header** | Focused element under topbar (2.4.11) | `scroll-padding-top` ≥ sticky height |
| 15 | **Drag-only reorder** | No alternative to dragging (2.5.7) | Move up/down buttons or menu |
| 16 | **Target smaller than 24×24** | Hard to press (2.5.8) | 24px minimum incl. hit-area; 44px touch |
| 17 | **Disabling zoom** (`user-scalable=no`) | Blocks magnification (1.4.4) | Never set; support 200% |
| 18 | **Text in images / SVG text without alternative** | Not resizable or readable (1.4.5, 1.1.1) | Real text; `alt` that matches |
| 19 | **Auto-playing carousels / video** | Can't pause (2.2.2) | User-controlled; pause control |
| 20 | **Error messages not associated with fields** | SR doesn't hear errors (3.3.1, 1.3.1) | `aria-describedby` + `aria-invalid`; summary with links |
| 21 | **"Click here" / "Read more" links** | No context out of page (2.4.4) | Describe destination |
| 22 | **Custom select/menu without arrow-key support** | Unusable by keyboard (2.1.1) | Radix/React Aria primitives |
| 23 | **Skipped heading levels / multiple h1** | Broken outline (1.3.1, 2.4.6) | One h1; sequential levels |
| 24 | **`aria-label` that contradicts visible text** | Voice control fails (2.5.3) | Name contains visible label |
| 25 | **Live region injected with content at the same time** | Not announced (4.1.3) | Region exists first; content updates |
| 26 | **CAPTCHA puzzle as sole login path** | Cognitive test barrier (3.3.8) | Passkeys, email link, alternatives |
| 27 | **Blocking paste in password/OTP fields** | Breaks password managers (3.3.8) | Allow paste |
| 28 | **Timeouts without warning** | Data loss (2.2.1) | Warn 60s before; extend option |
| 29 | **`title` as the only tooltip / name** | Not keyboard/touch accessible (1.4.13) | Real tooltip on focus + aria-label |
| 30 | **Opening new tabs without notice** | Disorients (3.2.5 advisory) | Icon + sr text "(opens in new tab)" |
| 31 | **Status in `aria-hidden` containers** | Silenced meaning | Keep text accessible; hide only decoration |
| 32 | **Animation that ignores `prefers-reduced-motion`** | Vestibular triggers (2.3.3 AAA, best practice) | Reduce/remove motion |
| 33 | **Redundant entry in multi-step flows** | Burdens memory (3.3.7) | Prefill from earlier steps |
| 34 | **Hidden focusable content** (off-screen drawers) | Focus enters invisible UI (2.4.3) | `inert` / `visibility:hidden` when closed |
| 35 | **Reflow failure at 320px** | 2D scroll (1.4.10) | Responsive layout; table/code exceptions only |
