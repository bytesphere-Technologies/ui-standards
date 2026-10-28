"use client";

/** L5 · Route bar: 2px indeterminate bar under the top bar. Only after 300ms. */
export const RouteBar = ({ active }: { active: boolean }) => active ? (
  <div role="progressbar" aria-label="Loading page" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"><div className="m-bar h-full w-2/5 bg-action-primary" /></div>) : null;
