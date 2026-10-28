// Run: npm run test:ssr   Proves every component module loads on the server (Node, no browser), as Next.js does,
// and that a few render to HTML. A component that touches window/document/localStorage at import time fails here.
import { createServer } from "vite";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../apps/showcase");
const dir = path.resolve(here, "../src");
const vite = await createServer({ root, logLevel: "error", server: { middlewareMode: true }, appType: "custom" });
const failures = [];
try {
  const { renderToString } = await import("react-dom/server");
  const React = (await import("react")).default;
  for (const d of readdirSync(`${dir}/components`)) {
    try { await vite.ssrLoadModule(`${dir}/components/${d}/index.tsx`); } catch (e) { failures.push(`${d}: ${e.message.split("\n")[0]}`); }
  }
  const ui = await vite.ssrLoadModule(`${dir}/index.ts`);
  const h = React.createElement;
  const cases = {
    Button: () => h(ui.Button, { variant: "primary" }, "Save"),
    Card: () => h(ui.Card, null, h(ui.CardHeader, { title: "Title" })),
    Logo: () => h(ui.Logo, null),
    Field: () => h(ui.Field, { id: "a", label: "Name", hint: "Plain children work in server components" }, h(ui.Input, null)),
    StatusPill: () => h(ui.StatusPill, { tone: "success" }, "Active"),
    Avatar: () => h(ui.Avatar, { id: "u1", name: "Mia Moreno" }),
    AppearancePanel: () => h(ui.AppearancePanel, null),
    AppearanceScript: () => h(ui.AppearanceScript, null),
  };
  for (const [name, make] of Object.entries(cases)) {
    try { const html = renderToString(make()); if (!html.length) failures.push(`${name}: rendered nothing`); if (name === "Field" && !html.includes('id="a"')) failures.push("Field: input did not receive the id from Field"); } catch (e) { failures.push(`render ${name}: ${e.message.split("\n")[0]}`); }
  }
} finally { await vite.close(); }
if (failures.length) { console.error("SSR failures:\n" + failures.join("\n")); process.exit(1); }
console.log("ssr: every component module loads on the server and the sample components render");
