# Component API conventions

## 1. Prop naming (fixed vocabulary)
| Prop | Type | Meaning | Rules |
|---|---|---|---|
| `variant` | string union | visual/semantic style (`primary`, `secondary`, `ghost`, `subtle`, `danger`) | one per component; never a boolean per variant |
| `size` | `"sm" \| "md" \| "lg"` (+ `"icon"`) | dimensions | default `md` |
| `tone` | `"neutral" \| "info" \| "success" \| "warning" \| "danger"` | semantic status color | for pills, banners, toasts |
| `loading` | boolean | async pending; component stays focusable, `aria-busy`, ignores activation | not `isLoading` |
| `disabled` | boolean | not operable | prefer `aria-disabled` + reason where users can act |
| `asChild` | boolean | render as child element (Radix `Slot`) | for link-as-button, card-as-link |
| `className` | string | extension via `cn()` | always last in `cn` |
| `open` / `defaultOpen` / `onOpenChange` | | controlled/uncontrolled overlays | |
| `value` / `defaultValue` / `onValueChange` | | controlled/uncontrolled inputs | |
| `children` | node | default slot | |
Event handlers: `onX` (`onSelect`, `onOpenChange`, `onValueChange`). No `isX`/`hasX` prefixes for state props: use `loading`, `selected`, `invalid`, `readOnly`, `required`.

## 2. Rules
1. **Composability first**: compound components (`Card`, `Card.Header`, `Card.Body`) or exported parts (`CardHeader`) over giant prop objects.
2. **`forwardRef` on every component that renders a DOM element** (React 19: `ref` as a prop is acceptable; keep one style per codebase — registry uses `ref` prop with React 19). Spread remaining props onto the root element (`...props`) after defaults, before `className` merge.
3. **No boolean explosion**: ≤ 2–3 boolean props before converting to a `variant`/`size`/`slots` model. `<Button primary large outline round>` is rejected.
4. **Slots over new props**: `leading`, `trailing`, `actions`, `footer` slots (nodes) instead of `leadingIcon`, `leadingIconSize`, `leadingIconColor`.
5. **TypeScript-first**: exported `Props` interfaces extend the native element props (`React.ComponentPropsWithoutRef<"button">`), use discriminated unions for mutually exclusive props, no `any`, no `as` casts in public API.
6. **Controlled and uncontrolled**: any stateful component supports both (`value`+`onValueChange` and `defaultValue`), via a shared `useControllableState` (Radix `@radix-ui/react-use-controllable-state`).
7. **Variants through `cva`**; class merging through `cn(clsx, tailwind-merge)`. No inline `style` for design values.
8. **Tokens only**: no hex, no arbitrary values; spacing/radius/color via theme classes.
9. **No hidden global state**; context only inside compound components; no singleton side effects at import time.
10. **SSR-safe**: no `window`/`document` access during render; `useId` for ids; no layout flicker.
11. **Stable `data-*` hooks**: `data-state`, `data-disabled`, `data-invalid` for styling; `data-slot="button"` for targeting by parents.
12. **Default exports banned**; named exports; one component per file plus its variants.
13. **Defaults are safe**: `type="button"` on buttons, `rel="noopener noreferrer"` on external links, `autoComplete` set explicitly on inputs.

## 3. Required a11y props on interactive components
| Component | Required |
|---|---|
| Icon-only `Button` | `aria-label` (TypeScript enforces via union: `size="icon"` ⇒ `"aria-label": string`) |
| `Input`/`Select`/`Textarea` | associated label (`id` + `Field`), `aria-invalid`, `aria-describedby` |
| `Dialog` | `Title` and `Description` parts (dev warning when missing) |
| `Tabs`, `Menu`, `Combobox`, `Listbox` | keyboard behavior from the primitive; `aria-label` on list roots |
| `Switch`/`Checkbox` | label; `aria-checked` via primitive |
| Toggle `Button` | `aria-pressed` |
| Disclosure | `aria-expanded`, `aria-controls` |
| `Table` sortable header | `aria-sort` |
| `Image` | `alt` required (empty string allowed only with `decorative` prop) |
| Live regions | `role="status"`/`"alert"` per `toasts-and-notifications.md` |
Enforce with `eslint-plugin-jsx-a11y` (`strict` config) and TypeScript types; axe in Storybook.

## 4. Example: enforcing the icon-only label in types
```tsx
type IconOnly = { size: "icon"; "aria-label": string; children: React.ReactNode };
type WithLabel = { size?: "sm" | "md" | "lg"; "aria-label"?: string; children: React.ReactNode };
type ButtonProps = Omit<React.ComponentPropsWithoutRef<"button">, "children"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; loading?: boolean } & (IconOnly | WithLabel);
```

## 5. Documentation per component
Props table generated from TS (Storybook autodocs), keyboard table, token list, "Do/Don't" images, link to the spec in `03-components/`.
