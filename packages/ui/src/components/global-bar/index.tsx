"use client";
import { Search, Menu as MenuIcon, ChevronRight, X, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Kbd } from "../kbd";
import { Logo } from "../logo";

/* ───────── GlobalBar (Apple-style) ───────── */
export type FlyoutColumn = { heading: string; links: { label: string; href?: string; badge?: string }[] };

export type GlobalItem = { label: string; href?: string; flyout?: { leadHeading: string; lead: string[]; columns: FlyoutColumn[] } };

export function GlobalBar({ items, tone = "light", right, sticky }: { items: GlobalItem[]; tone?: "light" | "dark"; right?: React.ReactNode; sticky?: boolean }) {
  const [open, setOpen] = React.useState<number | null>(() => { const f = new URLSearchParams(location.search).get("flyout"); return f != null && !Number.isNaN(+f) ? +f : null; }); const [search, setSearch] = React.useState(false); const [drawer, setDrawer] = React.useState(false); const [acc, setAcc] = React.useState<number | null>(null);
  const timer = React.useRef<number>(0); const wrap = React.useRef<HTMLDivElement>(null); const btns = React.useRef<(HTMLElement | null)[]>([]);
  const intent = (i: number | null, d: number) => { clearTimeout(timer.current); timer.current = window.setTimeout(() => { setOpen(i); setSearch(false); }, d); };
  React.useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setSearch(false); setDrawer(false); } }; document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, []);
  const active = open != null ? items[open] : null; const panelOpen = !!(active?.flyout) || search;
  const move = (e: React.KeyboardEvent, i: number) => { if (e.key === "ArrowRight") btns.current[(i + 1) % items.length]?.focus(); if (e.key === "ArrowLeft") btns.current[(i - 1 + items.length) % items.length]?.focus(); if (e.key === "ArrowDown" && items[i].flyout) { setOpen(i); } };
  return (
    <div ref={wrap} data-nav={tone === "dark" ? "ink" : "surface"} className={cn("relative z-30", sticky && "sticky top-11")} onMouseLeave={() => intent(null, 150)}>
      <header className="relative z-40 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--nav-fg-strong)]">
        <div className="mx-auto flex h-12 max-w-[78rem] items-center gap-2 px-4">
          <a href="#/home" aria-label="ByteSphere Technologies, home" className="me-2 rounded-control p-1"><Logo variant="mark" height={26} tone={tone === "dark" ? "white" : "auto"} /></a>
          <nav aria-label="Global" className="hidden flex-1 items-center justify-center md:flex"><ul className="flex items-center">{items.map((it, i) => (
            <li key={it.label}>{it.flyout ? <button ref={(el) => { btns.current[i] = el; }} type="button" aria-expanded={open === i} aria-haspopup="true" onMouseEnter={() => intent(i, 120)} onFocus={() => intent(i, 0)} onClick={() => setOpen(open === i ? null : i)} onKeyDown={(e) => move(e, i)} className="m-underline h-12 px-3 text-body font-medium text-[var(--nav-fg)] hover:text-[var(--nav-fg-strong)] aria-expanded:text-[var(--nav-fg-strong)]">{it.label}</button>
              : <a ref={(el) => { btns.current[i] = el; }} href={it.href ?? "#"} onMouseEnter={() => intent(null, 80)} onKeyDown={(e) => move(e, i)} className="m-underline inline-flex h-12 items-center px-3 text-body font-medium text-[var(--nav-fg)] hover:text-[var(--nav-fg-strong)]">{it.label}</a>}</li>))}</ul></nav>
          <div className="ms-auto flex items-center gap-0.5 md:ms-0">
            <button type="button" aria-label="Search" aria-expanded={search} onClick={() => { setSearch(!search); setOpen(null); }} className="grid size-10 place-items-center rounded-control text-[var(--nav-fg)] hover:bg-[var(--nav-hover)]"><Search className="size-[18px]" /></button>{right}
            <button type="button" aria-label="Menu" onClick={() => setDrawer(true)} className="grid size-10 place-items-center rounded-control text-[var(--nav-fg)] hover:bg-[var(--nav-hover)] md:hidden"><MenuIcon className="size-5" /></button>
          </div></div>
      </header>
      {panelOpen && <><div className="m-fade absolute inset-x-0 top-full z-30 h-[120vh] bg-scrim" onClick={() => { setOpen(null); setSearch(false); }} aria-hidden />
        <div className="m-flyout absolute inset-x-0 top-full z-40 border-b border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--nav-fg-strong)] shadow-dropdown" onMouseEnter={() => clearTimeout(timer.current)}>
          {search ? <div className="mx-auto max-w-[44rem] px-4 py-8"><label className="flex items-center gap-3 border-b border-[var(--nav-border)] pb-3"><Search className="size-6 text-[var(--nav-muted)]" /><input autoFocus placeholder="Search products, docs and people" aria-label="Search" className="h-10 flex-1 bg-transparent text-[24px] font-semibold tracking-[-0.01em] outline-none placeholder:text-[var(--nav-muted)]" /><Kbd>Esc</Kbd></label>
            <p className="mt-6 text-caption font-medium text-[var(--nav-muted)]">Quick links</p><ul className="m-stagger mt-2 flex flex-col">{["Compare plans", "Book a demo", "API reference", "Status and uptime"].map((l, i) => <li key={l} style={{ "--i": i } as React.CSSProperties}><a href="#" className="flex items-center gap-2 py-2 text-body font-medium text-[var(--nav-fg)] hover:text-[var(--nav-fg-strong)]"><ChevronRight className="size-4 text-[var(--nav-muted)]" />{l}</a></li>)}</ul></div>
          : active?.flyout && <div className="mx-auto grid max-w-[78rem] gap-10 px-6 py-9 lg:grid-cols-[1.1fr_3fr]"><div><p className="text-caption font-medium text-[var(--nav-muted)]">{active.flyout.leadHeading}</p><ul className="m-stagger mt-3 flex flex-col gap-1">{active.flyout.lead.map((l, i) => <li key={l} style={{ "--i": i } as React.CSSProperties}><a href="#" className="block py-0.5 text-[24px] font-semibold leading-8 tracking-[-0.015em] text-[var(--nav-fg-strong)] hover:text-[var(--nav-fg)]">{l}</a></li>)}</ul></div>
            <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${active.flyout.columns.length}, minmax(0, 1fr))` }}>{active.flyout.columns.map((c) => <div key={c.heading}><p className="text-caption font-medium text-[var(--nav-muted)]">{c.heading}</p><ul className="m-stagger mt-3 flex flex-col gap-2.5">{c.links.map((l, i) => <li key={l.label} style={{ "--i": i } as React.CSSProperties}><a href={l.href ?? "#"} className="inline-flex items-center gap-2 text-body font-medium text-[var(--nav-fg)] hover:text-[var(--nav-fg-strong)] hover:underline">{l.label}{l.badge && <span className="rounded-tag bg-action-primary px-1.5 text-[10px] font-semibold text-action-primary-fg">{l.badge}</span>}</a></li>)}</ul></div>)}</div></div>}
        </div></>}
      {drawer && <div className="fixed inset-0 z-50 md:hidden"><div className="absolute inset-0 bg-scrim" onClick={() => setDrawer(false)} /><div role="dialog" aria-modal="true" aria-label="Menu" className="m-sheet-right absolute inset-y-0 end-0 flex w-80 max-w-full flex-col bg-[var(--nav-bg)] text-[var(--nav-fg-strong)] shadow-modal"><div className="flex h-12 items-center justify-between px-4"><span className="text-body font-semibold">Menu</span><button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} className="grid size-10 place-items-center rounded-control hover:bg-[var(--nav-hover)]"><X className="size-5" /></button></div>
        <ul className="flex-1 overflow-y-auto px-4 pb-6">{items.map((it, i) => <li key={it.label} className="border-b border-[var(--nav-border)]">{it.flyout ? <><button type="button" aria-expanded={acc === i} onClick={() => setAcc(acc === i ? null : i)} className="flex h-14 w-full items-center justify-between text-start text-[20px] font-semibold tracking-[-0.01em]">{it.label}<ChevronDown className={cn("size-5 text-[var(--nav-muted)] transition-transform duration-150", acc === i && "rotate-180")} /></button>
          <div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: acc === i ? "1fr" : "0fr" }}><div className="overflow-hidden"><ul className="pb-3">{[...it.flyout.lead, ...it.flyout.columns.flatMap((c) => c.links.map((l) => l.label))].map((l) => <li key={l}><a href="#" className="block py-2 text-body text-[var(--nav-fg)]">{l}</a></li>)}</ul></div></div></> : <a href={it.href ?? "#"} className="flex h-14 items-center text-[20px] font-semibold tracking-[-0.01em]">{it.label}</a>}</li>)}</ul></div></div>}
    </div>);
}
