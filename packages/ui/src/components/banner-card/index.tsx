"use client";
import { ArrowRight } from "lucide-react";
import { Backdrop } from "../backdrop";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { SurfaceCard } from "../surface-card";

export function BannerCard({ title, body, cta, tone = "tinted" }: { title: string; body: string; cta: string; tone?: "tinted" | "brand" | "ink" }) {
  return (
    <SurfaceCard variant={tone} pad="none" className="relative overflow-hidden">
      <Backdrop variant={tone === "tinted" ? "rings" : "rings"} subtle />
      <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-md"><h3 className="text-h3 font-semibold">{title}</h3><p className={cn("mt-1 text-body", tone === "tinted" ? "text-secondary" : "opacity-90")}>{body}</p></div><Button variant={tone === "tinted" ? "primary" : "secondary"} className="shrink-0">{cta}<ArrowRight /></Button></div>
    </SurfaceCard>);
}
