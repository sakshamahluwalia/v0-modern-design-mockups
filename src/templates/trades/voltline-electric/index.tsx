import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  BadgeCheck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "electrician",
  label: "Electrical & wiring",
  accent: "#f5b301",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — an electrician in Brampton, ON                     */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Voltline Electric",
    category: "Licensed electrical contractor",
    phone: "(905) 555-0128",
    tel: "tel:+19055550128",
    address: "88 Advance Boulevard, Unit 3, Brampton, ON L6T 4J4",
    mapsUrl: "https://maps.google.com/?q=88+Advance+Boulevard+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 203,
    hours: [
      { day: "Mon – Fri", value: "7:00 AM – 6:00 PM" },
      { day: "Saturday", value: "8:00 AM – 2:00 PM" },
      { day: "Sunday", value: "Emergencies only" },
      { day: "Emergency line", value: "24 / 7" },
    ],
  },
  copy: {
    heroHeadline: "Wiring done right — safe, tidy, and up to code.",
    heroSub:
      "Licensed, insured electricians serving Brampton and the surrounding area. From panel upgrades to EV chargers, we show up on time and leave the work spotless.",
    about:
      "Voltline is a master-electrician-led team that treats your home like our own. We don't cut corners, we pull the right permits, and we explain what we're doing in plain language — no jargon, no surprise line items.\n\nEvery job is backed by our workmanship warranty and a promise to leave your space cleaner than we found it. That's how we've built a business almost entirely on referrals.",
    services: [
      { title: "Panel & Service Upgrades", desc: "Upgrade to 200A, replace an aging panel, and add capacity safely.", price: "Free quote" },
      { title: "EV Charger Installation", desc: "Level 2 home charger installs, wired cleanly and rebate-ready.", price: "from $650" },
      { title: "Pot Lights & Fixtures", desc: "Recessed lighting, fixtures, dimmers, and switch layouts done neatly.", price: "from $120" },
      { title: "Troubleshooting & Repairs", desc: "Tripping breakers, dead outlets, flickering lights — diagnosed fast.", price: "from $95" },
      { title: "Generator & Transfer Switch", desc: "Standby and portable generator hookups so you're never in the dark.", price: "Free quote" },
      { title: "Smoke & CO Detectors", desc: "Code-compliant hardwired detector installs for total peace of mind.", price: "from $85" },
      { title: "Outlet & USB Upgrades", desc: "Add outlets, GFCIs, and USB receptacles where you actually need them.", price: "from $75" },
      { title: "Electrical Safety Inspection", desc: "A full report on your home's wiring — ideal before buying or selling.", price: "$149" },
    ],
    faq: [
      { q: "Are you licensed and insured?", a: "Yes — we're a licensed electrical contractor with the ESA, fully insured, and every job is registered and inspected where required. We're happy to provide our licence number on request." },
      { q: "Do you charge for quotes?", a: "Quotes for installations and upgrades are free. For diagnostic and repair visits there's a service-call fee, which we always tell you up front and credit toward the work if you proceed." },
      { q: "How fast can you come out?", a: "For non-emergencies we usually offer a same-week appointment. For genuine electrical emergencies — burning smells, sparking, no power — call our 24/7 line and we'll prioritise you." },
    ],
  },
  reviews: [
    { author: "Karan P.", rating: 5, text: "Upgraded our panel and installed an EV charger in a day. Clean, on time, and explained everything. The price matched the quote exactly.", relativeTime: "2 weeks ago" },
    { author: "Lisa M.", rating: 5, text: "Came out same day when half our outlets died. Found the issue in twenty minutes and fixed it properly. Total professionals.", relativeTime: "1 month ago" },
    { author: "Owen D.", rating: 5, text: "Did all the pot lights in our reno. Tidy wiring, no mess left behind, and they cleaned up after themselves. Highly recommend.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "200A panel upgrade" },
    { caption: "Level 2 EV charger install" },
    { caption: "Kitchen pot-light layout" },
    { caption: "Standby generator hookup" },
    { caption: "Basement rewire" },
    { caption: "Exterior lighting" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Get a free quote", href: "#quote" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#f5b301] text-[#f5b301]" : "fill-transparent text-[#4a4a52]")} />
      ))}
    </span>
  );
}

/** Visual-only quote form. Primary action is click-to-call (trades lead pattern). */
function QuoteForm({ business, services }: { business: SiteConfig["business"]; services: SiteService[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 text-[#111114] shadow-2xl sm:p-8">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-[#a37800]" aria-hidden="true" />
        <h2 className="text-lg font-bold">Get a free quote</h2>
      </div>
      <p className="mt-1 text-sm text-[#5a5a63]">Tell us what you need — we'll call you back fast.</p>
      <div className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-[#5a5a63]">Name</span>
            <input type="text" placeholder="Your name" className="mt-1 h-11 w-full rounded-lg border border-[#e2e2e7] bg-[#fafafa] px-3 text-sm outline-none focus:border-[#f5b301] focus:ring-2 focus:ring-[#f5b301]/30" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-[#5a5a63]">Phone</span>
            <input type="tel" placeholder="(905) 555-0000" className="mt-1 h-11 w-full rounded-lg border border-[#e2e2e7] bg-[#fafafa] px-3 text-sm outline-none focus:border-[#f5b301] focus:ring-2 focus:ring-[#f5b301]/30" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-[#5a5a63]">What do you need?</span>
          <select className="mt-1 h-11 w-full rounded-lg border border-[#e2e2e7] bg-[#fafafa] px-3 text-sm outline-none focus:border-[#f5b301] focus:ring-2 focus:ring-[#f5b301]/30">
            {services.slice(0, 6).map((s, i) => (<option key={i}>{s.title}</option>))}
            <option>Something else</option>
          </select>
        </label>
      </div>
      <a href={business.tel} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#111114] text-sm font-bold text-white transition-colors hover:bg-[#2a2a30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b301] focus-visible:ring-offset-2">
        <Phone className="h-4 w-4" /> Call now for your quote
      </a>
      <p className="mt-3 text-center text-xs text-[#8a8a93]">Or dial {business.phone} — licensed &amp; insured.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — SPLIT-SCREEN hero with inline quote form            */
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

  const cta = primaryCta ?? { label: "Get a quote", href: "#quote" };
  const ctaExternal = cta.href.startsWith("http");

  const areas = ["Brampton", "Bramalea", "Springdale", "Heart Lake", "Mount Pleasant", "Castlemore", "Georgetown", "Caledon"];
  const nav = [
    { label: "Services", href: "#services" },
    ...(hasGallery ? [{ label: "Work", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Quote", href: "#quote" },
  ];

  return (
    <div className="min-h-screen bg-[#111114] font-sans text-white antialiased selection:bg-[#f5b301] selection:text-[#111114]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111114]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5b301] font-display text-base font-extrabold text-[#111114]">{initialOf(business.name)}</span>
            <span className="font-display text-lg font-extrabold tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-4 lg:flex">
            <a href={business.tel} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c7c7cf] transition-colors hover:text-white"><Phone className="h-4 w-4 text-[#f5b301]" /> {business.phone}</a>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#f5b301] px-5 text-sm font-bold text-[#111114] transition-colors hover:bg-[#ffca2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b301] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]">{cta.label}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b301] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-white/10 bg-[#111114] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#c7c7cf] hover:bg-white/10 hover:text-white">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#c7c7cf]"><Phone className="h-4 w-4 text-[#f5b301]" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-lg bg-[#f5b301] px-6 text-sm font-bold text-[#111114]">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — split screen: left message, right quote form */}
        <section id="quote" className="scroll-mt-16">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-12 lg:py-24">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#f5b301]/10 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f5b301]/40 bg-[#f5b301]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f5b301]"><Zap className="h-3.5 w-3.5" /> Licensed · Insured · 24/7</span>
                <h1 className="mt-6 max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{copy.heroHeadline}</h1>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#b6b6bf]">{copy.heroSub}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href={business.tel} className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#f5b301] px-8 text-base font-bold text-[#111114] transition-colors hover:bg-[#ffca2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b301] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"><Phone className="h-5 w-5" /> {business.phone}</a>
                  <a href="#services" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 px-7 text-base font-bold text-white transition-colors hover:bg-white/10">See services</a>
                </div>
                {business.rating != null && (
                  <div className="mt-8 flex items-center gap-3 text-sm text-[#b6b6bf]"><Stars rating={business.rating} /><span><span className="font-bold text-white">{business.rating}</span>{business.reviewCount != null && <> · {business.reviewCount} reviews</>}</span></div>
                )}
              </div>
            </div>
            {/* Right — form on amber panel */}
            <div className="flex items-center justify-center bg-gradient-to-br from-[#f5b301] to-[#e09a00] px-6 py-16 sm:px-12 lg:py-24">
              <div className="w-full max-w-md"><QuoteForm business={business} services={services} /></div>
            </div>
          </div>
        </section>

        {/* Areas we serve */}
        <section aria-label="Areas we serve" className="border-y border-white/10 bg-[#17171b] py-10">
          <div className="mx-auto max-w-6xl px-6 sm:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#f5b301]" aria-hidden="true" /><p className="font-display text-lg font-bold">Proudly serving {business.area} &amp; nearby</p></div>
              <ul className="flex flex-wrap gap-2">{areas.map((a) => (<li key={a} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-[#c7c7cf]">{a}</li>))}</ul>
            </div>
          </div>
        </section>

        {/* Services — two-column icon list */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">What we do</p>
              <h2 id="services-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Electrical services</h2>
              <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                {services.map((s: SiteService, i) => (
                  <article key={i} className="flex gap-4 border-b border-white/10 pb-8">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f5b301]/15 text-[#f5b301]"><Zap className="h-5 w-5" /></span>
                    <div>
                      <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-lg font-bold">{s.title}</h3>{s.price && <span className="shrink-0 text-sm font-bold text-[#f5b301]">{s.price}</span>}</div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#b6b6bf]">{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trust band */}
        <section aria-label="Why choose us" className="border-y border-white/10 bg-[#17171b] py-14">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3 sm:px-12">
            {[{ icon: BadgeCheck, t: "ESA licensed", d: "Every job permitted and inspected where required." }, { icon: ShieldCheck, t: "Fully insured", d: "Liability coverage and a workmanship warranty." }, { icon: Check, t: "Upfront pricing", d: "Clear quotes before we start — no surprises." }].map((f, i) => (
              <div key={i} className="flex gap-4"><f.icon className="h-8 w-8 shrink-0 text-[#f5b301]" aria-hidden="true" /><div><h3 className="font-display text-base font-bold">{f.t}</h3><p className="mt-1 text-sm text-[#b6b6bf]">{f.d}</p></div></div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">Recent work</p>
              <h2 id="gallery-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">On the tools</h2>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery!.map((g, i) => (
                  <figure key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#26262c]"><img src="/placeholder.svg?height=420&width=420" alt="" aria-hidden="true" className="aspect-square w-full object-cover opacity-70 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">{g.caption}</figcaption></figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 border-t border-white/10 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-12 lg:grid-cols-2">
              <div className="relative"><div className="overflow-hidden rounded-2xl border border-white/10 bg-[#26262c]"><img src="/placeholder.svg?height=560&width=620" alt="" aria-hidden="true" className="aspect-[5/4] w-full object-cover opacity-70 mix-blend-luminosity" /></div></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">Our promise</p>
                <h2 id="about-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Built on referrals</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#b6b6bf]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 border-t border-white/10 bg-[#17171b] py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">Reviews</p>
              <h2 id="reviews-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What customers say</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col rounded-xl border border-white/10 bg-[#111114] p-6"><Stars rating={r.rating} /><p className="mt-4 flex-1 text-sm leading-relaxed text-[#d4d4db]">"{r.text}"</p><footer className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="font-bold">{r.author}</span><span className="text-[#8a8a93]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 border-t border-white/10 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">FAQ</p><h2 id="faq-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Good to know</h2></div>
              <div className="rounded-xl border border-white/10 bg-[#17171b] px-6"><FaqAccordion items={faqs} className="divide-white/10 [&_button]:text-white [&_p]:text-[#b6b6bf]" /></div>
            </div>
          </section>
        )}

        {/* Contact / final quote CTA */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 border-t border-white/10 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5b301]">Get in touch</p>
              <h2 id="contact-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Ready when you are</h2>
              <dl className="mt-8 space-y-6">
                <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8a8a93]">Shop</dt><dd className="mt-1 text-sm leading-relaxed text-[#d4d4db]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#f5b301] hover:text-[#ffca2c]">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#8a8a93]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#d4d4db] hover:text-white">{business.phone}</a></dd></div></div>
                {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-bold uppercase tracking-wider text-[#8a8a93]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-white/10 pb-1.5 last:border-0"><span className="text-[#b6b6bf]">{h.day}</span><span className="font-semibold text-white">{h.value}</span></li>))}</ul></dd></div></div>)}
              </dl>
            </div>
            <QuoteForm business={business} services={services} />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#17171b] px-6 py-10 sm:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8a8a93]">© {new Date().getFullYear()} {business.name} · {business.area} · ESA licensed &amp; insured</p>
          <a href={business.tel} className="text-xs font-bold uppercase tracking-wide text-[#f5b301] hover:text-[#ffca2c]">{business.phone}</a>
        </div>
      </footer>
    </div>
  );
}
