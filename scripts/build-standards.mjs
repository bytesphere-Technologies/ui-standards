// Runs before `npm pack` (prepack). Bundles the written standard and the component index into packages/ui/standards,
// so `npx bytesphere-ui init` can copy them into a project as ./ui-standards.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const pkg = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoDocs = path.resolve(pkg, "../../docs");
const out = path.join(pkg, "standards");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
if (existsSync(repoDocs)) cpSync(repoDocs, path.join(out, "docs"), { recursive: true, filter: (s) => !s.includes("/dist") });
// In a project the component source is under node_modules, not packages/ui.
for (const f of ["AI-INDEX.md", "COMPONENTS.md"]) {
  const t = readFileSync(path.join(pkg, "catalog", f), "utf8").replaceAll("packages/ui/", "node_modules/@bytesphere/ui/").replaceAll("apps/showcase/", "(source repo) apps/showcase/");
  writeFileSync(path.join(out, f), t);
}
writeFileSync(path.join(out, "AGENTS.md"), readFileSync(path.join(pkg, "bin/consumer-AGENTS.md"), "utf8"));
writeFileSync(path.join(out, "VERSION"), JSON.parse(readFileSync(path.join(pkg, "package.json"), "utf8")).version + "\n");
console.log("standards bundled");
