import { useEffect, useRef, useState } from "react";
import { Search, Bell, CircleHelp, Menu as MenuIcon, LayoutGrid, ArrowLeft, Settings as SettingsIcon, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Avatar, Button, Menu, ToastProvider, Count, cn, Tooltip, Kbd, Input, StatusPill, Drawer } from "@bytesphere/ui";
import { Logo, RouteBar } from "@bytesphere/ui";
import { NotificationCenter } from "@bytesphere/ui";
import { SideNav, TopBar, SearchTrigger, SiteHeader, EcomHeader, type NavGroup } from "@bytesphere/ui";
import { SiteFooter } from "@bytesphere/ui";
import { AppearancePanel, useAppearance, isDarkNav } from "@bytesphere/ui";
import { useCart } from "./cart";
import { pages, groups, type PageDef } from "./registry";
import { SettingsShell } from "./pages/Settings";
import { NotFound } from "./pages/System";
import { storeCategories } from "./pages/Store";

const usePath = () => {
  const get = () => location.hash.replace(/^#\/?/, "") || "explorer";
  const [h, setH] = useState(get);
  useEffect(() => { const f = () => setH(get()); addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return h;
};

/* ───────── Explorer ───────── */
function Explorer() {
  const [q, setQ] = useState(""); const [g, setG] = useState<string>("All");
  const list = pages.filter((p) => (g === "All" || p.group === g) && (p.title + p.desc + p.group).toLowerCase().includes(q.toLowerCase()));
  const layoutLabel: Record<string, string> = { app: "App shell", settings: "Settings shell", auth: "Auth", site: "Marketing", bare: "Full page", store: "Store", full: "Full-page demo" };
  return (
    <div>
      <header className="mb-8 max-w-2xl"><h1 className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em]">ByteSphere UI standard</h1>
        <p className="mt-2 text-[16px] leading-6 text-secondary">{pages.length} pages and the parts they are built from, using the real tokens. Open <b className="font-medium text-primary">Customize</b> in the top bar to try eight dark modes, four light pages, two accents, four corner styles and five navigation styles on everything.</p>
        <div className="mt-4 flex flex-wrap gap-2"><Button variant="primary" onClick={() => (location.hash = "/catalog")}>Browse the component catalog</Button><Button onClick={() => (location.hash = "/themes")}>See the themes</Button></div></header>
      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]"><aside className="lg:sticky lg:top-20 lg:self-start"><div className="mb-3"><Input aria-label="Filter pages" start={<Search />} placeholder="Filter pages" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <ul className="flex gap-1 overflow-x-auto lg:flex-col">{["All", ...groups].map((x) => <li key={x}><button aria-pressed={g === x} onClick={() => setG(x)} className={cn("flex h-8 w-full shrink-0 items-center justify-between gap-3 rounded-control px-2.5 text-body font-medium whitespace-nowrap", g === x ? "bg-selected font-semibold text-primary" : "text-secondary hover:bg-action-ghost-hover")}>{x}<span className="tnum text-caption text-tertiary">{x === "All" ? pages.length : pages.filter((p) => p.group === x).length}</span></button></li>)}</ul></aside>
      <div>{groups.filter((x) => list.some((p) => p.group === x)).map((grp) => (
        <section key={grp} className="mb-10"><h2 className="mb-3 flex items-baseline gap-2 text-h4 font-semibold">{grp}<span className="tnum text-body-sm font-normal text-tertiary">{list.filter((p) => p.group === grp).length}</span></h2>
          <ul className="m-stagger grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{list.filter((p) => p.group === grp).map((p, i) => (
            <li key={p.id} style={{ "--i": i } as React.CSSProperties}><a href={`#/${p.id}`} className="group flex h-full gap-3 rounded-card border border-subtle bg-surface-raised p-4 transition-[border-color,box-shadow] duration-150 hover:border-strong hover:shadow-raised">
              <span className="grid size-9 shrink-0 place-items-center rounded-control bg-surface-sunken text-secondary transition-colors group-hover:bg-selected group-hover:text-link"><p.icon className="size-[18px]" aria-hidden /></span>
              <span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate text-body font-medium text-primary">{p.title}</span><ChevronRight className="size-4 shrink-0 text-tertiary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden /></span><span className="mt-0.5 line-clamp-2 block text-body-sm text-secondary">{p.desc}</span>{p.layout !== "app" && p.layout !== "settings" && <span className="mt-2 flex"><StatusPill size="sm" dot={false}>{layoutLabel[p.layout]}</StatusPill></span>}</span></a></li>))}</ul></section>))}
      {list.length === 0 && <p className="py-16 text-center text-body text-secondary">No pages match “{q}”.</p>}
      </div></div>
    </div>);
}

/* ───────── Command palette ───────── */
function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null); const [q, setQ] = useState(""); const [i, setI] = useState(0);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) { d.showModal(); setQ(""); setI(0); } if (!open && d.open) d.close(); }, [open]);
  const res = pages.filter((p) => (p.title + p.group + p.desc).toLowerCase().includes(q.toLowerCase())).slice(0, 12);
  const pick = (p: PageDef) => { location.hash = `/${p.id}`; onClose(); };
  return (
    <dialog ref={ref} onClose={onClose} aria-label="Go to page" className="m-pop mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-modal border border-subtle bg-surface-overlay p-0 text-primary shadow-modal backdrop:bg-scrim">
      <div className="flex h-12 items-center gap-2 border-b border-subtle px-4"><Search className="size-4 text-tertiary" aria-hidden />
        <input autoFocus role="combobox" aria-expanded aria-controls="pal-l" value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} aria-label="Search pages" placeholder="Jump to a page" className="h-full flex-1 bg-transparent text-body outline-none placeholder:text-placeholder"
          onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(res.length - 1, n + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(0, n - 1)); } if (e.key === "Enter" && res[i]) pick(res[i]); }} /><Kbd>Esc</Kbd></div>
      <ul id="pal-l" role="listbox" className="max-h-[22rem] overflow-y-auto p-1.5">
        {res.length === 0 && <li className="px-3 py-8 text-center text-body text-secondary">No page matches “{q}”. Try “billing” or “scanner”.</li>}
        {res.map((p, n) => <li key={p.id} role="option" aria-selected={n === i}><a href={`#/${p.id}`} onClick={onClose} onMouseEnter={() => setI(n)} className={cn("flex h-9 items-center gap-2.5 rounded-control px-2.5 text-body", n === i && "bg-action-ghost-hover")}><p.icon className="size-4 text-tertiary" aria-hidden />{p.title}<span className="ms-auto text-body-sm text-tertiary">{p.group}</span></a></li>)}
      </ul>
    </dialog>);
}

/* ───────── Shell pieces ───────── */
const CustomizeButton = ({ onClick }: { onClick: () => void }) => <Tooltip text="Customize: dark mode, corners, navigation"><Button size="icon" variant="ghost" aria-label="Customize appearance" onClick={onClick}><SlidersHorizontal /></Button></Tooltip>;
function PreviewBar({ page, onCustomize }: { page: PageDef; onCustomize: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-11 items-center gap-3 border-b border-subtle bg-surface px-4">
      <a href="#/explorer" className="inline-flex items-center gap-1.5 text-body font-medium text-secondary hover:text-primary"><ArrowLeft className="size-4" aria-hidden /><span className="hidden sm:inline">All pages</span><span className="sm:hidden">Pages</span></a>
      <span className="text-tertiary" aria-hidden>/</span><span className="min-w-0 truncate text-body font-medium">{page.title}</span><span className="hidden sm:inline-flex"><StatusPill size="sm" dot={false}>{page.group}</StatusPill></span>
      <code className="ms-auto hidden font-mono text-caption text-tertiary md:block">{page.doc}</code><CustomizeButton onClick={onCustomize} />
    </div>);
}
function SiteShell({ children, page }: { children: React.ReactNode; page: PageDef }) {
  const links = [{ label: "Product", href: "#/home" }, { label: "Pricing", href: "#/pricing" }, { label: "Docs", href: "#/docs" }, { label: "Changelog", href: "#/changelog" }];
  return (<><SiteHeader links={links} current={page.title === "Pricing" ? "Pricing" : page.title === "Docs article" ? "Docs" : page.title === "Changelog" ? "Changelog" : "Product"} onSignIn={() => (location.hash = "/sign-in")} cta={<Button variant="primary" onClick={() => (location.hash = "/sign-up")}>Start free</Button>} />
    <main id="main" tabIndex={-1} className="outline-none">{children}</main><SiteFooter variant="columns" /></>);
}
function StoreShell({ children }: { children: React.ReactNode }) {
  const { count } = useCart();
  return (<><EcomHeader categories={storeCategories} cartCount={count} onCart={() => (location.hash = "/store/cart")} announcement="Free shipping over $75 · 30-day returns" />
    <main id="main" tabIndex={-1} className="min-h-[60vh] outline-none">{children}</main><SiteFooter variant="newsletter" /></>);
}

const sideLayout: { label?: string; ids: string[] }[] = [
  { ids: ["explorer", "catalog"] },
  { label: "Foundations", ids: ["foundations", "brand", "themes", "motion", "mobile", "libraries", "anti-slop"] },
  { label: "Components", ids: ["components", "loaders", "surfaces", "data-kit", "states", "lab", "lab/advanced", "loaders/more", "notifications/system"] },
  { label: "Navigation", ids: ["navigation", "site-nav/global", "site-nav/marketplace", "site-nav/platform"] },
  { label: "Status pages", ids: ["status", "status/404", "status/500", "status/503", "status/session-expired"] },
  { label: "Pricing and billing", ids: ["pricing/calculator", "pricing/compare", "checkout/plan", "billing/change-plan", "billing/cancel", "billing/payment-methods", "billing/invoice", "billing/usage", "billing/payment-failed", "pricing/trial"] },
  { label: "Company site", ids: ["help", "support", "about", "careers", "blog", "trust", "integrations", "legal", "cookies", "status-page", "feedback", "privacy-center", "unsubscribe"] },
  { label: "Admin", ids: ["admin/roles", "admin/webhooks", "admin/sso", "admin/two-step", "admin/sessions", "admin/import", "admin/reports", "admin/api"] },
  { label: "Product", ids: ["dashboard", "deals", "pipeline", "inbox", "get-started", "notifications"] },
  { label: "App pages", ids: ["calendar", "files", "team", "tasks"] },
  { label: "Dashboards", ids: ["dashboards/management", "dashboards/scanning"] },
  { label: "Commerce", ids: ["store", "store/cart", "store/orders"] },
  { label: "Account", ids: ["settings/profile", "settings/billing", "settings/members"] },
];
const wide = ["deals", "dashboard", "pipeline", "inbox", "dashboards/management", "dashboards/scanning"];

export function App() {
  const path = usePath(); const [a] = useAppearance();
  const [rail, setRail] = useState(() => localStorage.getItem("ui.sidebar") === "rail"); const [drawer, setDrawer] = useState(false); const [pal, setPal] = useState(false); const [custom, setCustom] = useState(false); const [navigating, setNavigating] = useState(false);
  const page = pages.find((p) => p.id === path) as PageDef | undefined; const isExplorer = path === "explorer";
  useEffect(() => { try { localStorage.setItem("ui.sidebar", rail ? "rail" : "expanded"); } catch { /* */ } }, [rail]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal(true); } }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  useEffect(() => { document.getElementById("main")?.focus({ preventScroll: true }); window.scrollTo(0, 0); setDrawer(false); setNavigating(true); const x = setTimeout(() => setNavigating(false), 450); document.title = `${page?.title ?? (isExplorer ? "All pages" : "Not found")} · ByteSphere UI standard`; return () => clearTimeout(x); }, [path]);

  const Page = page?.el ?? NotFound; const layout = isExplorer ? "app" : page?.layout ?? "app";
  const navGroups: NavGroup[] = sideLayout.map((g) => ({ label: g.label, collapsible: !!g.label, items: g.ids.map((id) => id === "explorer" ? { id, label: "All pages", icon: LayoutGrid } : { id, label: id === "settings/profile" ? "Settings" : pages.find((p) => p.id === id)!.title, icon: pages.find((p) => p.id === id)!.icon }) }));
  const current = path.startsWith("deals/") ? "deals" : path.startsWith("settings/") && !["settings/billing", "settings/members"].includes(path) ? "settings/profile" : path;
  const logo = (compact: boolean) => <a href="#/explorer" aria-label="ByteSphere Technologies, all pages" className="rounded-control">{compact ? <Logo variant="mark" height={30} /> : <Logo height={32} tagline={false} tone={isDarkNav(a) ? "white" : "auto"} />}</a>;
  const customizeDrawer = <Drawer open={custom} onClose={() => setCustom(false)} title="Customize" description="Applies to every page. Saved in this browser." width={460}><AppearancePanel compact /></Drawer>;

  if (layout === "bare" || layout === "auth" || layout === "site" || layout === "store" || layout === "full") {
    return (<ToastProvider><a href="#main" className="skip rounded-control bg-action-primary px-3 py-2 text-action-primary-fg" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>Skip to main content</a>
      <PreviewBar page={page!} onCustomize={() => setCustom(true)} /><div className="relative"><RouteBar active={navigating} /></div>
      {layout === "full" ? <Page /> : layout === "site" ? <SiteShell page={page!}><Page /></SiteShell> : layout === "store" ? <StoreShell><Page /></StoreShell> : <main id="main" tabIndex={-1} className="min-h-[calc(100dvh-2.75rem)] bg-surface-sunken p-4 outline-none sm:p-8"><Page /></main>}
      <Palette open={pal} onClose={() => setPal(false)} />{customizeDrawer}</ToastProvider>);
  }
  return (
    <ToastProvider>
      <a href="#main" className="skip rounded-control bg-action-primary px-3 py-2 text-action-primary-fg" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>Skip to main content</a>
      <div className="flex min-h-dvh">
        <div className="sticky top-0 hidden h-dvh md:block"><SideNav groups={navGroups} current={current} collapsed={rail} onToggle={() => setRail((r) => !r)} brand={logo(rail)} className="h-full" /></div>
        {drawer && <div className="fixed inset-0 z-40 md:hidden"><div className="absolute inset-0 bg-scrim" onClick={() => setDrawer(false)} /><div role="dialog" aria-modal="true" aria-label="Navigation" className="absolute inset-y-0 start-0"><SideNav groups={navGroups} current={current} brand={logo(false)} onNavigate={() => setDrawer(false)} className="h-full" /></div></div>}
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar className="sticky top-0 z-30" left={<><Button size="icon" variant="ghost" aria-label="Open navigation" className="md:hidden" onClick={() => setDrawer(true)}><MenuIcon /></Button><span className="sm:hidden"><Logo variant="mark" height={28} /></span><span className="hidden sm:block md:hidden"><Logo height={26} tagline={false} /></span></>} center={<SearchTrigger label="Search pages" onClick={() => setPal(true)} />}
            right={<><Button size="icon" variant="ghost" className="sm:hidden" aria-label="Search pages" onClick={() => setPal(true)}><Search /></Button><CustomizeButton onClick={() => setCustom(true)} /><Button size="icon" variant="ghost" aria-label="Help" className="hidden sm:inline-flex" onClick={() => (location.hash = "/docs")}><CircleHelp /></Button><NotificationCenter onViewAll={() => (location.hash = "/notifications")} />
              <Menu label="Account menu for Mia Moreno" trigger={<Avatar id="u1" name="Mia Moreno" size={32} />} width="w-64" items={[{ label: "Profile", icon: SettingsIcon, onSelect: () => (location.hash = "/settings/profile") }, { label: "Billing", onSelect: () => (location.hash = "/settings/billing") }, { label: "Customize", icon: SlidersHorizontal, onSelect: () => setCustom(true) }, "sep", { label: "Sign out", onSelect: () => (location.hash = "/sign-in") }]} /></>} />
          <div className="relative"><RouteBar active={navigating} /></div>
          <main id="main" tabIndex={-1} className="min-w-0 flex-1 p-4 outline-none sm:p-6 xl:px-10 xl:py-8"><div className={cn("mx-auto", wide.includes(path) ? "max-w-[88rem]" : "max-w-6xl")}>
            {isExplorer ? <Explorer /> : layout === "settings" ? <SettingsShell current={path.replace("settings/", "")}><Page /></SettingsShell>
              : page?.header ? <><div className="mb-8"><h1 className="text-h2 font-semibold">{page.header.title}</h1><p className="mt-1 max-w-[62ch] text-body text-secondary">{page.header.desc}</p></div><Page /></> : <Page />}
          </div></main>
          <SiteFooter variant="app" />
        </div>
      </div>
      <Palette open={pal} onClose={() => setPal(false)} />{customizeDrawer}
    </ToastProvider>
  );
}
