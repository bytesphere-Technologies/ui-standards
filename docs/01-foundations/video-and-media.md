# Video and media

## 1. When video is legitimate

| Use | Allowed | Conditions |
|---|---|---|
| Product demo (≤ 90s) | ✓ | user-initiated, captions, poster |
| Onboarding / how-to | ✓ | chaptered, ≤ 3 min each, transcript |
| Marketing hero background | ✓ marketing only | muted, looping ≤ 10s, no essential info, pause control, static poster for `prefers-reduced-motion` and data-saver |
| Testimonial | ✓ | real customer, captions |
| Inside product screens | user-initiated only | never autoplay |
| Decorative motion-graphic loops in product | ✗ | |
| Auto-playing video with sound | ✗ | never |

## 2. Player requirements

Use the native `<video>` with a thin custom control layer, or Vidstack (vidstack.io, MIT) / Media Chrome (media-chrome.org, MIT). One player component per product.

| # | Requirement | Spec |
|---|---|---|
| 1 | Autoplay | Never with sound. Muted autoplay only for marketing hero background (§1) |
| 2 | Poster | Always. 16:9, ≤ 120 kB, real frame |
| 3 | Captions | Always, WebVTT `<track kind="captions" srclang default>`; captions on by default for users who have the OS setting |
| 4 | Keyboard | `Space/K` play-pause, `←/→` ±5s, `J/L` ±10s, `↑/↓` volume ±10%, `M` mute, `F` fullscreen, `C` captions, `0–9` seek to %, `Home/End`. Shortcuts active only when the player has focus |
| 5 | Playback rate | 0.75 / 1 / 1.25 / 1.5 / 2 menu |
| 6 | Remembered position | Store per video id in `localStorage` (`ui.video.<id>`), resume with a "Resume at 2:14 · Start over" prompt, clear on end |
| 7 | Transcript | Linked below the player (expandable, searchable, timestamps jump playback) |
| 8 | Controls | Visible on focus and on pause; auto-hide only while playing, after 3s, reappear on any key/pointer |
| 9 | Control hit area | ≥ 32×32 desktop, 44×44 touch |
| 10 | Labels | Every control has `aria-label`; play/pause toggles `aria-pressed` or label; time exposed as `aria-valuetext` ("2 minutes 14 seconds of 6 minutes") |
| 11 | Audio description | Provide a described track or a text alternative when visuals carry information not in the audio (WCAG 1.2.5) |

## 3. Pause, stop, hide (WCAG 2.2.2)
1. Any moving content that starts automatically, lasts more than 5 seconds, and is presented alongside other content must have a visible pause control. Marketing hero loop: a 32px "Pause background video" button, bottom-end, `aria-pressed`.
2. Respect `prefers-reduced-motion: reduce`: show the poster, do not load the video source.
3. Respect `Save-Data: on` / `navigator.connection.saveData`: poster only.

## 4. Hover preview on cards
1. Allowed on media-library / catalog cards only. Muted, 3–5s clip, starts after **500ms** hover delay, stops on pointer leave; focus does **not** autoplay (keyboard users get a "Preview" icon button).
2. Never on touch. Never on more than one card at a time.
3. Preview clips are ≤ 400 kB, `preload="none"`, loaded on hover intent.
4. The card's accessible name never depends on the preview.

## 5. Performance
1. Video never blocks LCP: if video is the hero, the poster is the LCP element (preloaded, `fetchpriority="high"`); the video source loads after `load`.
2. Lazy-load below the fold: `preload="none"` + poster, load on interaction or at `IntersectionObserver` 200px margin.
3. Budgets: hero background ≤ 1.5 MB (H.264/AV1, 720p, no audio track); demo ≤ 30 MB at 1080p; bitrate ≤ 2.5 Mbps (720p) / 5 Mbps (1080p).
4. Host with adaptive streaming (HLS/DASH) for anything > 30s; MP4 fallback.
5. Provide WebM (VP9/AV1) + MP4 (H.264) sources.
6. Embeds (YouTube/Vimeo) use a facade (poster + play button) and load the iframe on click; privacy-enhanced mode on.

## 6. Audio
No UI sounds by default. If a product adds them, off by default, separate toggle in preferences, ≤ 1s, never the only signal.

## 7. Banned
Autoplay with sound; video backgrounds in product; carousels of videos that auto-advance; custom players without captions or keyboard support; videos > 90s without chapters; "play" overlay that hides the poster's meaning; looping GIFs (use muted `<video>` or WebP/AVIF animation with a pause control).
