import { useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  X,
} from 'lucide-react'
import type { SiteConfig } from '@/lib/site-config'

// businessType (professional) + id (lawyer-hartwell) come from the folder path.
export const meta = { industry: 'lawyer', label: 'Litigation & trial law', accent: '#b99661' }

export const sampleConfig: SiteConfig = {
  business: {
    name: 'Hartwell & Pierce', category: 'Trial Attorneys', phone: '(212) 555-0184', tel: 'tel:+12125550184',
    address: '445 Park Avenue, 18th Floor, New York, NY 10022', mapsUrl: 'https://maps.google.com', area: 'New York & New Jersey', rating: 5, reviewCount: 48,
    hours: [{ day: 'Monday — Friday', value: '8:30 am — 6:00 pm' }, { day: 'Saturday', value: 'By appointment' }, { day: 'Sunday', value: 'Closed' }],
  },
  copy: {
    heroHeadline: 'Clear counsel for complex moments.',
    heroSub: 'When the stakes are high, experience matters. We help people and organizations move forward with precision, resolve, and a steady hand.',
    about: 'For more than two decades, Hartwell & Pierce has represented clients through the moments that matter most. Our practice is built on preparation, direct communication, and the conviction that every client deserves a thoughtful, rigorous advocate.',
    services: [
      { title: 'Commercial Litigation', desc: 'Strategic representation for high-value business disputes, partnership matters, and contractual claims.' },
      { title: 'White Collar Defense', desc: 'Discreet, proactive counsel for investigations, enforcement actions, and regulatory risk.' },
      { title: 'Employment Disputes', desc: 'Protecting executives, employers, and teams through sensitive workplace matters.' },
      { title: 'Internal Investigations', desc: 'Independent fact-finding and practical guidance for organizations facing uncertainty.' },
      { title: 'Appeals', desc: 'Persuasive appellate advocacy grounded in a deep command of the record and the law.' },
      { title: 'Crisis Advisory', desc: 'Immediate, clear-eyed counsel when an emerging issue requires a measured response.' },
    ],
    faq: [
      { q: 'What should I bring to an initial consultation?', a: 'Bring any documents that help explain the situation, including agreements, notices, correspondence, or court papers. A simple timeline of key events is also useful.' },
      { q: 'How do you determine whether to take a case?', a: 'We begin with a focused conversation about your objectives, the facts, and the relevant law. If we are not the right fit, we will be candid and help point you toward an appropriate resource.' },
      { q: 'Do you offer remote consultations?', a: 'Yes. Initial consultations can be held by secure video conference or telephone, depending on your preference and the needs of your matter.' },
    ],
  },
  reviews: [
    { author: 'Managing Partner, Financial Services Firm', rating: 5, text: 'They brought calm and clarity to an incredibly difficult situation. We always knew where things stood and what came next.', relativeTime: '2 months ago' },
    { author: 'Former Executive', rating: 5, text: 'Exceptional preparation, honest advice, and a level of personal attention I did not expect from a firm of this caliber.', relativeTime: '5 months ago' },
    { author: 'General Counsel, Technology Company', rating: 5, text: 'A trusted partner when the pressure was on. Their judgment and responsiveness made all the difference.', relativeTime: '1 year ago' },
  ],
  gallery: [{ caption: 'Commercial dispute resolved before trial' }, { caption: 'Regulatory investigation concluded without charges' }, { caption: 'Appellate victory preserving client rights' }],
  booking: { enabled: true, label: 'Book a consultation', url: 'https://bookme-web.onrender.com/' },
  primaryCta: { label: 'Book a consultation', href: '#consultation' },
}

function Stars({ count = 5 }: { count?: number }) {
  return <span className="flex gap-1 text-[#b99661]" aria-label={`${count} out of 5 stars`}>{Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}</span>
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="mb-12 max-w-2xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#a9824d]">{eyebrow}</p><h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-[#13263d] sm:text-5xl">{title}</h2>{children && <p className="mt-5 text-base leading-7 text-[#667487]">{children}</p>}</div>
}

export default function SiteTemplate({ config: site = sampleConfig }: { config?: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(site.copy.services[0]?.title ?? '')
  const [selectedDay, setSelectedDay] = useState('Tue, Oct 22')
  const [selectedTime, setSelectedTime] = useState('10:30 AM')
  const initials = site.business.name.charAt(0)
  const nav = [['Practice', '#practice'], ['Results', '#results'], ['About', '#about'], ['Insights', '#insights']] as const

  return <main className="min-h-screen bg-[#f7f8fa] text-[#13263d]">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10243b]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" aria-label={`${site.business.name} home`}><span className="grid size-10 place-items-center rounded-full border border-[#b99661]/60 font-serif text-xl text-[#d9bd8a]">{initials}</span><span className="hidden text-sm font-medium tracking-[0.14em] sm:block">{site.business.name.toUpperCase()}</span></a>
        <div className="flex items-center gap-3"><a href={site.business.tel} className="hidden items-center gap-2 text-sm text-slate-300 md:flex"><Phone className="size-4" />{site.business.phone}</a><a href={site.primaryCta?.href ?? '#consultation'} className="rounded-full bg-[#b99661] px-5 py-2.5 text-sm font-semibold text-[#10243b] transition-colors hover:bg-[#d3b77f]">{site.primaryCta?.label}</a><button className="grid size-10 place-items-center lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div>
      {menuOpen && <nav className="flex flex-col gap-1 border-t border-white/10 px-5 py-4 lg:hidden" aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5">{label}</a>)}</nav>}
    </header>

    <section id="top" className="relative overflow-hidden bg-[#10243b] text-white"><div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #b99661 0, transparent 30%), linear-gradient(120deg, transparent 60%, #274764 60%)' }} /><div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-32"><div><div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9bd8a]"><span className="h-px w-10 bg-[#b99661]" />{site.business.category}</div><h1 className="max-w-3xl font-serif text-[clamp(3.1rem,7vw,6.3rem)] leading-[.94] tracking-[-0.055em]">{site.copy.heroHeadline}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">{site.copy.heroSub}</p><div className="mt-10 flex flex-wrap items-center gap-4"><a href={site.primaryCta?.href ?? '#consultation'} className="inline-flex items-center gap-3 rounded-full bg-[#b99661] px-6 py-3.5 text-sm font-semibold text-[#10243b] hover:bg-[#d3b77f]">{site.primaryCta?.label}<ArrowUpRight className="size-4" /></a><a href="#practice" className="text-sm font-medium text-slate-300 underline decoration-white/30 underline-offset-8 hover:text-white">Explore our practice</a></div></div><div className="relative mx-auto w-full max-w-md lg:justify-self-end"><div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#203c57] shadow-2xl shadow-black/20"><div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.12),transparent_38%),linear-gradient(15deg,transparent_52%,rgba(185,150,97,.65)_52%,rgba(185,150,97,.65)_53%,transparent_53%)]" /><div className="absolute bottom-8 left-8 right-8 border-l-2 border-[#d9bd8a] pl-5"><p className="font-serif text-2xl leading-tight text-white">Measured counsel.<br />Meaningful results.</p></div></div><div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-5 text-[#13263d] shadow-xl"><div className="mb-2 flex items-center gap-3"><ShieldCheck className="size-5 text-[#a9824d]" /><span className="text-xs font-semibold uppercase tracking-widest">Established</span></div><p className="font-serif text-3xl">2002</p></div></div></div></section>

    <section className="border-b border-[#dfe4ea] bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-12"><div className="flex items-center gap-4"><Stars count={5} /><div><p className="text-sm font-semibold">{site.business.rating?.toFixed(1)} client rating</p><p className="text-xs text-[#788594]">Based on {site.business.reviewCount} reviews</p></div></div><div className="flex items-center gap-4 border-[#dfe4ea] md:border-l md:pl-8"><Scale className="size-7 text-[#a9824d]" /><div><p className="text-sm font-semibold">Trusted representation</p><p className="text-xs text-[#788594]">Serving {site.business.area}</p></div></div><div className="flex items-center gap-4 border-[#dfe4ea] md:border-l md:pl-8"><Clock3 className="size-7 text-[#a9824d]" /><div><p className="text-sm font-semibold">Responsive by design</p><p className="text-xs text-[#788594]">Calls returned within one business day</p></div></div></div></section>

    <section id="practice" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12"><SectionIntro eyebrow="Our practice" title="Focused expertise. Full commitment." children="We take on matters where thoughtful strategy and seasoned advocacy can make a real difference." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{site.copy.services.map((service, index) => <article key={service.title} className="group rounded-2xl border border-[#dfe4ea] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#b99661] hover:shadow-xl hover:shadow-[#13263d]/5"><div className="mb-12 flex items-start justify-between"><span className="font-serif text-3xl text-[#c9d0d8]">0{index + 1}</span><ArrowUpRight className="size-5 text-[#b99661] opacity-0 transition-opacity group-hover:opacity-100" /></div><h3 className="font-serif text-2xl text-[#13263d]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#718092]">{service.desc}</p></article>)}</div></section>

    <section id="results" className="bg-[#edf1f4]"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12"><SectionIntro eyebrow="Selected results" title="Work that speaks for itself." /><div className="grid gap-4 lg:grid-cols-3">{site.gallery?.map((item, index) => <article key={item.caption} className="group relative min-h-72 overflow-hidden rounded-2xl bg-[#18334d] p-7 text-white"><div className="absolute inset-0 opacity-70 transition-transform duration-500 group-hover:scale-105" style={{ background: `linear-gradient(${120 + index * 25}deg, #18334d 10%, ${index === 1 ? '#526979' : '#2b5366'} 50%, #b99661 180%)` }} /><div className="relative flex h-full flex-col justify-between"><span className="text-xs uppercase tracking-[0.2em] text-[#d9bd8a]">Case result / 0{index + 1}</span><h3 className="max-w-xs font-serif text-3xl leading-tight">{item.caption}</h3></div></article>)}</div></div></section>

    <section id="about" className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-32"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a9824d]">The firm</p><p className="mt-5 font-serif text-4xl leading-tight text-[#13263d]">A steady hand when it matters most.</p></div><div><p className="max-w-2xl text-xl leading-9 text-[#506174]">{site.copy.about}</p><div className="mt-10 grid grid-cols-2 gap-8 border-t border-[#dfe4ea] pt-8 sm:grid-cols-3"><div><p className="font-serif text-4xl text-[#13263d]">24</p><p className="mt-1 text-xs uppercase tracking-wider text-[#788594]">Years of practice</p></div><div><p className="font-serif text-4xl text-[#13263d]">98%</p><p className="mt-1 text-xs uppercase tracking-wider text-[#788594]">Matters resolved</p></div><div><p className="font-serif text-4xl text-[#13263d]">12</p><p className="mt-1 text-xs uppercase tracking-wider text-[#788594]">Jurisdictions</p></div></div></div></section>

    <section id="insights" className="bg-[#10243b] text-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><SectionIntro eyebrow="Client perspective" title="What clients say." /><a href="#consultation" className="mb-12 text-sm text-[#d9bd8a] underline underline-offset-8">Start a conversation</a></div><div className="grid gap-5 lg:grid-cols-3">{site.reviews.map((review) => <blockquote key={review.author} className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><Stars count={review.rating} /><p className="mt-6 min-h-28 text-lg leading-8 text-slate-200">“{review.text}”</p><footer className="mt-8 border-t border-white/10 pt-5"><p className="text-sm font-semibold">{review.author}</p><p className="mt-1 text-xs text-slate-400">{review.relativeTime}</p></footer></blockquote>)}</div></div></section>

    {site.booking?.enabled && <section id="consultation" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12"><div><SectionIntro eyebrow="Next step" title="Let’s talk about what’s ahead." children="Tell us a little about your situation and choose a time that works for an initial conversation." /><div className="flex items-center gap-3 text-sm text-[#667487]"><CalendarDays className="size-5 text-[#a9824d]" /> Consultations available in person or remotely</div></div><div className="rounded-3xl border border-[#dfe4ea] bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between border-b border-[#edf0f2] pb-5"><div><p className="font-serif text-2xl">Request a consultation</p><p className="mt-1 text-sm text-[#788594]">Choose a preferred time below</p></div><span className="rounded-full bg-[#edf1f4] px-3 py-1 text-xs font-semibold text-[#506174]">Step 1 of 1</span></div><div className="mt-7 flex flex-col gap-6"><label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-[#788594]">Matter type<select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="rounded-xl border border-[#dfe4ea] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-[#13263d] outline-none focus:border-[#a9824d]">{site.copy.services.map((s) => <option key={s.title}>{s.title}</option>)}</select></label><div><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#788594]">Preferred day</p><div className="grid grid-cols-3 gap-2">{['Mon, Oct 21', 'Tue, Oct 22', 'Wed, Oct 23'].map((day) => <button key={day} onClick={() => setSelectedDay(day)} className={`rounded-xl border px-2 py-3 text-xs transition-colors ${selectedDay === day ? 'border-[#a9824d] bg-[#fbf7ef] text-[#8b6a3f]' : 'border-[#dfe4ea] text-[#667487] hover:border-[#b99661]'}`}>{day}</button>)}</div></div><div><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#788594]">Preferred time</p><div className="grid grid-cols-3 gap-2">{['9:00 AM', '10:30 AM', '2:00 PM'].map((time) => <button key={time} onClick={() => setSelectedTime(time)} className={`rounded-xl border px-2 py-3 text-xs transition-colors ${selectedTime === time ? 'border-[#a9824d] bg-[#fbf7ef] text-[#8b6a3f]' : 'border-[#dfe4ea] text-[#667487] hover:border-[#b99661]'}`}>{time}</button>)}</div></div><a href={site.booking.url} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10243b] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1b3854]">Continue with {selectedDay} at {selectedTime}<ArrowUpRight className="size-4" /></a><p className="text-center text-xs text-[#8b97a4]">No commitment required. We’ll confirm the details by phone.</p></div>{/* EXTERNAL_BOOKING_EMBED */}</div></section>}

    <section className="border-t border-[#dfe4ea] bg-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12"><div><SectionIntro eyebrow="Questions" title="Before we begin." /> <div className="flex flex-col">{site.copy.faq.map((faq) => <details key={faq.q} className="group border-t border-[#dfe4ea] py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:content-none">{faq.q}<ChevronDown className="size-5 shrink-0 text-[#a9824d] transition-transform group-open:rotate-180" /></summary><p className="max-w-xl pt-4 text-sm leading-7 text-[#667487]">{faq.a}</p></details>)}</div></div><div className="rounded-3xl bg-[#edf1f4] p-8 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a9824d]">Visit the office</p><h2 className="mt-5 font-serif text-3xl text-[#13263d]">A central place to start.</h2><p className="mt-5 text-sm leading-7 text-[#667487]">{site.business.address}</p><a href={site.business.mapsUrl} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#13263d] underline decoration-[#b99661] underline-offset-8">Get directions <ExternalLink className="size-4" /></a><div className="mt-10 border-t border-[#d5dce3] pt-6"><p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#788594]">Office hours</p>{site.business.hours?.map((hour) => <div key={hour.day} className="flex justify-between gap-4 py-2 text-sm"><span className="text-[#506174]">{hour.day}</span><span className="text-[#13263d]">{hour.value}</span></div>)}</div></div></div></section>

    <footer className="bg-[#10243b] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full border border-[#b99661]/60 font-serif text-lg text-[#d9bd8a]">{initials}</span><div><p className="text-sm font-semibold tracking-wide">{site.business.name}</p><p className="mt-1 text-xs text-slate-400">{site.business.category}</p></div></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400"><a href={site.business.tel} className="hover:text-white">{site.business.phone}</a><span>{site.business.area}</span><span>© {new Date().getFullYear()} {site.business.name}</span></div></div></footer>
  </main>
}
