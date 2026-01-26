'use client'

import { useEffect, useState, useRef } from 'react'

// Icon Components
const Icons = {
  Phone: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  MapPin: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Email: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Facebook: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Instagram: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  YouTube: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  TikTok: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  Send: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Star: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  CheckCircle: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Chat: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
}

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactCards = [
    {
      icon: Icons.Phone,
      title: 'Sună-ne',
      value: '+373 60 123 456',
      subtitle: 'Luni - Vineri: 9-19',
      href: 'tel:+37360123456',
      bgColor: 'bg-[#2BA84C]/10',
      iconColor: 'text-[#2BA84C]',
      hoverBorder: 'hover:border-[#2BA84C]',
    },
    {
      icon: Icons.Email,
      title: 'Email',
      value: 'contact@eduqo.md',
      subtitle: 'Răspundem în 24h',
      href: 'mailto:contact@eduqo.md',
      bgColor: 'bg-[#0536FC]/10',
      iconColor: 'text-[#0536FC]',
      hoverBorder: 'hover:border-[#0536FC]',
    },
    {
      icon: Icons.MapPin,
      title: 'Vizitează-ne',
      value: 'Chișinău, Centru',
      subtitle: 'Str. Exemplu nr. 123',
      href: '#',
      bgColor: 'bg-[#FC0168]/10',
      iconColor: 'text-[#FC0168]',
      hoverBorder: 'hover:border-[#FC0168]',
    },
    {
      icon: Icons.Clock,
      title: 'Program',
      value: 'Luni - Vineri',
      subtitle: '09:00 - 19:00',
      href: null,
      bgColor: 'bg-[#FCD700]/20',
      iconColor: 'text-[#D4A800]',
      hoverBorder: 'hover:border-[#FCD700]',
    },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Icons.Facebook, href: '#', bg: 'bg-[#1877F2]' },
    { name: 'Instagram', icon: Icons.Instagram, href: '#', bg: 'bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45]' },
    { name: 'YouTube', icon: Icons.YouTube, href: '#', bg: 'bg-[#FF0000]' },
    { name: 'TikTok', icon: Icons.TikTok, href: '#', bg: 'bg-[#000000]' },
  ]

  const features = [
    { icon: Icons.CheckCircle, text: 'Răspuns în 24h', color: 'text-[#2BA84C]' },
    { icon: Icons.Heart, text: 'Consultanță gratuită', color: 'text-[#FC0168]' },
    { icon: Icons.Star, text: 'Suport dedicat', color: 'text-[#FCD700]' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-[#F0FDFF] to-white"
    >
      {/* Playful Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Colorful blobs */}
        <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-[#4CD0DC]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-16 sm:-left-32 w-[175px] sm:w-[250px] md:w-[350px] h-[175px] sm:h-[250px] md:h-[350px] bg-[#FCD700]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 sm:-bottom-20 right-1/4 w-[150px] sm:w-[220px] md:w-[300px] h-[150px] sm:h-[220px] md:h-[300px] bg-[#FC0168]/10 rounded-full blur-3xl" />
        
        {/* Floating shapes - hidden on very small screens */}
        <div className="hidden sm:block absolute top-32 left-[15%] w-6 h-6 bg-[#4CD0DC] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="hidden sm:block absolute top-48 right-[20%] w-4 h-4 bg-[#FCD700] rounded-lg rotate-45 opacity-70 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="hidden sm:block absolute bottom-32 left-[25%] w-5 h-5 bg-[#FC0168] rounded-full opacity-50 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }} />
        <div className="hidden md:block absolute top-1/3 right-[10%] w-3 h-3 bg-[#2BA84C] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }} />
        <div className="hidden md:block absolute bottom-48 right-[15%] w-4 h-4 bg-[#0536FC] rounded-lg rotate-12 opacity-50 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }} />
        
        {/* Stars - hidden on very small screens */}
        <svg className="hidden sm:block absolute top-24 left-[10%] w-6 h-6 md:w-8 md:h-8 text-[#FCD700] opacity-40 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <svg className="hidden sm:block absolute bottom-24 right-[8%] w-5 h-5 md:w-6 md:h-6 text-[#4CD0DC] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-[#4CD0DC]/15 border-2 border-[#4CD0DC]/30 rounded-full mb-4 sm:mb-6">
            <Icons.Chat className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
            <span 
              className="text-[#1E1E42] text-xs sm:text-sm font-bold"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Contactează-ne
            </span>
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E1E42] mb-4 sm:mb-6 px-1"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Hai să{' '}
            <span className="relative inline-block">
              <span className="text-[#4CD0DC]">vorbim!</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 md:h-4" viewBox="0 0 120 12" preserveAspectRatio="none">
                <path d="M2,8 Q30,2 60,8 T118,6" stroke="#FCD700" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>{' '}
            <span className="hidden sm:inline-block animate-bounce" style={{ animationDuration: '2s' }}>
              <Icons.Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FCD700]" />
            </span>
          </h2>
          
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Suntem aici să răspundem la toate întrebările tale despre cursurile EDUQO
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 md:mt-8 px-1">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-md border-2 border-[#E2E8F0] hover:border-[#4CD0DC] hover:scale-105 transition-all duration-300"
                >
                  <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.color}`} />
                  <span 
                    className="text-xs sm:text-sm text-[#1E1E42] font-semibold whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {feature.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {contactCards.map((card, index) => {
            const IconComponent = card.icon
            const Wrapper = card.href ? 'a' : 'div'
            return (
              <Wrapper
                key={index}
                href={card.href || undefined}
                className={`group relative p-3 sm:p-4 md:p-5 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#E2E8F0] ${card.hoverBorder} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${card.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${card.iconColor}`} />
                </div>
                <p 
                  className="text-[10px] sm:text-xs md:text-sm text-[#64748B] font-medium mb-0.5 sm:mb-1"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  {card.title}
                </p>
                <p 
                  className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#1E1E42] mb-0.5 sm:mb-1 break-all sm:break-normal"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {card.value}
                </p>
                <p 
                  className="text-[10px] sm:text-xs md:text-sm text-[#94A3B8] hidden sm:block"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  {card.subtitle}
                </p>
              </Wrapper>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Left Side - Social & Info */}
          <div
            className={`lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Social Card */}
            <div className="relative p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#1E1E42] to-[#2D2D5A] rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-[#4CD0DC]/20 rounded-full" />
              <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-[#FCD700]/15 rounded-full" />
              
              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#4CD0DC]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Icons.Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
                  </div>
                  <h3 
                    className="text-base sm:text-lg md:text-xl font-bold" 
                    style={{ fontFamily: 'var(--font-poppins)', color: '#FFFFFF' }}
                  >
                    Urmărește-ne
                  </h3>
                </div>
                <p 
                  className="text-white text-xs sm:text-sm mb-3 sm:mb-4 md:mb-5"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  Alătură-te comunității de peste 500+ părinți
                </p>
                <div className="flex gap-2 sm:gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className={`group w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 ${social.bg} rounded-lg sm:rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg`}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="p-4 sm:p-5 md:p-6 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#E2E8F0] shadow-md">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#FCD700]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Icons.Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A800]" />
                </div>
                <h3 
                  className="text-base sm:text-lg font-bold text-[#1E1E42]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Program complet
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-[#F8FAFC] rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-[#64748B] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>Luni - Vineri</span>
                  <span className="text-xs sm:text-sm text-[#1E1E42] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>09:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-[#F8FAFC] rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-[#64748B] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>Sâmbătă</span>
                  <span className="text-xs sm:text-sm text-[#1E1E42] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>10:00 - 15:00</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-[#FC0168]/5 rounded-lg sm:rounded-xl border border-[#FC0168]/20">
                  <span className="text-xs sm:text-sm text-[#64748B] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>Duminică</span>
                  <span className="text-xs sm:text-sm text-[#FC0168] font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Închis</span>
                </div>
              </div>
            </div>

            {/* Fun CTA */}
            <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-[#4CD0DC]/10 to-[#4CD0DC]/5 rounded-xl sm:rounded-2xl border-2 border-[#4CD0DC]/30">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#4CD0DC]/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icons.MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
                </div>
                <div className="min-w-0">
                  <p 
                    className="text-sm sm:text-base text-[#1E1E42] font-bold mb-0.5 sm:mb-1"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Vino să ne cunoști!
                  </p>
                  <p 
                    className="text-[#64748B] text-xs sm:text-sm mb-2 sm:mb-3"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    Programează o vizită gratuită la sediul nostru
                  </p>
                  <a 
                    href="#"
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#4CD0DC] font-bold hover:text-[#3BB8C4] transition-colors"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Programează vizită
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-[#E2E8F0] shadow-xl">
              {/* Fun decorations - hidden on very small screens */}
              <div className="hidden sm:block absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#FCD700] rounded-lg sm:rounded-xl rotate-12 opacity-80" />
              <div className="hidden sm:block absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-5 h-5 sm:w-6 sm:h-6 bg-[#4CD0DC] rounded-full opacity-70" />
              <div className="hidden md:block absolute top-12 -right-2 w-4 h-4 bg-[#FC0168] rounded-full opacity-60" />

              {/* Form Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#4CD0DC] to-[#0536FC] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icons.Send className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E1E42]"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Trimite un mesaj
                  </h3>
                  <p 
                    className="text-xs sm:text-sm text-[#64748B]"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    Completează formularul și te contactăm noi!
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8 sm:py-10 md:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#2BA84C]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
                    <Icons.CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#2BA84C]" />
                  </div>
                  <h4 
                    className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E1E42] mb-1 sm:mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Mesaj trimis! 🎉
                  </h4>
                  <p 
                    className="text-sm sm:text-base text-[#64748B]"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    Îți mulțumim! Te vom contacta în curând.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#1E1E42] mb-1.5 sm:mb-2"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        Numele tău
                        <Icons.Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCD700]" />
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="ex: Maria Popescu"
                        className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl sm:rounded-2xl focus:border-[#4CD0DC] focus:bg-white outline-none transition-all duration-300 text-sm sm:text-base text-[#1E1E42] placeholder:text-[#94A3B8] font-medium"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#1E1E42] mb-1.5 sm:mb-2"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        Email
                        <Icons.Email className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0536FC]" />
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ex: maria@email.com"
                        className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl sm:rounded-2xl focus:border-[#4CD0DC] focus:bg-white outline-none transition-all duration-300 text-sm sm:text-base text-[#1E1E42] placeholder:text-[#94A3B8] font-medium"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="phone" 
                      className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#1E1E42] mb-1.5 sm:mb-2"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Telefon
                      <Icons.Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2BA84C]" />
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="ex: 0712 345 678"
                      className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl sm:rounded-2xl focus:border-[#4CD0DC] focus:bg-white outline-none transition-all duration-300 text-sm sm:text-base text-[#1E1E42] placeholder:text-[#94A3B8] font-medium"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#1E1E42] mb-1.5 sm:mb-2"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Mesajul tău
                      <Icons.Chat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4CD0DC]" />
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Spune-ne cum te putem ajuta..."
                      className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-xl sm:rounded-2xl focus:border-[#4CD0DC] focus:bg-white outline-none transition-all duration-300 resize-none text-sm sm:text-base text-[#1E1E42] placeholder:text-[#94A3B8] font-medium"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-3 sm:py-4 md:py-5 bg-gradient-to-r from-[#4CD0DC] to-[#3BB8C4] text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:shadow-[0_15px_40px_rgba(76,208,220,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 sm:gap-3"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Se trimite...</span>
                      </>
                    ) : (
                      <>
                        <span>Trimite mesajul</span>
                        <Icons.Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icons.CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#2BA84C]" />
                      <span className="text-xs sm:text-sm text-[#64748B] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>Răspuns garantat</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icons.Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#FC0168]" />
                      <span className="text-xs sm:text-sm text-[#64748B] font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>Fără obligații</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
