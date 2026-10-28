"use client";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Accordion ───────── */
export function Accordion({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">
      {items.map((it, i) => (
        <div key={it.q}>
          <h3><button aria-expanded={open === i} aria-controls={`acc-${i}`} onClick={() => setOpen(open === i ? null : i)} className="ring-inset-focus flex w-full items-center justify-between gap-4 px-5 py-3.5 text-start text-body font-medium text-primary hover:bg-action-ghost-hover">{it.q}<ChevronDown className={cn("size-4 shrink-0 text-tertiary transition-transform duration-200", open === i && "rotate-180")} aria-hidden /></button></h3>
          <div id={`acc-${i}`} role="region" className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}><div className="overflow-hidden"><div className="px-5 pb-4 text-body text-secondary">{it.a}</div></div></div>
        </div>))}
    </div>);
}
