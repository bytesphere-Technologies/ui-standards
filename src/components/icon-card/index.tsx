"use client";
import { type LucideIcon, ArrowUpRight } from "lucide-react";
import { SurfaceCard } from "../surface-card";

export function IconCard({ icon: I, title, body, svg = true, href }: { icon: LucideIcon; title: string; body: string; svg?: boolean; href?: string }) {
  return (
    <SurfaceCard interactive={!!href} as={href ? "a" : "div"} className="flex flex-col gap-3" {...(href ? { href } : {})}>
      {svg ? <span className="grid size-10 place-items-center rounded-control bg-selected text-link"><I className="size-5" aria-hidden /></span> : <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">Feature</span>}
      <div><h3 className="text-h4 font-semibold">{title}</h3><p className="mt-1 text-body text-secondary">{body}</p></div>{href && <ArrowUpRight className="absolute end-4 top-4 size-4 text-tertiary" aria-hidden />}
    </SurfaceCard>);
}
