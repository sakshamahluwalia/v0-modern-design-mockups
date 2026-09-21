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
  Dumbbell,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "fitness-studio",
  label: "Fitness & training studio",
  accent: "#84cc16",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a fitness studio in Brampton, ON                   */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Forge Athletic Club",
    category: "Strength & conditioning studio",
    phone: "(905) 555-0139",
    tel: "tel:+19055550139",
    address: "170 Clark Boulevard, Unit 8, Brampton, ON L6T 4Y7",
    mapsUrl: "https://maps.google.com/?q=170+Clark+Boulevard+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 312,
    hours: [
      { day: "Mon – Fri", value: "5:00 AM – 10:00 PM" },
      { day: "Saturday", value: "6:00 AM – 8:00 PM" },
      { day: "Sunday", value: "7:00 AM – 6:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "Stronger every session.",
    heroSub:
      "A coach-led strength and conditioning studio in Brampton. Small classes, real programming, and a community that shows up — whatever your starting point.",
    about:
      "Forge isn't a big-box gym with rows of machines and no one to help. We're a coaching studio built around small, semi-private classes where the coach actually knows your name, your goals, and your last workout.\n\nEvery member follows real, progressive programming — not random sweat sessions. Whether you're brand new or chasing a personal best, you'll be pushed just the right amount, and you'll never train alone.",
    services: [
      { title: "Strength 101", desc: "Learn the big lifts with coaching on every rep. Perfect for beginners.", price: "" },
      { title: "Power Hour", desc: "Heavy compound lifting with progressive programming for serious gains.", price: "" },
      { title: "Metcon", desc: "High-intensity conditioning circuits that torch calories and build engine.", price: "" },
      { title: "Mobility & Recovery", desc: "Guided stretching, breathwork, and soft-tissue work to keep you moving.", price: "" },
      { title: "Personal Training", desc: "One-on-one coaching built entirely around your goals and schedule.", price: "from $70" },
      { title: "Small-Group Coaching", desc: "Semi-private sessions of four — personal attention, team energy.", price: "from $35" },
      { title: "Nutrition Coaching", desc: "Simple, sustainable habits and check-ins to fuel your training.", price: "from $120/mo" },
      { title: "Free Trial Week", desc: "Try any class free for a week and see if we're your kind of gym.", price: "Free" },
    ],
    faq: [
      { q: "I'm a total beginner — is this for me?", a: "Completely. Most of our members started exactly there. Every class is scaled to your level, and our Strength 101 track teaches you the fundamentals with hands-on coaching before you go heavier." },
      { q: "How big are the classes?", a: "Small on purpose — capped so every member gets real coaching and feedback. That's the whole point of a studio versus a big-box gym. Book ahead, as popular times fill up." },
      { q: "Do you offer a trial?", a: "Yes. Your first week is free — try any classes on the schedule, meet the coaches, and see the community for yourself before committing to anything." },
    ],
  },
  reviews: [
    { author: "Jordan M.", rating: 5, text: "Lost 30lbs and finally deadlift double bodyweight. The coaches actually program for you and push you. Best decision I've made for my health.", relativeTime: "3 weeks ago" },
    { author: "Priya D.", rating: 5, text: "I was terrified of gyms. The small classes and the coaches changed everything — I actually look forward to training now. The community is unreal.", relativeTime: "1 month ago" },
    { author: "Sam K.", rating: 5, text: "Real coaching, real programming, real results. Not a machine-and-mirrors gym. If you want to actually get strong, come here.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "The lifting floor" },
    { caption: "Small-group class" },
    { caption: "Conditioning zone" },
    { caption: "Recovery studio" },
    { caption: "Coaches at work" },
    { caption: "Community lift night" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Start your free week", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#d7ff3e] text-[#d7ff3e]" : "fill-transparent text-[#3a3f30]")} />
      ))}
    </span>
  );
}

const LIME = "#d7ff3e";

/* Oversized outlined section index, e.g. "01" */
function Marker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden="true" className="font-display text-5xl font-black leading-none sm:text-6xl" style={{ WebkitTextStroke: `1.5px ${LIME}`, color: "transparent" }}>{n}</span>
      <span className="text-xs font-black uppercase tracking-[0.3em] text-[#d7ff3e]">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — brutalist athletic, kinetic type + marquee          */
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

  const cta = primaryCta ?? { label: "Start your free week", href: "#contact" };
  const ctaExternal = cta.href.startsWith("http");

  // Weekly timetable from class-type services (visual scaffolding; names from config).
  const classNames = services.filter((s) => !s.price || s.price === "Free").map((s) => s.title);
  const marqueeItems = classNames.length ? classNames : services.map((s) => s.title);
  const pickClass = (n: number) => (marqueeItems.length ? marqueeItems[n % marqueeItems.length] : "");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIdx = 2; // highlight "Wed" as today (visual)
  const slots = [
    { time: "6:00", classes: [0, 1, 0, 1, 0, 2] },
    { time: "12:00", classes: [2, 3, 2, 3, 2, -1] },
    { time: "18:00", classes: [1, 0, 1, 0, 1, 3] },
  ];

  const nav = [
    { label: "Classes", href: "#services" },
    { label: "Schedule", href: "#schedule" },
    ...(hasGallery ? [{ label: "Studio", href: "#gallery" }] : []),
    ...(hasReviews ? [{ label: "Results", href: "#reviews" }] : []),
    { label: "Trial", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-[#f2f2ef] antialiased selection:bg-[#d7ff3e] selection:text-black">
      <style>{`
        @keyframes forge-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .forge-marquee-track { animation: forge-marquee 26s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .forge-marquee-track { animation: none; } }
      `}</style>

      {/* Top hairline + header */}
      <div aria-hidden="true" className="h-1 w-full bg-[#d7ff3e]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-md bg-[#d7ff3e] font-display text-base font-black text-black">{initialOf(business.name)}</span>
            <span className="font-display text-lg font-black uppercase tracking-tight">{business.name}</span>
          </a>
          <div className="hidden items-center gap-5 lg:flex">
            <a href={business.tel} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a9ac9f] transition-colors hover:text-white"><Phone className="h-4 w-4 text-[#d7ff3e]" /> {business.phone}</a>
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-[#d7ff3e] px-5 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff3e] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
          </div>
          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff3e] lg:hidden">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-white/10 bg-[#0a0a0a] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">{nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-[#a9ac9f] hover:bg-white/10 hover:text-white">{n.label}</a></li>))}</ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#a9ac9f]"><Phone className="h-4 w-4 text-[#d7ff3e]" /> {business.phone}</a>
              <a href={cta.href} onClick={() => setMenuOpen(false)} className="inline-flex h-11 items-center justify-center rounded-md bg-[#d7ff3e] px-6 text-sm font-black uppercase tracking-wide text-black">{cta.label}</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — kinetic oversized type that bleeds off-screen */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[#0a0a0a]">
            <img src="/placeholder.svg?height=900&width=1600" alt="" className="h-full w-full object-cover opacity-20 mix-blend-luminosity" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#d7ff3e]/15 blur-[120px]" />
          {/* rotated side label */}
          <span aria-hidden="true" className="absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 text-xs font-black uppercase tracking-[0.5em] text-white/30 xl:block">Strength · Conditioning · Community</span>

          <div className="relative mx-auto max-w-7xl px-5 pb-0 pt-16 sm:px-8 sm:pt-20">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7ff3e]/50 bg-[#d7ff3e]/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#d7ff3e]"><Zap className="h-3.5 w-3.5" /> First week free</span>
              {business.rating != null && <span className="inline-flex items-center gap-2 text-sm font-bold text-[#a9ac9f]"><Stars rating={business.rating} /> {business.rating}{business.reviewCount != null && <span className="text-[#6f7266]"> · {business.reviewCount} reviews</span>}</span>}
            </div>

            <h1 className="mt-8 font-display font-black uppercase leading-[0.82] tracking-[-0.02em]">
              <span className="block text-[16vw] sm:text-[13vw] lg:text-[10.5rem]">Stronger</span>
              <span className="block text-[16vw] sm:text-[13vw] lg:text-[10.5rem]">
                <span style={{ WebkitTextStroke: `2px ${LIME}`, color: "transparent" }}>every</span>{" "}
                <span className="text-[#d7ff3e]">session.</span>
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-6 pb-16 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg leading-relaxed text-[#b8bbae]">{copy.heroSub}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#d7ff3e] px-8 text-base font-black uppercase tracking-wide text-black transition-colors hover:bg-white">{cta.label} <ArrowUpRight className="h-5 w-5" /></a>
                <a href="#schedule" className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/25 px-7 text-base font-black uppercase tracking-wide text-white transition-colors hover:bg-white/10">Schedule</a>
              </div>
            </div>
          </div>

          {/* Marquee band */}
          {marqueeItems.length > 0 && (
            <div className="relative flex overflow-hidden border-y-2 border-[#d7ff3e] bg-[#d7ff3e] py-3 text-black">
              <div className="forge-marquee-track flex shrink-0 items-center gap-8 pr-8">
                {[...marqueeItems, ...marqueeItems].map((t, i) => (
                  <span key={i} className="flex items-center gap-8 font-display text-xl font-black uppercase tracking-tight">{t} <Dumbbell className="h-5 w-5" /></span>
                ))}
              </div>
              <div aria-hidden="true" className="forge-marquee-track flex shrink-0 items-center gap-8 pr-8">
                {[...marqueeItems, ...marqueeItems].map((t, i) => (
                  <span key={i} className="flex items-center gap-8 font-display text-xl font-black uppercase tracking-tight">{t} <Dumbbell className="h-5 w-5" /></span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Stats — huge outlined numerals */}
        <section aria-label="By the numbers" className="border-b border-white/10 py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
            {[{ k: "1:4", v: "Coach-to-member ratio" }, { k: "40+", v: "Classes every week" }, { k: business.reviewCount != null ? `${business.reviewCount}` : "500", v: "Members strong" }, { k: business.rating != null ? `${business.rating}★` : "5★", v: "Average rating" }].map((s, i) => (
              <div key={i}>
                <p className="font-display text-6xl font-black leading-none sm:text-7xl" style={{ WebkitTextStroke: `1.5px ${LIME}`, color: "transparent" }}>{s.k}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#8a8d80]">{s.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Classes — bold indexed list */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Marker n="01" label="Train with us" />
              <h2 id="services-heading" className="mt-4 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">Pick your <span style={{ WebkitTextStroke: `2px ${LIME}`, color: "transparent" }}>weapon</span></h2>
              <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
                {services.map((s: SiteService, i) => (
                  <article key={i} className="group relative flex items-start gap-5 bg-[#0a0a0a] p-6 transition-colors hover:bg-[#12140d] sm:p-8">
                    <span aria-hidden="true" className="font-display text-3xl font-black text-white/15 transition-colors group-hover:text-[#d7ff3e]">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-xl font-black uppercase tracking-tight">{s.title}</h3>{s.price && <span className="shrink-0 rounded-full bg-[#d7ff3e]/15 px-3 py-1 text-xs font-black uppercase text-[#d7ff3e]">{s.price}</span>}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#a9ac9f]">{s.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Timetable — today lit up */}
        {marqueeItems.length > 0 && (
          <section id="schedule" aria-labelledby="schedule-heading" className="scroll-mt-16 border-y border-white/10 bg-[#0e0f0b] py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div><Marker n="02" label="This week" /><h2 id="schedule-heading" className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">The grid</h2></div>
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#d7ff3e] px-6 text-sm font-black uppercase tracking-wide text-black hover:bg-white">Reserve a spot <ArrowUpRight className="h-4 w-4" /></a>
              </div>
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead>
                    <tr>
                      <th scope="col" className="w-20 pb-4 text-xs font-black uppercase tracking-widest text-[#6f7266]">Time</th>
                      {days.map((d, di) => (
                        <th key={d} scope="col" className={cn("pb-4 text-center text-sm font-black uppercase tracking-wide", di === todayIdx ? "text-[#d7ff3e]" : "text-white")}>{d}{di === todayIdx && <span className="ml-1 text-[10px]">•</span>}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot) => (
                      <tr key={slot.time}>
                        <th scope="row" className="border-t border-white/10 py-4 pr-4 font-display text-lg font-black text-[#d7ff3e]">{slot.time}</th>
                        {slot.classes.map((c, di) => (
                          <td key={di} className={cn("border-t border-l border-white/10 p-2 text-center align-middle", di === todayIdx && "bg-[#d7ff3e]/[0.06]")}>
                            {c >= 0 ? (
                              <span className={cn("inline-block w-full rounded-md px-2 py-3 text-xs font-bold uppercase tracking-wide", di === todayIdx ? "bg-[#d7ff3e] text-black" : "bg-white/5 text-[#d4d6cc]")}>{pickClass(c)}</span>
                            ) : <span className="text-white/20">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#6f7266]">Sample week · small classes fill fast — reserve ahead</p>
            </div>
          </section>
        )}

        {/* Gallery — full-bleed strip */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-16 py-20 sm:py-28">
            <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8">
              <Marker n="03" label="Inside the box" />
              <h2 id="gallery-heading" className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">Where the work happens</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery!.map((g, i) => (
                <figure key={i} className="group relative h-72 w-64 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#26291f] sm:h-96 sm:w-80">
                  <img src="/placeholder.svg?height=520&width=420" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 pb-4 pt-10 font-display text-sm font-black uppercase tracking-wide text-white">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* About — big pull statement */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 border-y border-white/10 py-20 sm:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div><Marker n="04" label="Why Forge" /><h2 id="about-heading" className="mt-4 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">Not your average <span style={{ WebkitTextStroke: `2px ${LIME}`, color: "transparent" }}>gym</span></h2></div>
              <div className="space-y-4 text-lg leading-relaxed text-[#b8bbae]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-16 bg-[#0e0f0b] py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Marker n="05" label="Results" />
              <h2 id="reviews-heading" className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">Proof, not promises</h2>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (<blockquote key={i} className="flex flex-col rounded-lg border border-white/10 bg-[#0a0a0a] p-6"><Stars rating={r.rating} /><p className="mt-4 flex-1 text-base leading-relaxed text-[#d4d6cc]">"{r.text}"</p><footer className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="font-black uppercase tracking-wide">{r.author}</span><span className="text-[#6f7266]">{r.relativeTime}</span></footer></blockquote>))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 border-t border-white/10 py-20 sm:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div><Marker n="06" label="FAQ" /><h2 id="faq-heading" className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">Before you start</h2></div>
              <div className="rounded-lg border border-white/10 bg-[#0e0f0b] px-6"><FaqAccordion items={faqs} className="divide-white/10 [&_button]:font-display [&_button]:uppercase [&_button]:tracking-wide [&_button]:text-white [&_p]:text-[#a9ac9f]" /></div>
            </div>
          </section>
        )}

        {/* Contact — full CTA slab */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16 bg-[#d7ff3e] py-20 text-black sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Start today</p>
            <h2 id="contact-heading" className="mt-3 font-display text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">Your first week's on us.</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="max-w-md text-lg font-medium leading-relaxed text-black/80">Come try any class free for a week. Meet the coaches, feel the energy, no pressure, no contract.</p>
                <a href={business.tel} className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-black px-8 text-base font-black uppercase tracking-wide text-[#d7ff3e] transition-transform hover:scale-[1.02]"><Phone className="h-5 w-5" /> Claim your free week</a>
              </div>
              <dl className="grid gap-6 rounded-lg border border-black/15 bg-black/5 p-6 sm:p-8">
                <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><div><dt className="text-xs font-black uppercase tracking-wider text-black/60">Studio</dt><dd className="mt-1 text-sm font-semibold">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-black underline underline-offset-2 hover:no-underline">Directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><div><dt className="text-xs font-black uppercase tracking-wider text-black/60">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="font-semibold hover:underline">{business.phone}</a></dd></div></div>
                {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-black uppercase tracking-wider text-black/60">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-black/20 pb-1.5 last:border-0"><span className="text-black/70">{h.day}</span><span className="font-bold">{h.value}</span></li>))}</ul></dd></div></div>)}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0a] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5"><span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#d7ff3e] font-display text-sm font-black text-black">{initialOf(business.name)}</span><span className="font-display text-base font-black uppercase tracking-tight">{business.name}</span></div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#6f7266]">© {new Date().getFullYear()} · {business.area}</p>
          <a href={business.tel} className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#d7ff3e] hover:text-white"><Zap className="h-3.5 w-3.5" /> {business.phone}</a>
        </div>
      </footer>
    </div>
  );
}
