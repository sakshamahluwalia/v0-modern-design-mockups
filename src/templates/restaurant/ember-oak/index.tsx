import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Utensils,
  Flame,
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  Quote,
  Leaf,
  CalendarClock,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { FaqAccordion } from "@/lib/ui/accordion";
import { initialOf, type SiteConfig, type SiteService } from "@/lib/site-config";

export const meta = {
  industry: "restaurant",
  label: "Restaurant & bar",
  accent: "#e0952b",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — realistic wood-fired kitchen in Brampton, ON       */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Ember & Oak Kitchen",
    category: "Wood-fired kitchen & bar",
    phone: "(905) 555-0172",
    tel: "tel:+19055550172",
    address: "212 Queen Street West, Brampton, ON L6X 1B4",
    mapsUrl: "https://maps.google.com/?q=212+Queen+Street+West+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.8,
    reviewCount: 386,
    hours: [
      { day: "Monday", value: "Closed" },
      { day: "Tue – Thu", value: "5:00 PM – 10:00 PM" },
      { day: "Friday", value: "5:00 PM – 11:00 PM" },
      { day: "Saturday", value: "11:00 AM – 11:00 PM" },
      { day: "Sunday", value: "11:00 AM – 9:00 PM" },
    ],
  },
  copy: {
    heroHeadline: "Wood-fired plates, poured-with-love drinks.",
    heroSub:
      "A neighbourhood kitchen in downtown Brampton where everything starts at the live-fire hearth — seasonal small plates, hand-rolled pasta, and a bar built around local makers.",
    about:
      "Ember & Oak opened in 2017 with one oak-burning oven, a short menu, and a long list of farmers we wanted to cook for. Chef Mara Ellison builds each week's menu around what's landing at the market that morning, then lets the fire do the rest.\n\nWe're a room made for lingering — worn leather booths, a marble bar, and a playlist that leans warm. Whether it's a two-top on date night or a table of ten, we want you to leave a little fuller and a lot happier than you arrived.",
    services: [
      {
        title: "Wood-Fired Focaccia",
        desc: "Rosemary and sea-salt focaccia baked to order, whipped ricotta, chili honey.",
        price: "$11",
      },
      {
        title: "Charred Little Gems",
        desc: "Grilled baby lettuce, buttermilk-dill dressing, crispy shallot, pecorino.",
        price: "$14",
      },
      {
        title: "Ember Wings",
        desc: "Oak-smoked chicken wings, maple-gochujang glaze, pickled celery.",
        price: "$16",
      },
      {
        title: "Hand-Rolled Bucatini",
        desc: "Slow San Marzano sugo, aged parmesan, torn basil, fried garlic.",
        price: "$24",
      },
      {
        title: "Fire-Roasted Half Chicken",
        desc: "Brined overnight, hearth-roasted, salsa verde, confit potatoes.",
        price: "$29",
      },
      {
        title: "Oak-Grilled Striploin",
        desc: "10oz Ontario striploin, bone-marrow butter, charred scallion, frites.",
        price: "$42",
      },
      {
        title: "Cast-Iron Market Fish",
        desc: "Daily catch, brown-butter beurre blanc, roasted fennel, lemon.",
        price: "$34",
      },
      {
        title: "Blistered Shishitos",
        desc: "Flash-fired peppers, smoked sea salt, yuzu aioli. One in ten is spicy.",
        price: "$12",
      },
      {
        title: "Burnt Basque Cheesecake",
        desc: "Caramelised top, crème fraîche, macerated berries.",
        price: "$13",
      },
      {
        title: "The Oak Old Fashioned",
        desc: "Barrel-aged rye, smoked demerara, orange bitters, hand-cut ice.",
        price: "$17",
      },
    ],
    faq: [
      {
        q: "Do you take reservations, or is it walk-in only?",
        a: "Both. We hold a good portion of the room for walk-ins at the bar and high-tops, but for tables of two or more — especially Friday and Saturday — we recommend reserving ahead through our booking page.",
      },
      {
        q: "Can you accommodate dietary restrictions and allergies?",
        a: "Absolutely. Much of the menu is vegetarian or can be made so, and we mark gluten-friendly dishes. Please tell your server about any allergies and the kitchen will do everything it can to look after you.",
      },
      {
        q: "Do you host private events or large groups?",
        a: "We do. Our back room seats up to 24 for set-menu dinners, and we can buy out the full space on Mondays. Reserve online and leave a note, or call us and ask for Mara.",
      },
    ],
  },
  reviews: [
    {
      author: "Devon R.",
      rating: 5,
      text: "That striploin off the oak fire is the best steak I've had in Brampton, full stop. The bucatini nearly stole the show. We'll be regulars.",
      relativeTime: "1 week ago",
    },
    {
      author: "Simran K.",
      rating: 5,
      text: "Booked a birthday table for eight and the team could not have been kinder. Every plate came out beautifully and the cocktails are dangerous in the best way.",
      relativeTime: "3 weeks ago",
    },
    {
      author: "Anthony P.",
      rating: 4,
      text: "Warm room, great natural wine list, and that burnt cheesecake is worth the trip alone. Gets busy on weekends — reserve ahead and you're golden.",
      relativeTime: "2 months ago",
    },
  ],
  gallery: [
    { caption: "Oak-grilled striploin, bone-marrow butter" },
    { caption: "Hearth focaccia, chili honey" },
    { caption: "Hand-rolled bucatini, San Marzano sugo" },
    { caption: "The Oak Old Fashioned" },
    { caption: "Fire-roasted half chicken, salsa verde" },
    { caption: "Burnt Basque cheesecake" },
    { caption: "The marble bar at golden hour" },
    { caption: "Blistered shishitos, yuzu aioli" },
  ],
  booking: {
    enabled: true,
    label: "Reserve a table",
    url: "https://bookme-web.onrender.com/",
  },
  primaryCta: { label: "Reserve a table", href: "https://bookme-web.onrender.com/" },
};

/* ------------------------------------------------------------------ */
/* Palette tokens (deep charcoal + warm amber)                         */
/* ------------------------------------------------------------------ */

const INK = "#17130f"; // near-black warm charcoal
const AMBER = "#e0952b";

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
            i < full ? "fill-[#f0a830] text-[#f0a830]" : "fill-transparent text-[#8a7a63]",
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
  dark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em]",
            dark ? "text-[#f0a830]" : "text-[#b8791d]",
          )}
        >
          <Flame className="h-3.5 w-3.5" /> {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-3 font-fraunces text-3xl leading-[1.1] sm:text-4xl",
          dark ? "text-[#f7efe2]" : "text-[#17130f]",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-[#c9bba4]" : "text-[#5c5346]")}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Menu (lead section) — printed-menu board + hours + map + reserve    */
/* ------------------------------------------------------------------ */

function MenuSection({ config }: { config: SiteConfig }) {
  const services = config.copy.services ?? [];
  if (services.length === 0) return null;

  const { business, booking } = config;
  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const reserveLabel = booking?.label || "Reserve a table";
  const hasHours = (business.hours?.length ?? 0) > 0;

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="scroll-mt-24 bg-[#17130f] py-20 text-[#f7efe2] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#f0a830]">
              <Utensils className="h-3.5 w-3.5" /> The menu
            </span>
            <h2 id="menu-heading" className="mt-3 font-fraunces text-3xl leading-[1.1] sm:text-4xl">
              From the hearth &amp; the bar
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#c9bba4]">
            Menus shift with the season and the market — here&apos;s what&apos;s on the board this week.
            Prices in CAD.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.55fr_1fr]">
          {/* Menu board */}
          <div className="rounded-3xl border border-[#3a3026] bg-[#1e1811] p-6 shadow-2xl shadow-black/40 sm:p-9">
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {services.map((s: SiteService, i) => (
                <li key={i} className="group">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-fraunces text-lg leading-tight text-[#f7efe2]">{s.title}</h3>
                    <span
                      aria-hidden="true"
                      className="mx-1 h-px flex-1 translate-y-[-2px] border-b border-dotted border-[#5a4c3a]"
                    />
                    {s.price && (
                      <span className="shrink-0 font-fraunces text-lg font-medium text-[#f0a830]">
                        {s.price}
                      </span>
                    )}
                  </div>
                  {s.desc && (
                    <p className="mt-1.5 text-sm leading-relaxed text-[#a8987d]">{s.desc}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Aside — hours + map + reserve */}
          <div className="flex flex-col gap-5">
            {hasHours && (
              <div className="rounded-3xl border border-[#3a3026] bg-[#1e1811] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0a830]">
                  <Clock className="h-4 w-4" /> Kitchen hours
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {business.hours!.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-6 border-b border-dashed border-[#3a3026] pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-[#c9bba4]">{h.day}</span>
                      <span className="font-medium text-[#f7efe2]">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map link */}
            <a
              href={business.mapsUrl || "#contact"}
              {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label="Open location in Google Maps"
              className="group relative min-h-[160px] overflow-hidden rounded-3xl border border-[#3a3026] bg-gradient-to-br from-[#3a2c18] via-[#5a3f1c] to-[#e0952b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a830] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130f]"
            >
              <img
                src="/placeholder.svg?height=320&width=520"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
              />
              <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full bg-[#17130f]/85 px-4 py-2.5 text-sm font-semibold text-[#f7efe2] backdrop-blur transition-transform group-hover:scale-[1.02]">
                <MapPin className="h-4 w-4 text-[#f0a830]" /> {business.address}
              </span>
            </a>

            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#e0952b] px-8 text-base font-semibold text-[#17130f] transition-colors hover:bg-[#f0a830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a830] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130f]"
              >
                {reserveLabel}
                <ArrowUpRight className="h-5 w-5" />
              </a>
            )}
            <a
              href={business.tel}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#4a3f30] px-6 text-sm font-semibold text-[#f7efe2] transition-colors hover:bg-[#241d15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a830]"
            >
              <Phone className="h-4 w-4 text-[#f0a830]" /> {business.phone}
            </a>
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

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Reserve a table", href: bookingUrl }
      : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");

  const nav = [
    ...(services.length > 0 ? [{ label: "Menu", href: "#menu" }] : []),
    ...(hasGallery ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "About", href: "#about" },
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    { label: "Visit", href: "#contact" },
  ];

  const aboutParagraphs = copy.about.split("\n").filter((p) => p.trim().length > 0);

  return (
    <div
      className="min-h-screen bg-[#faf6ef] font-sans text-[#17130f] antialiased selection:bg-[#f0a830] selection:text-[#17130f]"
      style={{ ["--ink" as string]: INK, ["--amber" as string]: AMBER }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e7ddca] bg-[#faf6ef]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#e0952b] to-[#a85f14] font-fraunces text-base font-semibold text-[#17130f] shadow-sm"
            >
              {initialOf(business.name)}
            </span>
            <span className="font-fraunces text-lg font-semibold tracking-tight">{business.name}</span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5c5346] transition-colors hover:text-[#b8791d]"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={cta.href}
              {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#17130f] px-5 text-sm font-semibold text-[#f7efe2] transition-colors hover:bg-[#2a2117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0952b] focus-visible:ring-offset-2"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#17130f] transition-colors hover:bg-[#efe6d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0952b] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-[#e7ddca] bg-[#faf6ef] px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5c5346] hover:bg-[#efe6d5] hover:text-[#b8791d]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#e7ddca] pt-3">
              <a
                href={business.tel}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5c5346]"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={cta.href}
                {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#17130f] px-6 text-sm font-semibold text-[#f7efe2]"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#17130f] text-[#f7efe2]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-28 h-[30rem] w-[30rem] rounded-full bg-[#e0952b] opacity-25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#7a3f12] opacity-40 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4a3f30] bg-[#241d15]/60 px-3.5 py-1.5 text-xs font-medium text-[#f0a830]">
                <Flame className="h-3.5 w-3.5" /> {business.category} · {business.area}
              </span>
              <h1 className="mt-5 font-fraunces text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {copy.heroHeadline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#c9bba4]">{copy.heroSub}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={cta.href}
                  {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#e0952b] px-8 py-3.5 text-base font-semibold text-[#17130f] transition-colors hover:bg-[#f0a830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a830] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130f]"
                >
                  {cta.label}
                  {ctaExternal && <ArrowUpRight className="h-5 w-5" />}
                </a>
                <a
                  href="#menu"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#4a3f30] bg-transparent px-7 py-3.5 text-base font-semibold text-[#f7efe2] transition-colors hover:bg-[#241d15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a830]"
                >
                  <Utensils className="h-5 w-5 text-[#f0a830]" /> View the menu
                </a>
              </div>

              {business.rating != null && (
                <div className="mt-8 flex items-center gap-3 text-sm text-[#c9bba4]">
                  <Stars rating={business.rating} />
                  <span>
                    <span className="font-semibold text-[#f7efe2]">{business.rating}</span>
                    {business.reviewCount != null && <> · {business.reviewCount} reviews</>}
                  </span>
                </div>
              )}
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5a3f1c] via-[#8a5216] to-[#e0952b] shadow-2xl shadow-black/50">
                <img
                  src="/placeholder.svg?height=760&width=640"
                  alt=""
                  aria-hidden="true"
                  className="aspect-[5/6] w-full object-cover opacity-80 mix-blend-luminosity"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#3a3026] bg-[#1e1811]/95 px-5 py-4 shadow-lg backdrop-blur sm:block">
                <p className="flex items-center gap-2 font-fraunces text-sm text-[#f7efe2]">
                  <Flame className="h-4 w-4 text-[#f0a830]" /> Live-fire hearth
                </p>
                <p className="mt-0.5 text-xs text-[#a8987d]">Everything touched by oak &amp; smoke</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section aria-label="At a glance" className="border-b border-[#e7ddca] bg-[#f3ead9]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 text-sm text-[#5c5346]">
            {business.rating != null && (
              <span className="inline-flex items-center gap-2">
                <Stars rating={business.rating} />
                <span className="font-medium text-[#17130f]">
                  {business.rating}
                  {business.reviewCount != null && (
                    <span className="font-normal text-[#7a6f5e]"> ({business.reviewCount} reviews)</span>
                  )}
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#b8791d]" /> {business.area}
            </span>
            <span className="inline-flex items-center gap-2">
              <Leaf className="h-4 w-4 text-[#b8791d]" /> Local &amp; seasonal
            </span>
            <span className="inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#b8791d]" /> Oak-fired kitchen
            </span>
          </div>
        </section>

        {/* Menu (lead section) */}
        <MenuSection config={config} />

        {/* Gallery */}
        {hasGallery && (
          <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Straight from the pass"
                title="A taste of the table"
                intro="A few of the plates and pours our regulars come back for."
              />
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {gallery!.map((g, i) => (
                  <figure
                    key={i}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm",
                      i % 4 === 0
                        ? "from-[#5a3f1c] to-[#e0952b]"
                        : i % 4 === 1
                          ? "from-[#3a2c18] to-[#a85f14]"
                          : i % 4 === 2
                            ? "from-[#6b3d12] to-[#d98324]"
                            : "from-[#2a2117] to-[#8a5216]",
                      i === 0 && "col-span-2 row-span-2 sm:col-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-2",
                    )}
                  >
                    <img
                      src="/placeholder.svg?height=500&width=500"
                      alt=""
                      aria-hidden="true"
                      className="h-full min-h-[150px] w-full object-cover opacity-70 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">
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
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-[#f3ead9] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
              <div className="relative order-last lg:order-first">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3a2c18] via-[#8a5216] to-[#e0952b] shadow-xl shadow-[#8a5216]/25">
                  <img
                    src="/placeholder.svg?height=640&width=560"
                    alt=""
                    aria-hidden="true"
                    className="aspect-[4/5] w-full object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
                <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-[#17130f] px-5 py-4 text-[#f7efe2] shadow-lg sm:block">
                  <p className="flex items-center gap-2 font-fraunces text-lg text-[#f0a830]">
                    <Flame className="h-4 w-4" /> Cooked over oak
                  </p>
                  <p className="mt-0.5 text-xs text-[#a8987d]">Fire &amp; smoke, every plate</p>
                </div>
              </div>
              <div>
                <SectionHeading eyebrow="Our story" title={`Behind ${business.name}`} />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5c5346]">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {bookingUrl && (
                  <a
                    href="#menu"
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#b8791d] transition-colors hover:text-[#8a5216]"
                  >
                    See what&apos;s on the menu <ChevronRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {hasReviews && (
          <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <SectionHeading
                eyebrow="Word of mouth"
                title="What the room is saying"
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
                    className="flex flex-col rounded-2xl border border-[#e7ddca] bg-white p-6 shadow-sm"
                  >
                    <Quote className="h-7 w-7 text-[#e6c98a]" aria-hidden="true" />
                    <Stars rating={r.rating} className="mt-3" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#40382c]">{r.text}</p>
                    <footer className="mt-5 flex items-center justify-between border-t border-[#e7ddca] pt-4 text-sm">
                      <span className="font-semibold text-[#17130f]">{r.author}</span>
                      <span className="text-[#7a6f5e]">{r.relativeTime}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-[#f3ead9] py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading eyebrow="Before you come in" title="Good to know" />
              <div className="rounded-2xl border border-[#e7ddca] bg-white px-6 shadow-sm">
                <FaqAccordion items={faqs} className="divide-[#eadfca]" />
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[2rem] border border-[#e7ddca] bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <SectionHeading eyebrow="Find us" title="Come and sit a while" />
                  <dl className="mt-8 space-y-6">
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#b8791d]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#b8791d]">Address</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#40382c]">{business.address}</dd>
                        {business.mapsUrl && (
                          <a
                            href={business.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#b8791d] transition-colors hover:text-[#8a5216]"
                          >
                            Get directions <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#b8791d]" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[#b8791d]">Phone</dt>
                        <dd className="mt-1 text-sm">
                          <a href={business.tel} className="text-[#40382c] hover:text-[#b8791d]">
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                    {hasHours && (
                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#b8791d]" aria-hidden="true" />
                        <div className="w-full">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-[#b8791d]">Hours</dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5 text-sm">
                              {business.hours!.map((h, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between gap-6 border-b border-dashed border-[#eadfca] pb-1.5 last:border-0"
                                >
                                  <span className="text-[#5c5346]">{h.day}</span>
                                  <span className="font-medium text-[#17130f]">{h.value}</span>
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
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e0952b] px-7 text-sm font-semibold text-[#17130f] transition-colors hover:bg-[#f0a830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0952b] focus-visible:ring-offset-2"
                      >
                        <CalendarClock className="h-4 w-4" /> {booking?.label || "Reserve a table"}
                      </a>
                    )}
                    <a
                      href={business.tel}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#dccbab] bg-white px-7 text-sm font-semibold text-[#17130f] transition-colors hover:bg-[#f8f1e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0952b] focus-visible:ring-offset-2"
                    >
                      <Phone className="h-4 w-4" /> Call the kitchen
                    </a>
                  </div>
                </div>

                {/* Map-ish panel */}
                <a
                  href={business.mapsUrl || "#contact"}
                  {...(business.mapsUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label="Open location in Google Maps"
                  className="group relative min-h-[300px] bg-gradient-to-br from-[#3a2c18] via-[#8a5216] to-[#e0952b]"
                >
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-55 mix-blend-luminosity"
                  />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[#17130f]/90 px-5 py-2.5 text-sm font-semibold text-[#f7efe2] shadow-lg backdrop-blur transition-transform group-hover:scale-105">
                    <MapPin className="h-4 w-4 text-[#f0a830]" /> {business.area}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2117] bg-[#17130f] text-[#c9bba4]">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#e0952b] to-[#a85f14] font-fraunces text-base font-semibold text-[#17130f]"
                >
                  {initialOf(business.name)}
                </span>
                <span className="font-fraunces text-lg font-semibold text-[#f7efe2]">{business.name}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#a8987d]">
                {business.category} in {business.area}.
              </p>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={business.tel} className="inline-flex items-center gap-2 hover:text-[#f7efe2]">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              {business.mapsUrl && (
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#f7efe2]"
                >
                  <MapPin className="h-4 w-4" /> {business.address}
                </a>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#8a7a63] sm:flex-row sm:items-center sm:justify-between">
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
