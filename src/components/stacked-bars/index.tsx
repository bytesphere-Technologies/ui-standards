"use client";

export function StackedBars({ data, labels, series, height = 140 }: { data: number[][]; labels: string[]; series: { name: string; color: string }[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.reduce((a, b) => a + b, 0)));
  return <div><div className="flex items-end gap-3" style={{ height: height + 22 }} role="img" aria-label="Stacked bars">{data.map((d, i) => <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5"><div className="flex w-full flex-1 flex-col-reverse gap-px overflow-hidden rounded-t-tag">{d.map((v, si) => <div key={si} style={{ height: `${(v / max) * 100}%`, background: series[si].color }} />)}</div><span className="text-caption text-tertiary">{labels[i]}</span></div>)}</div><ul className="mt-2 flex gap-4 text-body-sm">{series.map((s) => <li key={s.name} className="flex items-center gap-1.5"><span className="size-2 rounded-tag" style={{ background: s.color }} />{s.name}</li>)}</ul></div>;
}
