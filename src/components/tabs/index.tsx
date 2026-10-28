"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Tabs / Segmented ───────── */
export function Tabs({ items, value, onChange, label }: { items: { id: string; label: string; count?: number }[]; value: string; onChange: (v: string) => void; label: string }) {
  const onKey = (e: React.KeyboardEvent) => {
    const i = items.findIndex((x) => x.id === value);
    const n = e.key === "ArrowRight" ? (i + 1) % items.length : e.key === "ArrowLeft" ? (i - 1 + items.length) % items.length : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -1;
    if (n >= 0) { e.preventDefault(); onChange(items[n].id); e.currentTarget.querySelectorAll<HTMLElement>("[role=tab]")[n].focus(); }
  };
  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className="flex h-10 gap-5 overflow-x-auto border-b border-subtle max-sm:h-12">
      {items.map((t) => (
        <button key={t.id} role="tab" aria-selected={value === t.id} tabIndex={value === t.id ? 0 : -1} onClick={() => onChange(t.id)}
          className={cn("ring-inset-focus relative inline-flex items-center gap-2 whitespace-nowrap text-body font-medium transition-colors duration-100 hover:text-primary", value === t.id ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-round after:bg-action-primary" : "text-secondary")}>
          {t.label}{t.count != null && <span className="tnum rounded-round bg-surface-sunken px-1.5 text-caption font-medium text-secondary">{t.count}</span>}</button>))}
    </div>);
}
