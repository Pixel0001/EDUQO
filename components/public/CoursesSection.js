'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

// Icon Components
const Icons = {
  // Category Icons
  Grid: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  Language: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
  ),
  Calculator: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
    </svg>
  ),
  Palette: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  Backpack: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 17.25c-2.97 0-5.828-.536-8.453-1.518a2.26 2.26 0 01-.673-.38m0 0A2.18 2.18 0 012.25 13.5V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0012.75 3h-1.5a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  // Course Icons
  BookOpen: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Globe: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  Puzzle: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
  PaintBrush: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  Scissors: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
    </svg>
  ),
  Academic: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  // Utility Icons
  Check: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Chat: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
}

export default function CoursesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('toate')
  const [hoveredCourse, setHoveredCourse] = useState(null)
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

  const categories = [
    { id: 'toate', name: 'Toate', icon: Icons.Grid },
    { id: 'limba', name: 'Limbă', icon: Icons.Language },
    { id: 'matematica', name: 'Matematică', icon: Icons.Calculator },
    { id: 'arta', name: 'Artă', icon: Icons.Palette },
    { id: 'pregatire', name: 'Pregătire', icon: Icons.Backpack },
  ]

  const courses = [
    {
      id: 1,
      title: 'Alfabetizare',
      category: 'limba',
      description: 'Descoperă literele și cuvintele într-un mod interactiv și distractiv',
      icon: Icons.BookOpen,
      color: '#4CD0DC',
      features: ['Recunoașterea literelor', 'Scriere de mână', 'Citire timpurie'],
      age: '4-7 ani',
      duration: '45 min',
    },
    {
      id: 2,
      title: 'Limba Engleză',
      category: 'limba',
      description: 'Învățăm engleza prin cântece, jocuri și conversații vesele',
      icon: Icons.Globe,
      color: '#0536FC',
      features: ['Vocabular de bază', 'Pronunție', 'Conversație'],
      age: '5-12 ani',
      duration: '50 min',
    },
    {
      id: 3,
      title: 'Matematică distractivă',
      category: 'matematica',
      description: 'Numerele și calculele devin aventuri captivante',
      icon: Icons.Puzzle,
      color: '#2BA84C',
      features: ['Numere și numărare', 'Operații simple', 'Gândire logică'],
      age: '5-10 ani',
      duration: '45 min',
    },
    {
      id: 4,
      title: 'Pictură și desen',
      category: 'arta',
      description: 'Exprimă-te prin culori, forme și imaginație nelimitată',
      icon: Icons.PaintBrush,
      color: '#FCD700',
      features: ['Tehnici de pictură', 'Desen creativ', 'Expresie artistică'],
      age: '4-12 ani',
      duration: '60 min',
    },
    {
      id: 5,
      title: 'Ateliere de creație',
      category: 'arta',
      description: 'Creăm și construim cu diverse materiale și tehnici',
      icon: Icons.Scissors,
      color: '#FC0168',
      features: ['Lucru manual', 'Colaje', 'Sculptură ușoară'],
      age: '4-10 ani',
      duration: '60 min',
    },
    {
      id: 6,
      title: 'Pregătire pentru școală',
      category: 'pregatire',
      description: 'Tot ce are nevoie micuțul tău pentru un start de succes',
      icon: Icons.Academic,
      color: '#0536FC',
      features: ['Abilități de bază', 'Disciplină pozitivă', 'Socializare'],
      age: '5-7 ani',
      duration: '90 min',
    },
  ]

  const filteredCourses = activeCategory === 'toate' 
    ? courses 
    : courses.filter(course => course.category === activeCategory)

  return (
    <section
      id="cursuri"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-white"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#4CD0DC]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FCD700]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2BA84C]/10 border border-[#2BA84C]/20 rounded-full mb-6">
            <Icons.Academic className="w-4 h-4 text-[#2BA84C]" />
            <span 
              className="text-[#2BA84C] text-sm font-semibold"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Cursurile noastre
            </span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E42] mb-6"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Aventuri educaționale pentru{' '}
            <span className="relative">
              <span className="text-[#FCD700]">fiecare copil</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FCD700]/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p 
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Descoperă cursurile noastre creative, unde învățarea devine o aventură plină de bucurie
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-2.5 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E1E42] text-white shadow-[0_8px_24px_rgba(30,30,66,0.25)]'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#4CD0DC] hover:text-[#1E1E42] hover:shadow-md'
                }`}
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                <IconComponent className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Courses Grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filteredCourses.map((course, index) => {
            const IconComponent = course.icon
            const isHovered = hoveredCourse === course.id
            return (
              <div
                key={course.id}
                className="group relative bg-white rounded-3xl shadow-[0_4px_20px_rgba(30,30,66,0.06)] hover:shadow-[0_20px_50px_rgba(30,30,66,0.12)] transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${course.color}08 0%, transparent 60%)`
                  }}
                />

                {/* Top accent line */}
                <div className="relative h-1.5 overflow-hidden">
                  <div 
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-x-100 scale-x-0 origin-left"
                    style={{ backgroundColor: course.color }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: `${course.color}40` }}
                  />
                </div>

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: `${course.color}12` }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: course.color }} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                        style={{ 
                          backgroundColor: `${course.color}12`,
                          color: course.color
                        }}
                      >
                        <Icons.Users className="w-3.5 h-3.5" />
                        {course.age}
                      </span>
                      <span 
                        className="inline-flex items-center gap-1 text-xs text-[#94A3B8]"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        <Icons.Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 
                    className="text-xl font-bold text-[#1E1E42] mb-2 group-hover:text-[#1E1E42] transition-colors"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {course.title}
                  </h3>
                  <p 
                    className="text-[#64748B] text-sm mb-5 line-clamp-2 leading-relaxed"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6">
                    {course.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-2.5 transition-transform duration-300"
                        style={{
                          transitionDelay: `${idx * 50}ms`,
                          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      >
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${course.color}15` }}
                        >
                          <Icons.Check className="w-3 h-3" style={{ color: course.color }} />
                        </div>
                        <span 
                          className="text-sm text-[#64748B]"
                          style={{ fontFamily: 'var(--font-quicksand)' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/inscriere"
                    className="relative flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold overflow-hidden transition-all duration-300 group/btn"
                    style={{ 
                      backgroundColor: course.color === '#FCD700' ? '#1E1E42' : course.color,
                      color: 'white',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    <span className="relative z-10">Înscrie-te acum</span>
                    <Icons.ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    <div 
                      className="absolute inset-0 bg-[#4CD0DC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-[#F8FAFC] to-white rounded-3xl border border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4CD0DC]/10 flex items-center justify-center">
                <Icons.Sparkles className="w-6 h-6 text-[#4CD0DC]" />
              </div>
              <div className="text-left">
                <p 
                  className="text-[#1E1E42] font-semibold"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Nu găsești ce cauți?
                </p>
                <p 
                  className="text-sm text-[#64748B]"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  Oferim și cursuri personalizate
                </p>
              </div>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1E42] text-white font-semibold rounded-2xl hover:bg-[#2d2d5a] transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <Icons.Chat className="w-5 h-5" />
              <span>Contactează-ne</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
