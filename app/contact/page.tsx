"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"

// Design 1: Clean & Professional Contact
function ContactDesign1() {
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
          <Link href="/about" className="hover:text-emerald-600 transition">About</Link>
          <Link href="/contact" className="text-emerald-600 font-medium">Contact</Link>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get a Quote</Button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-16 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-emerald-950 mb-6">Get in Touch</h1>
        <p className="text-xl text-emerald-800/70 max-w-xl mx-auto">
          Ready to take control of your finances? We&apos;re here to help.
        </p>
      </section>

      {/* Contact Content */}
      <section className="px-8 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Phone</p>
                  <p className="text-emerald-700/70">(905) 555-ALOE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Email</p>
                  <p className="text-emerald-700/70">info@aloeaccountingandtax.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Location</p>
                  <p className="text-emerald-700/70">Brampton, Ontario</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">Business Hours</p>
                  <p className="text-emerald-700/70">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p className="text-emerald-700/70">Weekends: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-emerald-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-emerald-950 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder="(905) 555-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

// Design 2: Modern Dark Contact
function ContactDesign2() {
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
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="text-teal-400 font-medium">Contact</Link>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium">Contact Us</Button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm mb-6">
          <MessageSquare className="w-4 h-4 text-teal-400" />
          We respond within 24 hours
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">
          Let&apos;s{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            connect
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-xl mx-auto">
          Have questions? Ready to get started? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact Grid */}
      <section className="px-8 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, label: "Call Us", value: "(905) 555-ALOE", action: "tel:+19055552563" },
            { icon: Mail, label: "Email Us", value: "info@aloeaccounting.com", action: "mailto:info@aloeaccountingandtax.com" },
            { icon: MapPin, label: "Visit Us", value: "Brampton, Ontario", action: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.action}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/50 transition group"
            >
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition">
                <item.icon className="w-6 h-6 text-teal-400" />
              </div>
              <p className="text-sm text-slate-500 mb-1">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                placeholder="(905) 555-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Service Needed</label>
              <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition">
                <option value="">Select a service</option>
                <option value="bookkeeping">Bookkeeping</option>
                <option value="tax">Tax Services</option>
                <option value="payroll">Payroll</option>
                <option value="assurance">Assurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition resize-none"
                placeholder="Tell us about your business and what you need help with..."
              />
            </div>
            <div className="md:col-span-2">
              <Button size="lg" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium gap-2">
                Send Message <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Hours */}
      <section className="px-8 py-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-slate-500 text-sm mb-1">Monday - Friday</p>
            <p className="text-white font-medium">9:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm mb-1">Weekends</p>
            <p className="text-white font-medium">By Appointment</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm mb-1">Response Time</p>
            <p className="text-teal-400 font-medium">Within 24 Hours</p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Design 3: Soft & Approachable Contact
function ContactDesign3() {
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
          <Link href="/about" className="hover:text-green-700 transition">About</Link>
          <Link href="/contact" className="text-green-700 font-medium">Contact</Link>
        </div>
        <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
          Book a Call
        </Button>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-16 pb-8 max-w-4xl mx-auto text-center">
        <p className="text-green-700 font-medium mb-4">Contact Us</p>
        <h1 className="text-5xl font-bold text-stone-900 mb-6">
          We&apos;d love to hear from you
        </h1>
        <p className="text-lg text-stone-600 max-w-xl mx-auto">
          Whether you have a question, need a quote, or just want to chat about your 
          business, we&apos;re here for you.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="px-8 py-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <a href="tel:+19055552563" className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-green-700" />
            </div>
            <p className="font-medium text-stone-900 mb-1">Call Us</p>
            <p className="text-stone-600 text-sm">(905) 555-ALOE</p>
          </a>
          <a href="mailto:info@aloeaccountingandtax.com" className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-700" />
            </div>
            <p className="font-medium text-stone-900 mb-1">Email Us</p>
            <p className="text-stone-600 text-sm">info@aloeaccounting.com</p>
          </a>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <p className="font-medium text-stone-900 mb-1">Visit Us</p>
            <p className="text-stone-600 text-sm">Brampton, Ontario</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-8 pb-20 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Send a Message</h2>
              <p className="text-stone-600 mb-6">
                Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-600">
                  <Clock className="w-5 h-5 text-green-700" />
                  <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Clock className="w-5 h-5 text-green-700" />
                  <span>Weekends: By Appointment</span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition bg-stone-50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition bg-stone-50"
                  placeholder="Your email"
                />
              </div>
              <div>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition bg-stone-50"
                  placeholder="Phone number (optional)"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition resize-none bg-stone-50"
                  placeholder="How can we help you?"
                />
              </div>
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full gap-2">
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8 px-8 text-center">
        <p className="text-green-100">
          ALOE Accounting & Tax | Brampton, Ontario | &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

// Main Page with Design Switcher
export default function ContactPage() {
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

      {activeDesign === 1 && <ContactDesign1 />}
      {activeDesign === 2 && <ContactDesign2 />}
      {activeDesign === 3 && <ContactDesign3 />}
    </div>
  )
}
