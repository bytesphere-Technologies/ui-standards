import { useState } from "react";
import { LayoutDashboard, Users, CreditCard, Settings, Inbox, Boxes, BarChart3, ScanLine, Truck, ShoppingBag, Bell, FileText, Plug, Building2, Search, Home, Heart, User, Rocket, BookOpen, Shield } from "lucide-react";
import { SideNav, TopBar, SearchTrigger, SiteHeader, EcomHeader, BottomTabs, VerticalTabs, PillTabs, SubNav, type NavGroup } from "@bytesphere/ui";
import { Tabs, Segmented, Button, Avatar, Specimen, cn, Tooltip } from "@bytesphere/ui";
import { Breadcrumb, Pagination } from "@bytesphere/ui";
import { Logo } from "@bytesphere/ui";
import { storeCategories } from "./Store";
import { GlobalBar, Typeahead, DepartmentDrawer, AppLauncher, AccountPanel, CategoryTree } from "@bytesphere/ui";
import { globalItems } from "./SiteNav";
import { products } from "../data";
import { Globe2, ShoppingBasket, LayoutGrid as Grid3, ArrowUpRight, Laptop, Armchair, ShieldCheck, Users as UsersIcon } from "lucide-react";

const groups: NavGroup[] = [
  { items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }, { id: "inbox", label: "Inbox", icon: Inbox, badge: 4 }] },
  { label: "Work", items: [{ id: "customers", label: "Customers", icon: Users }, { id: "inventory", label: "Inventory", icon: Boxes, children: [{ id: "stock", label: "Stock levels" }, { id: "transfers", label: "Transfers" }, { id: "counts", label: "Cycle counts" }] }, { id: "reports", label: "Reports", icon: BarChart3 }] },
  { label: "Admin", items: [{ id: "billing", label: "Billing", icon: CreditCard }, { id: "settings", label: "Settings", icon: Settings }] },
];
const Frame = ({ title, use, children, h = 420, nav, dark, className }: { title: string; use: string; children: React.ReactNode; h?: number; nav?: string; dark?: string; className?: string }) => (
  <div className={cn("flex flex-col gap-2", className)}><div><p className="text-body font-medium">{title}</p><p className="text-body-sm text-secondary">{use}</p></div>
    <div data-nav={nav} {...(dark ? { "data-theme": "dark", "data-dark": dark } : {})} className="relative overflow-hidden rounded-card border border-subtle text-primary" style={{ height: h, background: "var(--t-color-surface-sunken)" }}>{children}</div></div>);

function DrawerDemo() {
  const [o, setO] = useState(false);
  return <div className="grid h-full place-items-center p-6"><Button variant="primary" onClick={() => setO(true)}>Open department drawer</Button><DepartmentDrawer open={o} onClose={() => setO(false)} departments={[{ id: "e", label: "Electronics", icon: Laptop, groups: [{ heading: "Computers", links: ["Laptops", "Tablets", "Monitors"] }, { heading: "Audio", links: ["Headphones", "Speakers"] }] }, { id: "h", label: "Home and furniture", icon: Armchair, groups: [{ heading: "Office", links: ["Chairs", "Desks"] }] }]} /></div>;
}
export function NavigationGallery() {
  const [cur, setCur] = useState("customers"); const [collapsed, setCollapsed] = useState(false); const [tab, setTab] = useState("a"); const [vt, setVt] = useState("profile"); const [pill, setPill] = useState("all"); const [bt, setBt] = useState("home"); const [pg, setPg] = useState(2);
  const brand = <Logo height={26} tagline={false} tone="auto" />;
  return (
    <div className="flex flex-col gap-12">
      <Specimen title="Pick by product type" note="Seven shells cover almost everything." doc="04-patterns/navigation-per-product-type.md" pad={false}>
        <table className="w-full text-body"><thead><tr className="h-9 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">Product</th><th className="text-start font-medium">Shell</th><th className="hidden pe-5 text-start font-medium md:table-cell">Components</th></tr></thead>
          <tbody>{[["Business app, many modules", "Sidebar + top bar", "SideNav full · TopBar"], ["Data-heavy or field tool", "Rail + top bar, dark Ink", "SideNav rail · TopBar tone=nav"], ["Store", "Announcement + header + category row", "EcomHeader · MegaMenu · BottomTabs on phone"], ["Marketing site", "Top header with mega menu", "SiteHeader · SiteFooter"], ["Docs and knowledge base", "Top bar + tree + on-this-page", "SideNav compact · SubNav"], ["Mobile app", "Bottom tabs (≤ 5)", "BottomTabs · TopBar"], ["Settings", "Secondary rail inside the page", "SubNav · VerticalTabs"]].map(([a, b, c]) => <tr key={a} className="h-11 border-b border-subtle last:border-0"><td className="ps-5 font-medium">{a}</td><td className="text-secondary">{b}</td><td className="hidden pe-5 font-mono text-caption text-tertiary md:table-cell">{c}</td></tr>)}</tbody></table>
      </Specimen>

      <Specimen title="Sidebars" note="Four widths and styles, one component." doc="nav.tsx · SideNav" pad>
        <div className="grid gap-6 lg:grid-cols-2">
          <Frame title="Full · 240" use="Default for apps with 6 to 20 destinations. Groups, nested items, badges." h={500}><div className="flex h-full"><SideNav groups={groups} current={cur} brand={brand} onNavigate={setCur} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} footer={!collapsed && <div className="flex items-center gap-2.5 rounded-control p-2"><Avatar id="u1" name="Mia Moreno" size={24} /><div className="min-w-0 text-body-sm"><p className="truncate font-medium text-[var(--nav-fg-strong)]">Mia Moreno</p><p className="truncate text-[var(--nav-muted)]">Northwind Traders</p></div></div>} /><div className="flex-1 p-4 text-body-sm text-secondary">Page content. Try collapse, the inventory group, and the active state.</div></div></Frame>
          <Frame title="Compact · 208" use="Dense tools and docs. 32px items, 16px icons." h={500}><div className="flex h-full"><SideNav groups={groups} current="stock" variant="compact" brand={brand} /><div className="flex-1" /></div></Frame>
          <Frame title="Rail · 64" use="Maximum canvas. Labels in tooltips." h={500}><div className="flex h-full"><SideNav groups={groups} current="reports" collapsed brand={<Logo variant="mark" height={28} />} /><div className="flex-1" /></div></Frame>
          <Frame title="Floating" use="Lighter feel for focused tools. Detached, rounded, level-2 shadow." h={500}><div className="flex h-full"><SideNav groups={groups} current="customers" variant="floating" brand={brand} className="h-[calc(100%-1rem)]" /><div className="flex-1" /></div></Frame>
        </div>
      </Specimen>

      <Specimen title="Navigation styles" note="Same component, four looks. Users can choose from Customize." doc="themes.css · [data-nav]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{(["surface", "tint", "navy", "ink"] as const).map((n) => (
          <Frame key={n} title={{ surface: "Light", tint: "Tinted", navy: "Navy", ink: "Ink" }[n]} use={{ surface: "Neutral, safest.", tint: "Pale-blue wash.", navy: "Corporate Navy. Brand-forward.", ink: "Rich Black. Ops and night use." }[n]} h={300} nav={n}><div className="flex h-full"><SideNav groups={groups.slice(0, 2)} current="customers" variant="compact" brand={<Logo height={22} tagline={false} tone={n === "navy" || n === "ink" ? "white" : "auto"} />} className="w-44!" /><div className="flex-1" /></div></Frame>))}</div>
      </Specimen>

      <Specimen title="Top bars" note="Light, branded, and with search." doc="nav.tsx · TopBar">
        <div className="flex flex-col gap-5">
          <Frame title="App top bar" use="Search in the center, actions on the right." h={64}><TopBar left={<Logo height={26} tagline={false} />} center={<SearchTrigger label="Search deals, people, files" />} right={<><Button size="icon" variant="ghost" aria-label="Notifications"><Bell /></Button><Avatar id="u1" name="Mia Moreno" /></>} /></Frame>
          <Frame title="Branded bar" use="Corporate Navy. For internal tools where the product is the brand." h={64} nav="navy"><TopBar tone="nav" left={<Logo height={26} tagline={false} tone="white" />} right={<><Button size="icon" variant="ghost" aria-label="Notifications" className="!text-white hover:!bg-white/10"><Bell /></Button><Avatar id="u1" name="Mia Moreno" /></>} /></Frame>
          <Frame title="Ink bar, scanning" use="Rich Black with large touch targets for handhelds." h={64} nav="ink"><TopBar tone="nav" left={<><ScanLine className="size-5 text-[#65ABE2]" /><span className="text-body font-semibold">Receiving · dock 3</span></>} right={<span className="flex items-center gap-2 text-body-sm text-[var(--nav-fg)]"><span className="size-2 rounded-round bg-status-success-solid" />Online · 3 devices</span>} /></Frame>
        </div>
      </Specimen>

      <Specimen title="Site and store headers" note="Mega menus open on click and close on Esc." doc="nav.tsx · SiteHeader, EcomHeader, MegaMenu">
        <div className="flex flex-col gap-6">
          <Frame title="Marketing header with mega menu" use="Logo, 4 to 6 links, sign in and one primary action." h={380}><SiteHeader sticky={false} current="Pricing" onSignIn={() => {}} cta={<Button variant="primary">Start free</Button>} links={[{ label: "Product", mega: { columns: [{ title: "Platform", links: [{ label: "Deals", desc: "Track every renewal", icon: FileText }, { label: "Approvals", desc: "Route to the right person", icon: Shield }] }, { title: "Operations", links: [{ label: "Scanning", desc: "Receiving and cycle counts", icon: ScanLine }, { label: "Integrations", desc: "Slack, Gmail, webhooks", icon: Plug }] }] } }, { label: "Pricing", href: "#/pricing" }, { label: "Docs", href: "#/docs" }, { label: "Customers", href: "#" }]} /></Frame>
          <Frame title="Store header" use="Announcement, big search, account, wishlist, cart count, category row, mega menu." h={420}><EcomHeader announcement="Free shipping over $75 · 30-day returns" cartCount={3} categories={storeCategories} /></Frame>
        </div>
      </Specimen>

      <Specimen title="Heavy navigation" note="For sites with dozens of sections or thousands of categories. Three full-page models." doc="nav-mega.tsx · 03-components/website-navigation.md">
        <div className="grid gap-4 md:grid-cols-3">{[["site-nav/global", Globe2, "Global bar with flyouts", "Apple-style. A slim bar, full-width flyouts, dimmed page. 5 to 9 sections."], ["site-nav/marketplace", ShoppingBasket, "Marketplace header", "Amazon-style. Search with typeahead, account flyout, department drawer."], ["site-nav/platform", Grid3, "Platform bar", "Meta-style. Icon tabs, app launcher, chats, notifications, account panel."]].map(([id, I, ti, d]) => { const Ic = I as typeof Globe2; return <a key={id as string} href={`#/${id}`} className="group flex flex-col gap-3 rounded-card border border-subtle bg-surface-raised p-5 transition-[border-color,box-shadow] duration-150 hover:border-strong hover:shadow-raised"><span className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-control bg-selected text-link"><Ic className="size-5" aria-hidden /></span><ArrowUpRight className="size-4 text-tertiary" aria-hidden /></span><span><span className="block text-body font-semibold">{ti as string}</span><span className="mt-0.5 block text-body-sm text-secondary">{d as string}</span></span><span className="text-body-sm font-medium text-link">Open full-page demo</span></a>; })}</div>
        <div className="mt-6 grid gap-6"><Frame title="Global bar, live" use="Hover or tab to a section. Esc closes. Links stagger in (M-09), panel reveals (M-14), underline slides (M-13)." h={440}><GlobalBar items={globalItems} /></Frame>
          <div className="grid gap-6 lg:grid-cols-2"><Frame title="Search with typeahead" use="Recent searches, live suggestions with the typed part bold, category scopes, product hits." h={420}><div className="p-4"><div className="overflow-visible rounded-control border border-control bg-surface-raised"><Typeahead products={products} /></div></div></Frame>
            <Frame title="Department drawer (drill-down)" use="Also the mobile menu for any large site. Two levels, back stays in place." h={420}><DrawerDemo /></Frame></div>
          <div className="grid gap-6 lg:grid-cols-2"><Frame title="App launcher" use="A grid of products with search and a Create column. For suites." h={380}><div className="m-4 rounded-card border border-subtle bg-surface-overlay p-3 shadow-dropdown"><AppLauncher apps={[{ id: "a", label: "Deals", icon: FileText, tone: "azure" }, { id: "b", label: "Approvals", icon: ShieldCheck, tone: "navy" }, { id: "c", label: "People", icon: UsersIcon, tone: "tint" }]} create={[{ label: "Deal", icon: FileText }, { label: "Approval", icon: ShieldCheck }]} /></div></Frame>
            <div className="grid gap-6"><Frame title="Account panel" use="Profile card, grouped actions, log out last." h={300}><div className="m-4 max-w-sm"><AccountPanel name="Mia Moreno" role="Finance operations" /></div></Frame></div></div>
          <Frame title="Category tree" use="Expandable catalog tree with counts for category pages and filters." h={300}><div className="max-w-xs p-4"><CategoryTree current="Laptops" tree={[{ label: "Electronics", count: 1240, children: [{ label: "Computers", count: 410, children: [{ label: "Laptops", count: 180 }, { label: "Tablets", count: 96 }] }, { label: "Audio", count: 312 }] }, { label: "Home and furniture", count: 860, children: [{ label: "Office", count: 240 }] }, { label: "Fashion", count: 2210 }]} /></div></Frame></div>
      </Specimen>

      <Specimen title="Mobile and secondary navigation" doc="nav.tsx · BottomTabs, VerticalTabs, PillTabs, SubNav">
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <div className="mx-auto w-72"><div className="flex h-[26rem] flex-col overflow-hidden rounded-[28px] border-4 border-[var(--color-strong)] bg-surface-sunken"><TopBar className="!h-12" left={<Logo height={22} tagline={false} />} right={<Button size="icon" variant="ghost" aria-label="Search"><Search /></Button>} /><div className="flex-1 p-4 text-body-sm text-secondary">{bt[0].toUpperCase() + bt.slice(1)}</div><BottomTabs current={bt} onSelect={setBt} items={[{ id: "home", label: "Home", icon: Home }, { id: "scan", label: "Scan", icon: ScanLine }, { id: "orders", label: "Orders", icon: Truck, badge: 2 }, { id: "saved", label: "Saved", icon: Heart }, { id: "me", label: "Account", icon: User }]} /></div><p className="mt-2 text-center text-body-sm text-secondary">Bottom tabs: 3 to 5 destinations</p></div>
          <div className="flex flex-col gap-7">
            <div><p className="mb-2 text-body-sm font-medium text-secondary">Underline tabs (in-page views)</p><Tabs label="Views" value={tab} onChange={setTab} items={[{ id: "a", label: "Overview" }, { id: "b", label: "Activity", count: 12 }, { id: "c", label: "Files" }, { id: "d", label: "Settings" }]} /></div>
            <div><p className="mb-2 text-body-sm font-medium text-secondary">Pill tabs (filters, categories)</p><PillTabs label="Category" value={pill} onChange={setPill} items={[{ id: "all", label: "All", count: 48 }, { id: "open", label: "Open", count: 12 }, { id: "late", label: "Late", count: 4 }, { id: "done", label: "Done", count: 32 }]} /></div>
            <div><p className="mb-2 text-body-sm font-medium text-secondary">Segmented (view switch)</p><Segmented label="View" items={["List", "Board", "Calendar"]} value="List" onChange={() => {}} /></div>
            <div className="grid gap-6 sm:grid-cols-2"><div><p className="mb-2 text-body-sm font-medium text-secondary">Vertical tabs</p><VerticalTabs label="Account" value={vt} onChange={setVt} items={[{ id: "profile", label: "Profile", icon: User, desc: "Name and photo" }, { id: "security", label: "Security", icon: Shield, desc: "Password and passkeys" }, { id: "billing", label: "Billing", icon: CreditCard, desc: "Plan and invoices" }]} /></div>
              <div><p className="mb-2 text-body-sm font-medium text-secondary">Sub-navigation rail</p><SubNav title="Workspace" current="members" items={[{ id: "general", label: "General" }, { id: "members", label: "Members" }, { id: "billing", label: "Billing" }, { id: "audit", label: "Audit log" }]} /></div></div>
            <div><p className="mb-2 text-body-sm font-medium text-secondary">Breadcrumbs</p><div className="flex flex-col gap-3"><Breadcrumb items={[{ label: "Deals", href: "#" }, { label: "Wingtip", href: "#" }, { label: "Activity" }]} /><p className="flex items-center gap-1.5 text-body-sm text-secondary"><Home className="size-3.5" /> / Store / Carry / <span className="font-medium text-primary">Backpacks</span></p></div></div>
            <div className="overflow-hidden rounded-card border border-subtle bg-surface-raised"><Pagination page={pg} pages={9} total={212} size={25} onPage={setPg} /></div>
          </div></div>
      </Specimen>
    </div>);
}
