"use client";
import { type LucideIcon, ChevronRight, Users, Settings, CircleHelp, SunMoon, MessageSquarePlus, LogOut } from "lucide-react";
import { Avatar } from "../avatar";

export function AccountPanel({ name, role, onCustomize }: { name: string; role: string; onCustomize?: () => void }) {
  const row = (I: LucideIcon, l: string, onClick?: () => void) => <li key={l}><button type="button" onClick={onClick} className="flex h-12 w-full items-center gap-3 rounded-control px-2 text-start text-body font-medium hover:bg-action-ghost-hover"><span className="grid size-9 place-items-center rounded-round bg-surface-sunken"><I className="size-[18px]" aria-hidden /></span><span className="flex-1">{l}</span><ChevronRight className="size-4 text-tertiary" aria-hidden /></button></li>;
  return (
    <div><div className="rounded-card border border-subtle bg-surface-raised p-2 shadow-raised"><a href="#/settings/profile" className="flex items-center gap-3 rounded-control p-2 hover:bg-action-ghost-hover"><Avatar id="u1" name={name} size={40} /><span><span className="block text-body font-semibold">{name}</span><span className="block text-body-sm text-secondary">{role}</span></span></a><div className="mx-2 my-1 h-px bg-[var(--color-subtle)]" /><a href="#/settings/workspace" className="flex h-10 items-center gap-3 rounded-control px-2 text-body font-medium text-link hover:bg-action-ghost-hover"><Users className="size-[18px]" />See all workspaces</a></div>
      <ul className="mt-2">{row(Settings, "Settings and privacy")}{row(CircleHelp, "Help and support")}{row(SunMoon, "Display and accessibility", onCustomize)}{row(MessageSquarePlus, "Give feedback")}<li><a href="#/sign-in" className="flex h-12 items-center gap-3 rounded-control px-2 text-body font-medium hover:bg-action-ghost-hover"><span className="grid size-9 place-items-center rounded-round bg-surface-sunken"><LogOut className="size-[18px]" aria-hidden /></span>Log out</a></li></ul></div>);
}
