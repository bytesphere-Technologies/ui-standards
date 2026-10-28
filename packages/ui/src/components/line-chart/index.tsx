"use client";
import * as React from "react";

/* ───────── Charts (SVG, token colors) ───────── */
export function LineChart({ series, labels, height = 240, yMax, yMin = 0, unit = "" }: { series: { name: string; data: number[]; color: string; dashed?: boolean }[]; labels: string[]; height?: number; yMax: number; yMin?: number; unit?: string }) {
  const W = 640, H = height, pl = 44, pb = 26, pt = 10, n = labels.length;
  const x = (i: number) => pl + (i / (n - 1)) * (W - pl - 10), y = (v: number) => pt + (1 - (v - yMin) / (yMax - yMin)) * (H - pt - pb);
  const ticks = [0, 1, 2, 3, 4].map((i) => yMin + ((yMax - yMin) * i) / 4);
  const line = (d: number[]) => d.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("");
  const [hover, setHover] = React.useState<number | null>(null);
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Line chart: ${series.map((s) => s.name).join(", ")}`} className="w-full" style={{ height }} onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * W; setHover(Math.max(0, Math.min(n - 1, Math.round(((px - pl) / (W - pl - 10)) * (n - 1))))); }}>
        {ticks.map((t) => (<g key={t}><line x1={pl} x2={W - 10} y1={y(t)} y2={y(t)} stroke="var(--color-subtle)" /><text x={pl - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--color-tertiary)" className="tnum">{Math.round(t)}{unit}</text></g>))}
        {labels.map((l, i) => (i === n - 1 || (i % Math.ceil(n / 6) === 0 && n - 1 - i >= Math.ceil(n / 6))) && <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--color-tertiary)">{l}</text>)}
        {series.map((s, si) => (<g key={s.name}>{si === 0 && <path d={`${line(s.data)}L${x(n - 1)},${y(yMin)}L${x(0)},${y(yMin)}Z`} fill={s.color} opacity=".08" />}<path d={line(s.data)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeDasharray={s.dashed ? "5 4" : undefined} /></g>))}
        {hover != null && <g><line x1={x(hover)} x2={x(hover)} y1={pt} y2={H - pb} stroke="var(--color-strong)" />{series.map((s) => <circle key={s.name} cx={x(hover)} cy={y(s.data[hover])} r="4" fill="var(--color-surface-raised)" stroke={s.color} strokeWidth="2" />)}</g>}
      </svg>
      {hover != null && <div className="pointer-events-none absolute top-1 rounded-card border border-subtle bg-surface-overlay px-3 py-2 text-body-sm shadow-dropdown" style={{ left: `clamp(8px, ${(x(hover) / W) * 100}%, calc(100% - 150px))` }}>
        <p className="font-medium text-primary">{labels[hover]}</p>{series.map((s) => <p key={s.name} className="tnum flex items-center gap-2 text-secondary"><span className="size-2 rounded-round" style={{ background: s.color }} />{s.name} <b className="ms-auto font-medium text-primary">{s.data[hover]}{unit}</b></p>)}</div>}
    </div>);
}
