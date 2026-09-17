import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  CalendarCheck,
  CalendarDays,
  ArrowUpRight,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Menu,
  X,
  Quote,
  Check,
  Plus,
  Accessibility,
  BadgeCheck,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "dental",
  label: "Dental practice",
  accent: "#0d9488",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — realistic dental practice in Brampton, ON          */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Brightpath Dental & Wellness",
    category: "Family & cosmetic dental practice",
    phone: "(905) 555-0172",
    tel: "tel:+19055550172",
    address: "245 Queen Street East, Unit 12, Brampton, ON L6W 2B8",
    mapsUrl: "https://maps.google.com/?q=245+Queen+Street+East+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 328,
    hours: [
      { day: "Monday", value: "8:00 AM – 6:00 PM" },
      { day: "Tue – Thu", value: "8:00 AM – 8:00 PM" },
      { day: "Friday", value: "8:00 AM – 4:00 PM" },
      { day: "Saturday", value: "9:00 AM – 2:00 PM" },
      { day: "Sunday", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "Gentle, modern dental care for your whole family.",
    heroSub:
      "A calm, judgment-free practice in Brampton where honest advice, up-to-date technology, and a genuinely comfortable visit come standard — for first cleanings and full smile makeovers alike.",
    about:
      "Brightpath Dental & Wellness opened in 2011 with one goal: to make going to the dentist something you don't dread. Our team of registered dentists, hygienists, and assistants take the time to explain your options clearly, so you always know what's happening and why.\n\nFrom nervous first-timers to families juggling busy schedules, we tailor every visit to the person in the chair. Same-day emergency slots, direct insurance billing, and a bright, accessible clinic mean the care you need is genuinely within reach.",
    services: [
      {
        title: "New Patient Exam & Cleaning",
        desc: "A thorough check-up, digital X-rays, and a gentle professional cleaning to set your baseline.",
        price: "$149",
      },
      {
        title: "Checkup & Hygiene Recall",
        desc: "Routine six-month cleaning and exam to keep teeth and gums healthy and catch issues early.",
        price: "from $110",
      },
      {
        title: "Teeth Whitening",
        desc: "Safe, dentist-supervised whitening with custom trays for a brighter, natural-looking smile.",
        price: "from $299",
      },
      {
        title: "Fillings & Crowns",
        desc: "Tooth-coloured fillings and durable crowns to restore comfort, function, and appearance.",
        price: "from $185",
      },
      {
        title: "Invisible Aligners",
        desc: "Discreet, removable clear aligners with a personalised plan and regular progress checks.",
        price: "from $3,500",
      },
      {
        title: "Emergency Dental Care",
        desc: "Same-day relief for toothaches, chips, and lost fillings — call us and we'll fit you in.",
      },
      {
        title: "Dental Implants",
        desc: "A permanent, natural-feeling replacement for missing teeth, planned start to finish in-house.",
      },
      {
        title: "Kids' Dentistry",
        desc: "Friendly, patient visits that help children build healthy habits and feel at ease.",
        price: "from $95",
      },
    ],
    faq: [
      {
        q: "Do you take my insurance?",
        a: "We work with all major Canadian dental insurance providers and bill them directly whenever possible, so you only pay any remaining balance. Bring your details to your first visit and we'll handle the paperwork.",
      },
      {
        q: "Are you accepting new patients?",
        a: "Yes — we're happily welcoming new patients and families of every age. Request an appointment online or give us a call and we'll find a time that works for you, usually within a few days.",
      },
      {
        q: "I'm nervous about the dentist. Can you help?",
        a: "Absolutely. Dental anxiety is very common and we see it every day. Let us know when you book and we'll take things at your pace, explain each step, and offer comfort options so you feel in control the whole time.",
      },
    ],
  },
  reviews: [
    {
      author: "Marcus T.",
      rating: 5,
      text: "I've avoided dentists for years out of anxiety. The team here was so patient and gentle — I actually didn't mind coming back for my cleaning. Highly recommend for nervous patients.",
      relativeTime: "3 weeks ago",
    },
    {
      author: "Simran D.",
      rating: 5,
      text: "Took all three of my kids and they were fantastic with them. Clean, modern clinic and they billed our insurance directly so there were no surprises. Finally found our family dentist.",
      relativeTime: "1 month ago",
    },
    {
      author: "Robert P.",
      rating: 5,
      text: "Chipped a tooth on a Saturday and they saw me same day. Fixed it painlessly and explained everything clearly. Professional, kind, and no upselling. Couldn't ask for more.",
      relativeTime: "2 months ago",
    },
  ],
  gallery: [
    { caption: "Bright, welcoming reception" },
    { caption: "Modern treatment suites" },
    { caption: "Our friendly dental team" },
    { caption: "Digital imaging technology" },
    { caption: "Calming family waiting area" },
    { caption: "Accessible, ground-floor clinic" },
  ],
  booking: {
    enabled: true,
    label: "Request an appointment",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Request an appointment", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Palette tokens (kept local so the template is fully self-contained) */
/*   ink #0b2f36 · muted #5b7178 · teal #0d9488 · tealDark #0f766e     */
/*   sky #0284c7 · tint #f0fbfa · line #d6eceb                          */
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
            i < full ? "fill-[#0d9488] text-[#0d9488]" : "fill-transparent text-[#b8d8d5]",
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
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  icon?: typeof Stethoscope;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0d9488]",
            center && "justify-center",
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />} {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#0b2f36] sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-[#5b7178]">{intro}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lead section — Request an appointment (visual only; CTA links out)  */
/* ------------------------------------------------------------------ */

const REASSURANCE = [
  {
    icon: ShieldCheck,
    title: "Direct insurance billing",
    body: "We bill all major providers directly — you only cover any remainder.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & trusted",
    body: "Registered dentists and hygienists in good standing with the RCDSO.",
  },
  {
    icon: Accessibility,
    title: "Accessible & easy",
    body: "Ground-floor clinic, free parking, and same-day emergency slots.",
  },
];

function AppointmentSection({ config }: { config: SiteConfig }) {
  const booking = config.booking;
  const services = config.copy.services ?? [];
  const label = booking?.label || "Request an appointment";

  const reasons =
    services.length > 0
      ? services.slice(0, 6).map((s) => s.title)
      : ["General checkup", "Cleaning", "Consultation"];
  const days = ["Mon 22", "Tue 23", "Wed 24", "Thu 25", "Fri 26", "Sat 27"];
  const partsOfDay = [
    { label: "Morning", icon: Sun },
    { label: "Afternoon", icon: Sunset },
    { label: "Evening", icon: Moon },
  ];

  // Presentational selections only — the real request happens on the booking page.
  const [reason, setReason] = useState(0);
  const [day, setDay] = useState(1);
  const [part, setPart] = useState(0);

  return (
    <section
      id="appointment"
      aria-labelledby="appointment-heading"
      className="scroll-mt-24 bg-gradient-to-b from-[#f0fbfa] to-[#e2f5f3] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0d9488]">
            <CalendarCheck className="h-3.5 w-3.5" /> Appointments
          </span>
          <h2
            id="appointment-heading"
            className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#0b2f36] sm:text-4xl"
          >
            Request an appointment — we'll take it from here.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5b7178]">
            Tell us what you need and when suits you. Send your request and our front desk will
            confirm a time that works, usually within one business day. New patients always welcome.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#0d9488]/10 ring-1 ring-[#d6eceb]">
          <div className="grid gap-0 md:grid-cols-5">
            {/* Preferences (visual) */}
            <div className="p-6 sm:p-8 md:col-span-3">
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                  1 · Reason for visit
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {reasons.map((r, i) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReason(i)}
                      aria-pressed={reason === i}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-1 motion-reduce:transition-none",
                        reason === i
                          ? "border-[#0d9488] bg-[#f0fbfa] font-medium text-[#0b2f36]"
                          : "border-[#e0efee] bg-white text-[#5b7178] hover:border-[#a9dbd6]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          reason === i
                            ? "border-[#0d9488] bg-[#0d9488] text-white"
                            : "border-[#cbe4e1] text-transparent",
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {r}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 grid gap-7">
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                    2 · Preferred day
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {days.map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDay(i)}
                        aria-pressed={day === i}
                        className={cn(
                          "rounded-xl border px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-1 motion-reduce:transition-none",
                          day === i
                            ? "border-[#0d9488] bg-[#0d9488] text-white"
                            : "border-[#e0efee] bg-white text-[#5b7178] hover:border-[#a9dbd6]",
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                    3 · Time of day
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {partsOfDay.map((p, i) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setPart(i)}
                        aria-pressed={part === i}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-1 motion-reduce:transition-none",
                          part === i
                            ? "border-[#0d9488] bg-[#0d9488] text-white"
                            : "border-[#e0efee] bg-white text-[#5b7178] hover:border-[#a9dbd6]",
                        )}
                      >
                        <p.icon className="h-4 w-4" aria-hidden="true" /> {p.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="flex flex-col justify-between gap-6 border-t border-[#e0efee] bg-[#f7fdfc] p-6 sm:p-8 md:col-span-2 md:border-l md:border-t-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                  Your request
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#7c9297]">Reason</dt>
                    <dd className="text-right font-medium text-[#0b2f36]">{reasons[reason]}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#7c9297]">Day</dt>
                    <dd className="font-medium text-[#0b2f36]">{days[day]}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#7c9297]">Time</dt>
                    <dd className="font-medium text-[#0b2f36]">{partsOfDay[part].label}</dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-2 border-t border-[#e0efee] pt-4 text-xs text-[#5b7178]">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#0d9488]" aria-hidden="true" /> No
                    account or payment needed
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#0d9488]" aria-hidden="true" /> We
                    confirm within one business day
                  </li>
                </ul>
              </div>

              {booking?.enabled && booking.url && (
                <div>
                  <a
                    href={booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0d9488] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    {label}
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[#7c9297]">
                    Opens our secure booking page in a new tab.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reassurance cards */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {REASSURANCE.map((r) => (
            <div
              key={r.title}
              className="flex flex-col gap-2 rounded-2xl border border-[#d6eceb] bg-white/70 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2f5f3] text-[#0d9488]">
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-1 text-sm font-semibold text-[#0b2f36]">{r.title}</p>
              <p className="text-xs leading-relaxed text-[#5b7178]">{r.body}</p>
            </div>
          ))}
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

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Request an appointment", href: bookingUrl }
      : { label: "Call the clinic", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");
  const ctaAnchor = booking?.enabled ? "#appointment" : undefined;

  const nav = [
    { label: "Services", href: "#services" },
    ...(booking?.enabled ? [{ label: "Appointments", href: "#appointment" }] : []),
    ...(hasGallery ? [{ label: "Our clinic", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0b2f36] antialiased selection:bg-[#bdeae5] selection:text-[#0b2f36]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e6f2f1] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0284c7] font-display text-base font-bold text-white shadow-sm"
            >
              {initialOf(business.name)}
              <Plus className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-white p-0.5 text-[#0d9488] shadow-sm" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">{business.name}</span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5b7178] transition-colors hover:text-[#0d9488] motion-reduce:transition-none"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={ctaAnchor ?? cta.href}
              {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0d9488] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#0b2f36] transition-colors hover:bg-[#eefaf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] lg:hidden motion-reduce:transition-none"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e6f2f1] bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5b7178] hover:bg-[#eefaf9] hover:text-[#0d9488]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e6f2f1] pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5b7178]"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={ctaAnchor ?? cta.href}
                onClick={() => setMenuOpen(false)}
                {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#0d9488] px-6 text-sm font-semibold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f4fcfb] to-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#cdeeeb] opacity-60 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-48 h-80 w-80 rounded-full bg-[#d6ebf7] opacity-50 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c8e9e5] bg-white px-3.5 py-1.5 text-xs font-medium text-[#0d9488] shadow-sm">
                <HeartPulse className="h-3.5 w-3.5" /> {business.category} · {business.area}
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#0b2f36] sm:text-5xl lg:text-[3.4rem]">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5b7178]">{copy.heroSub}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={ctaAnchor ?? cta.href}
                  {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#0d9488] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0d9488]/25 transition-colors hover:bg-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  {cta.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#cbe4e1] bg-white px-7 py-3.5 text-base font-semibold text-[#0b2f36] transition-colors hover:bg-[#f4fcfb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <Phone className="h-5 w-5 text-[#0d9488]" /> {business.phone}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#5b7178]">
                {business.rating != null && (
                  <span className="inline-flex items-center gap-2">
                    <Stars rating={business.rating} />
                    <span>
                      <span className="font-semibold text-[#0b2f36]">{business.rating}</span>
                      {business.reviewCount != null && <> · {business.reviewCount} reviews</>}
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#0d9488]" /> Accepting new patients
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#a7ded8] via-[#7fcbdd] to-[#5aa9d6] shadow-xl shadow-[#0d9488]/20 ring-1 ring-white/40">
                <img
                  src="/placeholder.svg?height=720&width=620"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover opacity-90 mix-blend-luminosity"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-[#e6f2f1] sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2f5f3] text-[#0d9488]">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-[#0b2f36]">Same-day emergencies</p>
                  <p className="mt-0.5 text-xs text-[#7c9297]">Flexible appointment times</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="At a glance" className="border-y border-[#e6f2f1] bg-[#f7fdfc]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-sm text-[#5b7178]">
            {business.rating != null && (
              <span className="inline-flex items-center gap-2">
                <Stars rating={business.rating} />
                <span className="font-medium text-[#0b2f36]">
                  {business.rating}
                  {business.reviewCount != null && (
                    <span className="font-normal text-[#7c9297]"> ({business.reviewCount} reviews)</span>
                  )}
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0d9488]" /> {business.area}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0d9488]" /> Direct insurance billing
            </span>
            <span className="inline-flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[#0d9488]" /> Registered dental team
            </span>
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Treatments & services"
                icon={Stethoscope}
                title="Care for every smile, every stage of life"
                intro="From routine cleanings to full restorations, every visit starts with a clear explanation and an honest plan — no surprises, no pressure."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article
                    key={i}
                    className="group flex flex-col rounded-2xl border border-[#e6f2f1] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#bfe4e0] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-[#0b2f36]">{s.title}</h3>
                      {s.price && (
                        <span className="shrink-0 rounded-full bg-[#e2f5f3] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                          {s.price}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5b7178]">{s.desc}</p>
                    {booking?.enabled && (
                      <a
                        href="#appointment"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0d9488] transition-colors hover:text-[#0f766e] motion-reduce:transition-none"
                      >
                        Request this <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lead section — Request an appointment */}
        {booking?.enabled && <AppointmentSection config={config} />}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#bfe4e0] via-[#8fd0dc] to-[#5aa9d6] shadow-xl shadow-[#0d9488]/20 ring-1 ring-white/40">
                  <img
                    src="/placeholder.svg?height=620&width=560"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-90 mix-blend-luminosity"
                  />
                </div>
                {business.rating != null && (
                  <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-white px-4 py-3 text-center shadow-lg ring-1 ring-[#e6f2f1] sm:block">
                    <p className="font-display text-2xl font-bold text-[#0d9488]">{business.rating}</p>
                    <p className="text-xs text-[#7c9297]">patient rating</p>
                  </div>
                )}
              </div>
              <div>
                <SectionHeading eyebrow="Our practice" icon={HeartPulse} title={`Welcome to ${business.name}`} />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5b7178]">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Gentle, anxiety-aware care",
                    "Clear pricing up front",
                    "Modern, digital equipment",
                    "Families & all ages welcome",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#0b2f36]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e2f5f3] text-[#0d9488]">
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

        {/* Gallery — our clinic */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 bg-[#f7fdfc] py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Inside the clinic"
                icon={Plus}
                title="A calm, modern space built for comfort"
                intro="Bright, spotless, and welcoming — from the front desk to the treatment chair."
              />
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm ring-1 ring-[#e0efee]",
                      i % 3 === 0
                        ? "from-[#a7ded8] to-[#5aa9d6]"
                        : i % 3 === 1
                          ? "from-[#bfe4e0] to-[#7fcbdd]"
                          : "from-[#cdeeeb] to-[#9ad3e7]",
                      i === 0 && "col-span-2 sm:col-span-1",
                    )}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=400"
                      alt=""
                      aria-hidden="true"
                      className="aspect-square w-full object-cover opacity-85 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#083b41]/70 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white">
                      {g.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Patient stories"
                icon={Star}
                center
                title="Trusted by families like yours"
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
                    className="flex flex-col rounded-2xl border border-[#e6f2f1] bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[#bfe4e0]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#33565c]">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between border-t border-[#e6f2f1] pt-4 text-sm">
                      <span className="font-semibold text-[#0b2f36]">{r.author}</span>
                      <span className="text-[#7c9297]">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#f7fdfc] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Good to know" icon={ShieldCheck} title="Questions, answered" />
              <div className="rounded-2xl border border-[#e6f2f1] bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-[#e6f2f1]" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#e6f2f1] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Visit us" icon={MapPin} title="Find & reach the clinic" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0d9488]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#0d9488]">Address</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#33565c]">{business.address}</dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#0d9488] transition-colors hover:text-[#0f766e] motion-reduce:transition-none"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0d9488]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#0d9488]">Phone</dt>
                        <dd className="mt-1 text-sm">
                          <a href={business.tel} className="text-[#33565c] hover:text-[#0d9488]">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#0d9488]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-[#0d9488]">Hours</dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between gap-6 border-b border-dashed border-[#e6f2f1] pb-1.5 last:border-0"
                                >
                                  <span className="text-[#5b7178]">{h.day}</span>
                                  <span className="font-medium text-[#0b2f36]">{h.value}</span>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {bookingUrl && (
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0d9488] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
                      >
                        {booking?.label || "Request an appointment"}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#cbe4e1] bg-white px-7 text-sm font-semibold text-[#0b2f36] transition-colors hover:bg-[#f4fcfb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      <Phone className="h-4 w-4 text-[#0d9488]" /> Call the clinic
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[300px] bg-gradient-to-br from-[#a7ded8] via-[#7fcbdd] to-[#5aa9d6]"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-75 mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b2f36] shadow-lg ring-1 ring-[#e6f2f1] transition-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <MapPin className="h-4 w-4 text-[#0d9488]" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e6f2f1] bg-[#0b2f36] text-[#cfe5e6]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0284c7] font-display text-base font-bold text-white"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-display text-lg font-bold text-white">{business.name}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#8fb3b6]">
                {business.category} in {business.area}. Accepting new patients of all ages.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 text-[#cfe5e6] hover:text-white">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#cfe5e6] hover:text-white"
                >
                  <MapPin className="h-4 w-4" /> {business.address}
                </a>
              )}
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#cfe5e6] hover:text-white"
                >
                  <CalendarDays className="h-4 w-4" /> {booking?.label || "Request an appointment"}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#6f9497] sm:flex-row sm:items-center sm:justify-between">
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
