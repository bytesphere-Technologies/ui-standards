"use client";

export function Donut({ parts, size = 120 }: { parts: { label: string; value: number; color: string }[]; size?: number }) {
  const total = parts.reduce((a, p) => a + p.value, 0); let acc = 0; const r = 44, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5"><svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={parts.map((p) => `${p.label} ${p.value}`).join(", ")}><g transform="rotate(-90 60 60)">{parts.map((p) => { const len = (p.value / total) * c; const el = <circle key={p.label} cx="60" cy="60" r={r} fill="none" stroke={p.color} strokeWidth="14" strokeDasharray={`${len - 2} ${c - len + 2}`} strokeDashoffset={-acc} />; acc += len; return el; })}</g>
      <text x="60" y="58" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--color-primary)" className="tnum">{total}</text><text x="60" y="74" textAnchor="middle" fontSize="11" fill="var(--color-tertiary)">total</text></svg>
      <ul className="flex flex-col gap-1.5 text-body">{parts.map((p) => <li key={p.label} className="flex items-center gap-2"><span className="size-2.5 rounded-tag" style={{ background: p.color }} /><span className="text-secondary">{p.label}</span><span className="tnum ms-auto ps-4 font-medium">{p.value}</span></li>)}</ul></div>);
}
