"use client";
import { cn } from "../../lib/cn";

export function Segmented({ items, value, onChange, label, size = "md" }: { items: string[]; value: string; onChange: (v: string) => void; label: string; size?: "sm" | "md" }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("inline-flex min-w-0 max-w-full overflow-x-auto [scrollbar-width:none] rounded-control bg-surface-sunken p-0.5 ring-1 ring-inset ring-[var(--color-subtle)]", size === "sm" ? "h-7 max-sm:h-10" : "h-8 max-sm:h-11")}>
      {items.map((v) => (
        <button key={v} role="radio" data-seg aria-checked={value === v} onClick={() => onChange(v)}
          className={cn("rounded-[var(--corner-inner)] px-3 text-body-sm font-medium transition-colors duration-100 max-sm:px-4", value === v ? "bg-surface-raised text-primary shadow-[0_0_0_1px_var(--color-subtle),0_1px_2px_rgb(16_24_32/.06)]" : "text-secondary hover:text-primary")}>{v}</button>))}
    </div>);
}
