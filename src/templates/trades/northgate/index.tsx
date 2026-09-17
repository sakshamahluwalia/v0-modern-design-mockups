import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  ArrowRight,
  Wrench,
  ShieldCheck,
  BadgeCheck,
  Menu,
  X,
  Quote,
  CheckCircle2,
  Flame,
  Droplets,
  Zap,
  Timer,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "plumbing-hvac",
  label: "Plumbing & HVAC",
  accent: "#f97316",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — realistic home-services company in Brampton, ON    */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Northgate Plumbing & HVAC",
    category: "Licensed plumbing, heating & cooling",
    phone: "(905) 555-0173",
    tel: "tel:+19055550173",
    address: "42 Kennedy Road South, Unit 7, Brampton, ON L6W 3E7",
    mapsUrl: "https://maps.google.com/?q=42+Kennedy+Road+South+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 341,
    hours: [
      { day: "Mon – Fri", value: "7:00 AM – 8:00 PM" },
      { day: "Saturday", value: "8:00 AM – 6:00 PM" },
      { day: "Sunday", value: "9:00 AM – 4:00 PM" },
      { day: "Emergencies", value: "24 / 7 on call" },
    ],
  },
  copy: {
    heroHeadline: "Fast, honest plumbing & HVAC — done right the first time.",
    heroSub:
      "Family-run, fully licensed and insured, serving Brampton and the surrounding GTA for over 18 years. Upfront flat-rate pricing, same-day service, and no mess left behind.",
    about:
      "Northgate started in 2006 with one van and a simple rule: treat every home like it's our own. Today we run a fleet of fully-licensed plumbers and Red Seal HVAC techs, but that rule hasn't changed.\n\nWe quote before we start, we clean up when we're done, and we back every job with a written workmanship guarantee. No surprise charges, no high-pressure upsells — just dependable work from people who pick up the phone.",
    services: [
      {
        title: "Emergency Plumbing Repair",
        desc: "Burst pipes, major leaks, and no-water calls answered 24/7 — a licensed plumber dispatched fast to stop the damage.",
        price: "From $129",
      },
      {
        title: "Drain Cleaning & Camera",
        desc: "Power snaking and hydro-jetting for slow or blocked drains, with a camera inspection so you see the real cause.",
        price: "From $99",
      },
      {
        title: "Water Heater Service",
        desc: "Repair, replacement, and tankless upgrades for gas and electric — most units swapped same day.",
        price: "From $189",
      },
      {
        title: "Furnace Repair & Install",
        desc: "High-efficiency furnace diagnostics, tune-ups, and full installs sized correctly for your home.",
        price: "From $149",
      },
      {
        title: "AC & Heat Pump Service",
        desc: "Seasonal cooling tune-ups, refrigerant repairs, and energy-smart heat pump installations.",
        price: "From $139",
      },
      {
        title: "Sump Pump & Backflow",
        desc: "Basement flood protection — sump pump installs, battery backups, and certified backflow testing.",
        price: "From $175",
      },
      {
        title: "Faucet & Fixture Install",
        desc: "Kitchen and bath faucets, toilets, and shower valves fitted clean and leak-tested on the spot.",
        price: "From $89",
      },
      {
        title: "Annual Maintenance Plan",
        desc: "A yearly plumbing + HVAC check-up that catches small problems early and keeps warranties valid.",
        price: "From $19/mo",
      },
    ],
    faq: [
      {
        q: "Do you charge for a quote or a service call?",
        a: "Estimates on planned work are always free. For diagnostic and emergency visits we charge a flat dispatch fee that is applied in full toward the repair if you go ahead — you'll know the number before we roll out.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. We hold current provincial plumbing and gas (TSSA) licences, carry $2M liability insurance, and every technician is WSIB covered. We're happy to share certificates on request.",
      },
      {
        q: "How fast can someone get to me for an emergency?",
        a: "For true emergencies in Brampton and neighbouring cities we aim to have a technician at your door within 60–90 minutes, 24 hours a day, including weekends and holidays.",
      },
    ],
  },
  reviews: [
    {
      author: "Marcus D.",
      rating: 5,
      text: "Called at 11pm with a burst pipe flooding the basement. A tech was here in under an hour, stopped the leak, and the price was exactly what I was quoted. Lifesavers.",
      relativeTime: "1 week ago",
    },
    {
      author: "Sandra P.",
      rating: 5,
      text: "New furnace and AC installed in a day. Crew was tidy, explained everything, and even swept up after. Fair price and no pushy sales pitch.",
      relativeTime: "3 weeks ago",
    },
    {
      author: "Tom R.",
      rating: 5,
      text: "Cleared a drain three other companies couldn't. Showed me the camera footage so I knew exactly what was wrong. Honest, skilled people.",
      relativeTime: "2 months ago",
    },
  ],
  gallery: [
    { caption: "Basement drain re-pipe & cleanup" },
    { caption: "Rusted tank → tankless water heater" },
    { caption: "Failed sump pump replacement" },
    { caption: "Old furnace → high-efficiency unit" },
    { caption: "Corroded shut-off valve rebuild" },
    { caption: "Clogged main line hydro-jetted clear" },
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
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < full ? "fill-[#f97316] text-[#f97316]" : "fill-transparent text-[#94a3b8]",
          )}
        />
      ))}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  onDark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#ea580c]">
          <span className="h-px w-6 bg-[#f97316]" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl",
          onDark ? "text-white" : "text-[#0f2942]",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-base leading-relaxed", onDark ? "text-slate-300" : "text-slate-600")}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* Pick a themed icon per service based on keywords — purely presentational. */
function serviceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("furnace") || t.includes("heat")) return Flame;
  if (t.includes("ac") || t.includes("cooling") || t.includes("air")) return Zap;
  if (t.includes("maintenance") || t.includes("plan")) return ShieldCheck;
  if (t.includes("emergency")) return Timer;
  return Droplets;
}

/* ------------------------------------------------------------------ */
/* Lead section — Get a quote + click-to-call (visual-only form)       */
/* ------------------------------------------------------------------ */

function QuoteSection({ config }: { config: SiteConfig }) {
  const { business, copy } = config;
  const services = copy.services ?? [];
  // "Areas we serve" derived from the primary area + nearby GTA cities.
  const areas = [
    business.area,
    "Mississauga, ON",
    "Caledon, ON",
    "Georgetown, ON",
    "Vaughan, ON",
    "Bolton, ON",
    "Malton, ON",
    "Etobicoke, ON",
  ];

  // Visual-only submit — nothing is sent anywhere.
  const [sent, setSent] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const badges = [
    { icon: BadgeCheck, label: "Licensed & TSSA certified" },
    { icon: ShieldCheck, label: "$2M insured · WSIB covered" },
    { icon: ThumbsUp, label: "Written workmanship guarantee" },
    { icon: Timer, label: "24/7 emergency response" },
  ];

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-mt-20 bg-[#0b2138] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Left — call CTA, areas, badges */}
          <div>
            <SectionHeading
              eyebrow="Get a quote"
              title="Talk to a real technician — free, no obligation."
              intro="Call now for same-day service, or send a few details and we'll get right back to you with an honest estimate."
              onDark
            />

            {/* Big phone CTA */}
            <a
              href={business.tel}
              className="group mt-8 flex items-center gap-4 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea580c] p-5 shadow-lg shadow-orange-900/30 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2138]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/20 ring-1 ring-white/30">
                <Phone className="h-7 w-7 text-white" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                  Call now · we pick up
                </span>
                <span className="mt-0.5 block truncate font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {business.phone}
                </span>
              </span>
              <ArrowUpRight className="ml-auto h-6 w-6 shrink-0 text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>

            {/* Trust badges */}
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {badges.map((b) => (
                <li key={b.label} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <b.icon className="h-5 w-5 shrink-0 text-[#f97316]" aria-hidden="true" />
                  {b.label}
                </li>
              ))}
            </ul>

            {/* Areas we serve */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                <MapPin className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> Areas we serve
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <li
                    key={a}
                    className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-100"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — quote request form (visual only) */}
          <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
            <h3 className="font-display text-xl font-extrabold text-[#0f2942]">Request your free quote</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Tell us what's going on. We usually reply within the hour during business hours.
            </p>

            {sent ? (
              <div
                role="status"
                className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center"
              >
                <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden="true" />
                <p className="font-display text-lg font-bold text-[#0f2942]">Thanks — request received!</p>
                <p className="max-w-xs text-sm text-slate-600">
                  This is a preview form. On a live site we'd be in touch shortly. For anything
                  urgent, please call{" "}
                  <a href={business.tel} className="font-semibold text-[#ea580c] underline">
                    {business.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="q-name" className="block text-sm font-semibold text-[#0f2942]">
                    Name
                  </label>
                  <input
                    id="q-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-1.5 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-[#0f2942] placeholder:text-slate-400 focus:border-[#f97316] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316]/40"
                  />
                </div>
                <div>
                  <label htmlFor="q-service" className="block text-sm font-semibold text-[#0f2942]">
                    Service needed
                  </label>
                  <select
                    id="q-service"
                    name="service"
                    defaultValue=""
                    className="mt-1.5 h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-[#0f2942] focus:border-[#f97316] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316]/40"
                  >
                    <option value="" disabled>
                      Choose a service…
                    </option>
                    {services.map((s, i) => (
                      <option key={i} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="q-message" className="block text-sm font-semibold text-[#0f2942]">
                    What's going on?
                  </label>
                  <textarea
                    id="q-message"
                    name="message"
                    rows={4}
                    placeholder="Briefly describe the problem or the job…"
                    className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-[#0f2942] placeholder:text-slate-400 focus:border-[#f97316] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#f97316]/40"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#f97316] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
                >
                  Request my quote
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-slate-400">
                  Prefer to talk? Call{" "}
                  <a href={business.tel} className="font-semibold text-[#ea580c]">
                    {business.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main template                                                       */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;

  const cta = primaryCta ?? { label: "Get a free quote", href: "#quote" };
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    { label: "Services", href: "#services" },
    { label: "Get a quote", href: "#quote" },
    ...(hasGallery ? [{ label: "Our work", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  const ctaProps = ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-[#0f2942] antialiased selection:bg-[#f97316] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b2138]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] font-display text-base font-extrabold text-white shadow-sm"
            >
              {initialOf(business.name)}
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">
              {business.name}
            </span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-[#f97316]"
            >
              <Phone className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.phone}
            </a>
            <a
              href={cta.href}
              {...ctaProps}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#f97316] px-5 text-sm font-bold text-white transition-colors hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2138]"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-white/10 bg-[#0b2138] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-white"
              >
                <Phone className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.phone}
              </a>
              <a
                href={cta.href}
                {...ctaProps}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#f97316] px-6 text-sm font-bold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0b2138]">
          {/* Subtle grid + glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#f97316] opacity-20 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-md border border-[#f97316]/40 bg-[#f97316]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#fdba74]">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> {business.category}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{copy.heroSub}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={cta.href}
                  {...ctaProps}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#f97316] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-900/30 transition-colors hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2138]"
                >
                  {cta.label}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2138]"
                >
                  <Phone className="h-5 w-5 text-[#f97316]" aria-hidden="true" /> {business.phone}
                </a>
              </div>

              {business.rating != null && (
                <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
                  <Stars rating={business.rating} />
                  <span>
                    <span className="font-bold text-white">{business.rating}</span>
                    {business.reviewCount != null && <> · {business.reviewCount} verified reviews</>}
                  </span>
                </div>
              )}
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#14324f] to-[#0b2138] shadow-2xl">
                <img
                  src="/placeholder.svg?height=620&width=560"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover opacity-[0.22] mix-blend-luminosity"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="rounded-xl border border-white/10 bg-[#081627]/80 px-5 py-4 backdrop-blur">
                    <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                      <Timer className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> Same-day &
                      24/7 emergency service
                    </p>
                    <p className="mt-1 text-xs text-slate-300">Upfront flat-rate pricing — no surprises</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -left-4 -top-4 hidden rounded-xl bg-[#f97316] px-4 py-3 shadow-lg sm:block">
                <p className="font-display text-2xl font-extrabold leading-none text-white">18+</p>
                <p className="mt-1 text-xs font-semibold text-white/90">years in the trade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="At a glance" className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 text-sm font-medium text-slate-600">
            {business.rating != null && (
              <span className="inline-flex items-center gap-2">
                <Stars rating={business.rating} />
                <span className="font-bold text-[#0f2942]">
                  {business.rating}
                  {business.reviewCount != null && (
                    <span className="font-normal text-slate-500"> ({business.reviewCount} reviews)</span>
                  )}
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> Licensed & insured
            </span>
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> 24/7 emergency service
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.area}
            </span>
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="What we do"
                title="Plumbing, heating & cooling — under one roof"
                intro="One licensed team for the whole house. Flat-rate pricing quoted before we start, and a written guarantee on every job."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => {
                  const Icon = serviceIcon(s.title);
                  return (
                    <article
                      key={i}
                      className="group flex flex-col rounded-xl border border-slate-200 border-l-4 border-l-[#f97316] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0b2138] text-[#f97316]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        {s.price && (
                          <span className="shrink-0 rounded-md bg-[#fff1e6] px-3 py-1 text-xs font-bold text-[#ea580c]">
                            {s.price}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-[#0f2942]">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                      <a
                        href="#quote"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#ea580c] transition-colors hover:text-[#0f2942]"
                      >
                        Get a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Lead section */}
        <QuoteSection config={config} />

        {/* Gallery — before/after */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Recent work"
                title="Before & after — real Brampton jobs"
                intro="A few recent repairs and installs from our crews. Every job left cleaner than we found it."
              />
              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="grid grid-cols-2">
                      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-slate-500 to-slate-700">
                        <Wrench className="h-8 w-8 text-white/25" aria-hidden="true" />
                        <span className="absolute left-2 top-2 rounded bg-slate-900/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Before
                        </span>
                      </div>
                      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-[#f97316] to-[#ea580c]">
                        <CheckCircle2 className="h-8 w-8 text-white/40" aria-hidden="true" />
                        <span className="absolute right-2 top-2 rounded bg-[#0b2138] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          After
                        </span>
                      </div>
                    </div>
                    <figcaption className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#0f2942]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f97316]" aria-hidden="true" />
                      {g.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 bg-white py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#14324f] to-[#0b2138] shadow-xl">
                  <img
                    src="/placeholder.svg?height=560&width=520"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-[0.22] mix-blend-luminosity"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 hidden rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg sm:block">
                  <p className="flex items-center gap-2 font-display text-sm font-bold text-[#0f2942]">
                    <ShieldCheck className="h-5 w-5 text-[#f97316]" aria-hidden="true" /> Family-run
                    & fully licensed
                  </p>
                </div>
              </div>
              <div>
                <SectionHeading eyebrow="Who we are" title={`Why homeowners call ${business.name}`} />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Upfront flat-rate pricing",
                    "Clean, tidy work sites",
                    "Written workmanship guarantee",
                    "Local, background-checked techs",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-medium text-[#0f2942]">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f97316]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Word of mouth"
                title="Neighbours who trust us"
                center
                intro={
                  business.rating != null
                    ? `Rated ${business.rating} out of 5${
                        business.reviewCount != null ? ` across ${business.reviewCount} reviews` : ""
                      }.`
                    : undefined
                }
              />
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (
                  <blockquote
                    key={i}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[#f97316]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
                      <span className="font-bold text-[#0f2942]">{r.author}</span>
                      <span className="text-slate-500">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 bg-white py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Good to know" title="Questions, answered straight" />
              <div className="rounded-xl border border-slate-200 bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-slate-200" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Get in touch" title="Reach the shop" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#f97316]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">Address</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-700">{business.address}</dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#ea580c] transition-colors hover:text-[#0f2942]"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#f97316]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">Phone</dt>
                        <dd className="mt-1 text-sm">
                          <a href={business.tel} className="font-semibold text-slate-700 hover:text-[#ea580c]">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f97316]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">Hours</dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between gap-6 border-b border-dashed border-slate-200 pb-1.5 last:border-0"
                                >
                                  <span className="text-slate-600">{h.day}</span>
                                  <span className="font-semibold text-[#0f2942]">{h.value}</span>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f97316] px-7 text-sm font-bold text-white transition-colors hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" /> Call {business.phone}
                    </a>
                    <a
                      href="#quote"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-7 text-sm font-bold text-[#0f2942] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
                    >
                      Request a quote
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[280px] bg-gradient-to-br from-[#14324f] to-[#0b2138]"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-[0.22] mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0f2942] shadow-lg transition-transform group-hover:scale-105">
                    <MapPin className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#081627] text-slate-300">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#f97316] to-[#ea580c] font-display text-base font-extrabold text-white"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-display text-lg font-extrabold text-white">{business.name}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {business.category} in {business.area}. Licensed, insured, and on call 24/7.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <Phone className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <MapPin className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> {business.address}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
            <p>{business.area}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
