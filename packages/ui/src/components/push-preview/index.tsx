"use client";
import { Smartphone } from "lucide-react";

/** Lock-screen style push preview. Max 40 chars title, 90 body. */
export function PushPreview({ title, body, app = "ByteSphere", time = "now" }: { title: string; body: string; app?: string; time?: string }) {
  return <div className="w-full max-w-sm rounded-[22px] border border-subtle bg-surface-raised/90 p-3 shadow-dropdown backdrop-blur"><div className="flex items-center gap-2 text-caption text-tertiary"><span className="grid size-5 place-items-center rounded-[6px] bg-action-primary text-action-primary-fg"><Smartphone className="size-3" aria-hidden /></span><span className="font-medium uppercase tracking-wide">{app}</span><span className="ms-auto">{time}</span></div><p className="mt-1.5 text-body font-semibold leading-5">{title}</p><p className="text-body-sm text-secondary">{body}</p></div>;
}
