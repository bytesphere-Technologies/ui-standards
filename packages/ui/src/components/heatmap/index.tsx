"use client";
import * as React from "react";

/* ───────── Chart extras ───────── */
export function Heatmap({ rows, cols, data, label }: { rows: string[]; cols: string[]; data: number[][]; label: string }) {
  const max = Math.max(...data.flat());
  return (
    <div role="group" aria-label={label} className="text-caption"><div className="grid gap-1" style={{ gridTemplateColumns: `3rem repeat(${cols.length}, 1fr)` }}><span />{cols.map((c) => <span key={c} className="text-center text-tertiary">{c}</span>)}
      {rows.map((r, ri) => <React.Fragment key={r}><span className="self-center text-tertiary">{r}</span>{data[ri].map((v, ci) => <div key={ci} title={`${r} ${cols[ci]}: ${v}`} className="tnum grid aspect-[5/3] place-items-center rounded-tag text-[10px] font-medium" style={{ background: `color-mix(in srgb, var(--color-action-primary) ${Math.round((v / max) * 85) + 6}%, var(--color-surface-sunken))`, color: v / max > 0.55 ? "var(--color-action-primary-fg)" : "var(--color-secondary)" }}>{v}</div>)}</React.Fragment>)}</div></div>);
}
