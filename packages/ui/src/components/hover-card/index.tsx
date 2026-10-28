"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component HoverCard @category overlays @use-when a name or link needs a richer preview than a tooltip. Opens on hover and focus after 300 ms. */
export function HoverCard({ trigger, children, width = "w-72" }: { trigger: React.ReactNode; children: React.ReactNode; width?: string }) {
  const [open, setOpen] = React.useState(false); const t = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = () => { clearTimeout(t.current); t.current = setTimeout(() => setOpen(true), 300); }; const hide = () => { clearTimeout(t.current); t.current = setTimeout(() => setOpen(false), 120); };
  return <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}><span tabIndex={0} className="cursor-pointer rounded-tag font-medium text-link underline decoration-dotted underline-offset-4">{trigger}</span>{open && <span role="tooltip" className={cn("m-pop absolute start-0 top-full z-40 mt-2 block rounded-card border border-subtle bg-surface-overlay p-4 text-body text-primary shadow-dropdown", width)}>{children}</span>}</span>;
}
