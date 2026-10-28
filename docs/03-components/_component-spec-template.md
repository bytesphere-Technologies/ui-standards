# Component spec template

Every file in `03-components/` repeats these 14 sections, in this order, with these headings. A spec missing a section is not reviewable. Copy this file, rename, fill.

| # | Section | Must contain |
|---|---|---|
| 1 | **Purpose** | One sentence: the user job this component does |
| 2 | **When to use / when not to** | Two lists; "not to" names the component to use instead |
| 3 | **Anatomy** | Numbered, annotated parts (1 container, 2 icon, 3 label …) with a text diagram |
| 4 | **Variants** | Table: variant · use · token set |
| 5 | **Sizes** | Table: size · height · padding · font · icon |
| 6 | **States** | default · hover · focus-visible · active · selected · disabled · loading · error · read-only — each with its visual change in tokens; mark "n/a" with a reason, never omit |
| 7 | **Content rules** | Label length (chars), sentence case, verb-first for actions, truncation behavior |
| 8 | **Keyboard & screen reader behavior** | Key map table; role, name, state announcements; APG pattern link |
| 9 | **Tokens used** | Exact semantic/component token names. No primitives |
| 10 | **Accessibility notes** | Contrast values, target sizes, WCAG SC numbers, live-region behavior |
| 11 | **Do / Don't** | Paired visual descriptions (≥ 3 pairs) |
| 12 | **Code example** | React + Tailwind v4 + shadcn/ui + cva; real token class names; compiles |
| 13 | **Anti-patterns** | Numbered list of things reviewers reject, each tied to a `07-antipatterns` item where one exists |
| 14 | **Responsive & density** | Behavior at 320 / 768 / 1440, comfortable vs compact |

## Skeleton

```md
# <Component>
## 1. Purpose
## 2. When to use / when not to
## 3. Anatomy
## 4. Variants
## 5. Sizes
## 6. States
## 7. Content rules
## 8. Keyboard & screen reader behavior
## 9. Tokens used
## 10. Accessibility notes
## 11. Do / Don't
## 12. Code example
## 13. Anti-patterns
## 14. Responsive & density
```

## Authoring rules
1. Numbers, not adjectives: "36px", "150ms", "4.5:1".
2. Token names, not hex.
3. Code uses the registry import path `@bytesphere/ui/ui/<name>` and class names that exist in the Tailwind theme (`bg-action-primary`, `text-secondary`, `border-subtle`, `rounded-button`).
4. The code example must pass `tsc --noEmit` and axe in Storybook.
5. Compact specs: for components that only need part of a section (e.g. no loading state), write `n/a — <reason>`. Never delete the heading.

## Shared Tailwind class vocabulary (used in every example)

| Class | Token |
|---|---|
| `bg-surface` / `bg-surface-raised` / `bg-surface-sunken` / `bg-surface-overlay` | `color-surface-*` |
| `text-primary` / `text-secondary` / `text-tertiary` / `text-inverse` | `color-text-*` |
| `border-subtle` / `border-strong` / `border-control` | `color-border-*` |
| `bg-action-primary` `hover:bg-action-primary-hover` `active:bg-action-primary-active` `text-action-primary-fg` | `color-action-primary-*` |
| `ring-focus ring-offset-focus-offset` | `color-focus-ring`, `color-focus-ring-offset` |
| `bg-status-success-bg border-status-success-border text-status-success-fg` | `color-status-success-*` |
| `rounded-control` / `rounded-button` / `rounded-card` / `rounded-modal` | `radius-*` |
| `shadow-raised` / `shadow-dropdown` / `shadow-modal` | `shadow-*` |
| `h-(--control-md)` / `min-h-(--row)` | density variables |
