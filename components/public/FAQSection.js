'use client'

import { useEffect, useState, useRef } from 'react'

// Icon Components
const Icons = {
  QuestionMark: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
  Cake: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5a9 9 0 11-18 0 9 9 0 0118 0zM12 4.5v.75" />
    </svg>
  ),
  Book: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Users: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  Sun: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  ChartBar: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Plus: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Minus: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  ),
  Chat: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  Phone: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  LightBulb: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
}

export default function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)
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

  const faqs = [
    {
      question: 'De la ce vârstă poate începe copilul meu cursurile?',
      answer: 'Cursurile EDUQO sunt adaptate pentru copii cu vârste între 3 și 12 ani. Avem programe speciale pentru fiecare grupă de vârstă, astfel încât activitățile să fie potrivite pentru nivelul de dezvoltare al fiecărui copil.',
      icon: Icons.Cake,
      color: '#FC0168',
      bgColor: 'bg-[#FC0168]/10',
    },
    {
      question: 'Cum se desfășoară o lecție tipică?',
      answer: 'Fiecare lecție durează 45-60 de minute și combină activități interactive, jocuri educative și momente de creație. Folosim metode moderne de predare care mențin copiii implicați și entuziasmați să învețe.',
      icon: Icons.Book,
      color: '#0536FC',
      bgColor: 'bg-[#0536FC]/10',
    },
    {
      question: 'Câți copii sunt într-un grup?',
      answer: 'Grupele noastre au maxim 6-8 copii pentru a asigura atenție individualizată fiecărui cursant. Astfel, profesorii pot adapta ritmul și pot oferi feedback personalizat.',
      icon: Icons.Users,
      color: '#4CD0DC',
      bgColor: 'bg-[#4CD0DC]/10',
    },
    {
      question: 'Ce se întâmplă dacă copilul meu absentează?',
      answer: 'Oferim posibilitatea de recuperare a lecțiilor pierdute. Puteți programa o sesiune de recuperare contactând echipa noastră cu cel puțin 24 de ore înainte.',
      icon: Icons.Calendar,
      color: '#2BA84C',
      bgColor: 'bg-[#2BA84C]/10',
    },
    {
      question: 'Oferiți cursuri și în timpul vacanțelor?',
      answer: 'Da! În perioadele de vacanță organizăm tabere și ateliere tematice speciale, cu activități creative și educative distractive pentru copii.',
      icon: Icons.Sun,
      color: '#FCD700',
      bgColor: 'bg-[#FCD700]/15',
    },
    {
      question: 'Cum pot urmări progresul copilului meu?',
      answer: 'Părinții primesc rapoarte periodice despre evoluția copilului și pot programa întâlniri cu profesorii pentru discuții detaliate. De asemenea, avem o platformă online unde puteți vedea activitățile și realizările copilului.',
      icon: Icons.ChartBar,
      color: '#1E1E42',
      bgColor: 'bg-[#1E1E42]/10',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-[#FFF8E7] to-white"
    >
      {/* Playful Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Colorful blobs */}
        <div className="absolute -top-10 sm:-top-20 -right-10 sm:-right-20 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-[#FCD700]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-16 sm:-left-32 w-[175px] sm:w-[250px] md:w-[350px] h-[175px] sm:h-[250px] md:h-[350px] bg-[#4CD0DC]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 sm:-bottom-20 right-1/3 w-[150px] sm:w-[220px] md:w-[300px] h-[150px] sm:h-[220px] md:h-[300px] bg-[#FC0168]/10 rounded-full blur-3xl" />
        
        {/* Floating shapes - hidden on very small screens */}
        <div className="hidden sm:block absolute top-32 left-[8%] w-6 h-6 bg-[#FCD700] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="hidden sm:block absolute top-48 right-[12%] w-4 h-4 bg-[#4CD0DC] rounded-lg rotate-45 opacity-70 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="hidden sm:block absolute bottom-32 left-[15%] w-5 h-5 bg-[#FC0168] rounded-full opacity-50 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1s' }} />
        <div className="hidden md:block absolute top-1/3 right-[6%] w-3 h-3 bg-[#2BA84C] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }} />
        <div className="hidden md:block absolute bottom-48 right-[20%] w-4 h-4 bg-[#0536FC] rounded-lg rotate-12 opacity-50 animate-bounce" style={{ animationDuration: '2.6s', animationDelay: '0.8s' }} />
        
        {/* Decorative icons - hidden on small screens */}
        <Icons.QuestionMark className="hidden sm:block absolute top-24 right-[10%] w-8 h-8 md:w-12 md:h-12 text-[#4CD0DC] opacity-20 animate-pulse" />
        <Icons.LightBulb className="hidden sm:block absolute bottom-32 left-[5%] w-8 h-8 md:w-10 md:h-10 text-[#FCD700] opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
        <Icons.Sparkles className="hidden md:block absolute top-1/2 right-[5%] w-6 h-6 md:w-8 md:h-8 text-[#FC0168] opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-[#0536FC]/10 border-2 border-[#0536FC]/20 rounded-full mb-4 sm:mb-6">
            <Icons.QuestionMark className="w-4 h-4 sm:w-5 sm:h-5 text-[#0536FC]" />
            <span 
              className="text-[#1E1E42] text-xs sm:text-sm font-bold"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Întrebări frecvente
            </span>
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E1E42] mb-4 sm:mb-6 px-1"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Răspunsuri la{' '}
            <span className="relative inline-block">
              <span className="text-[#0536FC]">curiozități</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 md:h-4" viewBox="0 0 120 12" preserveAspectRatio="none">
                <path d="M2,8 Q30,2 60,8 T118,6" stroke="#FCD700" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="hidden sm:inline-block ml-1 sm:ml-2 animate-bounce" style={{ animationDuration: '2s' }}>
              <Icons.LightBulb className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FCD700]" />
            </span>
          </h2>
          
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed px-2"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Tot ce trebuie să știi despre cursurile EDUQO pentru copii
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const IconComponent = faq.icon
            const isOpen = openIndex === index
            
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 border-2 ${
                    isOpen
                      ? 'bg-white shadow-xl border-[#4CD0DC]'
                      : 'bg-white/70 border-[#E2E8F0] hover:bg-white hover:border-[#4CD0DC]/50 hover:shadow-lg'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 text-left group"
                  >
                    {/* Icon */}
                    <div 
                      className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 ${faq.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: faq.color }} />
                    </div>
                    
                    {/* Question */}
                    <span 
                      className="flex-1 text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#1E1E42] leading-tight sm:leading-normal"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      {faq.question}
                    </span>
                    
                    {/* Toggle button */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        isOpen
                          ? 'bg-[#4CD0DC] text-white rotate-0'
                          : 'bg-[#F8FAFC] text-[#64748B] group-hover:bg-[#4CD0DC]/10 group-hover:text-[#4CD0DC]'
                      }`}
                    >
                      {isOpen ? (
                        <Icons.Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      ) : (
                        <Icons.Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      )}
                    </div>
                  </button>
                  
                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pl-[3rem] sm:pl-[3.5rem] md:pl-[4.5rem] lg:pl-[5.5rem]">
                      <p 
                        className="text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Box */}
        <div
          className={`mt-8 sm:mt-12 md:mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative bg-gradient-to-br from-[#1E1E42] via-[#2D2D5A] to-[#1E1E42] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
            {/* Colorful decorative elements - smaller on mobile */}
            <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-[#4CD0DC]/30 rounded-full blur-xl" />
            <div className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-12 w-28 sm:w-36 md:w-48 h-28 sm:h-36 md:h-48 bg-[#FCD700]/25 rounded-full blur-xl" />
            <div className="hidden sm:block absolute top-1/4 right-20 w-4 h-4 md:w-6 md:h-6 bg-[#FC0168] rounded-full opacity-80 animate-bounce" style={{ animationDuration: '2s' }} />
            <div className="hidden sm:block absolute bottom-1/4 left-16 w-3 h-3 md:w-4 md:h-4 bg-[#4CD0DC] rounded-lg rotate-45 opacity-70 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="hidden md:block absolute top-1/2 right-1/4 w-3 h-3 bg-[#FCD700] rounded-full opacity-80 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <div className="hidden md:block absolute bottom-10 right-16 w-5 h-5 bg-[#2BA84C] rounded-full opacity-60 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }} />
            
            {/* Stars - hidden on small screens */}
            <Icons.Sparkles className="hidden sm:block absolute top-6 sm:top-8 left-1/4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#FCD700] opacity-40 animate-pulse" />
            <Icons.Sparkles className="hidden md:block absolute bottom-12 right-1/3 w-5 h-5 md:w-6 md:h-6 text-[#4CD0DC] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-4 sm:gap-6 md:gap-8">
              {/* Left side */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FCD700] to-[#FFE44D] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#FCD700]/30 flex-shrink-0">
                    <Icons.Chat className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1E1E42]" />
                  </div>
                  <div>
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
                      style={{ fontFamily: 'var(--font-poppins)', color: '#FFFFFF' }}
                    >
                      Ai alte întrebări?
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start mt-0.5 sm:mt-1">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#2BA84C] rounded-full animate-pulse"></span>
                      <span 
                        className="text-[#2BA84C] text-xs sm:text-sm font-bold"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        Suntem online acum!
                      </span>
                    </div>
                  </div>
                </div>
                <p 
                  className="text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0"
                  style={{ fontFamily: 'var(--font-quicksand)', color: 'rgba(255,255,255,0.8)' }}
                >
                  Echipa noastră este aici să te ajute cu orice nelămurire ai avea
                </p>
              </div>
              
              {/* Right side - buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#4CD0DC] to-[#3BB8C4] text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:shadow-[0_12px_32px_rgba(76,208,220,0.5)] hover:scale-105 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  Trimite un mesaj
                  <Icons.ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+37360123456"
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#FCD700] to-[#FFE44D] text-[#1E1E42] text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl hover:shadow-[0_12px_32px_rgba(252,215,0,0.4)] hover:scale-105 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  <Icons.Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sună-ne acum
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className={`mt-6 sm:mt-8 md:mt-12 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '500+', label: 'Părinți mulțumiți', color: '#4CD0DC' },
            { value: '24h', label: 'Timp de răspuns', color: '#2BA84C' },
            { value: '100%', label: 'Satisfacție', color: '#FCD700' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-xl sm:rounded-2xl border-2 border-[#E2E8F0] hover:border-[#4CD0DC] hover:shadow-lg transition-all duration-300"
            >
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1"
                style={{ fontFamily: 'var(--font-poppins)', color: stat.color }}
              >
                {stat.value}
              </p>
              <p 
                className="text-[10px] sm:text-xs md:text-sm text-[#64748B] font-medium leading-tight"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
