"use client";
import { cn } from "../../lib/cn";

/* ───────── Avatar ───────── */
const avCls = ["bg-avatar-1-bg text-avatar-1-fg", "bg-avatar-2-bg text-avatar-2-fg", "bg-avatar-3-bg text-avatar-3-fg", "bg-avatar-4-bg text-avatar-4-fg", "bg-avatar-5-bg text-avatar-5-fg", "bg-avatar-6-bg text-avatar-6-fg"];

const fnv = (id: string) => { let h = 0x811c9dc5; for (const c of id) { h ^= c.charCodeAt(0); h = Math.imul(h, 0x01000193); } return (h >>> 0) % 6; };

const avSize = { 20: "size-5 text-[9px]", 24: "size-6 text-[10px]", 32: "size-8 text-caption", 40: "size-10 text-body", 64: "size-16 text-h3", 96: "size-24 text-h2" } as const;

export function Avatar({ id, name, size = 32, presence, square }: { id: string; name: string; size?: keyof typeof avSize; presence?: "online" | "away" | "busy" | "offline"; square?: boolean }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  return (
    <span role="img" aria-label={presence ? `${name}, ${presence}` : name} className={cn("relative inline-flex shrink-0 select-none items-center justify-center font-semibold", square ? "rounded-control" : "rounded-round", avSize[size], avCls[fnv(id)])}>
      <span aria-hidden data-i={initials} className="before:content-[attr(data-i)]" />
      {presence && <span aria-hidden className={cn("absolute bottom-0 end-0 size-2.5 rounded-round ring-2 ring-surface-raised", presence === "online" && "bg-status-success-dot", presence === "away" && "bg-status-warning-dot", presence === "busy" && "bg-status-danger-dot", presence === "offline" && "bg-surface ring-control")} />}
    </span>);
}
