// Copies the Style Dictionary output (../02-tokens/dist/css) into src/tokens.css with a --t- prefix,
// so Tailwind's @theme aliases (bg-surface-raised, rounded-card…) never collide with the token variables.
// Build tokens first:  cd ../02-tokens && node build.mjs   (see 02-tokens/README.md)
import { readFileSync, writeFileSync } from "node:fs";
const dir = new URL("../../../docs/02-tokens/dist/css/", import.meta.url);
const prim = readFileSync(new URL("primitives.css", dir), "utf8");
const sem = readFileSync(new URL("tokens.css", dir), "utf8").replace(/@import[^\n]*\n/, "");
const out = (prim + "\n" + sem).replace(/^(\s*)--/gm, "$1--t-").replace(/var\(--/g, "var(--t-");
writeFileSync(new URL("../src/styles/tokens.css", import.meta.url), out);
console.log("wrote src/styles/tokens.css");
