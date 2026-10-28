"use client";
import { Menu as MenuIcon, MapPin, Search, Globe, ChevronDown, ShoppingCart } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { Product } from "../../lib/commerce-shared";
import { Department, DepartmentDrawer } from "../department-drawer";
import { Logo } from "../logo";
import { Typeahead } from "../typeahead";

/* ───────── MarketplaceHeader ───────── */
export function MarketplaceHeader({ departments, products, cartCount = 0, strip = ["Today’s deals", "Customer service", "Registry", "Gift cards", "Sell"] }: { departments: Department[]; products: Product[]; cartCount?: number; strip?: string[] }) {
  const [drawer, setDrawer] = React.useState(false); const [hover, setHover] = React.useState<string | null>(null);
  return (
    <header data-nav="navy" className="relative z-30 text-[var(--nav-fg-strong)]">
      <div className="bg-[var(--nav-bg)]"><div className="mx-auto flex max-w-[90rem] items-center gap-3 px-3 py-2.5 sm:px-4">
        <button type="button" aria-label="Open menu" onClick={() => setDrawer(true)} className="grid size-10 place-items-center rounded-control hover:bg-[var(--nav-hover)] lg:hidden"><MenuIcon className="size-5" /></button>
        <a href="#/store" aria-label="ByteSphere store, home" className="rounded-control p-1"><Logo height={30} tagline={false} tone="white" /></a>
        <button type="button" className="hidden items-center gap-1.5 rounded-control px-2 py-1 text-start hover:bg-[var(--nav-hover)] xl:flex"><MapPin className="size-5" aria-hidden /><span className="leading-tight"><span className="block text-caption text-[var(--nav-muted)]">Deliver to</span><span className="block text-body font-semibold">Berlin 10435</span></span></button>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex min-w-0 flex-1 overflow-hidden rounded-control text-primary focus-within:ring-2 focus-within:ring-[#65ABE2]">
          <select aria-label="Search category" className="hidden h-11 w-28 shrink-0 appearance-none border-e border-subtle bg-surface-sunken ps-3 text-body-sm text-secondary outline-none sm:block"><option>All</option>{departments.map((d) => <option key={d.id}>{d.label}</option>)}</select>
          <div className="min-w-0 flex-1"><Typeahead products={products} /></div>
          <button type="submit" aria-label="Search" className="grid h-11 w-12 shrink-0 place-items-center bg-[#65ABE2] text-[#000913] hover:bg-[#98C7EB]"><Search className="size-5" /></button></form>
        <div className="hidden items-center gap-1 lg:flex">
          <button type="button" className="flex items-center gap-1 rounded-control px-2 py-2 hover:bg-[var(--nav-hover)]"><Globe className="size-[18px]" aria-hidden /><span className="text-body font-semibold">EN</span></button>
          <div className="relative" onMouseEnter={() => setHover("acct")} onMouseLeave={() => setHover(null)}><button type="button" aria-expanded={hover === "acct"} className="rounded-control px-2 py-1 text-start leading-tight hover:bg-[var(--nav-hover)]"><span className="block text-caption text-[var(--nav-muted)]">Hello, Mia</span><span className="flex items-center gap-1 text-body font-semibold">Account and lists<ChevronDown className="size-3.5" /></span></button>
            {hover === "acct" && <div className="m-flyout absolute end-0 top-full z-50 w-[28rem] pt-1 text-primary"><div className="rounded-card border border-subtle bg-surface-overlay p-5 shadow-modal"><div className="flex items-center justify-between border-b border-subtle pb-4"><p className="text-body-sm text-secondary">Not Mia? <a href="#" className="font-medium text-link hover:underline">Switch account</a></p><Button size="sm" variant="primary">Sign out</Button></div>
              <div className="mt-4 grid grid-cols-2 gap-6 text-body"><div><p className="mb-2 font-semibold">Your lists</p>{["Create a list", "Wish list", "Saved for later"].map((l) => <a key={l} href="#" className="block py-1 text-secondary hover:text-primary hover:underline">{l}</a>)}</div><div><p className="mb-2 font-semibold">Your account</p>{["Account", "Orders", "Recommendations", "Subscriptions", "Memberships"].map((l) => <a key={l} href="#" className="block py-1 text-secondary hover:text-primary hover:underline">{l}</a>)}</div></div></div></div>}</div>
          <a href="#/store/orders" className="rounded-control px-2 py-1 leading-tight hover:bg-[var(--nav-hover)]"><span className="block text-caption text-[var(--nav-muted)]">Returns</span><span className="block text-body font-semibold">and orders</span></a></div>
        <a href="#/store/cart" aria-label={`Cart ${cartCount} items`} className="relative flex items-center gap-1.5 rounded-control px-2 py-1.5 hover:bg-[var(--nav-hover)]"><span className="relative"><ShoppingCart className="size-7" />{cartCount > 0 && <span className="tnum absolute -top-1.5 start-3 grid min-w-5 place-items-center rounded-round bg-[#65ABE2] px-1 text-[11px] font-bold text-[#000913] before:content-[attr(data-n)]" data-n={cartCount} />}</span><span className="hidden text-body font-semibold sm:inline">Cart</span></a>
      </div></div>
      <div className="border-t border-[var(--nav-border)] bg-[#2E417A]"><div className="mx-auto flex h-10 max-w-[90rem] items-center gap-1 overflow-x-auto px-3 sm:px-4">
        <button type="button" onClick={() => setDrawer(true)} className="m-underline inline-flex h-8 shrink-0 items-center gap-2 rounded-control px-2.5 text-body font-semibold hover:bg-[var(--nav-hover)]"><MenuIcon className="size-5" />All</button>
        {strip.map((s) => <a key={s} href="#/store" className="inline-flex h-8 shrink-0 items-center rounded-control px-2.5 text-body text-[var(--nav-fg)] hover:bg-[var(--nav-hover)] hover:text-white">{s}</a>)}
        <span className="ms-auto hidden shrink-0 pe-1 text-body font-semibold lg:block">Free delivery on orders over $75</span></div></div>
      <DepartmentDrawer open={drawer} onClose={() => setDrawer(false)} departments={departments} />
    </header>);
}
