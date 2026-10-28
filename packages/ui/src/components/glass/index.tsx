"use client";
import * as React from "react";
import { Backdrop } from "../backdrop";
import { cn } from "../../lib/cn";

/** Glass over a backdrop. `over` renders the backdrop for you so contrast is always verifiable. */
export function Glass({ children, over = "brand", className }: { children: React.ReactNode; over?: "brand" | "navy" | "pattern"; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-modal p-6", className)}>
      {over === "pattern" ? <><Backdrop variant="navy" /><Backdrop variant="rings" /></> : <Backdrop variant={over === "navy" ? "navy" : "brand"} />}
      <div className="relative rounded-card border border-white/30 bg-white/70 p-5 text-[#000913] backdrop-blur-md dark:bg-black/50 dark:text-white">{children}</div>
    </div>);
}
