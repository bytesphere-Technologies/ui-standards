"use client";
import { cn } from "../../lib/cn";

export function SubNav({ title, items, current }: { title?: string; items: { id: string; label: string; href?: string }[]; current: string }) {
  return (
    <nav aria-label={title ?? "Section"} className="flex flex-col gap-0.5">{title && <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">{title}</p>}
      {items.map((i) => <a key={i.id} href={i.href ?? "#"} aria-current={i.id === current ? "page" : undefined} className={cn("ring-inset-focus flex h-8 items-center rounded-control px-2 text-body font-medium hover:bg-action-ghost-hover", i.id === current ? "bg-selected font-semibold text-primary" : "text-secondary")}>{i.label}</a>)}</nav>);
}
