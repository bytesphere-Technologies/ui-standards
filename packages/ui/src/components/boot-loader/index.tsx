"use client";
import * as React from "react";
import { BrandMark } from "../brand-mark";
import { cn } from "../../lib/cn";

/** L6 · Boot: full-area loader with the stacked logo; the label appears only after 1s. */
export function BootLoader({ text = "Preparing your workspace" }: { text?: string }) {
  const [late, setLate] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setLate(true), 1000); return () => clearTimeout(t); }, []);
  return (
    <div role="status" className="grid min-h-80 place-items-center"><div className="flex flex-col items-center gap-5"><BrandMark size={56} animate="swirl" /><p className={cn("text-body text-secondary transition-opacity duration-200", late ? "opacity-100" : "opacity-0")}>{text}…</p></div></div>);
}
