import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Menu,
  Phone,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";
import { FaqAccordion } from "@/lib/ui/accordion";

export const meta = { industry: "lawyer", label: "Business law & counsel", accent: "#0f766e" };

export const sampleConfig: SiteConfig = {
  business: {
    name: "Northstar Business Law", category: "Business law & strategic counsel", phone: "(905) 555-0146", tel: "tel:+19055550146",
    address: "225 Main Street North, Suite 610, Brampton, ON L6X 1N7", mapsUrl: "https://maps.google.com/?q=225+Main+Street+North+Brampton+ON",
    area: "Brampton, Mississauga & GTA", rating: 4.8, reviewCount: 63,
    hours: [{ day: "Monday – Thursday", value: "8:30 AM – 6:00 PM" }, { day: "Friday", value: "8:30 AM – 4:30 PM" }, { day: "Weekend", value: "By appointment" }],
  },
  copy: {
    heroHeadline: "Legal thinking built for momentum.",
    heroSub: "Practical counsel for ambitious owners, growing teams, and the transactions that move a business forward. Decisive advice. Meticulous execution.",
    about: "We work like an extension of your leadership team: commercially minded, rigorously prepared, and easy to reach when a decision cannot wait.\n\nOur role is to turn legal complexity into clear choices, protect what you are building, and keep the next opportunity within reach.",
    services: [
      { title: "Business formation", desc: "Choose the right structure and put governance in place from the beginning." },
      { title: "Commercial contracts", desc: "Negotiate and draft agreements that protect value without slowing down the deal." },
      { title: "Buying & selling a business", desc: "Manage diligence, risk, and closing details with a disciplined transaction plan." },
      { title: "Shareholder agreements", desc: "Create clear rules for ownership, decision-making, and change." },
      { title: "Employment advisory", desc: "Build sound relationships with the people who make your business work." },
      { title: "Outside general counsel", desc: "Responsive strategic support for the legal questions behind everyday decisions." },
    ],
    faq: [
      { q: "When should I involve a lawyer in a business decision?", a: "Early is usually best. A short conversation before you sign, hire, invest, or change ownership can prevent larger issues later." },
      { q: "Do you work with businesses at every stage?", a: "Yes. We support new ventures, established owner-managed businesses, and teams preparing for their next stage of growth." },
      { q: "Can we work together remotely?", a: "Absolutely. We offer secure video and phone consultations, with in-person meetings available when useful." },
    ],
  },
  reviews: [
    { author: "Owner, Manufacturing Company", rating: 5, text: "They understand the commercial reality behind the legal questions. The advice is prompt, direct, and always useful.", relativeTime: "1 month ago" },
    { author: "Founder, Technology Firm", rating: 5, text: "Every step of our acquisition felt organized and under control. We closed with confidence and no last-minute surprises.", relativeTime: "4 months ago" },
    { author: "Managing Director, Services Business", rating: 5, text: "A genuinely strategic partner. They help us see around corners and make better decisions faster.", relativeTime: "8 months ago" },
  ],
  gallery: [{ caption: "Growth transaction closed on schedule" }, { caption: "Clear governance for a new partnership" }, { caption: "Contract framework ready for scale" }],
  booking: { enabled: true, label: "Schedule a strategy call", url: "https://bookme-web.onrender.com/" },
  primaryCta: { label: "Talk to our team", href: "#consultation" },
};

function Metric({ value, label }: { value: string; label: string }) {
  return <div><p className="font-display text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl">{value}</p><p className="mt-1 text-xs font-medium uppercase tracking-[.16em] text-teal-100/65">{label}</p></div>;
}

function Rating({ rating }: { rating: number }) {
  return <span className="flex items-center gap-0.5 text-[#55e6d7]" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3.5 fill-current" />)}</span>;
}

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = reviews.length > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const initials = business.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "•";
  const cta = primaryCta ?? { label: booking?.label || "Call us", href: booking?.enabled && booking.url ? booking.url : business.tel };
  const nav = [
    ...(services.length ? [{ label: "Capabilities", href: "#capabilities" }] : []),
    ...(hasGallery ? [{ label: "Impact", href: "#impact" }] : []),
    ...(copy.about?.trim() ? [{ label: "Perspective", href: "#perspective" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main id="top" className="min-h-screen bg-[#f3f7f6] font-sans text-[#0a2928]">
      <header className="sticky top-0 z-50 bg-[#062d2b] text-white shadow-lg shadow-[#062d2b]/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label={`${business.name} home`}><span className="grid size-9 place-items-center rounded-md border border-[#55e6d7]/60 font-display text-xs font-bold tracking-tight text-[#55e6d7]">{initials}</span><span className="max-w-48 text-sm font-semibold tracking-tight sm:max-w-none">{business.name}</span></a>
          <div className="flex items-center gap-2 sm:gap-4"><a href={business.tel} className="hidden items-center gap-2 text-sm text-white/75 md:flex"><Phone className="size-4 text-[#55e6d7]" />{business.phone}</a><a href={cta.href} className="rounded-md bg-[#55e6d7] px-4 py-2.5 text-sm font-bold text-[#062d2b] transition hover:bg-[#a5fff7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-5">{cta.label}</a><button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="grid size-10 place-items-center rounded-md text-white hover:bg-white/10 lg:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button></div>
        </div>
        {menuOpen && <nav className="border-t border-white/10 bg-[#062d2b] px-5 py-4 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-1">{nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">{item.label}</a>)}<a href={business.tel} className="mt-2 flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-medium"><Phone className="size-4 text-[#55e6d7]" />{business.phone}</a></div></nav>}
      </header>

      <section className="relative isolate overflow-hidden bg-[#062d2b] text-white"><div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(85,230,215,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(85,230,215,.18)_1px,transparent_1px)] [background-size:48px_48px]" /><div className="absolute -right-32 top-0 -z-10 size-[38rem] rounded-full border-[80px] border-[#0e615b]/50" /><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:py-28"><div>{(business.category || business.area) && <p className="text-xs font-bold uppercase tracking-[.2em] text-[#55e6d7]">{[business.category, business.area].filter(Boolean).join(" / ")}</p>}{copy.heroHeadline && <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.25rem,7vw,6.8rem)] font-semibold leading-[.92] tracking-[-.065em]">{copy.heroHeadline}</h1>}{copy.heroSub && <p className="mt-8 max-w-2xl text-lg leading-8 text-teal-50/75">{copy.heroSub}</p>}<div className="mt-10 flex flex-wrap gap-4"><a href={cta.href} className="inline-flex items-center gap-2 rounded-md bg-[#55e6d7] px-6 py-3.5 text-sm font-bold text-[#062d2b] hover:bg-[#a5fff7]">{cta.label}<ArrowRight className="size-4" /></a><a href="#capabilities" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10">Explore capabilities <ArrowDown className="size-4" /></a></div></div><div className="self-end border-l border-[#55e6d7]/40 pl-6 sm:pl-10"><p className="max-w-xs font-display text-2xl font-medium leading-tight text-[#d6fffb]">Counsel that sees the whole business.</p><div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-7"><Metric value="01" label="Focused team" /><Metric value="24h" label="Response goal" /><Metric value="100%" label="Business minded" /><Metric value="GTA" label="Connected locally" /></div></div></div></section>

      {(business.rating !== null || business.area) && <section className="border-b border-[#c9dcda] bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-12 gap-y-4 px-5 py-5 text-sm sm:px-8 lg:px-12">{business.rating !== null && <div className="flex items-center gap-3"><Rating rating={business.rating} /><span className="font-semibold">{business.rating.toFixed(1)} client rating</span>{business.reviewCount !== null && <span className="text-[#55706e]">({business.reviewCount} reviews)</span>}</div>}<div className="flex items-center gap-2 text-[#355755]"><Building2 className="size-4 text-[#0f766e]" />Serving {business.area}</div><div className="flex items-center gap-2 text-[#355755]"><Sparkles className="size-4 text-[#0f766e]" />Practical advice, clear direction</div></div></section>}

      {services.length > 0 && <section id="capabilities" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#0f766e]">Capabilities</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.055em] text-[#082d2a] sm:text-5xl">The legal work behind a stronger business.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className="group relative overflow-hidden rounded-xl border border-[#c9dcda] bg-white p-7 transition hover:-translate-y-1 hover:border-[#0f766e] hover:shadow-xl hover:shadow-[#0f766e]/10 motion-reduce:transition-none"><span className="font-display text-sm font-bold text-[#0f766e]">0{index + 1}</span><h3 className="mt-12 font-display text-xl font-semibold tracking-[-.03em]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#55706e]">{service.desc}</p><ArrowUpRight className="mt-7 size-5 text-[#0f766e] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" /></article>)}</div></div></section>}

      {hasGallery && <section id="impact" className="scroll-mt-24 bg-[#d7f1ed] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#0f766e]">Built for momentum</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.055em] text-[#082d2a] sm:text-5xl">The details that make progress possible.</h2></div><BriefcaseBusiness className="size-11 text-[#0f766e]" /></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{gallery?.map((item, index) => <article key={item.caption} className="relative min-h-80 overflow-hidden rounded-xl bg-[#062d2b] p-7 text-white"><div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at ${index === 1 ? "80% 20%" : "25% 25%"}, #55e6d7 0, transparent 18%), linear-gradient(${115 + index * 20}deg, #062d2b 5%, #0a4844 65%, #0f766e 100%)` }} /><div className="relative flex h-full flex-col justify-between"><span className="font-display text-5xl font-semibold text-white/20">0{index + 1}</span><p className="max-w-xs font-display text-2xl font-semibold leading-tight tracking-[-.04em]">{item.caption}</p></div></article>)}</div></div></section>}

      {copy.about?.trim() && <section id="perspective" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#0f766e]">Our perspective</p><h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.055em] text-[#082d2a]">Legal clarity is a business advantage.</h2></div><div><div className="border-l-2 border-[#55e6d7] pl-7 text-xl leading-9 text-[#31524f]">{copy.about.split("\n").filter(Boolean).map((paragraph, index) => <p key={index} className="mb-6 last:mb-0">{paragraph}</p>)}</div><div className="mt-10 grid gap-4 sm:grid-cols-3">{["Direct access to your legal team", "Commercial context in every recommendation", "A process that keeps deals moving"].map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-[#426360]"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#0f766e]" />{item}</div>)}</div></div></div></section>}

      {hasReviews && <section className="bg-[#062d2b] px-5 py-20 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#55e6d7]">Trusted perspective</p><div className="mt-8 grid gap-5 lg:grid-cols-3">{reviews.map((review) => <blockquote key={`${review.author}-${review.relativeTime}`} className="rounded-xl border border-white/15 bg-white/[.04] p-7"><Rating rating={review.rating} /><p className="mt-6 min-h-28 text-lg leading-8 text-white/90">“{review.text}”</p><footer className="mt-7 border-t border-white/15 pt-4"><p className="text-sm font-bold">{review.author}</p><p className="mt-1 text-xs text-teal-100/60">{review.relativeTime}</p></footer></blockquote>)}</div></div></section>}

      {booking?.enabled && booking.url && <section id="consultation" className="scroll-mt-24 bg-[#f3f7f6] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#0f766e] lg:grid-cols-[1.15fr_.85fr]"><div className="p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a5fff7]">Strategic first call</p><h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-tight tracking-[-.055em] sm:text-5xl">Bring the opportunity into focus.</h2><p className="mt-6 max-w-xl leading-7 text-teal-50/80">A focused conversation to understand the decision in front of you, the legal questions beneath it, and the clearest next move.</p></div><div className="bg-[#062d2b] p-8 text-white sm:p-10"><p className="font-display text-xl font-semibold">Set your next move in motion.</p><div className="mt-7 space-y-4">{["Share the decision you are facing", "Get a practical view of the legal landscape", "Leave with a defined next step"].map((item) => <p key={item} className="flex gap-3 text-sm leading-6 text-teal-50/75"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#55e6d7] text-[#062d2b]">✓</span>{item}</p>)}</div><a href={booking.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#55e6d7] px-6 py-3.5 text-sm font-bold text-[#062d2b] hover:bg-[#a5fff7]">{booking.label || "Book an appointment"}<ArrowUpRight className="size-4" /></a></div></div></section>}

      <section id="contact" className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr]"><div>{faqs.length > 0 && <><p className="text-xs font-bold uppercase tracking-[.2em] text-[#0f766e]">Frequently asked</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.055em] text-[#082d2a]">Useful answers before we talk.</h2><FaqAccordion items={faqs} className="mt-8 max-w-2xl" /></>}</div><aside className="rounded-xl border border-[#c9dcda] bg-[#f3f7f6] p-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#0f766e]">Office & availability</p><p className="mt-5 text-sm leading-6 text-[#426360]">{business.address}</p><a href={business.mapsUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f766e]">Get directions <ArrowUpRight className="size-4" /></a><a href={business.tel} className="mt-7 flex items-center gap-2 border-t border-[#c9dcda] pt-5 text-sm font-bold"><Phone className="size-4 text-[#0f766e]" />{business.phone}</a>{hasHours && <div className="mt-6 space-y-2 border-t border-[#c9dcda] pt-5">{business.hours?.map((hour) => <div key={hour.day} className="flex justify-between gap-4 text-xs"><span className="text-[#55706e]">{hour.day}</span><span className="font-semibold text-[#153a37]">{hour.value}</span></div>)}</div>}</aside></div></section>

      <footer className="bg-[#062d2b] px-5 py-9 text-white sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm sm:flex-row sm:items-center"><p className="font-display font-semibold">{business.name}</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-teal-50/65"><a href={business.tel} className="hover:text-white">{business.phone}</a>{business.area && <span>{business.area}</span>}</div></div></footer>
    </main>
  );
}

function ArrowDown({ className }: { className?: string }) {
  return <ChevronDown className={className} />;
}
