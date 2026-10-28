"use client";
import { Flame } from "lucide-react";

export function StreakBadge({ days }: { days: number }) { return <span className="inline-flex items-center gap-1.5 rounded-round border border-status-warning-border bg-status-warning-bg px-3 py-1 text-body-sm font-semibold text-status-warning-fg"><Flame className="size-4" aria-hidden /><span className="tnum">{days}</span>-day streak</span>; }
