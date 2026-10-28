"use client";
import * as React from "react";
import { Skeleton } from "../skeleton";

/** @component InfiniteList @category data @use-when long feeds. Loads the next page when the sentinel is visible, shows skeleton rows, ends with a clear last item. */
export function InfiniteList({ total = 40, page = 8, render }: { total?: number; page?: number; render: (i: number) => React.ReactNode }) {
  const [n, setN] = React.useState(page); const [busy, setBusy] = React.useState(false); const end = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { const el = end.current; if (!el || n >= total) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !busy) { setBusy(true); setTimeout(() => { setN((x) => Math.min(total, x + page)); setBusy(false); }, 700); } }, { rootMargin: "80px" }); io.observe(el); return () => io.disconnect(); }, [n, busy, total, page]);
  return <div tabIndex={0} aria-label="Feed" className="h-64 overflow-y-auto rounded-card border border-subtle bg-surface-raised"><ul className="divide-y divide-[var(--color-subtle)]">{Array.from({ length: n }, (_, i) => <li key={i} className="px-4 py-3">{render(i)}</li>)}{busy && [0, 1].map((i) => <li key={`s${i}`} className="px-4 py-3"><Skeleton className="h-4 w-2/3" /><Skeleton className="mt-2 h-3 w-1/3" /></li>)}</ul><div ref={end} className="py-3 text-center text-body-sm text-tertiary">{n >= total ? `All ${total} loaded` : ""}</div></div>;
}
