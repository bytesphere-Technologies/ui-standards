"use client";
import { Avatar } from "../avatar";
import { cn } from "../../lib/cn";

export function AvatarGroup({ people, max = 4, size = 32 }: { people: { id: string; name: string }[]; max?: number; size?: 24 | 32 }) {
  const shown = people.slice(0, max); const rest = people.length - shown.length;
  return (
    <div role="group" aria-label={`${people.length} people`} className="flex -space-x-2">
      {shown.map((u) => <span key={u.id} className="rounded-round ring-2 ring-surface-raised"><Avatar id={u.id} name={u.name} size={size as 24 | 32} /></span>)}
      {rest > 0 && <span className={cn("tnum inline-flex items-center justify-center rounded-round bg-surface-sunken text-caption font-semibold text-secondary ring-2 ring-surface-raised", size === 24 ? "size-6" : "size-8")}>+{rest}</span>}
    </div>);
}
