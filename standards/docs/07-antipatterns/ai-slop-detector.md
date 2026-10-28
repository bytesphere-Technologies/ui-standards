# AI-slop detector

The most important file in this standard. Each item is a default that generative tools produce because it was common in their training data, not because anyone decided it. Items are **banned**. A reviewer cites the item number (`SLOP #11`) and the PR is blocked until the replacement is applied.

Format: **Looks like** · **Why it reads as generated** · **Human-team alternative**.

## Visual

| # | Banned default | Looks like | Why it reads as generated | Replace with |
|---|---|---|---|---|
| 1 | **Purple→blue gradient hero** | Full-bleed `#7C3AED → #2563EB` behind white 72px text | The single most common output of text-to-UI tools; no brand decision behind it | Solid `surface-default` or `surface-sunken`; brand color as one solid band; a real product screenshot. One same-hue gradient max on marketing hero only (`color.md` §1) |
| 2 | **Glassmorphism / blur cards** | `backdrop-blur-xl bg-white/10 border-white/20` panels over color blobs | Effect chosen for novelty; kills contrast and performance; unreadable text over variable backgrounds | Flat `surface-raised` + 1px `border-subtle`. Scrim for overlays is flat 48%, no blur. **Exception:** `Glass` over a brand backdrop, or a sticky bar over content, with the guardrails in `03-components/surfaces-backgrounds-footers.md` §2 |
| 3 | **Glowing blobs and orbs** | Blurred colored circles behind hero or cards | Decorative filler to avoid designing a layout | Nothing. If depth is needed, use spacing and a bordered panel |
| 4 | **Gradient text on headings** | `bg-clip-text text-transparent bg-gradient-to-r` | Signature of template-driven pages; fails contrast checks; indicates emphasis with no meaning | `text-primary` at 600 weight; emphasis by size or position |
| 5 | **Emoji as icons or in product UI** | 🚀 Launch, ✅ Done, ⚠️ Warning, 📊 Reports | Cheap iconography; renders differently per OS; inaccessible names | Lucide 16/20 with text label (`iconography.md`) |
| 6 | **"✨" and sparkle motifs** | ✨ on "AI" features, sparkle buttons, twinkle animations | Became the visual shorthand for "this was made by AI" | Name the feature by what it does ("Summarize"); standard icon (`wand` sparingly) or none |
| 7 | **Every element `rounded-2xl`** | 16px–24px radius on buttons, inputs, cards, images, pills | One utility class applied everywhere = no system | Radius per class: 4 / 6 / 8 / 12; `full` only for avatars/dots (`radius-borders-elevation.md`) |
| 8 | **Drop shadows on flat data cards** | `shadow-lg` KPI cards on white | Mimics "premium" without function; muddies dense layouts | 1px `border-subtle`, no shadow. Shadow only on floating layers |
| 9 | **Fake dashboards in screenshots** | Perfectly smooth up-and-right chart, round numbers, "Total users 12,345" | Illustrative mockup passed off as the product | Real product screenshot with believable messy data: uneven series, specific values, real labels. Update at each MAJOR visual change |
| 10 | **Invented metrics and logos** | "10x faster", "99% satisfaction", "Trusted by 10,000+ teams", logos of companies that aren't customers | Unverifiable claims; legal risk | Only sourced numbers with period ("Median resolve time 4.2 h, Q4 2025"); real customers with written permission; otherwise omit the section |
| 11 | **Three-column icon-card feature grid with invented copy** | 3 equal cards: circled icon, 3-word title, generic sentence | Default filler section in every template | Alternating feature + real screenshot; a comparison table; or prose. Allowed only for three genuinely parallel things, with specifics (`marketing-and-landing-pages.md` §6) |
| 12 | **Centered long paragraphs** | Centered 4–6 line body copy at 18–20px | Template habit; ragged both sides, hard to scan | Left-aligned, 60–75ch. Center only headings and ≤ 2-line empty-state copy |
| 13 | **Rainbow tag clouds** | 8 pills in 8 colors per row | "Make it colorful" default | Neutral tags; ≤ 2 pill colors per row, color only for status (`pills-badges-tags.md`) |
| 14 | **48px of margin between everything** | `space-y-12` between every block, 96px section padding in product | Whitespace as decoration; low density, long scroll | Spacing scale: 24/40 section gap, 16 within groups, density modes |
| 15 | **Default Tailwind palette untouched** | `bg-blue-500`, `text-gray-500`, `border-slate-200`, `indigo-600` buttons | Nobody chose it; identical to thousands of sites | Brand-derived tokens only (`color.md`); lint bans default palette classes |
| 16 | **Uniform type sizes with no hierarchy** | Everything 16px/400 with 18px semibold "headings" | No type scale, no decision about importance | Scale in `typography.md`: 24 / 16 / 14 / 13 / 12 with clear weight steps |
| 17 | **Pill-shaped everything** | Fully-rounded buttons, inputs, tabs, tags, badges | One shape applied indiscriminately | Buttons 6px, inputs 4px, status pills 4px rectangles; `full` only avatars/dots |
| 18 | **Animated counters** | Numbers counting up on scroll/load | Attention bait; delays reading real values | Static `tabular-nums` values. Updates change instantly or crossfade 100ms |
| 19 | **Infinite logo marquees** | Auto-scrolling strip of logos | Fills a "trusted by" slot cheaply; violates WCAG 2.2.2 | Static grayscale row of ≤ 6 real logos, or one named quote |
| 20 | **Scroll-triggered fade-in on every section** | Each block slides up and fades on entry | Generic "polish" layer, delays content, janky on slow devices | No entrance animation. Content is present at load. Max one subtle hero fade (`motion.md`) |
| 21 | **Icon-in-a-circle above every heading** | 48px tinted circle with an icon over each card/section title | Template ornament; adds no information | Heading alone. An icon only when it encodes a category users scan by, 16px inline |
| 22 | **Dark mode with neon glow** | Near-black bg, cyan/magenta glows, glowing borders | "Cyber" stereotype; fails contrast and fatigue tests | Dark surfaces `#000913`–`#192534`, elevation via lightness, desaturated brand (`dark-mode.md`) |
| 23 | **Same three sample users: Alex, Sarah, James** | Avatars and rows with the same trio, often with `+3` | Training-data default names | Varied realistic names from diverse origins (seeded faker), long and short, plus edge cases (`testing-and-a11y-automation.md` §6) |
| 24 | **Decorative dotted grids and noise textures on product screens** | Dot-grid or grain background behind app content | Aesthetic filler | Flat `surface-sunken` page background |
| 25 | **Oversized 72px hero text with one line of meaning** | "Build the future." at 72px | Volume instead of content | h1 ≤ 8 words that state what the product does + a concrete supporting sentence; 32–48px (`marketing-and-landing-pages.md` §3) |

## Verbal (copy)

| # | Banned | Why | Replace with |
|---|---|---|---|
| 26 | **"Supercharge", "Seamlessly", "Effortlessly", "Unlock", "Elevate", "Empower", "Revolutionize", "Leverage", "Streamline", "Next-generation", "Game-changing", "Cutting-edge"** | Vague verbs signal no specifics; indistinguishable across products | Name the concrete action and number: "Export 50,000 rows in under 10 seconds." "Approve invoices in one click." |
| 27 | **"Welcome back, Alex! 👋"**, "Let's get started!", "Oops!", "Awesome!", "You're all set!" | Fake friendliness, emoji, exclamation points | "Dashboard". "No projects yet." "Couldn't load invoices." |
| 28 | **Triadic slogans**: "Fast. Simple. Powerful." | Template rhythm with no claim | One true sentence |
| 29 | **"In today's fast-paced world…"**, "Whether you're a X or a Y…" | Filler openers | Start with the point |
| 30 | **Title Case Everywhere** | Reads as marketing; harder to scan | Sentence case |
| 31 | **Lorem ipsum, "John Doe", "Acme Corp" shipped** | Unfinished content | Real copy reviewed in `launch-readiness-checklist.md` |

## Interaction / structure

| # | Banned | Why | Replace with |
|---|---|---|---|
| 32 | Hero + 3 cards + testimonial + CTA as the only page structure | The universal template | Structure from user questions: what is it, how does it work, proof, price, next step |
| 33 | Modal on page load (newsletter, tour) | Interrupts, no consent | In-context prompt after value |
| 34 | Floating "chat with AI" bubble on every page | Default widget | Help link in the topbar; support in Help |
| 35 | Confetti on completion | Toy behavior in a work tool | Quiet confirmation text |

## The positive test

> **Does this screen look like it was designed by someone who had to answer to a design review?**

Pass requires all of:
1. Every color, radius, spacing, and type size can be traced to a token (reviewer picks 5 elements and finds them).
2. Hierarchy is clear in a 3-second squint test: one title, one primary action, grouped content.
3. Every state (loading, empty, error, partial) exists and was designed.
4. Copy is specific: contains nouns, numbers, or names from this product; nothing could be pasted into another company's page.
5. Sample data is believable: varied lengths, real units, plausible dates, imperfect trends.
6. Someone made a decision you can argue with (a trade-off, a constraint). Pure defaults have none.
7. It survives removal of every decorative element without losing meaning.
If any item fails, the PR is rejected with `SLOP` and the item number.
