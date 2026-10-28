import { useState, useEffect } from "react";
import { Specimen, Button, Card, Skeleton, Switch, Segmented, Modal, cn, Input } from "@bytesphere/ui";
import { SwirlLoader, SplitLoader, TraceLoader, OrbitLoader, BloomLoader, FillLoader, BootLoader, RouteBar, SuccessTick } from "@bytesphere/ui";
import { RotateCcw, Check, Play, Bell } from "lucide-react";

export function Loaders() {
  const [pct, setPct] = useState(38); const [run, setRun] = useState(false); const [route, setRoute] = useState(false); const [btn, setBtn] = useState(false); const [done, setDone] = useState(false);
  useEffect(() => { if (!run) return; const t = setInterval(() => setPct((p) => (p >= 100 ? 100 : p + 3)), 120); return () => clearInterval(t); }, [run]);
  useEffect(() => { if (pct >= 100) { setRun(false); setDone(true); } }, [pct]);
  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Brand loaders" note="Built from the ByteSphere mark. Pick by what is happening, not by taste." doc="03-components/loaders-progress-and-spinners.md">
        <div className="grid gap-px overflow-hidden rounded-card bg-[var(--color-subtle)] sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Swirl", "Content and page loads", <SwirlLoader size={44} />, "1.6s turn, ease-in-out, short rest. After 300ms."],
            ["Split", "Background sync, saving", <SplitLoader size={44} />, "Halves part and meet, 1.6s. Quiet."],
            ["Trace", "Inline, table headers", <TraceLoader size={24} />, "Halves take turns. 16–24px."],
            ["Orbit", "Onboarding and empty-panel waits", <OrbitLoader size={44} />, "Halves circle each other, 2s."],
            ["Bloom", "Listening, waiting for a device", <BloomLoader size={44} />, "Halves breathe in turn, 1.8s."],
            ["Fill", "Uploads, exports, imports", <FillLoader value={pct} size={44} />, "Determinate. Fills bottom-up."],
          ].map(([n, u, el, d]) => (
            <div key={n as string} className="flex min-h-48 flex-col gap-8 bg-surface-raised p-5"><div className="grid h-16 place-items-start">{el as React.ReactNode}</div><div><p className="text-body font-medium">{n as string}</p><p className="text-body-sm text-secondary">{u as string}</p><p className="mt-1 text-caption text-tertiary">{d as string}</p></div></div>))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2"><Button size="sm" onClick={() => { setPct(0); setDone(false); setRun(true); }}><Play />Run fill</Button>{done && <span className="m-fade flex items-center gap-2 text-body-sm text-status-success-fg"><SuccessTick size={20} />Export ready</span>}</div>
      </Specimen>

      <Specimen title="In context" note="Where each one lives." doc="">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card flush><div className="relative border-b border-subtle px-4 py-3 text-body font-medium">Route bar<RouteBar active={route} /></div><div className="flex flex-col items-start gap-3 p-4"><p className="text-body-sm text-secondary">2px bar under the top bar. Only if navigation takes longer than 300ms.</p><Button size="sm" onClick={() => { setRoute(true); setTimeout(() => setRoute(false), 2600); }}>Simulate navigation</Button></div></Card>
          <Card flush><div className="border-b border-subtle px-4 py-3 text-body font-medium">Button</div><div className="flex flex-col items-start gap-3 p-4"><p className="text-body-sm text-secondary">The mark replaces the leading icon; the label stays and the width never changes.</p><div className="flex gap-2"><Button variant="primary" loading={btn} onClick={() => { setBtn(true); setTimeout(() => setBtn(false), 2200); }}>{btn ? "Saving" : "Save changes"}</Button><Button loading>Exporting</Button></div></div></Card>
          <Card flush><div className="border-b border-subtle px-4 py-3 text-body font-medium">Table header</div><div className="p-4"><div className="flex items-center justify-between rounded-control bg-surface-sunken px-3 py-2 text-body-sm font-medium text-secondary">Deals <TraceLoader size={16} /></div><p className="mt-3 text-body-sm text-secondary">Refetching keeps rows visible and dims them to 60%. The trace sits in the header.</p></div></Card>
        </div>
        <div className="mt-4 overflow-hidden rounded-card border border-subtle"><BootLoader text="Preparing your workspace" /></div>
        <p className="mt-2 text-caption text-tertiary">Boot loader: label fades in after 1s so fast loads never flash text.</p>
      </Specimen>

      <Specimen title="Skeletons" note="For content with a known shape. Appear after 150ms." doc="03-components/skeletons.md">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-card border border-subtle p-4"><div className="flex items-center gap-3"><Skeleton className="size-10 rounded-round" /><div className="flex-1 space-y-2"><Skeleton className="h-3.5 w-1/2" /><Skeleton className="h-3 w-3/4" /></div></div><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-5/6" /></div>
          <div className="rounded-card border border-subtle p-4">{[0, 1, 2, 3].map((i) => <div key={i} className="flex h-10 items-center gap-3 border-b border-subtle last:border-0"><Skeleton className="size-4" /><Skeleton className="h-3.5 w-40" /><Skeleton className="ms-auto h-[22px] w-16" /></div>)}</div>
          <div className="flex flex-col justify-end gap-3 rounded-card border border-subtle p-4"><div className="flex h-24 items-end gap-2">{[40, 70, 55, 90, 65, 80].map((h, i) => <div key={i} className="flex-1" style={{ height: `${h}%` }}><Skeleton className="h-full w-full" shimmer={false} /></div>)}</div><div className="h-px bg-[var(--color-subtle)]" /></div>
        </div>
      </Specimen>

      <Specimen title="Rules" doc="">
        <ul className="grid gap-x-10 gap-y-2 text-body text-secondary md:grid-cols-2">
          {["Under 150ms: show nothing.", "A click spins inside the control that was clicked.", "A region with a shape gets a skeleton, never a spinner.", "Route changes over 300ms get the 2px bar.", "Known duration or size gets the fill loader or a progress bar.", "Never block the whole screen for background work.", "After 5s add “Still loading…” and a way out.", "Reduced motion swaps rotation for a slow fade."].map((r) => <li key={r} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-link" aria-hidden />{r}</li>)}
        </ul>
      </Specimen>
    </div>
  );
}

/* ───────── Motion ───────── */
type Rec = { id: string; name: string; use: string; dur: string; ease: string; props: string; cls: string; demo: "fade" | "pop" | "rise" | "shake" | "draw" | "sheet" | "flash" | "stagger" | "press" | "collapse" | "ping" | "toast" | "scan" | "underline" | "flyout" | "burst" | "line" | "grow" | "bell" | "crossfade" | "drill" };
const recipes: Rec[] = [
  { id: "M-01", name: "Fade", use: "Image reveal, tooltip, route content", dur: "150ms", ease: "enter", props: "opacity", cls: "m-fade", demo: "fade" },
  { id: "M-02", name: "Pop", use: "Menus, popovers, select lists", dur: "150ms", ease: "enter", props: "opacity, translateY(−4px), scale(.96→1)", cls: "m-pop", demo: "pop" },
  { id: "M-03", name: "Rise", use: "Toasts, cards entering after an action", dur: "200ms", ease: "enter", props: "opacity, translateY(8px→0)", cls: "m-rise", demo: "rise" },
  { id: "M-04", name: "Sheet", use: "Side drawers, bottom sheets", dur: "300ms in · 200ms out", ease: "enter / exit", props: "translateX or Y", cls: "m-sheet-right", demo: "sheet" },
  { id: "M-05", name: "Collapse", use: "Accordion, disclosure, filters row", dur: "200ms", ease: "standard", props: "grid-template-rows 0fr→1fr", cls: "", demo: "collapse" },
  { id: "M-06", name: "Shake", use: "Invalid field on submit. Once, never on blur", dur: "240ms", ease: "standard", props: "translateX ±4px", cls: "m-shake", demo: "shake" },
  { id: "M-07", name: "Draw", use: "Success tick", dur: "300ms", ease: "standard", props: "stroke-dashoffset", cls: "m-draw", demo: "draw" },
  { id: "M-08", name: "Flash", use: "A row that just changed or was added", dur: "1.2s", ease: "standard", props: "background-color", cls: "m-flash", demo: "flash" },
  { id: "M-09", name: "Stagger", use: "First render of a list after an action. Max 6 items", dur: "40ms step · 200ms each", ease: "enter", props: "opacity, translateY(8px)", cls: "m-stagger", demo: "stagger" },
  { id: "M-10", name: "Press", use: "Buttons while pressed. Never lifts on hover", dur: "100ms", ease: "standard", props: "scale(.985), translateY(.5px)", cls: "press", demo: "press" },
  { id: "M-12", name: "Scan", use: "Scanner viewfinder line (operations only)", dur: "2s loop", ease: "in-out", props: "top 14% ↔ 86%", cls: "m-scan", demo: "scan" },
  { id: "M-13", name: "Underline", use: "Nav link hover, current and open states", dur: "150ms", ease: "standard", props: "transform scaleX from the start edge", cls: "m-underline", demo: "underline" },
  { id: "M-14", name: "Flyout", use: "Mega menus and department panels opening", dur: "200ms", ease: "enter", props: "clip-path inset reveal + opacity", cls: "m-flyout", demo: "flyout" },
  { id: "M-15", name: "Burst", use: "Success ring, once, no confetti", dur: "400ms", ease: "exit", props: "scale .55→1.7, opacity .55→0", cls: "m-burst", demo: "burst" },
  { id: "M-16", name: "Line draw", use: "First draw of a line chart only", dur: "400ms", ease: "standard", props: "stroke-dashoffset (pathLength=1)", cls: "m-line", demo: "line" },
  { id: "M-17", name: "Grow", use: "Bars and columns on first render", dur: "300ms · 40ms stagger", ease: "enter", props: "scaleY from the baseline", cls: "m-grow", demo: "grow" },
  { id: "M-18", name: "Bell", use: "A new notification arrives, once", dur: "400ms", ease: "standard", props: "rotate ±14° decaying", cls: "m-bell", demo: "bell" },
  { id: "M-19", name: "Crossfade", use: "Skeleton → content swap", dur: "150ms", ease: "standard", props: "opacity", cls: "m-crossfade", demo: "crossfade" },
  { id: "M-20", name: "Drill", use: "Drill-down menus: panel slides in, back slides out", dur: "200ms", ease: "enter", props: "translateX 24px + opacity", cls: "m-drill-in", demo: "drill" },
  { id: "M-11", name: "Ping", use: "Live indicator, new item dot", dur: "1.6s loop", ease: "exit", props: "scale, opacity", cls: "m-ping", demo: "ping" },
];
recipes.sort((a, b) => +a.id.slice(2) - +b.id.slice(2));
export function Motion() {
  const [n, setN] = useState(0); const [open, setOpen] = useState(true); const [sheet, setSheet] = useState(false); const [reduced, setReduced] = useState(false);
  const Demo = ({ r }: { r: Rec }) => {
    const k = `${r.id}-${n}`;
    switch (r.demo) {
      case "fade": case "pop": case "rise": return <div key={k} className={cn(r.cls, "rounded-card border border-subtle bg-surface-overlay px-4 py-2.5 text-body shadow-dropdown")}>Invoice sent</div>;
      case "sheet": return <div key={k} className="relative h-14 w-44 overflow-hidden rounded-control bg-surface-sunken"><div className={cn(r.cls, "absolute inset-y-0 end-0 w-28 border-s border-subtle bg-surface-overlay p-2 text-caption")}>Edit deal</div></div>;
      case "collapse": return <div><button className="mb-1 text-body-sm font-medium text-link" onClick={() => setOpen(!open)}>{open ? "Hide" : "Show"} filters</button><div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}><div className="overflow-hidden"><div className="rounded-control bg-surface-sunken p-2 text-body-sm">Status · Owner · Date</div></div></div></div>;
      case "shake": return <div key={k} className={cn(r.cls, "w-44")}><Input aria-label="Email" aria-invalid defaultValue="mia@" /></div>;
      case "draw": return <svg key={k} width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="16" stroke="var(--color-status-success-solid)" opacity=".3" strokeWidth="2" /><path className="m-draw" d="M10 19l5.5 5.5L26 13" stroke="var(--color-status-success-solid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
      case "flash": return <div key={k} className={cn(r.cls, "rounded-control border border-subtle px-3 py-2 text-body")}>D-1042 · Northwind renewal</div>;
      case "stagger": return <ul key={k} className="m-stagger w-44 space-y-1 text-body-sm">{["Northwind", "Contoso", "Fabrikam", "Tailspin"].map((x, i) => <li key={x} style={{ "--i": i } as React.CSSProperties} className="rounded-tag bg-surface-sunken px-2 py-1">{x}</li>)}</ul>;
      case "press": return <Button variant="primary">Press and hold</Button>;
      case "ping": return <span className="relative inline-flex size-3"><span className={cn(r.cls, "absolute inset-0 rounded-round bg-status-success-solid")} /><span className="relative size-3 rounded-round bg-status-success-solid" /></span>;
      case "scan": return <div key={k} className="relative h-14 w-44 overflow-hidden rounded-control bg-[#02070D]"><span className="m-scan absolute inset-x-3 h-0.5 rounded-round bg-[#65ABE2]" /></div>;
      case "underline": return <div className="flex gap-1">{["Platform", "Pricing", "Docs"].map((x, i) => <a key={x} href="#/motion" aria-current={i === 0 ? "page" : undefined} className="m-underline px-3 py-1.5 text-body font-medium text-secondary hover:text-primary aria-[current=page]:text-primary">{x}</a>)}</div>;
      case "flyout": return <div key={k} className="m-flyout w-52 rounded-card border border-subtle bg-surface-overlay p-3 shadow-dropdown"><p className="text-caption font-semibold uppercase tracking-[0.06em] text-tertiary">Platform</p><p className="mt-1 text-body">Deals · Approvals · Scanning</p></div>;
      case "burst": return <span key={k} className="relative grid size-12 place-items-center"><span className="m-burst absolute inset-0 rounded-round border-2 border-[var(--color-status-success-solid)]" /><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14.5l5 5L21 9" stroke="var(--color-status-success-solid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
      case "line": return <svg key={k} width="176" height="48" viewBox="0 0 176 48" fill="none"><path className="m-line" pathLength={1} d="M2 38 C 24 30, 36 8, 60 20 S 100 42, 124 22 S 160 6, 174 12" stroke="var(--color-data-1)" strokeWidth="2.5" strokeLinecap="round" /></svg>;
      case "grow": return <div key={k} className="flex h-14 items-end gap-1.5">{[30, 48, 36, 56, 42].map((h, i) => <span key={i} className="m-grow w-5 rounded-t-tag bg-action-primary" style={{ height: h, animationDelay: `${i * 40}ms` }} />)}</div>;
      case "bell": return <span key={k} className="relative inline-grid size-10 place-items-center rounded-round bg-surface-sunken"><Bell className="m-bell size-5 text-secondary" /><span className="absolute end-1 top-1 size-2.5 rounded-round bg-action-primary" /></span>;
      case "crossfade": return <div key={k} className="relative h-12 w-44"><div className="m-pulse absolute inset-0 rounded-card bg-surface-sunken" /><div className="m-crossfade absolute inset-0 rounded-card border border-subtle bg-surface-raised px-3 py-2 text-body-sm" style={{ animationDelay: "700ms" }}>Loaded content<br /><span className="text-tertiary">replaces the skeleton</span></div></div>;
      case "drill": return <div key={k} className="m-drill-in w-48 rounded-card border border-subtle bg-surface-overlay p-2 text-body-sm"><p className="px-2 pb-1 font-medium text-secondary">‹ Main menu</p><p className="rounded-control bg-action-ghost-hover px-2 py-1.5">Electronics</p></div>;
      default: return null;
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Animation recipes" note="Twenty named recipes. If it isn’t here, it doesn’t ship." doc="01-foundations/motion.md">
        <div className="mb-4 flex flex-wrap items-center gap-3"><Button size="sm" onClick={() => setN(n + 1)}><RotateCcw />Replay all</Button><label className="flex items-center gap-2 text-body-sm text-secondary"><input type="checkbox" checked={reduced} onChange={(e) => { setReduced(e.target.checked); document.documentElement.classList.toggle("force-reduce", e.target.checked); }} />Preview reduced motion</label></div>
        <style>{`.force-reduce .m-fade,.force-reduce .m-pop,.force-reduce .m-rise,.force-reduce .m-shake,.force-reduce .m-sheet-right,.force-reduce .m-stagger>*{animation:none!important}`}</style>
        <div className="overflow-hidden rounded-card border border-subtle">
          <table className="w-full text-body"><thead className="bg-surface-sunken text-body-sm text-secondary"><tr className="h-9"><th className="ps-4 text-start font-medium">Recipe</th><th className="text-start font-medium">Preview</th><th className="hidden text-start font-medium lg:table-cell">Use</th><th className="hidden text-start font-medium md:table-cell">Timing</th></tr></thead>
            <tbody>{recipes.map((r) => <tr key={r.id} className="border-t border-subtle align-middle"><td className="px-4 py-3"><p className="font-mono text-caption text-tertiary">{r.id}</p><p className="font-medium">{r.name}</p></td><td className="py-3 pe-4"><Demo r={r} /></td><td className="hidden max-w-60 py-3 pe-4 text-secondary lg:table-cell">{r.use}</td><td className="hidden py-3 pe-4 md:table-cell"><p className="tnum">{r.dur}</p><p className="font-mono text-caption text-tertiary">{r.ease} · {r.props}</p></td></tr>)}</tbody></table>
        </div>
        <Button className="mt-3" onClick={() => setSheet(true)}>Open sheet</Button><Modal open={sheet} onClose={() => setSheet(false)} title="Sheet and dialog motion" description="Dialogs enter in 150ms with pop; sheets slide in 300ms." footer={<Button variant="primary" onClick={() => setSheet(false)}>Done</Button>} />
      </Specimen>

      <div className="grid gap-6 lg:grid-cols-2">
        <Specimen title="Timing scale" doc="">
          <div className="flex flex-col gap-2.5">{[["Instant", 100, "hover color, press, focus ring"], ["Fast", 150, "menus, fade, switch, tab bar"], ["Base", 200, "toast, accordion, drawer exit"], ["Slow", 300, "dialog, sheet, sidebar collapse"], ["Slower", 400, "ceiling. Chart first draw only"]].map(([n2, ms, u]) => <div key={n2 as string} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3"><span className="text-body-sm font-medium">{n2}</span><div className="h-1.5 rounded-round bg-surface-sunken"><div key={n} className="h-full rounded-round bg-action-primary" style={{ width: 0, animation: `grow-w ${ms}ms cubic-bezier(.2,0,0,1) forwards` }} /></div><span className="tnum text-body-sm text-secondary">{ms}ms</span><span className="col-span-3 -mt-1.5 ps-[4.75rem] text-caption text-tertiary">{u as string}</span></div>)}</div>
          <style>{`@keyframes grow-w{to{width:100%}}`}</style>
        </Specimen>
        <Specimen title="Easing" doc="">
          <div className="flex flex-col gap-3 text-body">{[["Standard", "0.2, 0, 0, 1", "elements staying on screen"], ["Enter", "0, 0, 0, 1", "arriving: decelerate"], ["Exit", "0.3, 0, 1, 1", "leaving: accelerate"], ["In-out", "0.65, 0, 0.35, 1", "brand loaders only"], ["Linear", "0, 0, 1, 1", "progress, spinners"]].map(([a, b, c]) => <div key={a} className="grid grid-cols-[4.5rem_11.5rem_1fr] items-center gap-3"><span className="font-medium">{a}</span><code className="font-mono text-caption text-secondary">cubic-bezier({b})</code><span className="text-body-sm text-tertiary">{c}</span></div>)}</div>
          <p className="mt-4 border-t border-subtle pt-3 text-body-sm text-secondary">Never: bounce, spring, overshoot, parallax on data screens, scroll-jacking, auto-playing carousels, animated counters, entrance animation on every re-render.</p>
        </Specimen>
      </div>

      <Specimen title="Press and hover" note="Feedback without movement." doc="">
        <div className="flex flex-wrap items-center gap-3"><Button variant="primary">Press me</Button><Button>Secondary</Button><div className="rounded-card border border-subtle bg-surface-raised px-4 py-2.5 text-body transition-colors duration-100 hover:border-strong hover:bg-action-ghost-hover">Hover card: border and tint, no lift</div><Switch id="mo-sw" label="Switch thumb · 150ms" checked={open} onChange={setOpen} /><Segmented label="Tab bar" items={["List", "Board"]} value="List" onChange={() => {}} /></div>
      </Specimen>
    </div>
  );
}
