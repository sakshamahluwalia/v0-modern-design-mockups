import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useInView,
  animate,
} from "motion/react";
import {
  IconPhone,
  IconMapPin,
  IconClock,
  IconArrowUpRight,
  IconArrowRight,
  IconMenu2,
  IconX,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/* Memoria design system — dark, monochromatic, data-forward.          */
/* "Numbers are heroes, labels are whispers."                          */
/* Framer Motion (motion/react) + Tabler Icons.                        */
/* ------------------------------------------------------------------ */

export const meta = {
  industry: "analytics-consulting",
  label: "Strategy & analytics consultancy",
  accent: "#a3a3a3",
} as const;

export const sampleConfig: SiteConfig = {
  business: {
    name: "Vantage Advisory",
    category: "Strategy & analytics consultancy",
    phone: "(905) 555-0110",
    tel: "tel:+19055550110",
    address: "1 First Canadian Place, Suite 2400, Brampton, ON L6X 1A1",
    mapsUrl: "https://maps.google.com/?q=1+First+Canadian+Place+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 148,
    hours: [
      { day: "Monday – Thursday", value: "8:30 AM – 6:30 PM" },
      { day: "Friday", value: "8:30 AM – 5:00 PM" },
      { day: "Saturday – Sunday", value: "By appointment" },
    ],
  },
  copy: {
    heroHeadline: "Clarity, before the next decision.",
    heroSub:
      "A boutique strategy and analytics practice. We turn scattered data and hard questions into a plan the whole room can agree on.",
    about:
      "Vantage was built on a quiet conviction: most organizations don't lack data, they lack a clear read of it. We sit between your numbers and your decisions — modelling scenarios, pressure-testing assumptions, and returning something rare, a recommendation you can act on with confidence.\n\nWe work in small senior teams, take on a limited number of engagements at a time, and measure ourselves on the decisions we help you make well.",
    services: [
      { title: "Growth Strategy", desc: "Market sizing, positioning, and a sequenced plan to move on it.", price: "Engagement" },
      { title: "Data & Analytics", desc: "Models, dashboards, and the pipelines that keep them honest.", price: "Engagement" },
      { title: "Operating Diligence", desc: "Independent review of a target, a market, or your own book.", price: "Fixed fee" },
      { title: "Pricing & Margin", desc: "Where value is leaking and what a defensible price looks like.", price: "Engagement" },
      { title: "Forecasting", desc: "Scenario models your board can interrogate line by line.", price: "Fixed fee" },
      { title: "Advisory Retainer", desc: "A senior partner on call for the decisions between projects.", price: "Monthly" },
    ],
    faq: [
      { q: "How do engagements usually begin?", a: "With a short, no-obligation consultation. We scope the question, agree on what a useful answer looks like, and return a written proposal with a fixed timeline before any work starts." },
      { q: "Who actually does the work?", a: "Senior people. We deliberately keep a small bench and cap the number of concurrent engagements so a partner stays close to your work from first call to final read-out." },
      { q: "How do you handle our data?", a: "Under a mutual NDA, on infrastructure we agree with you, and with a clean hand-off at the end. You keep every model, deck, and dataset we build together." },
    ],
  },
  reviews: [
    { author: "CFO, Regional Health Network", rating: 5, text: "They cut through a year of conflicting internal analysis in three weeks. The board approved the plan on the first read.", relativeTime: "1 month ago" },
    { author: "Founder, B2B SaaS", rating: 5, text: "Calm, rigorous, and genuinely senior. The pricing model alone paid for the engagement several times over.", relativeTime: "2 months ago" },
    { author: "Managing Partner, PE Firm", rating: 5, text: "Our default diligence partner now. Fast, independent, and unafraid to tell us when a deal doesn't hold up.", relativeTime: "3 months ago" },
  ],
  gallery: [
    { caption: "Market entry model — national retailer" },
    { caption: "Unit-economics rebuild — marketplace" },
    { caption: "Pricing overhaul — industrial supplier" },
    { caption: "Board forecast — health network" },
    { caption: "Commercial diligence — PE carve-out" },
    { caption: "Analytics platform — logistics group" },
  ],
  booking: {
    enabled: true,
    label: "Book a consultation",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book a consultation", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Motion primitives                                                   */
/* ------------------------------------------------------------------ */

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Sequential revelation: blur-to-clear + rise when scrolled into view. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word blur-to-clear headline reveal (plays on mount). */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
        >
          {w}
        </motion.span>
      )).flatMap((el, i) => (i < words.length - 1 ? [el, <span key={`sp-${i}`}> </span>] : [el]))}
    </span>
  );
}

/** Numbers count up (growth, not pop) when in view. */
function Counter({ value, decimals = 0, className }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    const controls = animate(0, value, { duration: 1, ease: EASE, onUpdate: (v) => setN(v) });
    return () => controls.stop();
  }, [inView, value, reduce]);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
  return <span ref={ref} className={className}>{display}</span>;
}

/** 3D glare card (perspective tilt + cursor-following light). */
function GlareCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(mvX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(mvY, { stiffness: 150, damping: 18 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        mvY.set(((x - 50) / 50) * 3);
        mvX.set(((y - 50) / 50) * -2);
        setGlare({ x, y, o: 0.15 });
      }}
      onPointerLeave={() => { mvX.set(0); mvY.set(0); setGlare((g) => ({ ...g, o: 0 })); }}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glare.o,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 70%)`,
        }}
      />
    </motion.div>
  );
}

/** Bottom progressive-blur fade for scroll containers. */
function ProgressiveBlur() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-neutral-950/70"
      style={{
        backdropFilter: "blur(3px)",
        WebkitMaskImage: "linear-gradient(to top, black 30%, transparent)",
        maskImage: "linear-gradient(to top, black 30%, transparent)",
      }}
    />
  );
}

function MemFaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-neutral-800/60 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-500/50"
      >
        <span className="text-sm font-medium text-neutral-200 transition-colors group-hover:text-white">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-800 text-neutral-500 transition-colors group-hover:border-neutral-700 group-hover:text-neutral-300">
          {open ? <IconMinus className="h-3.5 w-3.5" stroke={1.5} /> : <IconPlus className="h-3.5 w-3.5" stroke={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-sm leading-relaxed text-neutral-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ value, decimals, label, delay }: { value: number; decimals?: number; label: string; delay: number }) {
  return (
    <Reveal delay={delay} className="text-center sm:text-left">
      <Counter value={value} decimals={decimals} className="block font-light tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl" />
      <span className="mt-3 block text-[10px] font-medium uppercase tracking-widest text-neutral-500">{label}</span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Template                                                            */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const aboutParagraphs = (copy.about ?? "").split("\n").filter((p) => p.trim().length > 0);

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl ? { label: booking?.label || "Book a consultation", href: bookingUrl } : { label: "Get in touch", href: "#contact" });
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    { label: "Practice", href: "#services" },
    ...(hasGallery ? [{ label: "Work", href: "#work" }] : []),
    { label: "Firm", href: "#about" },
    ...(hasReviews ? [{ label: "Clients", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const mix = services.slice(0, 4).map((s, i) => ({ label: s.title, pct: [34, 27, 22, 17][i] ?? 0 }));

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-neutral-950 font-sans text-neutral-300 antialiased selection:bg-neutral-700 selection:text-white">
        <style>{`
          @property --mem-beam { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
          @keyframes mem-beam-spin { to { --mem-beam: 360deg; } }
          .mem-beam { position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
            background: conic-gradient(from var(--mem-beam), transparent 0deg, rgba(163,163,163,0.55) 40deg, transparent 90deg);
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude;
            animation: mem-beam-spin 6s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .mem-beam { animation: none; } }
        `}</style>

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
            <a href="#top" className="flex items-center gap-2.5">
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/60 text-sm font-medium text-neutral-200">
                {initialOf(business.name)}
              </span>
              <span className="text-base font-medium tracking-tight text-white">{business.name}</span>
            </a>
            <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-[11px] font-medium uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-200">{n.label}</a>
              ))}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <a href={business.tel} className="inline-flex items-center gap-1.5 text-xs text-neutral-400 transition-colors hover:text-white"><IconPhone className="h-4 w-4" stroke={1.5} /> {business.phone}</a>
              <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-4 text-sm font-medium text-white transition-colors hover:border-neutral-600 hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40">{cta.label}</a>
            </div>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 lg:hidden">
              {menuOpen ? <IconX className="h-5 w-5" stroke={1.5} /> : <IconMenu2 className="h-5 w-5" stroke={1.5} />}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                aria-label="Mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden border-t border-neutral-800/60 bg-neutral-950 lg:hidden"
              >
                <div className="px-5 py-4">
                  <ul className="flex flex-col gap-1">
                    {nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800/40 hover:text-white">{n.label}</a></li>))}
                  </ul>
                  <div className="mt-3 flex flex-col gap-2 border-t border-neutral-800/60 pt-3">
                    <a href={business.tel} className="inline-flex items-center gap-2 px-3 py-2 text-sm text-neutral-400"><IconPhone className="h-4 w-4" stroke={1.5} /> {business.phone}</a>
                    <a href={cta.href} onClick={() => setMenuOpen(false)} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 px-6 text-sm font-medium text-white">{cta.label}</a>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main id="top">
          {/* Hero */}
          <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">{business.category} · {business.area}</motion.p>
            <h1 className="mt-6 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <WordReveal text={copy.heroHeadline} />
            </h1>
            <motion.p initial={{ opacity: 0, filter: "blur(8px)", y: 12 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.5 }} className="mt-7 max-w-xl text-lg font-normal leading-relaxed text-neutral-400">{copy.heroSub}</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.62 }} className="mt-9 flex flex-wrap items-center gap-3">
              <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-6 text-sm font-medium text-white transition-colors hover:border-neutral-600 hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40">{cta.label} {ctaExternal && <IconArrowUpRight className="h-4 w-4" stroke={1.5} />}</a>
              <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-800 px-6 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"><IconPhone className="h-4 w-4" stroke={1.5} /> {business.phone}</a>
            </motion.div>

            {/* Hero stats — numbers are heroes */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-neutral-800/60 pt-10 sm:mt-20 sm:gap-10">
              {business.rating != null && <Stat value={business.rating} decimals={1} label="Avg client rating" delay={0.1} />}
              {business.reviewCount != null && <Stat value={business.reviewCount} label="Engagements delivered" delay={0.18} />}
              <Stat value={services.length} label="Practice areas" delay={0.26} />
            </div>
          </section>

          {/* Practice mix — minimal distribution bar (descending grays) */}
          {mix.length > 0 && (
            <section aria-label="Practice mix" className="border-y border-neutral-800/60 bg-neutral-900/40">
              <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
                <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Where our work goes</p>
                  <div>
                    <div className="flex h-2 overflow-hidden rounded-full bg-neutral-800">
                      {mix.map((s, i) => (
                        <motion.div key={i} className="h-full" style={{ backgroundColor: `rgba(255,255,255,${0.62 - i * 0.13})` }} initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 + i * 0.08 }} />
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {mix.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-2 text-[11px] text-neutral-500">
                          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: `rgba(255,255,255,${0.62 - i * 0.13})` }} aria-hidden="true" />
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          {/* Services — 3D glare cards with focus-blur siblings */}
          {services.length > 0 && (
            <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 py-20 sm:py-28">
              <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <Reveal className="max-w-2xl">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">The practice</p>
                  <h2 id="services-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">How we help</h2>
                </Reveal>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onPointerLeave={() => setHovered(null)}>
                  {services.map((s: SiteService, i) => {
                    const blurred = hovered !== null && hovered !== i;
                    return (
                      <Reveal key={i} delay={i * 0.05}>
                        <motion.div
                          onPointerEnter={() => setHovered(i)}
                          animate={{ filter: blurred ? "blur(4px)" : "blur(0px)", scale: blurred ? 0.98 : 1, opacity: blurred ? 0.6 : 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="h-full"
                        >
                          <GlareCard className="h-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-colors hover:border-neutral-700">
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-sm font-medium text-neutral-200">{s.title}</span>
                              {s.price && <span className="shrink-0 rounded-full border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{s.price}</span>}
                            </div>
                            <p className="mt-3 text-xs leading-relaxed text-neutral-500">{s.desc}</p>
                            <div className="mt-6 flex items-center gap-1 text-[11px] uppercase tracking-widest text-neutral-600">
                              <span>{String(i + 1).padStart(2, "0")}</span>
                              <IconArrowRight className="ml-auto h-4 w-4 text-neutral-700" stroke={1.5} />
                            </div>
                          </GlareCard>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Selected work — scroll container with ProgressiveBlur + featured BorderBeam */}
          {hasGallery && (
            <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 border-y border-neutral-800/60 bg-neutral-900/40 py-20 sm:py-28">
              <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <Reveal className="lg:sticky lg:top-24 lg:h-fit">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Selected work</p>
                    <h2 id="work-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">Recent engagements</h2>
                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-500">A small sample of the questions we've been trusted with. Details stay under NDA.</p>
                    <div className="relative mt-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Signature outcome</p>
                      <p className="mt-3 text-2xl font-light tracking-tight text-white">Board-approved on the first read.</p>
                      <p className="mt-2 text-xs text-neutral-500">Three weeks, one clear recommendation.</p>
                      <div className="mem-beam" aria-hidden="true" />
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="relative">
                      <div className="max-h-[420px] overflow-y-auto pb-16 pr-1">
                        <ul className="divide-y divide-neutral-800/50">
                          {gallery!.map((g, i) => (
                            <li key={i}>
                              <a href="#contact" className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-neutral-800/20">
                                <div className="flex items-baseline gap-4">
                                  <span className="text-[11px] tabular-nums text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                                  <span className="text-sm text-neutral-300 transition-colors group-hover:text-white">{g.caption}</span>
                                </div>
                                <IconArrowUpRight className="h-4 w-4 text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100" stroke={1.5} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ProgressiveBlur />
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )}

          {/* Firm / about */}
          {aboutParagraphs.length > 0 && (
            <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-20 sm:py-28">
              <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <Reveal>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">The firm</p>
                    <h2 id="about-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">A quieter kind of rigour</h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <div className="space-y-5 text-base leading-relaxed text-neutral-400">
                      {aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )}

          {/* Booking */}
          {booking?.enabled && booking.url && (
            <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-20 border-y border-neutral-800/60 bg-neutral-900/40 py-20 sm:py-28">
              <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
                <Reveal>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Start here</p>
                  <h2 id="booking-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">Begin with a consultation</h2>
                  <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-400">A short, no-obligation conversation to scope your question. We'll follow up with a written proposal and a fixed timeline.</p>
                  <a href={booking.url} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-600 hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40">{booking.label || "Book a consultation"} <IconArrowUpRight className="h-4 w-4" stroke={1.5} /></a>
                  <p className="mt-3 text-[11px] text-neutral-600">Opens our booking page in a new tab.</p>
                </Reveal>
              </div>
            </section>
          )}

          {/* Clients / reviews */}
          {hasReviews && (
            <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-20 py-20 sm:py-28">
              <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <Reveal className="max-w-2xl">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">In their words</p>
                  <h2 id="reviews-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">What clients say</h2>
                </Reveal>
                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {reviews.map((r, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <figure className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
                        <blockquote className="flex-1 text-sm leading-relaxed text-neutral-300">"{r.text}"</blockquote>
                        <figcaption className="mt-6 border-t border-neutral-800/60 pt-4">
                          <span className="block text-sm text-neutral-200">{r.author}</span>
                          <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-neutral-600">{r.relativeTime}</span>
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-neutral-800/60 py-20 sm:py-28">
              <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <Reveal>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Good to know</p>
                    <h2 id="faq-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">Questions</h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <div>
                      {faqs.map((f, i) => (<MemFaqItem key={i} q={f.q} a={f.a} index={i} />))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          )}

          {/* Contact */}
          <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-neutral-800/60 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60">
                <div className="grid lg:grid-cols-2">
                  <Reveal className="p-8 sm:p-10">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">Contact</p>
                    <h2 id="contact-heading" className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">Let's talk</h2>
                    <dl className="mt-8 space-y-6">
                      <div className="flex gap-4">
                        <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" stroke={1.5} aria-hidden="true" />
                        <div>
                          <dt className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Office</dt>
                          <dd className="mt-1.5 text-sm leading-relaxed text-neutral-300">{business.address}</dd>
                          {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-neutral-400 transition-colors hover:text-white">Directions <IconArrowUpRight className="h-3.5 w-3.5" stroke={1.5} /></a>}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" stroke={1.5} aria-hidden="true" />
                        <div>
                          <dt className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Phone</dt>
                          <dd className="mt-1.5 text-sm"><a href={business.tel} className="text-neutral-300 transition-colors hover:text-white">{business.phone}</a></dd>
                        </div>
                      </div>
                      {hasHours && (
                        <div className="flex gap-4">
                          <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" stroke={1.5} aria-hidden="true" />
                          <div className="w-full">
                            <dt className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Hours</dt>
                            <dd className="mt-2">
                              <ul className="space-y-2 text-sm">
                                {business.hours!.map((h, i) => (
                                  <li key={i} className="flex items-center justify-between gap-6 border-b border-neutral-800/50 pb-2 last:border-0">
                                    <span className="text-neutral-500">{h.day}</span>
                                    <span className="tabular-nums text-neutral-300">{h.value}</span>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        </div>
                      )}
                    </dl>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-6 text-sm font-medium text-white transition-colors hover:border-neutral-600 hover:bg-neutral-700">{booking?.label || "Book a consultation"} <IconArrowUpRight className="h-4 w-4" stroke={1.5} /></a>}
                      <a href={business.tel} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-800 px-6 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"><IconPhone className="h-4 w-4" stroke={1.5} /> Call the office</a>
                    </div>
                  </Reveal>
                  {/* Map panel — flat neutral, no gradient */}
                  <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[300px] border-t border-neutral-800 bg-neutral-900 lg:border-l lg:border-t-0">
                    <img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-20 mix-blend-luminosity grayscale" />
                    <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-5 py-2.5 text-sm text-neutral-200 backdrop-blur transition-colors group-hover:border-neutral-600 group-hover:text-white">
                      <IconMapPin className="h-4 w-4 text-neutral-500" stroke={1.5} /> {business.area}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-neutral-800/60 bg-neutral-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/60 text-sm font-medium text-neutral-200">{initialOf(business.name)}</span>
              <span className="text-sm font-medium text-neutral-300">{business.name}</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px] uppercase tracking-widest text-neutral-600 sm:items-end">
              <a href={business.tel} className="tracking-normal text-neutral-400 transition-colors hover:text-white">{business.phone}</a>
              <span>© {new Date().getFullYear()} {business.name} · {business.area}</span>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
