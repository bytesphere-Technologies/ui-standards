"use client";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

/* ───────── MegaMenu ───────── */
export type MegaColumn = { title: string; links: { label: string; desc?: string; icon?: LucideIcon; href?: string }[] };

export function MegaMenu({ columns, feature }: { columns: MegaColumn[]; feature?: React.ReactNode }) {
  return (
    <div className="m-pop grid gap-8 p-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) ${feature ? "minmax(0, 1.1fr)" : ""}` }}>
      {columns.map((c) => (
        <div key={c.title}><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">{c.title}</p>
          <ul className="flex flex-col gap-1">{c.links.map((l) => (
            <li key={l.label}><a href={l.href ?? "#"} className="group -mx-2 flex gap-3 rounded-control px-2 py-1.5 hover:bg-action-ghost-hover">{l.icon && <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-control bg-surface-sunken text-secondary group-hover:bg-selected group-hover:text-link"><l.icon className="size-4" aria-hidden /></span>}<span><span className="block text-body font-medium text-primary">{l.label}</span>{l.desc && <span className="block text-body-sm text-secondary">{l.desc}</span>}</span></a></li>))}</ul></div>))}
      {feature}
    </div>);
}
