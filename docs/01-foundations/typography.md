# Typography

## 1. Font decision

| Role | Face | License | Source | Decision |
|---|---|---|---|---|
| UI / body / headings | **Inter** (variable) | SIL OFL 1.1 | rsms.me/inter | **Chosen.** Tall x-height, tabular figures (`tnum`), disambiguated glyphs (`ss02`, `cv11` optional), free to self-host |
| Alternate (approved, per-product) | Geist | SIL OFL 1.1 | vercel.com/font | Allowed if a product commits to it entirely. One sans per product |
| Marketing display (h1/display only) | **Poppins** 600/700 | SIL OFL 1.1 | fonts.google.com/specimen/Poppins | Matches the ByteSphere wordmark and brand guideline headings. Never in product screens, tables, forms or body text |
| Monospace | Geist Mono | SIL OFL 1.1 | vercel.com/font | code, IDs, API keys |

**Brand note:** the ByteSphere logo and the brand guideline headings are set in Poppins (SIL OFL 1.1). The standard keeps Inter for product UI because of its tabular figures and density at 14px; Poppins is allowed for marketing display/h1 only (one decision for the design lead, see README open questions). Never mix both in one block.

Rationale: OFL permits self-hosting and subsetting with no per-seat fee; Inter's numeric features suit data UI.

Fallback stack (system, identical metrics goal via `size-adjust` fallback face):

```css
--font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
```

Loading: self-host WOFF2, variable font subset to Latin + Latin-Extended, `font-display: swap`, preload the roman variable file only. Max 2 families on any one route: product routes load Inter + Geist Mono; marketing routes load Inter + Poppins (+ Geist Mono only if they show code). Details in `06-engineering/performance-budget.md`.

OpenType features: keep Inter defaults. Enable only `font-variant-numeric: tabular-nums` where §4 says so.

## 2. Type scale

Root = 16px. `rem` is the unit in code; px shown for review.

| Style | Token | rem | px | Line height | Letter-spacing | Weight | Use |
|---|---|---|---|---|---|---|---|
| display | `typography-display` | 3 | 48 | 4rem (64) | −0.02em | 600 | Marketing hero only |
| h1 | `typography-h1` | 2 | 32 | 2.5rem (40) | −0.02em | 600 | Page title (marketing); 24px in product page headers (use h2) |
| h2 | `typography-h2` | 1.5 | 24 | 2rem (32) | −0.01em | 600 | Page header title in product; section title |
| h3 | `typography-h3` | 1.25 | 20 | 1.75rem (28) | −0.01em | 600 | Card / panel group title |
| h4 | `typography-h4` | 1 | 16 | 1.5rem (24) | 0 | 600 | Card title, modal title, form section |
| body-lg | `typography-body-lg` | 1 | 16 | 1.5rem (24) | 0 | 400 | Marketing body, long-form docs |
| **body** | `typography-body` | 0.875 | **14** | 1.25rem (20) | 0 | 400 | **Default product text** |
| body-sm | `typography-body-sm` | 0.8125 | 13 | 1.125rem (18) | 0 | 400 | Table secondary text, helper text |
| caption | `typography-caption` | 0.75 | 12 | 1rem (16) | 0 | 400 | Timestamps, pills (600), chart axis |
| overline | `typography-overline` | 0.6875 | 11 | 1rem (16) | +0.06em | 600 | Section label above a group; the only uppercase style besides pill labels |
| code | `typography-code` | 0.8125 | 13 | 1.25rem (20) | 0 | 400 | Inline code, IDs, logs |

Page title in product = **h2 (24px)**. h1/display are marketing only. A product screen with a 32px+ title fails review.

Responsive (marketing only): `display: clamp(2rem, 1.4rem + 2.5vw, 3rem)`, `h1: clamp(1.75rem, 1.4rem + 1.5vw, 2rem)`. Product type does not scale with viewport.

## 3. Weights

Three allowed: **400 regular, 500 medium, 600 semibold**. Max **3 weights on one screen**; in practice 400 + 600. 700+ is banned (renders heavy at 14px, collapses hierarchy against 600).

### When NOT to bold
1. Not in table body cells (bold only the row's primary identifier, once per row).
2. Not on entire sentences or paragraphs of helper text.
3. Not inside buttons beyond the specified 500 weight.
4. Not to emphasize more than one phrase per paragraph.
5. Not as a substitute for hierarchy: change size first, then weight.

## 4. Numbers

1. Every number in a table, KPI, chart axis, price, diff, or timestamp uses `font-variant-numeric: tabular-nums` (Tailwind `tabular-nums`). Column alignment: right.
2. Use proportional figures only in running prose.
3. Format via `Intl.NumberFormat`; never hand-concatenate separators.
4. Negative numbers use a true minus `−` (U+2212), not a hyphen.
5. Units are a thin gap from the number (`12 MB`, `4.2 s`), non-breaking (` `).

## 5. Measure and layout

| Rule | Value |
|---|---|
| Max line length, prose | 60–75ch (`max-w-prose` = `68ch`) |
| Max line length, UI help text | 60ch |
| Min body size, product | 14px |
| Min body size, marketing | 16px |
| Min any text | 12px (caption, axis labels). Never 10px |
| Paragraph spacing | 12px between paragraphs in product, 16px in docs/marketing |
| Heading spacing | space above heading ≥ 1.5× space below |
| Truncation | single-line ellipsis with full text on hover/focus; max 2-line clamp for card titles |

## 6. Case and copy

1. UI copy is **sentence case**: "Create project", not "Create Project".
2. ALL CAPS only for `overline` (11px, +0.06em) and status-pill labels where specified. Nowhere else.
3. Buttons: verb-first, 1–3 words. "Save changes", "Invite member".
4. Truncate nothing in buttons; shorten the label instead.

## 7. Banned

1. Centered paragraphs longer than 2 lines (headings and short empty-state copy may center).
2. Gradient text on headings.
3. Letter-spacing hacks: positive tracking on lowercase body, negative tracking below −0.02em.
4. Italics for emphasis in UI (allowed only for citations and glossary terms in docs).
5. Underline on anything that is not a link.
6. Fake bold via `text-shadow` or stroke.
7. Light (300) weights below 20px.
8. Mixed font families within the same text block.
9. Viewport-scaled type in product screens.
10. Display type (48px) with one line of meaning. A hero title is ≤ 8 words and followed by a concrete sentence.

## 8. Tailwind mapping

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  --text-caption: 0.75rem;   --text-caption--line-height: 1rem;
  --text-body-sm: 0.8125rem; --text-body-sm--line-height: 1.125rem;
  --text-body: 0.875rem;     --text-body--line-height: 1.25rem;
  --text-h4: 1rem;           --text-h4--line-height: 1.5rem;
  --text-h3: 1.25rem;        --text-h3--line-height: 1.75rem;
  --text-h2: 1.5rem;         --text-h2--line-height: 2rem;
}
```
Usage: `<h2 className="text-h2 font-semibold tracking-snug text-primary">`.
