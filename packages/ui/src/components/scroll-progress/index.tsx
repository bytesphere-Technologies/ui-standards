"use client";
import * as React from "react";

/** @component ScrollProgress / BackToTop @category navigation @use-when long articles and docs. Thin bar at the top, button after 600 px. */
export function ScrollProgress() { const [p, setP] = React.useState(0); React.useEffect(() => { const f = () => { const h = document.documentElement; setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)); }; f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []); return <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-action-primary" style={{ transform: `scaleX(${p})` }} />; }
