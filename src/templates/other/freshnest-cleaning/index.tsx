import { useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Check,
  Sparkles,
  ShieldCheck,
  Leaf,
  CalendarCheck,
  MoveHorizontal,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "cleaning-service",
  label: "Home & office cleaning",
  accent: "#0ea5e9",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a cleaning service in Brampton, ON                 */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "FreshNest Cleaning Co.",
    category: "Home & office cleaning",
    phone: "(905) 555-0182",
    tel: "tel:+19055550182",
    address: "9 Gillingham Drive, Unit 4, Brampton, ON L6X 5A5",
    mapsUrl: "https://maps.google.com/?q=9+Gillingham+Drive+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 241,
    hours: [
      { day: "Mon – Fri", value: "8:00 AM – 6:00 PM" },
      { day: "Saturday", value: "9:00 AM – 4:00 PM" },
      { day: "Sunday", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "Come home to a place that sparkles.",
    heroSub:
      "Trusted, insured home and office cleaning across Brampton. Vetted cleaners, eco-friendly products, and a spotless-guarantee — so you can spend your time on literally anything else.",
    about:
      "FreshNest started with a simple frustration: booking a cleaner shouldn't be stressful, and the results shouldn't be a gamble. So we built a service around trust — every cleaner is background-checked, trained, and insured, and every clean is backed by our 24-hour re-clean guarantee.\n\nWe bring our own eco-friendly supplies, work to a detailed checklist so nothing gets missed, and send the same team whenever we can. If you're ever not thrilled, we come back and make it right — no questions asked.",
    services: [
      { title: "Standard Clean", desc: "Regular upkeep of the whole home — dusting, floors, kitchen, and baths.", price: "from $120" },
      { title: "Deep Clean", desc: "A top-to-bottom reset including baseboards, inside appliances, and detail work.", price: "from $220" },
      { title: "Move-In / Move-Out", desc: "An empty-home deep clean to get your deposit back or start fresh.", price: "from $260" },
      { title: "Recurring Service", desc: "Weekly, bi-weekly, or monthly visits at a discounted member rate.", price: "from $99" },
      { title: "Office & Commercial", desc: "After-hours cleaning for offices, studios, and small retail spaces.", price: "Custom quote" },
      { title: "Post-Renovation", desc: "Dust and debris removal after a reno or build, done thoroughly.", price: "from $290" },
      { title: "Inside Windows", desc: "Streak-free interior windows, sills, and tracks as an add-on.", price: "from $45" },
      { title: "Laundry & Linens", desc: "Wash, fold, and fresh bed-making added to any visit.", price: "from $35" },
    ],
    faq: [
      { q: "Are your cleaners insured and background-checked?", a: "Yes, every single one. All FreshNest cleaners are fully vetted with background checks, trained to our checklist, and we carry liability insurance and bonding — so you're completely covered." },
      { q: "Do I need to provide supplies?", a: "Not at all. We bring our own professional, eco-friendly products and equipment. If you'd prefer we use specific products you provide, just let us know and we're happy to." },
      { q: "What if I'm not happy with the clean?", a: "Tell us within 24 hours and we'll come back and re-clean the areas in question free of charge. Your satisfaction is guaranteed — that's the whole point." },
    ],
  },
  reviews: [
    { author: "Megan R.", rating: 5, text: "The same lovely team comes every two weeks and my house has never been this consistently clean. Booking is easy and they're always on time.", relativeTime: "2 weeks ago" },
    { author: "Tomasz K.", rating: 5, text: "Used the move-out clean and got my full deposit back. Spotless, fairly priced, and they even cleaned inside the oven. Highly recommend.", relativeTime: "1 month ago" },
    { author: "Anisha P.", rating: 5, text: "Eco products, friendly cleaners, and a genuine guarantee. They missed one spot once, came back next day no fuss. That's real service.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "Sparkling kitchen" },
    { caption: "Spotless bathroom" },
    { caption: "Fresh living room" },
    { caption: "Made beds & linens" },
    { caption: "Streak-free windows" },
    { caption: "Tidy home office" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Get a free quote", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#0ea5e9] text-[#0ea5e9]" : "fill-transparent text-[#cfe7f5]")} />
      ))}
    </span>
  );
}

// Presentational checklist of typical inclusions (generic to cleaning, not business identity).
const INCLUDED = [
  "Dusting all surfaces", "Vacuum & mop floors", "Kitchen counters & sink",
  "Bathrooms sanitised", "Mirrors & glass", "Empty bins & reline",
  "Beds made", "Baseboards & sills", "Appliance exteriors",
];

/* --- Signature element: draggable before/after reveal slider ------- */
function BeforeAfter() {
  const [pos, setPos] = useState(58);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-[2rem] shadow-2xl shadow-[#0ea5e9]/20 ring-1 ring-black/5"
      onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setFromClientX(e.clientX); }}
      onPointerMove={(e) => { if (e.buttons > 0) setFromClientX(e.clientX); }}
    >
      {/* Before (dull) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a8f94] to-[#5c6167]">
        <img src="/placeholder.svg?height=600&width=800" alt="A room before cleaning" className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale" />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">Before</span>
      </div>
      {/* After (bright, clipped from the right) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src="/placeholder.svg?height=600&width=800" alt="The same room after cleaning" className="h-full w-full object-cover opacity-85 mix-blend-luminosity" />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0284c7] backdrop-blur">After ✨</span>
      </div>
      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -ml-6 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0ea5e9] shadow-lg ring-2 ring-[#0ea5e9]/20 transition-transform group-hover:scale-105">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
      {/* Accessible keyboard control */}
      <label className="sr-only" htmlFor="ba-range">Drag to compare before and after</label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal the cleaned result"
        className="absolute bottom-4 left-1/2 h-1 w-2/3 -translate-x-1/2 cursor-pointer appearance-none rounded-full bg-white/70 accent-[#0ea5e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — before/after reveal centerpiece, transformation     */
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

  const cta = primaryCta ?? { label: "Get a free quote", href: "#contact" };
  const ctaExternal = cta.href.startsWith("http");

  const steps = [
    { icon: Phone, t: "Tell us about your place", d: "Share your home size and what you need — takes two minutes." },
    { icon: CalendarCheck, t: "Pick a time", d: "Choose a slot that works. We'll confirm your vetted team." },
    { icon: Sparkles, t: "Relax — it's handled", d: "Come home to spotless. Not thrilled? We re-clean free." },
  ];

  const nav = [
    { label: "Services", href: "#services" },
    { label: "Included", href: "#included" },
    ...(hasGallery ? [{ label: "Results", href: "#gallery" }] : []),
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Quote", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2a3a] antialiased selection:bg-[#bae6fd]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e4f0f7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#22c3a6] font-display text-base font-extrabold text-white">{initialOf(business.name)}</span>
            <span className="font-display text-lg font-extrabold tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-4 lg:flex">
            <a href={business.tel} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4a6472] transition-colors hover:text-[#0ea5e9]"><Phone className="h-4 w-4 text-[#0ea5e9]" /> {business.phone}</a>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0ea5e9] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2">{cta.label}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0c2a3a] hover:bg-[#eaf6fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e4f0f7] bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4a6472] hover:bg-[#eaf6fc] hover:text-[#0ea5e9]">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e4f0f7] pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#4a6472]"><Phone className="h-4 w-4 text-[#0ea5e9]" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-full bg-[#0ea5e9] px-6 text-sm font-bold text-white">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — the before/after reveal is the star */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf7fd] to-white">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#c3ecfa] opacity-70 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-[#c9f5ea] opacity-60 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#bae6fd] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0284c7]"><ShieldCheck className="h-3.5 w-3.5" /> Insured · Vetted · Guaranteed</span>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">{copy.heroHeadline}</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#4a6472]">{copy.heroSub}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0284c7]"><MoveHorizontal className="h-4 w-4" /> Drag the slider to see the difference →</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-8 text-base font-bold text-white shadow-lg shadow-[#0ea5e9]/25 transition-colors hover:bg-[#0284c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2">{cta.label} <ArrowRight className="h-5 w-5" /></a>
                <a href={business.tel} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#bae6fd] bg-white px-7 text-base font-bold text-[#0c2a3a] transition-colors hover:bg-[#eaf6fc]"><Phone className="h-5 w-5 text-[#0ea5e9]" /> {business.phone}</a>
              </div>
              {business.rating != null && (
                <div className="mt-6 flex items-center gap-3 text-sm text-[#4a6472]"><Stars rating={business.rating} /><span><span className="font-bold text-[#0c2a3a]">{business.rating}</span>{business.reviewCount != null && <> · {business.reviewCount} five-star cleans</>}</span></div>
              )}
            </div>
            <BeforeAfter />
          </div>
        </section>

        {/* Trust strip */}
        <section aria-label="Why FreshNest" className="border-y border-[#e4f0f7] bg-[#f7fcff]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-5 py-6 text-sm font-semibold text-[#33505f] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0ea5e9]" /> Insured &amp; bonded</span>
            <span className="inline-flex items-center gap-2"><Leaf className="h-4 w-4 text-[#0ea5e9]" /> Eco-friendly products</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#0ea5e9]" /> 24-hr re-clean guarantee</span>
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-[#0ea5e9]" /> {business.rating} rating</span>
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><Sparkles className="h-3.5 w-3.5" /> Our services</p>
                <h2 id="services-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cleans for every need</h2>
              </div>
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article key={i} className="flex flex-col rounded-3xl border border-[#e4f0f7] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between gap-3"><h3 className="font-display text-lg font-bold">{s.title}</h3>{s.price && <span className="shrink-0 rounded-full bg-[#eaf7fd] px-3 py-1 text-xs font-bold text-[#0284c7]">{s.price}</span>}</div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4a6472]">{s.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Included — big checklist band */}
        <section id="included" aria-labelledby="included-heading" className="scroll-mt-16 bg-[#0c2a3a] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5ccbf0]"><Check className="h-3.5 w-3.5" /> The checklist</p>
                <h2 id="included-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Nothing gets missed</h2>
                <p className="mt-5 max-w-md leading-relaxed text-[#a9c6d4]">Every visit follows a detailed checklist so you get the same spotless result, every time. Here's what's covered as standard:</p>
                <a href={cta.href} className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-7 text-sm font-bold text-white transition-colors hover:bg-[#38bdf8]">Get your free quote <ArrowRight className="h-4 w-4" /></a>
              </div>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-[#e2eef4]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0ea5e9] text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl"><p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><CalendarCheck className="h-3.5 w-3.5" /> Easy as</p><h2 id="how-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Book in three steps</h2></div>
            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li key={i} className="rounded-3xl border border-[#e4f0f7] bg-[#f7fcff] p-7">
                  <div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0ea5e9] text-white"><step.icon className="h-5 w-5" /></span><span className="font-display text-4xl font-extrabold text-[#dbeef7]">{i + 1}</span></div>
                  <h3 className="mt-4 font-display text-lg font-bold">{step.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a6472]">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 bg-[#f7fcff] py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-2xl"><p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><Sparkles className="h-3.5 w-3.5" /> The results</p><h2 id="gallery-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Spotless, every time</h2></div>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {gallery!.map((g, i) => (<figure key={i} className="group relative overflow-hidden rounded-3xl border border-[#e4f0f7] bg-[#cfe7f5]"><img src="/placeholder.svg?height=420&width=420" alt="" aria-hidden="true" className="aspect-square w-full object-cover opacity-85 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c2a3a]/70 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">{g.caption}</figcaption></figure>))}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative"><div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9]"><img src="/placeholder.svg?height=560&width=620" alt="" aria-hidden="true" className="aspect-[5/4] w-full object-cover opacity-85 mix-blend-luminosity" /></div></div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><Leaf className="h-3.5 w-3.5" /> Our story</p>
                <h2 id="about-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cleaning you can trust</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#4a6472]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 bg-[#f7fcff] py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <div className="mx-auto max-w-2xl text-center"><p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><Star className="h-3.5 w-3.5" /> Happy homes</p><h2 id="reviews-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Loved by Brampton families</h2></div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col rounded-3xl border border-[#e4f0f7] bg-white p-6 shadow-sm"><Stars rating={r.rating} /><p className="mt-4 flex-1 text-sm leading-relaxed text-[#33505f]">"{r.text}"</p><footer className="mt-5 flex items-center justify-between border-t border-[#e4f0f7] pt-4 text-sm"><span className="font-bold">{r.author}</span><span className="text-[#7d97a5]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div><p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><Check className="h-3.5 w-3.5" /> Good to know</p><h2 id="faq-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Questions, answered</h2></div>
              <div className="rounded-3xl border border-[#e4f0f7] bg-white px-6 shadow-sm"><FaqAccordion items={faqs} className="divide-[#e4f0f7]" /></div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2.5rem] border border-[#e4f0f7] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0ea5e9]"><MapPin className="h-3.5 w-3.5" /> Get a free quote</p>
                  <h2 id="contact-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Let's get you sparkling</h2>
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0ea5e9]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#7d97a5]">Office</dt><dd className="mt-1 text-sm leading-relaxed text-[#33505f]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#0ea5e9] hover:text-[#0284c7]">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                    <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0ea5e9]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#7d97a5]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#33505f] hover:text-[#0ea5e9]">{business.phone}</a></dd></div></div>
                    {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#0ea5e9]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-bold uppercase tracking-wider text-[#7d97a5]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#e4f0f7] pb-1.5 last:border-0"><span className="text-[#4a6472]">{h.day}</span><span className="font-medium text-[#0c2a3a]">{h.value}</span></li>))}</ul></dd></div></div>)}
                  </dl>
                  <a href={business.tel} className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-7 text-sm font-bold text-white transition-colors hover:bg-[#0284c7]"><Phone className="h-4 w-4" /> Call for a quote</a>
                </div>
                <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[300px] bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9]"><img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" /><span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-[#0c2a3a] shadow-lg backdrop-blur transition-transform group-hover:scale-105"><MapPin className="h-4 w-4 text-[#0ea5e9]" /> {business.area}</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4f0f7] bg-[#0c2a3a] text-[#a9c6d4]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5"><span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#22c3a6] font-display text-base font-extrabold text-white">{initialOf(business.name)}</span><span className="font-display text-lg font-extrabold text-white">{business.name}</span></div>
              <p className="mt-4 text-sm leading-relaxed">{business.category} in {business.area}.</p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> {business.phone}</a>
              {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MapPin className="h-4 w-4" /> {business.address}</a>}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#6d8b9a] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {business.name}. Insured &amp; bonded.</p><p>{business.area}</p></div>
        </div>
      </footer>
    </div>
  );
}
