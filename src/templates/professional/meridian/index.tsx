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
  Quote,
  Check,
  Scale,
  Landmark,
  ShieldCheck,
  BadgeCheck,
  Briefcase,
  CalendarClock,
  FileText,
  TrendingUp,
  Award,
  Users,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "accountant",
  label: "Accounting & advisory",
  accent: "#4f46e5",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — accounting & business advisory firm, Brampton ON   */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Meridian Tax & Advisory",
    category: "Chartered accountants & business advisors",
    phone: "(905) 555-0184",
    tel: "tel:+19055550184",
    address: "88 Main Street North, Suite 500, Brampton, ON L6V 1N6",
    mapsUrl: "https://maps.google.com/?q=88+Main+Street+North+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 214,
    hours: [
      { day: "Monday", value: "9:00 AM – 6:00 PM" },
      { day: "Tue – Thu", value: "9:00 AM – 6:00 PM" },
      { day: "Friday", value: "9:00 AM – 4:00 PM" },
      { day: "Saturday", value: "By appointment" },
      { day: "Sunday", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "Clear financial advice that moves your business forward.",
    heroSub:
      "A boutique team of chartered accountants and advisors in Brampton helping owner-managed businesses and professionals keep more of what they earn — with proactive tax planning, tidy books, and straight answers you can act on.",
    about:
      "Meridian Tax & Advisory was founded in 2007 on a simple idea: small and mid-sized businesses deserve the same calibre of financial advice the big firms reserve for their largest clients. We pair rigorous, up-to-date technical work with plain-language guidance, so you always understand the numbers behind the decision.\n\nFrom incorporation and your first payroll run to succession planning and CRA disputes, we act as a single, accountable point of contact. No revolving door of junior staff, no jargon, no surprises at year-end — just a partner who knows your file and picks up the phone.",
    services: [
      {
        title: "Personal Tax Returns",
        desc: "Accurate T1 preparation with every credit and deduction you're entitled to, filed on time and reviewed by a CPA.",
        price: "from $89",
      },
      {
        title: "Corporate Tax & Year-End",
        desc: "T2 corporate filings, financial statements, and proactive planning to legally minimise what your company owes.",
        price: "from $850",
      },
      {
        title: "Bookkeeping & Cloud Accounting",
        desc: "Monthly bookkeeping on QuickBooks or Xero, reconciled and reported so you always know where you stand.",
        price: "from $299/mo",
      },
      {
        title: "Business Incorporation",
        desc: "Federal or Ontario incorporation done right — share structure, minute book, and first-year tax setup included.",
        price: "$1,200",
      },
      {
        title: "Payroll & HST Filings",
        desc: "Reliable payroll runs, source deductions, and on-time HST/GST remittances that keep you onside with the CRA.",
        price: "from $75/mo",
      },
      {
        title: "CFO & Advisory Services",
        desc: "Fractional CFO support — budgeting, cash-flow forecasting, and financing strategy tailored to your growth stage.",
        price: "Custom quote",
      },
      {
        title: "Audit & Assurance",
        desc: "Independent review and audit engagements for lenders, boards, and grant programs, handled discreetly.",
        price: "Custom quote",
      },
      {
        title: "CRA Audit & Dispute Support",
        desc: "Experienced representation for reviews, audits, and objections — we deal with the CRA so you don't have to.",
        price: "Custom quote",
      },
    ],
    faq: [
      {
        q: "Do I need to switch accountants mid-year to work with you?",
        a: "Not at all. We handle the transition end-to-end — requesting your prior-year files, reconciling opening balances, and coordinating with your previous accountant. Most clients are fully onboarded within two weeks with zero disruption.",
      },
      {
        q: "How does your pricing work?",
        a: "Most engagements are fixed-fee, agreed in writing before any work begins, so there are no surprise invoices. Ongoing services like bookkeeping and payroll are billed at a flat monthly rate. Complex advisory work is scoped and quoted individually.",
      },
      {
        q: "Can you help if I've fallen behind on filings or the CRA has contacted me?",
        a: "Yes — this is one of the most common reasons clients come to us. We'll bring your filings current, deal with any penalties or interest where possible, and represent you directly with the CRA. Everything is handled confidentially and without judgment.",
      },
    ],
  },
  reviews: [
    {
      author: "Priya S., Retail owner",
      rating: 5,
      text: "Meridian restructured how we pay ourselves and saved us more in the first year than a decade of fees. They explain everything in plain English and always answer the phone. Genuinely feels like having a partner.",
      relativeTime: "1 month ago",
    },
    {
      author: "Daniel R., Contractor",
      rating: 5,
      text: "The CRA flagged three years of my returns and I was panicking. Their team took over completely, resolved the audit, and I owed far less than I feared. Worth every penny for the peace of mind alone.",
      relativeTime: "2 months ago",
    },
    {
      author: "Amrita K., Clinic director",
      rating: 5,
      text: "Switched from a big downtown firm and never looked back. Same technical quality, but I actually know the person doing my work. Books are always current and year-end is a non-event now.",
      relativeTime: "3 months ago",
    },
  ],
  gallery: [
    { caption: "Manufacturer · $312K in corporate tax deferred" },
    { caption: "Tech startup · Series-A financials & due diligence" },
    { caption: "Restaurant group · 3-location expansion structured" },
    { caption: "Contractor · CRA audit closed, penalties waived" },
    { caption: "Retail chain · migrated to cloud bookkeeping" },
    { caption: "Family business · succession & estate plan" },
  ],
  booking: {
    enabled: true,
    label: "Book a consultation",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book a consultation", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Palette tokens (kept local so the template is fully self-contained) */
/*   ink #0b1327 · navy #12204a · slate #55617a · faint #8a93ab        */
/*   accent #4f46e5 · accentDark #4338ca · soft #eef0ff · line #e6e8f1  */
/*   tint #f5f6fb                                                       */
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
            i < full ? "fill-[#4f46e5] text-[#4f46e5]" : "fill-transparent text-[#c7cbe6]",
          )}
        />
      ))}
    </span>
  );
}

function Eyebrow({
  children,
  icon: Icon,
  onDark,
  center,
}: {
  children: React.ReactNode;
  icon?: typeof Scale;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        onDark ? "text-[#a6adff]" : "text-[#4f46e5]",
        center && "justify-center",
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
  icon?: typeof Scale;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <Eyebrow icon={icon} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#0b1327] sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-[#55617a]">{intro}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lead section — Book a consultation (credibility-forward; CTA out)   */
/* ------------------------------------------------------------------ */

const EXPECT = [
  {
    icon: CalendarClock,
    title: "A free 30-minute consultation",
    body: "No obligation, no jargon — a genuine conversation about where you stand and what's possible.",
  },
  {
    icon: FileText,
    title: "A clear, fixed-fee proposal",
    body: "Scope and price agreed in writing before any work begins, so there are never surprise invoices.",
  },
  {
    icon: ShieldCheck,
    title: "One accountable point of contact",
    body: "You work directly with a senior advisor who knows your file — not a rotating cast of juniors.",
  },
];

function ConsultationSection({ config }: { config: SiteConfig }) {
  const booking = config.booking;
  const services = config.copy.services ?? [];
  const label = booking?.label || "Book a consultation";

  const topics =
    services.length > 0
      ? services.slice(0, 6).map((s) => s.title)
      : ["General enquiry", "Tax planning", "Advisory"];
  const days = ["Mon 22", "Tue 23", "Wed 24", "Thu 25", "Fri 26"];
  const slots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  // Presentational selections only — the real booking happens on the linked page.
  const [topic, setTopic] = useState(0);
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState(2);

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="scroll-mt-24 bg-[#f5f6fb] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow icon={CalendarClock} center>
            Book a consultation
          </Eyebrow>
          <h2
            id="consultation-heading"
            className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#0b1327] sm:text-4xl"
          >
            Start with a conversation, not a commitment.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#55617a]">
            Pick a time that suits you and tell us what's on your mind. We'll come prepared, listen
            first, and lay out a clear path forward — the initial consultation is always free.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-[#e6e8f1] bg-white shadow-xl shadow-[#0b1327]/10">
          <div className="grid gap-0 md:grid-cols-5">
            {/* Preferences (visual) */}
            <div className="p-6 sm:p-8 md:col-span-3">
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
                  1 · What can we help with?
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {topics.map((t, i) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(i)}
                      aria-pressed={topic === i}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-1 motion-reduce:transition-none",
                        topic === i
                          ? "border-[#4f46e5] bg-[#eef0ff] font-medium text-[#0b1327]"
                          : "border-[#e6e8f1] bg-white text-[#55617a] hover:border-[#b9befb]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                          topic === i
                            ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                            : "border-[#cfd3ea] text-transparent",
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 grid gap-7">
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
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
                          "rounded-lg border px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-1 motion-reduce:transition-none",
                          day === i
                            ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                            : "border-[#e6e8f1] bg-white text-[#55617a] hover:border-[#b9befb]",
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
                    3 · Time slot
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {slots.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(i)}
                        aria-pressed={slot === i}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-1 motion-reduce:transition-none",
                          slot === i
                            ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                            : "border-[#e6e8f1] bg-white text-[#55617a] hover:border-[#b9befb]",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Summary + CTA (dark navy panel) */}
            <div className="flex flex-col justify-between gap-6 bg-gradient-to-br from-[#0b1327] to-[#16224a] p-6 text-white sm:p-8 md:col-span-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a6adff]">
                  Your consultation
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#9aa3c4]">Topic</dt>
                    <dd className="text-right font-medium text-white">{topics[topic]}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#9aa3c4]">Day</dt>
                    <dd className="font-medium text-white">{days[day]}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#9aa3c4]">Time</dt>
                    <dd className="font-medium text-white">{slots[slot]}</dd>
                  </div>
                </dl>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-[#c3c9e6]">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#a6adff]" aria-hidden="true" />
                    Free 30-minute session
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#a6adff]" aria-hidden="true" />
                    Confidential &amp; no obligation
                  </li>
                </ul>
              </div>

              {booking?.enabled && booking.url && (
                <div>
                  <a
                    href={booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#6366f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1327] motion-reduce:transition-none"
                  >
                    {label}
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <p className="mt-3 text-center text-xs text-[#8a93ab]">
                    Opens our secure booking page in a new tab.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What to expect */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {EXPECT.map((r) => (
            <div
              key={r.title}
              className="flex flex-col gap-2 rounded-xl border border-[#e6e8f1] bg-white p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4f46e5]">
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-1 text-sm font-semibold text-[#0b1327]">{r.title}</p>
              <p className="text-xs leading-relaxed text-[#55617a]">{r.body}</p>
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
  const hasResults = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Book a consultation", href: bookingUrl }
      : { label: "Call the firm", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");
  const ctaAnchor = booking?.enabled ? "#consultation" : undefined;

  const nav = [
    { label: "Services", href: "#services" },
    ...(booking?.enabled ? [{ label: "Consultation", href: "#consultation" }] : []),
    ...(hasResults ? [{ label: "Results", href: "#results" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  // Generic credibility markers (template chrome; not business identity data).
  const credentials = [
    { icon: Award, label: "Chartered professionals" },
    { icon: ShieldCheck, label: "Fully licensed & insured" },
    { icon: FileText, label: "Fixed-fee, in writing" },
    { icon: Users, label: "Owner-led engagements" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0b1327] antialiased selection:bg-[#c9ccff] selection:text-[#0b1327]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e6e8f1] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#12204a] to-[#4f46e5] font-display text-base font-bold text-white shadow-sm"
            >
              {initialOf(business.name)}
            </span>
            <span className="font-display text-lg font-bold tracking-tight">{business.name}</span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#55617a] transition-colors hover:text-[#4f46e5] motion-reduce:transition-none"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={ctaAnchor ?? cta.href}
              {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#4f46e5] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4338ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#0b1327] transition-colors hover:bg-[#eef0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] lg:hidden motion-reduce:transition-none"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e6e8f1] bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#55617a] hover:bg-[#eef0ff] hover:text-[#4f46e5]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e6e8f1] pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#55617a]"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={ctaAnchor ?? cta.href}
                onClick={() => setMenuOpen(false)}
                {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#4f46e5] px-6 text-sm font-semibold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — dark, authoritative */}
        <section className="relative overflow-hidden bg-[#0b1327] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
              backgroundSize: "26px 26px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#4f46e5] opacity-25 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-[#1e40af] opacity-30 blur-[120px]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#c3c9e6] backdrop-blur">
                <Landmark className="h-3.5 w-3.5 text-[#a6adff]" /> {business.category} · {business.area}
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#b7bfdd]">{copy.heroSub}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={ctaAnchor ?? cta.href}
                  {...(!ctaAnchor && ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4f46e5]/30 transition-colors hover:bg-[#6366f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1327] motion-reduce:transition-none"
                >
                  {cta.label}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1327] motion-reduce:transition-none"
                >
                  <Phone className="h-5 w-5 text-[#a6adff]" /> {business.phone}
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7 text-sm">
                {business.rating != null && (
                  <span className="inline-flex items-center gap-2">
                    <Stars rating={business.rating} />
                    <span className="text-[#b7bfdd]">
                      <span className="font-semibold text-white">{business.rating}</span>
                      {business.reviewCount != null && <> · {business.reviewCount} reviews</>}
                    </span>
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-[#b7bfdd]">
                  <BadgeCheck className="h-4 w-4 text-[#a6adff]" /> Free initial consultation
                </span>
                <span className="inline-flex items-center gap-2 text-[#b7bfdd]">
                  <MapPin className="h-4 w-4 text-[#a6adff]" /> {business.area}
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b2c5e] via-[#2b2a72] to-[#4f46e5] shadow-2xl shadow-black/40 ring-1 ring-white/15">
                <img
                  src="/placeholder.svg?height=720&width=620"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover opacity-70 mix-blend-luminosity"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-black/5 sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4f46e5]">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-[#0b1327]">Proactive planning</p>
                  <p className="mt-0.5 text-xs text-[#8a93ab]">Not just once-a-year filing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar — credibility markers */}
        <section aria-label="Credentials" className="border-b border-[#e6e8f1] bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-7 sm:grid-cols-4">
            {credentials.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2.5 text-sm text-[#3a4358]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef0ff] text-[#4f46e5]">
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
                eyebrow="What we do"
                icon={Briefcase}
                title="Full-service accounting, built around your goals"
                intro="From day-to-day compliance to boardroom strategy, every engagement is scoped up front with fixed-fee clarity — so you can plan with confidence."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article
                    key={i}
                    className="group flex flex-col rounded-xl border border-[#e6e8f1] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#c3c8fb] hover:shadow-lg hover:shadow-[#4f46e5]/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f6fb] text-[#4f46e5] ring-1 ring-[#e6e8f1] transition-colors group-hover:bg-[#eef0ff]">
                        <Briefcase className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {s.price && (
                        <span className="shrink-0 rounded-md bg-[#eef0ff] px-2.5 py-1 text-xs font-semibold text-[#4338ca]">
                          {s.price}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-[#0b1327]">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#55617a]">{s.desc}</p>
                    {booking?.enabled && (
                      <a
                        href="#consultation"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#4f46e5] transition-colors hover:text-[#4338ca] motion-reduce:transition-none"
                      >
                        Discuss this <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lead section — Book a consultation */}
        {booking?.enabled && <ConsultationSection config={config} />}

        {/* Case results / past work */}
        {hasResults && (
          <section id="results" aria-labelledby="results-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Selected results"
                icon={TrendingUp}
                title="Outcomes we've delivered for clients"
                intro="A snapshot of recent engagements. Details are anonymised to protect client confidentiality — the results speak for themselves."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery!.map((g, i) => {
                  const [tag, ...rest] = g.caption.split("·");
                  const outcome = rest.join("·").trim();
                  return (
                    <article
                      key={i}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#e6e8f1] bg-white"
                    >
                      <div
                        className={cn(
                          "relative h-32 overflow-hidden bg-gradient-to-br",
                          i % 3 === 0
                            ? "from-[#12204a] to-[#4f46e5]"
                            : i % 3 === 1
                              ? "from-[#1b2c5e] to-[#6366f1]"
                              : "from-[#0b1327] to-[#3730a3]",
                        )}
                      >
                        <img
                          src="/placeholder.svg?height=260&width=460"
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover opacity-40 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0b1327] backdrop-blur">
                          <Building2 className="h-3.5 w-3.5 text-[#4f46e5]" aria-hidden="true" />
                          {outcome ? tag.trim() : `Engagement ${i + 1}`}
                        </span>
                      </div>
                      <div className="flex flex-1 items-start gap-3 p-5">
                        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-[#4f46e5]" aria-hidden="true" />
                        <p className="text-sm font-medium leading-relaxed text-[#0b1327]">
                          {outcome || g.caption}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-[#f5f6fb] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#12204a] via-[#2b2a72] to-[#4f46e5] shadow-xl shadow-[#0b1327]/20 ring-1 ring-white/10">
                  <img
                    src="/placeholder.svg?height=620&width=560"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-70 mix-blend-luminosity"
                  />
                </div>
                {business.rating != null && (
                  <div className="absolute -right-4 -top-4 hidden rounded-xl bg-white px-4 py-3 text-center shadow-lg ring-1 ring-[#e6e8f1] sm:block">
                    <p className="font-display text-2xl font-bold text-[#4f46e5]">{business.rating}</p>
                    <p className="text-xs text-[#8a93ab]">client rating</p>
                  </div>
                )}
              </div>
              <div>
                <SectionHeading eyebrow="Our firm" icon={Scale} title={`Why clients choose ${business.name}`} />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#55617a]">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Senior advisor on every file",
                    "Fixed fees agreed up front",
                    "Proactive, year-round planning",
                    "Plain-language explanations",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#0b1327]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#eef0ff] text-[#4f46e5]">
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
                eyebrow="Client feedback"
                icon={Star}
                center
                title="Trusted by owners across the region"
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
                    className="flex flex-col rounded-xl border border-[#e6e8f1] bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[#c7cbe6]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#3a4358]">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between gap-3 border-t border-[#e6e8f1] pt-4 text-sm">
                      <span className="font-semibold text-[#0b1327]">{r.author}</span>
                      <span className="shrink-0 text-[#8a93ab]">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#f5f6fb] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Good to know" icon={ShieldCheck} title="Questions, answered" />
              <div className="rounded-xl border border-[#e6e8f1] bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-[#e6e8f1]" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-2xl border border-[#e6e8f1] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Get in touch" icon={MapPin} title="Visit or reach the office" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#4f46e5]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#4f46e5]">Office</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#3a4358]">{business.address}</dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#4f46e5] transition-colors hover:text-[#4338ca] motion-reduce:transition-none"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#4f46e5]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#4f46e5]">Phone</dt>
                        <dd className="mt-1 text-sm">
                          <a href={business.tel} className="text-[#3a4358] hover:text-[#4f46e5]">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#4f46e5]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-[#4f46e5]">Hours</dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between gap-6 border-b border-dashed border-[#e6e8f1] pb-1.5 last:border-0"
                                >
                                  <span className="text-[#55617a]">{h.day}</span>
                                  <span className="font-medium text-[#0b1327]">{h.value}</span>
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
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#4338ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2 motion-reduce:transition-none"
                      >
                        {booking?.label || "Book a consultation"}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#d3d7e8] bg-white px-7 text-sm font-semibold text-[#0b1327] transition-colors hover:bg-[#f5f6fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      <Phone className="h-4 w-4 text-[#4f46e5]" /> Call the firm
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[300px] bg-gradient-to-br from-[#12204a] via-[#2b2a72] to-[#4f46e5]"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-50 mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1327] shadow-lg ring-1 ring-black/5 transition-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <MapPin className="h-4 w-4 text-[#4f46e5]" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0b1327] text-[#c3c9e6]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#12204a] to-[#4f46e5] font-display text-base font-bold text-white"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-display text-lg font-bold text-white">{business.name}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#8a93ab]">
                {business.category} in {business.area}. Fixed-fee engagements and a free initial
                consultation.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 text-[#c3c9e6] hover:text-white">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c3c9e6] hover:text-white"
                >
                  <MapPin className="h-4 w-4" /> {business.address}
                </a>
              )}
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c3c9e6] hover:text-white"
                >
                  <CalendarClock className="h-4 w-4" /> {booking?.label || "Book a consultation"}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#6b7492] sm:flex-row sm:items-center sm:justify-between">
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
