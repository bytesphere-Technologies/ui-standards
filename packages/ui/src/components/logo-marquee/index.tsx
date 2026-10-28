"use client";
import * as React from "react";

/** @component LogoMarquee @category layout @use-when a slow loop of customer names or logos. Pauses on hover, stops under reduced motion. */
export function LogoMarquee({ items }: { items: React.ReactNode[] }) {
  const row = [...items, ...items];
  return <div className="m-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="Customers"><div className="m-marquee flex w-max gap-12 py-2">{row.map((x, i) => <span key={i} aria-hidden={i >= items.length} className="whitespace-nowrap text-h4 font-semibold text-tertiary">{x}</span>)}</div></div>;
}
