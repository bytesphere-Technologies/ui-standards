# AI index: find the component fast

Read this first. Then open `COMPONENTS.md` (or `catalog.json`) for the entry you pick.

## Rules
1. Import from `@bytesphere/ui`. Do not copy markup from a page; compose these.
2. Colors, radii, spacing come from tokens (Tailwind classes like `bg-surface-raised`, `text-secondary`, `rounded-card`). Never write hex.
3. One primary button per view. Every async surface needs loading, empty, error and stale states (`SkeletonKit`, `StatePanel`).
4. Use `<Logo>`; never type the company name in a font.
5. Corner style, dark mode and navigation style are user choices set through `useAppearance()`; do not hardcode them.
6. Glass, gradients and patterns only where their entry says so.

## I need… → use

| I need | Use | File |
|---|---|---|
| 2FA input | OtpInput | `packages/ui/src/components/otp-input/index.tsx` |
| 3D tilt card | TiltCard · SpotlightCard · FlipCard | `packages/ui/src/components/flip-card/index.tsx` |
| 404 page | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| 500 internal server error page | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| access denied | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| account and lists dropdown | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| account panel popover | PlatformBar · AppLauncher · AccountPanel · Popover | `packages/ui/src/components/account-panel/index.tsx` |
| achievement unlocked | ReactionBar · StreakBadge · Achievement | `packages/ui/src/components/achievement/index.tsx` |
| activity feed | Timeline · DescList · CodeBlock · Accordion | `packages/ui/src/components/accordion/index.tsx` |
| activity feed | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| activity heatmap | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| admin or dashboard navigation | SideNav | `packages/ui/src/components/side-nav/index.tsx` |
| ai thinking shimmer | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| alert message | Banner | `packages/ui/src/components/banner/index.tsx` |
| alerts list | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| all departments menu | DepartmentDrawer | `packages/ui/src/components/department-drawer/index.tsx` |
| amazon style header | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| animated brand mark | BrandMark | `packages/ui/src/components/brand-mark/index.tsx` |
| animated stat | AnimatedNumber · Typewriter · Reveal | `packages/ui/src/components/animated-number/index.tsx` |
| any HTTP error page | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| app boot screen | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| app footer | SiteFooter | `packages/ui/src/components/site-footer/index.tsx` |
| app header | TopBar | `packages/ui/src/components/search-trigger/index.tsx` |
| app launcher grid menu | PlatformBar · AppLauncher · AccountPanel · Popover | `packages/ui/src/components/account-panel/index.tsx` |
| apple style navigation | GlobalBar | `packages/ui/src/components/global-bar/index.tsx` |
| assistant conversation | ChatThread | `packages/ui/src/components/chat-thread/index.tsx` |
| autocomplete search | SearchWithRecents | `packages/ui/src/components/search-with-recents/index.tsx` |
| avatar stack | Avatar · AvatarGroup | `packages/ui/src/components/avatar/index.tsx` |
| back to top button | BackToTop · ScrollProgress | `packages/ui/src/components/back-to-top/index.tsx` |
| background pattern | Backdrop | `packages/ui/src/components/backdrop/index.tsx` |
| background without svg | Backdrop | `packages/ui/src/components/backdrop/index.tsx` |
| badge on an icon | NotifBadge | `packages/ui/src/components/notif-badge/index.tsx` |
| bar chart | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| barcode scanner ui | ScannerPanel · ScanFeed · DeviceRow | `packages/ui/src/components/device-row/index.tsx` |
| before after image | CompareSlider · ResizableSplit | `packages/ui/src/components/compare-slider/index.tsx` |
| blurred card over image | Glass | `packages/ui/src/components/glass/index.tsx` |
| booking dates | DateRangePicker | `packages/ui/src/components/date-range-picker/index.tsx` |
| brand colored background | Backdrop | `packages/ui/src/components/backdrop/index.tsx` |
| brand colored card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| brand website header with flyouts | GlobalBar | `packages/ui/src/components/global-bar/index.tsx` |
| branded header | TopBar | `packages/ui/src/components/search-trigger/index.tsx` |
| breadcrumbs | Breadcrumb · Pagination · Stepper | `packages/ui/src/components/breadcrumb/index.tsx` |
| bulk actions table | DataTable | `packages/ui/src/components/data-table/index.tsx` |
| button | Button | `packages/ui/src/components/button/index.tsx` |
| button with options | SpeedDial · SplitButton | `packages/ui/src/components/speed-dial/index.tsx` |
| capacity gauge | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| card skeleton | SkeletonKit | `packages/ui/src/components/skeleton-kit/index.tsx` |
| card with image on the side | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
| cart icon with count | EcomHeader | `packages/ui/src/components/ecom-header/index.tsx` |
| catalog with thousands of categories | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| category menu | EcomHeader | `packages/ui/src/components/ecom-header/index.tsx` |
| category sidebar | CategoryTree | `packages/ui/src/components/category-tree/index.tsx` |
| celebrate milestone | ReactionBar · StreakBadge · Achievement | `packages/ui/src/components/achievement/index.tsx` |
| change corner radius globally | Appearance (useAppearance, AppearancePanel) | `packages/ui/src/components/appearance/index.tsx` |
| chat ui | ChatThread | `packages/ui/src/components/chat-thread/index.tsx` |
| checkbox | Checkbox · Switch · Radio | `packages/ui/src/components/checkbox/index.tsx` |
| checkout totals | CartLine · OrderSummary · FilterPanel | `packages/ui/src/components/cart-line/index.tsx` |
| circular progress | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| coachmark | Tour | `packages/ui/src/components/tour/index.tsx` |
| code snippet with copy | Timeline · DescList · CodeBlock · Accordion | `packages/ui/src/components/accordion/index.tsx` |
| collapsible sidebar | SideNav | `packages/ui/src/components/side-nav/index.tsx` |
| color picker | SignaturePad · ColorPicker | `packages/ui/src/components/color-picker/index.tsx` |
| color picker swatches | Price · Rating · Swatches · QuantityStepper | `packages/ui/src/components/price/index.tsx` |
| comment thread composer | ChatThread | `packages/ui/src/components/chat-thread/index.tsx` |
| comment with @mentions | ColorSwatchPicker · MentionInput | `packages/ui/src/components/color-swatch-picker/index.tsx` |
| confetti | ReactionBar · StreakBadge · Achievement | `packages/ui/src/components/achievement/index.tsx` |
| confirm delete dialog | Modal · Drawer | `packages/ui/src/components/drawer/index.tsx` |
| context actions | Menu · Tooltip | `packages/ui/src/components/menu/index.tsx` |
| count up number | AnimatedNumber · Typewriter · Reveal | `packages/ui/src/components/animated-number/index.tsx` |
| countdown timer | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| create menu on mobile | SpeedDial · SplitButton | `packages/ui/src/components/speed-dial/index.tsx` |
| create password field | EditableText · PasswordField | `packages/ui/src/components/editable-text/index.tsx` |
| customer logos strip | Carousel · LogoMarquee | `packages/ui/src/components/carousel/index.tsx` |
| danger button | Button | `packages/ui/src/components/button/index.tsx` |
| dark card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| dark global navigation bar | GlobalBar | `packages/ui/src/components/global-bar/index.tsx` |
| dark mode | Appearance (useAppearance, AppearancePanel) | `packages/ui/src/components/appearance/index.tsx` |
| dashboard number | Stat | `packages/ui/src/components/stat/index.tsx` |
| dashboard skeleton | SkeletonKit | `packages/ui/src/components/skeleton-kit/index.tsx` |
| dashboard widget frame | Card · CardHeader | `packages/ui/src/components/card/index.tsx` |
| dashed add card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| data table | DataTable | `packages/ui/src/components/data-table/index.tsx` |
| date range | DateRangePicker | `packages/ui/src/components/date-range-picker/index.tsx` |
| delivery proof | SignaturePad · ColorPicker | `packages/ui/src/components/color-picker/index.tsx` |
| details list | Timeline · DescList · CodeBlock · Accordion | `packages/ui/src/components/accordion/index.tsx` |
| device status list | ScannerPanel · ScanFeed · DeviceRow | `packages/ui/src/components/device-row/index.tsx` |
| dialog | Modal · Drawer | `packages/ui/src/components/drawer/index.tsx` |
| disabled button with reason | Button | `packages/ui/src/components/button/index.tsx` |
| documentation frame | Specimen | `packages/ui/src/components/specimen/index.tsx` |
| donut | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| drag and drop list | SortableList | `packages/ui/src/components/sortable-list/index.tsx` |
| drag cards between columns | KanbanDnD | `packages/ui/src/components/kanban-dnd/index.tsx` |
| drag to resize | CompareSlider · ResizableSplit | `packages/ui/src/components/compare-slider/index.tsx` |
| drawer | Modal · Drawer | `packages/ui/src/components/drawer/index.tsx` |
| drill down navigation | DepartmentDrawer | `packages/ui/src/components/department-drawer/index.tsx` |
| dropdown menu | Menu · Tooltip | `packages/ui/src/components/menu/index.tsx` |
| dropdown with many links | MegaMenu | `packages/ui/src/components/mega-menu/index.tsx` |
| dual slider | RangeSlider | `packages/ui/src/components/range-slider/index.tsx` |
| ecommerce header | EcomHeader | `packages/ui/src/components/ecom-header/index.tsx` |
| email chips input | Combobox · TagInput · Slider · Dropzone | `packages/ui/src/components/combobox/index.tsx` |
| email preferences matrix | NotificationPrefs · PushPreview · EmailPreview | `packages/ui/src/components/email-preview/index.tsx` |
| empty state | StatePanel | `packages/ui/src/components/state-panel/index.tsx` |
| empty state picture | Art (illustrations) | `packages/ui/src/components/art/index.tsx` |
| error message under input | Field · Input · Textarea · Select | `packages/ui/src/components/field/index.tsx` |
| error page art | Art (illustrations) | `packages/ui/src/components/art/index.tsx` |
| error state | StatePanel | `packages/ui/src/components/state-panel/index.tsx` |
| facebook meta style navigation | PlatformBar · AppLauncher · AccountPanel · Popover | `packages/ui/src/components/account-panel/index.tsx` |
| fade in on scroll | AnimatedNumber · Typewriter · Reveal | `packages/ui/src/components/animated-number/index.tsx` |
| faq accordion | Timeline · DescList · CodeBlock · Accordion | `packages/ui/src/components/accordion/index.tsx` |
| favicon or app icon source | Logo | `packages/ui/src/components/logo/index.tsx` |
| feature card with icon | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
| feature highlight | Tour | `packages/ui/src/components/tour/index.tsx` |
| featured product | ProductCard | `packages/ui/src/components/product-card/index.tsx` |
| feedback stars | RatingInput | `packages/ui/src/components/rating-input/index.tsx` |
| file tree | TreeView | `packages/ui/src/components/tree-view/index.tsx` |
| file upload | Combobox · TagInput · Slider · Dropzone | `packages/ui/src/components/combobox/index.tsx` |
| filter chip with remove | StatusPill · Count · FilterTag · Kbd | `packages/ui/src/components/count/index.tsx` |
| filter chips | Tabs · PillTabs · VerticalTabs · SubNav · Segmented | `packages/ui/src/components/pill-tabs/index.tsx` |
| filter range | RangeSlider | `packages/ui/src/components/range-slider/index.tsx` |
| flip card | TiltCard · SpotlightCard · FlipCard | `packages/ui/src/components/flip-card/index.tsx` |
| floating action button menu | SpeedDial · SplitButton | `packages/ui/src/components/speed-dial/index.tsx` |
| floating sidebar | SideNav | `packages/ui/src/components/side-nav/index.tsx` |
| folder tree | TreeView | `packages/ui/src/components/tree-view/index.tsx` |
| footer with newsletter | SiteFooter | `packages/ui/src/components/site-footer/index.tsx` |
| form field | Field · Input · Textarea · Select | `packages/ui/src/components/field/index.tsx` |
| full width mega menu | GlobalBar | `packages/ui/src/components/global-bar/index.tsx` |
| funnel | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| gauge | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| glass card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| glassmorphism | Glass | `packages/ui/src/components/glass/index.tsx` |
| goal progress | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| group related content | Card · CardHeader | `packages/ui/src/components/card/index.tsx` |
| hamburger menu with nested levels | DepartmentDrawer | `packages/ui/src/components/department-drawer/index.tsx` |
| heatmap | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| hero background | Backdrop | `packages/ui/src/components/backdrop/index.tsx` |
| hex color | SignaturePad · ColorPicker | `packages/ui/src/components/color-picker/index.tsx` |
| highlight matches | SearchWithRecents | `packages/ui/src/components/search-with-recents/index.tsx` |
| hover glow card | TiltCard · SpotlightCard · FlipCard | `packages/ui/src/components/flip-card/index.tsx` |
| icon button | Button | `packages/ui/src/components/button/index.tsx` |
| icon rail | SideNav | `packages/ui/src/components/side-nav/index.tsx` |
| image carousel | Carousel · LogoMarquee | `packages/ui/src/components/carousel/index.tsx` |
| image gallery | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| infinite scroll | SwipeRow · PullToRefresh · InfiniteList · VirtualList | `packages/ui/src/components/infinite-list/index.tsx` |
| inline callout | Banner | `packages/ui/src/components/banner/index.tsx` |
| inline edit title | EditableText · PasswordField | `packages/ui/src/components/editable-text/index.tsx` |
| inline loading dots | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| interactive feature card | TiltCard · SpotlightCard · FlipCard | `packages/ui/src/components/flip-card/index.tsx` |
| inventory receiving | ScannerPanel · ScanFeed · DeviceRow | `packages/ui/src/components/device-row/index.tsx` |
| kanban board | KanbanDnD | `packages/ui/src/components/kanban-dnd/index.tsx` |
| keyboard shortcut hint | StatusPill · Count · FilterTag · Kbd | `packages/ui/src/components/count/index.tsx` |
| kpi card | Stat | `packages/ui/src/components/stat/index.tsx` |
| KPI card | StatTile | `packages/ui/src/components/stat-tile/index.tsx` |
| label color picker | ColorSwatchPicker · MentionInput | `packages/ui/src/components/color-swatch-picker/index.tsx` |
| let the user pick a dark theme | Appearance (useAppearance, AppearancePanel) | `packages/ui/src/components/appearance/index.tsx` |
| lightbox | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| like button with count | ReactionBar · StreakBadge · Achievement | `packages/ui/src/components/achievement/index.tsx` |
| line chart | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| list card | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
| live chart | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| live preview | MarkdownEditor | `packages/ui/src/components/markdown-editor/index.tsx` |
| loading button | Button | `packages/ui/src/components/button/index.tsx` |
| loading placeholder | Skeleton | `packages/ui/src/components/skeleton/index.tsx` |
| loading skeleton | SkeletonKit | `packages/ui/src/components/skeleton-kit/index.tsx` |
| loading spinner | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| logo on a dark or colored background | Logo | `packages/ui/src/components/logo/index.tsx` |
| long article helper | BackToTop · ScrollProgress | `packages/ui/src/components/back-to-top/index.tsx` |
| long list performance | SwipeRow · PullToRefresh · InfiniteList · VirtualList | `packages/ui/src/components/infinite-list/index.tsx` |
| long press menu | HoverCard · ContextMenuArea | `packages/ui/src/components/context-menu-area/index.tsx` |
| maintenance page | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| mark all as read | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| mark inside a button | BrandMark | `packages/ui/src/components/brand-mark/index.tsx` |
| markdown editor | MarkdownEditor | `packages/ui/src/components/markdown-editor/index.tsx` |
| marketing site header | SiteHeader | `packages/ui/src/components/site-header/index.tsx` |
| marketplace header | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| massive ecommerce navigation | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| material ripple button | RippleButton | `packages/ui/src/components/ripple-button/index.tsx` |
| mega menu | MegaMenu | `packages/ui/src/components/mega-menu/index.tsx` |
| mention people | ColorSwatchPicker · MentionInput | `packages/ui/src/components/color-swatch-picker/index.tsx` |
| messaging | ChatThread | `packages/ui/src/components/chat-thread/index.tsx` |
| metric tile | StatTile | `packages/ui/src/components/stat-tile/index.tsx` |
| metric with trend | Stat | `packages/ui/src/components/stat/index.tsx` |
| min max slider | RangeSlider | `packages/ui/src/components/range-slider/index.tsx` |
| minimal product tile | ProductCard | `packages/ui/src/components/product-card/index.tsx` |
| mobile menu with categories | DepartmentDrawer | `packages/ui/src/components/department-drawer/index.tsx` |
| mobile navigation | BottomTabs | `packages/ui/src/components/bottom-tabs/index.tsx` |
| multi-step wizard progress | Breadcrumb · Pagination · Stepper | `packages/ui/src/components/breadcrumb/index.tsx` |
| navigation with dropdown mega menu | SiteHeader | `packages/ui/src/components/site-header/index.tsx` |
| navigation with many sections | GlobalBar | `packages/ui/src/components/global-bar/index.tsx` |
| nested categories | TreeView | `packages/ui/src/components/tree-view/index.tsx` |
| nested categories with counts | CategoryTree | `packages/ui/src/components/category-tree/index.tsx` |
| no results illustration | Art (illustrations) | `packages/ui/src/components/art/index.tsx` |
| no results message | StatePanel | `packages/ui/src/components/state-panel/index.tsx` |
| notes editor | MarkdownEditor | `packages/ui/src/components/markdown-editor/index.tsx` |
| notification center | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| notification count | StatusPill · Count · FilterTag · Kbd | `packages/ui/src/components/count/index.tsx` |
| notification count | NotifBadge | `packages/ui/src/components/notif-badge/index.tsx` |
| notification dropdown | PlatformBar · AppLauncher · AccountPanel · Popover | `packages/ui/src/components/account-panel/index.tsx` |
| notification settings | NotificationPrefs · PushPreview · EmailPreview | `packages/ui/src/components/email-preview/index.tsx` |
| notifications bell | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| number with trend | StatTile | `packages/ui/src/components/stat-tile/index.tsx` |
| offline page | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| onboarding walkthrough | Tour | `packages/ui/src/components/tour/index.tsx` |
| order summary | CartLine · OrderSummary · FilterPanel | `packages/ui/src/components/cart-line/index.tsx` |
| order tracking | OrderTimeline · ReviewItem | `packages/ui/src/components/order-timeline/index.tsx` |
| org tree | TreeView | `packages/ui/src/components/tree-view/index.tsx` |
| organization logo placeholder | Avatar · AvatarGroup | `packages/ui/src/components/avatar/index.tsx` |
| page header with actions | PageHeader | `packages/ui/src/components/page-header/index.tsx` |
| page loader | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| page title | PageHeader | `packages/ui/src/components/page-header/index.tsx` |
| pagination | Breadcrumb · Pagination · Stepper | `packages/ui/src/components/breadcrumb/index.tsx` |
| panel with a title | Card · CardHeader | `packages/ui/src/components/card/index.tsx` |
| password strength meter | EditableText · PasswordField | `packages/ui/src/components/editable-text/index.tsx` |
| payment failed screen | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| photo viewer | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| pick start and end date | DateRangePicker | `packages/ui/src/components/date-range-picker/index.tsx` |
| pin entry | OtpInput | `packages/ui/src/components/otp-input/index.tsx` |
| pipeline board | KanbanDnD | `packages/ui/src/components/kanban-dnd/index.tsx` |
| placeholder product image | ProductArt | `packages/ui/src/components/product-art/index.tsx` |
| poll | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| portrait card | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
| preview email | NotificationPrefs · PushPreview · EmailPreview | `packages/ui/src/components/email-preview/index.tsx` |
| preview push notification | NotificationPrefs · PushPreview · EmailPreview | `packages/ui/src/components/email-preview/index.tsx` |
| price range | RangeSlider | `packages/ui/src/components/range-slider/index.tsx` |
| price with sale | Price · Rating · Swatches · QuantityStepper | `packages/ui/src/components/price/index.tsx` |
| priority ordering | SortableList | `packages/ui/src/components/sortable-list/index.tsx` |
| processing animation | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| product card | ProductCard | `packages/ui/src/components/product-card/index.tsx` |
| product filters | CartLine · OrderSummary · FilterPanel | `packages/ui/src/components/cart-line/index.tsx` |
| product grid item | ProductCard | `packages/ui/src/components/product-card/index.tsx` |
| product list row | ProductCard | `packages/ui/src/components/product-card/index.tsx` |
| product review | OrderTimeline · ReviewItem | `packages/ui/src/components/order-timeline/index.tsx` |
| product skeleton | SkeletonKit | `packages/ui/src/components/skeleton-kit/index.tsx` |
| product tour | Tour | `packages/ui/src/components/tour/index.tsx` |
| profile card | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
| profile form rows | SettingsRow | `packages/ui/src/components/hint/index.tsx` |
| profile hover card | HoverCard · ContextMenuArea | `packages/ui/src/components/context-menu-area/index.tsx` |
| progress bar | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| progress ring | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| pull to refresh | SwipeRow · PullToRefresh · InfiniteList · VirtualList | `packages/ui/src/components/infinite-list/index.tsx` |
| put the brand name in a header | Logo | `packages/ui/src/components/logo/index.tsx` |
| qr scanner | ScannerPanel · ScanFeed · DeviceRow | `packages/ui/src/components/device-row/index.tsx` |
| quantity input | Price · Rating · Swatches · QuantityStepper | `packages/ui/src/components/price/index.tsx` |
| quick survey | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| radar searching | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| radio buttons | Checkbox · Switch · Radio | `packages/ui/src/components/checkbox/index.tsx` |
| range slider | Combobox · TagInput · Slider · Dropzone | `packages/ui/src/components/combobox/index.tsx` |
| rate limit page with countdown | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| reading progress bar | BackToTop · ScrollProgress | `packages/ui/src/components/back-to-top/index.tsx` |
| real-time metric | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| recent searches | SearchWithRecents | `packages/ui/src/components/search-with-recents/index.tsx` |
| rename in place | EditableText · PasswordField | `packages/ui/src/components/editable-text/index.tsx` |
| reorder list | SortableList | `packages/ui/src/components/sortable-list/index.tsx` |
| report period | DateRangePicker | `packages/ui/src/components/date-range-picker/index.tsx` |
| resizable panels | CompareSlider · ResizableSplit | `packages/ui/src/components/compare-slider/index.tsx` |
| review rating | RatingInput | `packages/ui/src/components/rating-input/index.tsx` |
| rich text light | MarkdownEditor | `packages/ui/src/components/markdown-editor/index.tsx` |
| right click menu | HoverCard · ContextMenuArea | `packages/ui/src/components/context-menu-area/index.tsx` |
| rotating loading messages | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| route change progress | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| save and close dropdown | SpeedDial · SplitButton | `packages/ui/src/components/speed-dial/index.tsx` |
| scan history | ScannerPanel · ScanFeed · DeviceRow | `packages/ui/src/components/device-row/index.tsx` |
| search with history | SearchWithRecents | `packages/ui/src/components/search-with-recents/index.tsx` |
| search with suggestions | MarketplaceHeader | `packages/ui/src/components/marketplace-header/index.tsx` |
| searchable dropdown | Combobox · TagInput · Slider · Dropzone | `packages/ui/src/components/combobox/index.tsx` |
| select dropdown | Field · Input · Textarea · Select | `packages/ui/src/components/field/index.tsx` |
| select rows | DataTable | `packages/ui/src/components/data-table/index.tsx` |
| session expired | StatusScreen | `apps/showcase/src/pages/Status.tsx` |
| settings page layout | SettingsRow | `packages/ui/src/components/hint/index.tsx` |
| settings section container | Card · CardHeader | `packages/ui/src/components/card/index.tsx` |
| settings sub navigation | Tabs · PillTabs · VerticalTabs · SubNav · Segmented | `packages/ui/src/components/pill-tabs/index.tsx` |
| shimmer block | Skeleton | `packages/ui/src/components/skeleton/index.tsx` |
| shipment status | OrderTimeline · ReviewItem | `packages/ui/src/components/order-timeline/index.tsx` |
| shopping cart | CartLine · OrderSummary · FilterPanel | `packages/ui/src/components/cart-line/index.tsx` |
| show a component example in docs | Specimen | `packages/ui/src/components/specimen/index.tsx` |
| show hide password | EditableText · PasswordField | `packages/ui/src/components/editable-text/index.tsx` |
| show the company logo | Logo | `packages/ui/src/components/logo/index.tsx` |
| side panel | Modal · Drawer | `packages/ui/src/components/drawer/index.tsx` |
| sidebar navigation | SideNav | `packages/ui/src/components/side-nav/index.tsx` |
| sign here | SignaturePad · ColorPicker | `packages/ui/src/components/color-picker/index.tsx` |
| signature | SignaturePad · ColorPicker | `packages/ui/src/components/color-picker/index.tsx` |
| skeleton for a card | Skeleton | `packages/ui/src/components/skeleton/index.tsx` |
| slider of cards | Carousel · LogoMarquee | `packages/ui/src/components/carousel/index.tsx` |
| small brand icon | BrandMark | `packages/ui/src/components/brand-mark/index.tsx` |
| small section caption | Label · Overline | `packages/ui/src/components/label/index.tsx` |
| SMS code | OtpInput | `packages/ui/src/components/otp-input/index.tsx` |
| social or suite navigation | PlatformBar · AppLauncher · AccountPanel · Popover | `packages/ui/src/components/account-panel/index.tsx` |
| sort items manually | SortableList | `packages/ui/src/components/sortable-list/index.tsx` |
| sortable table | DataTable | `packages/ui/src/components/data-table/index.tsx` |
| sparkline | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| split view | CompareSlider · ResizableSplit | `packages/ui/src/components/compare-slider/index.tsx` |
| stacked bars | Charts | `packages/ui/src/components/bar-list/index.tsx` |
| star rating | Price · Rating · Swatches · QuantityStepper | `packages/ui/src/components/price/index.tsx` |
| star rating | RatingInput | `packages/ui/src/components/rating-input/index.tsx` |
| stat card with sparkline | StatTile | `packages/ui/src/components/stat-tile/index.tsx` |
| stat with progress | StatTile | `packages/ui/src/components/stat-tile/index.tsx` |
| status badge | StatusPill · Count · FilterTag · Kbd | `packages/ui/src/components/count/index.tsx` |
| step completion bar | Progress | `packages/ui/src/components/progress/index.tsx` |
| step progress | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| stopwatch | LiveChart · Gauge · ContributionHeatmap · Timer | `packages/ui/src/components/contribution-heatmap/index.tsx` |
| storage used | Progress | `packages/ui/src/components/progress/index.tsx` |
| store navigation | EcomHeader | `packages/ui/src/components/ecom-header/index.tsx` |
| streak | ReactionBar · StreakBadge · Achievement | `packages/ui/src/components/achievement/index.tsx` |
| success checkmark animation | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| success message | Banner | `packages/ui/src/components/banner/index.tsx` |
| success message after save | Toast (ToastProvider, useToast) | `packages/ui/src/components/toast-provider/index.tsx` |
| svg background | Backdrop | `packages/ui/src/components/backdrop/index.tsx` |
| svg product picture | ProductArt | `packages/ui/src/components/product-art/index.tsx` |
| swipe to delete | SwipeRow · PullToRefresh · InfiniteList · VirtualList | `packages/ui/src/components/infinite-list/index.tsx` |
| switch navigation style | Appearance (useAppearance, AppearancePanel) | `packages/ui/src/components/appearance/index.tsx` |
| tab bar at the bottom | BottomTabs | `packages/ui/src/components/bottom-tabs/index.tsx` |
| table skeleton | SkeletonKit | `packages/ui/src/components/skeleton-kit/index.tsx` |
| table with search and pagination | DataTable | `packages/ui/src/components/data-table/index.tsx` |
| tabs | Tabs · PillTabs · VerticalTabs · SubNav · Segmented | `packages/ui/src/components/pill-tabs/index.tsx` |
| tag color | ColorSwatchPicker · MentionInput | `packages/ui/src/components/color-swatch-picker/index.tsx` |
| tap feedback | RippleButton | `packages/ui/src/components/ripple-button/index.tsx` |
| task board | KanbanDnD | `packages/ui/src/components/kanban-dnd/index.tsx` |
| testimonials slider | Carousel · LogoMarquee | `packages/ui/src/components/carousel/index.tsx` |
| text input with icon | Field · Input · Textarea · Select | `packages/ui/src/components/field/index.tsx` |
| textarea | Field · Input · Textarea · Select | `packages/ui/src/components/field/index.tsx` |
| theme picker | Appearance (useAppearance, AppearancePanel) | `packages/ui/src/components/appearance/index.tsx` |
| tinted callout card | SurfaceCard | `packages/ui/src/components/surface-card/index.tsx` |
| toast notification | Toast (ToastProvider, useToast) | `packages/ui/src/components/toast-provider/index.tsx` |
| toggle switch | Checkbox · Switch · Radio | `packages/ui/src/components/checkbox/index.tsx` |
| tooltip | Menu · Tooltip | `packages/ui/src/components/menu/index.tsx` |
| top bar with search | TopBar | `packages/ui/src/components/search-trigger/index.tsx` |
| transparent card | Glass | `packages/ui/src/components/glass/index.tsx` |
| tree navigation | CategoryTree | `packages/ui/src/components/category-tree/index.tsx` |
| typing indicator | More loaders (L-10 to L-18) | `packages/ui/src/components/determinate-ring/index.tsx` |
| typing text effect | AnimatedNumber · Typewriter · Reveal | `packages/ui/src/components/animated-number/index.tsx` |
| undo snackbar | Toast (ToastProvider, useToast) | `packages/ui/src/components/toast-provider/index.tsx` |
| unread badge | NotificationCenter · NotificationList · NotificationItem | `packages/ui/src/components/notification-item/index.tsx` |
| unread count | NotifBadge | `packages/ui/src/components/notif-badge/index.tsx` |
| upload progress | Progress family | `packages/ui/src/components/progress-bar/index.tsx` |
| upload progress | Progress | `packages/ui/src/components/progress/index.tsx` |
| upload progress with logo | Brand loaders | `packages/ui/src/components/bloom-loader/index.tsx` |
| uppercase eyebrow text | Label · Overline | `packages/ui/src/components/label/index.tsx` |
| user avatar | Avatar · AvatarGroup | `packages/ui/src/components/avatar/index.tsx` |
| user preview on hover | HoverCard · ContextMenuArea | `packages/ui/src/components/context-menu-area/index.tsx` |
| verification code | OtpInput | `packages/ui/src/components/otp-input/index.tsx` |
| view switcher list board calendar | Tabs · PillTabs · VerticalTabs · SubNav · Segmented | `packages/ui/src/components/pill-tabs/index.tsx` |
| virtual scrolling | SwipeRow · PullToRefresh · InfiniteList · VirtualList | `packages/ui/src/components/infinite-list/index.tsx` |
| vote | Poll · Lightbox | `packages/ui/src/components/lightbox/index.tsx` |
| warning banner | Banner | `packages/ui/src/components/banner/index.tsx` |
| website footer | SiteFooter | `packages/ui/src/components/site-footer/index.tsx` |
| website nav | SiteHeader | `packages/ui/src/components/site-header/index.tsx` |
| wide banner card | Rectangle cards | `packages/ui/src/components/action-card/index.tsx` |
