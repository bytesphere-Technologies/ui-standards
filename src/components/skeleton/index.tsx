"use client";
import { cn } from "../../lib/cn";

/* ───────── Loading primitives ───────── */
export const Skeleton = ({ className, shimmer = true }: { className?: string; shimmer?: boolean }) => <div aria-hidden className={cn("rounded-tag bg-surface-sunken", shimmer && "m-pulse", className)} />;
