import * as React from "react";

export function useMega(count: number) {
  const [open, setOpen] = React.useState<number | null>(null); const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); }; const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null); document.addEventListener("mousedown", off); document.addEventListener("keydown", esc); return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); }; }, []);
  void count; return { open, setOpen, ref };
}
