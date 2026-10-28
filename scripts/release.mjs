// Publish a version of @bytesphere/ui as a git tag whose root IS the package.
//   npm run release -- 1.0.0
// Teams then install it with:  npm i github:bytesphere-Technologies/ui-standards#v1.0.0
// No registry, no tokens, no CI: it uses the same git access people already have to this repo.
// Env REMOTE overrides the push target (used to test against a local repo).
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version || "")) { console.error("Usage: npm run release -- <x.y.z>"); process.exit(1); }
const run = (cmd, args, cwd = root) => execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

if (run("git", ["status", "--porcelain"])) { console.error("Working tree has uncommitted changes. Commit them first, then release."); process.exit(1); }
const remote = process.env.REMOTE || run("git", ["remote", "get-url", "origin"]);
const tag = `v${version}`;
if (!process.env.REMOTE && run("git", ["ls-remote", "--tags", remote, tag])) { console.error(`${tag} already exists on the remote. Pick a new version.`); process.exit(1); }

// 1. bump the version in the package and bundle the written standard into it
const pkgPath = path.join(root, "packages/ui/package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")); pkg.version = version;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
run("node", ["scripts/build-standards.mjs"], path.join(root, "packages/ui"));

// 2. copy the package (not the monorepo) into a clean folder and commit it as its own root
const tmp = mkdtempSync(path.join(tmpdir(), "bsui-release-"));
cpSync(path.join(root, "packages/ui"), tmp, { recursive: true, filter: (s) => !s.includes("node_modules") });
rmSync(path.join(tmp, "package-lock.json"), { force: true });
// the package scripts that need the monorepo (catalog/tokens/ssr test) are maintainer-only
const out = JSON.parse(readFileSync(path.join(tmp, "package.json"), "utf8")); delete out.scripts; delete out.devDependencies;
writeFileSync(path.join(tmp, "package.json"), JSON.stringify(out, null, 2) + "\n");
run("git", ["init", "-q", "-b", "release"], tmp);
run("git", ["add", "-A"], tmp);
run("git", ["-c", `user.name=${run("git", ["config", "user.name"])}`, "-c", `user.email=${run("git", ["config", "user.email"])}`, "commit", "-q", "-m", `@bytesphere/ui ${version}`], tmp);

// 3. push it as a tag on the repo
run("git", ["push", "-q", remote, `HEAD:refs/tags/${tag}`], tmp);
rmSync(tmp, { recursive: true, force: true });
console.log(`\nReleased ${tag}.\nInstall in a project:\n  npm i github:bytesphere-Technologies/ui-standards#${tag}\n  npx bytesphere-ui init\n\nRemember to commit the version bump in packages/ui/package.json.`);
