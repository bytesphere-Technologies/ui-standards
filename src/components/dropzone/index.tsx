"use client";
import { Upload, FileText, X, RotateCcw } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Progress } from "../progress";
import { useToast } from "../toast-provider";

/* ───────── Dropzone with simulated uploads ───────── */
type F = { id: number; name: string; size: string; pct: number; err?: string };

export function Dropzone() {
  const toast = useToast(); const [files, setFiles] = React.useState<F[]>([]); const [over, setOver] = React.useState(false); const idRef = React.useRef(0); const input = React.useRef<HTMLInputElement>(null);
  const run = (id: number) => { const t = setInterval(() => setFiles((fs) => fs.map((f) => f.id === id && !f.err ? { ...f, pct: Math.min(100, f.pct + 14 + Math.random() * 12) } : f)), 300); setTimeout(() => clearInterval(t), 4000); };
  const add = (list: FileList | null) => { if (!list) return; Array.from(list).slice(0, 5).forEach((f) => { const id = ++idRef.current; const big = f.size > 10 * 1024 * 1024; setFiles((fs) => [...fs, { id, name: f.name, size: `${(f.size / 1048576).toFixed(1)} MB`, pct: 0, err: big ? `${f.name} is ${(f.size / 1048576).toFixed(0)} MB. The limit is 10 MB.` : undefined }]); if (!big) run(id); }); };
  return (
    <div className="flex flex-col gap-3">
      <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        className={cn("flex flex-col items-center gap-1 rounded-modal border border-dashed px-6 py-8 text-center transition-colors duration-150", over ? "border-solid border-action-primary bg-selected" : "border-control hover:border-strong")}>
        <Upload className="mb-1 size-5 text-tertiary" aria-hidden />
        <p className="text-body text-primary">{over ? "Drop to upload" : <>Drag files here or <button type="button" onClick={() => input.current?.click()} className="font-medium text-link hover:underline">browse</button></>}</p>
        <p id="dz-c" className="text-body-sm text-secondary">PDF, PNG or JPG · up to 10 MB each · 5 files max</p>
        <input ref={input} type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className="sr-only" aria-describedby="dz-c" aria-label="Choose files" onChange={(e) => add(e.target.files)} />
      </div>
      {files.length > 0 && <ul className="flex flex-col gap-2">{files.map((f) => (
        <li key={f.id} className="flex items-center gap-3 rounded-card border border-subtle px-3 py-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-control bg-surface-sunken text-tertiary"><FileText className="size-4" aria-hidden /></span>
          <div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-3"><p className="truncate text-body font-medium text-primary">{f.name}</p><span className="tnum shrink-0 text-body-sm text-secondary">{f.size}</span></div>
            {f.err ? <p className="text-body-sm text-status-danger-fg">{f.err}</p> : f.pct >= 100 ? <p className="text-body-sm text-status-success-fg">Uploaded</p> : <div className="mt-1.5"><Progress label={`Uploading ${f.name}`} value={Math.round(f.pct)} /></div>}</div>
          {f.err ? <Button size="icon-sm" variant="ghost" aria-label={`Remove ${f.name}`} onClick={() => setFiles((fs) => fs.filter((x) => x.id !== f.id))}><X /></Button> : <Button size="icon-sm" variant="ghost" aria-label={f.pct >= 100 ? `Remove ${f.name}` : `Cancel upload of ${f.name}`} onClick={() => { setFiles((fs) => fs.filter((x) => x.id !== f.id)); toast({ tone: "info", title: "Removed", description: f.name }); }}>{f.pct >= 100 ? <X /> : <RotateCcw />}</Button>}
        </li>))}</ul>}
    </div>);
}
