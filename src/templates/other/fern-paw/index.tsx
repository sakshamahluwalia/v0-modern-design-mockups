import { useState, type CSSProperties } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Quote,
  Check,
  Send,
  Sparkles,
  Heart,
  Store,
  Camera,
  MessageCircle,
  CalendarClock,
  ShieldCheck,
  Leaf,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "pet-grooming",
  label: "Pet grooming",
  accent: "#059669",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — pet grooming studio, Brampton ON                   */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Fern & Paw Grooming Studio",
    category: "Pet grooming studio",
    phone: "(905) 555-0173",
    tel: "tel:+19055550173",
    address: "42 Queen Street West, Unit 3, Brampton, ON L6X 1A4",
    mapsUrl: "https://maps.google.com/?q=42+Queen+Street+West+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 168,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Fri", value: "8:00 AM – 6:00 PM" },
      { day: "Saturday", value: "9:00 AM – 5:00 PM" },
      { day: "Sunday", value: "10:00 AM – 3:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "A calm, caring groom your best friend will actually enjoy.",
    heroSub:
      "A small, unhurried studio in Brampton where every pet gets a gentle, low-stress spa day — one-on-one attention, cage-free waiting, and a fresh, happy look you'll both love.",
    about:
      "Fern & Paw started with a simple belief: grooming should feel like a treat, not a chore. We keep our days deliberately light so every dog and cat gets patient, hands-on care from a single groomer who learns their quirks — the anxious ones, the wigglers, the seniors who need a little extra time.\n\nOur space is bright, cage-free, and quiet, with non-slip tubs, hypoallergenic products, and plenty of breaks. You're always welcome to call ahead, share what your pet loves (and doesn't), and pick them up looking and feeling their absolute best.",
    services: [
      {
        title: "Full Groom & Style",
        desc: "Bath, blow-out, breed-specific haircut, nails, ears and a finishing spritz — the complete refresh.",
        price: "from $75",
      },
      {
        title: "Bath & Brush",
        desc: "A warm bath, deep brush-out and tidy for pets who don't need a full clip. Leaves coats soft and shiny.",
        price: "from $45",
      },
      {
        title: "Puppy's First Groom",
        desc: "A gentle, confidence-building intro session so your puppy learns the salon is a happy, safe place.",
        price: "$40",
      },
      {
        title: "De-shedding Treatment",
        desc: "Specialised bath and undercoat removal that cuts loose fur dramatically — your furniture will thank you.",
        price: "from $55",
      },
      {
        title: "Cat Grooming",
        desc: "Calm, careful bathing, brushing and clipping for cats, including gentle lion cuts by a feline-friendly groomer.",
        price: "from $65",
      },
      {
        title: "Nail Trim & Paw Care",
        desc: "Quick, stress-free nail trim, filing and paw-pad tidy. Walk-ins welcome whenever we have a free bench.",
        price: "$18",
      },
      {
        title: "Teeth Brushing Add-on",
        desc: "A fresh-breath finish with pet-safe toothpaste — an easy add-on to any bath or groom.",
        price: "$12",
      },
      {
        title: "Flea & Tick Bath",
        desc: "A soothing medicated bath to knock out fleas and ticks, with a coat-and-skin check while we're at it.",
        price: "from $60",
      },
    ],
    faq: [
      {
        q: "Do I need an appointment, or can I just drop in?",
        a: "Full grooms and baths are by appointment so your pet gets our full attention with no crowded waiting. Quick nail trims are welcome as walk-ins whenever we have a free bench — a quick call ahead is never a bad idea.",
      },
      {
        q: "My dog gets anxious at the groomer. Can you help?",
        a: "Absolutely — nervous pets are our speciality. We keep the studio cage-free and quiet, work at your pet's pace with plenty of breaks, and are happy to start with a short intro visit so they can meet us before their first full groom.",
      },
      {
        q: "How long does a groom take and can I wait?",
        a: "Most full grooms take 1.5 to 3 hours depending on coat and size. You're welcome to relax nearby and we'll text when your pet is ready, or wait in our lounge — whatever's easiest for you.",
      },
    ],
  },
  reviews: [
    {
      author: "Melissa T.",
      rating: 5,
      text: "My golden doodle used to hate grooming and now he pulls me to the door. They're so patient with him and he always comes home looking incredible. Genuinely the kindest groomers we've found in Brampton.",
      relativeTime: "2 weeks ago",
    },
    {
      author: "Raj P.",
      rating: 5,
      text: "Our rescue is terrified of everything, but they took it slow and never rushed her. First time she's come back from a groom relaxed instead of shaking. Can't recommend them enough.",
      relativeTime: "1 month ago",
    },
    {
      author: "Aisha K.",
      rating: 5,
      text: "Booked a de-shedding treatment for our husky and the difference is unreal — barely any fur around the house now. Friendly, spotless studio and fair prices. We've found our forever groomer.",
      relativeTime: "2 months ago",
    },
  ],
  gallery: [
    { caption: "Doodle full groom & tidy" },
    { caption: "Golden retriever de-shed" },
    { caption: "Nervous rescue, calm first visit" },
    { caption: "Persian cat gentle lion cut" },
    { caption: "Puppy's very first spa day" },
    { caption: "Senior dog soothing bath" },
  ],
  booking: { enabled: false },
  primaryCta: { label: "Get in touch", href: "#enquiry" },
};

/* ------------------------------------------------------------------ */
/* Theme — a SINGLE accent variable drives everything. Change          */
/* `meta.accent` (or config) and every tint, ring and hover follows    */
/* via color-mix. Neutrals stay a clean, un-tinted gray.               */
/* ------------------------------------------------------------------ */

const accentVars: CSSProperties = {
  ["--accent" as string]: meta.accent,
  ["--accent-strong" as string]: "color-mix(in srgb, var(--accent) 80%, #05140d)",
  ["--accent-soft" as string]: "color-mix(in srgb, var(--accent) 12%, #ffffff)",
  ["--accent-tint" as string]: "color-mix(in srgb, var(--accent) 6%, #ffffff)",
  ["--accent-ring" as string]: "color-mix(in srgb, var(--accent) 32%, #ffffff)",
  // Panel tones for imagery — a fuller wash so placeholders read on-brand
  // (paired with mix-blend-luminosity images) instead of raw lavender.
  ["--accent-panel" as string]: "color-mix(in srgb, var(--accent) 42%, #ffffff)",
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
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
            i < full
              ? "fill-[var(--accent)] text-[var(--accent)]"
              : "fill-transparent text-neutral-300",
          )}
        />
      ))}
    </span>
  );
}

function Eyebrow({
  children,
  icon: Icon,
  center,
}: {
  children: React.ReactNode;
  icon?: typeof Heart;
  center?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]",
        center && "mx-auto",
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  icon,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  icon?: typeof Heart;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <div className={cn(center && "flex justify-center")}>
          <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 font-fraunces text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-neutral-600">{intro}</p>}
    </div>
  );
}

/* Rotating soft gradient for placeholder panels — keeps imagery lively */
function panelGradient(i: number): string {
  const mixes = [
    "from-[var(--accent-panel)] to-[var(--accent-soft)]",
    "from-[var(--accent-soft)] via-white to-[var(--accent-panel)]",
    "from-[var(--accent-panel)] to-[var(--accent-tint)]",
  ];
  return mixes[i % mixes.length];
}

/* ------------------------------------------------------------------ */
/* Lead section — Contact + enquiry CTA (the standout)                 */
/* ------------------------------------------------------------------ */

const REACH_REASONS = [
  {
    icon: MessageCircle,
    title: "Tell us about your pet",
    body: "Share their breed, coat and any quirks — the anxious ones, the seniors — so we can plan the gentlest visit.",
  },
  {
    icon: CalendarClock,
    title: "Find a time that fits",
    body: "We keep our days light, so there's rarely a long wait. We'll suggest the next calm slot that suits you.",
  },
  {
    icon: ThumbsUp,
    title: "A friendly, no-pressure reply",
    body: "A real person gets back to you quickly with a clear price and honest advice — never a hard sell.",
  },
];

function EnquirySection({ config }: { config: SiteConfig }) {
  const { business, copy } = config;
  const services = copy.services ?? [];
  const options =
    services.length > 0
      ? services.slice(0, 8).map((s) => s.title)
      : ["General enquiry", "Bath & brush", "Full groom"];

  // Presentational selection only — no submission, no fetch.
  const [service, setService] = useState(0);

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="scroll-mt-24 bg-neutral-950 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left — invitation + reasons + call */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-ring)]">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" /> Get in touch
            </span>
            <h2
              id="enquiry-heading"
              className="mt-4 font-fraunces text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
            >
              Let&apos;s plan the perfect visit for your pet.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-300">
              Send us a quick note or give us a call — tell us a little about your furry friend and
              we&apos;ll take it from there.
            </p>

            <ul className="mt-8 space-y-5">
              {REACH_REASONS.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--accent-ring)]">
                    <r.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.tel}
                className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none"
              >
                <Phone className="h-5 w-5 text-[var(--accent)]" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none"
                >
                  <MapPin className="h-5 w-5 text-[var(--accent-ring)]" /> Visit us
                </a>
              )}
            </div>
          </div>

          {/* Right — enquiry card (visual only) */}
          <div className="rounded-3xl bg-white p-6 text-neutral-900 shadow-2xl shadow-black/30 sm:p-8">
            <p className="font-fraunces text-xl font-semibold">Send an enquiry</p>
            <p className="mt-1 text-sm text-neutral-500">
              We usually reply the same day during opening hours.
            </p>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">Your name</span>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">Phone</span>
                  <input
                    type="tel"
                    placeholder="(905) 555-0100"
                    className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                  />
                </label>
              </div>

              <div>
                <span className="text-sm font-medium text-neutral-700">What can we help with?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {options.map((o, i) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setService(i)}
                      aria-pressed={service === i}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] motion-reduce:transition-none",
                        service === i
                          ? "border-[var(--accent)] bg-[var(--accent-soft)] font-medium text-[var(--accent-strong)]"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-[var(--accent-ring)]",
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-neutral-700">
                  Tell us about your pet
                </span>
                <textarea
                  rows={3}
                  placeholder="Breed, coat, temperament, anything we should know…"
                  className="mt-1.5 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                />
              </label>

              <a
                href={business.tel}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <Send className="h-5 w-5" /> Send enquiry
              </a>
              <p className="text-center text-xs text-neutral-400">
                Prefer to talk? Call{" "}
                <a href={business.tel} className="font-medium text-[var(--accent-strong)] underline">
                  {business.phone}
                </a>
              </p>
            </div>
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
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;

  // Booking is opt-in. When a future config enables it with a url, the CTA
  // links out to the booking app; otherwise the CTA is a "Get in touch" anchor.
  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Book now", href: bookingUrl }
      : { label: "Get in touch", href: "#enquiry" });
  const ctaExternal = cta.href.startsWith("http");
  const ctaProps = ctaExternal
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  const nav = [
    { label: "Services", href: "#services" },
    ...(hasGallery ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  // Generic reassurance chips (template chrome, not business identity).
  const chips = [
    { icon: Leaf, label: "Cage-free & calm" },
    { icon: ShieldCheck, label: "Gentle, pet-safe products" },
    { icon: Heart, label: "One-on-one attention" },
  ];

  return (
    <div
      style={accentVars}
      className="min-h-screen bg-white font-sans text-neutral-900 antialiased selection:bg-[var(--accent-soft)]"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent)] font-fraunces text-base font-semibold text-white shadow-sm"
            >
              {initialOf(business.name)}
            </span>
            <span className="font-fraunces text-lg font-semibold tracking-tight">
              {business.name}
            </span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 transition-colors hover:text-[var(--accent-strong)] motion-reduce:transition-none"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={cta.href}
              {...ctaProps}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] lg:hidden motion-reduce:transition-none"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-neutral-200 bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-neutral-200 pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={cta.href}
                {...ctaProps}
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — light, friendly, airy */}
        <section className="relative overflow-hidden bg-[var(--accent-tint)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--accent-soft)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[var(--accent-soft)] opacity-70 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-ring)] bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[var(--accent-strong)] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {business.category} · {business.area}
              </span>
              <h1 className="mt-5 font-fraunces text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.4rem]">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
                {copy.heroSub}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={cta.href}
                  {...ctaProps}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[var(--accent)]/30 transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  {cta.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <Phone className="h-5 w-5 text-[var(--accent)]" /> {business.phone}
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-neutral-200 pt-7 text-sm">
                {business.rating != null && (
                  <span className="inline-flex items-center gap-2">
                    <Stars rating={business.rating} />
                    <span className="text-neutral-600">
                      <span className="font-semibold text-neutral-900">{business.rating}</span>
                      {business.reviewCount != null && <> · {business.reviewCount} reviews</>}
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-neutral-600">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" /> {business.area}
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--accent-panel)] via-[var(--accent-soft)] to-white shadow-2xl shadow-neutral-900/10 ring-1 ring-white/60">
                <img
                  src="/placeholder.svg?height=680&width=620"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover opacity-40 mix-blend-luminosity"
                />
              </div>
              {business.rating != null && (
                <div className="absolute -left-4 -top-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-neutral-100 sm:flex">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Heart className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-fraunces text-sm font-semibold text-neutral-900">
                      Loved by locals
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {business.rating}★ from happy pets
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute -bottom-5 -right-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-neutral-100 sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Leaf className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-fraunces text-sm font-semibold text-neutral-900">
                    Calm & cage-free
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">A gentle spa day</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="Highlights" className="border-b border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-6 gap-y-4 px-5 py-7 sm:grid-cols-3">
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2.5 text-sm text-neutral-700"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <c.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-medium">{c.label}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="What we offer"
                icon={Sparkles}
                title="Grooming and care, tailored to your pet"
                intro="Every service is unhurried and one-on-one. Prices are a starting point — coat, size and condition can change things, so we'll always confirm before we begin."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article
                    key={i}
                    className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-ring)] hover:shadow-lg hover:shadow-[var(--accent)]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Sparkles className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {s.price && (
                        <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                          {s.price}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-fraunces text-lg font-semibold text-neutral-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
                    <a
                      href={cta.href}
                      {...ctaProps}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-strong)] transition-colors hover:gap-2 motion-reduce:transition-none"
                    >
                      Enquire <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lead section — Contact + enquiry CTA */}
        <EnquirySection config={config} />

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Happy customers"
                icon={Camera}
                title="A few of our recent visitors"
                intro="Real results from real appointments — fresh, comfortable and looking their best."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                  >
                    <div className={cn("relative overflow-hidden bg-gradient-to-br", panelGradient(i))}>
                      <img
                        src="/placeholder.svg?height=320&width=440"
                        alt=""
                        aria-hidden="true"
                        className="aspect-[4/3] w-full object-cover opacity-40 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--accent-strong)] backdrop-blur">
                        <Heart className="h-3 w-3" aria-hidden="true" /> Groom
                      </span>
                    </div>
                    <figcaption className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-neutral-700">
                      <Camera className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
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
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-neutral-50 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--accent-panel)] via-[var(--accent-soft)] to-white shadow-xl shadow-neutral-900/10 ring-1 ring-white/60">
                  <img
                    src="/placeholder.svg?height=620&width=560"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-40 mix-blend-luminosity"
                  />
                </div>
                <div className="absolute -bottom-5 -right-4 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-neutral-100 sm:flex">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Store className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-fraunces text-sm font-semibold text-neutral-900">
                      A local little studio
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">Small by design</p>
                  </div>
                </div>
              </div>
              <div>
                <SectionHeading
                  eyebrow="Our story"
                  icon={Heart}
                  title={`What makes ${business.name} different`}
                />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Cage-free, quiet studio",
                    "One groomer, start to finish",
                    "Hypoallergenic products",
                    "Patient with nervous pets",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-medium text-neutral-900"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Kind words"
                icon={Star}
                center
                title="Pets and their people love us"
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
                    className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[var(--accent-ring)]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-200 pt-4 text-sm">
                      <span className="font-semibold text-neutral-900">{r.author}</span>
                      <span className="shrink-0 text-neutral-400">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-neutral-50 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Good to know" icon={MessageCircle} title="Questions, answered" />
              <div className="rounded-2xl border border-neutral-200 bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-neutral-200" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Visit us" icon={MapPin} title="Find the studio" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-strong)]">
                          Studio
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                          {business.address}
                        </dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-strong)] transition-colors hover:gap-2 motion-reduce:transition-none"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-strong)]">
                          Phone
                        </dt>
                        <dd className="mt-1 text-sm">
                          <a
                            href={business.tel}
                            className="text-neutral-700 hover:text-[var(--accent-strong)]"
                          >
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-strong)]">
                            Hours
                          </dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between gap-6 border-b border-dashed border-neutral-200 pb-1.5 last:border-0"
                                >
                                  <span className="text-neutral-600">{h.day}</span>
                                  <span className="font-medium text-neutral-900">{h.value}</span>
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
                      href={cta.href}
                      {...ctaProps}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      {cta.label}
                    </a>
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      <Phone className="h-4 w-4 text-[var(--accent)]" /> Call us
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[300px] bg-gradient-to-br from-[var(--accent-panel)] via-[var(--accent-soft)] to-white"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg ring-1 ring-neutral-100 transition-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <MapPin className="h-4 w-4 text-[var(--accent)]" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent)] font-fraunces text-base font-semibold text-white"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-fraunces text-lg font-semibold text-neutral-900">
                  {business.name}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                {business.category} in {business.area}. Gentle, cage-free grooming for the pets you
                love.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-[var(--accent-strong)]"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 hover:text-[var(--accent-strong)]"
                >
                  <MapPin className="h-4 w-4" /> {business.address}
                </a>
              )}
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 text-neutral-600 hover:text-[var(--accent-strong)]"
              >
                <Heart className="h-4 w-4" /> Get in touch
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
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
