'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Acasă', href: '#hero' },
    { name: 'Cursuri', href: '#cursuri' },
    { name: 'Despre noi', href: '#despre' },
    { name: 'Recenzii', href: '#recenzii' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(30,30,66,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Image
                src="/logo eduquo.png"
                alt="EDUQO Logo"
                fill
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
            <span 
              className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#1E1E42]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              EDUQO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-[#1E1E42] font-medium transition-all duration-200 rounded-xl hover:bg-[#4CD0DC]/10"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/inscriere"
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#4CD0DC] text-[#1E1E42] text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-[#1E1E42] hover:text-white transition-all duration-300 shadow-[0_4px_16px_rgba(76,208,220,0.3)] hover:shadow-[0_8px_32px_rgba(30,30,66,0.2)]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>Înscrie-te</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#F8FAFC] hover:bg-[#4CD0DC]/20 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1E42]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[400px] pb-4 sm:pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 sm:gap-2 pt-3 sm:pt-4 border-t border-[#E2E8F0]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-[#1E1E42] text-sm sm:text-base hover:bg-[#4CD0DC]/10 rounded-xl sm:rounded-2xl transition-all duration-200 font-medium"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/inscriere"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-1 sm:mt-2 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#4CD0DC] text-[#1E1E42] text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span>Înscrie-te acum</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
