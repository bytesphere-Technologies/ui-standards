import { useMemo, useState } from "react";
import { Search, Copy, Check, Sparkles, FileCode2, ArrowUpRight } from "lucide-react";
import { Input, Button, StatusPill, cn, Tabs, useToast } from "@bytesphere/ui";
import { catalog, categories, type Entry, type Category } from "@bytesphere/ui/catalog";
import { previews } from "@/catalog/previews";

const RULES = `Rules for this codebase:
- Import components from "@bytesphere/ui" (src/components.ts). Do not copy markup from pages.
- Use token classes only (bg-surface-raised, text-secondary, border-subtle, rounded-card). No hex, no arbitrary px.
- One primary button per view. Sentence-case, verb-first labels.
- Every async surface has loading (SkeletonKit), empty/error (StatePanel) and stale states.
- Use <Logo> for the company name and mark. Do not retype it.
- Dark mode, corner style and navigation style are user choices via useAppearance(); do not hardcode them.
- Accessible names on icon-only controls, visible 2px focus ring, labels above fields.`;
export const aiPrompt = (e: Entry) => `Use the \`${e.name}\` from "@bytesphere/ui" (defined in ${e.file}).

What it does: ${e.summary}
${e.variants?.length ? `Variants: ${e.variants.join(" · ")}\n` : ""}${e.props?.length ? `Props: ${e.props.map(([n, t, d]) => `${n}${t ? `: ${t}` : ""}${d ? ` (${d})` : ""}`).join("; ")}\n` : ""}${e.a11y ? `Accessibility: ${e.a11y}\n` : ""}
Example:
\`\`\`tsx
${e.snippet}
\`\`\`

${RULES}

Task: `;

function Copy2({ text, label, icon: I = Copy }: { text: string; label: string; icon?: typeof Copy }) {
  const [d, setD] = useState(false);
  return <Button size="sm" onClick={() => { navigator.clipboard?.writeText(text).catch(() => {}); setD(true); setTimeout(() => setD(false), 1600); }}>{d ? <Check /> : <I />}{d ? "Copied" : label}</Button>;
}

function Card({ e }: { e: Entry }) {
  const [tab, setTab] = useState("preview"); const P = previews[e.id];
  const importLine = `import { ${e.exports.filter((x) => /^[A-Z]/.test(x) || x.startsWith("use")).slice(0, 4).join(", ")} } from "@bytesphere/ui";`;
  return (
    <article id={e.id} className="rounded-card border border-subtle bg-surface-raised">
      <header className="flex flex-wrap items-start justify-between gap-3 p-5 pb-3"><div className="min-w-0"><div className="flex items-center gap-2"><h2 className="text-h4 font-semibold">{e.name}</h2><StatusPill size="sm" dot={false}>{e.category}</StatusPill></div><p className="mt-1 max-w-[70ch] text-body text-secondary">{e.summary}</p></div>
        <div className="flex flex-wrap gap-2"><Copy2 text={importLine} label="Import" icon={FileCode2} /><Copy2 text={e.snippet} label="Usage" /><Copy2 text={aiPrompt(e)} label="AI prompt" icon={Sparkles} />{e.page && <a href={`#/${e.page}`} className="inline-flex h-8 items-center gap-1 rounded-control px-2 text-body-sm font-medium text-link hover:bg-action-ghost-hover">Live page<ArrowUpRight className="size-3.5" /></a>}</div></header>
      <div className="px-5"><Tabs label={`${e.name} views`} value={tab} onChange={setTab} items={[{ id: "preview", label: "Preview" }, { id: "usage", label: "Usage" }, { id: "props", label: "Props", count: e.props?.length }, { id: "prompt", label: "AI prompt" }]} /></div>
      <div className="p-5">
        {tab === "preview" && <div className="rounded-card border border-subtle bg-surface-sunken p-5">{P ? <P /> : <p className="text-body text-secondary">See the live page{e.page ? <> <a className="font-medium text-link hover:underline" href={`#/${e.page}`}>#/{e.page}</a></> : ""}.</p>}</div>}
        {tab === "usage" && <><pre className="overflow-x-auto rounded-card border border-subtle bg-surface-sunken p-4 font-mono text-[13px] leading-5"><code>{`${importLine}\n\n${e.snippet}`}</code></pre><p className="mt-2 text-body-sm text-tertiary">File: <code className="font-mono">{e.file}</code></p></>}
        {tab === "props" && (e.props?.length ? <dl className="grid gap-x-6 gap-y-2 text-body sm:grid-cols-[minmax(0,14rem)_1fr]">{e.props.map(([n, t, d]) => <div key={n} className="contents"><dt className="font-mono text-[13px] text-primary">{n}</dt><dd className="text-secondary">{t && <code className="me-2 font-mono text-[13px] text-link">{t}</code>}{d}</dd></div>)}</dl> : <p className="text-body text-secondary">Props are described in the usage example.</p>)}
        {tab === "prompt" && <><pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-card border border-subtle bg-surface-sunken p-4 font-mono text-[12.5px] leading-5">{aiPrompt(e)}</pre><div className="mt-3"><Copy2 text={aiPrompt(e)} label="Copy prompt" icon={Sparkles} /></div></>}
        {e.variants?.length ? <div className="mt-4 flex flex-wrap gap-1.5">{e.variants.map((v) => <span key={v} className="rounded-tag border border-subtle bg-surface-sunken px-2 py-0.5 text-caption text-secondary">{v}</span>)}</div> : null}
      </div>
    </article>);
}

export function CatalogPage() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState<Category | "all">("all"); const toast = useToast();
  const list = useMemo(() => catalog.filter((e) => (cat === "all" || e.category === cat) && (e.name + e.summary + e.needs.join(" ") + e.exports.join(" ")).toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3"><div className="w-full sm:w-80"><Input aria-label="Search components" start={<Search />} placeholder="Describe what you need: “progress ring”, “dark card”…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex flex-wrap gap-1">{(["all", ...categories] as const).map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("h-8 rounded-control px-3 text-body font-medium capitalize", cat === c ? "bg-selected text-primary" : "text-secondary hover:bg-action-ghost-hover")}>{c}</button>)}</div>
        <Button size="sm" className="ms-auto" onClick={() => { navigator.clipboard?.writeText(RULES).catch(() => {}); toast({ tone: "success", title: "Project rules copied", description: "Paste at the top of any AI chat." }); }}><Sparkles />Copy project rules</Button></div>
      <p className="text-body-sm text-secondary">{list.length} of {catalog.length} entries. Each has <b className="font-medium text-primary">Import</b>, <b className="font-medium text-primary">Usage</b> and <b className="font-medium text-primary">AI prompt</b> buttons. The same data builds <code className="font-mono">COMPONENTS.md</code> and <code className="font-mono">AI-INDEX.md</code>.</p>
      {list.length === 0 ? <p className="py-16 text-center text-body text-secondary">Nothing matches “{q}”. Try a broader word.</p> : <div className="flex flex-col gap-5">{list.map((e) => <Card key={e.id} e={e} />)}</div>}
    </div>);
}
