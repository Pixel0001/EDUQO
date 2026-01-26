'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

// Icon Components
const Icons = {
  Heart: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  BookOpen: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  LightBulb: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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
  PaintBrush: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trophy: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m3.044-1.35a6.726 6.726 0 01-2.748 1.35m0 0a6.772 6.772 0 01-2.748 0M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.228V2.721M16.27 9.728a6.726 6.726 0 01-2.748 1.35" />
    </svg>
  ),
  Fire: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Quote: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  ),
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredValue, setHoveredValue] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Icons.Heart,
      title: 'Învățare prin joacă',
      description: 'Fiecare activitate dezvoltă curiozitatea și imaginația într-un mod distractiv.',
      color: '#FC0168',
    },
    {
      icon: Icons.BookOpen,
      title: 'Mediu prietenos',
      description: 'Un spațiu sigur și creativ unde copiii explorează și învață confortabil.',
      color: '#4CD0DC',
    },
    {
      icon: Icons.LightBulb,
      title: 'Creativitate',
      description: 'Încurajăm expresia creativă prin artă, pictură și ateliere unice.',
      color: '#FCD700',
    },
    {
      icon: Icons.Users,
      title: 'Alături de copii',
      description: 'Suntem parteneri în călătoria lor de învățare, nu doar instructori.',
      color: '#2BA84C',
    },
  ]

  const features = [
    { icon: Icons.BookOpen, title: 'Alfabetizare', desc: 'Învățarea literelor și citirii într-un mod interactiv', color: '#4CD0DC' },
    { icon: Icons.Academic, title: 'Pregătire pentru școală', desc: 'Dezvoltarea abilităților pentru succesul școlar', color: '#0536FC' },
    { icon: Icons.Palette, title: 'Ateliere de creație', desc: 'Explorarea artei prin diverse materiale', color: '#FCD700' },
    { icon: Icons.PaintBrush, title: 'Pictură', desc: 'Exprimarea emoțiilor prin culoare și formă', color: '#2BA84C' },
  ]

  const stats = [
    { value: '5+', label: 'Ani experiență', icon: Icons.Clock, color: '#4CD0DC' },
    { value: '500+', label: 'Copii fericiți', icon: Icons.Users, color: '#0536FC' },
    { value: '100%', label: 'Pasiune', icon: Icons.Fire, color: '#FC0168' },
  ]

  return (
    <section
      id="despre"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]"
    >
      {/* Background decorations */}
      <div className="absolute top-20 sm:top-40 -left-10 sm:-left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#4CD0DC]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 sm:bottom-40 -right-10 sm:-right-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-[#FCD700]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0536FC]/10 border border-[#0536FC]/20 rounded-full mb-4 sm:mb-6">
            <Icons.Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0536FC]" />
            <span 
              className="text-[#0536FC] text-xs sm:text-sm font-semibold"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Despre noi
            </span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E42] mb-4 sm:mb-6 px-2"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Descoperă universul{' '}
            <span className="relative inline-block">
              <span className="text-[#4CD0DC]">EDUQO</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#4CD0DC]/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p 
            className="text-sm sm:text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            La EDUQO, fiecare copil descoperă bucuria de a învăța într-un mediu prietenos și creativ.
            Aventuri pline de culoare și zâmbete te așteaptă!
          </p>
        </div>

        {/* Values Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-14 md:mb-20 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon
            const isHovered = hoveredValue === index
            return (
              <div
                key={index}
                className="group relative p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0] hover:border-transparent shadow-[0_4px_20px_rgba(30,30,66,0.04)] hover:shadow-[0_20px_50px_rgba(30,30,66,0.12)] transition-all duration-500"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Hover gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${value.color}08 0%, transparent 60%)` }}
                />

                <div className="relative">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${value.color}12` }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: value.color }} />
                  </div>
                  <h3 
                    className="text-sm sm:text-base md:text-lg font-bold text-[#1E1E42] mb-1 sm:mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {value.title}
                  </h3>
                  <p 
                    className="text-[#64748B] text-xs sm:text-sm leading-relaxed hidden sm:block"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {value.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div 
                  className="absolute bottom-0 left-3 right-3 sm:left-6 sm:right-6 h-0.5 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: value.color }}
                />
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left - Visual Card */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Background shapes */}
            <div className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24 bg-gradient-to-br from-[#FCD700]/40 to-[#FCD700]/20 rounded-2xl sm:rounded-3xl rotate-6" />
            <div className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-br from-[#4CD0DC]/40 to-[#4CD0DC]/20 rounded-full" />
            
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(30,30,66,0.1)] border border-[#E2E8F0]/50">
              {/* Logo */}
              <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-2 sm:p-3 bg-gradient-to-br from-[#4CD0DC]/10 to-[#FCD700]/10 rounded-xl sm:rounded-2xl">
                  <Image
                    src="/logo eduquo.png"
                    alt="EDUQO"
                    fill
                    className="object-contain p-1 sm:p-2"
                  />
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-4 sm:mb-6 md:mb-8">
                <Icons.Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#4CD0DC]/20" />
                <blockquote className="text-center px-2 sm:px-4">
                  <p 
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#1E1E42] italic leading-relaxed"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    "Fiecare activitate dezvoltă curiozitatea, imaginația și motricitatea fină"
                  </p>
                </blockquote>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div 
                      key={index} 
                      className="group text-center p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-white border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-300"
                    >
                      <div 
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-1 sm:mb-2 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${stat.color}12` }}
                      >
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: stat.color }} />
                      </div>
                      <p 
                        className="text-lg sm:text-xl md:text-2xl font-bold"
                        style={{ fontFamily: 'var(--font-poppins)', color: stat.color }}
                      >
                        {stat.value}
                      </p>
                      <p 
                        className="text-[10px] sm:text-xs text-[#64748B]"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right - Features */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#4CD0DC]/10 flex items-center justify-center">
                <Icons.Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
              </div>
              <h3 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E1E42]"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Ce oferim copiilor tăi
              </h3>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="group flex gap-2.5 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E2E8F0] hover:border-transparent shadow-[0_2px_8px_rgba(30,30,66,0.04)] hover:shadow-[0_12px_32px_rgba(30,30,66,0.1)] transition-all duration-300"
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <div 
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: `${feature.color}12` }}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: feature.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="text-sm sm:text-base md:text-lg font-semibold text-[#1E1E42] mb-0.5 sm:mb-1 group-hover:text-[#4CD0DC] transition-colors truncate sm:whitespace-normal"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {feature.title}
                      </h4>
                      <p 
                        className="text-[#64748B] text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                      <Icons.Check className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: feature.color }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 sm:mt-6 md:mt-8">
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-[#1E1E42] text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:bg-[#4CD0DC] transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <span>Află mai multe despre noi</span>
                <Icons.ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
