"use client";
import { BrandMark } from "../brand-mark";

/** L3 · Trace: halves take turns. Smallest footprint, for table headers and inline status (16–24px). */
export const TraceLoader = ({ size = 20 }: { size?: number }) => (
  <span role="status" className="inline-flex"><BrandMark size={size} animate="trace" /><span className="sr-only">Loading</span></span>
);
