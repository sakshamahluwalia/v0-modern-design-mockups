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
  Wrench,
  Droplets,
  Flame,
  ShowerHead,
  Gauge,
  ShieldCheck,
  CircleDollarSign,
  CalendarClock,
  Siren,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "plumbing",
  label: "Plumbing & drains",
  accent: "#0e5bd6",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a plumber in Brampton, ON                          */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "TrueLine Plumbing",
    category: "Licensed plumbing & drain services",
    phone: "(905) 555-0117",
    tel: "tel:+19055550117",
    address: "55 Kennedy Road South, Unit 12, Brampton, ON L6W 3E7",
    mapsUrl: "https://maps.google.com/?q=55+Kennedy+Road+South+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 288,
    hours: [
      { day: "Mon – Fri", value: "7:00 AM – 8:00 PM" },
      { day: "Saturday", value: "8:00 AM – 5:00 PM" },
      { day: "Sunday", value: "9:00 AM – 3:00 PM" },
      { day: "Emergency line", value: "24 / 7" },
    ],
  },
  copy: {
    heroHeadline: "Plumbing problems fixed fast — the first time.",
    heroSub:
      "Licensed, insured plumbers serving Brampton with upfront flat-rate pricing and true 24/7 emergency service. No overtime charges, no mess left behind.",
    about:
      "TrueLine was started by a plumber who was tired of watching customers get nickel-and-dimed. So we do things differently: flat-rate quotes before any work begins, no charge for after-hours calls, and drop cloths and shoe covers on every job.\n\nOur trucks are stocked to fix most issues on the first visit, and every repair is backed by our written guarantee. When you call, you get a real plumber — not a call centre.",
    services: [
      { title: "Emergency Plumbing", desc: "Burst pipes, major leaks, no water — 24/7 with no overtime charge.", price: "Flat rate" },
      { title: "Drain Cleaning", desc: "Clogged sinks, tubs, and mains cleared with camera-verified results.", price: "from $99" },
      { title: "Water Heater Service", desc: "Repair or replace tank and tankless units, same-day where possible.", price: "Free quote" },
      { title: "Toilet & Faucet Repair", desc: "Running toilets, drips, and low pressure fixed in one visit.", price: "from $89" },
      { title: "Sump Pump & Backwater", desc: "Installation and service to keep your basement dry all year.", price: "Free quote" },
      { title: "Repiping & Renovations", desc: "Full or partial repipes and rough-ins for your reno, done to code.", price: "Free quote" },
      { title: "Leak Detection", desc: "Non-invasive location of hidden leaks before they cause damage.", price: "from $149" },
      { title: "Camera Inspection", desc: "See exactly what's happening in your lines with a video scope.", price: "$179" },
    ],
    faq: [
      { q: "Do you really not charge extra for emergencies?", a: "Correct — our rate is the same day or night, weekday or weekend. You'll get a flat-rate quote before we start, so there are no surprise overtime or call-out fees on your bill." },
      { q: "How quickly can you get here?", a: "For emergencies we aim to be at your door within a couple of hours, often sooner. For standard service we usually offer same- or next-day appointments with a set arrival window." },
      { q: "Is your work guaranteed?", a: "Yes. Every repair is backed by our written workmanship guarantee, and we use quality parts. If something we fixed fails, we make it right — no argument." },
    ],
  },
  reviews: [
    { author: "Rebecca T.", rating: 5, text: "Called at 11pm with a burst pipe and a plumber was here within the hour — no crazy after-hours fee. Fixed it fast and cleaned up. Lifesavers.", relativeTime: "2 weeks ago" },
    { author: "Amit S.", rating: 5, text: "Flat-rate quote up front, exactly what they charged. Replaced our water heater same day. This is how a trade should operate.", relativeTime: "1 month ago" },
    { author: "Diane W.", rating: 5, text: "Cleared a stubborn main drain and showed me the camera footage before and after. Honest, tidy, and fairly priced. My go-to now.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "Tankless water heater install" },
    { caption: "Main drain camera inspection" },
    { caption: "Sump pump replacement" },
    { caption: "Bathroom rough-in" },
    { caption: "Kitchen repipe" },
    { caption: "Backwater valve install" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Book a plumber", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#0e5bd6] text-[#0e5bd6]" : "fill-transparent text-[#c7d3e6]")} />
      ))}
    </span>
  );
}

const SERVICE_ICONS = [Siren, Droplets, Flame, ShowerHead, Gauge, Wrench, Droplets, Gauge];

/* ------------------------------------------------------------------ */
/* Main template — UTILITY: emergency banner, icon tiles, steps        */
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

  const cta = primaryCta ?? { label: "Book a plumber", href: "#contact" };
  const ctaExternal = cta.href.startsWith("http");

  const steps = [
    { icon: Phone, t: "Call or book online", d: "Reach a real plumber any time, day or night." },
    { icon: CircleDollarSign, t: "Get a flat-rate quote", d: "A clear price before any work begins." },
    { icon: Wrench, t: "We fix it right", d: "Most repairs done in a single visit." },
    { icon: ShieldCheck, t: "Backed by guarantee", d: "Written warranty on every job." },
  ];

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    ...(hasGallery ? [{ label: "Work", href: "#gallery" }] : []),
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Book", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0f1b2d] antialiased selection:bg-[#0e5bd6] selection:text-white">
      {/* Emergency banner */}
      <div className="bg-[#e11d48] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-sm font-semibold">
          <span className="inline-flex items-center gap-1.5"><Siren className="h-4 w-4" /> Burst pipe or no water?</span>
          <a href={business.tel} className="inline-flex items-center gap-1 underline underline-offset-2 hover:no-underline">24/7 emergency line — {business.phone}</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e6ecf5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e5bd6] font-display text-base font-extrabold text-white">{initialOf(business.name)}</span>
            <span className="font-display text-lg font-extrabold tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-4 lg:flex">
            <a href={business.tel} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3d4f68] transition-colors hover:text-[#0e5bd6]"><Phone className="h-4 w-4 text-[#0e5bd6]" /> {business.phone}</a>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#0e5bd6] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0b49ab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5bd6] focus-visible:ring-offset-2">{cta.label}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0f1b2d] hover:bg-[#eef3fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5bd6] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e6ecf5] bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#3d4f68] hover:bg-[#eef3fb] hover:text-[#0e5bd6]">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e6ecf5] pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#3d4f68]"><Phone className="h-4 w-4 text-[#0e5bd6]" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0e5bd6] px-6 text-sm font-bold text-white">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — text + trust panel, utility stats row */}
        <section className="relative overflow-hidden bg-[#0f1b2d] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0e5bd6]/25 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-[#9cc0f5]"><ShieldCheck className="h-3.5 w-3.5" /> Licensed · Insured · Flat-rate</span>
                <h1 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{copy.heroHeadline}</h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#adbdd4]">{copy.heroSub}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={business.tel} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#0e5bd6] px-8 text-base font-bold text-white transition-colors hover:bg-[#2a72e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e5bd6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1b2d]"><Phone className="h-5 w-5" /> {business.phone}</a>
                  <a href="#contact" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/25 px-7 text-base font-bold text-white transition-colors hover:bg-white/10">Book online <ArrowRight className="h-5 w-5" /></a>
                </div>
              </div>
              {/* Trust panel */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[{ icon: CalendarClock, big: "2 hrs", small: "Typical emergency response" }, { icon: CircleDollarSign, big: "$0", small: "After-hours surcharge" }, { icon: Star, big: business.rating != null ? String(business.rating) : "—", small: business.reviewCount != null ? `${business.reviewCount} reviews` : "Top rated" }, { icon: ShieldCheck, big: "100%", small: "Workmanship guarantee" }].map((s, i) => (
                    <div key={i}>
                      <s.icon className="h-6 w-6 text-[#7fb0f7]" aria-hidden="true" />
                      <p className="mt-3 font-display text-3xl font-extrabold">{s.big}</p>
                      <p className="mt-1 text-xs text-[#adbdd4]">{s.small}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services — icon tiles */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">Our services</p>
                <h2 id="services-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Anything with a pipe</h2>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((s: SiteService, i) => {
                  const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                  return (
                    <article key={i} className="flex flex-col rounded-2xl border border-[#e6ecf5] bg-[#f7f9fd] p-6 transition-colors hover:border-[#bcd2f2] hover:bg-white">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0e5bd6]/10 text-[#0e5bd6]"><Icon className="h-5 w-5" /></span>
                      <h3 className="mt-4 font-display text-base font-bold">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a6b82]">{s.desc}</p>
                      {s.price && <span className="mt-4 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0e5bd6] ring-1 ring-[#dbe6f7]">{s.price}</span>}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* How it works — steps */}
        <section id="how" aria-labelledby="how-heading" className="scroll-mt-16 bg-[#f7f9fd] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">Simple &amp; upfront</p><h2 id="how-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How it works</h2></div>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={i} className="relative rounded-2xl border border-[#e6ecf5] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0e5bd6] text-white"><step.icon className="h-5 w-5" /></span>
                    <span className="font-display text-4xl font-extrabold text-[#e6ecf5]">{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{step.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5a6b82]">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">Recent jobs</p><h2 id="gallery-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Work we're proud of</h2></div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery!.map((g, i) => (<figure key={i} className="group relative overflow-hidden rounded-2xl border border-[#e6ecf5] bg-[#dbe6f7]"><img src="/placeholder.svg?height=420&width=420" alt="" aria-hidden="true" className="aspect-square w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1b2d]/80 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">{g.caption}</figcaption></figure>))}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 bg-[#0f1b2d] py-20 text-white sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7fb0f7]">Our promise</p>
                <h2 id="about-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">A plumber you can trust</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#adbdd4]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: CircleDollarSign, t: "Flat-rate pricing", d: "Know the cost before we start." }, { icon: Siren, t: "True 24/7 service", d: "No overtime, ever." }, { icon: ShieldCheck, t: "Licensed & insured", d: "Fully covered, guaranteed work." }, { icon: Wrench, t: "First-visit fixes", d: "Trucks stocked to finish today." }].map((f, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5"><f.icon className="h-7 w-7 text-[#7fb0f7]" aria-hidden="true" /><h3 className="mt-3 font-display text-base font-bold">{f.t}</h3><p className="mt-1 text-sm text-[#adbdd4]">{f.d}</p></div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">Reviews</p><h2 id="reviews-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Trusted across Brampton</h2></div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col rounded-2xl border border-[#e6ecf5] bg-[#f7f9fd] p-6"><Stars rating={r.rating} /><p className="mt-4 flex-1 text-sm leading-relaxed text-[#33435a]">"{r.text}"</p><footer className="mt-5 flex items-center justify-between border-t border-[#e6ecf5] pt-4 text-sm"><span className="font-bold">{r.author}</span><span className="text-[#8494a8]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 bg-[#f7f9fd] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">FAQ</p><h2 id="faq-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Good to know</h2></div>
              <div className="rounded-2xl border border-[#e6ecf5] bg-white px-6"><FaqAccordion items={faqs} className="divide-[#e6ecf5]" /></div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#e6ecf5] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0e5bd6]">Book a plumber</p>
                  <h2 id="contact-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Get it fixed today</h2>
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0e5bd6]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8494a8]">Shop</dt><dd className="mt-1 text-sm leading-relaxed text-[#33435a]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#0e5bd6] hover:text-[#0b49ab]">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                    <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0e5bd6]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8494a8]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#33435a] hover:text-[#0e5bd6]">{business.phone}</a></dd></div></div>
                    {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#0e5bd6]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-bold uppercase tracking-wider text-[#8494a8]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className={cn("flex items-center justify-between gap-6 border-b border-dashed border-[#e6ecf5] pb-1.5 last:border-0", h.value.includes("24") && "font-semibold text-[#e11d48]")}><span className={h.value.includes("24") ? "text-[#e11d48]" : "text-[#5a6b82]"}>{h.day}</span><span className={h.value.includes("24") ? "" : "font-medium text-[#0f1b2d]"}>{h.value}</span></li>))}</ul></dd></div></div>)}
                  </dl>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0e5bd6] px-7 text-sm font-bold text-white transition-colors hover:bg-[#0b49ab]"><Phone className="h-4 w-4" /> Call now</a>
                    <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#e11d48] px-7 text-sm font-bold text-[#e11d48] transition-colors hover:bg-[#fef2f4]"><Siren className="h-4 w-4" /> Emergency line</a>
                  </div>
                </div>
                <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[300px] bg-gradient-to-br from-[#1a3a6b] to-[#0f1b2d]"><img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-50 mix-blend-luminosity" /><span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0f1b2d] shadow-lg transition-transform group-hover:scale-105"><MapPin className="h-4 w-4 text-[#0e5bd6]" /> {business.area}</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e6ecf5] bg-[#0f1b2d] text-[#adbdd4]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5"><span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e5bd6] font-display text-base font-extrabold text-white">{initialOf(business.name)}</span><span className="font-display text-lg font-extrabold text-white">{business.name}</span></div>
              <p className="mt-4 text-sm leading-relaxed">{business.category} in {business.area}.</p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> {business.phone}</a>
              {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MapPin className="h-4 w-4" /> {business.address}</a>}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#6b7d96] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {business.name}. Licensed &amp; insured.</p><p>{business.area}</p></div>
        </div>
      </footer>
    </div>
  );
}
