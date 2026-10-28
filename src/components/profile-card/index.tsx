"use client";
import { Avatar } from "../avatar";
import { Backdrop } from "../backdrop";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { SurfaceCard } from "../surface-card";

export function ProfileCard({ id, name, role, stats, cover = "navy" }: { id: string; name: string; role: string; stats: [string, string][]; cover?: "navy" | "azure" | "tint" }) {
  return (
    <SurfaceCard pad="none" className="overflow-hidden"><div className={cn("relative h-20", cover === "navy" ? "bg-action-accent" : cover === "azure" ? "bg-action-primary" : "bg-selected")}><Backdrop variant="rings" subtle /></div>
      <div className="px-5 pb-5"><div className="-mt-8 flex items-end justify-between"><span className="rounded-round ring-4 ring-[var(--color-surface-raised)]"><Avatar id={id} name={name} size={64} /></span><Button size="sm">Message</Button></div>
        <h3 className="mt-3 text-h4 font-semibold">{name}</h3><p className="text-body-sm text-secondary">{role}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-subtle pt-4 text-center">{stats.map(([k, v]) => <div key={k}><dd className="tnum text-h4 font-semibold">{v}</dd><dt className="text-caption text-secondary">{k}</dt></div>)}</dl></div></SurfaceCard>);
}
