#!/usr/bin/env node
// Generate public/manifest.json from the template folders.
//
// The widget (professionals repo) fetches this to learn which templates exist
// per businessType — so adding a template is a redeploy, never a widget change.
// Runs standalone (no Vite), so it can't use registry.ts's import.meta.glob;
// it scans the filesystem and reads each template's `export const meta` instead.
//
//   node scripts/gen-manifest.mjs   (also runs automatically before `vite build`)

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const templatesDir = join(root, "src", "templates");
const outFile = join(root, "public", "manifest.json");

const field = (metaBody, name) => {
  const m = metaBody.match(new RegExp(`${name}\\s*:\\s*['"]([^'"]+)['"]`));
  return m ? m[1] : undefined;
};

const entries = [];
for (const businessType of readdirSync(templatesDir, { withFileTypes: true })) {
  if (!businessType.isDirectory()) continue;
  const btDir = join(templatesDir, businessType.name);
  for (const tpl of readdirSync(btDir, { withFileTypes: true })) {
    if (!tpl.isDirectory()) continue;
    const indexPath = join(btDir, tpl.name, "index.tsx");
    if (!existsSync(indexPath)) continue;
    const src = readFileSync(indexPath, "utf8");
    const metaMatch = src.match(/export\s+const\s+meta\s*=\s*\{([\s\S]*?)\}/);
    if (!metaMatch) {
      console.warn(`  ! ${businessType.name}/${tpl.name}: no meta export — skipped`);
      continue;
    }
    const body = metaMatch[1];
    entries.push({
      key: `${businessType.name}/${tpl.name}`,
      businessType: businessType.name,
      id: tpl.name,
      industry: field(body, "industry") ?? tpl.name,
      label: field(body, "label") ?? tpl.name,
      accent: field(body, "accent") ?? null,
    });
  }
}

entries.sort((a, b) => a.key.localeCompare(b.key));

if (!existsSync(dirname(outFile))) mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(entries, null, 2) + "\n");
console.log(`✓ manifest.json — ${entries.length} template(s)`);
for (const e of entries) console.log(`  ${e.key}  (${e.industry})`);
