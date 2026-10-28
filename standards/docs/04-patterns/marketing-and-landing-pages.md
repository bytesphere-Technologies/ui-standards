# Marketing and landing pages

Marketing pages are allowed more expression than product pages. They are not allowed to be sloppy. `07-antipatterns/ai-slop-detector.md` applies in full.

## 1. What is allowed on marketing but not in product
| Element | Marketing allowance | Product |
|---|---|---|
| Type | `display` 48px (clamp 32→48), `h1` 32–40px, `body-lg` 16–18px | max `h2` 24px, body 14px |
| Imagery | full-bleed hero image/real product screenshot, photography, illustration (one style) | none in chrome |
| Gradient | **one** gradient maximum per page: hero background, ≤ 2 stops, same hue family (primary-50 → primary-100), no text gradient | none |
| Motion | one subtle entrance on hero (opacity 200ms); video background muted with pause | functional only |
| Layout | wider sections (1280 container), 64/80/96px section gaps | 24/40px |
| Color | primary-700 solid bands, `surface-sunken` bands | neutral surfaces |
| Copy | persuasion (specific, factual) | instructional |

## 2. What still applies
Contrast ≥ 4.5:1; visible focus rings; keyboard navigation; skip link; `prefers-reduced-motion`; responsive at 320/768/1440 and 200% zoom; semantic headings (one h1); min body 16px; alt text; performance budget (LCP ≤ 2.5s, JS ≤ 170 kB gzip); tokens only; Lucide icons only; sentence case; no AI-slop items.

## 3. Hero spec
| Property | Spec |
|---|---|
| Structure | left: eyebrow (overline, optional), h1 (≤ 8 words), one supporting sentence (≤ 24 words, `body-lg`), 2 CTAs (primary + secondary), microcopy under CTAs ("Free for 14 days · No card required" only if true); right: real product screenshot (16:9, `radius-modal`, 1px border, `shadow-modal`) |
| Alignment | left-aligned text; centered hero only when the page has no image and the h1 ≤ 6 words |
| Height | content-driven; padding 64px mobile / 96px desktop; never 100vh |
| h1 size | `clamp(2rem, 1.4rem + 2.5vw, 3rem)`, 600, tracking −0.02em, line-height 1.15 |
| CTA | primary lg 44px; secondary outline; one verb each ("Start free trial", "Book a demo") |
| Image | real, current UI with believable data; `fetchpriority="high"`, explicit dimensions, ≤ 200 kB AVIF/WebP; alt text describes what the screenshot shows |
| Banned | purple→blue gradient, floating orbs, glass cards over the image, animated counters, 72px h1 with one line of meaning |

## 4. Proof section
Directly under the hero. Allowed content (pick the truest): (a) 4–6 real customer logos, grayscale, 24–32px high, static, with permission; (b) one named quote (name, role, company, photo with consent) 18px/28px max 60ch; (c) 3 real metrics with source and period ("Median time to resolve: 4.2 h, Q4 2025 across 312 teams"). Invented metrics, fake logos, anonymous "Sarah, CEO", and infinite logo marquees are banned.

## 5. Section patterns
| Pattern | Use | Rule |
|---|---|---|
| Feature + screenshot (alternating 6/6) | explaining one capability | text 5 cols, image 7 cols; heading + 2 sentences + one link; real UI |
| Comparison table | vs. alternatives | factual rows, dated |
| Steps (numbered 1–3) | how it works | numbers are text, not icon circles |
| Security / trust | compliance | list only certifications actually held, with links |
| FAQ accordion | objections | real questions |
| CTA band | end of page | one heading, one button, solid `primary-700`, no gradient |
| Footer | sitemap | 4 columns, legal, status link |

## 6. The banned "three identical cards with icons" section
A row of three same-size cards, each with an icon-in-a-circle, a 3-word title, and a generic sentence, is banned **unless the content genuinely is three equal, parallel things** (e.g., three plans, three regions, three integration categories), and then: no icon-in-circle, titles carry real nouns, sentences contain specifics (numbers, names, limits). Otherwise use alternating feature+screenshot sections, a table, or prose.

## 7. Rules (testable)
1. One h1; ≤ 8 words.
2. One gradient at most, only the hero.
3. Max 1 CTA verb per section; same primary CTA label everywhere on the page.
4. Section vertical padding from the scale: 64/80/96, not arbitrary.
5. Every claim has a source or is removed.
6. Every image has alt text and explicit dimensions.
7. Page weight ≤ 1.5 MB at load; no autoplaying sound; no carousels that auto-advance.
8. Lighthouse Performance ≥ 90, Accessibility 100 on mobile.
