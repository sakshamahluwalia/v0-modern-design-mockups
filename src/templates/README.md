# Templates — the contract

Templates live at **`src/templates/<businessType>/<id>/index.tsx`**. There can be **any
number per businessType** (aim for 3+). The folder path carries the identity — no central
list to edit:

- `<businessType>` = one of the 6 fixed scope-tool answers:
  `salon · trades · restaurant · clinic · professional · other`.
- `<id>` = a unique short name for this design (often the sample business, e.g. `meridian`,
  or `<industry>-<name>`).

`index.tsx` exports exactly:

```ts
import type { SiteConfig } from "@/lib/site-config";

// businessType + id come from the PATH, not meta. `industry` is the finer tag
// (e.g. "lawyer" vs "accountant", both under businessType "professional").
export const meta = { industry: "accountant", label: "Accounting & advisory", accent: "#4f46e5" };

export const sampleConfig: SiteConfig = { /* fully populated — see below */ };

export default function SiteTemplate({ config }: { config: SiteConfig }) { /* ... */ }
```

The registry (`src/lib/registry.ts`) auto-discovers folders via glob and the harness
(`src/App.tsx`) lists them — **do not edit any shared file** to add one. Open your template
full-bleed (for screenshots) at `/?t=<businessType>/<id>`, e.g. `/?t=professional/meridian`.

## Adding a template

Use the generator — it does the wiring (see `docs/adding-templates-agent.md` for the full
flow). From a v0/Lovable export:

```
npm run new-template -- --from <export>/app/page.tsx --business professional --id lawyer-<name> --industry lawyer
```

Or scaffold a stub from scratch (then replace its look):

```
npm run new-template -- --business <businessType> --id <id> --industry <industry>
```

Then `npm run dev` → open `/?t=<businessType>/<id>`, address any warnings the script printed,
polish the design, and verify at desktop + mobile. No other file changes needed; the registry
discovers it automatically.

## Rules (from `local-lead-finder/docs/v0-template-prompt.md` — the source of truth)

- Render from `config` ONLY. No hardcoded business names, copy, phone, or address.
- If an array is empty or a string blank, **hide that section** — never show blanks.
- Mobile-first, accessible (landmarks, focus states, aria on icon buttons), honor
  `prefers-reduced-motion`.
- Self-contained: **no data fetching, no API calls, no router.**
- One default export `SiteTemplate({ config })`.
- `sampleConfig` must be fully populated (6+ services, 3 FAQ, 3 reviews, hours, plus
  `booking`/`gallery` where the per-type block calls for it) so the preview looks complete.

## What you may import

- `@/lib/site-config` — the `SiteConfig` type + `initialOf()`.
- `@/lib/cn` — `cn()` class merger.
- `@/lib/ui/button` — `Button`, `ButtonLink` (optional).
- `@/lib/ui/accordion` — `FaqAccordion` (optional).
- `lucide-react` icons. Fonts available: `font-sans` (Inter), `font-serif` (Playfair),
  `font-fraunces`, `font-display` (Sora).
- Placeholder imagery: gradient panels, or `/placeholder.svg?height=H&width=W` (Vite serves
  `public/placeholder.svg`). Never leave a broken/empty image.

## Booking

Where `booking.enabled`, render a booking section whose primary action is a CTA link to
`config.booking.url` (`target="_blank" rel="noopener noreferrer"`, label from
`config.booking.label` || "Book an appointment"). **No iframe, no fetch.**

## The six business types

salon · trades · restaurant · clinic · professional · other — see the per-type blocks in
`local-lead-finder/docs/v0-template-prompt.md`. Each may hold many templates (different
industries and design variants); the scope tool rotates 3 per businessType via
`pickN()` in `src/lib/registry.ts`.
