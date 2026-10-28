"use client";
import { Star } from "lucide-react";

export function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  return <span className="inline-flex items-center gap-1.5 text-body-sm" role="img" aria-label={`Rated ${value} out of 5${count ? `, ${count} reviews` : ""}`}><span className="flex" aria-hidden>{[1, 2, 3, 4, 5].map((i) => <Star key={i} style={{ width: size, height: size }} className={i <= Math.round(value) ? "fill-[var(--color-status-warning-solid)] text-status-warning-solid" : "text-control"} strokeWidth={1.5} />)}</span>{count != null && <span className="tnum text-secondary">{value.toFixed(1)} <span className="text-tertiary">({count})</span></span>}</span>;
}
