"use client";
import { Star } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component RatingInput @category forms @use-when asking for 1 to 5 stars. Hover previews, arrow keys change, same star clears. */
export function RatingInput({ value, onChange, label = "Rating" }: { value: number; onChange: (n: number) => void; label?: string }) {
  const [hover, setHover] = React.useState(0); const shown = hover || value;
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex gap-0.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onMouseEnter={() => setHover(n)} onClick={() => onChange(value === n ? 0 : n)}
        onKeyDown={(e) => { if (e.key === "ArrowRight" || e.key === "ArrowUp") onChange(Math.min(5, value + 1)); if (e.key === "ArrowLeft" || e.key === "ArrowDown") onChange(Math.max(0, value - 1)); }} className="press grid size-10 place-items-center rounded-control">
        <Star className={cn("size-7 transition-[transform,color,fill] duration-150", n <= shown ? "scale-110 fill-[var(--color-status-warning-fg)] text-[var(--color-status-warning-fg)]" : "text-[var(--color-strong)]")} aria-hidden /></button>)}
    </div>);
}
