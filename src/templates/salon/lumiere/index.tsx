import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Calendar,
  ArrowUpRight,
  Scissors,
  Sparkles,
  Menu,
  X,
  Quote,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "hair-salon",
  label: "Hair salon & spa",
  accent: "#b06a86",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — realistic salon in Brampton, ON                    */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Maison Lumière Hair & Spa",
    category: "Hair salon & wellness studio",
    phone: "(905) 555-0148",
    tel: "tel:+19055550148",
    address: "58 Main Street North, Suite 4, Brampton, ON L6V 1N7",
    mapsUrl: "https://maps.google.com/?q=58+Main+Street+North+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 214,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Thu", value: "10:00 AM – 8:00 PM" },
      { day: "Friday", value: "9:00 AM – 8:00 PM" },
      { day: "Saturday", value: "9:00 AM – 6:00 PM" },
      { day: "Sunday", value: "11:00 AM – 5:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "Where every visit feels like a little luxury.",
    heroSub:
      "A boutique hair and wellness studio in the heart of downtown Brampton — expert colour, precision cuts, and restorative spa treatments in a calm, unhurried space.",
    about:
      "Founded in 2014, Maison Lumière began as a two-chair studio with a simple belief: that great hair and genuine care go hand in hand. Today our team of senior stylists, colour specialists, and licensed estheticians continue that promise in a light-filled space designed to feel like an escape.\n\nWe use sustainably sourced, cruelty-free products and take the time to understand what makes you feel your best — no rushing, no upselling, just thoughtful work you'll want to come back for.",
    services: [
      {
        title: "Precision Cut & Style",
        desc: "A tailored consultation, wash, cut, and finish with a stylist matched to your hair type.",
        price: "from $65",
      },
      {
        title: "Signature Balayage",
        desc: "Hand-painted, dimensional colour for a sun-kissed, lived-in finish that grows out beautifully.",
        price: "from $185",
      },
      {
        title: "Gloss & Root Colour",
        desc: "Refresh your tone and cover regrowth with a low-commitment, high-shine glaze.",
        price: "from $95",
      },
      {
        title: "Keratin Smoothing",
        desc: "A frizz-taming treatment that leaves hair sleek, healthy, and easier to manage for months.",
        price: "from $220",
      },
      {
        title: "Restorative Facial",
        desc: "A 60-minute customized facial with steam, exfoliation, and a hydrating mask.",
        price: "from $110",
      },
      {
        title: "Bridal & Event Styling",
        desc: "On-site or in-studio hair and makeup for your big day, with a trial session included.",
        price: "from $150",
      },
      {
        title: "Scalp & Hair Ritual",
        desc: "A deeply nourishing scalp massage and mask to reset stressed, dry hair.",
        price: "from $75",
      },
      {
        title: "Deluxe Manicure",
        desc: "Shaping, cuticle care, and a flawless gel or classic polish finish.",
        price: "from $45",
      },
    ],
    faq: [
      {
        q: "Do I need to book a consultation before a colour service?",
        a: "For major colour changes or corrections we recommend a quick complimentary consultation so we can assess your hair and give an accurate quote. For maintenance and gloss appointments you can book directly.",
      },
      {
        q: "What is your cancellation policy?",
        a: "We kindly ask for at least 24 hours' notice to reschedule or cancel. Late cancellations may be subject to a fee, as your appointment time is reserved just for you.",
      },
      {
        q: "Which products do you use and sell?",
        a: "We work with sustainably sourced, cruelty-free professional lines and are happy to send you home with everything you need to maintain your look between visits.",
      },
    ],
  },
  reviews: [
    {
      author: "Priya S.",
      rating: 5,
      text: "Best balayage I've ever had — the colour looks incredible and grew out so naturally. The whole space feels so calm and welcoming.",
      relativeTime: "2 weeks ago",
    },
    {
      author: "Danielle M.",
      rating: 5,
      text: "I came in for a big chop and was so nervous, but they listened carefully and I left feeling amazing. I won't go anywhere else now.",
      relativeTime: "1 month ago",
    },
    {
      author: "Aisha K.",
      rating: 5,
      text: "Booked the facial and scalp ritual as a treat and it was pure bliss. Booking online was easy and they even remembered my name.",
      relativeTime: "2 months ago",
    },
  ],
  gallery: [
    { caption: "Warm honey balayage" },
    { caption: "Soft curtain bangs" },
    { caption: "Glossy espresso brunette" },
    { caption: "Bridal updo & veil" },
    { caption: "Cool-toned platinum blonde" },
    { caption: "Effortless beach waves" },
  ],
  booking: {
    enabled: true,
    label: "Book an appointment",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book an appointment", href: "https://bookme-web.onrender.com/" },
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
            i < full ? "fill-[#c98aa4] text-[#c98aa4]" : "fill-transparent text-[#e2c9d4]",
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
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8637d]">
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-serif text-3xl leading-tight text-[#3a2730] sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-[#6f5a63]">{intro}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Booking picker (visual only) — primary action links out            */
/* ------------------------------------------------------------------ */

function BookingSection({ config }: { config: SiteConfig }) {
  const booking = config.booking;
  if (!booking?.enabled || !booking.url) return null;

  const services = config.copy.services ?? [];
  const days = ["Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"];
  const times = ["10:00", "11:30", "1:00", "2:30", "4:00", "5:30"];
  const label = booking.label || "Book an appointment";

  // Purely presentational selections to make the picker feel alive.
  const [service, setService] = useState(0);
  const [day, setDay] = useState(2);
  const [time, setTime] = useState(1);

  return (
    <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-24 bg-[#3a2730] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6b8c9]">
            <Calendar className="h-3.5 w-3.5" /> Booking
          </span>
          <h2 id="booking-heading" className="mt-3 font-serif text-3xl leading-tight text-[#fbf3f6] sm:text-4xl">
            Reserve your chair in a few taps.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#d8bfca]">
            Pick a service, choose a time that suits you, and confirm on our secure booking page.
            You'll get an instant confirmation and a friendly reminder before your visit.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-[#fbf3f6] shadow-2xl shadow-black/30 ring-1 ring-white/10">
          <div className="grid gap-0 lg:grid-cols-5">
            {/* Picker */}
            <div className="p-6 sm:p-8 lg:col-span-3">
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8637d]">
                  1 · Choose a service
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {services.slice(0, 6).map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setService(i)}
                      aria-pressed={service === i}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86]",
                        service === i
                          ? "border-[#b06a86] bg-white text-[#3a2730] shadow-sm"
                          : "border-[#ecd9e1] bg-white/50 text-[#6f5a63] hover:border-[#d8b3c2]",
                      )}
                    >
                      <span className="font-medium">{s.title}</span>
                      {s.price && <span className="shrink-0 text-xs text-[#a8637d]">{s.price}</span>}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8637d]">
                    2 · Pick a day
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {days.map((d, i) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDay(i)}
                        aria-pressed={day === i}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86]",
                          day === i
                            ? "border-[#b06a86] bg-[#b06a86] text-white"
                            : "border-[#ecd9e1] bg-white text-[#6f5a63] hover:border-[#d8b3c2]",
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8637d]">
                    3 · Pick a time
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {times.map((t, i) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(i)}
                        aria-pressed={time === i}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86]",
                          time === i
                            ? "border-[#b06a86] bg-[#b06a86] text-white"
                            : "border-[#ecd9e1] bg-white text-[#6f5a63] hover:border-[#d8b3c2]",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="flex flex-col justify-between gap-6 border-t border-[#ecd9e1] bg-gradient-to-br from-[#f5e3ea] to-[#efd6e0] p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8637d]">
                  Your selection
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#8a6c77]">Service</dt>
                    <dd className="text-right font-medium text-[#3a2730]">
                      {services[service]?.title ?? "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#8a6c77]">Day</dt>
                    <dd className="font-medium text-[#3a2730]">{days[day]}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[#8a6c77]">Time</dt>
                    <dd className="font-medium text-[#3a2730]">{times[time]}</dd>
                  </div>
                  {services[service]?.price && (
                    <div className="flex items-center justify-between gap-4 border-t border-[#e2c1cf] pt-3">
                      <dt className="text-[#8a6c77]">Starting at</dt>
                      <dd className="font-semibold text-[#a8637d]">{services[service].price}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <a
                  href={booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#3a2730] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#503743] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
                >
                  {label}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="mt-3 text-center text-xs text-[#8a6c77]">
                  Opens our secure booking page in a new tab.
                </p>
              </div>
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
  const hasReviews = reviews?.length > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Book an appointment", href: bookingUrl }
      : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    { label: "Services", href: "#services" },
    ...(booking?.enabled ? [{ label: "Booking", href: "#booking" }] : []),
    ...(hasGallery ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#fdf8fa] font-sans text-[#3a2730] antialiased selection:bg-[#e6b8c9] selection:text-[#3a2730]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#f0dee6] bg-[#fdf8fa]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#b06a86] to-[#8a4d67] font-serif text-base font-semibold text-white shadow-sm"
            >
              {initialOf(business.name)}
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight">{business.name}</span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6f5a63] transition-colors hover:text-[#a8637d]"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={cta.href}
              {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#3a2730] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#503743] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#3a2730] transition-colors hover:bg-[#f3e4ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#f0dee6] bg-[#fdf8fa] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6f5a63] hover:bg-[#f3e4ea] hover:text-[#a8637d]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#f0dee6] pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6f5a63]"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={cta.href}
                {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#3a2730] px-6 text-sm font-semibold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[#f0cdda] opacity-60 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#e8d9ec] opacity-50 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eccdd8] bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#a8637d]">
                <Scissors className="h-3.5 w-3.5" /> {business.category} · {business.area}
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-[#3a2730] sm:text-5xl lg:text-6xl">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6f5a63]">{copy.heroSub}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={cta.href}
                  {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#3a2730] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#503743] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
                >
                  {cta.label}
                  {ctaExternal && <ArrowUpRight className="h-5 w-5" />}
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#e2c1cf] bg-white px-7 py-3.5 text-base font-semibold text-[#3a2730] transition-colors hover:bg-[#faeef3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
                >
                  <Phone className="h-5 w-5" /> {business.phone}
                </a>
              </div>

              {business.rating != null && (
                <div className="mt-8 flex items-center gap-3 text-sm text-[#6f5a63]">
                  <Stars rating={business.rating} />
                  <span>
                    <span className="font-semibold text-[#3a2730]">{business.rating}</span>
                    {business.reviewCount != null && <> · {business.reviewCount} reviews</>}
                  </span>
                </div>
              )}
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e9c6d5] via-[#dbb3c8] to-[#c58aa4] shadow-xl shadow-[#b06a86]/20">
                <img
                  src="/placeholder.svg?height=720&width=600"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover mix-blend-luminosity opacity-90"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white/90 px-5 py-4 shadow-lg backdrop-blur sm:block">
                <p className="font-serif text-sm text-[#3a2730]">Open late Tue–Fri</p>
                <p className="mt-0.5 text-xs text-[#8a6c77]">Evening appointments available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="At a glance" className="border-y border-[#f0dee6] bg-white/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-sm text-[#6f5a63]">
            {business.rating != null && (
              <span className="inline-flex items-center gap-2">
                <Stars rating={business.rating} />
                <span className="font-medium text-[#3a2730]">
                  {business.rating}
                  {business.reviewCount != null && (
                    <span className="font-normal text-[#8a6c77]"> ({business.reviewCount} reviews)</span>
                  )}
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#a8637d]" /> {business.area}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a8637d]" /> Cruelty-free products
            </span>
            <span className="inline-flex items-center gap-2">
              <Scissors className="h-4 w-4 text-[#a8637d]" /> Senior stylists & colour experts
            </span>
          </div>
        </section>

        {/* Services */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Our menu"
                title="Services crafted around you"
                intro="From everyday maintenance to a full transformation — every service starts with a consultation so the result is truly yours."
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s: SiteService, i) => (
                  <article
                    key={i}
                    className="group flex flex-col rounded-2xl border border-[#f0dee6] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#e2c1cf] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl text-[#3a2730]">{s.title}</h3>
                      {s.price && (
                        <span className="shrink-0 rounded-full bg-[#f7e7ee] px-3 py-1 text-xs font-semibold text-[#a8637d]">
                          {s.price}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6f5a63]">{s.desc}</p>
                    {booking?.enabled && (
                      <a
                        href="#booking"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#a8637d] transition-colors hover:text-[#8a4d67]"
                      >
                        Book this <ChevronRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking (lead section) */}
        <BookingSection config={config} />

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Our work"
                title="A look inside the studio"
                intro="A small selection of recent colour, cuts, and styling by our team."
              />
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm",
                      i % 3 === 0
                        ? "from-[#e9c6d5] to-[#c58aa4]"
                        : i % 3 === 1
                          ? "from-[#e8d9ec] to-[#c9a8d4]"
                          : "from-[#f0d9c9] to-[#d9b49a]",
                      i === 0 && "col-span-2 sm:col-span-1",
                    )}
                  >
                    <img
                      src={`/placeholder.svg?height=400&width=400`}
                      alt=""
                      aria-hidden="true"
                      className="aspect-square w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-8 text-sm font-medium text-white">
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
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-white/60 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#d9b49a] via-[#c9a2b0] to-[#b06a86] shadow-xl shadow-[#b06a86]/20">
                  <img
                    src="/placeholder.svg?height=600&width=560"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-90 mix-blend-luminosity"
                  />
                </div>
              </div>
              <div>
                <SectionHeading eyebrow="Our story" title={`Welcome to ${business.name}`} />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#6f5a63]">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
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
                title="Loved by our clients"
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
                    className="flex flex-col rounded-2xl border border-[#f0dee6] bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[#e2c1cf]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#4a3640]">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between border-t border-[#f0dee6] pt-4 text-sm">
                      <span className="font-semibold text-[#3a2730]">{r.author}</span>
                      <span className="text-[#8a6c77]">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-white/60 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
              <div className="rounded-2xl border border-[#f0dee6] bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-[#f0dee6]" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#f0dee6] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Visit us" title="Come say hello" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#a8637d]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#a8637d]">Address</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#4a3640]">{business.address}</dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#a8637d] transition-colors hover:text-[#8a4d67]"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#a8637d]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#a8637d]">Phone</dt>
                        <dd className="mt-1 text-sm">
                          <a href={business.tel} className="text-[#4a3640] hover:text-[#a8637d]">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#a8637d]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-[#a8637d]">Hours</dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#f0dee6] pb-1.5 last:border-0">
                                  <span className="text-[#6f5a63]">{h.day}</span>
                                  <span className="font-medium text-[#3a2730]">{h.value}</span>
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
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#3a2730] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#503743] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
                      >
                        {booking?.label || "Book an appointment"}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#e2c1cf] bg-white px-7 text-sm font-semibold text-[#3a2730] transition-colors hover:bg-[#faeef3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b06a86] focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4" /> Call the studio
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[280px] bg-gradient-to-br from-[#e9c6d5] via-[#d9b3c6] to-[#b06a86]"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-70 mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#3a2730] shadow-lg backdrop-blur transition-transform group-hover:scale-105">
                    <MapPin className="h-4 w-4 text-[#a8637d]" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#f0dee6] bg-[#3a2730] text-[#e8d3db]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#e9c6d5] to-[#b06a86] font-serif text-base font-semibold text-white"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-serif text-lg font-semibold text-white">{business.name}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#c3a7b1]">
                {business.category} in {business.area}.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 text-[#e8d3db] hover:text-white">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#e8d3db] hover:text-white"
                >
                  <MapPin className="h-4 w-4" /> {business.address}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#a98d97] sm:flex-row sm:items-center sm:justify-between">
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
