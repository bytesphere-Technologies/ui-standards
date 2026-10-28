"use client";
import { SurfaceCard } from "../surface-card";

export function ListCard({ title, rows, action }: { title: string; rows: { label: string; value: string; sub?: string }[]; action?: string }) {
  return (
    <SurfaceCard pad="none"><div className="flex items-center justify-between px-5 py-3.5"><h3 className="text-h4 font-semibold">{title}</h3>{action && <a href="#" className="text-body font-medium text-link hover:underline">{action}</a>}</div>
      <ul>{rows.map((r) => <li key={r.label} className="flex items-center justify-between gap-3 border-t border-subtle px-5 py-3 text-body"><span><span className="block text-primary">{r.label}</span>{r.sub && <span className="block text-body-sm text-tertiary">{r.sub}</span>}</span><span className="tnum font-medium">{r.value}</span></li>)}</ul></SurfaceCard>);
}
