# Search and command palette

Library: **cmdk** (github.com/pacocoursey/cmdk, MIT) wrapped by shadcn/ui `Command` / `CommandDialog`.

## 1. Purpose
Get to any object or action by typing, without navigating.

## 2. When to use / when not to
Use: global search in the top bar with ⌘K (objects + commands), page-scoped search in toolbars, a full results page for exploratory search. Not: filtering a visible table (use the table toolbar search); search as the only way to reach top-level destinations (nav must exist).

## 3. Anatomy
```
Topbar:  [ 🔍 Search…                    ⌘K ]     ← 1 trigger field (button styled as input), 360px, opens palette
Palette (modal, 640px):
┌──────────────────────────────────────────────┐
│ 🔍  Type a command or search…           [Esc] │  2 input (48px)
├──────────────────────────────────────────────┤
│ Recent                                        │  3 group label (overline)
│  ▸ Apollo project                  Projects   │  4 result: icon · title (highlighted match) · type
│ Projects                                      │
│  ▸ Apollo                                     │
│ Actions                                       │
│  ▸ Create project                      C P    │  5 shortcut
├──────────────────────────────────────────────┤
│ ↑↓ navigate   ↵ open   ⌘↵ open in new tab     │  6 hint footer
└──────────────────────────────────────────────┘
```

## 4. Variants
| Variant | Spec |
|---|---|
| Global palette | modal, 640px wide, max-height 420px list |
| Inline search | field in toolbar/popover, results below as listbox |
| Results page | `/search?q=`: filters left (240px), results list center, query highlighted; see `04-patterns/search-filter-and-sort.md` |
| Scoped palette | prefix `>` commands, `@` people, `#` projects (documented in the empty state) |

## 5. Sizes
Trigger 36px high × 360px (flex on tablet; icon-only 36px on mobile). Palette input 48px, result rows 40px (36 compact), group label 28px, max 8 results per group, max 50 total, footer 36px. Radius 12; shadow-modal; z-modal.

## 6. States
| State | Spec |
|---|---|
| default (empty query) | **Recent** (last 5 opened) + **Suggested actions** (≤ 5) |
| typing | results filter within 100ms (local) or after 200ms debounce (remote) with 150ms-delayed inline spinner at input end; keep old results dimmed to 60% until new arrive |
| highlighted | row bg `action-ghost-hover` + `aria-selected`; scroll into view |
| loading | skeleton rows (3) after 150ms; never blank |
| empty (no results) | "No results for ‘xyz’" + 3 suggestions: check spelling, try fewer words, "Search all workspaces" link; shows the 3 most relevant commands |
| error | "Search is unavailable. Retry" + local commands still work |
| disabled/read-only/selected | n/a |

## 7. Content rules
Placeholder "Search or run a command…" (placeholder is acceptable here only because the control has an `aria-label`; the trigger shows the ⌘K hint). Results: title (match in `text-primary` semibold; rest regular), secondary type label right in `text-tertiary`. Group order: Recent, Best match, Projects, People, Docs, Actions. Match highlighting: bold weight (600) plus `mark`-like underline offset — never yellow background. Commands are verb-first ("Create project", "Invite member").

## 8. Keyboard & screen reader behavior
| Key | Behavior |
|---|---|
| ⌘K / Ctrl+K, `/` | open palette from anywhere (not inside inputs for `/`) |
| ↑ ↓ | move; wraps; Home/End first/last |
| Enter | run/open; ⌘Enter new tab; Shift+Enter secondary action |
| Tab | does not move through results (arrows do); Tab moves to the footer actions, then closes the palette |
| Esc | clears the query if non-empty, else closes; returns focus to the trigger |
| Backspace on empty | removes scope prefix |
`role="combobox"` input with `aria-controls`, `aria-activedescendant`; list `role="listbox"`, options `role="option"`; result count announced via polite live region ("12 results"). The shortcut is listed in the keyboard help (`?`).

## 9. Tokens used
`component-modal-*` · `color-surface-overlay` · `color-border-subtle` · `color-action-ghost-hover` · `color-text-{primary,secondary,tertiary}` · `typography-body` · `size-icon-sm` · `z-modal`.

## 10. Accessibility notes
Trigger is a `<button>` with `aria-keyshortcuts="Meta+K Control+K"`. Highlight uses weight+underline, not color. Results reachable without a pointer. Don't trap hover-only previews. SC 2.1.4: single-key `/` shortcut disabled when typing and user-remappable.

## 11. Do / Don't
- Do: recent items and 5 suggested actions on open. Don't: an empty box with a blinking cursor.
- Do: "No results for ‘apolo’ — check spelling or search all workspaces". Don't: "No results".
- Do: bold the matching characters. Don't: yellow highlighter backgrounds.
- Do: Esc clears, second Esc closes. Don't: Esc losing the typed query without a way back.

## 12. Code example
```tsx
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";

export function CommandPalette({ open, onOpenChange, results, onSelect, loading }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay bg-overlay-scrim" />
        <Dialog.Content aria-label="Command palette" className="fixed start-1/2 top-[15vh] z-modal w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-modal border border-subtle bg-surface-overlay shadow-modal">
          <Command loop label="Command palette" shouldFilter={false}>
            <div className="flex h-12 items-center gap-2 border-b border-subtle px-4">
              <Search className="size-5 text-tertiary" aria-hidden />
              <Command.Input autoFocus placeholder="Search or run a command…" aria-label="Search or run a command" className="h-full flex-1 bg-transparent text-body text-primary outline-none placeholder:text-input-placeholder" />
              <kbd className="rounded-control border border-subtle px-1.5 font-mono text-caption text-tertiary">Esc</kbd>
            </div>
            <Command.List className="max-h-[26rem] overflow-y-auto p-2">
              {loading && <Command.Loading><span className="sr-only">Loading results</span></Command.Loading>}
              <Command.Empty className="px-3 py-8 text-center text-body text-secondary">No results. Check spelling or try fewer words.</Command.Empty>
              {results.map((g) => (
                <Command.Group key={g.id} heading={g.label} className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-overline [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-caps [&_[cmdk-group-heading]]:text-tertiary">
                  {g.items.map((i) => (
                    <Command.Item key={i.id} value={i.id} onSelect={() => onSelect(i)} className="flex h-10 items-center gap-2 rounded-button px-3 text-body text-primary data-[selected=true]:bg-action-ghost-hover">
                      <i.icon className="size-4 text-tertiary" aria-hidden /><span className="truncate">{i.title}</span>
                      <span className="ms-auto text-body-sm text-tertiary">{i.type}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

## 13. Anti-patterns
Search that only matches on exact titles; palette without Recent; yellow highlight; results that reorder under the cursor while typing; search requiring Enter to start (for local data); mouse-only trigger; "No results" with no help; autofocusing the page search on every route; search history stored with PII in analytics.

## 14. Responsive & density
< 768px: trigger collapses to a 44px search icon button; palette is full-screen sheet with a 48px input and "Cancel". 768+: modal 640px. Compact: result rows 36px.
