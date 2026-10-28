"use client";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn";

export const SearchTrigger = ({ label = "Search", onClick, className }: { label?: string; onClick?: () => void; className?: string }) => (
  <button type="button" onClick={onClick} className={cn("flex h-9 w-full items-center gap-2 rounded-control border border-action-secondary-border bg-surface-sunken px-3 text-body text-tertiary hover:border-strong", className)}><Search className="size-4" aria-hidden /><span className="flex-1 text-start">{label}</span><kbd className="rounded-tag border border-subtle bg-surface-raised px-1 font-mono text-[11px]">⌘K</kbd></button>);
