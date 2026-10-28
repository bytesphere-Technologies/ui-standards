"use client";
import * as React from "react";

/* ───────── Timeline / activity ───────── */
export function Timeline({ items }: { items: { who: string; what: React.ReactNode; when: string; icon?: React.ReactNode }[] }) {
  return (
    <ol className="relative flex flex-col gap-5 before:absolute before:inset-y-2 before:start-[11px] before:w-px before:bg-[var(--color-subtle)]">
      {items.map((it, i) => (<li key={i} className="relative flex gap-3"><span className="relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-round border border-subtle bg-surface-raised text-tertiary [&_svg]:size-3.5">{it.icon ?? <span className="size-1.5 rounded-round bg-control" />}</span>
        <div className="min-w-0 text-body"><p className="text-primary"><b className="font-medium">{it.who}</b> <span className="text-secondary">{it.what}</span></p><p className="text-body-sm text-tertiary">{it.when}</p></div></li>))}
    </ol>);
}
