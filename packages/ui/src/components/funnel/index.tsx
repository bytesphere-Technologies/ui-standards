"use client";

export function Funnel({ stages }: { stages: { label: string; value: number }[] }) {
  const top = stages[0].value;
  return <ol className="flex flex-col gap-1.5">{stages.map((s, i) => <li key={s.label} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 text-body"><span className="text-secondary">{s.label}</span><span className="h-7 overflow-hidden rounded-tag bg-surface-sunken"><span className="block h-full rounded-tag bg-action-primary" style={{ width: `${(s.value / top) * 100}%`, opacity: 1 - i * 0.14 }} /></span><span className="tnum w-24 text-end"><b className="font-semibold">{s.value.toLocaleString("en-US")}</b> <span className="text-tertiary">{i ? `${Math.round((s.value / stages[i - 1].value) * 100)}%` : ""}</span></span></li>)}</ol>;
}
