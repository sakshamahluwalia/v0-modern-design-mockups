"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Phone, Mail, MapPin, Calculator, FileText, Shield, Users, Star, ArrowRight } from "lucide-react"

// Design 1: Clean & Professional (Green/White)
function Design1() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-emerald-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-semibold text-xl text-emerald-900">ALOE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-emerald-800">
          <a href="#" className="hover:text-emerald-600 transition">Services</a>
          <a href="#" className="hover:text-emerald-600 transition">About</a>
          <a href="#" className="hover:text-emerald-600 transition">Contact</a>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get a Quote</Button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm mb-6">
              <Check className="w-4 h-4" />
              Licensed CPA Firm in Brampton
            </div>
            <h1 className="text-5xl font-bold text-emerald-950 leading-tight mb-6">
              Expert Accounting for{" "}
              <span className="text-emerald-600">Growing Businesses</span>
            </h1>
            <p className="text-lg text-emerald-800/70 mb-8 leading-relaxed">
              From bookkeeping to tax planning, we provide tailored CPA services that 
              empower your business growth. Focus on what you love — we&apos;ll handle the numbers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                Schedule Consultation <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Our Services
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl p-8 relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calculator, label: "Bookkeeping" },
                  { icon: FileText, label: "Tax Returns" },
                  { icon: Shield, label: "Assurance" },
                  { icon: Users, label: "Payroll" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <item.icon className="w-8 h-8 text-emerald-600 mb-3" />
                    <p className="font-medium text-emerald-900">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-600 text-white py-12 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">500+</div>
            <div className="text-emerald-100">Clients Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold">15+</div>
            <div className="text-emerald-100">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold">100%</div>
            <div className="text-emerald-100">Client Satisfaction</div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Design 2: Modern Dark Premium
function Design2() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg" />
          <span className="font-semibold text-xl text-white tracking-tight">ALOE</span>
          <span className="text-slate-500 text-sm">Accounting & Tax</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-400">
          <a href="#" className="hover:text-white transition">Services</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Testimonials</a>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium">Contact Us</Button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm mb-8">
          <Star className="w-4 h-4 text-teal-400" />
          Trusted by 500+ businesses across the GTA
        </div>
        <h1 className="text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Your finances deserve{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            expert care
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Full-service chartered professional accountant firm delivering tailored 
          solutions for entrepreneurs and small businesses.
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium gap-2 px-8">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
            View Services
          </Button>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { title: "Accounting & Payroll", desc: "Full-cycle bookkeeping, payroll processing, year-end entries" },
            { title: "Tax Services", desc: "Corporate structuring, tax returns, T4/T5 filing" },
            { title: "Assurance", desc: "Specialized audits, financial statement reviews" },
          ].map((service) => (
            <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-teal-500/50 transition group">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition">
                <Calculator className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Design 3: Soft & Approachable
function Design3() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-green-700" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 4C16 4 8 8 8 16C8 24 16 28 16 28C16 28 24 24 24 16C24 8 16 4 16 4Z" opacity="0.3"/>
            <path d="M16 6C16 6 10 9 10 16C10 23 16 26 16 26C16 26 22 23 22 16C22 9 16 6 16 6Z"/>
          </svg>
          <span className="font-semibold text-xl text-stone-800">ALOE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-stone-600">
          <a href="#" className="hover:text-green-700 transition">Services</a>
          <a href="#" className="hover:text-green-700 transition">About Khushpreet</a>
          <a href="#" className="hover:text-green-700 transition">Reviews</a>
        </div>
        <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
          Book a Call
        </Button>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-700 font-medium mb-4">Brampton&apos;s Trusted CPA</p>
            <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-6">
              We handle your books, so you can grow your business
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Personalized accounting and tax services tailored to your unique business needs. 
              From retail to professional services, we&apos;ve got you covered.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white rounded-full gap-2 px-8">
                Get Your Free Quote <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(905) 555-ALOE</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Brampton, ON</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="font-semibold text-stone-900">What our clients say</h3>
              </div>
              <blockquote className="text-stone-600 italic text-center mb-4">
                &ldquo;Khushpreet made my first year filing taxes as a small business owner seamless. 
                Highly recommend!&rdquo;
              </blockquote>
              <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-center text-sm text-stone-500 mt-2">— Haley N.</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Quality", "Integrity", "Collaboration", "Efficiency"].map((value) => (
            <div key={value} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="font-medium text-stone-800">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Main Page with Design Switcher
export default function Page() {
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

      {/* Designs */}
      {activeDesign === 1 && <Design1 />}
      {activeDesign === 2 && <Design2 />}
      {activeDesign === 3 && <Design3 />}
    </div>
  )
}
