# Internationalization and RTL

## 1. Strings
1. **No hardcoded user-facing strings** in components. Every string is a message key in ICU MessageFormat via `next-intl` (next-intl.dev) or `react-i18next` — one per product.
2. Keys describe location and meaning: `projects.empty.title`, not `text1`. Never build sentences by concatenation; use placeholders and ICU plurals: `{count, plural, one {# project} other {# projects}}`.
3. Include translator context (`description`) per key; no screenshots needed in code but required in the TMS.
4. Default locale `en`; fallback chain `xx-YY → xx → en`. Missing key in non-English fails CI for release locales, warns in dev.
5. Alt text, aria-labels, titles, toast text, and validation messages are all translatable. Zod error messages use the i18n map.

## 2. Text expansion budget
Design every control and layout for **+30%** string length (German, Finnish) and +50% for short strings (< 10 chars). Rules: no fixed-width buttons or labels; min-width not max-width; wrap or truncate with title; test with pseudo-locale `en-XA` (adds accents and +35% padding) in Storybook. Tables: columns auto-size, header wrap allowed to 2 lines. CJK: line-height ≥ 1.5, no letter-spacing, no uppercase transforms.

## 3. Logical CSS properties (mandatory)
| Physical (banned) | Logical (required) | Tailwind v4 |
|---|---|---|
| `margin-left/right` | `margin-inline-start/end` | `ms-*` `me-*` |
| `padding-left/right` | `padding-inline-start/end` | `ps-*` `pe-*` |
| `left/right` | `inset-inline-start/end` | `start-*` `end-*` |
| `text-align: left/right` | `start` / `end` | `text-start` `text-end` |
| `border-left` | `border-inline-start` | `border-s` `border-e` |
| `float: left` | `inline-start` | — |
| `rounded-l/r` | `rounded-s/e` | `rounded-s-*` `rounded-e-*` |
Use `dir` on `<html>` (`dir="rtl"`), never CSS `direction` hacks. ESLint rule bans `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right` in product code.

## 4. Number, date, currency, units
All through `Intl`: `Intl.NumberFormat(locale, {style:"currency", currency})`, `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.ListFormat`, `Intl.PluralRules`. Never hand-format. Store dates as ISO 8601 UTC; show in the user's time zone with the zone abbreviation on ambiguity. Currency symbol/position per locale; amounts in tables right-aligned tabular (in RTL: still the numeric column aligned to the end side). First day of week per locale. Digits: respect locale numerals (Arabic-Indic) via `Intl` automatically; `tabular-nums` still applied. Sorting with `Intl.Collator`.

## 5. RTL mirroring rules
| Mirror | Do not mirror |
|---|---|
| Layout order (sidebar moves to the right), flex/grid direction | Logos and brand marks |
| Directional icons: chevrons, arrows, back/forward, send, undo/redo, list-indent, progress direction | Charts: x-axis time still runs left→right; axis labels mirrored position only for category lists; legends follow RTL |
| Text alignment, input caret, padding/margins | Numbers and Latin text runs inside RTL (bidi handles) |
| Sliders and progress bars fill direction | Media controls (play ▶ triangle), clocks, checkmarks, search magnifier, plus/minus, trash |
| Breadcrumb separators, tab order, pagination (Prev on the right) | Phone numbers, code, URLs (isolate with `<bdi>` / `dir="ltr"`) |
| Toast position (bottom-left in RTL) | Keyboard shortcut glyphs |
Implementation: `rtl:-scale-x-100` on directional icons; user-generated text uses `dir="auto"`; wrap mixed-direction snippets in `<bdi>`. Test every component and page with `dir="rtl"` in Storybook (toolbar toggle) and Arabic/Hebrew sample strings.

## 6. Locale UX
1. Language selector shows each language in its own name ("Deutsch", "العربية"), not flags.
2. Locale from URL path or user setting (not IP); persisted in profile; `lang` attribute set on `<html>` and on foreign-language fragments.
3. Fonts: Inter covers Latin, Cyrillic, Greek; add Noto Sans Arabic / Hebrew / CJK as system-fallback-first stacks with subsetting; never rely on faux bold.
4. Formats of names: avoid first/last assumptions (single "Full name" field unless legally needed).
5. No text in images; no concatenated plurals; no gendered UI strings without ICU select.
6. Addresses and phone fields adapt per country (libphonenumber for validation).

## 7. Checklist per component
- [ ] strings externalized · [ ] +30% width OK · [ ] logical properties only · [ ] RTL story · [ ] directional icons flip · [ ] `Intl` for all formatting · [ ] pseudo-locale story passes · [ ] no sentence concatenation
