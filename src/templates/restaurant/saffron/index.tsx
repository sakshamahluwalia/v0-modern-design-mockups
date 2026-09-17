import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Menu as MenuIcon,
  X,
  ArrowUpRight,
  ChevronDown,
  UtensilsCrossed,
  Leaf,
  Flame,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

// businessType (restaurant) + id (saffron) come from the folder path.
export const meta = {
  industry: "indian-restaurant",
  label: "Indian restaurant & kitchen",
  accent: "#c1922e",
} as const;

/* ------------------------------------------------------------------ */
/* Sample content — a modern Indian kitchen in Brampton, ON            */
/* ------------------------------------------------------------------ */

export const sampleConfig: SiteConfig = {
  business: {
    name: "Saffron & Smoke",
    category: "Modern Indian Kitchen",
    phone: "(905) 555-0148",
    tel: "tel:+19055550148",
    address: "212 Main Street North, Brampton, ON L6X 1N7",
    mapsUrl: "https://maps.google.com",
    area: "Brampton, ON",
    rating: 4.8,
    reviewCount: 326,
    hours: [
      { day: "Monday — Thursday", value: "11:30 am — 10:00 pm" },
      { day: "Friday — Saturday", value: "11:30 am — 12:00 am" },
      { day: "Sunday", value: "12:00 pm — 9:30 pm" },
    ],
  },
  copy: {
    heroHeadline: "Time-honoured spice, plated for today.",
    heroSub:
      "A family kitchen where tandoor smoke, slow-cooked curries, and warm hospitality come together. Dine in, take out, or let us cater your next gathering.",
    about:
      "Saffron & Smoke began with a home recipe box and a charcoal tandoor. Two generations later, we still grind our own masalas each morning and cook to order — nothing sits under a lamp. Whether it is a weeknight butter chicken or a table of twelve celebrating, you are family the moment you walk in.",
    services: [
      {
        title: "Butter Chicken",
        desc: "Charcoal-grilled chicken folded into a velvety tomato and fenugreek gravy. Our most-loved plate.",
        price: "$18",
      },
      {
        title: "Lamb Rogan Josh",
        desc: "Slow-braised lamb shoulder in a Kashmiri chilli and yogurt sauce, finished with saffron.",
        price: "$22",
      },
      {
        title: "Palak Paneer",
        desc: "House-pressed paneer in a silky spinach gravy with garlic and roasted cumin.",
        price: "$16",
      },
      {
        title: "Hyderabadi Dum Biryani",
        desc: "Fragrant basmati layered with spiced meat or vegetables, sealed and steamed in its own pot.",
        price: "$19",
      },
      {
        title: "Tandoori Platter",
        desc: "Chicken tikka, seekh kebab, and malai tikka straight from the clay oven, with mint chutney.",
        price: "$24",
      },
      {
        title: "Garlic Naan",
        desc: "Hand-stretched and blistered in the tandoor, brushed with garlic butter and coriander.",
        price: "$4",
      },
      {
        title: "Chana Masala",
        desc: "Chickpeas simmered with ginger, tomato, and a tangy amchur finish. Fully vegan.",
        price: "$14",
      },
      {
        title: "Gulab Jamun",
        desc: "Warm milk dumplings soaked in cardamom and rose syrup. Two to a plate.",
        price: "$7",
      },
    ],
    faq: [
      {
        q: "Do you offer vegetarian and vegan options?",
        a: "Plenty. A large part of our menu is vegetarian, and many dishes — like the chana masala and several curries — are fully vegan or can be prepared that way. Ask us and we will guide you.",
      },
      {
        q: "Can you adjust the spice level?",
        a: "Absolutely. Every dish can be prepared mild, medium, or hot, and we are happy to tone things down for younger guests. Just let your server know.",
      },
      {
        q: "Do you take reservations and large groups?",
        a: "Yes. Reserve online for tables of any size, and call ahead for parties of eight or more so we can set the room and prep the kitchen.",
      },
      {
        q: "Do you offer takeout and catering?",
        a: "We do both daily. Most takeout orders are ready in 20–30 minutes, and our catering menu covers everything from office lunches to weddings.",
      },
    ],
  },
  reviews: [
    {
      author: "Priya M.",
      rating: 5,
      text: "The butter chicken is the best I have had outside of my grandmother's kitchen. Warm service and the naan comes out perfect every time.",
      relativeTime: "3 weeks ago",
    },
    {
      author: "Daniel R.",
      rating: 5,
      text: "Booked a table for ten and they handled it flawlessly. The tandoori platter disappeared in minutes. We will be back.",
      relativeTime: "2 months ago",
    },
    {
      author: "Aisha K.",
      rating: 4,
      text: "Beautiful room, generous portions, and they happily made the palak paneer vegan for me. A new weeknight favourite.",
      relativeTime: "4 months ago",
    },
  ],
  gallery: [
    { caption: "Butter chicken, straight from the pan" },
    { caption: "Tandoor breads, blistered to order" },
    { caption: "The mixed grill platter" },
    { caption: "Saffron dum biryani, sealed in its pot" },
  ],
  booking: { enabled: true, label: "Reserve a table", url: "https://bookme-web.onrender.com/" },
  primaryCta: { label: "Reserve a table", href: "#reserve" },
};

/* ------------------------------------------------------------------ */
/* Palette — warm cream ground, ink-black hero, saffron gold accent    */
/* ------------------------------------------------------------------ */
const GOLD = "#c1922e";
const GOLD_SOFT = "#dcbd6f";
const INK = "#161310";

function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      style={{ color: GOLD }}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  children,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} mb-12 max-w-2xl`}>
      <p
        className="mb-4 text-xs font-semibold uppercase tracking-[0.28em]"
        style={{ color: GOLD }}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl ${
          dark ? "text-white" : "text-[#231d15]"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-5 text-base leading-7 ${
            dark ? "text-white/70" : "text-[#6f6656]"
          }`}
        >
          {children}
        </p>
      )}
    </div>
  );
}

export default function SiteTemplate({
  config: site = sampleConfig,
}: {
  config?: SiteConfig;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [party, setParty] = useState("2 guests");
  const [selectedDay, setSelectedDay] = useState("Fri, Oct 24");
  const [selectedTime, setSelectedTime] = useState("7:00 PM");

  const initial = site.business.name.charAt(0).toUpperCase();
  const primaryHref = site.primaryCta?.href ?? (site.booking?.enabled ? "#reserve" : "#contact");
  const primaryLabel = site.primaryCta?.label ?? "Reserve a table";

  // In-page anchors surfaced only in the mobile menu (no desktop center-nav).
  const nav = [
    ["Menu", "#menu"],
    ["About", "#about"],
    ["Reviews", "#reviews"],
    ["Visit", "#contact"],
  ] as const;

  return (
    <main className="min-h-screen bg-[#faf7f2] font-sans text-[#231d15]">
      {/* ---------------------------------------------------------------- */}
      {/* Header — brand left; phone + one CTA right; hamburger on mobile   */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#161310]/95 text-white backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f]"
            aria-label={`${site.business.name} home`}
          >
            <span
              className="grid size-10 place-items-center rounded-full font-serif text-xl"
              style={{ border: `1px solid ${GOLD}`, color: GOLD_SOFT }}
            >
              {initial}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-[0.06em]">
                {site.business.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                {site.business.category}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.business.tel}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] md:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.business.phone}
            </a>
            <a
              href={primaryHref}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#161310] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161310]"
              style={{ backgroundColor: GOLD }}
            >
              {primaryLabel}
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="flex flex-col gap-1 border-t border-white/10 px-5 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-white/80 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f]"
              >
                {label}
              </a>
            ))}
            <a
              href={site.business.tel}
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold"
              style={{ color: GOLD_SOFT }}
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.business.phone}
            </a>
          </nav>
        )}
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#161310] text-white"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 18%, rgba(193,146,46,0.55) 0, transparent 34%), radial-gradient(circle at 8% 92%, rgba(122,63,18,0.5) 0, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div
              className="mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: GOLD_SOFT }}
            >
              <span className="h-px w-10" style={{ backgroundColor: GOLD }} />
              {site.business.category}
            </div>
            <h1
              id="hero-heading"
              className="max-w-2xl font-serif text-[clamp(2.9rem,6.5vw,5.5rem)] leading-[0.98] tracking-[-0.03em]"
            >
              {site.copy.heroHeadline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">
              {site.copy.heroSub}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#161310] transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161310]"
                style={{ backgroundColor: GOLD }}
              >
                View the menu
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f]"
              >
                {primaryLabel}
              </a>
            </div>
            {(site.business.rating != null || site.business.area) && (
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
                {site.business.rating != null && (
                  <span className="inline-flex items-center gap-2">
                    <Stars count={Math.round(site.business.rating)} />
                    {site.business.rating.toFixed(1)}
                    {site.business.reviewCount != null && (
                      <span className="text-white/50">
                        ({site.business.reviewCount} reviews)
                      </span>
                    )}
                  </span>
                )}
                {site.business.area && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" style={{ color: GOLD_SOFT }} aria-hidden="true" />
                    {site.business.area}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Supporting visual — layered gradient "plate" panel */}
          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(150deg, #2a2117 0%, #4a3418 45%, #c1922e 130%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(220,189,111,0.35) 0, transparent 45%)",
                }}
              />
              <div className="absolute bottom-8 left-8 right-8 border-l-2 pl-5" style={{ borderColor: GOLD_SOFT }}>
                <p className="font-serif text-2xl leading-tight text-white">
                  Ground fresh daily.
                  <br />
                  Cooked to order.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#faf7f2] p-5 text-[#231d15] shadow-xl">
              <div className="mb-1 flex items-center gap-2">
                <Flame className="size-5" style={{ color: GOLD }} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Charcoal tandoor
                </span>
              </div>
              <p className="font-serif text-2xl">Since 1998</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust strip                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-[#e7ddcb] bg-white" aria-label="Highlights">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <UtensilsCrossed className="size-7" style={{ color: GOLD }} aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Made from scratch</p>
              <p className="text-xs text-[#8a8072]">Masalas ground every morning</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:border-l md:border-[#e7ddcb] md:pl-8">
            <Leaf className="size-7" style={{ color: GOLD }} aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Veg, vegan & halal</p>
              <p className="text-xs text-[#8a8072]">Clearly marked, easily adapted</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:border-l md:border-[#e7ddcb] md:pl-8">
            <Clock className="size-7" style={{ color: GOLD }} aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Dine in · takeout · catering</p>
              <p className="text-xs text-[#8a8072]">Serving {site.business.area}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Menu (lead section) — dishes with price leaders                   */}
      {/* ---------------------------------------------------------------- */}
      {site.copy.services.length > 0 && (
        <section id="menu" className="mx-auto max-w-6xl px-5 py-24 sm:px-8" aria-labelledby="menu-heading">
          <SectionIntro eyebrow="The menu" title="From the kitchen & tandoor">
            A rotating selection of our most-ordered plates. Every dish is cooked to order —
            tell us your spice level.
          </SectionIntro>
          <h2 id="menu-heading" className="sr-only">
            Menu
          </h2>
          <div className="grid gap-x-14 gap-y-8 md:grid-cols-2">
            {site.copy.services.map((dish) => (
              <article
                key={dish.title}
                className="group border-b border-[#e7ddcb] pb-6"
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="font-serif text-xl text-[#231d15]">{dish.title}</h3>
                  <span
                    className="h-px flex-1 translate-y-[-2px] border-b border-dotted border-[#cdbfa4]"
                    aria-hidden="true"
                  />
                  {dish.price && (
                    <span className="font-serif text-xl" style={{ color: GOLD }}>
                      {dish.price}
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6656]">{dish.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <a
              href={primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#161310] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a2117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] focus-visible:ring-offset-2"
            >
              {primaryLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Featured dishes (gallery)                                         */}
      {/* ---------------------------------------------------------------- */}
      {site.gallery && site.gallery.length > 0 && (
        <section className="bg-[#f1e9db]" aria-label="Featured dishes">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <SectionIntro eyebrow="Off the pass" title="A few of our favourites" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {site.gallery.map((item, index) => (
                <article
                  key={item.caption}
                  className="group relative min-h-64 overflow-hidden rounded-2xl p-6 text-white"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    style={{
                      background: `linear-gradient(${150 + index * 20}deg, #2a2117 8%, ${
                        index % 2 === 0 ? "#5a3f1c" : "#3a2c18"
                      } 55%, ${GOLD} 165%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col justify-between">
                    <span
                      className="text-xs uppercase tracking-[0.2em]"
                      style={{ color: GOLD_SOFT }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="max-w-[12rem] font-serif text-2xl leading-tight">
                      {item.caption}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* About                                                             */}
      {/* ---------------------------------------------------------------- */}
      {site.copy.about && (
        <section
          id="about"
          className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr]"
          aria-labelledby="about-heading"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              Our story
            </p>
            <p id="about-heading" className="mt-5 font-serif text-4xl leading-tight text-[#231d15]">
              A family kitchen, two generations deep.
            </p>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-9 text-[#5c5346]">{site.copy.about}</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#e7ddcb] pt-8">
              <div>
                <p className="font-serif text-4xl text-[#231d15]">25+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#8a8072]">
                  Years cooking
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-[#231d15]">40+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#8a8072]">
                  Dishes daily
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-[#231d15]">100%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#8a8072]">
                  Made to order
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Reviews                                                           */}
      {/* ---------------------------------------------------------------- */}
      {site.reviews.length > 0 && (
        <section id="reviews" className="bg-[#161310] text-white" aria-labelledby="reviews-heading">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <SectionIntro eyebrow="Guest reviews" title="Loved by the neighbourhood" dark />
              <a
                href={primaryHref}
                className="mb-12 text-sm underline underline-offset-8"
                style={{ color: GOLD_SOFT }}
              >
                {primaryLabel}
              </a>
            </div>
            <h2 id="reviews-heading" className="sr-only">
              Reviews
            </h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {site.reviews.map((review) => (
                <blockquote
                  key={review.author}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
                >
                  <Stars count={review.rating} />
                  <p className="mt-6 min-h-28 text-lg leading-8 text-white/85">
                    “{review.text}”
                  </p>
                  <footer className="mt-8 border-t border-white/10 pt-5">
                    <p className="text-sm font-semibold">{review.author}</p>
                    <p className="mt-1 text-xs text-white/50">{review.relativeTime}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Reservation (booking)                                             */}
      {/* ---------------------------------------------------------------- */}
      {site.booking?.enabled && (
        <section
          id="reserve"
          className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.85fr_1.15fr]"
          aria-labelledby="reserve-heading"
        >
          <div>
            <SectionIntro eyebrow="Reservations" title="Save your table">
              Pick a time that suits you and we will have the table ready. Larger party or a
              special occasion? Tell us on the next step.
            </SectionIntro>
            <h2 id="reserve-heading" className="sr-only">
              Reservations
            </h2>
            <div className="flex items-center gap-3 text-sm text-[#6f6656]">
              <CalendarDays className="size-5" style={{ color: GOLD }} aria-hidden="true" />
              Walk-ins always welcome — reservations recommended on weekends.
            </div>
          </div>
          <div className="rounded-3xl border border-[#e7ddcb] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-[#efe7d8] pb-5">
              <div>
                <p className="font-serif text-2xl">Book a table</p>
                <p className="mt-1 text-sm text-[#8a8072]">Choose a party size, day, and time</p>
              </div>
              <span className="rounded-full bg-[#f1e9db] px-3 py-1 text-xs font-semibold text-[#6f6656]">
                Step 1 of 1
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-6">
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-[#8a8072]">
                Party size
                <select
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  className="rounded-xl border border-[#e7ddcb] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#231d15] outline-none focus:border-[#c1922e] focus-visible:ring-2 focus-visible:ring-[#dcbd6f]"
                >
                  {["2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map(
                    (p) => (
                      <option key={p}>{p}</option>
                    ),
                  )}
                </select>
              </label>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8a8072]">
                  Preferred day
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["Thu, Oct 23", "Fri, Oct 24", "Sat, Oct 25"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      aria-pressed={selectedDay === day}
                      className={`rounded-xl border px-2 py-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] ${
                        selectedDay === day
                          ? "border-[#c1922e] bg-[#fbf5e8] text-[#8a6a1f]"
                          : "border-[#e7ddcb] text-[#6f6656] hover:border-[#c1922e]"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8a8072]">
                  Preferred time
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["6:00 PM", "7:00 PM", "8:30 PM"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={selectedTime === time}
                      className={`rounded-xl border px-2 py-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] ${
                        selectedTime === time
                          ? "border-[#c1922e] bg-[#fbf5e8] text-[#8a6a1f]"
                          : "border-[#e7ddcb] text-[#6f6656] hover:border-[#c1922e]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href={site.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[#161310] transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f] focus-visible:ring-offset-2"
                style={{ backgroundColor: GOLD }}
              >
                {site.booking.label || "Book an appointment"} · {party}, {selectedDay} at{" "}
                {selectedTime}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <p className="text-center text-xs text-[#9a9082]">
                You will confirm the details on the next screen. No card required to hold a table.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* FAQ + Visit                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="contact"
        className="border-t border-[#e7ddcb] bg-white"
        aria-labelledby="visit-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          {site.copy.faq.length > 0 && (
            <div>
              <SectionIntro eyebrow="Good to know" title="Before you visit" />
              <div className="flex flex-col">
                {site.copy.faq.map((faq) => (
                  <details key={faq.q} className="group border-t border-[#e7ddcb] py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcbd6f]">
                      {faq.q}
                      <ChevronDown
                        className="size-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        style={{ color: GOLD }}
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-xl pt-4 text-sm leading-7 text-[#6f6656]">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-3xl bg-[#f1e9db] p-8 sm:p-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: GOLD }}
            >
              Find us
            </p>
            <h2 id="visit-heading" className="mt-5 font-serif text-3xl text-[#231d15]">
              Come sit at our table.
            </h2>
            {site.business.address && (
              <p className="mt-5 flex items-start gap-3 text-sm leading-7 text-[#6f6656]">
                <MapPin className="mt-0.5 size-5 shrink-0" style={{ color: GOLD }} aria-hidden="true" />
                {site.business.address}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {site.business.mapsUrl && (
                <a
                  href={site.business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#231d15] underline decoration-[#c1922e] underline-offset-8"
                >
                  Get directions <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
              <a
                href={site.business.tel}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#231d15] underline decoration-[#c1922e] underline-offset-8"
              >
                <Phone className="size-4" aria-hidden="true" /> {site.business.phone}
              </a>
            </div>
            {site.business.hours && site.business.hours.length > 0 && (
              <div className="mt-10 border-t border-[#d9cdb5] pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8a8072]">
                  Opening hours
                </p>
                {site.business.hours.map((hour) => (
                  <div key={hour.day} className="flex justify-between gap-4 py-2 text-sm">
                    <span className="text-[#6f6656]">{hour.day}</span>
                    <span className="text-[#231d15]">{hour.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[#161310] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="grid size-9 place-items-center rounded-full font-serif text-lg"
              style={{ border: `1px solid ${GOLD}`, color: GOLD_SOFT }}
            >
              {initial}
            </span>
            <div>
              <p className="text-sm font-semibold tracking-wide">{site.business.name}</p>
              <p className="mt-1 text-xs text-white/50">{site.business.category}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
            <a href={site.business.tel} className="hover:text-white">
              {site.business.phone}
            </a>
            <span>{site.business.area}</span>
            <span>
              © {new Date().getFullYear()} {site.business.name}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
