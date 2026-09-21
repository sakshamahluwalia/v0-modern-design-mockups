import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Heart,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "nail-lash-bar",
  label: "Nail & lash bar",
  accent: "#8b5cf6",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a nail & lash bar in Brampton, ON                  */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Lilac & Co. Nail Bar",
    category: "Nail & lash bar",
    phone: "(905) 555-0191",
    tel: "tel:+19055550191",
    address: "45 George Street South, Unit 5, Brampton, ON L6Y 1P2",
    mapsUrl: "https://maps.google.com/?q=45+George+Street+South+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.8,
    reviewCount: 267,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Fri", value: "10:00 AM – 7:00 PM" },
      { day: "Saturday", value: "9:00 AM – 6:00 PM" },
      { day: "Sunday", value: "11:00 AM – 5:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "Nails & lashes that make your whole week.",
    heroSub:
      "A bright, playful nail & lash bar in downtown Brampton. Clean tools, gorgeous colour, and a team that treats your appointment like the little treat it should be.",
    about:
      "We opened Lilac & Co. because self-care shouldn't feel clinical — it should feel like a bright spot in your day. Our studio is sunny, spotless, and built for you to actually relax in.\n\nEvery tool is hospital-grade sterilised, every set is done by a licensed tech, and every client leaves with hands (and lashes) they can't stop looking at. Come solo, come with your crew — we love a group booking.",
    services: [
      { title: "Gel Manicure", desc: "Shape, cuticle care, and a chip-free gel colour that lasts two-plus weeks.", price: "$45" },
      { title: "Luxe Pedicure", desc: "A warm soak, scrub, massage, and polish — the reset your feet have earned.", price: "$55" },
      { title: "Builder Gel Overlay", desc: "Strength and length on your natural nails, shaped exactly how you like.", price: "$65" },
      { title: "Full Acrylic Set", desc: "Custom length and shape with any colour or design you can dream up.", price: "from $70" },
      { title: "Classic Lash Set", desc: "Natural, fluttery individual lashes mapped to your eye shape.", price: "$110" },
      { title: "Volume Lash Set", desc: "Full, fluffy volume fans for maximum drama that still feels light.", price: "$140" },
      { title: "Lash Fill", desc: "Keep your set looking fresh — best booked every 2 to 3 weeks.", price: "from $60" },
      { title: "Nail Art (per nail)", desc: "Chrome, French, hand-painted, gems — bring your Pinterest board.", price: "from $5" },
    ],
    faq: [
      { q: "How do I keep my gel or lashes lasting longer?", a: "For gels, a little cuticle oil daily works wonders. For lashes, keep them dry for 24 hours, brush them gently each morning, and avoid oil-based products around the eyes. We'll send you home with full aftercare tips." },
      { q: "Can I bring a design inspo photo?", a: "Please do! We love a reference. Bring a screenshot or your Pinterest board and we'll recreate it or suggest a twist that suits your nails." },
      { q: "Do you take group bookings for events?", a: "Yes — bridal parties, birthdays, and girls' days are our favourite. Message us with your date and headcount and we'll reserve the studio for your group." },
    ],
  },
  reviews: [
    { author: "Simran K.", rating: 5, text: "My lashes get compliments everywhere I go and they last forever. The studio is SO cute and clean. Genuinely look forward to my fills.", relativeTime: "1 week ago" },
    { author: "Chloe B.", rating: 5, text: "Best nail art in Brampton, full stop. I showed a wild inspo pic and she nailed it (pun intended). Booking online is super easy too.", relativeTime: "3 weeks ago" },
    { author: "Fatima A.", rating: 5, text: "Brought my whole bridal party and they made the morning feel so special. Everyone's nails were flawless in the photos.", relativeTime: "2 months ago" },
  ],
  gallery: [
    { caption: "Chrome French tips" },
    { caption: "Soft pink volume lashes" },
    { caption: "Hand-painted florals" },
    { caption: "Milky white builder gel" },
    { caption: "Classic red almond set" },
    { caption: "Glazed donut chrome" },
  ],
  booking: {
    enabled: true,
    label: "Book your treat",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Book your treat", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < full ? "fill-[#f59fc7] text-[#f59fc7]" : "fill-transparent text-[#e9d6f5]")} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main template — BENTO hero, centered floating nav, horizontal scroll */
/* ------------------------------------------------------------------ */

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(0);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const aboutParagraphs = (copy.about ?? "").split("\n").filter((p) => p.trim().length > 0);

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl ? { label: booking?.label || "Book an appointment", href: bookingUrl } : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    { label: "Services", href: "#services" },
    ...(booking?.enabled ? [{ label: "Booking", href: "#booking" }] : []),
    ...(hasGallery ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Visit", href: "#contact" },
  ];

  const ticker = ["Gel manicures", "Volume lashes", "Nail art", "Group bookings", "Chrome tips", "Builder gel", "Lash fills"];

  return (
    <div className="min-h-screen bg-[#fbf7ff] font-sans text-[#3b1f5e] antialiased selection:bg-[#e9d6f5]">
      {/* Floating centered nav */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-white/60 bg-white/80 px-3 py-2 shadow-lg shadow-[#8b5cf6]/10 backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5 pl-2">
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#d6489a] font-display text-sm font-extrabold text-white">{initialOf(business.name)}</span>
            <span className="font-display text-base font-extrabold tracking-tight">{business.name.split(" ")[0]}</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.slice(0, 4).map((n) => (
              <a key={n.href} href={n.href} className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#6b5b82] transition-colors hover:bg-[#f4ecfe] hover:text-[#8b5cf6]">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hidden h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#d6489a] px-4 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.03] sm:inline-flex">
              {cta.label}
            </a>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#3b1f5e] hover:bg-[#f4ecfe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] md:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="mx-auto mt-2 max-w-4xl rounded-3xl border border-white/60 bg-white/95 p-3 shadow-lg backdrop-blur md:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (<li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-[#6b5b82] hover:bg-[#f4ecfe] hover:text-[#8b5cf6]">{n.label}</a></li>))}
            </ul>
            <a href={business.tel} className="mt-1 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-[#6b5b82]"><Phone className="h-4 w-4" /> {business.phone}</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero — BENTO grid */}
        <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* Headline tile */}
            <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-[2rem] bg-gradient-to-br from-[#8b5cf6] via-[#a855f7] to-[#d6489a] p-7 text-white sm:p-9 lg:col-span-2">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Gem className="h-3.5 w-3.5" /> {business.category}
              </div>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">{copy.heroHeadline}</h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{copy.heroSub}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={cta.href} {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#8b5cf6] shadow-lg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#a855f7]">
                  {cta.label} {ctaExternal ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </a>
                <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/50 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </div>
            {/* Image tiles */}
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#c4a5f7] to-[#8b5cf6]">
              <img src="/placeholder.svg?height=320&width=320" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-85 mix-blend-luminosity" />
            </div>
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f6a9cf] to-[#d6489a]">
              <img src="/placeholder.svg?height=320&width=320" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-85 mix-blend-luminosity" />
            </div>
            {/* Rating tile */}
            <div className="flex flex-col justify-center rounded-[2rem] border border-[#eee3fb] bg-white p-6 text-center">
              {business.rating != null && (<>
                <p className="font-display text-4xl font-extrabold text-[#8b5cf6]">{business.rating}</p>
                <Stars rating={business.rating} className="mt-2 justify-center" />
                {business.reviewCount != null && <p className="mt-2 text-xs font-semibold text-[#8a7aa0]">{business.reviewCount} happy clients</p>}
              </>)}
            </div>
            {/* Wide image tile */}
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e6b8e0] to-[#b06ad6]">
              <img src="/placeholder.svg?height=320&width=640" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-85 mix-blend-luminosity" />
            </div>
          </div>
        </section>

        {/* Ticker marquee */}
        <div aria-hidden="true" className="border-y border-[#eee3fb] bg-gradient-to-r from-[#8b5cf6] to-[#d6489a] py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 text-sm font-bold uppercase tracking-wide text-white/90">
            {ticker.map((t, i) => (<span key={i} className="inline-flex items-center gap-6"><Sparkles className="h-3.5 w-3.5" /> {t}</span>))}
          </div>
        </div>

        {/* Services — horizontal snap-scroll */}
        {services.length > 0 && (
          <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <div className="flex items-end justify-between gap-6">
                <div className="max-w-xl">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Sparkles className="h-3.5 w-3.5" /> The menu</p>
                  <h2 id="services-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">Treat yourself</h2>
                </div>
                <p className="hidden text-xs font-medium text-[#8a7aa0] sm:block">Swipe to explore →</p>
              </div>
            </div>
            <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="shrink-0 sm:w-[calc((100%-1536px)/2)]" aria-hidden="true" />
              {services.map((s: SiteService, i) => (
                <article key={i} className="flex w-72 shrink-0 snap-start flex-col rounded-3xl border border-[#eee3fb] bg-white p-6 shadow-sm">
                  <div className="mb-4 h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f4ecfe] to-[#fde7f3]">
                    <img src="/placeholder.svg?height=200&width=300" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-70 mix-blend-luminosity" />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    {s.price && <span className="shrink-0 rounded-full bg-gradient-to-r from-[#f4ecfe] to-[#fde7f3] px-3 py-1 text-xs font-bold text-[#a855f7]">{s.price}</span>}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b5b82]">{s.desc}</p>
                  {booking?.enabled && <a href="#booking" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#a855f7] hover:text-[#7c3aed]">Book this <ArrowRight className="h-4 w-4" /></a>}
                </article>
              ))}
              <div className="w-1 shrink-0" aria-hidden="true" />
            </div>
          </section>
        )}

        {/* Booking — gradient picker card */}
        {booking?.enabled && booking.url && (
          <section id="booking" aria-labelledby="booking-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-5">
              <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#8b5cf6] via-[#a855f7] to-[#d6489a] p-1 shadow-xl shadow-[#8b5cf6]/25">
                <div className="rounded-[2.3rem] bg-white/95 p-6 sm:p-10">
                  <div className="max-w-xl">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Sparkles className="h-3.5 w-3.5" /> Booking</p>
                    <h2 id="booking-heading" className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Pick your treat ✨</h2>
                    <p className="mt-3 text-base leading-relaxed text-[#6b5b82]">Choose a service below, then confirm on our booking page. You'll get a reminder before your visit.</p>
                  </div>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {services.slice(0, 6).map((s, i) => (
                      <button key={i} type="button" onClick={() => setService(i)} aria-pressed={service === i}
                        className={cn("flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]",
                          service === i ? "border-[#8b5cf6] bg-[#f4ecfe] text-[#3b1f5e]" : "border-[#eee3fb] bg-white text-[#6b5b82] hover:border-[#d9c4f7]")}>
                        <span className="font-semibold">{s.title}</span>{s.price && <span className="shrink-0 text-xs text-[#a855f7]">{s.price}</span>}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-r from-[#f4ecfe] to-[#fde7f3] p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#6b5b82]">Selected: <span className="font-bold text-[#3b1f5e]">{services[service]?.title ?? "—"}</span>{services[service]?.price && <> · from <span className="font-bold text-[#d6489a]">{services[service].price}</span></>}</p>
                    <a href={booking.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#d6489a] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#8b5cf6]/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2">
                      {booking.label || "Book an appointment"} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery — masonry columns */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Heart className="h-3.5 w-3.5" /> Our work</p>
                <h2 id="gallery-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">Sets we love</h2>
              </div>
              <div className="mt-8 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
                {gallery!.map((g, i) => (
                  <figure key={i} className={cn("group relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-sm", i % 3 === 0 ? "from-[#c4a5f7] to-[#8b5cf6] aspect-[3/4]" : i % 3 === 1 ? "from-[#f6a9cf] to-[#d6489a] aspect-square" : "from-[#e6b8e0] to-[#b06ad6] aspect-[4/5]")}>
                    <img src="/placeholder.svg?height=520&width=420" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105" />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-white">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About — rounded gradient panel */}
        {aboutParagraphs.length > 0 && (
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <div className="grid items-center gap-10 rounded-[2.5rem] bg-gradient-to-br from-[#f4ecfe] to-[#fde7f3] p-8 sm:p-12 lg:grid-cols-2">
                <div className="relative order-last lg:order-first">
                  <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#c4a5f7] to-[#f6a9cf] shadow-lg">
                    <img src="/placeholder.svg?height=600&width=560" alt="" aria-hidden="true" className="aspect-[4/5] w-full object-cover opacity-85 mix-blend-luminosity" />
                  </div>
                </div>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Sparkles className="h-3.5 w-3.5" /> Our story</p>
                  <h2 id="about-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">A bright spot in your week</h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-[#6b5b82]">{aboutParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reviews — staggered cards */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <div className="mx-auto max-w-xl text-center">
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Star className="h-3.5 w-3.5" /> Kind words</p>
                <h2 id="reviews-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">Clients who keep coming back</h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (
                  <blockquote key={i} className={cn("flex flex-col rounded-3xl border border-[#eee3fb] bg-white p-6 shadow-sm", i % 2 === 1 && "md:mt-8")}>
                    <Stars rating={r.rating} />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#4a3a62]">"{r.text}"</p>
                    <footer className="mt-5 flex items-center justify-between border-t border-[#eee3fb] pt-4 text-sm"><span className="font-bold">{r.author}</span><span className="text-[#8a7aa0]">{r.relativeTime}</span></footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><Sparkles className="h-3.5 w-3.5" /> Good to know</p>
                <h2 id="faq-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">Questions, answered</h2>
              </div>
              <div className="rounded-3xl border border-[#eee3fb] bg-white px-6 shadow-sm"><FaqAccordion items={faqs} className="divide-[#eee3fb]" /></div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2.5rem] border border-[#eee3fb] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a855f7]"><MapPin className="h-3.5 w-3.5" /> Visit us</p>
                  <h2 id="contact-heading" className="mt-3 font-display text-4xl font-extrabold tracking-tight">Come say hi</h2>
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#a855f7]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">Address</dt><dd className="mt-1 text-sm leading-relaxed text-[#4a3a62]">{business.address}</dd>{business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#a855f7] hover:text-[#7c3aed]">Get directions <ArrowUpRight className="h-4 w-4" /></a>}</div></div>
                    <div className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#a855f7]" aria-hidden="true" /><div><dt className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">Phone</dt><dd className="mt-1 text-sm"><a href={business.tel} className="text-[#4a3a62] hover:text-[#a855f7]">{business.phone}</a></dd></div></div>
                    {hasHours && (<div className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#a855f7]" aria-hidden="true" /><div className="w-full"><dt className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">Hours</dt><dd className="mt-2"><ul className="space-y-1.5 text-sm">{business.hours!.map((h, i) => (<li key={i} className="flex items-center justify-between gap-6 border-b border-dashed border-[#eee3fb] pb-1.5 last:border-0"><span className="text-[#6b5b82]">{h.day}</span><span className="font-semibold">{h.value}</span></li>))}</ul></dd></div></div>)}
                  </dl>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#d6489a] px-7 text-sm font-bold text-white transition-transform hover:scale-[1.02]">{booking?.label || "Book an appointment"} <ArrowUpRight className="h-4 w-4" /></a>}
                    <a href={business.tel} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#e4d4fb] bg-white px-7 text-sm font-bold text-[#3b1f5e] transition-colors hover:bg-[#f4ecfe]"><Phone className="h-4 w-4" /> Call us</a>
                  </div>
                </div>
                <a href={business.mapsUrl || "#contact"} {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label="Open location in Google Maps" className="group relative min-h-[280px] bg-gradient-to-br from-[#c4a5f7] via-[#e6b8e0] to-[#f6a9cf]">
                  <img src="/placeholder.svg?height=600&width=600" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-70 mix-blend-luminosity" />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold text-[#3b1f5e] shadow-lg backdrop-blur transition-transform group-hover:scale-105"><MapPin className="h-4 w-4 text-[#a855f7]" /> {business.area}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-[#3b1f5e] to-[#5b2a6e] text-[#e9d6f5]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5"><span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c4a5f7] to-[#f6a9cf] font-display text-base font-extrabold text-[#3b1f5e]">{initialOf(business.name)}</span><span className="font-display text-lg font-extrabold text-white">{business.name}</span></div>
              <p className="mt-4 text-sm leading-relaxed text-[#cdb3e0]">{business.category} in {business.area}.</p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> {business.phone}</a>
              {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MapPin className="h-4 w-4" /> {business.address}</a>}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#b699cc] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p><p>{business.area}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
