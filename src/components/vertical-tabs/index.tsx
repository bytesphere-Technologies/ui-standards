"use client";
import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

/* ───────── Tab families ───────── */
export function VerticalTabs({ items, value, onChange, label }: { items: { id: string; label: string; icon?: LucideIcon; desc?: string }[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="tablist" aria-orientation="vertical" aria-label={label} className="flex flex-col gap-0.5">{items.map((t) => (
      <button key={t.id} role="tab" aria-selected={value === t.id} onClick={() => onChange(t.id)} className={cn("ring-inset-focus relative flex items-start gap-3 rounded-control px-3 py-2 text-start transition-colors duration-100 hover:bg-action-ghost-hover", value === t.id && "bg-selected")}>
        {value === t.id && <span className="absolute inset-y-2 start-0 w-0.5 rounded-round bg-action-primary" aria-hidden />}{t.icon && <t.icon className={cn("mt-0.5 size-4", value === t.id ? "text-link" : "text-tertiary")} aria-hidden />}
        <span><span className={cn("block text-body", value === t.id ? "font-semibold text-primary" : "font-medium text-secondary")}>{t.label}</span>{t.desc && <span className="block text-body-sm text-secondary">{t.desc}</span>}</span></button>))}</div>);
}
