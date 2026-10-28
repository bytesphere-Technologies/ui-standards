"use client";
import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Count } from "../count";

/* ───────── BottomTabs (mobile) ───────── */
export function BottomTabs({ items, current, onSelect, className }: { items: { id: string; label: string; icon: LucideIcon; badge?: number }[]; current: string; onSelect?: (id: string) => void; className?: string }) {
  return (
    <nav aria-label="Primary" className={cn("grid border-t border-subtle bg-surface pb-[env(safe-area-inset-bottom)]", className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((it) => { const on = it.id === current; return (
        <button key={it.id} type="button" aria-current={on ? "page" : undefined} onClick={() => onSelect?.(it.id)} className="ring-inset-focus relative flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium">
          <span className={cn("relative grid h-7 w-12 place-items-center rounded-round transition-colors duration-150", on ? "bg-selected text-link" : "text-tertiary")}><it.icon className="size-5" aria-hidden />{it.badge ? <span className="absolute -end-0.5 -top-0.5"><Count n={it.badge} /></span> : null}</span>
          <span className={on ? "font-semibold text-primary" : "text-secondary"}>{it.label}</span></button>); })}
    </nav>);
}
