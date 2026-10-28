# Themes, dark modes, corner styles, navigation styles

Appearance is four independent choices, all stored on `<html>` as data attributes and written by one store (`useAppearance()` in `packages/ui/src/components/appearance/`). Every choice is a token override in `themes.css`, so components do not change. Live: showcase → Standard → Themes, or **Customize** in the top bar.

| Attribute | Values | Default |
|---|---|---|
| `data-theme` | `light` · `dark` (resolved from mode: system, light, dark) | system |
| `data-dark` | `midnight` · `navy` · `ink` · `slate` · `ocean` · `dim` · `cobalt` · `dusk` | midnight |
| `data-light` | `paper` · `mist` · `sky` · `frost` | paper |
| `data-accent` | `azure` · `navy` | azure |
| `data-radius` | `sharp` · `standard` · `soft` · `round` | standard |
| `data-nav` | `surface` · `tint` · `navy` · `ink` · `azure` | surface |
| `data-density` | `comfortable` · `compact` | comfortable |

Any element can carry these attributes, so a preview or an embedded panel can be themed on its own: `<div data-theme="dark" data-dark="ocean">`.

## 1. Named dark modes

All six keep the same text colors, brand fills, status colors and focus ring from `dark-mode.md`. They differ in the four surface layers, the divider, the selected row and the hover tint. Each is built from the brand: Rich Black, Corporate Navy and Azure Blue hues.

| Name | Page `default` | Card `raised` | Sunken | Overlay | Divider | Selected | Use |
|---|---|---|---|---|---|---|---|
| **Midnight** (default) | `#0A121C` | `#111B27` | `#000913` | `#192534` | `#223142` | `#223142` | General product use |
| **Navy** | `#0E1530` | `#151E3F` | `#080D22` | `#1D2951` | `#2B3A68` | `#212F63` | Brand-forward, internal tools |
| **Ink** | `#03101D` | `#071727` | `#000913` | `#0F2033` | `#1A2A3C` | `#14293F` | Warehouses, handhelds, OLED, dim rooms |
| **Slate** | `#15191F` | `#1C2128` | `#0F1216` | `#242B34` | `#2F3741` | `#2B3847` | People who want the least color |
| **Ocean** | `#07151E` | `#0D2130` | `#030D14` | `#142D40` | `#1F3B50` | `#123A50` | Analytics and long reading |
| **Dim** | `#1D2530` | `#252F3B` | `#171D25` | `#2E3A48` | `#3B4859` | `#2B4560` | Bright offices; lowest contrast jump from light |
| **Cobalt** | `#091630` | `#102042` | `#040B1E` | `#182C57` | `#243E78` | `#17376E` | Rich saturated blue; analytics, brand-forward dashboards |
| **Dusk** | `#151B38` | `#1D2546` | `#0F1428` | `#27315A` | `#36427A` | `#243170` | Soft navy-violet; long reading and writing sessions |

Dim also lightens `text-tertiary` to `#AEB9C2` and `border-control` to `#8696A3` so it holds the same contrast.

### Measured contrast (WCAG 2.2, text `#F7F7F8` / `#BAC3C9` / `#98A5AE`)
| Mode | secondary on raised | tertiary on selected | control border on page/raised | focus ring | link on raised | lowest status pill |
|---|---|---|---|---|---|---|
| Midnight | 9.7 | 5.3 | 4.63 | 5.34 | 7.4 | 6.41 |
| Navy | 9.1 | 5.0 | 4.34 | 5.13 | 7.1 | 5.90 |
| Ink | 10.1 | 5.9 | 4.83 | 5.97 | 8.2 | 6.84 |
| Slate | 9.0 | 4.7 | 4.32 | 4.82 | 6.7 | 5.90 |
| Ocean | 9.2 | 4.8 | 4.39 | 4.85 | 6.7 | 6.00 |
| Dim | 7.6 | 4.5+ | 4.46 | 3.99 | 5.5 | 4.93 |
| Cobalt | 9.1 | 5.1 | 4.28 | 4.69 | 6.5 | 5.82 |
| Dusk | 8.9 | 4.76 | 3.99 | 4.31 | 6.0 | 5.35 |
Thresholds: text 4.5:1, controls and focus 3:1. Every mode passes. Adding a mode means adding a row here, measured, before merge.

### Rules
1. Pick **one** dark mode per user. Never mix two in one view (scoped previews are the only exception).
2. A product may ship all six, a subset, or only Midnight. Operations products default to Ink.
3. Names are fixed; renaming a mode is a MAJOR change.
4. Dark surfaces never use pure black. Rich Black `#000913` is allowed only as the sunken layer and in Ink.
5. Logos: use `<Logo>` (it switches mark colors for dark) or `tone="white"` on navy and ink navigation.

## 2. Light pages
| Name | Page (sunken) | Notes |
|---|---|---|
| **Paper** | `#F7F7F8` | Default. Neutral page behind white cards |
| **Mist** | `#EEF3FB` | Pale-blue page; hover `#E3EBF7`, divider `#D3DEEE`. Tertiary text on Mist is 4.8:1 |
| **Sky** | `#E8F1FA` | Azure-tinted page, selected `#D3E4F6`, divider `#C9DAEC`. Tertiary 4.67:1, link 6.28:1 |
| **Frost** | `#F0F3F7` | Cool gray with stronger edges `#CBD3DC`, for dense data. Tertiary 4.80:1 |

## 2b. Accent (which brand color leads)
| Accent | Primary action | Link and focus | In dark |
|---|---|---|---|
| **Azure** (default) | Azure Blue `#116CB3`, white text 5.50:1 | Azure 700 / Azure 600 | Azure 400 fill, Rich Black text 8.08:1 |
| **Navy** | Corporate Navy `#21346E`, white text 11.79:1; hover `#2E417A` (9.75:1) | Navy | Navy 300 `#A6B4DD` fill, Rich Black text 9.72:1; link and ring 6.6–8.4:1 on every dark mode |
Status colors, charts and the logo are unaffected by accent.

## 3. Corner styles
One switch changes tag, control, card and modal radii together.

| Style | Tag | Control | Card | Modal | Inner (menu items) | Suits |
|---|---|---|---|---|---|---|
| Sharp | 2 | 3 | 4 | 6 | 2 | dense data tools, terminals |
| **Standard** | 4 | 6 | 8 | 12 | 5 | default |
| Soft | 6 | 10 | 14 | 20 | 8 | consumer and onboarding-heavy products |
| Round | 8 | 14 | 20 | 28 | 12 | playful or mobile-first |
Always round regardless of style: avatars, count badges, status dots, switches, radios, progress tracks.

## 4. Navigation styles
All navigation components read `--nav-bg`, `--nav-fg`, `--nav-fg-strong`, `--nav-muted`, `--nav-hover`, `--nav-active-bg`, `--nav-active-fg`, `--nav-active-icon`, `--nav-border`.

| Style | Background | Text | Active item | Measured |
|---|---|---|---|---|
| **Light** (surface) | page surface | secondary | Pale Blue tint | as light/dark tables |
| **Tinted** | 45% Pale Blue over surface | secondary | raised card | secondary 6.9:1, tertiary 4.8:1 |
| **Navy** | `#21346E` | `#D6DDF2` (8.7:1), muted `#A6B4DD` (5.7:1) | white on 14% white | white 11.8:1 |
| **Ink** | `#000913` | same | white on 12% white | 14.8:1 |
| **Azure** | `#116CB3` | white (5.50:1), muted `#EAF2FA` (4.86:1) | white on 26% Rich Black overlay (≥ 7:1) | white 5.50:1 |
With Navy, Ink or Azure the logo uses `tone="white"`.

## 5. Implementation
```tsx
const [a, set] = useAppearance();
set({ dark: "ocean", radius: "soft", nav: "navy" });   // persists to localStorage["ui.appearance"]
<AppearancePanel />                                      // ready-made picker
```
Query params override for review links and screenshots: `?theme=dark&dark=navy&radius=soft&nav=ink&density=compact`. An inline script in `index.html` sets the attributes before first paint to avoid a flash.
