"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { TraceLoader } from "../trace-loader";

/* ───────── Skeletons: 12 shapes × 4 animations ───────── */
export type SkAnim = "pulse" | "wave" | "static" | "mark";

export type SkKind = "text" | "avatar" | "card" | "table" | "chart" | "list" | "media" | "form" | "kpi" | "profile" | "product" | "dashboard";

const SkCtx = React.createContext<{ anim: SkAnim; i: React.MutableRefObject<number> }>({ anim: "pulse", i: { current: 0 } });

function B({ className }: { className?: string }) {
  const { anim, i } = React.useContext(SkCtx); const n = i.current++;
  return <div aria-hidden className={cn("rounded-tag bg-surface-sunken", anim === "pulse" && "m-pulse", anim === "wave" && "m-pulse", className)} style={anim === "wave" ? { animationDelay: `${(n % 8) * 110}ms`, animationDuration: "1.4s" } : undefined} />;
}

const shapes: Record<SkKind, () => React.ReactNode> = {
  text: () => <div className="flex flex-col gap-2"><B className="h-3.5 w-full" /><B className="h-3.5 w-11/12" /><B className="h-3.5 w-3/5" /></div>,
  avatar: () => <div className="flex items-center gap-3"><B className="size-10 rounded-round" /><div className="flex-1 space-y-2"><B className="h-3.5 w-1/2" /><B className="h-3 w-3/4" /></div></div>,
  card: () => <div className="flex flex-col gap-3 rounded-card border border-subtle p-4"><B className="h-5 w-2/3" /><B className="h-3.5 w-full" /><B className="h-3.5 w-4/5" /><div className="mt-1 flex gap-2"><B className="h-[22px] w-16" /><B className="h-[22px] w-20" /></div></div>,
  table: () => <div className="rounded-card border border-subtle">{[0, 1, 2, 3, 4].map((r) => <div key={r} className="flex h-10 items-center gap-3 border-b border-subtle px-3 last:border-0"><B className="size-4" /><B className="h-3.5 w-40" /><B className="ms-auto h-[22px] w-16" /><B className="h-3.5 w-14" /></div>)}</div>,
  chart: () => <div className="rounded-card border border-subtle p-4"><B className="h-4 w-32" /><div className="mt-4 flex h-32 items-end gap-2">{[40, 70, 55, 90, 65, 80, 50].map((h, i) => <div key={i} className="flex-1" style={{ height: `${h}%` }}><B className="h-full w-full" /></div>)}</div><div className="mt-2 h-px bg-[var(--color-subtle)]" /></div>,
  list: () => <div className="flex flex-col divide-y divide-[var(--color-subtle)] rounded-card border border-subtle">{[0, 1, 2, 3].map((r) => <div key={r} className="flex items-center gap-3 p-3"><B className="size-8 rounded-round" /><div className="flex-1 space-y-2"><B className="h-3.5 w-1/2" /><B className="h-3 w-1/3" /></div><B className="h-6 w-14" /></div>)}</div>,
  media: () => <div className="overflow-hidden rounded-card border border-subtle"><B className="aspect-[16/9] w-full rounded-none" /><div className="space-y-2 p-4"><B className="h-4 w-3/4" /><B className="h-3.5 w-1/2" /></div></div>,
  form: () => <div className="flex flex-col gap-4">{[0, 1, 2].map((r) => <div key={r} className="space-y-2"><B className="h-3.5 w-24" /><B className="h-9 w-full rounded-control" /></div>)}<B className="h-9 w-28 rounded-control" /></div>,
  kpi: () => <div className="rounded-card border border-subtle p-5"><B className="h-3.5 w-24" /><B className="mt-3 h-8 w-32" /><B className="mt-3 h-3.5 w-40" /></div>,
  profile: () => <div className="rounded-card border border-subtle p-5 text-center"><B className="mx-auto size-16 rounded-round" /><B className="mx-auto mt-3 h-4 w-32" /><B className="mx-auto mt-2 h-3.5 w-24" /><div className="mt-4 grid grid-cols-3 gap-2"><B className="h-10" /><B className="h-10" /><B className="h-10" /></div></div>,
  product: () => <div className="overflow-hidden rounded-card border border-subtle"><B className="aspect-square w-full rounded-none" /><div className="space-y-2 p-3"><B className="h-3.5 w-3/4" /><B className="h-3 w-1/3" /><B className="h-5 w-1/4" /></div></div>,
  dashboard: () => <div className="grid gap-3"><div className="grid grid-cols-3 gap-3">{[0, 1, 2].map((k) => <div key={k} className="rounded-card border border-subtle p-3"><B className="h-3 w-16" /><B className="mt-2 h-6 w-20" /></div>)}</div><div className="rounded-card border border-subtle p-3"><B className="h-24 w-full" /></div></div>,
};

export function SkeletonKit({ kind, anim = "pulse" }: { kind: SkKind; anim?: SkAnim }) {
  const ref = React.useRef(0); ref.current = 0;
  return (
    <SkCtx.Provider value={{ anim, i: ref }}>
      <div role="status" aria-busy="true" className="relative"><span className="sr-only">Loading</span>{shapes[kind]()}{anim === "mark" && <div className="absolute inset-0 grid place-items-center"><span className="rounded-round bg-surface-raised/90 p-2 shadow-raised"><TraceLoader size={22} /></span></div>}</div>
    </SkCtx.Provider>);
}
