"use client";
import { ChevronDown, Menu as MenuIcon, X, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Logo } from "../logo";
import { MegaColumn, MegaMenu } from "../mega-menu";
import { useMega } from "../../lib/nav-shared";

export type SiteLink = { label: string; href?: string; mega?: { columns: MegaColumn[]; feature?: React.ReactNode } };

/* ───────── SiteHeader (marketing) ───────── */
export function SiteHeader({ links, current, cta, onSignIn, sticky, overlay }: { links: SiteLink[]; current?: string; cta?: React.ReactNode; onSignIn?: () => void; sticky?: boolean; overlay?: boolean }) {
  const { open, setOpen, ref } = useMega(links.length); const [drawer, setDrawer] = React.useState(false);
  return (
    <header ref={ref} className={cn("relative z-20 border-b", sticky && "sticky top-0", overlay ? "border-transparent bg-transparent" : "border-subtle bg-surface")}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#/home" aria-label="ByteSphere Technologies, home" className="rounded-control"><Logo height={36} /></a>
        <nav aria-label="Site" className="hidden gap-0.5 md:flex">{links.map((l, i) => l.mega
          ? <button key={l.label} type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className={cn("inline-flex items-center gap-1 rounded-control px-3 py-1.5 text-body font-medium hover:bg-action-ghost-hover", open === i ? "text-primary" : "text-secondary")}>{l.label}<ChevronDown className={cn("size-4 transition-transform duration-150", open === i && "rotate-180")} aria-hidden /></button>
          : <a key={l.label} href={l.href ?? "#"} aria-current={current === l.label ? "page" : undefined} className={cn("rounded-control px-3 py-1.5 text-body font-medium hover:bg-action-ghost-hover", current === l.label ? "text-primary" : "text-secondary")}>{l.label}</a>)}</nav>
        <div className="ms-auto hidden items-center gap-2 md:flex"><Button variant="ghost" onClick={onSignIn}>Sign in</Button>{cta}</div>
        <Button size="icon" variant="ghost" aria-label="Open menu" className="ms-auto md:hidden" onClick={() => setDrawer(true)}><MenuIcon /></Button>
      </div>
      {open != null && links[open].mega && <div className="absolute inset-x-0 top-full border-b border-subtle bg-surface shadow-dropdown"><div className="mx-auto max-w-6xl"><MegaMenu {...links[open].mega!} /></div></div>}
      {drawer && <div className="fixed inset-0 z-50 md:hidden"><div className="absolute inset-0 bg-scrim" onClick={() => setDrawer(false)} /><div role="dialog" aria-modal="true" aria-label="Menu" className="m-sheet-right absolute inset-y-0 end-0 w-80 max-w-full overflow-y-auto bg-surface p-4 shadow-modal"><div className="mb-4 flex items-center justify-between"><Logo height={32} /><Button size="icon" variant="ghost" aria-label="Close menu" onClick={() => setDrawer(false)}><X /></Button></div>
        <ul className="flex flex-col">{links.map((l) => <li key={l.label} className="border-b border-subtle"><a href={l.href ?? "#"} className="flex h-12 items-center justify-between text-body font-medium">{l.label}{l.mega && <ChevronRight className="size-4 text-tertiary" />}</a></li>)}</ul><div className="mt-6 flex flex-col gap-2"><Button size="lg" onClick={onSignIn}>Sign in</Button>{cta}</div></div></div>}
    </header>);
}
