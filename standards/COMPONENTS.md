# Component reference

Generated from `catalog/catalog.data.ts` (85 entries). Do not edit by hand; run `npm run catalog`.

Import everything from `@bytesphere/ui` (the barrel at `src/components.ts`).

## brand

### Logo

The ByteSphere lockup as outlined SVG. Four forms, five tones. Use it everywhere the company name appears; never retype the name.

- **File:** `node_modules/@bytesphere/ui/src/components/logo/index.tsx`
- **Exports:** `Logo`
- **Variants:** horizontal · stacked · mark · wordmark
- **Props:** `variant: "horizontal"|"stacked"|"mark"|"wordmark"` (default horizontal); `tone: "auto"|"navy"|"white"|"black"|"on-brand"` (auto follows the theme); `height: number` (px of the whole lockup, default 32); `tagline: boolean` (show TECHNOLOGIES, default true; drop it under 120px wide)
- **Tokens:** color-brand-mark-a, color-brand-mark-b
- **Accessibility:** role=img with aria-label. Wrap in a link to home with its own aria-label.
- **Live example:** `#/brand`

```tsx
<Logo height={32} />
<Logo variant="mark" height={28} />
<Logo tone="white" height={36} />   {/* on Navy, Azure or Ink */}
```

### BrandMark

Just the two-half mark, themeable or single-color (currentColor). Base of every brand loader.

- **File:** `node_modules/@bytesphere/ui/src/components/brand-mark/index.tsx`
- **Exports:** `BrandMark`
- **Props:** `size: number` (default 24); `mono: boolean` (currentColor, second half at 55%); `animate: "swirl"|"split"|"spin"|"trace"`
- **Accessibility:** Decorative unless `title` is passed.

```tsx
<BrandMark size={20} />
<BrandMark mono animate="spin" size={16} />
```

### Art (illustrations)

Seven line illustrations in one style for empty and error states: folder, search, inbox, cloud, lock, chart, plug.

- **File:** `node_modules/@bytesphere/ui/src/components/art/index.tsx`
- **Exports:** `Art`
- **Live example:** `#/states`

```tsx
<StatePanel art={<Art.folder />} title="No projects yet" />
```

## theming

### Appearance (useAppearance, AppearancePanel)

One store for mode, eight named dark modes, four light pages, two accents, four corner styles, density and five navigation styles. Writes data-* attributes on <html>.

- **File:** `node_modules/@bytesphere/ui/src/components/appearance/index.tsx`
- **Exports:** `useAppearance`, `setAppearance`, `AppearancePanel`, `ThemeSwatch`, `DARKS`, `LIGHTS`, `RADII`, `NAVS`
- **Variants:** dark: midnight · navy · ink · slate · ocean · dim · cobalt · dusk · light: paper · mist · sky · frost · accent: azure · navy · radius: sharp · standard · soft · round · nav: surface · tint · navy · ink · azure
- **Tokens:** themes.css
- **Accessibility:** Every named dark mode is contrast-checked (text 4.5:1, controls 3:1).
- **Live example:** `#/themes`

```tsx
const [a, set] = useAppearance();
set({ dark: "cobalt", accent: "navy", radius: "soft", nav: "azure" });
<AppearancePanel />   {/* ready-made picker */}
// scope a preview: <div data-theme="dark" data-dark="ocean">…</div>
```

## navigation

### SideNav

App sidebar. Groups, nested items, badges, collapse to a 64px rail with tooltips. Reads --nav-* so one data-nav value restyles it.

- **File:** `node_modules/@bytesphere/ui/src/components/side-nav/index.tsx`
- **Exports:** `SideNav`
- **Variants:** full 240 · compact 208 · rail 64 (collapsed) · floating
- **Props:** `groups: NavGroup[]` ({label?, items:[{id,label,icon,badge,children}]}); `current: string` (active item id); `collapsed: boolean`; `onToggle: () => void` (shows the collapse button); `brand: ReactNode` (top slot, put <Logo/> here); `footer: ReactNode`; `variant: "full"|"compact"|"floating"`
- **Tokens:** --nav-bg, --nav-fg, --nav-active-bg
- **Accessibility:** <nav aria-label=Primary>, aria-current=page, tooltips in rail, aria-expanded on groups.
- **Live example:** `#/navigation`

```tsx
<SideNav groups={groups} current="customers" brand={<Logo height={26} tagline={false} />} collapsed={rail} onToggle={() => setRail(!rail)} />
```

### TopBar

56px bar with left, center and right slots. tone="nav" makes it follow the navigation style (navy or ink).

- **File:** `node_modules/@bytesphere/ui/src/components/search-trigger/index.tsx`
- **Exports:** `TopBar`, `SearchTrigger`
- **Props:** `left / center / right: ReactNode`; `tone: "surface"|"nav"`
- **Live example:** `#/navigation`

```tsx
<TopBar left={<Logo height={26} tagline={false} />} center={<SearchTrigger label="Search" />} right={<Avatar id="u1" name="Mia Moreno" />} />
```

### SiteHeader

Marketing header: logo, links, optional mega menu, sign in and one primary action, mobile drawer.

- **File:** `node_modules/@bytesphere/ui/src/components/site-header/index.tsx`
- **Exports:** `SiteHeader`
- **Props:** `links: SiteLink[]` ({label, href} or {label, mega:{columns, feature}}); `cta: ReactNode`; `sticky: boolean`; `current: string`
- **Live example:** `#/navigation`

```tsx
<SiteHeader links={links} cta={<Button variant="primary">Start free</Button>} sticky />
```

### EcomHeader

Store header: dismissible announcement, search, account, wishlist, cart with count, category row with mega menu.

- **File:** `node_modules/@bytesphere/ui/src/components/ecom-header/index.tsx`
- **Exports:** `EcomHeader`
- **Props:** `categories: SiteLink[]`; `cartCount: number`; `onCart: () => void`; `announcement: string`
- **Live example:** `#/navigation`

```tsx
<EcomHeader categories={cats} cartCount={3} announcement="Free shipping over $75" />
```

### MegaMenu

Multi-column panel with icon links and an optional featured card. Used inside SiteHeader and EcomHeader.

- **File:** `node_modules/@bytesphere/ui/src/components/mega-menu/index.tsx`
- **Exports:** `MegaMenu`
- **Props:** `columns: {title, links:[{label,desc,icon,href}]}[]`; `feature: ReactNode`

```tsx
<MegaMenu columns={[{ title: "Platform", links: [{ label: "Deals", desc: "Track renewals", icon: FileText }] }]} />
```

### BottomTabs

Mobile bar for 3 to 5 destinations with badges. Respects the safe area. See 01-foundations/mobile.md for when to use it versus a drawer.

- **File:** `node_modules/@bytesphere/ui/src/components/bottom-tabs/index.tsx`
- **Exports:** `BottomTabs`
- **Props:** `items: {id,label,icon,badge}[]`; `current: string`; `onSelect: (id) => void`
- **Accessibility:** 44px targets, aria-current.
- **Live example:** `#/navigation`

```tsx
<BottomTabs items={items} current="home" onSelect={setTab} />
```

### Tabs · PillTabs · VerticalTabs · SubNav · Segmented

Five switchers: underline tabs for views, pills for filters, segmented for view modes, vertical tabs for settings, SubNav for a secondary rail.

- **File:** `node_modules/@bytesphere/ui/src/components/pill-tabs/index.tsx`
- **Exports:** `Tabs`, `Segmented`, `PillTabs`, `VerticalTabs`, `SubNav`
- **Accessibility:** Arrow keys, Home, End. Roving tabindex.
- **Live example:** `#/navigation`

```tsx
<Tabs label="Sections" value={t} onChange={setT} items={[{id:"a",label:"Overview"}]} />
<Segmented label="View" items={["List","Board"]} value={v} onChange={setV} />
<PillTabs label="Status" value={s} onChange={setS} items={[{id:"all",label:"All",count:48}]} />
```

### Breadcrumb · Pagination · Stepper

Location trail, numbered pagination with rows-per-page, and a step indicator for wizards.

- **File:** `node_modules/@bytesphere/ui/src/components/breadcrumb/index.tsx`
- **Exports:** `Breadcrumb`, `Pagination`, `Stepper`
- **Live example:** `#/components`

```tsx
<Breadcrumb items={[{label:"Deals",href:"#"},{label:"Wingtip"}]} />
<Pagination page={p} pages={26} total={1284} size={50} onPage={setP} />
<Stepper steps={["Basics","Team","Review"]} current={1} />
```

### GlobalBar

Apple-style slim bar with full-width flyouts. Opens on hover intent (120ms) or focus, dims the page, staggers links in, closes on Esc. Search overlay and mobile accordion included.

- **File:** `node_modules/@bytesphere/ui/src/components/global-bar/index.tsx`
- **Exports:** `GlobalBar`
- **Variants:** tone: light · dark
- **Props:** `items: GlobalItem[]` ({label, href} or {label, flyout:{leadHeading, lead[], columns[]}}); `tone: "light"|"dark"`; `right: ReactNode` (extra actions after search); `sticky: boolean`
- **Accessibility:** Disclosure pattern: buttons with aria-expanded, Left/Right between items, Down opens, Esc closes and keeps focus.
- **Live example:** `#/site-nav/global`

```tsx
<GlobalBar items={items} tone="light" right={<Button size="sm" variant="primary">Start free</Button>} />
```

### MarketplaceHeader

Amazon/Walmart-style header for large catalogs: utility row (deliver-to, language, account flyout, orders, cart), category-scoped search with typeahead, department strip with an All button that opens a drill-down drawer.

- **File:** `node_modules/@bytesphere/ui/src/components/marketplace-header/index.tsx`
- **Exports:** `MarketplaceHeader`, `Typeahead`
- **Props:** `departments: Department[]` ({id,label,icon,groups:[{heading,links[]}]}); `products: Product[]` (typeahead product hits); `cartCount: number`; `strip: string[]` (links in the second row)
- **Accessibility:** Search is role=search with combobox; typeahead supports arrows, Enter, Esc.
- **Live example:** `#/site-nav/marketplace`

```tsx
<MarketplaceHeader departments={departments} products={products} cartCount={count} />
```

### DepartmentDrawer

Two-level drill-down drawer (root list, then a department's groups) with slide transitions and a back row. The mobile menu for any large site.

- **File:** `node_modules/@bytesphere/ui/src/components/department-drawer/index.tsx`
- **Exports:** `DepartmentDrawer`
- **Props:** `open / onClose`; `departments: Department[]`; `trending: string[]`; `greeting: string`
- **Accessibility:** role=dialog aria-modal, Esc closes, focus moves to Close.
- **Live example:** `#/navigation`

```tsx
<DepartmentDrawer open={open} onClose={() => setOpen(false)} departments={departments} />
```

### PlatformBar · AppLauncher · AccountPanel · Popover

Meta-style bar: logo, search pill, five icon tabs with badges and an animated active bar, app launcher grid, chats, notifications, and an account panel.

- **File:** `node_modules/@bytesphere/ui/src/components/account-panel/index.tsx`
- **Exports:** `PlatformBar`, `AppLauncher`, `AccountPanel`, `Popover`
- **Props:** `tabs: {id,label,icon,badge}[]`; `current / onTab`; `apps: LauncherApp[]` ({id,label,icon,tone}); `create: {label,icon}[]`
- **Accessibility:** Popovers are dialogs with aria-expanded triggers; Esc returns focus.
- **Live example:** `#/site-nav/platform`

```tsx
<PlatformBar tabs={tabs} current={tab} onTab={setTab} apps={apps} create={create} />
```

### CategoryTree

Expandable category tree with counts, for category pages and filters.

- **File:** `node_modules/@bytesphere/ui/src/components/category-tree/index.tsx`
- **Exports:** `CategoryTree`
- **Props:** `tree: TreeNode[]` ({label,count,children}); `current: string`
- **Live example:** `#/site-nav/marketplace`

```tsx
<CategoryTree tree={tree} current="Laptops" />
```

### SpeedDial · SplitButton

A floating create button that fans out 3 to 5 labelled actions, and a split button with a default action plus a menu of alternatives.

- **File:** `node_modules/@bytesphere/ui/src/components/speed-dial/index.tsx`
- **Exports:** `SpeedDial`, `SplitButton`
- **Props:** `actions: {label,icon,onSelect}[]` (SpeedDial); `label / options: string / {label,onSelect}[]` (SplitButton)
- **Accessibility:** aria-expanded on both; menu closes on Escape.
- **Live example:** `#/mobile`

```tsx
<SpeedDial actions={[{ label: 'New deal', icon: FileText }]} />
<SplitButton label="Save" options={[{ label: 'Save and close' }]} />
```

### BackToTop · ScrollProgress

A button that appears after 600px of scroll and a thin reading-progress bar for long pages.

- **File:** `node_modules/@bytesphere/ui/src/components/back-to-top/index.tsx`
- **Exports:** `BackToTop`, `ScrollProgress`
- **Accessibility:** BackToTop is a real button with a label; motion respects reduced-motion.

```tsx
<ScrollProgress />
<BackToTop />
```

## surfaces

### SurfaceCard

One card with eight surface styles. Pick one style per layout.

- **File:** `node_modules/@bytesphere/ui/src/components/surface-card/index.tsx`
- **Exports:** `SurfaceCard`
- **Variants:** flat · outlined · raised · tinted · brand · ink · glass (overlay only) · dashed
- **Props:** `variant: SurfaceVariant` (default outlined); `pad: "none"|"sm"|"md"|"lg"`; `interactive: boolean` (hover border + shadow); `as: ElementType` (use "a" for a link card)
- **Tokens:** radius-card, color-surface-raised, color-selected-bg
- **Live example:** `#/surfaces`

```tsx
<SurfaceCard variant="tinted"><h3>Heads up</h3></SurfaceCard>
```

### Glass

The only place blur and transparency are allowed: a card laid over a brand backdrop, or a sticky bar over content. Includes its own backdrop so contrast is checkable.

- **File:** `node_modules/@bytesphere/ui/src/components/glass/index.tsx`
- **Exports:** `Glass`
- **Props:** `over: "brand"|"navy"|"pattern"`
- **Accessibility:** Text must keep 4.5:1 against the worst backdrop. Opacity never below 55%.
- **Live example:** `#/surfaces`

```tsx
<Glass over="navy"><p>Over Navy</p></Glass>
```

### Rectangle cards

Eight layouts: media left/right/top, wide banner, portrait, header-strip, icon, add-new action, list, profile.

- **File:** `node_modules/@bytesphere/ui/src/components/action-card/index.tsx`
- **Exports:** `MediaCard`, `BannerCard`, `PortraitCard`, `HeaderStripCard`, `IconCard`, `ActionCard`, `ListCard`, `ProfileCard`
- **Live example:** `#/surfaces`

```tsx
<MediaCard side="left" icon={Zap} title="Faster approvals" body="Route by amount." />
<BannerCard tone="brand" title="Upgrade" body="…" cta="See plans" />
<ProfileCard id="u5" name="Priya Raghavan" role="Finance" stats={[["Deals","42"]]} />
```

### Backdrop

Absolute background layer: solid, tint, navy, ink, brand fills; SVG grid, dots, lines, rings, waves; CSS-only stripes and checks.

- **File:** `node_modules/@bytesphere/ui/src/components/backdrop/index.tsx`
- **Exports:** `Backdrop`
- **Variants:** solid · tint · navy · ink · brand · grid · dots · lines · rings · waves · stripes · checks
- **Props:** `variant: BackdropVariant`; `subtle: boolean` (lower opacity)
- **Accessibility:** aria-hidden. Marketing, auth, empty states and banners only; never behind tables, forms or charts.
- **Live example:** `#/surfaces`

```tsx
<div className="relative overflow-hidden"><Backdrop variant="waves" subtle /> …content…</div>
```

### SiteFooter

Six footers: columns, simple, minimal, newsletter, navy, app bar.

- **File:** `node_modules/@bytesphere/ui/src/components/site-footer/index.tsx`
- **Exports:** `SiteFooter`
- **Variants:** columns · simple · minimal · newsletter · navy · app
- **Props:** `variant: FooterVariant`
- **Live example:** `#/surfaces`

```tsx
<SiteFooter variant="navy" />
```

### TiltCard · SpotlightCard · FlipCard

Three hover or tap surfaces: tilt toward pointer (6 degrees max), brand glow that follows the cursor, and a two-sided flip. Marketing and showcase surfaces only.

- **File:** `node_modules/@bytesphere/ui/src/components/flip-card/index.tsx`
- **Exports:** `TiltCard`, `SpotlightCard`, `FlipCard`
- **Props:** `max: number` (TiltCard degrees); `front / back: ReactNode` (FlipCard faces)
- **Accessibility:** Flip is a toggle button; tilt is skipped on touch and reduced motion.
- **Live example:** `#/lab`

```tsx
<SpotlightCard>...</SpotlightCard>
<FlipCard front={a} back={b} />
```

### Card · CardHeader

The default container: raised surface, 1px border, padding 20. CardHeader adds a title, description and one action.

- **File:** `node_modules/@bytesphere/ui/src/components/card/index.tsx`
- **Exports:** `Card`, `CardHeader`
- **Variants:** default · interactive · flush (no padding, for tables)
- **Props:** `interactive: boolean` (hover and focus style for clickable cards); `flush: boolean` (remove padding); `title: string` (CardHeader); `action: ReactNode` (CardHeader, top right)
- **Accessibility:** Not a landmark. Put a heading inside when the card names a section.

```tsx
<Card>
  <CardHeader title="Members" desc="People with access." action={<Button size="sm">Invite</Button>} />
  ...
</Card>
```

## forms

### Button

Six variants, five sizes, loading with the brand mark, and disabled-with-reason.

- **File:** `node_modules/@bytesphere/ui/src/components/button/index.tsx`
- **Exports:** `Button`
- **Variants:** primary · secondary · ghost · subtle · accent · danger
- **Props:** `variant: Variant` (secondary); `size: "sm"|"md"|"lg"|"icon"|"icon-sm"`; `loading: boolean` (mark spinner, label stays); `reason: string` (makes it aria-disabled and shows the reason as a tooltip)
- **Accessibility:** One primary per view. Icon-only needs aria-label.
- **Live example:** `#/components`

```tsx
<Button variant="primary" loading={saving}>Save changes</Button>
<Button reason="Only admins can invite">Invite</Button>
<Button size="icon" variant="ghost" aria-label="Delete"><Trash2 /></Button>
```

### Field · Input · Textarea · Select

Label above, helper and error slots, start/end adornments, validation shake.

- **File:** `node_modules/@bytesphere/ui/src/components/field/index.tsx`
- **Exports:** `Field`, `Input`, `Textarea`, `Select`, `inputCls`
- **Props:** `Field: id, label, hint, error, optional` (children is a render function receiving aria props); `Input: start, end: ReactNode` (icons or buttons inside)
- **Accessibility:** aria-invalid and aria-describedby wired by Field.
- **Live example:** `#/components`

```tsx
<Field id="email" label="Work email" error={err} hint="Invoices go here">{(p) => <Input {...p} type="email" autoComplete="email" start={<Mail />} />}</Field>
```

### Checkbox · Switch · Radio

Selection controls with hint text; checkbox supports indeterminate.

- **File:** `node_modules/@bytesphere/ui/src/components/checkbox/index.tsx`
- **Exports:** `Checkbox`, `Switch`, `Radio`
- **Live example:** `#/components`

```tsx
<Checkbox id="a" label="Weekly summary" hint="Mondays" checked={v} onChange={setV} />
<Switch id="s" label="Email alerts" checked={on} onChange={setOn} />
```

### Combobox · TagInput · Slider · Dropzone

Searchable select, multi-email chips, labelled range, and a drag-and-drop uploader with per-file progress and errors.

- **File:** `node_modules/@bytesphere/ui/src/components/combobox/index.tsx`
- **Exports:** `Combobox`, `TagInput`, `Slider`, `Dropzone`
- **Live example:** `#/components`

```tsx
<Combobox id="c" options={countries} value={v} onChange={setV} />
<TagInput id="t" label="Invite" value={emails} onChange={setEmails} />
<Dropzone />
```

### SettingsRow

Two-column settings row: title and description left, controls right.

- **File:** `node_modules/@bytesphere/ui/src/components/hint/index.tsx`
- **Exports:** `SettingsRow`, `Hint`
- **Live example:** `#/settings/profile`

```tsx
<SettingsRow title="Email" desc="Used to sign in"><Input … /></SettingsRow>
```

### OtpInput

Six-box one-time code. Auto-advance, Backspace goes back, arrows move, paste fills every box, autocomplete=one-time-code, shakes on error.

- **File:** `node_modules/@bytesphere/ui/src/components/otp-input/index.tsx`
- **Exports:** `OtpInput`
- **Props:** `length: number` (default 6); `onComplete: (code) => void`; `error: boolean`
- **Accessibility:** Group label plus Digit n labels.
- **Live example:** `#/lab`

```tsx
<OtpInput onComplete={verify} error={bad} />
```

### RatingInput

1 to 5 star radio group with hover preview, arrow keys, click again to clear.

- **File:** `node_modules/@bytesphere/ui/src/components/rating-input/index.tsx`
- **Exports:** `RatingInput`
- **Props:** `value: number`; `onChange: (n) => void`
- **Accessibility:** Radio group, each star named.
- **Live example:** `#/lab`

```tsx
<RatingInput value={r} onChange={setR} />
```

### DateRangePicker

Month grid with start and end selection, hover preview, presets (7 days, this week, 30 days) and a live summary line.

- **File:** `node_modules/@bytesphere/ui/src/components/date-range-picker/index.tsx`
- **Exports:** `DateRangePicker`
- **Props:** `onChange: (range|null) => void`
- **Accessibility:** Days are buttons with aria-pressed; summary is a live region.
- **Live example:** `#/lab`

```tsx
<DateRangePicker onChange={setRange} />
```

### RippleButton

Primary button with a tap-point ripple. Use for the single most important touch action.

- **File:** `node_modules/@bytesphere/ui/src/components/ripple-button/index.tsx`
- **Exports:** `RippleButton`
- **Props:** `onClick: () => void`
- **Accessibility:** Normal button semantics.
- **Live example:** `#/lab`

```tsx
<RippleButton onClick={save}>Continue</RippleButton>
```

### ColorSwatchPicker · MentionInput

Brand-color radio swatches with check mark, and a comment box that suggests people after @ with arrow and Enter selection.

- **File:** `node_modules/@bytesphere/ui/src/components/color-swatch-picker/index.tsx`
- **Exports:** `ColorSwatchPicker`, `MentionInput`
- **Props:** `value / onChange: string / (c) => void`; `people: string[]`
- **Accessibility:** Swatches are radios; suggestions are a listbox.
- **Live example:** `#/lab`

```tsx
<ColorSwatchPicker value={c} onChange={setC} />
<MentionInput people={names} />
```

### ChatThread

Messaging UI: log with auto-scroll, composer (Enter sends, Shift+Enter newline), typing indicator, optional auto-reply for demos.

- **File:** `node_modules/@bytesphere/ui/src/components/chat-thread/index.tsx`
- **Exports:** `ChatThread`
- **Props:** `initial: {me,text,who}[]`; `reply: (text) => string`
- **Accessibility:** role=log with polite live region.
- **Live example:** `#/lab/advanced`

```tsx
<ChatThread initial={msgs} />
```

### EditableText · PasswordField

Click-to-edit text (Enter saves, Escape cancels) and a new-password field with show/hide, 4-step strength meter and live rule checklist.

- **File:** `node_modules/@bytesphere/ui/src/components/editable-text/index.tsx`
- **Exports:** `EditableText`, `PasswordField`, `scorePassword`
- **Props:** `value / onSave: string / (v) => void` (EditableText)
- **Accessibility:** Strength and rules are announced; toggle is aria-pressed.
- **Live example:** `#/lab/advanced`

```tsx
<EditableText value={name} onSave={setName} />
<PasswordField />
```

### RangeSlider

Dual-thumb min and max slider with keyboard steps (Shift = 10) and a readout.

- **File:** `node_modules/@bytesphere/ui/src/components/range-slider/index.tsx`
- **Exports:** `RangeSlider`
- **Props:** `value: [number, number]`; `min / max: number`; `format: (n) => string`
- **Accessibility:** Two role=slider thumbs with valuenow.
- **Live example:** `#/lab/advanced`

```tsx
<RangeSlider label="Price" value={r} onChange={setR} format={(n) => `$${n}`} />
```

### MarkdownEditor

Notes editor with toolbar buttons that insert syntax and a live side-by-side preview (headings, bold, italic, lists, code, links).

- **File:** `node_modules/@bytesphere/ui/src/components/markdown-editor/index.tsx`
- **Exports:** `MarkdownEditor`
- **Props:** `initial: string`
- **Accessibility:** Toolbar role, labelled textarea and preview.
- **Live example:** `#/lab/advanced`

```tsx
<MarkdownEditor />
```

### SignaturePad · ColorPicker

Pointer or touch signature canvas with clear, and an HSL color picker with hex output and copy.

- **File:** `node_modules/@bytesphere/ui/src/components/color-picker/index.tsx`
- **Exports:** `SignaturePad`, `ColorPicker`
- **Props:** `onChange: (png|null) => void | (hex) => void`
- **Accessibility:** Canvas is labelled; sliders are native ranges.
- **Live example:** `#/lab/advanced`

```tsx
<SignaturePad onChange={save} />
<ColorPicker onChange={setHex} />
```

### SearchWithRecents

Combobox search: recent searches on focus, highlighted matches, arrow and Enter selection, Clear recents.

- **File:** `node_modules/@bytesphere/ui/src/components/search-with-recents/index.tsx`
- **Exports:** `SearchWithRecents`
- **Props:** `data: string[]`
- **Accessibility:** role=combobox with listbox; Escape closes.
- **Live example:** `#/lab/advanced`

```tsx
<SearchWithRecents data={names} />
```

## feedback

### StatusPill · Count · FilterTag · Kbd

Status words in tinted 4px rectangles, count badges, removable filter chips, keyboard hints.

- **File:** `node_modules/@bytesphere/ui/src/components/count/index.tsx`
- **Exports:** `StatusPill`, `Count`, `FilterTag`, `Kbd`
- **Variants:** tones: success warning danger info neutral
- **Props:** `tone: Tone`; `dot: boolean`; `size: "sm"|"md"`
- **Accessibility:** The word carries the meaning; color is secondary.
- **Live example:** `#/components`

```tsx
<StatusPill tone="danger">Past due</StatusPill>
<Count n={4} />
<FilterTag k="Status" v="Active" onRemove={…} />
```

### Banner

Four tones. Full-width at the page top or as an inline callout. One at a time.

- **File:** `node_modules/@bytesphere/ui/src/components/banner/index.tsx`
- **Exports:** `Banner`
- **Props:** `tone: "info"|"success"|"warning"|"danger"`; `title: string`; `callout: boolean` (rounded inline); `action: ReactNode`; `onDismiss: () => void`
- **Accessibility:** role=alert for danger, status otherwise.
- **Live example:** `#/components`

```tsx
<Banner tone="warning" title="Card declined" action={<Button size="sm">Update</Button>}>Update it by 14 Mar.</Banner>
```

### Toast (ToastProvider, useToast)

Bottom-right, max 3, errors persist with an action, 5s for the rest.

- **File:** `node_modules/@bytesphere/ui/src/components/toast-provider/index.tsx`
- **Exports:** `ToastProvider`, `useToast`
- **Accessibility:** Live region; never for decisions or validation.
- **Live example:** `#/components`

```tsx
const toast = useToast();
toast({ tone: "success", title: "Saved", action: { label: "Undo", onClick } });
```

### StatePanel

Empty, error and no-results panel with art, one action and a reference id.

- **File:** `node_modules/@bytesphere/ui/src/components/state-panel/index.tsx`
- **Exports:** `StatePanel`
- **Props:** `art / icon: ReactNode`; `title, description: string`; `action: ReactNode`; `tone: "default"|"error"`; `compact: boolean`
- **Live example:** `#/states`

```tsx
<StatePanel art={<Art.search />} title="No deals match" description="Clear a filter." action={<Button>Clear filters</Button>} />
```

### StatusScreen

One full-page component that renders any of 50 system pages (404, 500, 503, 429, session expired, payment failed, maintenance, offline and more) from data in src/data/status.ts. Includes code pill, headline, actions, countdown and developer notes with an RFC 9457 body.

- **File:** `(source repo) apps/showcase/src/pages/Status.tsx`
- **Exports:** `StatusScreen`, `makeStatusPage`, `StatusGallery`
- **Props:** `s: Status` (an entry from statuses; find by slug); `embedded: boolean` (render inside the app shell instead of full page)
- **Accessibility:** Title is {code} {name}; focus moves to h1; countdown announces at start and end only.
- **Live example:** `#/status`

```tsx
import { statuses } from "@/data/status";
<StatusScreen s={statuses.find((x) => x.slug === "404")!} />
```

### NotificationCenter · NotificationList · NotificationItem

Bell with unread count that opens a 400px panel with All, Unread and Mentions tabs, mark all read and per-item actions. The store hook keeps read and dismiss state.

- **File:** `node_modules/@bytesphere/ui/src/components/notification-item/index.tsx`
- **Exports:** `NotificationCenter`, `NotificationList`, `NotificationItem`, `useNotifications`, `notifSeed`
- **Props:** `store: ReturnType<typeof useNotifications>` (optional; share one store with a full page); `onViewAll: () => void`
- **Accessibility:** Trigger names the unread count; Escape closes; items are a list; unread dot has a label.
- **Live example:** `#/notifications/system`

```tsx
const n = useNotifications();
<TopBar right={<NotificationCenter store={n} onViewAll={() => go('/notifications')} />} />
```

### NotificationPrefs · PushPreview · EmailPreview

Channel matrix (in app, email, push) per category with security email locked on, plus lock-screen push and email previews for designing copy.

- **File:** `node_modules/@bytesphere/ui/src/components/email-preview/index.tsx`
- **Exports:** `NotificationPrefs`, `PushPreview`, `EmailPreview`
- **Accessibility:** Each switch is labelled with category and channel.
- **Live example:** `#/notifications/system`

```tsx
<NotificationPrefs />
<PushPreview title="New sign-in" body="Chrome on Windows." />
```

### ReactionBar · StreakBadge · Achievement

Icon reactions with count pop, a streak chip, and a claimable achievement card that fires brand confetti. Confetti is rare: one per session.

- **File:** `node_modules/@bytesphere/ui/src/components/achievement/index.tsx`
- **Exports:** `ReactionBar`, `StreakBadge`, `Achievement`, `fireConfetti`
- **Props:** `fireConfetti: (origin?, count?) => void`
- **Accessibility:** Reactions are toggles with counts in the name; confetti is aria-hidden and skipped on reduced motion.
- **Live example:** `#/lab`

```tsx
<ReactionBar />
<Achievement title="First deal" body="Nice." />
```

### Poll · Lightbox

Vote with animated result bars (changeable), and a full-screen gallery with arrows, Escape and focus return.

- **File:** `node_modules/@bytesphere/ui/src/components/lightbox/index.tsx`
- **Exports:** `Poll`, `Lightbox`
- **Props:** `question / options: string / [label,count][]` (Poll); `items: {id,bg,title}[]` (Lightbox)
- **Accessibility:** Fieldset legend; dialog with focus return.
- **Live example:** `#/lab/advanced`

```tsx
<Poll question="..." options={opts} />
<Lightbox items={photos} />
```

### NotifBadge

Count pill for unread items; hides at 0 and caps at 99+.

- **File:** `node_modules/@bytesphere/ui/src/components/notif-badge/index.tsx`
- **Exports:** `NotifBadge`
- **Props:** `n: number`
- **Accessibility:** Pair with text such as "12 unread" for screen readers on the parent control.

```tsx
<NotifBadge n={12} />
```

## overlays

### Modal · Drawer

Native <dialog> with focus trap, Esc, and return focus. Modal for 3 fields or fewer, Drawer for side tasks.

- **File:** `node_modules/@bytesphere/ui/src/components/drawer/index.tsx`
- **Exports:** `Modal`, `Drawer`
- **Props:** `open / onClose`; `title / description: string`; `footer: ReactNode`; `width: "sm"|"md"|"lg"`; `danger: boolean` (alertdialog)
- **Live example:** `#/components`

```tsx
<Modal open={o} onClose={() => setO(false)} title="Delete report?" description="This can't be undone." danger footer={<><Button>Cancel</Button><Button variant="danger">Delete report</Button></>} />
```

### Menu · Tooltip

Keyboard menu with groups, shortcuts and a danger item last. Tooltip on hover and focus with a 500ms delay.

- **File:** `node_modules/@bytesphere/ui/src/components/menu/index.tsx`
- **Exports:** `Menu`, `Tooltip`
- **Accessibility:** Arrow keys, Home, End, Esc returns focus.
- **Live example:** `#/components`

```tsx
<Menu label="Actions" trigger={<Ellipsis />} items={[{label:"Edit"}, "sep", {label:"Delete…", danger:true}]} />
<Tooltip text="Delete invoice"><Button size="icon" aria-label="Delete invoice"><Trash2/></Button></Tooltip>
```

### HoverCard · ContextMenuArea

Rich preview on hover or focus (300 ms delay) and a right-click or long-press menu. Both must have a visible equivalent.

- **File:** `node_modules/@bytesphere/ui/src/components/context-menu-area/index.tsx`
- **Exports:** `HoverCard`, `ContextMenuArea`
- **Props:** `trigger: ReactNode`; `items: {label,icon,danger,onSelect}[]`
- **Accessibility:** Hover card opens on focus too; menu role=menu.
- **Live example:** `#/lab`

```tsx
<HoverCard trigger="Kenji">...</HoverCard>
<ContextMenuArea items={items}>row</ContextMenuArea>
```

### Tour

First-run walkthrough: dims the page, rings a target by CSS selector, 3 to 5 steps, Back, Next, Escape to skip.

- **File:** `node_modules/@bytesphere/ui/src/components/tour/index.tsx`
- **Exports:** `Tour`
- **Props:** `steps: {target,title,body}[]`; `open: boolean`; `onClose: () => void`
- **Accessibility:** Dialog with arrow-key navigation.
- **Live example:** `#/lab`

```tsx
<Tour open={on} onClose={off} steps={[{ target: '#new', title: 'Create', body: '...' }]} />
```

## loading

### Brand loaders

Loaders built from the mark. Swirl for content, Split for background work, Trace for inline, Orbit and Bloom for waiting states, Fill for known progress, a route bar and a boot screen.

- **File:** `node_modules/@bytesphere/ui/src/components/bloom-loader/index.tsx`
- **Exports:** `SwirlLoader`, `SplitLoader`, `TraceLoader`, `OrbitLoader`, `BloomLoader`, `FillLoader`, `RouteBar`, `BootLoader`, `SuccessTick`
- **Props:** `SwirlLoader/SplitLoader: size, label`; `FillLoader: value 0-100, size, label`; `RouteBar: active: boolean`
- **Accessibility:** role=status or progressbar with text.
- **Live example:** `#/loaders`

```tsx
<SwirlLoader label="Loading deals" />
<FillLoader value={pct} label="Exporting" />
<RouteBar active={navigating} />
```

### SkeletonKit

Twelve shaped skeletons with four animations (pulse, wave, static, mark).

- **File:** `node_modules/@bytesphere/ui/src/components/skeleton-kit/index.tsx`
- **Exports:** `SkeletonKit`
- **Variants:** text avatar card table chart list media form kpi profile product dashboard · anim: pulse wave static mark
- **Props:** `kind: SkKind`; `anim: SkAnim`
- **Accessibility:** role=status, aria-busy. Show after 150ms.
- **Live example:** `#/data-kit`

```tsx
{loading ? <SkeletonKit kind="table" anim="wave" /> : <Table … />}
```

### More loaders (L-10 to L-18)

Nine specific-purpose loaders: inline dots, processing bars, radar for search or scan, small ring, shimmer text for AI waits, typing indicator, sync grid, determinate ring and rotating status messages.

- **File:** `node_modules/@bytesphere/ui/src/components/determinate-ring/index.tsx`
- **Exports:** `DotsWave`, `Equalizer`, `Radar`, `RingSpin`, `ShimmerText`, `TypingDots`, `GridPulse`, `DeterminateRing`, `RotatingMessage`
- **Props:** `size / bars / n: number`; `value: number (DeterminateRing)`; `messages: string[]`
- **Accessibility:** All have role=status or progressbar; reduced motion falls back to a pulse.
- **Live example:** `#/loaders/more`

```tsx
<DotsWave />
<ShimmerText>Analyzing</ShimmerText>
<DeterminateRing value={64} />
```

### Skeleton

One placeholder block. Compose several to match the final layout; shown after 150ms so quick loads do not flash.

- **File:** `node_modules/@bytesphere/ui/src/components/skeleton/index.tsx`
- **Exports:** `Skeleton`
- **Props:** `className: string` (size and shape, e.g. h-4 w-32); `shimmer: boolean` (default true; off under reduced motion)
- **Accessibility:** aria-hidden. The container announces loading with aria-busy.

```tsx
<Skeleton className="h-4 w-32" />
```

## progress

### Progress family

Eleven forms of progress: linear (4 sizes, 5 tones), segmented, steps, stacked, ring, half ring, bullet, goal, buffer, indeterminate.

- **File:** `node_modules/@bytesphere/ui/src/components/progress-bar/index.tsx`
- **Exports:** `ProgressBar`, `ProgressSegmented`, `ProgressSteps`, `ProgressStacked`, `ProgressRing`, `ProgressHalf`, `ProgressBullet`, `ProgressGoal`, `ProgressBuffer`, `ProgressIndeterminate`
- **Props:** `ProgressBar: value, max, label, size, tone, showValue`; `ProgressRing: value, size, stroke, tone, center`
- **Accessibility:** role=progressbar with value and label.
- **Live example:** `#/data-kit`

```tsx
<ProgressBar label="Storage" value={41} max={100} showValue />
<ProgressRing value={72} label="Coverage" />
<ProgressGoal label="Revenue" value={412000} goal={500000} />
```

### Progress

Determinate progress bar with a required label and optional value text.

- **File:** `node_modules/@bytesphere/ui/src/components/progress/index.tsx`
- **Exports:** `Progress`
- **Props:** `value: number`; `max: number` (default 100); `label: string` (required accessible name); `tone: "primary"|"warning"|"danger"`
- **Accessibility:** role=progressbar with aria-valuenow, label required.

```tsx
<Progress label="Storage used" value={72} valueText="7.2 of 10 GB" />
```

## data

### StatTile

Eight ways to show one KPI with delta and period.

- **File:** `node_modules/@bytesphere/ui/src/components/stat-tile/index.tsx`
- **Exports:** `StatTile`
- **Variants:** plain · spark · icon · bar · delta · split · ring · inverse
- **Props:** `style: StatStyle`; `label, value: string`; `delta, good, period`; `data: number[]` (sparkline); `pct: number` (bar and ring)
- **Accessibility:** Delta uses arrow plus sign plus color.
- **Live example:** `#/data-kit`

```tsx
<StatTile style="spark" label="Net revenue" value="$46.2K" delta="4.2%" data={series} />
```

### Charts

Token-colored SVG charts with tabular numbers and text alternatives. Heavy datasets use ECharts instead.

- **File:** `node_modules/@bytesphere/ui/src/components/bar-list/index.tsx`
- **Exports:** `LineChart`, `BarList`, `Donut`, `Sparkline`, `Heatmap`, `Funnel`, `ColumnBars`, `StackedBars`
- **Tokens:** color-data-1..6
- **Accessibility:** role=img with a label; provide a table view for dense data.
- **Live example:** `#/data-kit`

```tsx
<LineChart labels={days} yMax={60} series={[{ name: "This period", data, color: "var(--color-data-1)" }]} />
<Funnel stages={[{label:"Visited",value:12400}]} />
```

### Timeline · DescList · CodeBlock · Accordion

Activity feed, key-value list, copyable code, and an accordion.

- **File:** `node_modules/@bytesphere/ui/src/components/accordion/index.tsx`
- **Exports:** `Timeline`, `DescList`, `CodeBlock`, `CopyButton`, `Accordion`
- **Live example:** `#/components`

```tsx
<Timeline items={[{ who: "Priya", what: "moved the deal", when: "Today" }]} />
<DescList items={[["Owner","Priya"]]} />
<CodeBlock lang="bash" code="curl …" />
```

### Avatar · AvatarGroup

Initials with a deterministic color from the user id, presence dot, square variant for organizations.

- **File:** `node_modules/@bytesphere/ui/src/components/avatar/index.tsx`
- **Exports:** `Avatar`, `AvatarGroup`
- **Props:** `id, name: string`; `size: 20|24|32|40|64|96`; `presence: online|away|busy|offline`; `square: boolean`
- **Live example:** `#/components`

```tsx
<Avatar id={user.id} name={user.name} size={32} presence="online" />
```

### AnimatedNumber · Typewriter · Reveal

Count a KPI up once, type a line out once, fade content in on scroll. All skip animation under reduced motion and give screen readers the final text.

- **File:** `node_modules/@bytesphere/ui/src/components/animated-number/index.tsx`
- **Exports:** `AnimatedNumber`, `Typewriter`, `Reveal`
- **Props:** `value: number`; `format: (n) => string`; `duration: number` (ms, default 900)
- **Accessibility:** Typewriter keeps full text in sr-only.
- **Live example:** `#/lab`

```tsx
<AnimatedNumber value={46231} format={usd} />
<Typewriter text="Hi Mia." />
<Reveal><Card/></Reveal>
```

### SortableList

Drag to reorder with a handle, plus Alt+Arrow keyboard moves and a live announcement.

- **File:** `node_modules/@bytesphere/ui/src/components/sortable-list/index.tsx`
- **Exports:** `SortableList`
- **Props:** `items: T[] with id`; `onChange: (next) => void`; `render: (item, i) => ReactNode`
- **Accessibility:** Handle is a button; position is announced.
- **Live example:** `#/lab`

```tsx
<SortableList items={rows} onChange={setRows} render={(r) => r.name} />
```

### DataTable

Reference table: search, sortable headers with aria-sort, row and page selection with indeterminate state, bulk action slot, paging, empty-search state.

- **File:** `node_modules/@bytesphere/ui/src/components/data-table/index.tsx`
- **Exports:** `DataTable`
- **Props:** `rows: T[] with id`; `columns: Col<T>[]` ({key,label,numeric,render,sortable}); `pageSize: number`; `bulk: (ids, clear) => ReactNode`
- **Accessibility:** Header buttons announce sort; checkboxes labelled.
- **Live example:** `#/lab/advanced`

```tsx
<DataTable rows={deals} columns={cols} bulk={(ids, clear) => <Button>Export</Button>} />
```

### KanbanDnD

Columns of cards moved by drag and drop, with a Move select on every card so touch and keyboard work. Announces moves.

- **File:** `node_modules/@bytesphere/ui/src/components/kanban-dnd/index.tsx`
- **Exports:** `KanbanDnD`
- **Props:** `columns: {id,title,cards}[]`; `onChange: (columns) => void`
- **Accessibility:** Move select labelled per card; live region reports moves.
- **Live example:** `#/lab/advanced`

```tsx
<KanbanDnD columns={cols} onChange={setCols} />
```

### TreeView

Nested folder tree with arrow-key navigation, expand and collapse, selection.

- **File:** `node_modules/@bytesphere/ui/src/components/tree-view/index.tsx`
- **Exports:** `TreeView`
- **Props:** `nodes: FileNode[]`; `onSelect: (node) => void`
- **Accessibility:** role=tree, aria-expanded, roving tabindex.
- **Live example:** `#/lab/advanced`

```tsx
<TreeView nodes={tree} onSelect={open} />
```

### SwipeRow · PullToRefresh · InfiniteList · VirtualList

Mobile list behaviours: swipe-to-reveal action, pull-to-refresh, infinite scroll with skeletons, and a virtualized list of 10,000 rows.

- **File:** `node_modules/@bytesphere/ui/src/components/infinite-list/index.tsx`
- **Exports:** `SwipeRow`, `PullToRefresh`, `InfiniteList`, `VirtualList`
- **Props:** `onAction: () => void` (SwipeRow); `onRefresh: () => Promise` (PullToRefresh); `count / render: number / (i) => node` (VirtualList)
- **Accessibility:** Every gesture has a button equivalent.
- **Live example:** `#/lab/advanced`

```tsx
<SwipeRow onAction={archive}>row</SwipeRow>
<VirtualList count={10000} render={(i) => i} />
```

### LiveChart · Gauge · ContributionHeatmap · Timer

Streaming line with pause, semi-circle gauge with thresholds, 5-step activity heatmap with tooltip, and a start/pause/reset timer.

- **File:** `node_modules/@bytesphere/ui/src/components/contribution-heatmap/index.tsx`
- **Exports:** `LiveChart`, `Gauge`, `ContributionHeatmap`, `Timer`
- **Props:** `value / label / max: number / string / number` (Gauge); `from / countdown: number / boolean` (Timer)
- **Accessibility:** Charts have text labels; timer role=timer.
- **Live example:** `#/lab/advanced`

```tsx
<LiveChart />
<Gauge value={72} label="CPU" />
<Timer from={90} />
```

### Stat

KPI tile: label, value, change with direction, period and optional sparkline. Has a loading state.

- **File:** `node_modules/@bytesphere/ui/src/components/stat/index.tsx`
- **Exports:** `Stat`
- **Props:** `label: string`; `value: string`; `delta: string`; `good: boolean` (colors the change; direction is also an arrow); `period: string`; `data: number[]` (sparkline); `loading: boolean`
- **Accessibility:** Change is text plus arrow, never color alone.

```tsx
<Stat label="Revenue" value="$48.2k" delta="+8.1%" good period="vs last month" />
```

## layout

### PageHeader

Title, description, breadcrumbs or back link, meta row and right-aligned actions. One primary action.

- **File:** `node_modules/@bytesphere/ui/src/components/page-header/index.tsx`
- **Exports:** `PageHeader`
- **Props:** `title, desc: string`; `crumbs: {label,href}[]`; `back: {label,href}`; `meta: ReactNode`; `actions: ReactNode`
- **Live example:** `#/deals`

```tsx
<PageHeader title="Deals" desc="Renewals and expansions." actions={<Button variant="primary">New deal</Button>} />
```

### Carousel · LogoMarquee

Scroll-snap carousel with arrows and dots that never auto-advances, and a pausing logo loop with edge fade.

- **File:** `node_modules/@bytesphere/ui/src/components/carousel/index.tsx`
- **Exports:** `Carousel`, `LogoMarquee`
- **Props:** `slides: ReactNode[]`; `items: ReactNode[]`
- **Accessibility:** carousel and slide roles; marquee stops under reduced motion.
- **Live example:** `#/lab`

```tsx
<Carousel slides={cards} />
<LogoMarquee items={names} />
```

### CompareSlider · ResizableSplit

Before and after reveal slider, and a two-pane layout with a draggable, keyboard-operable divider.

- **File:** `node_modules/@bytesphere/ui/src/components/compare-slider/index.tsx`
- **Exports:** `CompareSlider`, `ResizableSplit`
- **Props:** `before / after: ReactNode`; `left / right / initial: ReactNode / number`
- **Accessibility:** Both dividers are focusable with arrow keys and expose values.
- **Live example:** `#/lab`

```tsx
<CompareSlider before={a} after={b} />
```

### Label · Overline

Small caption styles for grouping headings in dense screens.

- **File:** `node_modules/@bytesphere/ui/src/components/label/index.tsx`
- **Exports:** `Label`, `Overline`
- **Accessibility:** Text only. Use a real heading when it names a region.

```tsx
<Overline>Billing</Overline>
```

### Specimen

Titled frame used in the showcase to present one example next to its doc reference.

- **File:** `node_modules/@bytesphere/ui/src/components/specimen/index.tsx`
- **Exports:** `Specimen`
- **Props:** `title: string`; `note: string`; `doc: string` (path of the spec); `pad: boolean`

```tsx
<Specimen title="Primary button" doc="03-components/button.md"><Button variant="primary">Save</Button></Specimen>
```

## commerce

### ProductCard

Five product card layouts with rating, badge, swatches, wishlist and quick add.

- **File:** `node_modules/@bytesphere/ui/src/components/product-card/index.tsx`
- **Exports:** `ProductCard`
- **Variants:** grid · list · compact · featured · minimal
- **Props:** `p: Product`; `variant: …`; `onAdd: (p) => void`; `wished / onWish`
- **Live example:** `#/store`

```tsx
<ProductCard p={product} onAdd={(p) => cart.add(p.id)} />
<ProductCard variant="list" p={product} />
```

### ProductArt

SVG product illustrations (bottle, headphones, chair, lamp, bag, watch) in four tones, so catalogs render without photo assets.

- **File:** `node_modules/@bytesphere/ui/src/components/product-art/index.tsx`
- **Exports:** `ProductArt`
- **Props:** `kind: ArtKind`; `tone: tint|navy|azure|sunken`
- **Live example:** `#/store`

```tsx
<ProductArt kind="watch" tone="navy" className="aspect-square" />
```

### Price · Rating · Swatches · QuantityStepper

Small store parts: price with discount, star rating, color swatches, quantity stepper.

- **File:** `node_modules/@bytesphere/ui/src/components/price/index.tsx`
- **Exports:** `Price`, `Rating`, `Swatches`, `QuantityStepper`
- **Live example:** `#/store/product`

```tsx
<Price price={189} was={249} />
<Rating value={4.6} count={389} />
<QuantityStepper value={q} onChange={setQ} />
```

### CartLine · OrderSummary · FilterPanel

Cart row, order summary with promo code, catalog filter panel, and a tiny cart store.

- **File:** `node_modules/@bytesphere/ui/src/components/cart-line/index.tsx`
- **Exports:** `CartLine`, `OrderSummary`, `FilterPanel`, `cart`, `useCart`
- **Live example:** `#/store/cart`

```tsx
const { lines, subtotal } = useCart();
<OrderSummary subtotal={subtotal} shipping={0} tax={subtotal*.08} cta={<Button variant="primary">Checkout</Button>} />
```

### OrderTimeline · ReviewItem

Vertical order tracking with done, current and upcoming states; review item.

- **File:** `node_modules/@bytesphere/ui/src/components/order-timeline/index.tsx`
- **Exports:** `OrderTimeline`, `trackingSteps`, `ReviewItem`
- **Live example:** `#/store/orders`

```tsx
<OrderTimeline steps={trackingSteps} current={2} />
```

## operations

### ScannerPanel · ScanFeed · DeviceRow

Barcode and QR scanner viewfinder with corner brackets and the scan-line recipe, live scan feed with Flash on arrival, and device status rows.

- **File:** `node_modules/@bytesphere/ui/src/components/device-row/index.tsx`
- **Exports:** `ScannerPanel`, `ScanFeed`, `DeviceRow`
- **Variants:** states: idle scanning success error paused · kind: barcode qr
- **Props:** `state: ScanState`; `kind: barcode|qr`; `onToggle / onSimulate / onKind`; `last: Scan`
- **Accessibility:** Status text in a live region; success and error never rely on color alone.
- **Live example:** `#/dashboards/scanning`

```tsx
<ScannerPanel state={state} kind={kind} onKind={setKind} onToggle={toggle} onSimulate={add} last={scans[0]} />
<ScanFeed scans={scans} />
```
