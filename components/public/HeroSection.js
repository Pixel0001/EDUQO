'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ConfettiDecoration from './ConfettiDecoration'

// Icon Components - Clean SVG icons
const Icons = {
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Academic: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  Palette: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  Star: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Book: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  Backpack: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 17.25c-2.97 0-5.828-.536-8.453-1.518a2.26 2.26 0 01-.673-.38m0 0A2.18 2.18 0 012.25 13.5V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0012.75 3h-1.5a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  PaintBrush: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  CheckBadge: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  Play: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
  ),
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStatIndex, setCurrentStatIndex] = useState(0)
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animated counter effect - synchronized
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2500 // 2.5 seconds
          const startTime = performance.now()
          const targetValues = [500, 15, 20, 98]

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Linear progress with slight ease at the very end
            const easeProgress = progress < 0.9 
              ? progress / 0.9 * 0.95 // Linear for first 90%
              : 0.95 + (progress - 0.9) / 0.1 * 0.05 // Slow finish for last 10%
            
            setCountedStats(targetValues.map(target => 
              Math.round(target * Math.min(easeProgress, 1))
            ))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              // Ensure final values are exact
              setCountedStats(targetValues)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const stats = [
    { 
      number: '500+', 
      label: 'Copii fericiți', 
      icon: Icons.Users,
      color: '#4CD0DC',
      bgColor: '#4CD0DC15'
    },
    { 
      number: '15+', 
      label: 'Profesori dedicați', 
      icon: Icons.Academic,
      color: '#0536FC',
      bgColor: '#0536FC15'
    },
    { 
      number: '20+', 
      label: 'Cursuri creative', 
      icon: Icons.Palette,
      color: '#FCD700',
      bgColor: '#FCD70020'
    },
    { 
      number: '98%', 
      label: 'Părinți mulțumiți', 
      icon: Icons.Star,
      color: '#2BA84C',
      bgColor: '#2BA84C15'
    },
  ]

  const activities = [
    { name: 'Alfabetizare', icon: Icons.Book, color: '#4CD0DC' },
    { name: 'Ateliere de creație', icon: Icons.Sparkles, color: '#FCD700' },
    { name: 'Pregătire pentru școală', icon: Icons.Backpack, color: '#0536FC' },
    { name: 'Pictură', icon: Icons.PaintBrush, color: '#2BA84C' },
  ]

  const trustIcons = [
    { icon: Icons.Heart, color: '#4CD0DC' },
    { icon: Icons.Palette, color: '#FCD700' },
    { icon: Icons.Book, color: '#2BA84C' },
    { icon: Icons.Star, color: '#FC0168' },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white"
    >
      {/* Confetti Decorations */}
      <ConfettiDecoration variant="hero" />

      {/* Modern gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD0DC]/5 via-transparent to-[#FCD700]/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4CD0DC]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FCD700]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`text-center lg:text-left transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Heading */}
            <h1 
              className="text-[1.75rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 text-[#1E1E42]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <span className="inline-block">Lumea </span>
              <span className="relative inline-block text-[#4CD0DC]">
                EDUQO
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#4CD0DC]/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="block mt-2 sm:mt-3">
                idei, culoare,{' '}
                <span className="relative inline-block">
                  <span className="text-[#FCD700]">zâmbete</span>
                  <Icons.Sparkles className="absolute -top-3 sm:-top-4 -right-4 sm:-right-6 w-4 sm:w-6 h-4 sm:h-6 text-[#FCD700] animate-pulse" />
                </span>
              </span>
            </h1>

            {/* Description */}
            <p 
              className="text-base sm:text-lg md:text-xl text-[#64748B] mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              La EDUQO, fiecare copil descoperă bucuria de a învăța într-un mediu prietenos și creativ. 
              <span className="text-[#1E1E42] font-medium"> Suntem alături de copii, nu în fața lor.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <Link
                href="/inscriere"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-[#4CD0DC] text-[#1E1E42] font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(76,208,220,0.35)] hover:shadow-[0_12px_48px_rgba(76,208,220,0.45)]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <span className="absolute inset-0 bg-[#1E1E42] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Începe aventura</span>
                <Icons.ArrowRight className="relative z-10 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
              </Link>
              <Link
                href="#cursuri"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-[#1E1E42] font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-[#1E1E42]/10 hover:border-[#1E1E42] hover:bg-[#1E1E42] hover:text-white transition-all duration-300"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                <Icons.Play className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Descoperă cursurile</span>
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-3 sm:gap-5 mt-8 sm:mt-12 justify-center lg:justify-start">
              <div className="flex -space-x-2 sm:-space-x-3">
                {trustIcons.map((item, i) => (
                  <div
                    key={i}
                    className="w-9 sm:w-12 h-9 sm:h-12 rounded-full border-2 sm:border-[3px] border-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:z-10"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 sm:gap-2">
                  <p className="text-[#1E1E42] font-bold text-sm sm:text-lg" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    500+ copii fericiți
                  </p>
                  <Icons.CheckBadge className="w-4 sm:w-5 h-4 sm:h-5 text-[#2BA84C]" />
                </div>
                <p className="text-[#64748B] text-xs sm:text-sm" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                  se alătură în fiecare an
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Modern Visual */}
          <div
            className={`relative transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Main Visual Container */}
            <div className="relative">
              {/* Background Gradient Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-[90%] bg-gradient-to-br from-[#4CD0DC]/20 via-[#FCD700]/15 to-[#FC0168]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              </div>

              {/* Central Image/Illustration Area */}
              <div className="relative z-10 flex items-center justify-center py-4 sm:py-8">
                <div className="relative">
                  {/* Orbital rings - hidden on very small screens */}
                  <div className="absolute inset-0 flex items-center justify-center hidden xs:flex">
                    <div className="w-[240px] xs:w-[280px] sm:w-[320px] md:w-[380px] h-[240px] xs:h-[280px] sm:h-[320px] md:h-[380px] border-2 border-dashed border-[#4CD0DC]/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center hidden xs:flex">
                    <div className="w-[190px] xs:w-[220px] sm:w-[260px] md:w-[300px] h-[190px] xs:h-[220px] sm:h-[260px] md:h-[300px] border-2 border-dashed border-[#FCD700]/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                  </div>

                  {/* Central Logo */}
                  <div className="relative w-32 xs:w-36 sm:w-44 md:w-52 h-32 xs:h-36 sm:h-44 md:h-52 bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_12px_40px_rgba(30,30,66,0.12)] sm:shadow-[0_20px_60px_rgba(30,30,66,0.15)] flex items-center justify-center overflow-hidden border border-white/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4CD0DC]/5 to-[#FCD700]/5" />
                    <Image
                      src="/logo eduquo.png"
                      alt="EDUQO"
                      width={140}
                      height={140}
                      className="object-contain relative z-10 w-20 xs:w-24 sm:w-32 md:w-[140px] h-20 xs:h-24 sm:h-32 md:h-[140px]"
                      priority
                    />
                  </div>

                  {/* Floating Feature Cards - Optimized for mobile */}
                  <div className="absolute -top-2 sm:-top-4 -left-8 xs:-left-12 sm:-left-16 md:-left-20">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-[0_4px_16px_rgba(30,30,66,0.1)] sm:shadow-[0_8px_32px_rgba(30,30,66,0.12)] border border-[#E2E8F0] animate-float">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#4CD0DC]/15 flex items-center justify-center flex-shrink-0">
                          <Icons.Book className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-[#4CD0DC]" />
                        </div>
                        <div className="hidden xs:block">
                          <p className="text-[#1E1E42] font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Engleză</p>
                          <p className="text-[#64748B] text-[10px] sm:text-xs">Interactiv</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-1 sm:-top-2 -right-8 xs:-right-10 sm:-right-14 md:-right-16">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-[0_4px_16px_rgba(30,30,66,0.1)] sm:shadow-[0_8px_32px_rgba(30,30,66,0.12)] border border-[#E2E8F0] animate-float" style={{ animationDelay: '1s' }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#FCD700]/20 flex items-center justify-center flex-shrink-0">
                          <Icons.Sparkles className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-[#D4A700]" />
                        </div>
                        <div className="hidden xs:block">
                          <p className="text-[#1E1E42] font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Creativ</p>
                          <p className="text-[#64748B] text-[10px] sm:text-xs">& Fun</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-1 sm:-bottom-2 -left-6 xs:-left-8 sm:-left-12 md:-left-14">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-[0_4px_16px_rgba(30,30,66,0.1)] sm:shadow-[0_8px_32px_rgba(30,30,66,0.12)] border border-[#E2E8F0] animate-float" style={{ animationDelay: '2s' }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#2BA84C]/15 flex items-center justify-center flex-shrink-0">
                          <Icons.Academic className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-[#2BA84C]" />
                        </div>
                        <div className="hidden xs:block">
                          <p className="text-[#1E1E42] font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Matematică</p>
                          <p className="text-[#64748B] text-[10px] sm:text-xs">Prin joc</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 sm:-bottom-6 -right-5 xs:-right-6 sm:-right-10 md:-right-12">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-[0_4px_16px_rgba(30,30,66,0.1)] sm:shadow-[0_8px_32px_rgba(30,30,66,0.12)] border border-[#E2E8F0] animate-float" style={{ animationDelay: '0.5s' }}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#FC0168]/10 flex items-center justify-center flex-shrink-0">
                          <Icons.Heart className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 text-[#FC0168]" />
                        </div>
                        <div className="hidden xs:block">
                          <p className="text-[#1E1E42] font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-poppins)' }}>Social</p>
                          <p className="text-[#64748B] text-[10px] sm:text-xs">Skills</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small floating icons - hidden on very small screens */}
                  <div className="absolute top-1/2 -left-16 xs:-left-20 sm:-left-24 md:-left-32 -translate-y-1/2 hidden xs:flex">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#0536FC]/10 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '2s' }}>
                      <Icons.Star className="w-3 sm:w-4 h-3 sm:h-4 text-[#0536FC]" />
                    </div>
                  </div>

                  <div className="absolute top-1/2 -right-16 xs:-right-20 sm:-right-24 md:-right-32 -translate-y-1/2 hidden xs:flex">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#4CD0DC]/10 rounded-full flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>
                      <Icons.CheckBadge className="w-3 sm:w-4 h-3 sm:h-4 text-[#4CD0DC]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom trust badge */}
              <div className="relative z-10 flex justify-center mt-2 sm:mt-4">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#E2E8F0]">
                  <div className="flex -space-x-1 sm:-space-x-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 text-[#FCD700] fill-[#FCD700]" />
                    ))}
                  </div>
                  <span className="text-[#1E1E42] font-semibold text-xs sm:text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    4.9 din 500+ recenzii
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className={`mt-10 sm:mt-16 md:mt-20 transition-all duration-700 delay-400 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              const isActive = currentStatIndex === index
              const suffix = stat.number.includes('%') ? '%' : '+'
              const displayValue = countedStats[index]
              
              return (
                <div
                  key={index}
                  className={`relative p-3 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm border transition-all duration-500 group text-center ${
                    isActive 
                      ? 'shadow-[0_8px_24px_rgba(30,30,66,0.1)] sm:shadow-[0_12px_40px_rgba(30,30,66,0.12)] border-transparent scale-[1.02]' 
                      : 'shadow-[0_2px_8px_rgba(30,30,66,0.04)] sm:shadow-[0_4px_16px_rgba(30,30,66,0.04)] border-[#E2E8F0] hover:shadow-[0_8px_32px_rgba(30,30,66,0.1)] hover:border-transparent'
                  }`}
                >
                  <div 
                    className={`w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 mx-auto mb-2 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <IconComponent className="w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7" style={{ color: stat.color }} />
                  </div>
                  <p 
                    className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-0.5 sm:mb-1 tabular-nums"
                    style={{ 
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      color: stat.color
                    }}
                  >
                    <span className="inline-block min-w-[2ch] sm:min-w-[3ch]">{displayValue}</span>
                    <span>{suffix}</span>
                  </p>
                  <p 
                    className="text-[#64748B] text-[11px] xs:text-xs sm:text-sm font-medium leading-tight"
                    style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  >
                    {stat.label}
                  </p>

                  {/* Active indicator line */}
                  <div 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 sm:h-1 rounded-full transition-all duration-500 ${
                      isActive ? 'w-8 sm:w-12 opacity-100' : 'w-0 opacity-0'
                    }`}
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <Link 
          href="#cursuri" 
          className="group flex flex-col items-center gap-2 text-[#64748B] hover:text-[#4CD0DC] transition-colors"
        >
          <span 
            className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" 
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            Descoperă mai mult
          </span>
          <div className="w-7 sm:w-8 h-10 sm:h-12 rounded-full border-2 border-current flex items-start justify-center p-1.5 sm:p-2">
            <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-current rounded-full animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  )
}
