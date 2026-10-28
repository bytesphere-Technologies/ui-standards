# Interactive components

Showcase: `#/lab` and `#/lab/advanced` (all live), `#/loaders/more`. Import from `@bytesphere/ui`. Source: `src/lab.tsx`, `src/lab2.tsx`, `src/lab-loaders.tsx`.

| Need | Component | Not for |
|---|---|---|
| Verification code | `OtpInput` | Passwords |
| 1 to 5 stars | `RatingInput` | NPS (use the 0 to 10 survey) |
| Start and end date | `DateRangePicker` | Single date (native `type=date`) |
| KPI that counts up | `AnimatedNumber` | Tables, anything refetched often |
| Line that types itself | `Typewriter` | Content people must read at once |
| Fade in on scroll | `Reveal` | Above-the-fold content |
| Tilt, glow, flip card | `TiltCard`, `SpotlightCard`, `FlipCard` | Dense app screens |
| Tap feedback at the finger | `RippleButton` | Every button (one per view) |
| Create menu on mobile | `SpeedDial` | More than 5 actions |
| Default action plus alternatives | `SplitButton` | Unrelated actions |
| Preview on hover | `HoverCard` | Required information |
| Right-click actions | `ContextMenuArea` | Only path to an action |
| Slides | `Carousel` | Auto-advancing banners |
| Customer logos | `LogoMarquee` | Navigation |
| Before and after | `CompareSlider` | Numeric comparison |
| Resizable panes | `ResizableSplit` | Mobile (stack instead) |
| Manual ordering | `SortableList` | Sorting by a field |
| Lightweight feedback | `ReactionBar` | Votes that decide something |
| Milestone | `Achievement`, `fireConfetti`, `StreakBadge` | Routine success |
| Label color | `ColorSwatchPicker` | Free color input |
| @mentions | `MentionInput` | Plain comments |
| First-run walkthrough | `Tour` | Replacing good empty states |
| Loaders | `DotsWave`, `Equalizer`, `Radar`, `RingSpin`, `ShimmerText`, `TypingDots`, `GridPulse`, `DeterminateRing`, `RotatingMessage` | See chooser |
| Records with search, sort, select, page | `DataTable` | Under 8 static rows (plain table) |
| Cards across columns | `KanbanDnD` | Strict ordered workflows (use a stepper) |
| Nested items | `TreeView` | Flat lists |
| Messaging, assistant | `ChatThread` | One-way notices |
| Rename in place | `EditableText` | Multi-field forms |
| New password | `PasswordField` | Sign-in (no meter there) |
| Min and max | `RangeSlider` | Single value (`Slider`) |
| Notes with formatting | `MarkdownEditor` | Long-form documents |
| Drawn signature | `SignaturePad` | Typed consent |
| Free color | `ColorPicker` | Brand choice (`ColorSwatchPicker`) |
| Search with history | `SearchWithRecents` | Server-side global search |
| Swipe action, pull refresh | `SwipeRow`, `PullToRefresh` | Desktop-only screens |
| Long feeds | `InfiniteList` | Anything the user must count or jump in (use paging) |
| 1,000+ rows | `VirtualList` | Under 200 rows |
| Streaming metric, gauge, heatmap, timer | `LiveChart`, `Gauge`, `ContributionHeatmap`, `Timer` | Static reports |
| Vote, gallery | `Poll`, `Lightbox` | Decisions that matter (use a form) |

## Table behaviour (DataTable is the reference)

1. Sort cycles ascending, descending, none, and sets `aria-sort`.
2. Header checkbox is indeterminate when some rows are selected; it selects the current page only.
3. Selection count replaces the result count and reveals bulk actions in place.
4. Search resets to page 1 and has its own empty state with a Clear action.
5. Numbers are right aligned with tabular figures; the table scrolls inside its card on mobile or becomes a list (see `01-foundations/mobile.md`).

## Loader chooser

| Wait | Show |
|---|---|
| Under 300 ms | Nothing |
| 300 ms to 2 s | `RingSpin` or `DotsWave` (inline) |
| 2 s to 5 s | Skeleton of the real layout |
| Over 5 s | Determinate bar or `DeterminateRing`, a message, a cancel |
| Searching or scanning | `Radar` |
| AI or generating | `ShimmerText` |
| Chat | `TypingDots` |
| Page boot or brand moment | `BrandMark` loaders, `BootLoader` |

Never two loaders at once. `RotatingMessage` after 5 s with 3 messages that describe real steps.

## Rules for every interactive component

1. Works with keyboard alone; focus ring visible; roles per the WAI-ARIA pattern.
2. Respects `prefers-reduced-motion`.
3. Touch targets 44 px on mobile.
4. Gestures (drag, long-press, right-click, hover) always have a visible button path.
5. No new dependency; these use the platform (WAAPI, IntersectionObserver, pointer events).
