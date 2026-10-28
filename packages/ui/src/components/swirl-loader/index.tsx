"use client";
import { BrandMark } from "../brand-mark";

/* ───────── Brand loaders ───────── */
/** L1 · Swirl: the default content/route loader. One full turn per 1.6s with an ease-in-out and a short rest. */
export const SwirlLoader = ({ size = 40, label }: { size?: number; label?: string }) => (
  <span role="status" className="inline-flex items-center gap-3 text-secondary"><BrandMark size={size} animate="swirl" />{label && <span className="text-body">{label}</span>}{!label && <span className="sr-only">Loading</span>}</span>
);
