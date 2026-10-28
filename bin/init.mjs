#!/usr/bin/env node
// bytesphere-ui init: wire @bytesphere/ui into the current Next.js project and copy the UI standard into ./ui-standards.
// Safe to run again: every edit checks first, and nothing is changed twice. Use --dry-run to only print what would change.
import { existsSync, readFileSync, writeFileSync, cpSync, rmSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cwd = process.cwd();
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const cmd = args.find((a) => !a.startsWith("-")) || "init";

if (cmd !== "init" || args.includes("--help")) {
  console.log("Usage: npx bytesphere-ui init [--dry-run]\n\nWires @bytesphere/ui into this Next.js project and copies the UI standard to ./ui-standards.");
  process.exit(cmd === "init" ? 0 : 1);
}

const done = [], skipped = [], manual = [];
const rel = (p) => path.relative(cwd, p) || ".";
const read = (p) => readFileSync(p, "utf8");
const write = (p, s) => { if (!dry) writeFileSync(p, s); };
const first = (...c) => c.map((x) => path.join(cwd, x)).find(existsSync);

// ---------- 0. project checks ----------
const pj = first("package.json");
if (!pj) { console.error("No package.json here. Run this from the root of your Next.js project."); process.exit(1); }
const pkg = JSON.parse(read(pj));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
if (!deps.next) manual.push("This does not look like a Next.js project (no `next` dependency). The steps below target the App Router.");
const tw = deps.tailwindcss ? String(deps.tailwindcss).replace(/^[^\d]*/, "") : "";
if (!deps.tailwindcss) manual.push("Tailwind CSS is not installed. @bytesphere/ui needs Tailwind v4: `npm i -D tailwindcss @tailwindcss/postcss` and a `postcss.config.mjs` with `{ plugins: { \"@tailwindcss/postcss\": {} } }`.");
else if (parseInt(tw, 10) < 4) manual.push(`Tailwind ${tw} found. @bytesphere/ui needs Tailwind v4 (upgrade guide: https://tailwindcss.com/docs/upgrade-guide).`);
else if (!deps["@tailwindcss/postcss"] && !deps["@tailwindcss/vite"]) manual.push("Tailwind v4 needs `@tailwindcss/postcss` in Next.js: `npm i -D @tailwindcss/postcss` and add it to postcss.config.mjs.");
if (!deps["@bytesphere/ui"]) manual.push("@bytesphere/ui is not in package.json. Install it first: `npm i <release .tgz url>`.");

// ---------- 1. next.config: transpilePackages ----------
const nextCfg = first("next.config.ts", "next.config.mjs", "next.config.js", "next.config.cjs");
if (!nextCfg) {
  manual.push('No next.config found. Create one with `transpilePackages: ["@bytesphere/ui"]` (the package ships TypeScript source).');
} else {
  let s = read(nextCfg);
  if (/transpilePackages[^\]]*@bytesphere\/ui/.test(s)) skipped.push(`${rel(nextCfg)}: transpilePackages already set`);
  else if (/transpilePackages\s*:\s*\[/.test(s)) { s = s.replace(/transpilePackages\s*:\s*\[/, 'transpilePackages: ["@bytesphere/ui", '); write(nextCfg, s); done.push(`${rel(nextCfg)}: added @bytesphere/ui to transpilePackages`); }
  else if (/(const\s+\w+\s*(?::\s*\w+)?\s*=\s*\{|export\s+default\s*\{|module\.exports\s*=\s*\{)/.test(s)) {
    s = s.replace(/(const\s+\w+\s*(?::\s*\w+)?\s*=\s*\{|export\s+default\s*\{|module\.exports\s*=\s*\{)/, '$1\n  transpilePackages: ["@bytesphere/ui"],');
    write(nextCfg, s); done.push(`${rel(nextCfg)}: added transpilePackages`);
  } else manual.push(`${rel(nextCfg)}: add \`transpilePackages: ["@bytesphere/ui"]\` to the config object.`);
}

// ---------- 2. global CSS ----------
const css = first("app/globals.css", "src/app/globals.css", "styles/globals.css", "src/styles/globals.css", "app/global.css", "src/app/global.css");
const IMPORT = '@import "@bytesphere/ui/styles.css";';
if (!css) manual.push(`No global CSS file found. Add \`${IMPORT}\` to the CSS file your root layout imports.`);
else {
  let s = read(css);
  if (s.includes("@bytesphere/ui/styles.css")) skipped.push(`${rel(css)}: styles already imported`);
  else {
    // @import rules must come first: put ours after the last leading @import line.
    const lines = s.split("\n"); let at = 0;
    for (let i = 0; i < lines.length; i++) { if (/^\s*@import\b/.test(lines[i])) at = i + 1; else if (lines[i].trim() && !/^\s*(\/\*|\*|\/\/)/.test(lines[i])) break; }
    lines.splice(at, 0, IMPORT); write(css, lines.join("\n"));
    done.push(`${rel(css)}: imported @bytesphere/ui/styles.css`);
    if (/@import\s+["']tailwindcss["']/.test(s)) manual.push(`${rel(css)} also imports "tailwindcss"; styles.css includes it, so you can delete your own \`@import "tailwindcss"\` line (keeping both only duplicates some CSS).`);
  }
}

// ---------- 3. root layout ----------
const layout = first("app/layout.tsx", "src/app/layout.tsx", "app/layout.jsx", "src/app/layout.jsx");
if (!layout) manual.push('No app/layout found (Pages Router?). Add <AppearanceScript /> in <head> and suppressHydrationWarning on <html> in your custom _document.');
else {
  let s = read(layout); let changed = false;
  if (!/AppearanceScript/.test(s)) {
    if (/<head[^>]*>/.test(s)) s = s.replace(/(<head[^>]*>)/, "$1<AppearanceScript />");
    else if (/<html[^>]*>/.test(s)) s = s.replace(/(<html[^>]*>)/, "$1\n      <head><AppearanceScript /></head>");
    else { manual.push(`${rel(layout)}: could not find <html>. Add <head><AppearanceScript /></head> inside it.`); }
    if (/AppearanceScript/.test(s)) {
      // add the import after the last import line
      const lines = s.split("\n"); let last = -1; lines.forEach((l, i) => { if (/^\s*import\b/.test(l) || /\bfrom\s+["'][^"']+["'];?\s*$/.test(l)) last = i; });
      lines.splice(last + 1, 0, 'import { AppearanceScript } from "@bytesphere/ui";'); s = lines.join("\n"); changed = true;
    }
  } else skipped.push(`${rel(layout)}: AppearanceScript already present`);
  if (/<html\b/.test(s) && !/<html[^>]*suppressHydrationWarning/.test(s)) { s = s.replace(/<html\b/, "<html suppressHydrationWarning"); changed = true; }
  if (changed) { write(layout, s); done.push(`${rel(layout)}: added <AppearanceScript /> and suppressHydrationWarning`); }
}

// ---------- 4. copy the standard to ./ui-standards ----------
const src = path.join(pkgRoot, "standards");
const dest = path.join(cwd, "ui-standards");
if (!existsSync(src)) manual.push("This copy of the package has no bundled standards folder (it was not built with `npm pack`). Use the release file from GitHub.");
else {
  if (!dry) { rmSync(dest, { recursive: true, force: true }); mkdirSync(dest, { recursive: true }); cpSync(src, dest, { recursive: true }); }
  const v = existsSync(path.join(src, "VERSION")) ? read(path.join(src, "VERSION")).trim() : "?";
  done.push(`ui-standards/: standards v${v} copied (docs, AI-INDEX.md, COMPONENTS.md, AGENTS.md). Refreshed on every init.`);
}

// ---------- 5. tell the project's AI tools ----------
const MARK = "<!-- bytesphere-ui -->";
const BLOCK = `${MARK}\n## UI standard\nFor any UI work, read \`ui-standards/AGENTS.md\` first and follow it. Reuse components from \`@bytesphere/ui\`; see \`ui-standards/AI-INDEX.md\`.\n${MARK}\n`;
for (const f of ["CLAUDE.md", "AGENTS.md"]) {
  const p = path.join(cwd, f);
  if (existsSync(p)) {
    const s = read(p);
    if (s.includes(MARK)) skipped.push(`${f}: pointer already present`);
    else { write(p, s.replace(/\s*$/, "\n\n") + BLOCK); done.push(`${f}: added a pointer to ui-standards/AGENTS.md`); }
  }
}
if (!existsSync(path.join(cwd, "CLAUDE.md")) && !existsSync(path.join(cwd, "AGENTS.md"))) {
  write(path.join(cwd, "AGENTS.md"), "# AGENTS.md\n\n" + BLOCK);
  write(path.join(cwd, "CLAUDE.md"), "Read AGENTS.md first and follow it.\n");
  done.push("AGENTS.md and CLAUDE.md: created, pointing to ui-standards/AGENTS.md");
}

// ---------- report ----------
console.log(`\nbytesphere-ui init${dry ? " (dry run: nothing was written)" : ""}\n`);
if (done.length) console.log((dry ? "Would change:\n" : "Changed:\n") + done.map((x) => "  + " + x).join("\n"));
if (skipped.length) console.log("\nAlready done:\n" + skipped.map((x) => "  = " + x).join("\n"));
if (manual.length) console.log("\nDo by hand:\n" + manual.map((x) => "  ! " + x).join("\n"));
console.log(`\nNext: tell your AI "Build <the page> following ui-standards." Optional lint setup is at the end of ui-standards/AGENTS.md.\n`);
