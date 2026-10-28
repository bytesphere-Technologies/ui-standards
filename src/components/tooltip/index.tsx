"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Tooltip ───────── */
export function Tooltip({ text, children, side = "bottom" }: { text: string; children: React.ReactElement<Record<string, unknown>>; side?: "top" | "bottom" }) {
  const [open, setOpen] = React.useState(false); const t = React.useRef<number>(0); const id = React.useId();
  const show = (d: number) => { clearTimeout(t.current); t.current = window.setTimeout(() => setOpen(true), d); };
  const hide = () => { clearTimeout(t.current); setOpen(false); };
  return (
    <span className="relative inline-flex" onMouseEnter={() => show(500)} onMouseLeave={hide} onFocus={() => show(0)} onBlur={hide} onKeyDown={(e) => e.key === "Escape" && hide()}>
      {React.cloneElement(children, { "aria-describedby": id })}
      {open && <span id={id} role="tooltip" className={cn("m-fade pointer-events-none absolute start-1/2 z-60 w-max max-w-60 -translate-x-1/2 rounded-tag bg-[var(--color-primary)] px-2 py-1 text-caption font-medium text-inverse", side === "bottom" ? "top-full mt-2" : "bottom-full mb-2")}>{text}</span>}
    </span>);
}
