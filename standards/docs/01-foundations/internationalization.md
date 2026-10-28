# Internationalization and right-to-left

Design for the longest language and both directions from the start. Library recommendation: **react-i18next** (or FormatJS) for messages, the built-in `Intl` API for numbers, dates and currency. Not installed in the showcase.

## Layout rules (these are enforced by how we write CSS)

1. **Logical properties only.** `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `rounded-s-*`, `rounded-e-*`. Never `ml`, `mr`, `left`, `right`, `text-left` for layout. The showcase already follows this.
2. **Set direction on `<html dir>`** from the locale. Arabic and Hebrew are `rtl`.
3. **Mirror** navigation order, progress direction, chevrons for next and back, sliders, and slide-in drawers. **Do not mirror** logos, media controls (play), clocks, numerals, charts' time axis, phone numbers, code.
4. **Directional icons** (arrow, chevron, undo) use `rtl:-scale-x-100`.
5. **Mixed content** (an English product name inside Arabic text) uses `<bdi>` or `dir="auto"` so punctuation does not jump.

## Text expansion

| Language | Typical growth vs English |
|---|---|
| German, Finnish | +30 to 40% |
| French, Spanish, Portuguese | +20 to 30% |
| Russian | +20% |
| Chinese, Japanese, Korean | −30% width, taller line height |

Rules: buttons grow in width, never fixed. Labels may wrap to 2 lines. No truncation of buttons or tabs. Test every screen with a pseudo-locale that pads strings by 40% and with a 12-character unbroken word.

## Fonts

Inter covers Latin, Cyrillic and Greek. Add **Noto Sans Arabic**, **Noto Sans Hebrew**, **Noto Sans JP/KR/SC** as fallbacks in the font stack; do not scale them separately. CJK body text uses line-height 1.7. Never letter-space Arabic or CJK text (the `tracking-*` headings must be reset under `lang`).

## Formatting (always `Intl`, never hand-built)

```ts
new Intl.NumberFormat(locale, { style: "currency", currency }).format(1250)   // 1.250,00 €  or  $1,250.00
new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone }).format(d)
new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-2, "day")
new Intl.PluralRules(locale).select(n)                                        // "one" | "other" | "few" ...
new Intl.ListFormat(locale, { type: "conjunction" }).format(["a", "b", "c"])
```

- Store dates in UTC ISO, show in the user's time zone, and show the zone when it matters (invoices, scheduled jobs).
- Currency comes from the account, not the language.
- Numbers keep tabular figures; digits may be localized (Arabic-Indic) by `Intl`.
- Sorting uses `Intl.Collator(locale)`.

## Messages

- No string concatenation. Whole sentences with placeholders: `"{count, plural, one {# seat} other {# seats}}"`.
- Keys describe meaning, not text (`billing.cancel.confirm`).
- Give translators context: where it appears, max length, a screenshot.
- Never put text in images or icons. Never build sentences from reusable fragments.
- Pluralization and gender are handled by the message format, not code branches.

## Locale picker

Shows each language in its own name ("Deutsch", "العربية"), not flags. Remembers the choice; defaults from the browser; the URL may carry it (`/de/...`).

## Test checklist

- Switch `dir="rtl"`: sidebar moves to the right, breadcrumbs and steppers reverse, nothing overlaps.
- Pseudo-locale (+40%): no clipped buttons, tabs scroll or wrap cleanly.
- German and Arabic screenshots for pricing, checkout and tables reviewed by a speaker.
- Dates and money differ per locale on invoices.
- Plurals correct for 0, 1, 2, 5, 21.
