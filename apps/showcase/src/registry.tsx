import type { ComponentType } from "react";
import { Palette, Component, Gem, SwatchBook, Compass, PanelsTopLeft, ShieldAlert, FileWarning, MonitorCog,  Globe2, ShoppingBasket, LayoutGrid as Grid3,  ChartColumn, Boxes, Store, Package, ShoppingCart, CreditCard as Card2, ClipboardList, ScanLine, UsersRound, Loader, Sparkles, Library, Layers, ShieldBan, LayoutDashboard, Table2, FileText, Plus, Kanban, Inbox, Search, ListChecks, User, Shield, Bell, SunMoon, Building2, Users, CreditCard, Plug, KeyRound, ScrollText, LogIn, UserPlus, KeyRound as Key2, MailCheck, MailPlus, Rocket, Home, BadgeDollarSign, MessageSquare, History, BookOpen, Ban, FileQuestion, ServerCrash, Wrench, WifiOff, Timer, type LucideIcon } from "lucide-react";
import { Foundations } from "./pages/Foundations";
import { Components } from "./pages/Components";
import { Loaders, Motion } from "./pages/LoadersMotion";
import { Libraries } from "./pages/Libraries";
import { Dashboard, DealsList, DealDetail, CreateDeal, Board, InboxPage, SearchResults } from "./pages/AppPages";
import { Profile, Security, Notifications, Appearance, WorkspaceGeneral, Members, Billing, Integrations, ApiKeys, AuditLog } from "./pages/Settings";
import { SignIn, SignUp, ForgotPassword, ResetPassword, VerifyEmail, AcceptInvite, Onboarding, OnboardingChecklist } from "./pages/Auth";
import { Landing, Pricing, ContactSales, Changelog, DocsShell } from "./pages/Site";
import { StatesGallery } from "./pages/System";
import { StatusGallery, makeStatusPage, statusName } from "./pages/Status";
import { PublicStatus, HelpCenter, ContactSupport, LegalDoc, CookiePrefs, About, Careers, BlogIndex, BlogPost, TrustCenter, IntegrationsDirectory, Feedback, PrivacyCenter, Unsubscribe } from "./pages/Company";
import { Activity as IcAct, LifeBuoy as IcLife, Headset as IcHead, Scale as IcScale, Cookie as IcCookie, Building2 as IcBuild, Briefcase as IcBrief, Newspaper as IcNews, FileText as IcFile, ShieldCheck as IcShield, Plug as IcPlug, Smile as IcSmile, DatabaseZap as IcData, MailX as IcMail } from "lucide-react";
import { CalendarPage, FilesPage, TeamDirectory, TasksPage } from "./pages/AppExtra";
import { MobilePatterns } from "./pages/Mobile";
import { CalendarDays as IcCal, FolderOpen as IcFolder, Contact as IcContact, ListChecks as IcTasks, Smartphone as IcPhone } from "lucide-react";
import { NotificationsPage, NotificationSettings, NotificationsStandard } from "./pages/Notifications";
import { LoadersMore, InteractiveLab } from "./pages/Lab";
import { Bell as IcBell, BellRing as IcBellRing, FlaskConical as IcLab, Loader as IcLoader } from "lucide-react";
import { InteractiveLabAdvanced } from "./pages/Lab2";
import { TimelinePage, ApprovalPage, WishlistPage, ComparePage, OrderConfirmation, ReturnsPage, CaseStudyPage, RoadmapPage, OnboardingCarousel } from "./pages/MorePages";
import { FormsValidation, ChartsPage, RtlDemo } from "./pages/Practice";
import { RolesPermissions, WebhooksAdmin, TwoStepSetup, ActiveSessions, SsoSetup, ImportWizard, ReportBuilder, ApiReference } from "./pages/Admin";
import { ShieldCheck as IcShieldC, Webhook as IcHook, Smartphone as IcSmart, MonitorSmartphone as IcSess, KeyRound as IcKey, FileUp as IcImport, BarChart3 as IcReport, Code2 as IcCode } from "lucide-react";
import { statuses } from "./data/status";
import { PricingCalculator, ComparePlans, TrialStart, PlanCheckout, UpgradeFlow, CancelFlow, PaymentMethods, InvoiceDetail, UsagePage, PaymentRecovery } from "./pages/PricingBilling";
import { Calculator as IcCalc, Table2 as IcTable, Rocket as IcRocket, ShoppingCart as IcCart, ArrowUpDown as IcUp, XCircle as IcX, Wallet as IcWallet, Receipt as IcReceipt, Gauge as IcGauge, AlertTriangle as IcAlert } from "lucide-react";
import { AntiSlop } from "./pages/AntiSlop";
import { BrandPage } from "./pages/Brand";
import { ThemesPage } from "./pages/Themes";
import { NavigationGallery } from "./pages/Navigation";
import { SurfacesPage, DataKitPage } from "./pages/Kits";
import { CatalogPage } from "./pages/Catalog";
import { ManagementDashboard, ScanningDashboard } from "./pages/Dashboards";
import { GlobalNavDemo, MarketplaceNavDemo, PlatformNavDemo } from "./pages/SiteNav";
import { Shop, ProductPage, CartPage, CheckoutPage, OrdersPage } from "./pages/Store";

export type Layout = "app" | "settings" | "auth" | "site" | "bare" | "store" | "full";
export type Group = "Admin" | "Status pages" | "Pricing and billing" | "Company site" | "App pages" | "Foundations" | "Components" | "Navigation" | "Product" | "Dashboards" | "Commerce" | "Account" | "Authentication" | "Marketing" | "System";
export interface PageDef { id: string; title: string; group: Group; layout: Layout; desc: string; doc: string; icon: LucideIcon; el: ComponentType; header?: { title: string; desc: string } }

const std = (id: string, title: string, desc: string, icon: LucideIcon, el: ComponentType, doc: string): PageDef => ({ id, title, group: "Foundations", layout: "app", desc, doc, icon, el, header: { title, desc } });
const set = (id: string, title: string, desc: string, icon: LucideIcon, el: ComponentType, doc: string): PageDef => ({ id: `settings/${id}`, title, group: "Account", layout: "settings", desc, doc, icon, el });

export const pages: PageDef[] = [
  std("foundations", "Foundations", "Brand, color, type, shape, spacing, icons.", Palette, Foundations, "01-foundations"),
  std("components", "Components", "Every control and overlay, with live states.", Component, Components, "03-components"),
  std("loaders", "Loaders and skeletons", "Brand loaders built from the mark.", Loader, Loaders, "03-components/loaders-progress-and-spinners.md"),
  std("motion", "Animation", "Twenty named recipes, timing and easing.", Sparkles, Motion, "01-foundations/motion.md"),
  std("libraries", "Libraries", "Which library for which job.", Library, Libraries, "06-engineering/stack-and-library-catalog.md"),
  std("states", "States and illustrations", "Empty, error, stale, and the art that goes with them.", Layers, StatesGallery, "03-components/empty-loading-error-and-partial-states.md"),
  std("brand", "Brand and logo", "Logo forms, tones, backgrounds, clear space, misuse and placements.", Gem, BrandPage, "01-foundations/logo-and-brand-usage.md"),
  std("themes", "Themes", "Eight dark modes, four light pages, two accents, four corner styles, five nav styles.", SwatchBook, ThemesPage, "01-foundations/themes-and-dark-modes.md"),
  std("anti-slop", "Anti-slop", "Banned defaults beside the standard.", ShieldBan, AntiSlop, "07-antipatterns/ai-slop-detector.md"),

  { id: "catalog", title: "Component catalog", group: "Components", layout: "app", desc: "Search every reusable component. Copy import, usage or an AI prompt.", doc: "showcase/AI-INDEX.md", icon: Boxes, el: CatalogPage, header: { title: "Component catalog", desc: "Find a component by what you need, preview it, and copy it into your project or your AI prompt." } },
  { id: "navigation", title: "Navigation systems", group: "Components", layout: "app", desc: "Sidebars, top bars, mega menus, store header, mobile tabs, sub-navigation.", doc: "03-components/navigation-systems.md", icon: Compass, el: NavigationGallery, header: { title: "Navigation systems", desc: "Every navigation pattern we use, live, in four navigation styles." } },
  { id: "surfaces", title: "Cards and backgrounds", group: "Components", layout: "app", desc: "Eight card surfaces, rectangle layouts, glass, SVG and CSS backgrounds, six footers.", doc: "03-components/surfaces-backgrounds-footers.md", icon: PanelsTopLeft, el: SurfacesPage, header: { title: "Cards, backgrounds, footers", desc: "Surface styles and layouts, with the rules for blur and transparency." } },
  { id: "data-kit", title: "Stats, progress, skeletons", group: "Components", layout: "app", desc: "Eight stat tiles, eleven progress forms, twelve skeletons, chart extras.", doc: "03-components/skeleton-and-progress-catalog.md", icon: ChartColumn, el: DataKitPage, header: { title: "Stats, progress, skeletons", desc: "Everything for showing numbers and waiting states." } },

  { id: "site-nav/global", title: "Global bar with flyouts", group: "Navigation", layout: "full", desc: "Slim bar, full-width flyouts, dimmed page. For brand and marketing sites with many sections.", doc: "03-components/website-navigation.md", icon: Globe2, el: GlobalNavDemo },
  { id: "site-nav/marketplace", title: "Marketplace header", group: "Navigation", layout: "full", desc: "Big search with typeahead, account flyout, department drawer. For catalogs with thousands of categories.", doc: "03-components/website-navigation.md", icon: ShoppingBasket, el: MarketplaceNavDemo },
  { id: "site-nav/platform", title: "Platform bar", group: "Navigation", layout: "full", desc: "Icon tabs, app launcher, chats, notifications and account panel. For suites and social products.", doc: "03-components/website-navigation.md", icon: Grid3, el: PlatformNavDemo },
  { id: "dashboards/management", title: "Management dashboard", group: "Dashboards", layout: "app", desc: "Team, sprint, workload, leave approvals, hiring funnel.", doc: "04-patterns/management-dashboards.md", icon: UsersRound, el: ManagementDashboard },
  { id: "dashboards/scanning", title: "Scanning dashboard", group: "Dashboards", layout: "app", desc: "Live scanner, zone progress, scan feed, devices, exceptions.", doc: "04-patterns/operations-and-scanning-dashboards.md", icon: ScanLine, el: ScanningDashboard },

  { id: "store", title: "Storefront", group: "Commerce", layout: "store", desc: "Banner, filters, grid and list, quick add, five card styles.", doc: "04-patterns/ecommerce-patterns.md", icon: Store, el: Shop },
  { id: "store/product", title: "Product page", group: "Commerce", layout: "store", desc: "Gallery, options, price, tabs, reviews.", doc: "04-patterns/ecommerce-patterns.md", icon: Package, el: ProductPage },
  { id: "store/cart", title: "Cart", group: "Commerce", layout: "store", desc: "Lines, quantity, free-shipping nudge, order summary.", doc: "04-patterns/ecommerce-patterns.md", icon: ShoppingCart, el: CartPage },
  { id: "store/checkout", title: "Checkout", group: "Commerce", layout: "store", desc: "Three steps, delivery, hosted payment fields, review.", doc: "04-patterns/ecommerce-patterns.md", icon: Card2, el: CheckoutPage },
  { id: "store/orders", title: "Orders and tracking", group: "Commerce", layout: "store", desc: "Order list with a tracking timeline.", doc: "04-patterns/ecommerce-patterns.md", icon: ClipboardList, el: OrdersPage },

  { id: "dashboard", title: "Overview", group: "Product", layout: "app", desc: "KPIs, trend, breakdown, and what needs attention.", doc: "05-reusable-pages/dashboard-overview.md", icon: LayoutDashboard, el: Dashboard },
  { id: "deals", title: "Deals", group: "Product", layout: "app", desc: "Table with search, filters, sort, bulk actions, six states.", doc: "05-reusable-pages/list-index-page.md", icon: Table2, el: DealsList },
  { id: "deals/D-1033", title: "Deal detail", group: "Product", layout: "app", desc: "Header, tabs, details, activity and files.", doc: "05-reusable-pages/record-detail-page.md", icon: FileText, el: DealDetail },
  { id: "deals/new", title: "New deal", group: "Product", layout: "app", desc: "Three-step form with validation and drafts.", doc: "05-reusable-pages/create-edit-flow.md", icon: Plus, el: CreateDeal },
  { id: "pipeline", title: "Pipeline", group: "Product", layout: "app", desc: "Board with keyboard-friendly moves.", doc: "05-reusable-pages/board-page.md", icon: Kanban, el: Board },
  { id: "inbox", title: "Inbox", group: "Product", layout: "app", desc: "Notifications as list and detail.", doc: "05-reusable-pages/notification-inbox.md", icon: Inbox, el: InboxPage },
  { id: "search", title: "Search results", group: "Product", layout: "app", desc: "Query highlighting, type filters, no-results help.", doc: "04-patterns/search-filter-and-sort.md", icon: Search, el: SearchResults },
  { id: "get-started", title: "Setup checklist", group: "Product", layout: "app", desc: "Onboarding tasks with skip and progress.", doc: "05-reusable-pages/onboarding-checklist.md", icon: ListChecks, el: OnboardingChecklist, header: { title: "Get started", desc: "Four steps to a useful workspace." } },

  set("profile", "Profile", "Photo, name, language, time zone.", User, Profile, "05-reusable-pages/profile-page.md"),
  set("security", "Security", "Password, two-step, passkeys, sessions.", Shield, Security, "05-reusable-pages/settings-page.md"),
  set("notifications", "Notifications", "Event by channel matrix with auto-save.", Bell, Notifications, "04-patterns/settings-and-preferences.md"),
  set("appearance", "Appearance", "Theme and density.", SunMoon, Appearance, "01-foundations/dark-mode.md"),
  set("workspace", "Workspace", "Name, URL, logo, danger zone.", Building2, WorkspaceGeneral, "05-reusable-pages/settings-page.md"),
  set("members", "Members", "Roles, invites, permission matrix.", Users, Members, "05-reusable-pages/team-and-members.md"),
  set("billing", "Billing", "Plan, usage, payment method, invoices, dunning.", CreditCard, Billing, "05-reusable-pages/billing-and-invoices.md"),
  set("integrations", "Integrations", "Connect and disconnect tools.", Plug, Integrations, "05-reusable-pages/integrations-page.md"),
  set("api-keys", "API keys", "Show once, mask after, revoke.", KeyRound, ApiKeys, "05-reusable-pages/integrations-page.md"),
  set("audit-log", "Audit log", "Who did what, when.", ScrollText, AuditLog, "05-reusable-pages/audit-log-page.md"),

  { id: "sign-in", title: "Sign in", group: "Authentication", layout: "bare", desc: "SSO first, email second, lockout states.", doc: "05-reusable-pages/sign-in-sign-up-reset.md", icon: LogIn, el: SignIn },
  { id: "sign-up", title: "Create account", group: "Authentication", layout: "bare", desc: "Registration with live password rules.", doc: "05-reusable-pages/sign-in-sign-up-reset.md", icon: UserPlus, el: SignUp },
  { id: "forgot-password", title: "Forgot password", group: "Authentication", layout: "bare", desc: "Never reveals if an account exists.", doc: "05-reusable-pages/sign-in-sign-up-reset.md", icon: Key2, el: ForgotPassword },
  { id: "reset-password", title: "Reset password", group: "Authentication", layout: "bare", desc: "New password with match check.", doc: "05-reusable-pages/sign-in-sign-up-reset.md", icon: Key2, el: ResetPassword },
  { id: "verify-email", title: "Verify email", group: "Authentication", layout: "bare", desc: "Six-digit code with paste support.", doc: "05-reusable-pages/verify-and-mfa-page.md", icon: MailCheck, el: VerifyEmail },
  { id: "accept-invite", title: "Accept invite", group: "Authentication", layout: "bare", desc: "Join a workspace from an email link.", doc: "05-reusable-pages/sign-in-sign-up-reset.md", icon: MailPlus, el: AcceptInvite },
  { id: "onboarding", title: "Onboarding", group: "Authentication", layout: "bare", desc: "Three skippable steps after signup.", doc: "05-reusable-pages/onboarding-checklist.md", icon: Rocket, el: Onboarding },

  { id: "home", title: "Landing page", group: "Marketing", layout: "site", desc: "Hero with real product UI, proof, two feature rows.", doc: "05-reusable-pages/landing-page.md", icon: Home, el: Landing },
  { id: "pricing", title: "Pricing", group: "Marketing", layout: "site", desc: "Toggle, three plans, comparison, FAQ.", doc: "05-reusable-pages/pricing-page.md", icon: BadgeDollarSign, el: Pricing },
  { id: "contact-sales", title: "Contact sales", group: "Marketing", layout: "site", desc: "Short form and a clear promise.", doc: "05-reusable-pages/landing-page.md", icon: MessageSquare, el: ContactSales },
  { id: "changelog", title: "Changelog", group: "Marketing", layout: "site", desc: "Dated entries with tags.", doc: "00-governance/versioning-and-deprecation.md", icon: History, el: Changelog },
  { id: "docs", title: "Docs article", group: "Marketing", layout: "site", desc: "Tree nav, article, on-this-page.", doc: "05-reusable-pages/help-and-docs-shell.md", icon: BookOpen, el: DocsShell },

];
pages.push({ id: "status", title: "All status pages", group: "Status pages", layout: "app", desc: `${statuses.length} system and status pages: every HTTP code you will meet, plus account, billing and platform states.`, doc: "05-reusable-pages/status-and-error-pages.md", icon: ShieldAlert, el: StatusGallery, header: { title: "Status and error pages", desc: "Every system page we need, each with the user view, developer notes and a sample response body." } });
const groupIcon = { "Client errors (4xx)": FileWarning, "Server errors (5xx)": ServerCrash, "Access and sessions": KeyRound, "Billing and plans": CreditCard, "Platform states": MonitorCog, Content: FileQuestion } as const;
statuses.forEach((s) => pages.push({ id: `status/${s.slug}`, title: s.code ? `${s.code} ${statusName(s)}` : s.title, group: "Status pages", layout: "full", desc: s.title, doc: "05-reusable-pages/status-and-error-pages.md", icon: groupIcon[s.group], el: makeStatusPage(s.slug) }));
const bill = (id: string, title: string, layout: Layout, desc: string, icon: PageDef["icon"], el: ComponentType, header?: PageDef["header"]) => pages.push({ id, title, group: "Pricing and billing", layout, desc, doc: "04-patterns/pricing-and-subscription-checkout.md", icon, el, header });
bill("pricing/calculator", "Pricing calculator", "site", "Seats and usage sliders with a live estimate.", IcCalc, PricingCalculator);
bill("pricing/compare", "Compare plans", "site", "Full feature matrix with differences filter.", IcTable, ComparePlans);
bill("pricing/trial", "Start free trial", "bare", "Short signup, no card.", IcRocket, TrialStart);
bill("checkout/plan", "Subscription checkout", "full", "Plan, details, payment; summary with tax and promo.", IcCart, PlanCheckout);
bill("billing/change-plan", "Change plan", "app", "Upgrade or downgrade with proration.", IcUp, UpgradeFlow);
bill("billing/cancel", "Cancel plan", "app", "Honest three-step cancel with alternatives.", IcX, CancelFlow);
bill("billing/payment-methods", "Payment methods", "app", "Cards, bank debit, address, tax IDs.", IcWallet, PaymentMethods);
bill("billing/invoice", "Invoice detail", "app", "Printable invoice in four states.", IcReceipt, InvoiceDetail);
bill("billing/usage", "Usage and limits", "app", "Meters, forecast, alerts.", IcGauge, UsagePage);
bill("billing/payment-failed", "Payment failed", "app", "Dunning recovery with timeline.", IcAlert, PaymentRecovery);
const co = (id: string, title: string, layout: Layout, desc: string, icon: PageDef["icon"], el: ComponentType, doc = "05-reusable-pages/company-site-pages.md") => pages.push({ id, title, group: "Company site", layout, desc, doc, icon, el });
co("status-page", "Public status page", "bare", "Components, 90-day history, incidents.", IcAct, PublicStatus);
co("help", "Help center", "site", "Search, categories, popular articles.", IcLife, HelpCenter);
co("support", "Contact support", "site", "Ticket form with impact and attachments.", IcHead, ContactSupport);
co("legal", "Legal document", "site", "Policy layout with sticky contents.", IcScale, LegalDoc);
co("cookies", "Cookie preferences", "site", "Granular toggles and banner.", IcCookie, CookiePrefs);
co("about", "About", "site", "Mission, numbers, values, leadership.", IcBuild, About);
co("careers", "Careers", "site", "Filterable open roles.", IcBrief, Careers);
co("blog", "Blog index", "site", "Featured post and grid.", IcNews, BlogIndex);
co("blog/post", "Blog article", "site", "Reading column, quote, subscribe.", IcFile, BlogPost);
co("trust", "Trust center", "site", "Certifications, documents, FAQ.", IcShield, TrustCenter);
co("integrations", "Integrations directory", "site", "Search, categories, connect.", IcPlug, IntegrationsDirectory);
co("feedback", "Feedback survey", "bare", "0 to 10 score then one follow-up.", IcSmile, Feedback);
co("privacy-center", "Your data", "bare", "Export and delete account data.", IcData, PrivacyCenter);
co("unsubscribe", "Email preferences", "bare", "Per-topic switches and one-click opt-out.", IcMail, Unsubscribe);
const ap = (id: string, title: string, desc: string, icon: PageDef["icon"], el: ComponentType) => pages.push({ id, title, group: "App pages", layout: "app", desc, doc: "05-reusable-pages/app-pages-extra.md", icon, el });
ap("calendar", "Calendar", "Month grid, day panel, add event, agenda.", IcCal, CalendarPage);
ap("files", "Files", "List and grid, search, multi-select, upload.", IcFolder, FilesPage);
ap("team", "Team directory", "Search, department filter, favorites, profile modal.", IcContact, TeamDirectory);
ap("tasks", "Tasks", "Add, complete, reorder, delete with undo.", IcTasks, TasksPage);
pages.push({ id: "mobile", title: "Mobile standard", group: "Foundations", layout: "app", desc: "Live phone demos and the rules for every page below 640 px.", doc: "01-foundations/mobile.md", icon: IcPhone, el: MobilePatterns });
pages.push({ id: "notifications", title: "Notifications", group: "Product", layout: "app", desc: "Full list with filters, read state and dismiss.", doc: "03-components/notifications.md", icon: IcBell, el: NotificationsPage });
pages.push({ id: "notifications/settings", title: "Notification settings", group: "Account", layout: "settings", desc: "Channel matrix and quiet hours.", doc: "03-components/notifications.md", icon: IcBellRing, el: NotificationSettings });
pages.push({ id: "notifications/system", title: "Notification system", group: "Components", layout: "app", desc: "Seven channels, toast, banner, center, push, email.", doc: "03-components/notifications.md", icon: IcBellRing, el: NotificationsStandard });
pages.push({ id: "lab", title: "Interactive lab", group: "Components", layout: "app", desc: "OTP, rating, date range, tour, confetti, carousel, sortable and more.", doc: "03-components/interactive-components.md", icon: IcLab, el: InteractiveLab });
pages.push({ id: "loaders/more", title: "More loaders", group: "Components", layout: "app", desc: "Nine extra loaders and a chooser.", doc: "03-components/interactive-components.md", icon: IcLoader, el: LoadersMore });
pages.push({ id: "lab/advanced", title: "Interactive lab: advanced", group: "Components", layout: "app", desc: "Data table, kanban, chat, tree, editors, gestures, live charts.", doc: "03-components/interactive-components.md", icon: IcLab, el: InteractiveLabAdvanced });
const adm = (id: string, title: string, layout: Layout, desc: string, icon: PageDef["icon"], el: ComponentType) => pages.push({ id, title, group: "Admin", layout, desc, doc: "05-reusable-pages/admin-pages.md", icon, el });
adm("admin/roles", "Roles and permissions", "app", "Role list, permission matrix, new role, unsaved changes.", IcShieldC, RolesPermissions);
adm("admin/webhooks", "Webhooks", "app", "Endpoints, delivery log with replay, signing secret.", IcHook, WebhooksAdmin);
adm("admin/sso", "Single sign-on", "app", "SAML setup: provider, configure, verify domain, test.", IcKey, SsoSetup);
adm("admin/two-step", "Two-step setup", "app", "QR, code check, recovery codes.", IcSmart, TwoStepSetup);
adm("admin/sessions", "Active sessions", "app", "Devices, unrecognized sign-in, sign out.", IcSess, ActiveSessions);
adm("admin/import", "Import wizard", "app", "Upload, match columns, review errors, import.", IcImport, ImportWizard);
adm("admin/reports", "Reports", "app", "Metric picker, live preview, export, schedule.", IcReport, ReportBuilder);
adm("admin/api", "API reference", "app", "Endpoint list, snippets, try it.", IcCode, ApiReference);
const regroup: Record<string, Group> = { foundations: "Foundations", brand: "Foundations", themes: "Foundations", motion: "Foundations", libraries: "Foundations", "anti-slop": "Foundations", components: "Components", loaders: "Components", states: "Components", catalog: "Components", surfaces: "Components", "data-kit": "Components", navigation: "Navigation" };
pages.forEach((p) => { if (regroup[p.id]) p.group = regroup[p.id]; });
pages.push({ id: "forms/validation", title: "Forms and validation", group: "Components", layout: "app", desc: "Blur then live validation, error summary, focus first error.", doc: "04-patterns/forms-and-validation.md", icon: IcCode, el: FormsValidation });
pages.push({ id: "charts", title: "Charts", group: "Components", layout: "app", desc: "SVG line and bar charts with direct labels and table view.", doc: "04-patterns/data-visualization.md", icon: IcReport, el: ChartsPage });
pages.push({ id: "rtl", title: "Right-to-left and long text", group: "Foundations", layout: "app", desc: "Arabic and long-German versions of the same card.", doc: "01-foundations/internationalization.md", icon: IcKey, el: RtlDemo });

const mp = (id: string, title: string, group: Group, layout: Layout, desc: string, el: ComponentType) => pages.push({ id, title, group, layout, desc, doc: "05-reusable-pages/more-pages.md", icon: IcReport, el });
mp("timeline", "Project timeline", "App pages", "app", "Gantt-style bars with progress and text dates.", TimelinePage);
mp("approvals", "Approval workflow", "App pages", "app", "Approval chain with approve and reject.", ApprovalPage);
mp("store/wishlist", "Wishlist", "Commerce", "store", "Saved items, stock state, remove.", WishlistPage);
mp("compare", "Compare plans", "Commerce", "store", "Comparison table with differences-only toggle.", ComparePage);
mp("store/order-confirmed", "Order confirmation", "Commerce", "store", "Success, order number, next steps.", OrderConfirmation);
mp("store/returns", "Start a return", "Commerce", "store", "Pick items and reason, get label.", ReturnsPage);
mp("case-study", "Case study", "Company site", "site", "Story with result numbers and a quote.", CaseStudyPage);
mp("roadmap", "Public roadmap", "Company site", "site", "Now, next, later columns.", RoadmapPage);
mp("onboarding", "Mobile onboarding", "App pages", "bare", "Swipeable intro with skip and step count.", OnboardingCarousel);

export const groups: Group[] = ["Foundations", "Components", "Navigation", "Status pages", "Pricing and billing", "Admin", "Product", "App pages", "Dashboards", "Commerce", "Account", "Authentication", "Marketing", "Company site"];

