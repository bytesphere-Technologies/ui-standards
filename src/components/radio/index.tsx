"use client";

export function Radio({ name, value, label, hint, checked, onChange }: { name: string; value: string; label: string; hint?: string; checked: boolean; onChange: (v: string) => void }) {
  return (
    <label className="flex items-start gap-2.5 text-body text-primary">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="mt-0.5 size-4 shrink-0 appearance-none rounded-round border border-control bg-input transition-colors hover:border-secondary checked:border-[5px] checked:border-action-primary" />
      <span>{label}{hint && <span className="block text-body-sm text-secondary">{hint}</span>}</span>
    </label>);
}
