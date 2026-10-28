"use client";
import { CopyButton } from "../copy-button";

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-subtle bg-surface-sunken">
      <div className="flex items-center justify-between border-b border-subtle px-3 py-1.5"><span className="font-mono text-caption text-tertiary">{lang}</span><CopyButton value={code} /></div>
      <pre tabIndex={0} aria-label={lang ? `${lang} code` : "Code"} className="overflow-x-auto p-4 font-mono text-[13px] leading-5 text-primary"><code>{code}</code></pre>
    </div>);
}
