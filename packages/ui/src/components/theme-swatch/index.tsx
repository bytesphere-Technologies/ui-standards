"use client";

/** Mini preview of a palette. Scoped by data attributes, so it shows the real tokens. */
export function ThemeSwatch({ theme, variant }: { theme: "light" | "dark"; variant: string }) {
  const attrs = theme === "dark" ? { "data-theme": "dark", "data-dark": variant } : { "data-theme": "light", "data-light": variant };
  return (
    <div {...attrs} className="flex h-16 overflow-hidden rounded-control border border-subtle" style={{ background: "var(--t-color-surface-sunken)" }} aria-hidden>
      <div className="w-1/4 border-e border-subtle" style={{ background: "var(--t-color-surface-default)" }} />
      <div className="flex flex-1 flex-col gap-1 p-1.5"><div className="h-1.5 w-1/2 rounded-tag" style={{ background: "var(--t-color-text-primary)", opacity: .8 }} /><div className="flex-1 rounded-tag border border-subtle p-1" style={{ background: "var(--t-color-surface-raised)" }}><div className="h-1 w-3/4 rounded-tag" style={{ background: "var(--t-color-text-tertiary)" }} /><div className="mt-1 h-3 w-8 rounded-tag" style={{ background: "var(--t-color-action-primary-rest)" }} /></div></div>
    </div>);
}
