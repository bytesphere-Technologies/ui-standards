import { Button, Card, StatusPill, Specimen, Overline } from "@bytesphere/ui";

/* The "banned" panel uses inline styles on purpose: raw values are exactly what the standard forbids in product code. */
export function AntiSlop() {
  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Same brief, two decisions" note="Left is what a template produces. Right is the standard." doc="07-antipatterns/ai-slop-detector.md">
        <div className="grid gap-6 lg:grid-cols-2">
          <div><p className="mb-2 text-body-sm font-medium text-status-danger-fg">Banned · items 1, 2, 4, 5, 7, 10, 11, 15, 17, 26</p>
            <div className="overflow-hidden rounded-[24px] p-8 text-center text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
              <h3 className="text-[38px] font-extrabold leading-tight"><span style={{ background: "linear-gradient(90deg,#fff,#fbcfe8)", WebkitBackgroundClip: "text", color: "transparent" }}>Supercharge your workflow ✨</span></h3>
              <p className="mx-auto mt-3 max-w-md text-[16px] opacity-90">Seamlessly unlock effortless productivity and elevate your team with next-generation automation.</p>
              <button className="mt-5 rounded-full bg-white px-6 py-3 font-bold text-purple-700 shadow-2xl">Get started 🚀</button>
              <div className="mt-6 grid grid-cols-3 gap-3">{["⚡ Fast", "🔒 Secure", "📈 Scalable"].map((t) => <div key={t} className="rounded-[20px] border border-white/20 bg-white/10 p-3 text-sm backdrop-blur-xl">{t}<p className="mt-1 text-xs opacity-80">Lorem ipsum dolor sit amet consectetur.</p></div>)}</div>
              <p className="mt-5 text-xs opacity-80">Trusted by 10,000+ teams · 99.9% satisfaction</p></div></div>
          <div><p className="mb-2 text-body-sm font-medium text-status-success-fg">Standard</p>
            <Card className="flex flex-col gap-4 p-8"><Overline>Approvals</Overline><h3 className="font-display text-h1 font-semibold tracking-[-0.02em]">Approve invoices in one place</h3>
              <p className="max-w-[56ch] text-secondary" style={{ fontSize: 16, lineHeight: "24px" }}>Route each invoice to the right approver, see what is waiting, and export the month’s approvals to your ledger.</p>
              <div className="flex gap-2"><Button size="lg" variant="primary">Start free trial</Button><Button size="lg">Book a demo</Button></div>
              <dl className="grid grid-cols-3 gap-4 border-t border-subtle pt-4">{[["Median approval time", "4.2 h", "Q4 2025, sample"], ["Export formats", "CSV, XLSX", "ledger-ready"], ["Data regions", "EU, US", "DPA available"]].map(([k, v, s]) => <div key={k}><dt className="text-body-sm text-secondary">{k}</dt><dd className="tnum text-h3 font-semibold">{v}</dd><dd className="text-caption text-tertiary">{s}</dd></div>)}</dl>
              <div className="flex items-center gap-2 text-body-sm text-secondary"><StatusPill tone="success">SOC 2 Type II</StatusPill>Report on request</div></Card></div>
        </div>
      </Specimen>
      <Specimen title="The positive test" note="Would this survive a design review?" doc="">
        <ol className="grid list-decimal gap-x-10 gap-y-2 ps-5 text-body text-secondary md:grid-cols-2">{["Every color, radius, spacing and size traces to a token.", "Hierarchy reads in a 3-second squint.", "All four states exist and were designed.", "Copy has numbers, names and sources from this product.", "Sample data is believable: varied, real units, imperfect trends.", "Remove every decoration and nothing is lost."].map((t) => <li key={t}>{t}</li>)}</ol>
      </Specimen>
    </div>);
}
