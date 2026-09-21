import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Leaf,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "landscaping",
  label: "Landscaping & lawn care",
  accent: "#3a6b3e",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a landscaper in Brampton, ON                       */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Cedar & Stone Landscaping",
    category: "Landscaping & lawn care",
    phone: "(905) 555-0154",
    tel: "tel:+19055550154",
    address: "1420 Steeles Avenue East, Brampton, ON L6T 1A5",
    mapsUrl: "https://maps.google.com/?q=1420+Steeles+Avenue+East+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 176,
    hours: [
      { day: "Mon – Fri", value: "7:00 AM – 7:00 PM" },
      { day: "Saturday", value: "8:00 AM – 5:00 PM" },
      { day: "Sunday", value: "Closed" },
      { day: "Season", value: "April – November" },
    ],
  },
  copy: {
    heroHeadline: "Outdoor spaces you'll actually want to live in.",
    heroSub:
      "Full-service landscape design, build, and maintenance across Brampton. From patios and gardens to weekly lawn care — thoughtful work that grows more beautiful every season.",
    about:
      "Cedar & Stone began with a wheelbarrow, a pickup, and a love of getting our hands dirty. Two decades on, we're a full design-build team — but the philosophy hasn't changed: work with the land, use quality materials, and treat every yard like it's our own.\n\nWe handle everything from the first sketch to the last plant, and we're there for the seasons that follow. No subcontractor runaround, just one team that stands behind the whole project.",
    services: [
      { title: "Landscape Design", desc: "A full plan for your yard — layout, planting, materials, and a clear budget.", price: "from $500" },
      { title: "Patios & Interlock", desc: "Stone patios, walkways, and driveways built to last through our winters.", price: "Free quote" },
      { title: "Garden & Planting", desc: "Beds, borders, trees, and native plantings designed for year-round interest.", price: "Free quote" },
      { title: "Lawn Care Programs", desc: "Weekly mowing, edging, fertilising, and seasonal cleanups on a schedule.", price: "from $45/visit" },
      { title: "Retaining Walls", desc: "Engineered walls that manage slopes and add usable, terraced space.", price: "Free quote" },
      { title: "Decks & Pergolas", desc: "Custom-built structures that extend your living space outdoors.", price: "Free quote" },
      { title: "Sod & Grading", desc: "Fresh sod, regrading, and drainage solutions for a healthy, level lawn.", price: "from $2/sq ft" },
      { title: "Spring & Fall Cleanup", desc: "Get your yard ready for the season with a thorough one-time cleanup.", price: "from $220" },
    ],
    faq: [
      { q: "Do you offer free estimates?", a: "Yes. For most builds and installs we'll visit your property, talk through what you're after, and provide a detailed written estimate at no charge. Design work is quoted separately and credited toward the build." },
      { q: "When is the best time to start a project?", a: "We design year-round and build from spring through late fall. Booking your design over the winter means you're first in line when the season opens — the calendar fills quickly by March." },
      { q: "Do you handle maintenance after the build?", a: "Absolutely. Many clients keep us on for weekly or seasonal maintenance so the investment keeps looking its best. We'll tailor a program to your yard and budget." },
    ],
  },
  reviews: [
    { author: "The Nguyen Family", rating: 5, text: "They transformed a muddy, sloped backyard into a terraced garden with a stone patio. We use it every single evening now. Worth every penny.", relativeTime: "1 month ago" },
    { author: "Sandra V.", rating: 5, text: "Reliable weekly lawn care that actually shows up. The yard has never looked better and the crew is friendly and tidy.", relativeTime: "2 months ago" },
    { author: "Marcus & Jill", rating: 5, text: "From the first design sketch to the final plant, they were professional and creative. Neighbours keep asking who did our yard.", relativeTime: "3 months ago" },
  ],
  gallery: [
    { caption: "Backyard patio & garden" },
    { caption: "Terraced retaining wall" },
    { caption: "Front-yard interlock" },
    { caption: "Native pollinator garden" },
    { caption: "Cedar pergola & deck" },
    { caption: "Full lawn renovation" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Get a free estimate", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#e0a458] text-[#e0a458]" : "fill-transparent text-white/40")} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — FULL-BLEED image hero, before/after, image bands    */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const aboutParagraphs = (copy.about ?? "").split("\n").filter((p) => p.trim().length > 0);

  const cta = primaryCta ?? { label: "Get a free estimate", href: "#contact" };
  const ctaExternal = cta.href.startsWith("http");

  // Pair gallery items into before/after projects.
  const pairs: { caption: string }[][] = [];
  for (let i = 0; i + 1 < (gallery?.length ?? 0); i += 2) pairs.push([gallery![i], gallery![i + 1]]);

  const nav = [
    { label: "Services", href: "#services" },
    ...(hasGallery ? [{ label: "Projects", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Estimate", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f3ec] font-sans text-[#23301f] antialiased selection:bg-[#c9dfc0]">
      {/* Header — translucent forest bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#23301f]/90 text-[#f0efe4] backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a6b3e] font-fraunces text-base font-semibold text-white">{initialOf(business.name)}</span>
            <span className="font-fraunces text-lg font-semibold tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-4 lg:flex">
            <a href={business.tel} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d3d8c8] transition-colors hover:text-white"><Phone className="h-4 w-4" /> {business.phone}</a>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#e0a458] px-5 text-sm font-semibold text-[#23301f] transition-colors hover:bg-[#eab873] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a458] focus-visible:ring-offset-2 focus-visible:ring-offset-[#23301f]">{cta.label}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a458] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-white/10 bg-[#23301f] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#d3d8c8] hover:bg-white/10 hover:text-white">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#d3d8c8]"><Phone className="h-4 w-4" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-full bg-[#e0a458] px-6 text-sm font-semibold text-[#23301f]">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — full-bleed image with overlay */}
        <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3a6b3e] via-[#2f5233] to-[#1c2b1a]">
            <img src="/placeholder.svg?height=1000&width=1600" alt="" className="h-full w-full object-cover opacity-45 mix-blend-luminosity" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#141f12] via-[#141f12]/40 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur"><Leaf className="h-3.5 w-3.5" /> {business.category} · {business.area}</span>
            <h1 className="mt-6 max-w-3xl font-fraunces text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">{copy.heroHeadline}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#e6e9dd]">{copy.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#e0a458] px-8 text-base font-semibold text-[#23301f] transition-colors hover:bg-[#eab873] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0a458] focus-visible:ring-offset-2 focus-visible:ring-offset-[#23301f]">{cta.label} <ArrowRight className="h-5 w-5" /></a>
              <a href={business.tel} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"><Phone className="h-5 w-5" /> {business.phone}</a>
            </div>
            {business.rating != null && (
              <div className="mt-8 flex items-center gap-3 text-sm text-[#e6e9dd]"><Stars rating={business.rating} /><span><span className="font-semibold text-white">{business.rating}</span>{business.reviewCount != null && <> · {business.reviewCount} happy homeowners</>}</span></div>
            )}
          </div>
        </section>

        {/* Services — image-top cards */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a6b3e]"><Sprout className="h-3.5 w-3.5" /> What we do</p>
                <h2 id="services-heading" className="mt-3 font-fraunces text-4xl leading-tight sm:text-5xl">Design, build &amp; maintain</h2>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article key={i} className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2ded2] bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="h-36 overflow-hidden bg-gradient-to-br from-[#6f9a5f] to-[#3a6b3e]"><img src="/placeholder.svg?height=220&width=360" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" /></div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3"><h3 className="font-fraunces text-xl">{s.title}</h3>{s.price && <span className="shrink-0 rounded-full bg-[#eef3e7] px-3 py-1 text-xs font-semibold text-[#3a6b3e]">{s.price}</span>}</div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a6553]">{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Before / After */}
        {pairs.length > 0 && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 bg-[#23301f] py-20 text-[#f0efe4] sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#e0a458]"><Leaf className="h-3.5 w-3.5" /> Recent projects</p>
                <h2 id="gallery-heading" className="mt-3 font-fraunces text-4xl leading-tight text-white sm:text-5xl">Before &amp; after</h2>
              </div>
              <div className="mt-12 space-y-10">
                {pairs.map((pair, i) => (
                  <div key={i}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {pair.map((g, j) => (
                        <figure key={j} className="relative overflow-hidden rounded-2xl bg-[#2f5233]">
                          <img src="/placeholder.svg?height=440&width=640" alt="" aria-hidden="true" className="aspect-[16/10] w-full object-cover opacity-75 mix-blend-luminosity" />
                          <figcaption className="absolute left-3 top-3 rounded-full bg-[#141f12]/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">{j === 0 ? "Before" : "After"}</figcaption>
                        </figure>
                      ))}
                    </div>
                    <p className="mt-3 font-fraunces text-lg text-[#d3d8c8]">{pair[1]?.caption ?? pair[0]?.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Seasonal image band + estimate CTA */}
        <section aria-label="Book your project" className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3a6b3e] to-[#2f5233]"><img src="/placeholder.svg?height=520&width=1600" alt="" className="h-full w-full object-cover opacity-30 mix-blend-luminosity" /></div>
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-fraunces text-3xl leading-tight sm:text-4xl">Planning a project this season?</h2>
              <p className="mt-2 max-w-xl text-[#e6e9dd]">Book your design over the off-season and be first in line when the season opens.</p>
            </div>
            <a href="#contact" className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e0a458] px-8 text-base font-semibold text-[#23301f] transition-colors hover:bg-[#eab873]">Get a free estimate <ArrowRight className="h-5 w-5" /></a>
          </div>
        </section>

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a6b3e]"><Sprout className="h-3.5 w-3.5" /> Our story</p>
                <h2 id="about-heading" className="mt-3 font-fraunces text-4xl leading-tight sm:text-5xl">One team, start to finish</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5a6553]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-[#3a6b3e]">
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Fully insured</span>
                  <span className="inline-flex items-center gap-1.5"><Leaf className="h-4 w-4" /> 20+ years</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4" /> {business.rating} rating</span>
                </div>
              </div>
              <div className="relative order-first lg:order-last"><div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6f9a5f] to-[#2f5233]"><img src="/placeholder.svg?height=620&width=560" alt="" aria-hidden="true" className="aspect-[4/5] w-full object-cover opacity-85 mix-blend-luminosity" /></div></div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 bg-[#eef0e6] py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl"><p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a6b3e]"><Star className="h-3.5 w-3.5" /> Kind words</p><h2 id="reviews-heading" className="mt-3 font-fraunces text-4xl leading-tight sm:text-5xl">Neighbours who trust us</h2></div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"><Stars rating={r.rating} className="[&_svg]:fill-[#3a6b3e] [&_svg]:text-[#3a6b3e]" /><p className="mt-4 flex-1 font-fraunces text-lg leading-relaxed text-[#33402d]">"{r.text}"</p><footer className="mt-5 border-t border-[#e2ded2] pt-4 text-sm"><span className="font-semibold text-[#23301f]">{r.author}</span><span className="ml-2 text-[#7a8473]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a6b3e]"><Leaf className="h-3.5 w-3.5" /> Good to know</p><h2 id="faq-heading" className="mt-3 font-fraunces text-4xl leading-tight sm:text-5xl">Questions</h2></div>
              <div className="rounded-2xl border border-[#e2ded2] bg-white px-6 shadow-sm"><FaqAccordion items={faqs} className="divide-[#e2ded2]" /></div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#e2ded2] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#3a6b3e]"><MapPin className="h-3.5 w-3.5" /> Get a free estimate</p>
                  <h2 id="contact-heading" className="mt-3 font-fraunces text-4xl leading-tight sm:text-5xl">Let's plan your yard</h2>
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#3a6b3e]" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-[#7a8473]">Yard &amp; office</dt><dd className="mt-1 text-sm leading-relaxed text-[#33402d]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#3a6b3e] hover:text-[#2f5233]">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                    <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#3a6b3e]" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-[#7a8473]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#33402d] hover:text-[#3a6b3e]">{business.phone}</a></dd></div></div>
                    {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#3a6b3e]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-semibold uppercase tracking-wider text-[#7a8473]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#e2ded2] pb-1.5 last:border-0"><span className="text-[#5a6553]">{h.day}</span><span className="font-medium text-[#23301f]">{h.value}</span></li>))}</ul></dd></div></div>)}
                  </dl>
                  <a href={business.tel} className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#3a6b3e] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#2f5233]"><Phone className="h-4 w-4" /> Call for your estimate</a>
                </div>
                <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[300px] bg-gradient-to-br from-[#6f9a5f] to-[#2f5233]"><img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-70 mix-blend-luminosity" /><span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#23301f] shadow-lg backdrop-blur transition-transform group-hover:scale-105"><MapPin className="h-4 w-4 text-[#3a6b3e]" /> {business.area}</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#23301f] text-[#d3d8c8]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5"><span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a6b3e] font-fraunces text-base font-semibold text-white">{initialOf(business.name)}</span><span className="font-fraunces text-lg font-semibold text-white">{business.name}</span></div>
              <p className="mt-4 text-sm leading-relaxed">{business.category} in {business.area}.</p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> {business.phone}</a>
              {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MapPin className="h-4 w-4" /> {business.address}</a>}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8a9480] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p><p>{business.area}</p></div>
        </div>
      </footer>
    </div>
  );
}
