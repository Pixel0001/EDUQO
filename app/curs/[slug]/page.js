'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import EnrollmentModal from '@/components/public/EnrollmentModal'

// Icon Components matching site design
const Icons = {
  ArrowLeft: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  BookOpen: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Academic: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  X: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Play: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  Pause: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  ),
  ZoomIn: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  ),
}

const LEVEL_CONFIG = {
  'începător': { color: '#2BA84C', label: 'Începător' },
  'intermediar': { color: '#FCD700', label: 'Intermediar' },
  'avansat': { color: '#FC0168', label: 'Avansat' },
}

const CATEGORY_COLORS = {
  'limba': '#4CD0DC',
  'matematica': '#2BA84C',
  'arta': '#FC0168',
  'pregatire': '#0536FC',
  'default': '#4CD0DC',
}

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/public/courses/${params.slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Cursul nu a fost găsit')
          } else {
            throw new Error('Failed to fetch')
          }
          return
        }
        const data = await res.json()
        setCourse(data)
      } catch (error) {
        console.error('Error fetching course:', error)
        setError('A apărut o eroare la încărcarea cursului')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchCourse()
    }
  }, [params.slug])

  const images = course?.images?.length > 0 
    ? course.images 
    : (course?.mainImageUrl || course?.imageUrl ? [course.mainImageUrl || course.imageUrl] : [])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || isLightboxOpen) return
    const interval = setInterval(() => nextImage(), 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, isLightboxOpen, nextImage])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, nextImage, prevImage])

  const getCategoryColor = (category) => {
    if (!category) return CATEGORY_COLORS.default
    const normalized = category.toLowerCase().replace(/\s+/g, '')
    if (normalized.includes('limba')) return CATEGORY_COLORS.limba
    if (normalized.includes('matemat')) return CATEGORY_COLORS.matematica
    if (normalized.includes('arta') || normalized.includes('pict')) return CATEGORY_COLORS.arta
    if (normalized.includes('pregat')) return CATEGORY_COLORS.pregatire
    return CATEGORY_COLORS.default
  }

  const accentColor = getCategoryColor(course?.category)
  const levelConfig = LEVEL_CONFIG[course?.level?.toLowerCase()] || { color: accentColor, label: course?.level }
  
  const hasAgeRange = course?.ageMin || course?.ageMax
  const ageText = hasAgeRange 
    ? `${course.ageMin || '?'}${course.ageMax ? `-${course.ageMax}` : '+'} ani`
    : null

  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('ro-RO').format(price)
  }

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-white pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="h-5 w-32 bg-[#E2E8F0] rounded-full mb-8 animate-pulse" />
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-3xl bg-[#E2E8F0] animate-pulse" />
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-20 h-14 rounded-xl bg-[#E2E8F0] animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="h-8 w-24 bg-[#E2E8F0] rounded-full animate-pulse" />
                  <div className="h-8 w-20 bg-[#E2E8F0] rounded-full animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="h-10 w-4/5 bg-[#E2E8F0] rounded animate-pulse" />
                  <div className="h-10 w-2/3 bg-[#E2E8F0] rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-[#E2E8F0] rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-[#E2E8F0] rounded animate-pulse" />
                </div>
                <div className="h-14 w-40 bg-[#E2E8F0] rounded-2xl animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-[#E2E8F0] rounded-2xl animate-pulse" />
                  ))}
                </div>
                <div className="h-14 w-full bg-[#E2E8F0] rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-white pt-20 sm:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-[#FC0168]/10 flex items-center justify-center">
                <Icons.BookOpen className="w-12 h-12 text-[#FC0168]" />
              </div>
              <h1 
                className="text-2xl sm:text-3xl font-bold text-[#1E1E42] mb-4"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {error}
              </h1>
              <Link 
                href="/#cursuri"
                className="inline-flex items-center gap-2 text-[#4CD0DC] hover:text-[#1E1E42] transition-colors font-medium"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                <Icons.ArrowLeft className="w-5 h-5" />
                Înapoi la cursuri
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-white pt-20 sm:pt-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#4CD0DC]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-80 right-10 w-96 h-96 bg-[#FCD700]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Back button */}
          <Link 
            href="/#cursuri"
            className={`inline-flex items-center gap-2 text-[#64748B] hover:text-[#1E1E42] mb-6 sm:mb-10 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            <Icons.ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Înapoi la cursuri</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left side - Images */}
            <div 
              className={`space-y-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Main image */}
              <div 
                className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-white shadow-[0_20px_60px_rgba(30,30,66,0.1)] cursor-pointer group border border-[#E2E8F0]"
                onClick={() => images.length > 0 && setIsLightboxOpen(true)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {images.length > 0 ? (
                  <>
                    {images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={course.title}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${
                          currentImageIndex === idx 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-105'
                        }`}
                        priority={idx === 0}
                      />
                    ))}
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#1E1E42]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icons.ZoomIn className="w-8 h-8 text-white" />
                        </div>
                        <span 
                          className="text-white font-medium"
                          style={{ fontFamily: 'var(--font-quicksand)' }}
                        >
                          Click pentru a mări
                        </span>
                      </div>
                    </div>
                    
                    {/* Navigation arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); prevImage() }}
                          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-2xl text-[#1E1E42] transition-all hover:scale-110 shadow-lg"
                        >
                          <Icons.ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); nextImage() }}
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-2xl text-[#1E1E42] transition-all hover:scale-110 shadow-lg"
                        >
                          <Icons.ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </>
                    )}
                    
                    {/* Progress dots */}
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx) }}
                            className={`transition-all duration-300 rounded-full ${
                              currentImageIndex === idx 
                                ? 'w-8 h-2 bg-white' 
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Auto-play toggle */}
                    {images.length > 1 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying) }}
                        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-xl text-[#1E1E42] transition-colors shadow-lg"
                        title={isAutoPlaying ? 'Oprește slideshow' : 'Pornește slideshow'}
                      >
                        {isAutoPlaying ? (
                          <Icons.Pause className="w-4 h-4" />
                        ) : (
                          <Icons.Play className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-24 h-24 rounded-3xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}15` }}
                    >
                      <Icons.BookOpen className="w-12 h-12" style={{ color: accentColor }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentImageIndex(idx); setIsAutoPlaying(false) }}
                      className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                        currentImageIndex === idx 
                          ? 'ring-2 ring-offset-2 scale-105 shadow-lg' 
                          : 'opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ 
                        ringColor: currentImageIndex === idx ? accentColor : 'transparent'
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${course.title} - ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Details */}
            <div 
              className={`space-y-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {course.level && (
                  <span 
                    className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide"
                    style={{ 
                      backgroundColor: `${levelConfig.color}15`,
                      color: levelConfig.color,
                    }}
                  >
                    {levelConfig.label}
                  </span>
                )}
                {course.category && (
                  <span 
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {course.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E42] leading-tight"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {course.title}
              </h1>

              {/* Short description */}
              <p 
                className="text-lg text-[#64748B] leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {course.descriptionShort}
              </p>

              {/* Price */}
              <div className="flex items-center gap-4 flex-wrap">
                {course.discountPrice ? (
                  <>
                    <div 
                      className="px-5 py-2.5 rounded-2xl inline-flex items-baseline gap-1 shadow-lg"
                      style={{ 
                        backgroundColor: accentColor,
                        boxShadow: `0 8px 24px ${accentColor}40`
                      }}
                    >
                      <span 
                        className="text-3xl font-black text-white"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {formatPrice(course.discountPrice)}
                      </span>
                      <span className="text-base font-semibold text-white/80">MDL</span>
                    </div>
                    <div className="px-4 py-2 bg-[#F8FAFC] rounded-xl inline-flex items-baseline gap-1 border border-[#E2E8F0]">
                      <span 
                        className="text-xl font-medium text-[#94A3B8] line-through"
                        style={{ fontFamily: 'var(--font-poppins)' }}
                      >
                        {formatPrice(course.price)}
                      </span>
                      <span className="text-sm text-[#94A3B8]">MDL</span>
                    </div>
                  </>
                ) : course.price ? (
                  <div 
                    className="px-5 py-2.5 rounded-2xl inline-flex items-baseline gap-1 shadow-lg"
                    style={{ 
                      backgroundColor: accentColor,
                      boxShadow: `0 8px 24px ${accentColor}40`
                    }}
                  >
                    <span 
                      className="text-3xl font-black text-white"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {formatPrice(course.price)}
                    </span>
                    <span className="text-base font-semibold text-white/80">MDL</span>
                  </div>
                ) : null}
              </div>

              {/* Meta info cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {ageText && (
                  <div className="group p-4 bg-white rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-300 text-center">
                    <div 
                      className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}12` }}
                    >
                      <Icons.Users className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <p 
                      className="text-xs text-[#94A3B8] mb-0.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Vârstă
                    </p>
                    <p 
                      className="text-sm font-bold text-[#1E1E42]"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {ageText}
                    </p>
                  </div>
                )}
                {course.duration && (
                  <div className="group p-4 bg-white rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-300 text-center">
                    <div 
                      className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}12` }}
                    >
                      <Icons.Clock className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <p 
                      className="text-xs text-[#94A3B8] mb-0.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Durată
                    </p>
                    <p 
                      className="text-sm font-bold text-[#1E1E42]"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {course.duration}
                    </p>
                  </div>
                )}
                {course.lessonsCount && (
                  <div className="group p-4 bg-white rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-300 text-center">
                    <div 
                      className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}12` }}
                    >
                      <Icons.BookOpen className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <p 
                      className="text-xs text-[#94A3B8] mb-0.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Lecții
                    </p>
                    <p 
                      className="text-sm font-bold text-[#1E1E42]"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {course.lessonsCount}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-xl active:scale-[0.98] group"
                style={{ 
                  backgroundColor: '#1E1E42',
                  fontFamily: 'var(--font-poppins)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Icons.Sparkles className="w-5 h-5" />
                  Înscrie-te acum
                  <Icons.ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div 
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ backgroundColor: accentColor }}
                />
              </button>
            </div>
          </div>

          {/* Long description */}
          {course.descriptionLong && (
            <div 
              className={`mt-12 sm:mt-16 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}12` }}
                >
                  <Icons.Academic className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-[#1E1E42]"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Despre acest curs
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(30,30,66,0.06)]">
                <p 
                  className="whitespace-pre-wrap leading-relaxed text-[#64748B]"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  {course.descriptionLong}
                </p>
              </div>
            </div>
          )}

          {/* Features / Benefits section */}
          <div 
            className={`mt-12 sm:mt-16 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2BA84C]/10 border border-[#2BA84C]/20 rounded-full mb-4">
                <Icons.Check className="w-4 h-4 text-[#2BA84C]" />
                <span 
                  className="text-[#2BA84C] text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  De ce să alegi acest curs
                </span>
              </div>
              <h2 
                className="text-2xl sm:text-3xl font-bold text-[#1E1E42]"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Beneficii pentru copilul tău
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Învățare practică', description: 'Activități interactive care fac învățarea captivantă și memorabilă', color: '#4CD0DC', icon: 'BookOpen' },
                { title: 'Profesori dedicați', description: 'Echipă de profesioniști pasionați de educație', color: '#FC0168', icon: 'Users' },
                { title: 'Grupe mici', description: 'Atenție individualizată pentru fiecare copil', color: '#2BA84C', icon: 'Users' },
                { title: 'Progres monitorizat', description: 'Feedback regulat despre evoluția copilului', color: '#FCD700', icon: 'Academic' },
                { title: 'Mediu prietenos', description: 'Spațiu sigur și stimulant pentru dezvoltare', color: '#0536FC', icon: 'Sparkles' },
                { title: 'Materiale moderne', description: 'Resurse educaționale actualizate și atractive', color: '#FC0168', icon: 'BookOpen' },
              ].map((benefit, idx) => {
                const IconComponent = Icons[benefit.icon] || Icons.Check
                return (
                <div 
                  key={idx}
                  className="group p-6 rounded-2xl border-2 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    backgroundColor: `${benefit.color}08`,
                    borderColor: `${benefit.color}30`
                  }}
                >
                  <div 
                    className="w-12 h-12 mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: benefit.color }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 
                    className="font-bold mb-2 text-lg"
                    style={{ fontFamily: 'var(--font-poppins)', color: benefit.color }}
                  >
                    {benefit.title}
                  </h3>
                  <p 
                    className="text-sm text-[#64748B]"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {benefit.description}
                  </p>
                </div>
              )})}
            </div>
          </div>

          {/* Bottom CTA */}
          <div 
            className={`mt-12 sm:mt-16 mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border-2 border-[#E2E8F0] shadow-[0_20px_60px_rgba(30,30,66,0.1)]">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CD0DC]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FCD700]/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FC0168]/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-[#1E1E42] mb-4"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Pregătit să începi?
                </h3>
                <p 
                  className="text-[#64748B] mb-8 max-w-lg mx-auto"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  Înscrie-te acum și oferă copilului tău o experiență educațională de neuitat!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-[#1E1E42] transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-[0.98]"
                  style={{ 
                    backgroundColor: accentColor,
                    fontFamily: 'var(--font-poppins)',
                    boxShadow: `0 8px 24px ${accentColor}40`
                  }}
                >
                  <Icons.Sparkles className="w-5 h-5" />
                  Înscrie-te acum
                  <Icons.ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-[#1E1E42]/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors z-10"
          >
            <Icons.X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentImageIndex]}
              alt={course.title}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors"
              >
                <Icons.ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors"
              >
                <Icons.ChevronRight className="w-8 h-8" />
              </button>
              <div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}

      <Footer />

      <EnrollmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </>
  )
}
