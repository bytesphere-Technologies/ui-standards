# Help and docs shell

**Purpose:** a reading-first layout for documentation, guides, and the help center. **Reuse when:** docs sites and in-app help. Shell type (c) in `04-patterns/navigation-per-product-type.md`.

## Wireframe
```
Topbar 56px: logo · Docs · API · Changelog   [🔍 Search docs ⌘K]   [Version v4 ▾] [Theme] [Sign in]
┌ Tree nav 280px ───────┐ ┌ Article (max 720px / 68ch) ──────────────┐ ┌ On this page 200px ┐
│ Getting started       │ │ Docs › Guides › Webhooks                  │ │ Overview            │
│  ▸ Quickstart         │ │ Webhooks                                  │ │ Create an endpoint  │
│  ▾ Guides             │ │ Last updated 12 Mar 2026 · 6 min read     │ │ Verify signatures ▌ │
│    ▌Webhooks          │ │                                           │ │ Retries             │
│     Authentication    │ │ Body (16px/26px)                          │ │ ─────────           │
│ API reference         │ │ ```code block, copy button```             │ │ Edit this page ↗    │
│ Changelog             │ │ > Callout (info/warning)                   │ │ Was this helpful?   │
│                       │ │ ‹ Previous: Authentication    Next: Retries ›│                      │
└───────────────────────┘ └───────────────────────────────────────────┘ └─────────────────────┘
```

## Required regions
Topbar with search ⌘K and version selector · left tree nav (sections, depth ≤ 3, current expanded) · breadcrumb · article (title, meta, content) · right TOC (h2/h3, scroll-spy) · prev/next links · feedback widget · edit link · footer.

## Components
`Command` search (docs index: Algolia DocSearch or Pagefind), `Collapsible` tree, `Breadcrumb`, prose styles (`@tailwindcss/typography` with token overrides), `CodeBlock` (Shiki, copy button, language label, line numbers optional, `surface-sunken`), `Callout` (inline, status tokens), `Tabs` (code in multiple languages, persisted choice), `Table`, `Feedback` ("Was this helpful?" with text buttons "Yes" and "No", optional comment), anchor links on headings.

## States
search: recent + results grouped by section with highlighted match; no results with suggestions + "Ask support"; loading skeleton article (title + 6 lines); 404 within docs (search + popular pages); outdated version banner ("You're viewing v3. View latest"); offline reading from cache; code copy success (button label "Copied" 2s, polite). Print stylesheet hides nav.

## Responsive
< 1024: TOC hidden → collapsed "On this page" disclosure at article top; tree nav in drawer from hamburger; code blocks scroll horizontally (no wrapping) with 16px padding; font 16px. 1024–1279: tree + article. ≥ 1280: three columns. Article max 720px; line length 60–75ch.

## Copy rules
Titles are tasks or nouns ("Verify webhook signatures"). Sentences ≤ 25 words, second person, present tense. Every code sample runs. Every page has a last-updated date. No marketing language.

## Implementation (shadcn/ui)
`Sidebar` (`sidebar-03`/`sidebar-09` blocks adapted to tree), `Command`, `Breadcrumb`, `Collapsible`, `ScrollArea`; content in MDX (Fumadocs fumadocs.vercel.app, MIT, or Nextra) rendered with registry typography; Shiki highlighting at build; scroll-spy with `IntersectionObserver`; headings keyed with stable ids for deep links.
