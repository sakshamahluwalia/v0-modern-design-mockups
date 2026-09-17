# Handoff: template-adding agent

Paste this whole file to an AI agent whose job is to add ONE design template to this repo.
A generator script (`scripts/new-template.mjs`) now does the mechanical wiring — your job is
mostly **design quality**. One template per run.

---

## Your role

Add ONE production-quality, config-driven website template to the mockups library at
`/Users/sakshamahluwalia/Projects/v0-modern-design-mockups` (Vite + React + TS + Tailwind).
Each template renders entirely from a `config` object so it can be reused for any business of
its type. Add exactly one folder: `src/templates/<businessType>/<id>/`. Don't modify shared
files, other templates, `package.json`, or commit.

## Read these first (do not modify)

- `src/templates/README.md` — the contract.
- `src/lib/site-config.ts` — the `SiteConfig` type + `BUSINESS_TYPES` (the 6 valid types).
- `src/lib/registry.ts` — auto-discovery (path is identity; `meta` = `{ industry, label, accent }`).
- A reference template in the target businessType (e.g. `src/templates/professional/lawyer-hartwell/index.tsx`).
- `/Users/sakshamahluwalia/Projects/local-lead-finder/docs/v0-template-prompt.md` — the design
  brief + per-business-type guidance (palettes, lead sections).

## Step 1 — run the generator (it does the wiring for you)

`--business` is validated against `BUSINESS_TYPES`; it refuses if the folder already exists.
Pick `id` as `<industry>-<name>` or the sample business name (e.g. `lawyer-hartwell`).

**If you were given a v0 / Lovable export → Mode B (the normal path):**
```
npm run new-template -- --from <path-to-the-export/app/page.tsx> \
  --business <type> --id <id> [--industry <industry>] [--label "<label>"] [--accent "#hex"]
```
Mode B applies all the mechanical edits automatically (strips `'use client'`, swaps inline
types for `import { SiteConfig } from "@/lib/site-config"`, adds `meta`, renames
`config`→`sampleConfig`, removes `Home()`, removes the desktop center-nav, rewrites a
placeholder `booking.url` → `https://bookme-web.onrender.com/`, rewrites `@/components/ui/*` →
`@/lib/ui/*`). **Read its output** — a skipped step prints a warning you must then handle by
hand (see Step 2).

**From scratch → Mode A (last resort):**
```
npm run new-template -- --business <type> --id <id> [--industry] [--label] [--accent]
```
Mode A writes a **compiling neutral stub**, not a finished design. You must then replace its
look with a visually distinct design per `v0-template-prompt.md` (keep the export contract +
header pattern the stub gives you).

## Step 2 — your job (what the script can't do)

Do NOT hand-redo anything the script already did (meta/sampleConfig wiring, `'use client'`,
`Home()`, desktop-nav removal) **unless Mode B warned it skipped that step.** Focus on:

- **Design quality** — visually distinct from existing templates in that businessType (never a
  recolor). For Mode A, this is the whole design; for Mode B, refine as needed.
- **Fix any Mode-B warnings** — e.g. it couldn't find a desktop `<nav>` (apply the house-style
  header by hand: brand · phone · one CTA, no desktop center links, mobile hamburger keeps the
  list); or shadcn named-import mismatches after the path rewrite (`Accordion` → this repo's
  `FaqAccordion`; `Button` → this repo's `Button`/`ButtonLink`).
- **Contract compliance** — render from `config` ONLY (no hardcoded business identity); hide
  empty sections; booking CTA is a **new-tab link** to `config.booking.url` (no iframe/fetch).
- **`sampleConfig` fully populated** — 6+ services, 3 FAQ, 3 reviews, `hours`, and
  `gallery`/`booking` per the type (Brampton, ON placeholder content).
- Allowed imports: `@/lib/site-config`, `@/lib/cn`, `@/lib/ui/button`, `@/lib/ui/accordion`,
  `lucide-react`. Fonts: `font-sans`/`font-serif`/`font-fraunces`/`font-display`. Imagery:
  gradient panels or `/placeholder.svg?height=H&width=W`. Mobile-first; accessible; honor
  `prefers-reduced-motion`.

## Step 3 — verify (required)

1. `npm run build` passes.
2. `npm run dev -- --port <unused> --strictPort`; open `/?t=<businessType>/<id>`; screenshot
   desktop AND mobile (~390px); iterate at least twice on real issues.
3. Console clean; no hardcoded business strings in the component body (only in `sampleConfig`).
4. Stop the dev server.

## Report

Path created; the command used; any Mode-B warnings and how you resolved them; a 1–10
self-rating + what you'd improve; confirmation the build passes and the template appears in the
registry (the `/` picker lists it).

## Constraints

Only add `src/templates/<businessType>/<id>/`. Do not touch shared files, other templates, or
`package.json`. Do not run git commit.
