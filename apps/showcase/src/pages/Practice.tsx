import * as React from "react";
import { useState } from "react";
import { Button, Field, Input, Select, Checkbox, Segmented, Card, CardHeader, Banner, cn } from "@bytesphere/ui";
import { PageHeader } from "@bytesphere/ui";

/* ───────── Forms and validation ───────── */
type Errors = Partial<Record<"name" | "email" | "phone" | "pw", string>>;
const rules = {
  name: (v: string) => (v.trim().length < 2 ? "Enter your full name." : ""),
  email: (v: string) => (!v ? "Enter your work email." : !/^\S+@\S+\.\S+$/.test(v) ? "Email must look like name@company.com." : ""),
  phone: (v: string) => (v && !/^[+\d][\d\s-]{6,}$/.test(v) ? "Use digits only, with an optional + at the start." : ""),
  pw: (v: string) => (v.length < 10 ? "Use at least 10 characters." : ""),
};
export function FormsValidation() {
  const [v, setV] = useState({ name: "", email: "", phone: "", pw: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false); const [tried, setTried] = useState(false);
  const errs: Errors = Object.fromEntries(Object.entries(rules).map(([k, f]) => [k, f(v[k as keyof typeof v])]).filter(([, m]) => m));
  const show = (k: keyof Errors) => ((touched[k] || tried) ? errs[k] : undefined);
  const bind = (k: keyof typeof v) => ({ value: v[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setV({ ...v, [k]: e.target.value }); setSent(false); }, onBlur: () => setTouched({ ...touched, [k]: true }) });
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setTried(true);
    const first = (Object.keys(errs) as (keyof Errors)[])[0];
    if (first) { setTimeout(() => document.getElementById(`f-${first}`)?.focus(), 0); return; } // Field remounts its input when the error changes, so focus after render
    setSent(true);
  };
  const count = Object.keys(errs).filter((k) => tried || touched[k]).length;
  return (
    <>
      <PageHeader title="Forms and validation" desc="Validate on blur, then on every change. On submit, summarize and focus the first problem." />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            {tried && count > 0 && <Banner tone="danger" title={`${count} ${count === 1 ? "field needs" : "fields need"} attention`}>Fix the marked fields, then send again.</Banner>}
            {sent && <Banner tone="success" title="Saved">Your details are saved.</Banner>}
            <Field id="f-name" label="Full name" error={show("name")}>{(p) => <Input autoComplete="name" {...p} {...bind("name")} />}</Field>
            <Field id="f-email" label="Work email" hint="We send the receipt here." error={show("email")}>{(p) => <Input type="email" autoComplete="email" {...p} {...bind("email")} />}</Field>
            <Field id="f-phone" label="Phone" optional error={show("phone")}>{(p) => <Input type="tel" autoComplete="tel" inputMode="tel" {...p} {...bind("phone")} />}</Field>
            <Field id="f-pw" label="Password" hint="10 or more characters." error={show("pw")}>{(p) => <Input type="password" autoComplete="new-password" {...p} {...bind("pw")} />}</Field>
            <div><Button type="submit" variant="primary">Save details</Button></div>
          </form>
        </Card>
        <Card><CardHeader title="Rules shown here" />
          <ul className="flex list-disc flex-col gap-2 ps-5 text-body-sm text-secondary">
            <li>Errors appear after the field is left, not while typing the first time.</li>
            <li>Once shown, an error clears as soon as the value is valid.</li>
            <li>The message says how to fix it, not just what failed.</li>
            <li>Submit with errors focuses the first invalid field.</li>
            <li>Optional fields say Optional. Required is the default.</li>
          </ul>
        </Card>
      </div>
    </>);
}

/* ───────── Charts (plain SVG, no library) ───────── */
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const a = [42, 51, 47, 63, 70, 82]; const b = [30, 34, 41, 38, 52, 58];
function Chart({ title, children, table }: { title: string; children: React.ReactNode; table: React.ReactNode }) {
  const [t, setT] = useState(false);
  return (
    <Card><CardHeader title={title} action={<Button size="sm" variant="ghost" aria-pressed={t} onClick={() => setT(!t)}>{t ? "Show chart" : "Show table"}</Button>} />
      {t ? <div className="overflow-x-auto">{table}</div> : children}</Card>);
}
const W = 480, H = 200, P = 28, max = 100;
const x = (i: number) => P + (i * (W - P * 2)) / (months.length - 1);
const y = (n: number) => H - P - (n / max) * (H - P * 2);
export function ChartsPage() {
  const line = (s: number[]) => s.map((n, i) => `${i ? "L" : "M"}${x(i)} ${y(n)}`).join(" ");
  const tbl = (
    <table className="w-full text-body-sm"><thead><tr className="text-start text-secondary"><th className="py-1 text-start font-medium">Month</th><th className="text-start font-medium">Revenue</th><th className="text-start font-medium">Costs</th></tr></thead>
      <tbody>{months.map((m, i) => <tr key={m} className="border-t border-subtle"><td className="py-1.5">{m}</td><td className="tnum">{a[i]}</td><td className="tnum">{b[i]}</td></tr>)}</tbody></table>);
  const grid = [0, 25, 50, 75, 100].map((n) => <g key={n}><line x1={P} x2={W - P} y1={y(n)} y2={y(n)} stroke="var(--t-color-border-subtle)" /><text x={P - 6} y={y(n) + 4} textAnchor="end" fontSize="11" fill="var(--t-color-text-secondary)">{n}</text></g>);
  const axis = months.map((m, i) => <text key={m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--t-color-text-secondary)">{m}</text>);
  return (
    <>
      <PageHeader title="Charts" desc="Plain SVG charts: labelled directly, a table alternative, no color-only meaning." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Chart title="Revenue and costs" table={tbl}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart. Revenue rises from 42 in January to 82 in June. Costs rise from 30 to 58." className="w-full">
            {grid}{axis}
            <path d={line(a)} fill="none" stroke="var(--t-color-action-primary-rest)" strokeWidth="2.5" />
            <path d={line(b)} fill="none" stroke="var(--t-color-text-secondary)" strokeWidth="2.5" strokeDasharray="6 4" />
            {a.map((n, i) => <circle key={i} cx={x(i)} cy={y(n)} r="3.5" fill="var(--t-color-action-primary-rest)" />)}
            <text x={x(5) - 6} y={y(a[5]) - 10} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--t-color-text-primary)">Revenue 82</text>
            <text x={x(5) - 6} y={y(b[5]) + 18} textAnchor="end" fontSize="12" fill="var(--t-color-text-secondary)">Costs 58</text>
          </svg>
        </Chart>
        <Chart title="Revenue by month" table={tbl}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart of monthly revenue, from 42 in January to 82 in June." className="w-full">
            {grid}{axis}
            {a.map((n, i) => <g key={i}><rect x={x(i) - 18} y={y(n)} width="36" height={H - P - y(n)} rx="3" fill="var(--t-color-action-primary-rest)" /><text x={x(i)} y={y(n) - 5} textAnchor="middle" fontSize="11" fill="var(--t-color-text-primary)">{n}</text></g>)}
          </svg>
        </Chart>
      </div>
    </>);
}

/* ───────── Right-to-left and long text ───────── */
const copy = {
  ltr: { dir: "ltr", title: "Invoice 4821", body: "Payment is due in 14 days. Download the PDF or pay online.", pay: "Pay now", next: "Next" },
  rtl: { dir: "rtl", title: "فاتورة 4821", body: "الدفع مستحق خلال 14 يومًا. نزّل ملف PDF أو ادفع عبر الإنترنت.", pay: "ادفع الآن", next: "التالي" },
  long: { dir: "ltr", title: "Rechnung 4821 für die Internationale Handelsgesellschaft", body: "Die Zahlung ist innerhalb von vierzehn Tagen nach Rechnungsdatum fällig. Laden Sie die PDF-Datei herunter.", pay: "Jetzt bezahlen und bestätigen", next: "Weiter zur Übersicht" },
} as const;
export function RtlDemo() {
  const [k, setK] = useState<keyof typeof copy>("ltr"); const c = copy[k];
  return (
    <>
      <PageHeader title="Right-to-left and long text" desc="The same card in English, Arabic (right-to-left) and a long German pseudo-locale. Layout uses logical properties, so nothing is hand-mirrored." />
      <Segmented label="Language" items={["English", "Arabic", "German long"]} value={k === "ltr" ? "English" : k === "rtl" ? "Arabic" : "German long"} onChange={(s) => setK(s === "English" ? "ltr" : s === "Arabic" ? "rtl" : "long")} />
      <div dir={c.dir} lang={k === "rtl" ? "ar" : k === "long" ? "de" : "en"} className="mt-6 max-w-lg">
        <Card>
          <div className="flex items-start justify-between gap-3"><h2 className="text-h4 font-semibold">{c.title}</h2><span className="shrink-0 rounded-tag bg-status-warning-subtle px-2 py-0.5 text-caption text-status-warning-fg">14</span></div>
          <p className="mt-2 text-body text-secondary">{c.body}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2"><Button variant="primary">{c.pay}</Button><Button variant="ghost">{c.next}<span aria-hidden className={cn("ms-1 inline-block", k === "rtl" && "-scale-x-100")}>→</span></Button></div>
        </Card>
      </div>
      <p className="mt-4 max-w-lg text-body-sm text-secondary">Icons that show direction (arrows, back, chevrons) flip. Logos, play buttons, numbers and clocks do not.</p>
    </>);
}
