"use client";
import * as React from "react";

/** @component VirtualList @category data @use-when thousands of rows. Renders only the visible window (about 12 DOM rows for 10,000 items). */
export function VirtualList({ count = 10000, rowH = 44, render }: { count?: number; rowH?: number; render: (i: number) => React.ReactNode }) {
  const [top, setTop] = React.useState(0); const H = 256; const first = Math.max(0, Math.floor(top / rowH) - 3); const last = Math.min(count, Math.ceil((top + H) / rowH) + 3);
  return <div><div role="list" aria-label={`${count} rows`} tabIndex={0} onScroll={(e) => setTop(e.currentTarget.scrollTop)} className="relative overflow-y-auto rounded-card border border-subtle bg-surface-raised" style={{ height: H }}><div style={{ height: count * rowH, position: "relative" }}>{Array.from({ length: last - first }, (_, k) => { const i = first + k; return <div key={i} role="listitem" aria-setsize={count} aria-posinset={i + 1} className="absolute inset-x-0 flex items-center border-b border-subtle px-4" style={{ top: i * rowH, height: rowH }}>{render(i)}</div>; })}</div></div><p className="tnum mt-1.5 text-body-sm text-secondary">{count.toLocaleString("en-US")} rows, {last - first} in the DOM</p></div>;
}
