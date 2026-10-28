"use client";
import { cn } from "../../lib/cn";

export function Switch({ id, label, hint, checked, onChange, hideLabel }: { id: string; label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void; hideLabel?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-6">
      {!hideLabel && <label htmlFor={id} className="text-body text-primary">{label}{hint && <span className="block text-body-sm text-secondary">{hint}</span>}</label>}
      <button id={id} role="switch" aria-checked={checked} aria-label={hideLabel ? label : undefined} type="button" onClick={() => onChange(!checked)} className={cn("relative mt-0.5 h-5 w-9 shrink-0 rounded-round transition-colors duration-150 after:absolute after:-inset-3 after:content-['']", checked ? "bg-action-primary" : "bg-control")}>
        <span className={cn("absolute top-0.5 size-4 rounded-round bg-white shadow-[0_1px_2px_rgb(0_0_0/.25)] transition-all duration-150", checked ? "start-[1.125rem]" : "start-0.5")} />
      </button>
    </div>
  );
}
