"use client";
import { Minus, Check } from "lucide-react";

export function Checkbox({ id, label, checked, onChange, indeterminate, hint, hideLabel }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void; indeterminate?: boolean; hint?: string; hideLabel?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="relative mt-0.5 inline-flex size-4 shrink-0">
        <input id={id} type="checkbox" checked={checked} ref={(el) => { if (el) el.indeterminate = !!indeterminate; }} onChange={(e) => onChange(e.target.checked)} aria-label={hideLabel || !label ? label || "Select" : undefined}
          className="peer size-4 appearance-none rounded-tag border border-control bg-input transition-colors duration-100 hover:border-secondary checked:border-transparent checked:bg-action-primary" style={indeterminate ? { background: "var(--color-action-primary)", borderColor: "transparent" } : undefined} />
        {indeterminate ? <Minus className="pointer-events-none absolute inset-0 size-4 p-0.5 text-action-primary-fg" strokeWidth={3} aria-hidden /> : <Check className="pointer-events-none absolute inset-0 hidden size-4 p-0.5 text-action-primary-fg peer-checked:block" strokeWidth={3} aria-hidden />}
      </span>
      {label && !hideLabel && <label htmlFor={id} className="text-body text-primary">{label}{hint && <span className="block text-body-sm text-secondary">{hint}</span>}</label>}
    </div>
  );
}
