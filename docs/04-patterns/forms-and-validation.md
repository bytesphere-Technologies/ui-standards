# Forms and validation

One rule set for every form. Library: **React Hook Form** for state and **Zod** for schemas (one schema shared by client and server).

## Field rules

| Topic | Rule |
|---|---|
| Label | Visible, above the field, always. Placeholder is an example, never the label |
| Required | Mark the exception: "Optional" on optional fields. Do not use asterisks |
| Help text | Under the field, before the user types. One sentence |
| Error text | Under the field, replaces help text, names the fix: "Enter an email like name@company.com" |
| Types | `type`, `inputMode` and `autoComplete` on every field (email, tel, url, decimal, one-time-code, cc-number) |
| Width | Matches expected input: 6 digits is narrow, name is medium, address is full |
| Order | Order follows the user's mental model, not the database |

## When to validate

1. **On blur** for the first time a field is left. After the first error, re-validate **on change** so the error clears as soon as it is fixed.
2. **On submit** validate everything, move focus to the first invalid field, and show a summary only if there are more than 3 errors.
3. Never validate empty untouched fields on load.
4. Server errors map to fields when possible (`errors.email`), else show a banner above the form.

## Submit behaviour

- The primary button is enabled. If the form is invalid, submit shows the errors; do not disable the button to hide the problem. (Disabled is only for "not enough yet" in wizards, with a reason.)
- While pending: button shows a spinner and a present-participle label ("Saving"), keeps its width, and the form ignores a second submit.
- Success: toast for in-place edits ("Profile updated"), navigation for creates.
- Preserve input on error. Never clear a field the user typed.
- Unsaved changes: warn on leave only for forms with more than 3 fields or any long text.

## Example (copy this)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Field, Input } from "@bytesphere/ui";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.string().email("Enter an email like name@company.com"),
  seats: z.coerce.number().int().min(1, "At least 1 seat").max(500, "Contact sales for more than 500"),
});
type Values = z.infer<typeof schema>;

export function InviteForm({ onSave }: { onSave: (v: Values) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), mode: "onBlur", reValidateMode: "onChange" });
  return (
    <form onSubmit={handleSubmit(onSave)} noValidate className="flex flex-col gap-4">
      <Field id="name" label="Name" error={errors.name?.message}>{(p) => <Input {...p} autoComplete="name" {...register("name")} />}</Field>
      <Field id="email" label="Work email" error={errors.email?.message}>{(p) => <Input {...p} type="email" autoComplete="email" {...register("email")} />}</Field>
      <Field id="seats" label="Seats" error={errors.seats?.message}>{(p) => <Input {...p} inputMode="numeric" {...register("seats")} />}</Field>
      <Button type="submit" variant="primary" loading={isSubmitting}>{isSubmitting ? "Sending" : "Send invite"}</Button>
    </form>
  );
}
```

## Common field specs

| Field | Rule | Error copy |
|---|---|---|
| Email | RFC-valid, trimmed, lower-cased on save | "Enter an email like name@company.com" |
| Password | 8+ characters, no composition rules, allow paste, show/hide, strength meter | "Use at least 8 characters" |
| Phone | Accept spaces and dashes, store E.164 | "Enter a phone number with country code" |
| Money | Decimal input, two decimals, currency from context | "Enter an amount like 1250.00" |
| Date | Native date input on mobile; accept ISO | "Use the format YYYY-MM-DD" |
| URL | Must start with https:// | "Use a full https:// address" |
| Postal code | Per country pattern | "Enter a valid postal code for Germany" |
| Name | One free field; never split unless a system needs it; allow any characters | "Enter your name" |

## Accessibility

- Errors use `aria-invalid` and `aria-describedby` (the `Field` component does this).
- Error container is a live region when created after submit.
- Focus moves to the first invalid field on failed submit.
- Group related radios and checkboxes in `fieldset` with `legend`.

## Test checklist

- Submitting empty shows one error per required field and focuses the first.
- Fixing a field clears its error without another blur.
- Double-click on submit sends once.
- Browser autofill fills name, email, address and card fields.
- Server error for one field appears under that field.
