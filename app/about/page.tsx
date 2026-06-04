"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Award, Target, Heart, Lightbulb, ChevronRight, Star, Users, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

// Design 1: Clean & Professional About
function AboutDesign1() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-emerald-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-xl text-emerald-900">ALOE</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-emerald-800">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link href="/about" className="text-emerald-600 font-medium">About</Link>
          <Link href="/contact" className="hover:text-emerald-600 transition">Contact</Link>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get a Quote</Button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm mb-6">
          <Award className="w-4 h-4" />
          Licensed CPA Firm
        </div>
        <h1 className="text-5xl font-bold text-emerald-950 mb-6">
          About ALOE Accounting
        </h1>
        <p className="text-xl text-emerald-800/70 max-w-2xl mx-auto leading-relaxed">
          We&apos;re a full-service Chartered Professional Accountant firm dedicated to 
          helping businesses thrive through expert financial guidance.
        </p>
      </section>

      {/* Founder Section */}
      <section className="px-8 py-16 bg-emerald-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-200 to-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Users className="w-16 h-16 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 text-center mb-2">Khushpreet Kaur</h3>
            <p className="text-emerald-600 text-center mb-4">CPA, CGA | Founder</p>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-emerald-950 mb-6">Meet Your Accountant</h2>
            <p className="text-emerald-800/70 mb-4 leading-relaxed">
              As a Chartered Professional Accountant with years of experience, Khushpreet founded 
              ALOE Accounting & Tax with a vision to provide personalized, accessible financial 
              services to entrepreneurs and small business owners.
            </p>
            <p className="text-emerald-800/70 mb-6 leading-relaxed">
              Her expertise spans bookkeeping, tax planning, payroll management, and financial 
              assurance, helping clients across retail, food services, professional services, 
              and more.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              Schedule a Meeting <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-emerald-950 text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Quality", desc: "Excellence in every engagement" },
            { icon: Heart, title: "Integrity", desc: "Honest, transparent service" },
            { icon: Users, title: "Collaboration", desc: "Working together for success" },
            { icon: Lightbulb, title: "Efficiency", desc: "Streamlined solutions" },
          ].map((value) => (
            <div key={value.title} className="bg-emerald-50 rounded-2xl p-6 text-center hover:bg-emerald-100 transition">
              <value.icon className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-emerald-900 mb-2">{value.title}</h3>
              <p className="text-sm text-emerald-700/70">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to work together?</h2>
        <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
          Let&apos;s discuss how we can help your business reach its financial goals.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 gap-2">
            Contact Us <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

// Design 2: Modern Dark About
function AboutDesign2() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg" />
          <span className="font-semibold text-xl text-white tracking-tight">ALOE</span>
          <span className="text-slate-500 text-sm">Accounting & Tax</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-slate-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/about" className="text-teal-400 font-medium">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
        <Link href="/contact">
          <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium">Contact Us</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm mb-6">
            <Award className="w-4 h-4 text-teal-400" />
            Chartered Professional Accountants
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            The story behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              ALOE
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Built on expertise, driven by client success
          </p>
        </div>

        {/* Founder Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Users className="w-12 h-12 text-teal-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Khushpreet Kaur</h2>
              <p className="text-teal-400 font-medium mb-4">CPA, CGA | Founder & Principal</p>
              <div className="flex gap-1 justify-center md:justify-start">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-teal-400 text-teal-400" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-300 mb-4 leading-relaxed">
                With extensive experience in public accounting, Khushpreet founded ALOE 
                with a mission to deliver premium financial services with a personal touch.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Her expertise encompasses corporate tax structuring, financial statement 
                preparation, assurance services, and comprehensive business advisory for 
                clients across diverse industries.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", desc: "To empower businesses with expert financial guidance that drives growth and ensures compliance." },
            { icon: BookOpen, title: "Our Approach", desc: "We combine technical expertise with personalized service, treating every client's business as our own." },
            { icon: Award, title: "Our Standards", desc: "Quality, integrity, collaboration, and efficiency form the foundation of everything we do." },
            { icon: Heart, title: "Our Commitment", desc: "Your success is our success. We're invested in helping you achieve your financial goals." },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/50 transition">
              <item.icon className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 text-center border-t border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s work together</h2>
        <p className="text-slate-400 mb-8">Ready to take your finances to the next level?</p>
        <Link href="/contact">
          <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium gap-2">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

// Design 3: Soft & Approachable About
function AboutDesign3() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-green-700" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 4C16 4 8 8 8 16C8 24 16 28 16 28C16 28 24 24 24 16C24 8 16 4 16 4Z" opacity="0.3"/>
            <path d="M16 6C16 6 10 9 10 16C10 23 16 26 16 26C16 26 22 23 22 16C22 9 16 6 16 6Z"/>
          </svg>
          <span className="font-semibold text-xl text-stone-800">ALOE</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-stone-600">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <Link href="/about" className="text-green-700 font-medium">About</Link>
          <Link href="/contact" className="hover:text-green-700 transition">Contact</Link>
        </div>
        <Link href="/contact">
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
            Book a Call
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-12 max-w-4xl mx-auto text-center">
        <p className="text-green-700 font-medium mb-4">About Us</p>
        <h1 className="text-5xl font-bold text-stone-900 mb-6">
          More than accountants — your financial partners
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          At ALOE, we believe in building lasting relationships based on trust, 
          expertise, and genuine care for your success.
        </p>
      </section>

      {/* Founder Feature */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-green-50 p-12 flex flex-col justify-center items-center">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-16 h-16 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">Khushpreet Kaur</h3>
              <p className="text-green-700 font-medium mb-4">CPA, CGA</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="p-12">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">A Personal Message</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                &ldquo;I started ALOE Accounting & Tax because I saw too many small business 
                owners struggling with their finances alone. My goal was simple: provide 
                the same quality of service that large corporations receive, but with the 
                personal touch that small businesses deserve.&rdquo;
              </p>
              <p className="text-stone-600 mb-6 leading-relaxed">
                &ldquo;Whether you&apos;re just starting out or looking to grow, I&apos;m here to 
                help you navigate the numbers so you can focus on what you love.&rdquo;
              </p>
              <p className="text-green-700 font-medium">— Khushpreet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-4">What We Stand For</h2>
          <p className="text-stone-600 text-center mb-12 max-w-xl mx-auto">
            Our values guide every interaction and decision we make.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Quality", desc: "Excellence in every detail of our work" },
              { icon: Heart, title: "Integrity", desc: "Honest advice, always in your interest" },
              { icon: Users, title: "Collaboration", desc: "Your success is our shared goal" },
              { icon: Lightbulb, title: "Efficiency", desc: "Smart solutions that save you time" },
            ].map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{value.title}</h3>
                <p className="text-sm text-stone-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 max-w-4xl mx-auto text-center">
        <div className="bg-green-700 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to chat?</h2>
          <p className="text-green-100 mb-8 max-w-lg mx-auto">
            We&apos;d love to learn about your business and how we can help.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full gap-2 px-8">
              Get in Touch <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Main Page with Design Switcher
export default function AboutPage() {
  const [activeDesign, setActiveDesign] = useState(1)

  return (
    <div className="min-h-screen">
      {/* Design Switcher */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg p-1 flex gap-1">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setActiveDesign(num)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeDesign === num
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Design {num}
          </button>
        ))}
      </div>

      {activeDesign === 1 && <AboutDesign1 />}
      {activeDesign === 2 && <AboutDesign2 />}
      {activeDesign === 3 && <AboutDesign3 />}
    </div>
  )
}
