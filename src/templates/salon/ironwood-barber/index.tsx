import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Menu,
  X,
  Scissors,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "barbershop",
  label: "Barbershop & men's grooming",
  accent: "#c1873c",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a barbershop in Brampton, ON                       */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Ironwood Barber Co.",
    category: "Barbershop & men's grooming",
    phone: "(905) 555-0173",
    tel: "tel:+19055550173",
    address: "212 Queen Street East, Unit 2, Brampton, ON L6W 2B3",
    mapsUrl: "https://maps.google.com/?q=212+Queen+Street+East+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 341,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Fri", value: "9:00 AM – 8:00 PM" },
      { day: "Saturday", value: "8:00 AM – 6:00 PM" },
      { day: "Sunday", value: "10:00 AM – 4:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "Sharp cuts. Straight razors. No fuss.",
    heroSub:
      "A proper neighbourhood barbershop in downtown Brampton — skilled barbers, hot-towel shaves, and a chair that's always got your name on it. Walk-ins welcome, bookings preferred.",
    about:
      "Ironwood started with two chairs, a busted radio, and a simple idea: give every guy who walks in a cut he'd actually pay for twice. A decade later we're still cutting the same way — take your time, get it right, send you out standing a little taller.\n\nOur barbers are old-school trained and constantly sharpening their craft. Whether it's a skin fade, a beard sculpt, or your first haircut in a year, you'll get an honest opinion and clean work every time.",
    services: [
      { title: "The Ironwood Cut", desc: "Consultation, precision cut, hot-towel finish, and a style with product.", price: "$42" },
      { title: "Skin Fade", desc: "A razor-sharp fade blended to the skin, tailored to your head shape.", price: "$45" },
      { title: "Beard Sculpt & Line-up", desc: "Trim, shape, and a crisp line-up with hot towel and beard oil.", price: "$30" },
      { title: "Straight Razor Shave", desc: "The full ritual — hot towels, warm lather, a single-blade shave.", price: "$40" },
      { title: "Cut & Beard Combo", desc: "A full haircut paired with a beard sculpt — the complete reset.", price: "$65" },
      { title: "Father & Son", desc: "Two cuts, back to back, one appointment.", price: "$70" },
      { title: "The Kid's Cut", desc: "Patient, quick, and clean for the under-12 crowd.", price: "$28" },
      { title: "Grey Blending", desc: "A subtle, natural-looking blend to take the edge off.", price: "from $35" },
    ],
    faq: [
      { q: "Do you take walk-ins or do I need to book?", a: "Both. Walk-ins are always welcome when a chair's free, but weekends and evenings fill up fast — booking ahead guarantees your barber and your time slot." },
      { q: "Can I request a specific barber?", a: "Absolutely. Pick your barber when you book, or let us know at the door. If your regular's out, we'll match you with someone who cuts a similar style." },
      { q: "How should I come prepared for a shave?", a: "Come with a day or two of growth and clean skin — no need to shave beforehand. Let us know about any sensitivities and we'll adjust the prep." },
    ],
  },
  reviews: [
    { author: "Marcus T.", rating: 5, text: "Best fade in the city, hands down. Been to five shops around Brampton and none of them are close. My barber actually listens.", relativeTime: "1 week ago" },
    { author: "Deep S.", rating: 5, text: "Got the straight razor shave for my wedding and felt like a million bucks. The whole place has a great vibe — no pretension, just skill.", relativeTime: "3 weeks ago" },
    { author: "Anthony R.", rating: 5, text: "Take my son here now too. Clean shop, honest prices, and they never rush you out the door. This is how a barbershop should be.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "Textured crop & taper" },
    { caption: "Skin fade with hard part" },
    { caption: "Full beard sculpt" },
    { caption: "Classic pompadour" },
    { caption: "Hot-towel straight shave" },
    { caption: "Slick back & line-up" },
  ],
  booking: {
    enabled: true,
    label: "Book a chair",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book a chair", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#c1873c] text-[#c1873c]" : "fill-transparent text-[#5a5148]")} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — FIXED LEFT SIDEBAR layout                           */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);

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
    { n: "01", label: "Services", href: "#services" },
    ...(booking?.enabled ? [{ n: "02", label: "Book", href: "#booking" }] : []),
    ...(hasGallery ? [{ n: "03", label: "Work", href: "#gallery" }] : []),
    { n: "04", label: "About", href: "#about" },
    ...(hasReviews ? [{ n: "05", label: "Reviews", href: "#reviews" }] : []),
    { n: "06", label: "Visit", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#161310] font-sans text-[#f5efe6] antialiased selection:bg-[#c1873c] selection:text-[#161310]">
      {/* Fixed sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-[#2c2620] bg-[#1a1712] px-7 py-8 lg:flex">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-md bg-[#c1873c] font-display text-lg font-extrabold text-[#161310]">
              {initialOf(business.name)}
            </span>
            <span className="font-display text-base font-extrabold uppercase leading-tight tracking-wide">{business.name}</span>
          </a>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7d6b]">Est. 2014</p>
        </div>

        <nav aria-label="Primary" className="my-8">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#b3a898] transition-colors hover:bg-[#231f19] hover:text-[#f5efe6]">
                  <span className="font-display text-xs text-[#57493a] group-hover:text-[#c1873c]">{item.n}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          {business.rating != null && (
            <div className="flex items-center gap-2 text-xs text-[#b3a898]">
              <Stars rating={business.rating} />
              <span className="font-semibold text-[#f5efe6]">{business.rating}</span>
            </div>
          )}
          <a href={business.tel} className="flex items-center gap-2 text-sm font-semibold text-[#b3a898] transition-colors hover:text-[#f5efe6]">
            <Phone className="h-4 w-4" /> {business.phone}
          </a>
          <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c1873c] text-sm font-bold uppercase tracking-wide text-[#161310] transition-colors hover:bg-[#d59a4b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1873c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1712]">
            {cta.label} {ctaExternal && <ArrowUpRight className="h-4 w-4" />}
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#2c2620] bg-[#1a1712] px-5 lg:hidden">
        <a href="#top" className="flex items-center gap-2.5">
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-md bg-[#c1873c] font-display text-base font-extrabold text-[#161310]">{initialOf(business.name)}</span>
          <span className="font-display text-base font-extrabold uppercase tracking-wide">{business.name}</span>
        </a>
        <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#f5efe6] hover:bg-[#231f19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1873c]">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>
      {menuOpen && (
        <nav aria-label="Mobile" className="sticky top-16 z-40 border-b border-[#2c2620] bg-[#1a1712] px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}><a href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#b3a898] hover:bg-[#231f19] hover:text-[#f5efe6]">{item.label}</a></li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-[#2c2620] pt-3">
            <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#b3a898]"><Phone className="h-4 w-4" /> {business.phone}</a>
            <a href={cta.href} onClick={() => setMenuOpen(false)} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-11 items-center justify-center rounded-md bg-[#c1873c] px-6 text-sm font-bold uppercase tracking-wide text-[#161310]">{cta.label}</a>
          </div>
        </nav>
      )}

      {/* Main content, offset by the sidebar on desktop */}
      <div className="lg:pl-64">
        <main id="top">
          {/* Hero — full-height, type-forward */}
          <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden px-6 py-20 sm:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, #c1873c 0, #c1873c 2px, transparent 2px, transparent 24px)" }} />
            <div className="relative">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#c1873c]">
                <span className="h-px w-10 bg-[#c1873c]" /> {business.category}
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                {copy.heroHeadline}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#b3a898]">{copy.heroSub}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#c1873c] px-9 text-base font-bold uppercase tracking-wide text-[#161310] transition-colors hover:bg-[#d59a4b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1873c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161310]">
                  {cta.label} {ctaExternal && <ArrowUpRight className="h-5 w-5" />}
                </a>
                <a href={business.tel} className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-[#57493a] px-8 text-base font-bold uppercase tracking-wide text-[#f5efe6] transition-colors hover:bg-[#231f19]">
                  <Phone className="h-5 w-5" /> Call
                </a>
              </div>
            </div>
            {/* image strip along the bottom */}
            {hasGallery && (
              <div className="relative mt-14 grid grid-cols-4 gap-2 sm:gap-3">
                {gallery!.slice(0, 4).map((g, i) => (
                  <div key={i} className="overflow-hidden rounded-md border border-[#2c2620] bg-[#2c2620]">
                    <img src="/placeholder.svg?height=240&width=240" alt="" aria-hidden="true" className="aspect-square w-full object-cover opacity-70 mix-blend-luminosity" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Services — printed PRICE-LIST menu */}
          {services.length > 0 && (
            <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 border-t border-[#2c2620] bg-[#f5efe6] px-6 py-20 text-[#1e1a16] sm:px-12 sm:py-28">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-end justify-between gap-6 border-b-2 border-[#1e1a16] pb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a06d2c]">Price list</p>
                    <h2 id="services-heading" className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">The Menu</h2>
                  </div>
                  <Scissors className="hidden h-10 w-10 shrink-0 text-[#a06d2c] sm:block" aria-hidden="true" />
                </div>
                <div className="mt-8 grid gap-x-14 gap-y-7 sm:grid-cols-2">
                  {services.map((s: SiteService, i) => (
                    <div key={i}>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-lg font-bold uppercase tracking-wide">{s.title}</h3>
                        <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-[#c9b89b]" />
                        {s.price && <span className="font-display text-lg font-extrabold text-[#a06d2c]">{s.price}</span>}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6a5f50]">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Booking — horizontal step strip */}
          {booking?.enabled && booking.url && (
            <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-20 border-t border-[#2c2620] px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c1873c]">Booking</p>
                <h2 id="booking-heading" className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Grab a chair</h2>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { n: "01", t: "Pick your barber", d: "Choose your regular or let us match you." },
                    { n: "02", t: "Choose a time", d: "Evenings and weekends fill fast — book ahead." },
                    { n: "03", t: "Show up sharp", d: "Get a reminder, grab a coffee, take the chair." },
                  ].map((step) => (
                    <div key={step.n} className="rounded-lg border border-[#2c2620] bg-[#1a1712] p-6">
                      <span className="font-display text-3xl font-extrabold text-[#57493a]">{step.n}</span>
                      <h3 className="mt-3 font-display text-base font-bold uppercase tracking-wide">{step.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#b3a898]">{step.d}</p>
                    </div>
                  ))}
                </div>
                <a href={booking.url} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#c1873c] px-9 text-base font-bold uppercase tracking-wide text-[#161310] transition-colors hover:bg-[#d59a4b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1873c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161310]">
                  {booking.label || "Book an appointment"} <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-xs text-[#8a7d6b]">Opens our booking page in a new tab.</p>
              </div>
            </section>
          )}

          {/* Gallery — offset grid */}
          {hasGallery && (
            <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-20 border-t border-[#2c2620] px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c1873c]">The work</p>
                <h2 id="gallery-heading" className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Fresh out the chair</h2>
                <div className="mt-10 columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
                  {gallery!.map((g, i) => (
                    <figure key={i} className={cn("group relative overflow-hidden rounded-md border border-[#2c2620] bg-[#2c2620]", i % 3 === 1 ? "aspect-[3/4]" : "aspect-square")}>
                      <img src="/placeholder.svg?height=520&width=420" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-75 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-[#f5efe6]">{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* About — split band */}
          {aboutParagraphs.length > 0 && (
            <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 grid border-t border-[#2c2620] lg:grid-cols-2">
              <div className="bg-[#c1873c] px-6 py-20 text-[#161310] sm:px-12 sm:py-28">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7d5420]">Our story</p>
                <h2 id="about-heading" className="mt-3 max-w-md font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">A shop built on good cuts</h2>
                <div className="mt-6 max-w-md space-y-4 text-base leading-relaxed text-[#3a2a12]">
                  {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <div className="relative min-h-[320px] bg-[#2c2620]">
                <img src="/placeholder.svg?height=760&width=680" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity" />
              </div>
            </section>
          )}

          {/* Reviews — featured + list */}
          {hasReviews && (
            <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 border-t border-[#2c2620] px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto max-w-5xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c1873c]">Word on the street</p>
                <h2 id="reviews-heading" className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">The regulars</h2>
                <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                  <blockquote className="flex flex-col justify-between rounded-lg border border-[#2c2620] bg-[#1a1712] p-8">
                    <div>
                      <Stars rating={reviews[0].rating} />
                      <p className="mt-5 font-display text-2xl font-bold leading-snug text-[#f5efe6]">"{reviews[0].text}"</p>
                    </div>
                    <footer className="mt-6 text-sm"><span className="font-bold">{reviews[0].author}</span><span className="ml-2 text-[#8a7d6b]">{reviews[0].relativeTime}</span></footer>
                  </blockquote>
                  <div className="grid gap-6">
                    {reviews.slice(1, 3).map((r, i) => (
                      <blockquote key={i} className="rounded-lg border border-[#2c2620] bg-[#1a1712] p-6">
                        <Stars rating={r.rating} />
                        <p className="mt-3 text-sm leading-relaxed text-[#cabfae]">"{r.text}"</p>
                        <footer className="mt-4 text-sm"><span className="font-bold">{r.author}</span><span className="ml-2 text-[#8a7d6b]">{r.relativeTime}</span></footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-[#2c2620] bg-[#f5efe6] px-6 py-20 text-[#1e1a16] sm:px-12 sm:py-28">
              <div className="mx-auto max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a06d2c]">Good to know</p>
                <h2 id="faq-heading" className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Questions</h2>
                <div className="mt-8">
                  <FaqAccordion items={faqs} className="divide-[#d9cdb3]" />
                </div>
              </div>
            </section>
          )}

          {/* Contact — full-width dark band */}
          <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-[#2c2620] px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c1873c]">Find the shop</p>
              <h2 id="contact-heading" className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Come get sharp</h2>
              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
                <dl className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#c1873c]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#8a7d6b]">Address</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-[#cabfae]">{business.address}</dd>
                      {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-[#c1873c] hover:text-[#d59a4b]">Directions <ArrowUpRight className="h-4 w-4" /></a>}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#c1873c]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#8a7d6b]">Phone</dt>
                      <dd className="mt-1 text-sm"><a href={business.tel} className="text-[#cabfae] hover:text-[#f5efe6]">{business.phone}</a></dd>
                    </div>
                  </div>
                  {hasHours && (
                    <div className="flex gap-4">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#c1873c]" aria-hidden="true" />
                      <div className="w-full">
                        <dt className="text-xs font-bold uppercase tracking-wider text-[#8a7d6b]">Hours</dt>
                        <dd className="mt-2"><ul className="space-y-1.5 text-sm">
                          {business.hours!.map((h, i) => (
                            <li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#2c2620] pb-1.5 last:border-0"><span className="text-[#b3a898]">{h.day}</span><span className="font-semibold text-[#f5efe6]">{h.value}</span></li>
                          ))}
                        </ul></dd>
                      </div>
                    </div>
                  )}
                </dl>
                <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps"
                  className="group relative min-h-[260px] overflow-hidden rounded-lg border border-[#2c2620] bg-[#2c2620]">
                  <img src="/placeholder.svg?height=520&width=640" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-60 mix-blend-luminosity" />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md bg-[#c1873c] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#161310] shadow-lg transition-transform group-hover:scale-105"><MapPin className="h-4 w-4" /> {business.area}</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2c2620] bg-[#1a1712] px-6 py-10 text-[#8a7d6b] sm:px-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs">© {new Date().getFullYear()} {business.name} · {business.area}</p>
            <a href={business.tel} className="text-xs font-semibold uppercase tracking-wide hover:text-[#f5efe6]">{business.phone}</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
