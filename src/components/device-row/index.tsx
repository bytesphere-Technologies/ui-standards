"use client";
import { Wifi, WifiOff, BatteryMedium } from "lucide-react";
import { cn } from "../../lib/cn";

export function DeviceRow({ name, user, battery, online, last }: { name: string; user: string; battery: number; online: boolean; last: string }) {
  return <div className="flex items-center gap-3 px-4 py-2.5"><span className={cn("grid size-8 place-items-center rounded-control bg-surface-sunken", online ? "text-status-success-fg" : "text-tertiary")}>{online ? <Wifi className="size-4" aria-hidden /> : <WifiOff className="size-4" aria-hidden />}</span><div className="min-w-0 flex-1"><p className="truncate text-body font-medium">{name}</p><p className="text-body-sm text-secondary">{user} · {online ? "online" : `seen ${last}`}</p></div><span className={cn("tnum inline-flex items-center gap-1 text-body-sm", battery < 20 ? "font-medium text-status-danger-fg" : "text-secondary")}><BatteryMedium className="size-4" aria-hidden /><span className="sr-only">Battery </span>{battery}%</span></div>;
}
