'use client'

import { useEffect, useState, useRef } from 'react'

// Icon Components
const Icons = {
  Star: ({ className, filled = true }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={filled ? "none" : "currentColor"} strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  Chat: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  Heart: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  ThumbsUp: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
    </svg>
  ),
  CheckBadge: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  ),
  Quote: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  ),
  User: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
}

// Culori pentru avatare
const avatarColors = ['#4CD0DC', '#FCD700', '#0536FC', '#2BA84C', '#FC0168', '#1E1E42']

// Funcție pentru a genera inițiale din nume
const getInitials = (name) => {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Recenzii implicite (afișate când nu sunt recenzii în baza de date)
const defaultReviews = [
  {
    id: '1',
    parentName: 'Maria Ionescu',
    relation: 'Mamă',
    childName: 'Andrei',
    childAge: '6 ani',
    rating: 5,
    content: 'EDUQO a fost cea mai bună alegere pentru Andrei. În doar câteva luni, a învățat să citească și acum adoră cărțile! Atmosfera este caldă și prietenoasă.',
  },
  {
    id: '2',
    parentName: 'Alexandru Pop',
    relation: 'Tată',
    childName: 'Sofia',
    childAge: '5 ani',
    rating: 5,
    content: 'Sofia abia așteaptă să meargă la cursurile de pictură. Profesorii știu cum să încurajeze creativitatea și să facă fiecare lecție specială.',
  },
  {
    id: '3',
    parentName: 'Elena Dumitrescu',
    relation: 'Mamă',
    childName: 'Matei',
    childAge: '7 ani',
    rating: 5,
    content: 'De când a început cursul de limba engleză la EDUQO, Matei vorbește în engleză acasă și e foarte entuziasmat. Metoda lor de predare prin joc funcționează minunat!',
  },
  {
    id: '4',
    parentName: 'Cristian Marin',
    relation: 'Tată',
    childName: 'Ana',
    childAge: '4 ani',
    rating: 5,
    content: 'Atelierele de creație sunt uimitoare! Ana vine acasă cu lucrări frumoase și povești despre ce a învățat. Profesorii sunt răbdători și foarte pricepuți.',
  },
]

export default function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  // Încarcă recenziile din baza de date
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/public/reviews')
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            // Adaugă culori și inițiale pentru fiecare recenzie
            const reviewsWithColors = data.map((review, index) => ({
              ...review,
              color: avatarColors[index % avatarColors.length],
              initials: getInitials(review.authorName),
              // Compatibilitate cu structura componente
              name: review.authorName,
              role: review.roleLabel || 'Părinte',
              text: review.message,
              childInfo: review.childName ? (review.childName + (review.childAge ? `, ${review.childAge}` : '')) : '',
            }))
            setReviews(reviewsWithColors)
          } else {
            // Folosește recenziile implicite dacă nu există în baza de date
            setReviews(defaultReviews.map((review, index) => ({
              ...review,
              color: avatarColors[index % avatarColors.length],
              initials: getInitials(review.parentName),
              name: review.parentName,
              role: review.relation,
              text: review.content,
              childInfo: review.childName + (review.childAge ? `, ${review.childAge}` : ''),
            })))
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        // Folosește recenziile implicite în caz de eroare
        setReviews(defaultReviews.map((review, index) => ({
          ...review,
          color: avatarColors[index % avatarColors.length],
          initials: getInitials(review.parentName),
          name: review.parentName,
          role: review.relation,
          text: review.content,
          childInfo: review.childName + (review.childAge ? `, ${review.childAge}` : ''),
        })))
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

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

  useEffect(() => {
    if (reviews.length === 0) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews.length])

  const stats = [
    { 
      value: '4.9', 
      label: 'Rating mediu', 
      icon: Icons.Star, 
      color: '#FCD700',
      bgColor: 'bg-[#FCD700]/15',
    },
    { 
      value: '500+', 
      label: 'Recenzii', 
      icon: Icons.Chat, 
      color: '#4CD0DC',
      bgColor: 'bg-[#4CD0DC]/15',
    },
    { 
      value: '98%', 
      label: 'Recomandă', 
      icon: Icons.ThumbsUp, 
      color: '#2BA84C',
      bgColor: 'bg-[#2BA84C]/15',
    },
    { 
      value: '100%', 
      label: 'Satisfacție', 
      icon: Icons.Heart, 
      color: '#FC0168',
      bgColor: 'bg-[#FC0168]/15',
    },
  ]

  const renderStars = (rating, size = 'w-5 h-5') => {
    return [...Array(5)].map((_, index) => (
      <Icons.Star
        key={index}
        className={`${size} ${index < rating ? 'text-[#FCD700]' : 'text-[#E2E8F0]'}`}
        filled={index < rating}
      />
    ))
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section
      id="recenzii"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-[#FFFBEB] to-white"
    >
      {/* Playful Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Colorful blobs */}
        <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-[#FCD700]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-16 sm:-right-32 w-[175px] sm:w-[250px] md:w-[350px] h-[175px] sm:h-[250px] md:h-[350px] bg-[#4CD0DC]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 sm:-bottom-20 left-1/4 w-[150px] sm:w-[220px] md:w-[300px] h-[150px] sm:h-[220px] md:h-[300px] bg-[#FC0168]/10 rounded-full blur-3xl" />
        
        {/* Floating shapes - hidden on very small screens */}
        <div className="hidden sm:block absolute top-32 left-[10%] w-6 h-6 bg-[#FCD700] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="hidden sm:block absolute top-48 right-[15%] w-4 h-4 bg-[#4CD0DC] rounded-lg rotate-45 opacity-70 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="hidden sm:block absolute bottom-32 left-[20%] w-5 h-5 bg-[#FC0168] rounded-full opacity-50 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }} />
        <div className="hidden md:block absolute top-1/3 right-[8%] w-3 h-3 bg-[#2BA84C] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }} />
        <div className="hidden md:block absolute bottom-48 right-[25%] w-4 h-4 bg-[#0536FC] rounded-lg rotate-12 opacity-50 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }} />
        
        {/* Stars decoration - hidden on small screens */}
        <Icons.Star className="hidden sm:block absolute top-24 right-[12%] w-6 h-6 md:w-8 md:h-8 text-[#FCD700] opacity-30 animate-pulse" />
        <Icons.Star className="hidden sm:block absolute bottom-24 left-[8%] w-5 h-5 md:w-6 md:h-6 text-[#FCD700] opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <Icons.Sparkles className="hidden md:block absolute top-40 left-[5%] w-8 h-8 md:w-10 md:h-10 text-[#4CD0DC] opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-[#FCD700]/15 border-2 border-[#FCD700]/30 rounded-full mb-4 sm:mb-6">
            <Icons.Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FCD700]" />
            <span 
              className="text-[#1E1E42] text-xs sm:text-sm font-bold"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Recenzii verificate
            </span>
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E1E42] mb-4 sm:mb-6 px-1"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Ce spun{' '}
            <span className="relative inline-block">
              <span className="text-[#FCD700]">părinții fericiți</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 md:h-4" viewBox="0 0 120 12" preserveAspectRatio="none">
                <path d="M2,8 Q30,2 60,8 T118,6" stroke="#4CD0DC" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="hidden sm:inline-block ml-1 sm:ml-2 animate-bounce" style={{ animationDuration: '2s' }}>
              <Icons.Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FC0168]" />
            </span>
          </h2>
          
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Poveștile de succes ale copiilor noștri sunt cea mai mare recompensă
          </p>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-8 sm:mb-12 md:mb-16 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="group relative p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  transitionDelay: `${index * 75}ms`,
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                  border: `2px solid ${stat.color}30`
                }}
              >
                {/* Decorative corner accent */}
                <div 
                  className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"
                  style={{ backgroundColor: stat.color }}
                />
                <div 
                  className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 rounded-full opacity-10"
                  style={{ backgroundColor: stat.color }}
                />
                
                {/* Floating mini shapes - hidden on small screens */}
                <div 
                  className="hidden sm:block absolute top-4 right-4 w-2 h-2 rounded-full opacity-40 animate-pulse"
                  style={{ backgroundColor: stat.color, animationDelay: `${index * 0.2}s` }}
                />
                
                <div className="relative text-center">
                  {/* Icon with gradient background */}
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                      boxShadow: `0 8px 24px ${stat.color}40`
                    }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  {/* Value with color */}
                  <p 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform duration-300"
                    style={{ fontFamily: 'var(--font-poppins)', color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  
                  {/* Label */}
                  <p 
                    className="text-[10px] sm:text-xs md:text-sm text-[#1E1E42] font-bold"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {stat.label}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div 
                    className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 rounded-full mx-auto mt-2 sm:mt-3 group-hover:w-14 sm:group-hover:w-16 md:group-hover:w-20 transition-all duration-300"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured Review */}
        {reviews.length > 0 && reviews[activeIndex] && (
        <div
          className={`mb-6 sm:mb-8 md:mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-[#E2E8F0] shadow-xl overflow-hidden">
            {/* Fun decorations - hidden on very small screens */}
            <div className="hidden sm:block absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#FCD700] rounded-lg sm:rounded-xl rotate-12 opacity-80" />
            <div className="hidden sm:block absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-5 h-5 sm:w-6 sm:h-6 bg-[#4CD0DC] rounded-full opacity-70" />
            <div className="hidden md:block absolute top-12 -right-2 w-4 h-4 bg-[#FC0168] rounded-full opacity-60" />
            
            {/* Quote icon */}
            <div 
              className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 opacity-10"
              style={{ color: reviews[activeIndex].color }}
            >
              <Icons.Quote className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
            </div>

            <div className="relative">
              {/* Stars */}
              <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4 md:mb-6">
                {renderStars(reviews[activeIndex].rating, 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6')}
                <span 
                  className="ml-2 sm:ml-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#2BA84C]/10 text-[#2BA84C] text-[10px] sm:text-xs md:text-sm font-bold rounded-full flex items-center gap-0.5 sm:gap-1"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  <Icons.CheckBadge className="w-3 h-3 sm:w-4 sm:h-4" />
                  Verificat
                </span>
              </div>
              
              {/* Review text */}
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#1E1E42] leading-relaxed mb-4 sm:mb-6 md:mb-8"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                "{reviews[activeIndex].text}"
              </p>

              {/* Author */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  {reviews[activeIndex].avatarUrl ? (
                    <img 
                      src={reviews[activeIndex].avatarUrl}
                      alt={reviews[activeIndex].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl object-cover shadow-lg flex-shrink-0"
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white shadow-lg flex-shrink-0"
                      style={{ backgroundColor: reviews[activeIndex].color }}
                    >
                      {reviews[activeIndex].initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p 
                      className="font-bold text-sm sm:text-base md:text-lg text-[#1E1E42]"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {reviews[activeIndex].name}
                    </p>
                    <p 
                      className="text-xs sm:text-sm text-[#64748B] font-medium"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      {reviews[activeIndex].role}{reviews[activeIndex].childInfo ? ` • ${reviews[activeIndex].childInfo}` : ''}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8FAFC] hover:bg-[#4CD0DC] text-[#64748B] hover:text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Recenzia anterioară"
                  >
                    <Icons.ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4CD0DC] hover:bg-[#3BB8C4] text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="Recenzia următoare"
                  >
                    <Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-[#E2E8F0] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FCD700] to-[#4CD0DC] transition-all duration-500"
                style={{ width: `${((activeIndex + 1) / reviews.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        )}

        {/* Review Cards */}
        {reviews.length > 0 && (
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {reviews.map((review, index) => (
            <button
              key={review.id}
              onClick={() => setActiveIndex(index)}
              className={`group text-left p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-white shadow-xl border-[#4CD0DC] scale-[1.02]'
                  : 'bg-white/70 hover:bg-white border-[#E2E8F0] hover:border-[#FCD700] hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                {renderStars(review.rating, 'w-3 h-3 sm:w-4 sm:h-4')}
              </div>
              
              {/* Text preview */}
              <p 
                className="text-[#64748B] text-[10px] sm:text-xs md:text-sm line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3 md:mb-4 leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                "{review.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3">
                {review.avatarUrl ? (
                  <img 
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                  />
                ) : (
                  <div 
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p 
                    className="font-bold text-[#1E1E42] text-[10px] sm:text-xs md:text-sm truncate"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {review.name}
                  </p>
                  <p 
                    className="text-[9px] sm:text-[10px] md:text-xs text-[#94A3B8] truncate"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {review.role}
                  </p>
                </div>
              </div>
              
              {/* Active indicator */}
              {activeIndex === index && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4CD0DC] rounded-full" />
              )}
            </button>
          ))}
        </div>
        )}

        {/* Navigation Dots */}
        {reviews.length > 0 && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-gradient-to-r from-[#FCD700] to-[#4CD0DC] w-6 sm:w-8 md:w-10'
                  : 'bg-[#E2E8F0] w-2 sm:w-3 hover:bg-[#4CD0DC]/50'
              }`}
              aria-label={`Mergi la recenzia ${index + 1}`}
            />
          ))}
        </div>
        )}        {/* CTA Section */}
        <div
          className={`mt-8 sm:mt-12 md:mt-16 text-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-[#1E1E42] to-[#2D2D5A] rounded-2xl sm:rounded-3xl shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FCD700]/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Icons.Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FCD700]" />
              </div>
              <div className="text-left">
                <p 
                  className="text-white text-sm sm:text-base font-bold"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Vrei să faci parte din poveste?
                </p>
                <p 
                  className="text-white/70 text-xs sm:text-sm"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  Alătură-te celor 500+ părinți mulțumiți
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="group flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#FCD700] to-[#FFE44D] text-[#1E1E42] text-sm sm:text-base font-bold rounded-lg sm:rounded-xl hover:shadow-[0_8px_24px_rgba(252,215,0,0.4)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Înscrie copilul
              <Icons.ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
