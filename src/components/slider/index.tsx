"use client";

export function Slider({ id, label, value, min = 0, max = 100, onChange, unit }: { id: string; label: string; value: number; min?: number; max?: number; onChange: (v: number) => void; unit?: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2"><div className="flex justify-between text-body"><label htmlFor={id} className="font-medium">{label}</label><span className="tnum text-secondary">{value}{unit}</span></div>
      <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} className="h-1.5 w-full cursor-default appearance-none rounded-round accent-[var(--color-action-primary)]" style={{ background: `linear-gradient(to right, var(--color-action-primary) ${pct}%, var(--color-surface-sunken) ${pct}%)` }} /></div>);
}
