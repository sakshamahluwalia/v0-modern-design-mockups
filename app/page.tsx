"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Phone, MapPin, Calculator, FileText, Shield, Users, Star, ArrowRight, Mail, Clock, Building, Briefcase, Receipt, PiggyBank } from "lucide-react"
import Link from "next/link"

// Design 1: Clean & Professional (Green/White)
function Design1() {
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
          <Link href="/" className="text-emerald-600 font-medium">Home</Link>
          <Link href="/about" className="hover:text-emerald-600 transition">About</Link>
          <Link href="/contact" className="hover:text-emerald-600 transition">Contact</Link>
        </div>
        <Link href="/contact">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get a Quote</Button>
        </Link>
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
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                  Schedule Consultation <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
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

      {/* Services */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-950 mb-4">Our Services</h2>
          <p className="text-emerald-700/70 max-w-2xl mx-auto">Comprehensive accounting solutions tailored to help your business thrive</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Calculator, title: "Accounting & Bookkeeping", desc: "Full-cycle bookkeeping, monthly financial statements, year-end entries, and account reconciliations." },
            { icon: Receipt, title: "Corporate Tax", desc: "Tax planning, corporate structuring, T2 returns, HST filing, and strategic tax optimization." },
            { icon: Users, title: "Payroll Services", desc: "Complete payroll processing, T4/T5 preparation, ROE filing, and CRA remittances." },
            { icon: Shield, title: "Assurance Services", desc: "Review engagements, compilation engagements, and specialized audit services." },
            { icon: FileText, title: "Personal Tax", desc: "T1 personal returns, rental income reporting, self-employment income, and tax credits optimization." },
            { icon: Briefcase, title: "Business Advisory", desc: "Business incorporation, financial planning, cash flow management, and growth strategies." },
          ].map((service) => (
            <div key={service.title} className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">{service.title}</h3>
              <p className="text-emerald-700/70 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-emerald-950 text-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose ALOE?</h2>
              <p className="text-emerald-200 mb-8 leading-relaxed">
                We believe in building lasting relationships with our clients through quality service, 
                integrity, and collaborative solutions that drive real results.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized attention for every client",
                  "Deep expertise in small business accounting",
                  "Proactive tax planning strategies",
                  "Quick response times and clear communication",
                  "Competitive and transparent pricing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-emerald-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-900 rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Industries We Serve</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Retail & E-commerce", "Professional Services", "Real Estate", "Healthcare", "Construction", "Restaurants"].map((industry) => (
                  <div key={industry} className="bg-emerald-800/50 rounded-xl px-4 py-3 text-sm text-emerald-100">
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-950 mb-4">What Our Clients Say</h2>
          <p className="text-emerald-700/70">Real feedback from real businesses we&apos;ve helped grow</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Haley N.", text: "Khushpreet made my first year filing taxes as a small business owner seamless. Highly recommend!" },
            { name: "Mandeep S.", text: "ALOE helped us restructure our business and saved us thousands in taxes. Professional and knowledgeable team." },
            { name: "Priya K.", text: "Finally found an accountant who actually takes time to explain things. Their payroll service is flawless." },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-emerald-800/80 mb-4 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
              <p className="font-medium text-emerald-900">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-950 mb-4">Ready to Get Started?</h2>
          <p className="text-emerald-700/70 mb-8">Schedule a free consultation and let&apos;s discuss how we can help your business thrive.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-8">
              Book Your Free Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 px-8 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-semibold text-white">ALOE</span>
            </div>
            <p className="text-sm text-emerald-300/70">Your full service Chartered Professional Accountant Firm in Brampton.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Bookkeeping</li>
              <li>Tax Services</li>
              <li>Payroll</li>
              <li>Assurance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Brampton, Ontario</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@aloeaccounting.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (905) 555-ALOE</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-emerald-800 text-center text-sm text-emerald-400">
          © 2024 ALOE Accounting & Tax. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

// Design 2: Modern Dark Premium
function Design2() {
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
          <Link href="/" className="text-teal-400 font-medium">Home</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
        <Link href="/contact">
          <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium">Contact Us</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm mb-8">
          <Star className="w-4 h-4 text-teal-400" />
          Trusted by 500+ businesses across the GTA
        </div>
        <h1 className="text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto text-balance">
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
          <Link href="/contact">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium gap-2 px-8">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
            View Services
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {[
            { value: "500+", label: "Clients" },
            { value: "15+", label: "Years" },
            { value: "$2M+", label: "Tax Saved" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-teal-400 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-8 py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Comprehensive Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to keep your finances in order and your business growing</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Calculator, title: "Accounting & Bookkeeping", desc: "Full-cycle bookkeeping, monthly financial statements, year-end entries, and account reconciliations.", features: ["Monthly statements", "Bank reconciliation", "Year-end entries"] },
              { icon: Receipt, title: "Tax Services", desc: "Strategic tax planning, corporate structuring, T2 returns, HST filing, and optimization.", features: ["Corporate tax", "Personal tax", "HST filing"] },
              { icon: Users, title: "Payroll Solutions", desc: "Complete payroll processing, T4/T5 preparation, ROE filing, and CRA remittances.", features: ["Payroll processing", "T4/T5 prep", "CRA remittances"] },
              { icon: Shield, title: "Assurance Services", desc: "Review engagements, compilation engagements, and specialized audit services.", features: ["Review engagements", "Compilations", "Audit services"] },
              { icon: Building, title: "Business Advisory", desc: "Business incorporation, financial planning, cash flow management, and growth strategies.", features: ["Incorporation", "Financial planning", "Growth strategy"] },
              { icon: PiggyBank, title: "Financial Planning", desc: "Retirement planning, investment strategies, and wealth management guidance.", features: ["Retirement planning", "Investments", "Wealth management"] },
            ].map((service) => (
              <div key={service.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/50 transition group">
                <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition">
                  <service.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                      <Check className="w-4 h-4 text-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-8 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why businesses choose ALOE</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We combine deep expertise with personalized service to deliver accounting solutions 
                that actually move the needle for your business.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Dedicated CPA Team", desc: "Work directly with experienced professionals, not junior staff" },
                  { title: "Proactive Tax Strategy", desc: "We find savings before tax season, not after" },
                  { title: "Industry Expertise", desc: "Specialized knowledge in retail, healthcare, real estate & more" },
                  { title: "Clear Communication", desc: "No jargon, just straightforward advice you can act on" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Retail & E-commerce", "Professional Services", "Real Estate", "Healthcare", "Construction", "Restaurants", "Tech Startups", "Non-Profits"].map((industry) => (
                <div key={industry} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 text-center text-sm text-slate-300 hover:border-teal-500/50 transition">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Client Success Stories</h2>
            <p className="text-slate-400">See what business owners are saying about working with us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Haley N.", role: "Small Business Owner", text: "Khushpreet made my first year filing taxes as a small business owner seamless. The attention to detail and proactive advice saved me thousands." },
              { name: "Mandeep S.", role: "Restaurant Owner", text: "ALOE helped us restructure our business and optimized our tax strategy. Their industry knowledge is unmatched." },
              { name: "Priya K.", role: "Healthcare Professional", text: "Finally found an accountant who actually takes time to explain things. Their payroll service runs flawlessly month after month." },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to optimize your finances?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">Schedule a free consultation and discover how ALOE can help your business save money and grow smarter.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium gap-2 px-8">
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg" />
              <span className="font-semibold text-white">ALOE</span>
            </div>
            <p className="text-sm text-slate-500">Your full service Chartered Professional Accountant Firm in Brampton, Ontario.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-white transition cursor-pointer">Bookkeeping</li>
              <li className="hover:text-white transition cursor-pointer">Tax Services</li>
              <li className="hover:text-white transition cursor-pointer">Payroll</li>
              <li className="hover:text-white transition cursor-pointer">Assurance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-500" /> Brampton, Ontario</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-teal-500" /> info@aloeaccounting.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-teal-500" /> (905) 555-ALOE</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2024 ALOE Accounting & Tax. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

// Design 3: Soft & Approachable
function Design3() {
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
          <Link href="/" className="text-green-700 font-medium">Home</Link>
          <Link href="/about" className="hover:text-green-700 transition">About</Link>
          <Link href="/contact" className="hover:text-green-700 transition">Contact</Link>
        </div>
        <Link href="/contact">
          <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
            Book a Call
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-700 font-medium mb-4">Brampton&apos;s Trusted CPA</p>
            <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-6 text-balance">
              We handle your books, so you can grow your business
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Personalized accounting and tax services tailored to your unique business needs. 
              From retail to professional services, we&apos;ve got you covered.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white rounded-full gap-2 px-8">
                  Get Your Free Quote <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
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
      </section>

      {/* Values */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, value: "Quality" },
            { icon: Users, value: "Integrity" },
            { icon: Briefcase, value: "Collaboration" },
            { icon: Clock, value: "Efficiency" },
          ].map((item) => (
            <div key={item.value} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <item.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="font-medium text-stone-800">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">How We Can Help</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Comprehensive accounting solutions designed with your success in mind</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calculator, title: "Bookkeeping", desc: "Stay organized with full-cycle bookkeeping, monthly statements, and year-end entries. We keep your books clean so you can focus on business." },
              { icon: Receipt, title: "Tax Services", desc: "From corporate tax planning to personal returns, we optimize your tax strategy and ensure compliance with all CRA requirements." },
              { icon: Users, title: "Payroll", desc: "Complete payroll processing including T4/T5 prep, ROE filing, and CRA remittances. Your team gets paid on time, every time." },
              { icon: Shield, title: "Assurance", desc: "Professional review and compilation engagements, audit services, and financial statement preparation you can trust." },
              { icon: Briefcase, title: "Business Advisory", desc: "From incorporation to growth strategy, we provide guidance to help your business reach its full potential." },
              { icon: FileText, title: "Personal Tax", desc: "Maximize your refund with expert T1 preparation, rental income reporting, and tax credit optimization." },
            ].map((service) => (
              <div key={service.title} className="group">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition">
                  <service.icon className="w-7 h-7 text-green-700 group-hover:text-white transition" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-green-700 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-4">Meet Khushpreet Maan, CPA</h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              With over 15 years of experience in public accounting, Khushpreet founded ALOE with a 
              simple mission: provide personalized, high-quality accounting services to help small 
              businesses thrive.
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 rounded-full">
                Learn More About Us
              </Button>
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Why Choose ALOE?</h2>
            <div className="space-y-4">
              {[
                "Personalized service tailored to your business",
                "Proactive tax planning that saves you money",
                "Clear, jargon-free communication",
                "Quick response times and availability",
                "Deep expertise across multiple industries",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-700" />
                  </div>
                  <span className="text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-stone-100 px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Industries We Serve</h2>
            <p className="text-stone-600">Specialized knowledge to meet your unique needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Retail & E-commerce", "Professional Services", "Real Estate", "Healthcare", "Construction", "Restaurants", "Tech Startups", "Non-Profits"].map((industry) => (
              <div key={industry} className="bg-white rounded-xl px-6 py-4 text-center text-stone-700 shadow-sm hover:shadow-md transition">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Happy Clients</h2>
          <p className="text-stone-600">Real feedback from businesses we&apos;ve helped grow</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Haley N.", role: "Small Business Owner", text: "Khushpreet made my first year filing taxes as a small business owner seamless. The attention to detail and proactive advice saved me thousands." },
            { name: "Mandeep S.", role: "Restaurant Owner", text: "ALOE helped us restructure our business and optimized our tax strategy. Their industry knowledge is unmatched." },
            { name: "Priya K.", role: "Healthcare Professional", text: "Finally found an accountant who actually takes time to explain things. Their payroll service runs flawlessly month after month." },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
              <div>
                <p className="font-medium text-stone-900">{testimonial.name}</p>
                <p className="text-sm text-stone-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 bg-green-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify your finances?</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">Book a free consultation and let&apos;s discuss how ALOE can help your business grow.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full gap-2 px-8">
              Book Your Free Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 px-8 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-8 h-8 text-green-500" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 4C16 4 8 8 8 16C8 24 16 28 16 28C16 28 24 24 24 16C24 8 16 4 16 4Z" opacity="0.3"/>
                <path d="M16 6C16 6 10 9 10 16C10 23 16 26 16 26C16 26 22 23 22 16C22 9 16 6 16 6Z"/>
              </svg>
              <span className="font-semibold text-white">ALOE</span>
            </div>
            <p className="text-sm text-stone-400">Your full service Chartered Professional Accountant Firm in Brampton, Ontario.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="hover:text-white transition cursor-pointer">Bookkeeping</li>
              <li className="hover:text-white transition cursor-pointer">Tax Services</li>
              <li className="hover:text-white transition cursor-pointer">Payroll</li>
              <li className="hover:text-white transition cursor-pointer">Assurance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-500" /> Brampton, Ontario</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-500" /> info@aloeaccounting.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-500" /> (905) 555-ALOE</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
          © 2024 ALOE Accounting & Tax. All rights reserved.
        </div>
      </footer>
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
