"use client";
import { X, Search, User, Heart, ShoppingBag, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Input } from "../input";
import { Logo } from "../logo";
import { MegaMenu } from "../mega-menu";
import { useMega } from "../../lib/nav-shared";
import { SiteLink } from "../site-header";
import { Tooltip } from "../tooltip";

/* ───────── EcomHeader ───────── */
export function EcomHeader({ categories, cartCount = 0, onCart, announcement, dense }: { categories: SiteLink[]; cartCount?: number; onCart?: () => void; announcement?: string; dense?: boolean }) {
  const { open, setOpen, ref } = useMega(categories.length); const [bar, setBar] = React.useState(true);
  return (
    <header ref={ref} className="relative z-20 bg-surface">
      {announcement && bar && <div className="flex h-9 items-center justify-center bg-action-accent px-4 text-body-sm text-action-accent-fg"><p className="truncate">{announcement}</p><button type="button" aria-label="Dismiss announcement" onClick={() => setBar(false)} className="absolute end-2 grid size-7 place-items-center rounded-control hover:bg-white/10"><X className="size-4" /></button></div>}
      <div className="border-b border-subtle"><div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <a href="#/store" aria-label="ByteSphere store, home" className="rounded-control"><span className="sm:hidden"><Logo variant="mark" height={32} /></span><span className="hidden sm:block"><Logo height={dense ? 30 : 36} tagline={false} /></span></a>
        <form role="search" className="mx-auto hidden w-full max-w-xl md:block" onSubmit={(e) => e.preventDefault()}><Input aria-label="Search products" placeholder="Search products, brands and categories" start={<Search />} /></form>
        <div className="ms-auto flex items-center gap-0.5 md:ms-0">
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Search"><Search /></Button>
          <Tooltip text="Account"><Button size="icon" variant="ghost" aria-label="Account"><User /></Button></Tooltip>
          <Tooltip text="Wishlist"><Button size="icon" variant="ghost" aria-label="Wishlist, 3 items" className="hidden sm:inline-flex"><Heart /></Button></Tooltip>
          <Button variant="ghost" onClick={onCart} aria-label={`Cart ${cartCount} items`} className="relative"><ShoppingBag /><span className="hidden sm:inline">Cart</span>{cartCount > 0 && <span aria-hidden data-n={cartCount > 99 ? "99+" : cartCount} className="tnum inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-round bg-action-primary px-1.5 text-[11px] font-semibold text-action-primary-fg before:content-[attr(data-n)]" />}</Button>
        </div></div></div>
      <nav aria-label="Categories" className="border-b border-subtle"><div className="mx-auto flex h-11 max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6">{categories.map((c, i) => c.mega
        ? <button key={c.label} type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className={cn("inline-flex h-8 shrink-0 items-center gap-1 rounded-control px-3 text-body font-medium hover:bg-action-ghost-hover", open === i ? "bg-selected text-primary" : "text-secondary")}>{c.label}<ChevronDown className="size-4" aria-hidden /></button>
        : <a key={c.label} href={c.href ?? "#"} className={cn("inline-flex h-8 shrink-0 items-center rounded-control px-3 text-body font-medium hover:bg-action-ghost-hover", c.label === "Sale" ? "text-status-danger-fg" : "text-secondary")}>{c.label}</a>)}</div></nav>
      {open != null && categories[open].mega && <div className="absolute inset-x-0 top-full border-b border-subtle bg-surface shadow-dropdown"><div className="mx-auto max-w-7xl"><MegaMenu {...categories[open].mega!} /></div></div>}
    </header>);
}
