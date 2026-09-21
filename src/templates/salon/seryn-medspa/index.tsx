import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "med-spa",
  label: "Med-spa & wellness",
  accent: "#6b7f6e",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a med-spa in Brampton, ON                          */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Seryn Skin & Wellness",
    category: "Med-spa & wellness studio",
    phone: "(905) 555-0166",
    tel: "tel:+19055550166",
    address: "300 Main Street North, Suite 210, Brampton, ON L6V 1P8",
    mapsUrl: "https://maps.google.com/?q=300+Main+Street+North+Brampton+ON",
    area: "Brampton, ON",
    rating: 5.0,
    reviewCount: 158,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Wed", value: "10:00 AM – 6:00 PM" },
      { day: "Thu – Fri", value: "10:00 AM – 8:00 PM" },
      { day: "Saturday", value: "9:00 AM – 4:00 PM" },
      { day: "Sunday", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "Considered skincare, in a space made for calm.",
    heroSub:
      "A medical-grade skin and wellness studio in Brampton. Personalised treatments, honest guidance, and results you can see — delivered by clinicians who never rush.",
    about:
      "Seryn was founded by a nurse and an esthetician who believed skincare could be both effective and genuinely restorative. We combine medical-grade technology with a slow, considered approach — no pressure, no gimmicks, just treatments matched carefully to your skin and your goals.\n\nEvery visit begins with a proper consultation and a plan you understand. We'd rather recommend the right treatment than the most expensive one, and it shows in how long our clients stay with us.",
    services: [
      { title: "Signature Facial", desc: "A fully bespoke facial with cleanse, exfoliation, extractions, and a treatment mask selected for your skin.", price: "$135" },
      { title: "Chemical Peel", desc: "A medical-grade resurfacing peel to smooth texture, tone, and fine lines with minimal downtime.", price: "from $160" },
      { title: "Microneedling", desc: "Collagen induction therapy to firm, refine pores, and soften scarring over a treatment course.", price: "$225" },
      { title: "LED Light Therapy", desc: "A calming, non-invasive session to reduce redness and support skin recovery.", price: "$60" },
      { title: "Dermaplaning", desc: "Gentle physical exfoliation for instantly smoother, brighter, makeup-ready skin.", price: "$95" },
      { title: "Lymphatic Facial Massage", desc: "A de-puffing, sculpting massage to boost circulation and leave skin lifted and glowing.", price: "$110" },
      { title: "Skin Consultation", desc: "A 30-minute assessment and personalised plan — credited toward your first treatment.", price: "$40" },
      { title: "Wellness IV Drip", desc: "Clinician-administered hydration and vitamin therapy in our calm treatment lounge.", price: "from $150" },
    ],
    faq: [
      { q: "How do I know which treatment is right for me?", a: "Start with a consultation. We assess your skin, talk through your goals and lifestyle, and build a plan together — often a combination of treatments phased over time rather than a single fix." },
      { q: "Is there downtime after treatments?", a: "It varies. Facials and LED have none, while peels and microneedling may involve a few days of redness or flaking. We'll walk you through exactly what to expect and how to care for your skin afterward." },
      { q: "Are your treatments clinician-led?", a: "Yes. Medical treatments are performed or supervised by our registered nurse, and all esthetic services are delivered by licensed professionals. Your safety and results come first, always." },
    ],
  },
  reviews: [
    { author: "Nadia H.", rating: 5, text: "The most thorough, honest consultation I've ever had. They talked me out of a treatment I didn't need. My skin has never looked better.", relativeTime: "2 weeks ago" },
    { author: "Priyanka M.", rating: 5, text: "The space is beautiful and so calming, but it's the results that keep me coming back. My peel series completely evened out my tone.", relativeTime: "1 month ago" },
    { author: "Rebecca L.", rating: 5, text: "Finally a med-spa that feels clinical in the ways that matter and relaxing in all the others. I trust them completely.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "The treatment lounge" },
    { caption: "Consultation suite" },
    { caption: "Medical-grade skincare" },
    { caption: "Relaxation area" },
    { caption: "Our reception" },
    { caption: "Skin analysis in progress" },
  ],
  booking: {
    enabled: true,
    label: "Book a consultation",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book a consultation", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#6b7f6e] text-[#6b7f6e]" : "fill-transparent text-[#c4cbbf]")} />
      ))}
    </span>
  );
}

function ImageBand({ ratio = "aspect-[16/7]", caption }: { ratio?: string; caption?: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-gradient-to-r from-[#a7b39f] via-[#8a9a86] to-[#6b7f6e]", ratio)}>
      <img src="/placeholder.svg?height=640&width=1600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" />
      {caption && <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 sm:left-8">{caption}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — EDITORIAL: centered masthead, type hero, image bands */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(0);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const aboutParagraphs = (copy.about ?? "").split("\n").filter((p) => p.trim().length > 0);

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl ? { label: booking?.label || "Book an appointment", href: bookingUrl } : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    { label: "Treatments", href: "#services" },
    ...(booking?.enabled ? [{ label: "Booking", href: "#booking" }] : []),
    ...(hasGallery ? [{ label: "Studio", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Visit", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f2ea] font-sans text-[#2f342d] antialiased selection:bg-[#cdd5c3]">
      {/* Masthead — centered editorial header */}
      <header className="border-b border-[#e2e0d3]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href={business.tel} className="hidden items-center gap-1.5 text-xs font-medium tracking-wide text-[#5c6356] transition-colors hover:text-[#2f342d] md:inline-flex">
            <Phone className="h-3.5 w-3.5" /> {business.phone}
          </a>
          <a href="#top" className="flex items-center gap-2.5 md:absolute md:left-1/2 md:-translate-x-1/2">
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#6b7f6e] font-fraunces text-sm font-semibold text-[#4a5d4c]">{initialOf(business.name)}</span>
            <span className="font-fraunces text-lg font-semibold tracking-tight">{business.name}</span>
          </a>
          <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden h-9 items-center justify-center rounded-full bg-[#2f342d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#434a40] md:inline-flex">
            {cta.label}
          </a>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2f342d] hover:bg-[#e7ece2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b7f6e] md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Secondary centered nav (desktop) */}
        <nav aria-label="Primary" className="hidden border-t border-[#e2e0d3] md:block">
          <ul className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5c6356]">
            {nav.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-[#2f342d]">{n.label}</a></li>))}
          </ul>
        </nav>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e2e0d3] px-5 py-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5c6356] hover:bg-[#e7ece2]">{n.label}</a></li>))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e2e0d3] pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#5c6356]"><Phone className="h-4 w-4" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-11 items-center justify-center rounded-full bg-[#2f342d] px-6 text-sm font-semibold text-white">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — type only, centered */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">{business.category} · {business.area}</p>
          <h1 className="mx-auto mt-8 max-w-2xl font-fraunces text-5xl leading-[1.06] tracking-tight text-[#2f342d] sm:text-6xl">{copy.heroHeadline}</h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#5c6356]">{copy.heroSub}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#2f342d] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#434a40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b7f6e] focus-visible:ring-offset-2">
              {cta.label} {ctaExternal && <ArrowUpRight className="h-5 w-5" />}
            </a>
            <a href={business.tel} className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-[#c4cbbf] px-7 py-3.5 text-base font-semibold text-[#2f342d] transition-colors hover:bg-[#e7ece2]">
              <Phone className="h-5 w-5" /> {business.phone}
            </a>
          </div>
          {business.rating != null && (
            <div className="mt-9 inline-flex items-center gap-3 text-sm text-[#5c6356]">
              <Stars rating={business.rating} />
              <span><span className="font-semibold text-[#2f342d]">{business.rating}</span>{business.reviewCount != null && <> · {business.reviewCount} reviews</>}</span>
              <span className="inline-flex items-center gap-1.5 text-[#6b7f6e]"><ShieldCheck className="h-4 w-4" /> Clinician-led</span>
            </div>
          )}
        </section>

        {/* Full-width image band */}
        <ImageBand caption="Inside the studio" />

        {/* Services — numbered editorial list */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">Treatments</p>
              <h2 id="services-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#2f342d] sm:text-5xl">A considered menu of care</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5c6356]">Each treatment is tailored in your consultation — the prices below are starting points, never a hard sell.</p>
            </div>
            <ol className="mx-auto mt-12 max-w-3xl px-5">
              {services.map((s: SiteService, i) => (
                <li key={i} className="flex items-baseline gap-5 border-t border-[#e2e0d3] py-7 last:border-b sm:gap-8">
                  <span className="font-fraunces text-lg text-[#a7b39f]">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-fraunces text-xl text-[#2f342d] sm:text-2xl">{s.title}</h3>
                      {s.price && <span className="shrink-0 whitespace-nowrap font-fraunces text-lg text-[#4a5d4c]">{s.price}</span>}
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c6356]">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Booking — minimal centered */}
        {booking?.enabled && booking.url && (
          <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-20 bg-[#2f342d] py-20 text-[#eef0e9] sm:py-28">
            <div className="mx-auto max-w-2xl px-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a7b39f]">Booking</p>
              <h2 id="booking-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#f4f2ea] sm:text-5xl">Begin with a consultation</h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#c2c9bb]">Choose a treatment to start with, then confirm a time on our booking page. Every plan begins with a proper conversation about your skin.</p>
              <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-2">
                {services.slice(0, 6).map((s, i) => (
                  <button key={i} type="button" onClick={() => setService(i)} aria-pressed={service === i}
                    className={cn("rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a7b39f]",
                      service === i ? "border-[#a7b39f] bg-[#a7b39f] text-[#2f342d]" : "border-[#4c5348] text-[#c2c9bb] hover:border-[#6b7f6e]")}>
                    {s.title}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#c2c9bb]">Starting with <span className="font-semibold text-[#f4f2ea]">{services[service]?.title ?? "—"}</span>{services[service]?.price && <> · from <span className="font-semibold text-[#a7b39f]">{services[service].price}</span></>}</p>
              <a href={booking.url} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#f4f2ea] px-8 py-3.5 text-base font-semibold text-[#2f342d] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a7b39f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2f342d]">
                {booking.label || "Book an appointment"} <ArrowUpRight className="h-5 w-5" />
              </a>
              <p className="mt-3 text-xs text-[#8a9884]">Opens our booking page in a new tab.</p>
            </div>
          </section>
        )}

        {/* About — narrow centered + image band */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-2xl px-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">Our story</p>
              <h2 id="about-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#2f342d] sm:text-5xl">Effective and restorative, in equal measure</h2>
              <div className="mt-6 space-y-4 text-left text-base leading-relaxed text-[#5c6356] sm:text-center">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </div>
            {hasGallery && (
              <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 px-5 sm:grid-cols-3">
                {gallery!.slice(0, 3).map((g, i) => (
                  <figure key={i} className="group relative overflow-hidden rounded-2xl bg-[#6b7f6e]">
                    <img src="/placeholder.svg?height=420&width=420" alt="" aria-hidden="true" className="aspect-[4/5] w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Gallery band */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-20">
            <h2 id="gallery-heading" className="sr-only">Studio gallery</h2>
            <div className="grid grid-cols-2 gap-0 sm:grid-cols-3">
              {gallery!.map((g, i) => (
                <figure key={i} className="group relative overflow-hidden bg-[#6b7f6e]">
                  <img src="/placeholder.svg?height=480&width=480" alt="" aria-hidden="true" className="aspect-square w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 text-xs font-medium uppercase tracking-[0.15em] text-white/90">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Reviews — large centered pull quotes */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 border-t border-[#e2e0d3] py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">Kind words</p>
              <h2 id="reviews-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#2f342d] sm:text-5xl">Trusted by our clients</h2>
            </div>
            <div className="mx-auto mt-14 max-w-4xl space-y-14 px-5">
              {reviews.map((r, i) => (
                <blockquote key={i} className="text-center">
                  <Stars rating={r.rating} className="justify-center" />
                  <p className="mx-auto mt-5 max-w-2xl font-fraunces text-2xl leading-snug text-[#3a3f37] sm:text-3xl">"{r.text}"</p>
                  <footer className="mt-5 text-sm"><span className="font-semibold text-[#2f342d]">{r.author}</span><span className="ml-2 text-[#7a8274]">{r.relativeTime}</span></footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-[#e2e0d3] py-20 sm:py-28">
            <div className="mx-auto max-w-2xl px-5">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">Good to know</p>
                <h2 id="faq-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#2f342d] sm:text-5xl">Questions, answered</h2>
              </div>
              <div className="mt-10 border-t border-[#e2e0d3]"><FaqAccordion items={faqs} className="divide-[#e2e0d3]" /></div>
            </div>
          </section>
        )}

        {/* Contact — centered stacked */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-[#e2e0d3] py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a9884]">Visit us</p>
            <h2 id="contact-heading" className="mt-4 font-fraunces text-4xl leading-tight text-[#2f342d] sm:text-5xl">Come see us</h2>
            <div className="mt-12 grid gap-8 text-left sm:grid-cols-3 sm:text-center">
              <div>
                <MapPin className="mx-auto h-5 w-5 text-[#6b7f6e]" aria-hidden="true" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#8a9884]">Address</p>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3f37]">{business.address}</p>
                {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#6b7f6e] hover:text-[#4a5d4c]">Directions <ArrowUpRight className="h-4 w-4" /></a>}
              </div>
              <div>
                <Phone className="mx-auto h-5 w-5 text-[#6b7f6e]" aria-hidden="true" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#8a9884]">Phone</p>
                <p className="mt-2 text-sm"><a href={business.tel} className="text-[#3a3f37] hover:text-[#6b7f6e]">{business.phone}</a></p>
              </div>
              {hasHours && (
                <div>
                  <Clock className="mx-auto h-5 w-5 text-[#6b7f6e]" aria-hidden="true" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#8a9884]">Hours</p>
                  <ul className="mt-2 space-y-1 text-sm text-[#3a3f37]">
                    {business.hours!.map((h, i) => (<li key={i}><span className="text-[#5c6356]">{h.day}:</span> {h.value}</li>))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2f342d] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#434a40]">{booking?.label || "Book an appointment"} <ArrowUpRight className="h-4 w-4" /></a>}
              <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#c4cbbf] px-7 text-sm font-semibold text-[#2f342d] transition-colors hover:bg-[#e7ece2]"><Phone className="h-4 w-4" /> Call us</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e2e0d3] bg-[#2f342d] text-[#c2c9bb]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-12 text-center">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6b7f6e] font-fraunces text-base font-semibold text-[#a7b39f]">{initialOf(business.name)}</span>
            <span className="font-fraunces text-lg font-semibold text-[#f4f2ea]">{business.name}</span>
          </div>
          <p className="text-sm">{business.category} · {business.area}</p>
          <a href={business.tel} className="text-sm font-medium hover:text-[#f4f2ea]">{business.phone}</a>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs text-[#8a9884]">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
