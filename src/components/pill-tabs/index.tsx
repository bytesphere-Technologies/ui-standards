"use client";
import { cn } from "../../lib/cn";

export function PillTabs({ items, value, onChange, label }: { items: { id: string; label: string; count?: number }[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1.5">{items.map((t) => (
      <button key={t.id} role="tab" aria-selected={value === t.id} onClick={() => onChange(t.id)} className={cn("inline-flex h-8 items-center gap-1.5 rounded-control border px-3 text-body font-medium transition-colors duration-100", value === t.id ? "border-transparent bg-action-primary text-action-primary-fg" : "border-subtle bg-surface-raised text-secondary hover:border-strong hover:text-primary")}>{t.label}{t.count != null && <span className={cn("tnum text-caption", value === t.id ? "opacity-90" : "text-tertiary")}>{t.count}</span>}</button>))}</div>);
}
