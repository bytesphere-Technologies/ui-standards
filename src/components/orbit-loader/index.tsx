"use client";
import { BrandMark } from "../brand-mark";

/** L3b · Orbit: the halves circle each other. Branded, calm; for empty-panel and onboarding waits. */
export const OrbitLoader = ({ size = 40, label }: { size?: number; label?: string }) => (
  <span role="status" className="inline-flex items-center gap-3 text-secondary"><BrandMark size={size} animate="orbit" />{label ? <span className="text-body">{label}</span> : <span className="sr-only">Loading</span>}</span>
);
