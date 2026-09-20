import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  HeartHandshake,
  MapPin,
  Menu,
  Phone,
  Scale,
  Star,
  X,
} from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";
import { FaqAccordion } from "@/lib/ui/accordion";

export const meta = { industry: "lawyer", label: "Family law & mediation", accent: "#c2603d" };

export const sampleConfig: SiteConfig = {
  business: {
    name: "Stonemill Family Law", category: "Family law & mediation", phone: "(905) 555-0188", tel: "tel:+19055550188",
    address: "18 Queen Street East, Suite 400, Brampton, ON L6V 1A2", mapsUrl: "https://maps.google.com/?q=18+Queen+Street+East+Brampton+ON",
    area: "Brampton & Peel Region", rating: 4.9, reviewCount: 76,
    hours: [{ day: "Monday – Friday", value: "8:30 AM – 6:00 PM" }, { day: "Saturday", value: "By appointment" }, { day: "Sunday", value: "Closed" }],
  },
  copy: {
    heroHeadline: "A way forward, with dignity.",
    heroSub: "Clear, compassionate family-law guidance for the decisions that reshape your life. We make room for what matters and build a practical path ahead.",
    about: "We believe family law should feel more human. Our team brings careful preparation, plain language, and a steady presence to every conversation.\n\nWhether your matter calls for thoughtful negotiation or firm advocacy, we focus on protecting your future while helping you move forward with confidence.",
    services: [
      { title: "Separation agreements", desc: "Practical, clear agreements that set a stable foundation for the next chapter." },
      { title: "Divorce applications", desc: "Guidance through uncontested and contested divorce with a calm, organized approach." },
      { title: "Parenting arrangements", desc: "Child-centred plans designed around routines, communication, and long-term wellbeing." },
      { title: "Mediation", desc: "A respectful, structured forum for resolving difficult issues outside the courtroom." },
      { title: "Support & property", desc: "Careful advice on support obligations, assets, and financially sound resolutions." },
      { title: "Independent legal advice", desc: "A focused review before you sign, so you understand every important term." },
    ],
    faq: [
      { q: "What happens in a first consultation?", a: "We listen to your situation, identify immediate priorities, and explain the available paths in clear language. You leave with a practical next step." },
      { q: "Can we resolve things without going to court?", a: "Often, yes. Negotiation and mediation can be effective ways to reach a durable agreement. We recommend the approach that best fits your circumstances." },
      { q: "What should I bring with me?", a: "Bring any agreements, court documents, financial information, and a short timeline of important events. If you are unsure, call us and we will help you prepare." },
    ],
  },
  reviews: [
    { author: "Amina R.", rating: 5, text: "I felt heard from the first call. Every option was explained without pressure, and I always knew what was happening next.", relativeTime: "3 weeks ago" },
    { author: "Michael T.", rating: 5, text: "Steady advice during a difficult time. The team was prepared, responsive, and genuinely thoughtful about my children.", relativeTime: "2 months ago" },
    { author: "Rachel D.", rating: 5, text: "They made a complicated process feel manageable. I am so grateful for their patience and practical direction.", relativeTime: "5 months ago" },
  ],
  gallery: [{ caption: "A parenting plan built around consistency" }, { caption: "A mediated separation with a clear path ahead" }, { caption: "Careful preparation for a confident next step" }],
  booking: { enabled: true, label: "Book a confidential consultation", url: "https://bookme-web.onrender.com/" },
  primaryCta: { label: "Start a conversation", href: "#consultation" },
};

function Stars({ rating }: { rating: number }) {
  return <span className="flex gap-1 text-[#d76c45]" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3.5 fill-current" />)}</span>;
}

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const initial = business.name.trim().charAt(0).toUpperCase() || "•";
  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = reviews.length > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const cta = primaryCta ?? { label: booking?.label || "Call us", href: booking?.enabled && booking.url ? booking.url : business.tel };
  const nav = [
    ...(services.length ? [{ label: "How we help", href: "#services" }] : []),
    ...(hasGallery ? [{ label: "Our approach", href: "#approach" }] : []),
    ...(copy.about?.trim() ? [{ label: "About", href: "#about" }] : []),
    ...(hasReviews ? [{ label: "Stories", href: "#stories" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#fffaf5] font-sans text-[#3d2d2b]">
      <header className="sticky top-0 z-50 border-b border-[#e8d8cf]/80 bg-[#fffaf5]/90 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-3" aria-label={`${business.name} home`}>
            <span className="grid size-10 place-items-center rounded-full bg-[#4a3030] font-serif text-xl text-[#ffe4d6]">{initial}</span>
            <span className="max-w-40 text-sm font-semibold tracking-tight sm:max-w-none sm:text-base">{business.name}</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href={business.tel} className="hidden items-center gap-2 text-sm font-medium text-[#6e504c] md:flex"><Phone className="size-4" />{business.phone}</a>
            <a href={cta.href} className="rounded-full bg-[#c2603d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a84d2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2603d] focus-visible:ring-offset-2 sm:px-5">{cta.label}</a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="grid size-10 place-items-center rounded-full text-[#4a3030] hover:bg-[#f3e5dc] lg:hidden">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-[#e8d8cf] bg-[#fffaf5] px-5 py-4 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-7xl flex-col gap-1">{nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#f3e5dc]">{item.label}</a>)}<a href={business.tel} className="mt-2 flex items-center gap-2 rounded-xl bg-[#f3e5dc] px-4 py-3 text-sm font-medium"><Phone className="size-4" />{business.phone}</a></div></nav>}
      </header>

      <section className="relative isolate border-b border-[#e8d8cf] bg-[#fffaf5]">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[45%] bg-[#f4ded0] lg:block" />
        <div className="absolute right-[15%] top-20 -z-10 hidden size-64 rounded-full border-[28px] border-[#eab09a]/50 lg:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-28">
          <div>
            {(business.category || business.area) && <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.19em] text-[#b75335]"><span className="h-px w-8 bg-current" />{[business.category, business.area].filter(Boolean).join(" · ")}</p>}
            {copy.heroHeadline && <h1 className="max-w-3xl font-serif text-[clamp(3.2rem,6vw,6.2rem)] leading-[.94] tracking-[-.055em] text-[#4a3030]">{copy.heroHeadline}</h1>}
            {copy.heroSub && <p className="mt-7 max-w-xl text-lg leading-8 text-[#725955]">{copy.heroSub}</p>}
            <div className="mt-9 flex flex-wrap items-center gap-4"><a href={cta.href} className="inline-flex items-center gap-2 rounded-full bg-[#c2603d] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a84d2e]">{cta.label}<ArrowUpRight className="size-4" /></a><a href={business.tel} className="text-sm font-semibold text-[#704239] underline decoration-[#d9896e] underline-offset-8">Call {business.phone}</a></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:justify-self-end">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.4rem] bg-[#4a3030] shadow-[16px_18px_0_#f3c5b1]">
              <div className="h-full bg-[radial-gradient(circle_at_75%_20%,#d97856_0,transparent_29%),linear-gradient(135deg,#5e3b37_0%,#2b272a_100%)] p-8 sm:p-10"><div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/20 p-6 text-[#ffe9df]"><HeartHandshake className="size-10" /><p className="max-w-xs font-serif text-3xl leading-tight sm:text-4xl">Thoughtful guidance, one step at a time.</p><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#f6b7a0]">A calmer way through</p></div></div>
            </div>
            {business.rating !== null && business.reviewCount !== null && <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white px-5 py-4 shadow-lg sm:-left-8"><Stars rating={business.rating} /><p className="mt-2 text-sm font-bold text-[#4a3030]">{business.rating.toFixed(1)} from {business.reviewCount} clients</p></div>}
          </div>
        </div>
      </section>

      {services.length > 0 && <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b75335]">Support with substance</p><h2 className="mt-4 max-w-md font-serif text-4xl leading-tight tracking-[-.04em] text-[#4a3030] sm:text-5xl">You do not have to figure it all out alone.</h2></div><p className="max-w-xl self-end text-base leading-7 text-[#725955]">Each matter is different. We meet you with practical advice, full attention, and a process that makes sense from the first conversation.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#e8d8cf] bg-[#e8d8cf] sm:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className="group bg-[#fffaf5] p-7 transition-colors hover:bg-[#fff1e9]"><span className="font-serif text-2xl text-[#d88a6d]">0{index + 1}</span><h3 className="mt-12 text-lg font-bold text-[#4a3030]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#725955]">{service.desc}</p><ChevronRight className="mt-6 size-5 text-[#c2603d] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" /></article>)}</div></div></section>}

      {hasGallery && <section id="approach" className="scroll-mt-24 bg-[#4a3030] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[.19em] text-[#f7b29a]">Our approach</p><h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">Make space for the life you are building.</h2></div><Scale className="size-11 text-[#e78b68]" /></div><div className="mt-12 grid gap-4 md:grid-cols-3">{gallery?.map((item, index) => <article key={item.caption} className="relative min-h-72 overflow-hidden rounded-3xl p-7" style={{ background: `linear-gradient(${135 + index * 25}deg, #8a4b3d, #3e2c31 68%, #d06b49)` }}><span className="absolute right-6 top-5 font-serif text-6xl text-white/15">0{index + 1}</span><div className="relative flex h-full items-end"><p className="max-w-52 font-serif text-3xl leading-tight">{item.caption}</p></div></article>)}</div></div></section>}

      {copy.about?.trim() && <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-[2rem] bg-[#f2dfd4] p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b75335]">The team behind you</p><HeartHandshake className="mt-16 size-12 text-[#c2603d]" /><p className="mt-6 font-serif text-3xl leading-tight text-[#4a3030]">Clear advice can change the way a hard day feels.</p></div><div className="py-3"><p className="text-xl leading-9 text-[#5e4642]">{copy.about.split("\n").filter(Boolean).map((paragraph, index) => <span key={index} className="mb-6 block">{paragraph}</span>)}</p><div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#e8d8cf] pt-7"><div className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-[#c2603d]" /><p className="text-sm leading-6 text-[#725955]">Plain-language advice at every stage</p></div><div className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-[#c2603d]" /><p className="text-sm leading-6 text-[#725955]">A process built around your priorities</p></div></div></div></div></section>}

      {hasReviews && <section id="stories" className="scroll-mt-24 border-y border-[#e8d8cf] bg-white px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b75335]">Client stories</p><div className="mt-8 grid gap-5 lg:grid-cols-3">{reviews.map((review) => <blockquote key={`${review.author}-${review.relativeTime}`} className="rounded-2xl border border-[#ecdcd2] p-7"><Stars rating={review.rating} /><p className="mt-6 min-h-28 font-serif text-xl leading-8 text-[#4a3030]">“{review.text}”</p><footer className="mt-7 border-t border-[#ecdcd2] pt-4"><p className="text-sm font-bold">{review.author}</p><p className="mt-1 text-xs text-[#8a6c65]">{review.relativeTime}</p></footer></blockquote>)}</div></div></section>}

      {booking?.enabled && booking.url && <section id="consultation" className="scroll-mt-24 bg-[#f6ddd1] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[#4a3030] p-8 text-white sm:p-12 lg:grid-cols-[1fr_.9fr] lg:p-16"><div><p className="text-xs font-bold uppercase tracking-[.19em] text-[#f7b29a]">A private first conversation</p><h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight tracking-[-.04em] sm:text-5xl">Start with clarity, not pressure.</h2><p className="mt-6 max-w-lg leading-7 text-[#f4d9cd]">Choose a time to speak with our team. We will listen, outline your options, and help you decide what comes next.</p></div><div className="rounded-2xl bg-[#fffaf5] p-7 text-[#4a3030]"><p className="text-sm font-bold">Your consultation includes</p><ul className="mt-5 space-y-4">{["A focused conversation about your priorities", "A clear explanation of the options available", "Practical next steps you can act on"].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#725955]"><Check className="mt-0.5 size-4 shrink-0 text-[#c2603d]" />{item}</li>)}</ul><a href={booking.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c2603d] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#a84d2e]">{booking.label || "Book an appointment"}<ArrowUpRight className="size-4" /></a></div></div></section>}

      <section id="contact" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr]"><div>{faqs.length > 0 && <><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b75335]">Questions, answered</p><h2 className="mt-4 font-serif text-4xl tracking-[-.04em] text-[#4a3030]">Before we begin.</h2><FaqAccordion items={faqs} className="mt-7 max-w-2xl" /></>}</div><aside className="rounded-3xl bg-[#f2dfd4] p-8"><MapPin className="size-6 text-[#c2603d]" /><p className="mt-5 text-sm font-bold">Visit the office</p><p className="mt-2 max-w-xs text-sm leading-6 text-[#725955]">{business.address}</p><a href={business.mapsUrl} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8f432c] underline underline-offset-4">Get directions <ArrowUpRight className="size-4" /></a>{hasHours && <div className="mt-7 border-t border-[#dfc8bb] pt-5">{business.hours?.map((hour) => <div key={hour.day} className="flex justify-between gap-4 py-1.5 text-xs"><span className="text-[#725955]">{hour.day}</span><span className="font-semibold text-[#4a3030]">{hour.value}</span></div>)}</div>}</aside></div></section>

      <footer className="bg-[#322426] px-5 py-10 text-[#f4d9cd] sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm sm:flex-row sm:items-center"><p className="font-serif text-xl text-white">{business.name}</p><div className="flex flex-wrap gap-x-5 gap-y-2 text-xs"><a href={business.tel} className="hover:text-white">{business.phone}</a>{business.area && <span>{business.area}</span>}</div></div></footer>
    </main>
  );
}
