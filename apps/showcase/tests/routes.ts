import { readFileSync } from "node:fs";

/** Every route id, read from the registry source so tests never go stale. */
export function routes(): string[] {
  const reg = readFileSync("src/registry.tsx", "utf8");
  const ids = new Set<string>();
  for (const m of reg.matchAll(/(?:\bid: "|\b(?:bill|co|ap|adm|mp)\(")([a-z0-9/-]+)"/g)) ids.add(m[1]);
  const st = readFileSync("src/data/status.ts", "utf8");
  for (const m of st.matchAll(/slug: "([a-z0-9-]+)"/g)) ids.add(`status/${m[1]}`);
  ids.delete("explorer");
  return [...ids].sort();
}
/** Pages that are full-bleed marketing or error layouts and have their own landmarks. */
export const appearances = [{ name: "light", q: "theme=light" }, { name: "dark-midnight", q: "theme=dark&dark=midnight" }, { name: "dark-ocean", q: "theme=dark&dark=ocean" }];
