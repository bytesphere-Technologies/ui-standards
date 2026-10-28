# Landing page (and contact sales)

**Purpose:** explain what the product does, show it, and get one action. **Reuse when:** public home pages and campaign pages. Rules: `04-patterns/marketing-and-landing-pages.md`. Live: showcase → Marketing.

## Wireframe
```
Top nav 64px: logo · Product Pricing Docs Changelog ........ Sign in [Start free]
Hero (2 cols) │ [New: approvals inbox] pill (optional)             │ real product UI, 16:10
              │ H1 Poppins 600, ≤ 8 words, 1.12 line height         │ 1px border, radius 12, shadow level 3
              │ one sentence, 17/28, max 46ch                       │
              │ [Start free trial →] [Book a demo]                  │
              │ 14 days free. No card required.                     │
Proof strip   │ three sourced numbers, 1px dividers, source line under each
Feature rows  │ alternating text / real UI card; heading, 2 sentences, one link
Capabilities  │ 3 short columns ONLY if genuinely parallel (security, integrations, speed)
CTA band      │ Corporate Navy solid; heading, one line, two buttons
Footer        │ 4 columns, legal line
```

## Rules
1. One h1 per page, ≤ 8 words; never centered paragraphs; left-aligned hero.
2. Imagery is the product itself, built from real components and believable data.
3. Proof is sourced or omitted. The showcase marks sample figures as sample; production must not.
4. One gradient maximum, and only in the hero background; this blueprint uses none.
5. One primary CTA label per page, repeated verbatim.
6. Section padding 64 / 80 / 96; no scroll-triggered animation.

## Contact sales
Two-column: promise on the left (what happens next, response time), short form on the right (name, work email, company, team size, optional text). Success state replaces the form with the mark, a plain sentence and the response time.

## States
form submitting (button loading, fields read-only) · success · error (banner, input preserved) · spam block (generic message, no detail).

## Implementation
Next.js static pages, Poppins via Fontsource on these routes only, LCP image preloaded, JS ≤ 170 kB gzip, Lighthouse accessibility 100.
