"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * SURFACES KIT
 * @category surfaces
 * SurfaceCard    8 surface styles: flat · outlined · raised · tinted · brand · ink · glass (overlay only) · dashed
 * Glass          the one place blur and transparency are allowed; guardrails below
 * MediaCard / BannerCard / PortraitCard / HeaderStripCard / IconCard / ActionCard / ListCard / ProfileCard   rectangle layouts
 * Backdrop       background layers: solid · tint · navy · ink · grid · dots · lines · rings · waves (SVG) and stripes · checks (CSS, no SVG)
 * SiteFooter     6 footer styles
 *
 * GLASS RULE: blur and transparency are allowed only (1) on sticky bars over scrolling content, (2) on cards laid over a media or brand backdrop,
 * (3) on modal scrims (flat, no blur). Never on data cards, tables, forms or anything the user reads for long. Text on glass must hold 4.5:1
 * against the worst backdrop it can sit on; use `Glass` with its default 70% opacity, never lower than 55%.
 */
export type SurfaceVariant = "flat" | "outlined" | "raised" | "tinted" | "brand" | "ink" | "glass" | "dashed";

const surf: Record<SurfaceVariant, string> = {
  flat: "bg-surface-raised",
  outlined: "bg-surface-raised border border-subtle",
  raised: "bg-surface-raised border border-subtle shadow-raised",
  tinted: "bg-selected border border-transparent",
  brand: "bg-action-accent text-action-accent-fg border border-transparent",
  ink: "bg-[#000913] text-white border border-white/10",
  glass: "bg-surface-raised/70 backdrop-blur-md border border-white/30 text-primary",
  dashed: "bg-transparent border border-dashed border-control",
};

export function SurfaceCard({ variant = "outlined", pad = "md", interactive, className, children, as: As = "div", href }: { variant?: SurfaceVariant; pad?: "none" | "sm" | "md" | "lg"; interactive?: boolean; className?: string; children: React.ReactNode; as?: React.ElementType; href?: string }) {
  return <As href={href} className={cn("relative rounded-card", surf[variant], { none: "", sm: "p-3", md: "p-5", lg: "p-7" }[pad], interactive && "transition-[border-color,box-shadow,transform] duration-150 hover:border-strong hover:shadow-raised", className)}>{children}</As>;
}
