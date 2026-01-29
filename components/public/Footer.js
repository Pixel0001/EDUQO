'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// SVG Icons
const Icons = {
  Heart: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  Send: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Sparkle: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
    </svg>
  ),
  Arrow: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
    </svg>
  ),
}

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  const quickLinks = [
    { name: 'Acasă', href: '/', color: '#4CD0DC' },
    { name: 'Despre noi', href: '#despre', color: '#FCD700' },
    { name: 'Cursuri', href: '#cursuri', color: '#2BA84C' },
    { name: 'Recenzii', href: '#recenzii', color: '#FC0168' },
    { name: 'FAQ', href: '#faq', color: '#0536FC' },
    { name: 'Contact', href: '#contact', color: '#4CD0DC' },
  ]

  const courses = [
    { name: 'Limba Engleză', href: '#cursuri', color: '#4CD0DC' },
    { name: 'Matematică', href: '#cursuri', color: '#0536FC' },
    { name: 'Pictură & Artă', href: '#cursuri', color: '#FC0168' },
    { name: 'Muzică', href: '#cursuri', color: '#FCD700' },
    { name: 'Dans', href: '#cursuri', color: '#2BA84C' },
    { name: 'Abilități sociale', href: '#cursuri', color: '#4CD0DC' },
  ]

  const contactInfo = [
    { icon: Icons.Phone, text: '+373 60 123 456', color: '#4CD0DC' },
    { icon: Icons.Mail, text: 'contact@eduqo.md', color: '#FC0168' },
    { icon: Icons.Location, text: 'Chișinău, Moldova', color: '#2BA84C' },
    { icon: Icons.Clock, text: 'Luni-Vineri: 9:00-18:00', color: '#FCD700' },
  ]

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: '#4CD0DC',
      hoverBg: 'hover:bg-[#4CD0DC]'
    },
    { 
      name: 'Instagram', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: '#FC0168',
      hoverBg: 'hover:bg-[#FC0168]'
    },
    { 
      name: 'YouTube', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: '#FCD700',
      hoverBg: 'hover:bg-[#FCD700]'
    },
    { 
      name: 'TikTok', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: '#2BA84C',
      hoverBg: 'hover:bg-[#2BA84C]'
    },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-[#1E1E42] via-[#1E1E42] to-[#15152F] text-white overflow-hidden"
    >
      {/* Decorative wave top - more playful */}
      <div className="absolute top-0 left-0 right-0">
        <svg className="w-full h-20 text-white" preserveAspectRatio="none" viewBox="0 0 1440 74">
          <path fill="currentColor" d="M0 24L48 26.7C96 29.3 192 34.7 288 42.7C384 50.7 480 61.3 576 58.7C672 56 768 40 864 34.7C960 29.3 1056 34.7 1152 42.7C1248 50.7 1344 61.3 1392 66.7L1440 72V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V24Z"/>
        </svg>
      </div>

      {/* Animated background decorations */}
      <div className="absolute top-40 right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-[#4CD0DC]/20 to-[#0536FC]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-br from-[#FCD700]/15 to-[#FC0168]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="hidden sm:block absolute top-1/2 left-1/3 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-[#2BA84C]/15 to-[#4CD0DC]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Floating decorative shapes - hidden on small screens */}
      <div className="hidden sm:block absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: '4s' }}>
        <div className="w-4 h-4 bg-[#4CD0DC] rounded-full opacity-60" />
      </div>
      <div className="hidden sm:block absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
        <div className="w-3 h-3 bg-[#FCD700] rounded-full opacity-60" />
      </div>
      <div className="hidden md:block absolute bottom-60 left-[25%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        <div className="w-5 h-5 bg-[#FC0168] rounded-full opacity-40" />
      </div>
      <div className="hidden md:block absolute top-[60%] right-[10%] animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-[#2BA84C] rounded-full opacity-50" />
      </div>
      
      {/* Sparkle decorations - hidden on small screens */}
      <div className="hidden sm:block absolute top-36 right-[30%] text-[#FCD700] opacity-40 animate-pulse">
        <Icons.Sparkle />
      </div>
      <div className="hidden sm:block absolute bottom-48 right-[15%] text-[#4CD0DC] opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Icons.Star />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8">
        
        {/* Main Footer Content */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-[#4CD0DC]/30 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo eduquo.png"
                  alt="EDUQO Logo"
                  fill
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                  className="object-contain"
                />
                {/* Decorative ring */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#4CD0DC]/30 to-[#FC0168]/30 rounded-xl sm:rounded-2xl -z-10 blur-sm" />
              </div>
              <span 
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                EDUQO
              </span>
            </div>
            <p 
              className="text-[#94A3B8] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              Educație creativă pentru copii fericiți! Descoperă bucuria învățării prin joc și explorare.
            </p>
            
            {/* Social Links - Enhanced */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 text-white group overflow-hidden`}
                  style={{ 
                    backgroundColor: `${social.color}25`,
                    animationDelay: `${index * 100}ms`
                  }}
                  aria-label={social.name}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: social.color }}
                  />
                  <span className="relative z-10 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#4CD0DC] to-[#0536FC] rounded-lg flex items-center justify-center">
                <span className="[&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4"><Icons.Arrow /></span>
              </div>
              <h4 
                className="text-base sm:text-lg font-bold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: '#FFFFFF' }}
              >
                Linkuri rapide
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#94A3B8] hover:text-white transition-all duration-300 flex items-center gap-2 sm:gap-3 group text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  >
                    <span 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-transform group-hover:scale-150 flex-shrink-0"
                      style={{ backgroundColor: link.color }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses - Enhanced */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#FCD700] to-[#FC0168] rounded-lg flex items-center justify-center">
                <span className="[&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4"><Icons.Star /></span>
              </div>
              <h4 
                className="text-base sm:text-lg font-bold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: '#FFFFFF' }}
              >
                Cursuri populare
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {courses.map((course, index) => (
                <li key={course.name}>
                  <a
                    href={course.href}
                    className="text-[#94A3B8] hover:text-white transition-all duration-300 flex items-center gap-2 sm:gap-3 group text-sm sm:text-base"
                    style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  >
                    <span 
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-transform group-hover:scale-150 flex-shrink-0"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{course.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Enhanced */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] rounded-lg flex items-center justify-center">
                <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5"><Icons.Mail /></span>
              </div>
              <h4 
                className="text-base sm:text-lg font-bold"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: '#FFFFFF' }}
              >
                Newsletter
              </h4>
            </div>
            <p 
              className="text-[#94A3B8] mb-3 sm:mb-4 text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              Abonează-te pentru noutăți și oferte speciale!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 sm:space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-white/10 border-2 border-white/20 rounded-lg sm:rounded-xl text-white placeholder-[#64748B] focus:border-[#4CD0DC] focus:bg-white/15 outline-none transition-all duration-300 text-sm sm:text-base"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                />
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#4CD0DC] opacity-50 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                  <Icons.Mail />
                </div>
              </div>
              <button
                type="submit"
                className="relative w-full py-2.5 sm:py-3.5 bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white font-semibold rounded-lg sm:rounded-xl hover:from-[#3BB8C4] hover:to-[#0429CC] transition-all duration-300 shadow-lg shadow-[#4CD0DC]/30 hover:shadow-[#4CD0DC]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 overflow-hidden group text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                {isSubscribed ? (
                  <>
                    <Icons.Check />
                    <span>Mulțumim!</span>
                  </>
                ) : (
                  <>
                    <Icons.Send />
                    <span>Abonează-te</span>
                  </>
                )}
              </button>
            </form>
            
            {/* Success message */}
            {isSubscribed && (
              <div className="mt-2 sm:mt-3 flex items-center gap-2 text-[#2BA84C] text-xs sm:text-sm animate-pulse">
                <Icons.Check />
                <span style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                  Te-ai abonat cu succes!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div
          className={`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0"
                style={{ backgroundColor: `${info.color}25` }}
              >
                <span style={{ color: info.color }} className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                  <info.icon />
                </span>
              </div>
              <span 
                className="text-[#94A3B8] text-xs sm:text-sm group-hover:text-white transition-colors truncate"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                {info.text}
              </span>
            </div>
          ))}
        </div>

        {/* Divider with decoration */}
        <div className="relative border-t border-white/10 pt-4 sm:pt-6 md:pt-8">
          {/* Decorative center element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E42] px-3 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4CD0DC] rounded-full" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FCD700] rounded-full" />
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FC0168] rounded-full" />
            </div>
          </div>
          
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p 
              className="text-[#64748B] text-xs sm:text-sm text-center md:text-left"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              © {new Date().getFullYear()} EDUQO. Toate drepturile rezervate.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              <Link
                href="/termeni"
                className="text-[#64748B] text-xs sm:text-sm hover:text-[#4CD0DC] transition-colors flex items-center gap-1 group"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                <span className="w-1 h-1 bg-[#4CD0DC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Termeni și condiții
              </Link>
              <Link
                href="/gdpr"
                className="text-[#64748B] text-xs sm:text-sm hover:text-[#FC0168] transition-colors flex items-center gap-1 group"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                <span className="w-1 h-1 bg-[#FC0168] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                Politica de confidențialitate
              </Link>
            </div>
          </div>
        </div>

        {/* Fun footer note - Enhanced */}
        <div
          className={`text-center mt-4 sm:mt-6 md:mt-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p 
            className="text-[#64748B] text-[10px] sm:text-xs md:text-sm flex flex-wrap items-center justify-center gap-1 sm:gap-2"
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            <span>Făcut cu</span>
            <span className="text-[#FC0168] animate-pulse [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">
              <Icons.Heart />
            </span>
            <span>pentru copiii care vor să descopere lumea</span>
            <span className="text-[#FCD700] [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4">
              <Icons.Sparkle />
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
