/**
 * The single data contract every template renders from. Mirrors
 * local-lead-finder's `SiteConfig` (template/accountant/lib/site-config.ts) plus
 * the optional `price`, `hours`, `gallery`, `booking`, `primaryCta` fields these
 * templates add. Keep this in sync — it is the drop-in surface.
 */

export type SiteService = { title: string; desc: string; price?: string };
export type SiteFaq = { q: string; a: string };
export type SiteReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};
export type SiteHour = { day: string; value: string };
export type SiteGalleryItem = { caption: string };
export type SiteBooking = { enabled: boolean; label?: string; url?: string };
export type SiteCta = { label: string; href: string };

export type SiteConfig = {
  business: {
    name: string;
    category: string;
    phone: string;
    tel: string;
    address: string;
    mapsUrl: string;
    area: string;
    rating: number | null;
    reviewCount: number | null;
    hours?: SiteHour[];
  };
  copy: {
    heroHeadline: string;
    heroSub: string;
    about: string;
    services: SiteService[];
    faq: SiteFaq[];
  };
  reviews: SiteReview[];
  gallery?: SiteGalleryItem[];
  booking?: SiteBooking;
  primaryCta?: SiteCta;
};

/**
 * Each template folder's index.tsx must export this shape. It lives at
 * src/templates/<businessType>/<id>/index.tsx — businessType and id are derived
 * from the path (not declared in meta), so adding a template is just dropping a
 * folder. `industry` is the finer-grained tag (e.g. "lawyer" vs "accountant",
 * both under businessType "professional").
 */
export type TemplateModule = {
  meta: { industry: string; label: string; accent?: string };
  sampleConfig: SiteConfig;
  default: (props: { config: SiteConfig }) => JSX.Element;
};

/** The 6 fixed scope-tool business types (the top-level template folders). */
export const BUSINESS_TYPES = [
  "salon",
  "trades",
  "restaurant",
  "clinic",
  "professional",
  "other",
] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export function initialOf(name: string): string {
  const ch = String(name || "").trim().charAt(0);
  return ch ? ch.toUpperCase() : "•";
}
