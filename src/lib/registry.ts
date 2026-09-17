import type { SiteConfig, TemplateModule, BusinessType } from "@/lib/site-config";

/**
 * Template registry. Auto-discovers every
 * `src/templates/<businessType>/<id>/index.tsx` — no central list to maintain,
 * so adding a template is just dropping a folder. businessType and id come from
 * the path; industry/label/accent come from the module's `meta`.
 *
 * This is the surface the scope tool + local-lead-finder consume: given a
 * businessType, `templatesFor()` returns every design that can serve it, and
 * `pickThree()` rotates a stable trio for the widget's "3 directions".
 */

export type TemplateEntry = {
  businessType: BusinessType;
  id: string;
  key: string; // `${businessType}/${id}` — globally unique
  industry: string;
  label: string;
  accent?: string;
  Component: (props: { config: SiteConfig }) => JSX.Element;
  sampleConfig: SiteConfig;
};

const modules = import.meta.glob<TemplateModule>("../templates/*/*/index.tsx", {
  eager: true,
});

export const templates: TemplateEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    // ../templates/<businessType>/<id>/index.tsx
    const parts = path.split("/");
    const id = parts[parts.length - 2];
    const businessType = parts[parts.length - 3] as BusinessType;
    if (typeof mod?.default !== "function" || !mod?.sampleConfig) return null;
    return {
      businessType,
      id,
      key: `${businessType}/${id}`,
      industry: mod.meta?.industry ?? id,
      label: mod.meta?.label ?? id,
      accent: mod.meta?.accent,
      Component: mod.default,
      sampleConfig: mod.sampleConfig,
    } satisfies TemplateEntry;
  })
  .filter((t): t is TemplateEntry => t !== null)
  .sort((a, b) => a.key.localeCompare(b.key));

export function getTemplate(key: string): TemplateEntry | undefined {
  return templates.find((t) => t.key === key);
}

export function templatesFor(businessType: string): TemplateEntry[] {
  return templates.filter((t) => t.businessType === businessType);
}

/** Distinct businessTypes that actually have at least one template. */
export function businessTypesPresent(): BusinessType[] {
  return [...new Set(templates.map((t) => t.businessType))];
}

/**
 * Deterministic rotation: pick up to `count` templates for a businessType,
 * ordered by a numeric `seed` so the same seed yields the same trio (stable
 * within a session) but different seeds rotate through the full collection.
 * When there are `count` or fewer templates, returns them all.
 */
export function pickN(businessType: string, seed = 0, count = 3): TemplateEntry[] {
  const pool = templatesFor(businessType);
  if (pool.length <= count) return pool;
  const start = ((Math.floor(seed) % pool.length) + pool.length) % pool.length;
  return Array.from({ length: count }, (_, i) => pool[(start + i) % pool.length]);
}
