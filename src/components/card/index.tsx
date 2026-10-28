"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Card ───────── */
export function Card({ children, className, interactive, flush }: { children: React.ReactNode; className?: string; interactive?: boolean; flush?: boolean }) {
  return <div className={cn("relative rounded-card border border-subtle bg-surface-raised", !flush && "p-(--card-pad)", interactive && "transition-[box-shadow,border-color] duration-150 hover:border-strong hover:shadow-raised focus-within:ring-2 focus-within:ring-focus", className)}>{children}</div>;
}
