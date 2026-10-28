"use client";

export function ProgressStacked({ parts, total, label }: { parts: { label: string; value: number; color: string }[]; total: number; label: string }) {
  return <div><div role="img" aria-label={`${label}: ${parts.map((p) => `${p.label} ${p.value}`).join(", ")}`} className="flex h-3 gap-0.5 overflow-hidden rounded-round bg-surface-sunken">{parts.map((p) => <span key={p.label} style={{ width: `${(p.value / total) * 100}%`, background: p.color }} />)}</div>
    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-body-sm">{parts.map((p) => <li key={p.label} className="flex items-center gap-1.5"><span className="size-2 rounded-tag" style={{ background: p.color }} /><span className="text-secondary">{p.label}</span><span className="tnum font-medium">{p.value}</span></li>)}</ul></div>;
}
