"use client";
import { Barcode, XCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import { Scan } from "../scanner-panel";
import { StatusPill } from "../status-pill";

export function ScanFeed({ scans }: { scans: Scan[] }) {
  return <ul className="divide-y divide-[var(--color-subtle)]" aria-live="polite" aria-label="Recent scans">{scans.map((s) => <li key={s.id} className={cn("flex items-center gap-3 px-4 py-2.5", s.fresh && "m-flash")}><span className={cn("grid size-8 shrink-0 place-items-center rounded-control", s.ok ? "bg-status-success-bg text-status-success-fg" : "bg-status-danger-bg text-status-danger-fg")}>{s.ok ? <Barcode className="size-4" aria-hidden /> : <XCircle className="size-4" aria-hidden />}</span><div className="min-w-0 flex-1"><p className="truncate text-body font-medium">{s.label}</p><p className="font-mono text-caption text-tertiary">{s.code} · {s.zone}</p></div><div className="text-end"><StatusPill tone={s.ok ? "success" : "danger"} size="sm">{s.ok ? "Matched" : "Exception"}</StatusPill><p className="tnum mt-0.5 text-caption text-tertiary">{s.at}</p></div></li>)}</ul>;
}
