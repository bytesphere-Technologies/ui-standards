"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Backdrop ───────── */
export type BackdropVariant = "solid" | "tint" | "navy" | "ink" | "brand" | "grid" | "dots" | "lines" | "rings" | "waves" | "stripes" | "checks";

/** Fills its positioned parent. SVG patterns use currentColor so they follow the surface; stripes and checks are pure CSS (no SVG). */
export function Backdrop({ variant, subtle, className }: { variant: BackdropVariant; subtle?: boolean; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  const solid: Record<string, string> = { solid: "bg-surface-raised", tint: "bg-selected", navy: "bg-action-accent", ink: "bg-[#000913]", brand: "bg-action-primary" };
  const onDark = variant === "navy" || variant === "ink" || variant === "brand";
  const op = subtle ? 0.08 : 0.16;
  const svgPat = () => {
    const c = { color: onDark ? "#fff" : "var(--color-mark-b)", opacity: op } as React.CSSProperties;
    if (variant === "grid") return <svg className="absolute inset-0 size-full" style={c} aria-hidden><defs><pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`} /></svg>;
    if (variant === "dots") return <svg className="absolute inset-0 size-full" style={c} aria-hidden><defs><pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="currentColor" /></pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`} /></svg>;
    if (variant === "lines") return <svg className="absolute inset-0 size-full" style={c} aria-hidden><defs><pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V14" stroke="currentColor" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`} /></svg>;
    if (variant === "rings") return <svg className="absolute -end-10 -top-10 size-72" style={c} viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden>{[90, 70, 50, 30].map((r) => <circle key={r} cx="100" cy="100" r={r} strokeWidth="1.2" />)}</svg>;
    if (variant === "waves") return <svg className="absolute inset-x-0 bottom-0 w-full" style={c} viewBox="0 0 400 120" preserveAspectRatio="none" fill="none" stroke="currentColor" aria-hidden>{[0, 1, 2, 3].map((i) => <path key={i} d={`M0 ${50 + i * 16} C 80 ${20 + i * 16}, 140 ${90 + i * 16}, 220 ${50 + i * 16} S 360 ${20 + i * 16}, 400 ${55 + i * 16}`} strokeWidth="1.2" />)}</svg>;
    return null;
  };
  const css: React.CSSProperties | undefined = variant === "stripes" ? { backgroundImage: "repeating-linear-gradient(135deg, var(--color-subtle) 0 1px, transparent 1px 12px)" } : variant === "checks" ? { backgroundImage: "linear-gradient(45deg, var(--color-subtle) 25%, transparent 25%, transparent 75%, var(--color-subtle) 75%), linear-gradient(45deg, var(--color-subtle) 25%, transparent 25%, transparent 75%, var(--color-subtle) 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px", opacity: 0.5 } : undefined;
  return <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", solid[variant], className)} style={css}>{svgPat()}</div>;
}
