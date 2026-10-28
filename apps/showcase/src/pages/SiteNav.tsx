import { useState } from "react";
import { Laptop, Headphones, Armchair, Shirt, Dumbbell, BookOpen, Baby, Car, Home, Users, Briefcase, PlayCircle, Store, ShoppingBag, BarChart3, ScanLine, FileText, MessageSquarePlus, ShieldCheck, Calendar, ArrowRight, Heart, MessageCircle, Share2, Image, CreditCard } from "lucide-react";
import { GlobalBar, MarketplaceHeader, PlatformBar, CategoryTree, type GlobalItem, type Department, type LauncherApp, type TreeNode } from "@bytesphere/ui";
import { Button, Avatar, StatusPill, Card, CardHeader } from "@bytesphere/ui";
import { SurfaceCard, Backdrop, BannerCard, SiteFooter } from "@bytesphere/ui";
import { ProductCard, ProductArt, Price } from "@bytesphere/ui";
import { StatTile } from "@bytesphere/ui";
import { Logo } from "@bytesphere/ui";
import { products, people } from "../data";
import { useCart, cart } from "../cart";
import { Art } from "@bytesphere/ui";

const L = (...l: string[]) => l.map((label) => ({ label }));
export const globalItems: GlobalItem[] = [
  { label: "Platform", flyout: { leadHeading: "Explore the platform", lead: ["Overview", "Deals", "Approvals", "Scanning"], columns: [{ heading: "Work", links: [{ label: "Pipeline" }, { label: "Inbox" }, { label: "Reports", badge: "New" }, { label: "Automations" }] }, { heading: "Operations", links: L("Receiving", "Cycle counts", "Devices", "Exceptions") }, { heading: "Control", links: L("Roles and permissions", "Audit log", "Single sign-on", "API") }] } },
  { label: "Solutions", flyout: { leadHeading: "By team", lead: ["Finance", "Sales", "Operations", "People"], columns: [{ heading: "Use cases", links: L("Renewals", "Invoice approvals", "Inventory counts", "Leave and hiring") }, { heading: "Migrate from", links: L("Spreadsheets", "Salesforce", "HubSpot", "Legacy ERP") }] } },
  { label: "Industries", flyout: { leadHeading: "By industry", lead: ["Retail", "Logistics", "Healthcare", "Manufacturing"], columns: [{ heading: "Customer stories", links: L("Wingtip", "Contoso", "Fabrikam") }, { heading: "Compliance", links: L("SOC 2", "GDPR", "ISO 27001") }] } },
  { label: "Developers", flyout: { leadHeading: "Build on ByteSphere", lead: ["Docs", "API reference", "SDKs"], columns: [{ heading: "Start", links: L("Quickstart", "Authentication", "Webhooks") }, { heading: "Community", links: L("Changelog", "Status", "Discussions") }] } },
  { label: "Pricing", href: "#/pricing" }, { label: "Company", flyout: { leadHeading: "ByteSphere", lead: ["About", "Careers", "Press"], columns: [{ heading: "Contact", links: L("Sales", "Support", "Security report") }] } },
];
const deps: Department[] = [
  { id: "elec", label: "Electronics", icon: Laptop, groups: [{ heading: "Computers", links: ["Laptops", "Tablets", "Monitors", "Accessories"] }, { heading: "Audio", links: ["Headphones", "Speakers", "Microphones"] }, { heading: "Smart home", links: ["Lighting", "Security", "Hubs"] }] },
  { id: "audio", label: "Audio and music", icon: Headphones, groups: [{ heading: "Listen", links: ["Over-ear", "In-ear", "Portable speakers"] }, { heading: "Create", links: ["Interfaces", "Studio monitors"] }] },
  { id: "home", label: "Home and furniture", icon: Armchair, groups: [{ heading: "Office", links: ["Chairs", "Desks", "Lighting"] }, { heading: "Living", links: ["Sofas", "Rugs", "Storage"] }] },
  { id: "fashion", label: "Fashion", icon: Shirt, groups: [{ heading: "Women", links: ["Clothing", "Shoes", "Bags"] }, { heading: "Men", links: ["Clothing", "Shoes", "Watches"] }] },
  { id: "sport", label: "Sports and outdoor", icon: Dumbbell, groups: [{ heading: "Hydration", links: ["Bottles", "Hydration packs"] }, { heading: "Carry", links: ["Backpacks", "Duffels"] }] },
  { id: "books", label: "Books and media", icon: BookOpen, groups: [{ heading: "Books", links: ["Business", "Design", "Engineering"] }] },
  { id: "kids", label: "Baby and kids", icon: Baby, groups: [{ heading: "Shop", links: ["Toys", "Learning", "Travel"] }] },
  { id: "auto", label: "Automotive", icon: Car, groups: [{ heading: "Shop", links: ["Tools", "Care", "Electronics"] }] },
];
const tree: TreeNode[] = [{ label: "Electronics", count: 1240, children: [{ label: "Computers", count: 410, children: [{ label: "Laptops", count: 180 }, { label: "Tablets", count: 96 }] }, { label: "Audio", count: 312 }, { label: "Smart home", count: 188 }] }, { label: "Home and furniture", count: 860, children: [{ label: "Office", count: 240 }, { label: "Living", count: 410 }] }, { label: "Sports and outdoor", count: 540 }, { label: "Fashion", count: 2210 }, { label: "Books and media", count: 3180 }];
const apps: LauncherApp[] = [{ id: "deals", label: "Deals", icon: FileText, tone: "azure" }, { id: "approve", label: "Approvals", icon: ShieldCheck, tone: "navy" }, { id: "scan", label: "Scanning", icon: ScanLine, tone: "ink" }, { id: "reports", label: "Reports", icon: BarChart3, tone: "tint" }, { id: "people", label: "People", icon: Users, tone: "tint" }, { id: "store", label: "Store", icon: Store, tone: "azure" }, { id: "pay", label: "Billing", icon: CreditCard, tone: "navy" }, { id: "cal", label: "Calendar", icon: Calendar, tone: "tint" }, { id: "docs", label: "Docs", icon: BookOpen, tone: "ink" }];
const create = [{ label: "Deal", icon: FileText }, { label: "Approval", icon: ShieldCheck }, { label: "Message", icon: MessageSquarePlus }];

/* ───────── 1. Global bar with flyouts ───────── */
export function GlobalNavDemo() {
  const [tone, setTone] = useState<"light" | "dark">("light");
  return (
    <div className="bg-surface-sunken"><h1 className="sr-only">Global bar demo</h1>
      <GlobalBar items={globalItems} tone={tone} right={<Button size="sm" variant="primary" className="ms-1 hidden sm:inline-flex">Start free</Button>} />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-surface"><Backdrop variant="grid" subtle />
          <div className="relative mx-auto max-w-[78rem] px-6 py-20 text-center"><StatusPill tone="info" dot={false}>Hover or tab to the bar above</StatusPill>
            <h1 className="font-display mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,1.4rem+3.4vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em]">One bar. Every section. Nothing hidden.</h1>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-secondary">Full-width flyouts open on intent, dim the page, and close on Esc. Links stagger in; the top items keep their underline while open.</p>
            <div className="mt-7 flex items-center justify-center gap-3"><Button size="lg" variant="primary">Start free trial<ArrowRight /></Button><Button size="lg" onClick={() => setTone(tone === "light" ? "dark" : "light")}>{tone === "light" ? "Try the dark bar" : "Try the light bar"}</Button></div></div></section>
        <section className="mx-auto max-w-[78rem] px-6 py-14"><div className="grid gap-4 md:grid-cols-3">{[["Receiving", "Scan, match and close shipments from any handheld.", "navy"], ["Approvals", "Route requests by amount and role, decide in one tap.", "azure"], ["Reports", "Weekly summaries to the people who need them.", "tint"]].map(([t, d, tn]) => <div key={t} className="overflow-hidden rounded-card border border-subtle bg-surface-raised"><div className="relative aspect-[16/10]"><Backdrop variant={tn === "tint" ? "tint" : tn === "azure" ? "brand" : "navy"} /><Backdrop variant="waves" subtle /></div><div className="p-5"><h2 className="text-h4 font-semibold">{t}</h2><p className="mt-1 text-body text-secondary">{d}</p><a href="#" className="mt-3 inline-flex items-center gap-1 text-body font-medium text-link hover:underline">Learn more<ArrowRight className="size-4" /></a></div></div>)}</div></section>
      </main>
      <SiteFooter variant="simple" />
    </div>);
}

/* ───────── 2. Marketplace header ───────── */
export function MarketplaceNavDemo() {
  const { count } = useCart();
  return (
    <div className="bg-surface-sunken"><h1 className="sr-only">Marketplace header demo</h1>
      <MarketplaceHeader departments={deps} products={products} cartCount={count} />
      <main id="main" tabIndex={-1} className="mx-auto max-w-[90rem] px-3 py-5 outline-none sm:px-4">
        <div className="grid gap-5 lg:grid-cols-[15rem_1fr]">
          <aside className="hidden lg:block"><p className="mb-2 text-body font-semibold">Departments</p><CategoryTree tree={tree} current="Laptops" /></aside>
          <div className="min-w-0 flex flex-col gap-5">
            <BannerCard tone="brand" title="Spring gear event: up to 25% off" body="Free delivery over $75. 30-day returns on everything." cta="Shop deals" />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{deps.slice(0, 4).map((d) => <SurfaceCard key={d.id} interactive as="a" href="#/store" className="flex flex-col gap-3"><div className="grid grid-cols-2 gap-1.5">{products.slice(0, 4).map((p, i) => <ProductArt key={p.id} kind={p.kind} tone={(["tint", "navy", "azure", "sunken"] as const)[(i + d.id.length) % 4]} className="aspect-square rounded-control" />)}</div><div><p className="text-body font-semibold">{d.label}</p><p className="text-body-sm text-link">Shop now</p></div></SurfaceCard>)}</div>
            <section><div className="mb-3 flex items-baseline justify-between"><h2 className="text-h3 font-semibold">Today’s deals</h2><a href="#/store" className="text-body font-medium text-link hover:underline">See all deals</a></div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">{products.slice(0, 6).map((p) => <ProductCard key={p.id} variant="minimal" p={p} />)}</div></section>
            <section className="grid gap-4 lg:grid-cols-3">{products.slice(1, 4).map((p) => <ProductCard key={p.id} variant="list" p={p} onAdd={(x) => cart.add(x.id)} />)}</section>
          </div></div>
      </main>
      <SiteFooter variant="navy" className="mt-8" />
    </div>);
}

/* ───────── 3. Platform bar ───────── */
export function PlatformNavDemo() {
  const [tab, setTab] = useState("home");
  const tabs = [{ id: "home", label: "Home", icon: Home }, { id: "work", label: "Work", icon: Briefcase }, { id: "people", label: "People", icon: Users }, { id: "learn", label: "Learn", icon: PlayCircle, badge: 3 }, { id: "store", label: "Store", icon: ShoppingBag }];
  return (
    <div className="bg-surface-sunken"><h1 className="sr-only">Platform bar demo</h1>
      <PlatformBar tabs={tabs} current={tab} onTab={setTab} apps={apps} create={create} />
      <main id="main" tabIndex={-1} className="mx-auto grid max-w-[100rem] gap-5 px-3 py-5 outline-none lg:grid-cols-[18rem_minmax(0,1fr)_18rem]">
        <aside className="hidden lg:block"><ul className="flex flex-col gap-0.5">{[["Mia Moreno", "u1"], ["Deals", ""], ["Approvals", ""], ["Scanning", ""], ["Reports", ""], ["Team directory", ""]].map(([l, id], i) => <li key={l}><a href="#" className="flex h-11 items-center gap-3 rounded-control px-2 text-body font-medium hover:bg-action-ghost-hover">{id ? <Avatar id={id} name={l} size={32} /> : <span className="grid size-8 place-items-center rounded-round bg-selected text-link">{[FileText, ShieldCheck, ScanLine, BarChart3, Users][i - 1] ? (() => { const I = [FileText, ShieldCheck, ScanLine, BarChart3, Users][i - 1]; return <I className="size-4" />; })() : null}</span>}{l}</a></li>)}</ul></aside>
        <div className="flex min-w-0 flex-col gap-4">
          <Card><div className="flex items-center gap-3"><Avatar id="u1" name="Mia Moreno" size={40} /><button type="button" className="h-10 flex-1 rounded-round bg-surface-sunken px-4 text-start text-body text-secondary hover:bg-action-ghost-active">What’s happening on your team, Mia?</button></div><div className="mt-3 flex border-t border-subtle pt-2">{[[Image, "Photo"], [FileText, "Update"], [Calendar, "Event"]].map(([I, l]) => { const Ic = I as typeof Image; return <button key={l as string} type="button" className="flex h-9 flex-1 items-center justify-center gap-2 rounded-control text-body font-medium text-secondary hover:bg-action-ghost-hover"><Ic className="size-[18px] text-link" />{l as string}</button>; })}</div></Card>
          {[0, 1].map((i) => <Card key={i} flush><div className="flex items-center gap-3 p-4"><Avatar id={people[i + 1].id} name={people[i + 1].name} size={40} /><div className="flex-1"><p className="text-body font-semibold">{people[i + 1].name}</p><p className="text-body-sm text-secondary">{["Operations", "Finance"][i]} · {["2 h", "5 h"][i]}</p></div></div><p className="px-4 pb-3 text-body">{["Closed shipment IN-20418 with 99.4% match rate. Dock 3 was the fastest this month.", "Q2 hiring plan approved. Three roles open for the Berlin team."][i]}</p><div className="mx-4 mb-3 overflow-hidden rounded-card border border-subtle">{i === 0 ? <StatTile style="spark" label="Match rate" value="99.4%" delta="1.2 pt" data={[96, 97, 97, 98, 98, 99]} /> : <div className="grid place-items-center bg-selected p-6"><Art.chart /></div>}</div><div className="flex border-t border-subtle px-2 py-1">{[[Heart, "Like"], [MessageCircle, "Comment"], [Share2, "Share"]].map(([I, l]) => { const Ic = I as typeof Heart; return <button key={l as string} type="button" className="flex h-10 flex-1 items-center justify-center gap-2 rounded-control text-body font-medium text-secondary hover:bg-action-ghost-hover"><Ic className="size-[18px]" />{l as string}</button>; })}</div></Card>)}
        </div>
        <aside className="hidden lg:block"><Card><CardHeader title="Contacts" /><ul className="mt-3 flex flex-col gap-1">{people.map((p, i) => <li key={p.id}><a href="#" className="flex h-10 items-center gap-3 rounded-control px-1 hover:bg-action-ghost-hover"><Avatar id={p.id} name={p.name} size={32} presence={i < 3 ? "online" : "offline"} /><span className="text-body">{p.name}</span></a></li>)}</ul></Card><div className="mt-4 flex items-center gap-2 px-1 text-caption text-tertiary"><Logo variant="mark" height={18} />© 2026 ByteSphere</div></aside>
      </main>
    </div>);
}
