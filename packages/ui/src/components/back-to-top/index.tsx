"use client";
import { ArrowUp } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { reduced } from "../../lib/lab-shared";

export function BackToTop() { const [on, setOn] = React.useState(false); React.useEffect(() => { const f = () => setOn(scrollY > 600); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []); return on ? <Button size="icon" className="m-pop fixed bottom-4 end-4 z-40 shadow-dropdown" aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" })}><ArrowUp /></Button> : null; }
