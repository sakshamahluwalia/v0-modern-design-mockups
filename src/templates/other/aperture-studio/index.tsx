import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Menu,
  X,
  Camera,
  Aperture,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "photography-studio",
  label: "Photography studio",
  accent: "#b08968",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a photography studio in Brampton, ON               */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Aperture & Co. Studio",
    category: "Portrait & wedding photography",
    phone: "(905) 555-0146",
    tel: "tel:+19055550146",
    address: "24 Nelson Street West, Studio 3, Brampton, ON L6X 1B7",
    mapsUrl: "https://maps.google.com/?q=24+Nelson+Street+West+Brampton+ON",
    area: "Brampton, ON",
    rating: 5.0,
    reviewCount: 129,
    hours: [
      { day: "Tue – Fri", value: "10:00 AM – 6:00 PM" },
      { day: "Saturday", value: "By appointment" },
      { day: "Sun – Mon", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "Photographs you'll still love in thirty years.",
    heroSub:
      "A portrait and wedding studio in Brampton with a quiet, unhurried approach — natural light, honest moments, and images made to be printed, not just scrolled past.",
    about:
      "Aperture & Co. is a small studio led by a photographer who believes the best pictures happen when you forget the camera is there. No stiff poses, no rushing — just space for the real moments to show up.\n\nWe shoot on both digital and film, deliver beautifully edited galleries, and help you turn your favourites into prints and albums you'll actually hold. Every session is limited so you get our full attention, start to finish.",
    services: [
      { title: "Portrait Session", desc: "An hour in studio or on location for individuals, couples, or creatives.", price: "from $350" },
      { title: "Family & Newborn", desc: "Relaxed sessions with plenty of patience for the little ones.", price: "from $400" },
      { title: "Wedding Collection", desc: "Full-day coverage, a second shooter, and a heirloom gallery.", price: "from $2,800" },
      { title: "Engagement Shoot", desc: "A laid-back session to celebrate — and to warm up before the big day.", price: "from $450" },
      { title: "Branding & Headshots", desc: "Polished, on-brand imagery for you, your team, or your business.", price: "from $300" },
      { title: "Event Coverage", desc: "Milestones, parties, and corporate events documented naturally.", price: "from $650" },
      { title: "Film Add-On", desc: "A roll or two of 35mm for that timeless, grain-and-all feel.", price: "from $120" },
      { title: "Prints & Albums", desc: "Museum-grade prints and hand-bound albums of your favourites.", price: "Custom" },
    ],
    faq: [
      { q: "How far in advance should I book?", a: "For portraits, two to four weeks is usually plenty. Weddings and peak-season dates book up months ahead — often a year for popular Saturdays — so reach out as early as you can to secure your date." },
      { q: "When will I get my photos?", a: "Portrait galleries are delivered within two weeks, weddings within six to eight. You'll get a sneak peek within a few days, and every image is individually edited — no batch filters." },
      { q: "Do we get the print rights?", a: "Yes. Your collection includes a personal print release so you can print freely, and we also offer museum-grade prints and albums if you'd like us to handle it beautifully for you." },
    ],
  },
  reviews: [
    { author: "Aisha & Ren", rating: 5, text: "Our wedding photos are beyond anything we imagined. They captured moments we didn't even know happened. We cried looking through the gallery.", relativeTime: "1 month ago" },
    { author: "The Okafor Family", rating: 5, text: "So patient with our toddler and newborn. The session felt easy and fun, and the prints are now all over our walls. Absolutely worth it.", relativeTime: "2 months ago" },
    { author: "Daniel V.", rating: 5, text: "Needed headshots for my business and got images I'm genuinely proud of. Calm, professional, and a great eye. Highly recommend.", relativeTime: "3 months ago" },
  ],
  gallery: [
    { caption: "Golden-hour couple" },
    { caption: "Studio portrait" },
    { caption: "Newborn on film" },
    { caption: "Wedding first look" },
    { caption: "Editorial headshot" },
    { caption: "Engagement in the fields" },
    { caption: "Family at home" },
    { caption: "Reception candids" },
  ],
  booking: {
    enabled: true,
    label: "Book a session",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book a session", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#b08968] text-[#b08968]" : "fill-transparent text-[#d9cfc2]")} />
      ))}
    </span>
  );
}

/* Asymmetric portfolio figure with editorial offsets */
function PortfolioFigure({ caption, i }: { caption: string; i: number }) {
  const layouts = [
    "aspect-[4/5] w-full",
    "aspect-[3/4] w-11/12 ml-auto",
    "aspect-[5/6] w-10/12",
    "aspect-square w-full",
  ];
  return (
    <figure className={cn("group relative overflow-hidden rounded-sm bg-gradient-to-br from-[#c9b7a2] to-[#6f5c48]", layouts[i % layouts.length])}>
      <img src="/placeholder.svg?height=680&width=560" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-90 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-12 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm font-medium">{caption}</span>
        <span className="font-serif text-xs text-white/70">{String(i + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — immersive photo-first magazine                      */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(0);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const aboutParagraphs = (copy.about ?? "").split("\n").filter((p) => p.trim().length > 0);

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl ? { label: booking?.label || "Book a session", href: bookingUrl } : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");
  const year = new Date().getFullYear();

  const nav = [
    ...(hasGallery ? [{ label: "Portfolio", href: "#gallery" }] : []),
    { label: "Sessions", href: "#services" },
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Words", href: "#reviews" }] : []),
    ...(booking?.enabled ? [{ label: "Book", href: "#booking" }] : [{ label: "Contact", href: "#contact" }]),
  ];

  // Split gallery across the two columns of the sticky-rail portfolio.
  const colA = (gallery ?? []).filter((_, i) => i % 2 === 0);
  const colB = (gallery ?? []).filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans text-[#211d18] antialiased selection:bg-[#e7d8c6]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e8e0d4] bg-[#faf7f2]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Aperture className="h-6 w-6 text-[#b08968]" aria-hidden="true" />
            <span className="font-serif text-lg font-semibold tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium text-[#6b6156]">
              {nav.map((n) => (<a key={n.href} href={n.href} className="transition-colors hover:text-[#211d18]">{n.label}</a>))}
            </nav>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#211d18] px-5 text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#3a3229] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08968] focus-visible:ring-offset-2">{cta.label}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#211d18] hover:bg-[#efe7db] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08968] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e8e0d4] bg-[#faf7f2] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6b6156] hover:bg-[#efe7db] hover:text-[#211d18]">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e8e0d4] pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#6b6156]"><Phone className="h-4 w-4" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-11 items-center justify-center rounded-full bg-[#211d18] px-6 text-sm font-semibold text-[#faf7f2]">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — magazine cover */}
        <section className="relative isolate flex min-h-[90vh] flex-col overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#c9b7a2] via-[#a9917a] to-[#5b4a39]"><img src="/placeholder.svg?height=1100&width=1600" alt="" className="h-full w-full object-cover opacity-75 mix-blend-luminosity" /></div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#161109]/75 via-[#161109]/15 to-[#161109]/35" />
          {/* masthead line */}
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-8 text-xs font-medium uppercase tracking-[0.25em] text-white/80">
            <span>Portfolio № 01</span>
            <span className="hidden sm:inline">{business.area}</span>
            <span>Est. {year - 9}</span>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur"><Camera className="h-3.5 w-3.5" /> {business.category}</span>
            <h1 className="mx-auto mt-8 max-w-4xl font-serif text-[13vw] font-medium leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">{copy.heroHeadline}</h1>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#f0e9df]">{copy.heroSub}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#faf7f2] px-8 py-3.5 text-base font-semibold text-[#211d18] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5b4a39]">{cta.label} {ctaExternal && <ArrowUpRight className="h-5 w-5" />}</a>
              <a href="#gallery" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">View portfolio</a>
            </div>
          </div>
        </section>

        {/* Portfolio — sticky caption rail + asymmetric photo stack */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">Selected work</p>
                <h2 id="gallery-heading" className="mt-3 font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">The portfolio</h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[#6b6156]">A small edit of recent portraits, weddings, and film work — the moments we live for.</p>
                {business.rating != null && (<div className="mt-6 flex items-center gap-2 text-sm text-[#6b6156]"><Stars rating={business.rating} /><span><span className="font-semibold text-[#211d18]">{business.rating}</span>{business.reviewCount != null && <> · {business.reviewCount} clients</>}</span></div>)}
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#211d18] px-6 text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#3a3229]">{cta.label} {ctaExternal && <ArrowUpRight className="h-4 w-4" />}</a>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-4 sm:gap-6">{colA.map((g, i) => (<PortfolioFigure key={i} caption={g.caption} i={i * 2} />))}</div>
                <div className="flex flex-col gap-4 pt-8 sm:gap-6 sm:pt-16">{colB.map((g, i) => (<PortfolioFigure key={i} caption={g.caption} i={i * 2 + 1} />))}</div>
              </div>
            </div>
          </section>
        )}

        {/* About — editorial drop-cap */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 border-y border-[#e8e0d4] bg-[#f3ede3] py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-5">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">Behind the lens</p>
              <h2 id="about-heading" className="mt-3 text-center font-serif text-4xl font-medium leading-tight sm:text-5xl">A quiet, unhurried studio</h2>
              <div className="mt-10 space-y-5 text-lg leading-relaxed text-[#4d453b]">
                {aboutParagraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.8] first-letter:text-[#b08968]" : ""}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sessions — editorial list */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-5">
              <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">What we offer</p><h2 id="services-heading" className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">Sessions &amp; collections</h2></div>
              <div className="mt-12 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                {services.map((s: SiteService, i) => (
                  <article key={i} className="flex items-baseline gap-5 border-b border-[#ded3c3] py-6">
                    <span className="font-serif text-lg text-[#c2ac93]">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4"><h3 className="font-serif text-xl">{s.title}</h3>{s.price && <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-[#8a6f52]">{s.price}</span>}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#6b6156]">{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking */}
        {booking?.enabled && booking.url && (
          <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-16 bg-[#211d18] py-20 text-[#faf7f2] sm:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a986]">Reserve your date</p>
              <h2 id="booking-heading" className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">Let's make something you'll keep</h2>
              <p className="mx-auto mt-5 max-w-lg leading-relaxed text-[#c9c0b4]">Choose the session you have in mind, then confirm your date on our booking page. Sessions are limited so each client gets our full attention.</p>
              <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2">
                {services.slice(0, 6).map((s, i) => (
                  <button key={i} type="button" onClick={() => setSession(i)} aria-pressed={session === i}
                    className={cn("rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08968]",
                      session === i ? "border-[#b08968] bg-[#b08968] text-[#211d18]" : "border-[#4a4238] text-[#c9c0b4] hover:border-[#6f6355]")}>
                    {s.title}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#c9c0b4]">Enquiring about <span className="font-semibold text-[#faf7f2]">{services[session]?.title ?? "—"}</span>{services[session]?.price && <> · {services[session].price}</>}</p>
              <a href={booking.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#faf7f2] px-8 py-3.5 text-base font-semibold text-[#211d18] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08968] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211d18]">{booking.label || "Book a session"} <ArrowUpRight className="h-5 w-5" /></a>
              <p className="mt-3 text-xs text-[#8f8578]">Opens our booking page in a new tab.</p>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-5">
              <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">Kind words</p><h2 id="reviews-heading" className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">From the people in the pictures</h2></div>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col border-t border-[#ded3c3] pt-6"><Stars rating={r.rating} /><p className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-[#3a342c]">"{r.text}"</p><footer className="mt-5 text-sm"><span className="font-semibold text-[#211d18]">{r.author}</span><span className="ml-2 text-[#8a8172]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 border-t border-[#e8e0d4] bg-[#f3ede3] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">Good to know</p><h2 id="faq-heading" className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">Questions</h2></div>
              <div className="border-t border-[#ded3c3]"><FaqAccordion items={faqs} className="divide-[#ded3c3]" /></div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-0 overflow-hidden rounded-sm border border-[#e8e0d4] lg:grid-cols-2">
              <div className="bg-[#faf7f2] p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08968]">Visit the studio</p>
                <h2 id="contact-heading" className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">Say hello</h2>
                <dl className="mt-8 space-y-6">
                  <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#b08968]" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-[#8a8172]">Studio</dt><dd className="mt-1 text-sm leading-relaxed text-[#3a342c]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#b08968] hover:text-[#8a6f52]">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                  <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#b08968]" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-[#8a8172]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#3a342c] hover:text-[#b08968]">{business.phone}</a></dd></div></div>
                  {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#b08968]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-semibold uppercase tracking-wider text-[#8a8172]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#e8e0d4] pb-1.5 last:border-0"><span className="text-[#6b6156]">{h.day}</span><span className="font-medium text-[#211d18]">{h.value}</span></li>))}</ul></dd></div></div>)}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#211d18] px-7 text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#3a3229]">{booking?.label || "Book a session"} <ArrowUpRight className="h-4 w-4" /></a>}
                  <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d9cfc2] px-7 text-sm font-semibold text-[#211d18] transition-colors hover:bg-[#efe7db]"><Phone className="h-4 w-4" /> Call the studio</a>
                </div>
              </div>
              <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[300px] bg-gradient-to-br from-[#c9b7a2] to-[#6f5c48]"><img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" /><span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[#faf7f2]/95 px-5 py-2.5 text-sm font-semibold text-[#211d18] shadow-lg backdrop-blur transition-transform group-hover:scale-105"><MapPin className="h-4 w-4 text-[#b08968]" /> {business.area}</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e8e0d4] bg-[#211d18] text-[#c9c0b4]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5"><Aperture className="h-6 w-6 text-[#b08968]" aria-hidden="true" /><span className="font-serif text-lg font-semibold text-[#faf7f2]">{business.name}</span></div>
              <p className="mt-4 text-sm leading-relaxed">{business.category} in {business.area}.</p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-[#faf7f2]"><Phone className="h-4 w-4" /> {business.phone}</a>
              {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#faf7f2]"><MapPin className="h-4 w-4" /> {business.address}</a>}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8f8578] sm:flex-row sm:items-center sm:justify-between"><p>© {year} {business.name}. All rights reserved.</p><p>{business.area}</p></div>
        </div>
      </footer>
    </div>
  );
}
