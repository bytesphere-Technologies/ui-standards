# Mobile standard

Live demo: showcase `#/mobile` (two working phone frames). Tokens that change on mobile are in `packages/ui/src/styles/index.css` under "Mobile standard".

## Breakpoints

| Name | Width | Layout |
|---|---|---|
| Mobile | < 640 px | One column, bottom tabs or drawer, sheets instead of modals |
| Tablet | 640 to 1023 px | Two columns where useful, rail or drawer navigation |
| Desktop | 1024 px and up | Sidebar, multi-column, popovers |

Write base styles for mobile, then add `sm:` and `lg:` upward. Test at 360, 390, 768, 1280.

## Sizes (change below 640 px or on coarse pointers)

| Token | Desktop | Mobile |
|---|---|---|
| `--control-sm` | 32 px | 40 px |
| `--control-md` | 36 px (32 compact) | 44 px |
| `--control-lg` | 40 px | 48 px |
| `--row` | 40 px | 48 px |
| `--row-nav` | 36 px | 44 px |
| Field text | 14 px | 16 px (prevents iOS zoom) |

Tap targets are at least 44 x 44 px with 8 px between neighbours. Icon-only buttons keep a 44 px hit area even if the glyph is 20 px.

## Navigation

| App shape | Mobile navigation |
|---|---|
| 2 to 5 top-level destinations | Bottom tabs, 56 px high, label always visible, badge on the icon |
| 6 or more | Top bar with menu button opening a drawer; search icon in the bar |
| Marketing or store | Top bar, menu drawer with drill-down, sticky search |
| Checkout or flow | Bare header: close or back, progress, nothing else |

Never show both bottom tabs and a drawer listing the same items. The back action is top-left. The primary action sits in the thumb zone: a sticky bottom bar (forms) or a 56 px FAB (create), never both.

## Component transformations

| Desktop | Mobile |
|---|---|
| Data table | List of rows: title, one secondary line, one status pill, chevron. Tap opens detail |
| Modal | Bottom sheet: drag handle, 90% max height, scrim tap closes, safe-area padding |
| Dropdown menu | Action sheet with 48 px rows, destructive last and in danger color |
| Side drawer | Full-height sheet |
| Multi-column form | One column, one task per screen above 6 fields, Continue pinned at the bottom |
| Hover tooltip | Inline helper text; tooltips never carry required information |
| Tabs (many) | Horizontally scrollable segmented control with edge fade |
| Filters bar | Single "Filters" button opening a sheet, with result count on the apply button |
| Calendar month grid | Dots under the day number; tap shows the day list below |
| Split detail pane | Separate screen with back |

## Forms

- Set `type`, `inputMode` and `autoComplete` on every field (`email`, `tel`, `decimal`, `cc-number`).
- Labels above fields, always visible. No placeholder-only labels.
- Keep entered data when stepping back.
- Show validation next to the field on blur, and move focus to the first error on submit.

## Gestures

Swipe, long-press and pull-to-refresh are shortcuts. Each has a visible button doing the same thing. Do not capture the edge-swipe used for system back.

## Safe areas and viewport

Use `100dvh`, not `100vh`. Pad fixed bottom bars with `env(safe-area-inset-bottom)` (`.pb-safe`) and fixed top bars with `env(safe-area-inset-top)` (`.pt-safe`). Set `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.

## Content

Body 16 px, line-height 24 to 28 px. Headlines wrap up to 3 lines, no truncation. Truncate only list titles, to one line, with the full text in detail. Buttons are full width in sheets and sticky bars.

## Test checklist

- No horizontal page scroll at 360 px.
- Every tappable element measures at least 44 px (inspect with the device toolbar).
- Focus a text field on iOS Safari: page does not zoom.
- Rotate to landscape: sticky bars do not cover content.
- Keyboard open: the primary action stays reachable.
- Reduced motion on: sheets fade instead of sliding.
