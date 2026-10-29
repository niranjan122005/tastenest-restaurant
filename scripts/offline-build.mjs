/**
 * Dependency-light production build used when `npm install` isn't possible
 * (e.g. a sandbox without registry access). With internet use `npm run build` (Vite) instead.
 *
 *   TOOLS=/path/to/node_modules node scripts/offline-build.mjs
 *
 * esbuild bundles the TSX, the Tailwind v4 compiler turns the class names found in src/ into CSS.
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const TOOLS = process.env.TOOLS ?? "/opt/npm-tools/node_modules";
const REACT = process.env.REACT_MODULES ?? "/home/claude/.npm-global/lib/node_modules";
const require = createRequire(path.join(TOOLS, "noop.js"));
const esbuild = require("esbuild");
const { compile } = await import(pathToFileURL(path.join(TOOLS, "tailwindcss/dist/lib.mjs")).href);

const dist = path.join(root, "dist");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });

// ---- 1. JS bundle ------------------------------------------------------------------------------
await esbuild.build({
  entryPoints: [path.join(root, "src/main.tsx")],
  outfile: path.join(dist, "assets/app.js"),
  bundle: true, minify: true, sourcemap: false, format: "esm", target: "es2020",
  jsx: "automatic", nodePaths: [REACT],
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".css": "empty" },
});

// ---- 2. Tailwind CSS ---------------------------------------------------------------------------
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx?|html)$/.test(f.name)) files.push(p);
  }
})(path.join(root, "src"));
files.push(path.join(root, "index.html"));

const candidates = new Set();
for (const f of files) for (const t of fs.readFileSync(f, "utf8").split(/[\s"'`{}<>;]+/)) if (t) candidates.add(t);

const twDir = path.join(TOOLS, "tailwindcss");
const compiler = await compile(fs.readFileSync(path.join(root, "src/index.css"), "utf8"), {
  base: path.join(root, "src"),
  async loadStylesheet(id, base) {
    const file = id === "tailwindcss" ? path.join(twDir, "index.css") : path.resolve(base, id);
    return { path: file, base: path.dirname(file), content: fs.readFileSync(file, "utf8") };
  },
});
let css = compiler.build([...candidates]);
try { css = (await esbuild.transform(css, { loader: "css", minify: true, target: "chrome110" })).code; } catch { /* keep unminified */ }
fs.writeFileSync(path.join(dist, "assets/app.css"), css);

// ---- 3. HTML + static files --------------------------------------------------------------------
fs.cpSync(path.join(root, "public"), dist, { recursive: true });
const html = fs.readFileSync(path.join(root, "index.html"), "utf8")
  .replace('<script type="module" src="/src/main.tsx"></script>', '<link rel="stylesheet" href="/assets/app.css" />\n    <script type="module" src="/assets/app.js"></script>');
fs.writeFileSync(path.join(dist, "index.html"), html);
console.log(`built dist/ — js ${(fs.statSync(path.join(dist, "assets/app.js")).size / 1024).toFixed(0)} KB, css ${(fs.statSync(path.join(dist, "assets/app.css")).size / 1024).toFixed(0)} KB`);
