"use client";
import { cn } from "../../lib/cn";

export const RingSpin = ({ size = 32, stroke = 3, className }: { size?: number; stroke?: number; className?: string }) => (
  <svg role="status" aria-label="Loading" width={size} height={size} viewBox="0 0 24 24" className={cn("m-spin text-link", className)} fill="none"><circle cx="12" cy="12" r={12 - stroke} stroke="currentColor" strokeOpacity=".18" strokeWidth={stroke} /><path d={`M12 ${stroke}a${12 - stroke} ${12 - stroke} 0 0 1 ${12 - stroke} ${12 - stroke}`} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" /></svg>);
