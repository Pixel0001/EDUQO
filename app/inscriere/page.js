'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  AcademicCapIcon,
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

const CLASE = [
  { id: 'pregatitoare', name: 'Pregătitoare', short: 'Preg' },
  { id: '1', name: 'Clasa I', short: 'I' },
  { id: '2', name: 'Clasa a II-a', short: 'II' },
  { id: '3', name: 'Clasa a III-a', short: 'III' },
  { id: '4', name: 'Clasa a IV-a', short: 'IV' },
  { id: '5', name: 'Clasa a V-a', short: 'V' },
  { id: '6', name: 'Clasa a VI-a', short: 'VI' },
  { id: '7', name: 'Clasa a VII-a', short: 'VII' },
  { id: '8', name: 'Clasa a VIII-a', short: 'VIII' },
  { id: '9', name: 'Clasa a IX-a', short: 'IX' },
  { id: '10', name: 'Clasa a X-a', short: 'X' },
  { id: '11', name: 'Clasa a XI-a', short: 'XI' },
  { id: '12', name: 'Clasa a XII-a', short: 'XII' }
]

const STEPS = [
  { id: 1, title: 'Curs', icon: BookOpenIcon, description: 'Alege cursul dorit' },
  { id: 2, title: 'Elev', icon: UserGroupIcon, description: 'Date despre elev' },
  { id: 3, title: 'Contact', icon: PhoneIcon, description: 'Date de contact' },
  { id: 4, title: 'Confirmare', icon: CheckCircleIcon, description: 'Verifică și trimite' }
]

const BENEFITS = [
  { icon: StarIcon, text: 'Profesori cu experiență', color: '#FCD700' },
  { icon: LightBulbIcon, text: 'Metode moderne de predare', color: '#4CD0DC' },
  { icon: HeartIcon, text: 'Grupe mici de elevi', color: '#FC0168' },
  { icon: RocketLaunchIcon, text: 'Rezultate garantate', color: '#2BA84C' }
]

export default function InscrieriPage() {
  const [cursuri, setCursuri] = useState([])
  const [loadingCursuri, setLoadingCursuri] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    numeParinte: '',
    numeCopil: '',
    email: '',
    telefon: '',
    clasa: '',
    cursuriSelectate: '',
    mesaj: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCursuri()
  }, [])

  const fetchCursuri = async () => {
    try {
      const res = await fetch('/api/public/courses')
      if (res.ok) {
        const data = await res.json()
        setCursuri(data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoadingCursuri(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleCursChange = (cursId) => {
    setFormData(prev => ({
      ...prev,
      cursuriSelectate: cursId
    }))
    setError('')
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.cursuriSelectate) {
          setError('Te rugăm să selectezi un curs')
          return false
        }
        break
      case 2:
        if (!formData.numeCopil || !formData.clasa) {
          setError('Te rugăm să completezi toate câmpurile obligatorii')
          return false
        }
        break
      case 3:
        if (!formData.numeParinte || !formData.email || !formData.telefon) {
          setError('Te rugăm să completezi toate câmpurile obligatorii')
          return false
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          setError('Te rugăm să introduci o adresă de email validă')
          return false
        }
        break
    }
    return true
  }

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      setError('')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/inscrieri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare. Vă rugăm încercați din nou.')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedCourseName = () => {
    if (formData.cursuriSelectate === 'selectam-impreuna') {
      return 'Selectăm împreună'
    }
    const curs = cursuri.find(c => c.id === formData.cursuriSelectate)
    return curs?.title || ''
  }

  const getSelectedClasaName = () => {
    const clasa = CLASE.find(c => c.id === formData.clasa)
    return clasa?.name || ''
  }

  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('ro-RO').format(price) + ' MDL'
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex items-center justify-center p-4">
        {/* Success Animation Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#2BA84C]/10 to-[#4CD0DC]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#FCD700]/10 to-[#FC0168]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-lg w-full">
          {/* Confetti Animation */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-bounce"
                style={{
                  backgroundColor: ['#4CD0DC', '#FCD700', '#FC0168', '#2BA84C', '#0536FC'][i % 5],
                  left: `${(i - 10) * 15}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + (i % 3) * 0.3}s`
                }}
              />
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-[#4CD0DC]/20 border border-slate-100">
            {/* Success Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] rounded-full animate-ping opacity-20" />
              <div className="relative w-full h-full bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] rounded-full flex items-center justify-center shadow-lg shadow-[#2BA84C]/30">
                <CheckCircleSolid className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 
              className="text-2xl md:text-3xl font-bold text-[#1E1E42] mb-4"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              🎉 Felicitări!
            </h1>
            <p 
              className="text-lg text-[#1E1E42] font-medium mb-2"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              Înscriere trimisă cu succes!
            </p>
            <p 
              className="text-slate-600 mb-8"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              Am primit cererea de înscriere pentru <span className="font-semibold text-[#4CD0DC]">{formData.numeCopil}</span>. 
              Te vom contacta în cel mai scurt timp posibil pentru confirmare și detalii suplimentare.
            </p>

            {/* Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Rezumat înscriere</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Curs:</span>
                  <span className="font-medium text-[#1E1E42]">{getSelectedCourseName()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Elev:</span>
                  <span className="font-medium text-[#1E1E42]">{formData.numeCopil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Clasă:</span>
                  <span className="font-medium text-[#1E1E42]">{getSelectedClasaName()}</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#4CD0DC]/30 hover:-translate-y-1 transition-all duration-300"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-[#4CD0DC]/10 to-[#0536FC]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-[#FCD700]/10 to-[#FC0168]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#4CD0DC]/5 to-transparent rounded-full blur-3xl" />
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-lg shadow-[#4CD0DC]/20 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo eduquo.png"
                  alt="EDUQO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span 
                className="text-xl md:text-2xl font-bold text-[#1E1E42]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                EDUQO
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-[#1E1E42] transition-colors px-4 py-2 rounded-xl hover:bg-slate-100"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>Înapoi</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FCD700]/20 to-[#FC0168]/20 border border-[#FCD700]/30 rounded-full mb-6">
            <SparklesIcon className="w-4 h-4 text-[#FCD700] mr-2" />
            <span className="text-sm font-medium text-[#1E1E42]" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>Înscrieri 2025</span>
          </div>
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <span className="text-[#1E1E42]">Începe aventura</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD0DC] to-[#0536FC]">educațională</span>
          </h1>
          <p 
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            Completează formularul în doar câteva minute și fă primul pas către succesul copilului tău!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] shadow-lg shadow-[#2BA84C]/30' 
                          : isActive 
                            ? 'bg-gradient-to-br from-[#4CD0DC] to-[#0536FC] shadow-lg shadow-[#4CD0DC]/30 scale-110' 
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleSolid className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <span 
                      className={`text-xs md:text-sm font-medium mt-2 hidden sm:block ${
                        isActive ? 'text-[#4CD0DC]' : isCompleted ? 'text-[#2BA84C]' : 'text-slate-400'
                      }`}
                      style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-8 md:w-16 h-1 mx-2 rounded-full transition-all duration-500 ${
                      currentStep > step.id ? 'bg-gradient-to-r from-[#2BA84C] to-[#4CD0DC]' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Step 1: Course Selection */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4CD0DC] to-[#0536FC] rounded-xl flex items-center justify-center">
                        <BookOpenIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Alege cursul dorit
                        </h2>
                        <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                          Selectează cursul la care dorești să înscrii copilul
                        </p>
                      </div>
                    </div>

                    {loadingCursuri ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#4CD0DC] border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Opțiunea "Selectăm împreună" */}
                        <div
                          onClick={() => handleCursChange('selectam-impreuna')}
                          className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.cursuriSelectate === 'selectam-impreuna'
                              ? 'border-[#FCD700] bg-gradient-to-br from-[#FCD700]/10 to-[#FCD700]/5 shadow-lg shadow-[#FCD700]/20'
                              : 'border-slate-200 hover:border-[#FCD700]/50 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              formData.cursuriSelectate === 'selectam-impreuna'
                                ? 'bg-[#FCD700] text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}>
                              <LightBulbIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                                🤝 Nu sunt sigur - Selectăm împreună
                              </h3>
                              <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                                Te vom contacta pentru a găsi cursul potrivit
                              </p>
                            </div>
                            {formData.cursuriSelectate === 'selectam-impreuna' && (
                              <CheckCircleSolid className="w-6 h-6 text-[#FCD700]" />
                            )}
                          </div>
                        </div>

                        {/* Cursuri Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {cursuri.map((curs) => (
                            <div
                              key={curs.id}
                              onClick={() => handleCursChange(curs.id)}
                              className={`relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                                formData.cursuriSelectate === curs.id
                                  ? 'border-[#4CD0DC] shadow-lg shadow-[#4CD0DC]/20'
                                  : 'border-slate-200 hover:border-[#4CD0DC]/50 hover:shadow-md'
                              }`}
                            >
                              {/* Course Image */}
                              <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                                {(curs.mainImageUrl || curs.images?.[0]) ? (
                                  <Image
                                    src={curs.mainImageUrl || curs.images[0]}
                                    alt={curs.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <AcademicCapIcon className="w-12 h-12 text-slate-300" />
                                  </div>
                                )}
                                {/* Overlay */}
                                <div className={`absolute inset-0 transition-all duration-300 ${
                                  formData.cursuriSelectate === curs.id
                                    ? 'bg-gradient-to-t from-[#4CD0DC]/20 to-transparent'
                                    : 'bg-gradient-to-t from-black/30 to-transparent'
                                }`} />
                                {/* Price Badge */}
                                {curs.discountPrice && (
                                  <div className="absolute top-2 right-2 bg-[#FC0168] text-white text-xs font-bold px-2 py-1 rounded-lg">
                                    -{Math.round((1 - curs.discountPrice / curs.price) * 100)}%
                                  </div>
                                )}
                                {/* Selected Indicator */}
                                {formData.cursuriSelectate === curs.id && (
                                  <div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-lg">
                                    <CheckCircleSolid className="w-5 h-5 text-[#4CD0DC]" />
                                  </div>
                                )}
                              </div>
                              {/* Course Info */}
                              <div className="p-4">
                                <h3 className="font-semibold text-[#1E1E42] mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                                  {curs.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                  {curs.price && (
                                    <div className="flex items-center gap-2">
                                      {curs.discountPrice ? (
                                        <>
                                          <span className="text-sm font-bold text-[#4CD0DC]">{formatPrice(curs.discountPrice)}</span>
                                          <span className="text-xs text-slate-400 line-through">{formatPrice(curs.price)}</span>
                                        </>
                                      ) : (
                                        <span className="text-sm font-bold text-[#4CD0DC]">{formatPrice(curs.price)}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Student Info */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FCD700] to-[#FC0168] rounded-xl flex items-center justify-center">
                        <UserGroupIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Date despre elev
                        </h2>
                        <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                          Spune-ne mai multe despre copilul tău
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Nume Copil */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Numele și prenumele copilului *
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4CD0DC]" />
                          <input
                            type="text"
                            name="numeCopil"
                            value={formData.numeCopil}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[#1E1E42] placeholder-slate-400 focus:outline-none focus:border-[#4CD0DC] focus:bg-white transition-all duration-300"
                            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            placeholder="Ex: Alexandru Popescu"
                          />
                        </div>
                      </div>

                      {/* Clasa */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-3" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Clasa copilului *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {CLASE.map(clasa => (
                            <button
                              key={clasa.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, clasa: clasa.id }))}
                              className={`px-4 py-2.5 rounded-xl border-2 text-center transition-all duration-300 font-semibold text-sm ${
                                formData.clasa === clasa.id
                                  ? 'border-[#4CD0DC] bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white shadow-lg shadow-[#4CD0DC]/30'
                                  : 'border-slate-200 hover:border-[#4CD0DC] text-slate-600 hover:bg-slate-50'
                              }`}
                              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            >
                              {clasa.short}
                            </button>
                          ))}
                        </div>
                        {formData.clasa && (
                          <p className="mt-3 text-sm text-[#4CD0DC] font-medium" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                            ✓ {CLASE.find(c => c.id === formData.clasa)?.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] rounded-xl flex items-center justify-center">
                        <PhoneIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Date de contact
                        </h2>
                        <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                          Cum te putem contacta?
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Nume Părinte */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Numele părintelui/tutorelui *
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FCD700]" />
                          <input
                            type="text"
                            name="numeParinte"
                            value={formData.numeParinte}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[#1E1E42] placeholder-slate-400 focus:outline-none focus:border-[#4CD0DC] focus:bg-white transition-all duration-300"
                            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            placeholder="Ex: Maria Popescu"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Adresa de email *
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FC0168]" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[#1E1E42] placeholder-slate-400 focus:outline-none focus:border-[#4CD0DC] focus:bg-white transition-all duration-300"
                            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            placeholder="email@exemplu.com"
                          />
                        </div>
                      </div>

                      {/* Telefon */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Număr de telefon *
                        </label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2BA84C]" />
                          <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[#1E1E42] placeholder-slate-400 focus:outline-none focus:border-[#4CD0DC] focus:bg-white transition-all duration-300"
                            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            placeholder="06XX XXX XXX"
                          />
                        </div>
                      </div>

                      {/* Mesaj */}
                      <div>
                        <label className="block text-sm font-semibold text-[#1E1E42] mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Mesaj suplimentar <span className="font-normal text-slate-400">(opțional)</span>
                        </label>
                        <div className="relative">
                          <ChatBubbleBottomCenterTextIcon className="absolute left-4 top-4 w-5 h-5 text-[#0536FC]" />
                          <textarea
                            name="mesaj"
                            value={formData.mesaj}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[#1E1E42] placeholder-slate-400 focus:outline-none focus:border-[#4CD0DC] focus:bg-white transition-all duration-300 resize-none"
                            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                            placeholder="Întrebări, preferințe de program, etc..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0536FC] to-[#4CD0DC] rounded-xl flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          Verifică și confirmă
                        </h2>
                        <p className="text-sm text-slate-500" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                          Verifică datele înainte de trimitere
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Summary Cards */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Course Card */}
                        <div className="bg-gradient-to-br from-[#4CD0DC]/10 to-[#0536FC]/10 rounded-2xl p-5 border border-[#4CD0DC]/20">
                          <div className="flex items-center gap-2 text-[#4CD0DC] mb-3">
                            <BookOpenIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Curs ales</span>
                          </div>
                          <p className="text-lg font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                            {getSelectedCourseName()}
                          </p>
                        </div>

                        {/* Student Card */}
                        <div className="bg-gradient-to-br from-[#FCD700]/10 to-[#FC0168]/10 rounded-2xl p-5 border border-[#FCD700]/20">
                          <div className="flex items-center gap-2 text-[#FCD700] mb-3">
                            <UserGroupIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Elev</span>
                          </div>
                          <p className="text-lg font-bold text-[#1E1E42]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                            {formData.numeCopil}
                          </p>
                          <p className="text-sm text-slate-500">{getSelectedClasaName()}</p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="bg-gradient-to-br from-[#2BA84C]/10 to-[#4CD0DC]/10 rounded-2xl p-5 border border-[#2BA84C]/20">
                        <div className="flex items-center gap-2 text-[#2BA84C] mb-4">
                          <PhoneIcon className="w-5 h-5" />
                          <span className="text-sm font-semibold">Date de contact</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Părinte</p>
                            <p className="font-semibold text-[#1E1E42]">{formData.numeParinte}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Email</p>
                            <p className="font-semibold text-[#1E1E42] text-sm truncate">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Telefon</p>
                            <p className="font-semibold text-[#1E1E42]">{formData.telefon}</p>
                          </div>
                        </div>
                        {formData.mesaj && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Mesaj</p>
                            <p className="text-sm text-[#1E1E42]">{formData.mesaj}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-[#1E1E42] hover:bg-slate-100 rounded-xl transition-all duration-300"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      <ArrowLeftIcon className="w-5 h-5" />
                      Înapoi
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4CD0DC]/30 hover:-translate-y-0.5 transition-all duration-300"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Continuă
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2BA84C] to-[#4CD0DC] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#2BA84C]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <RocketLaunchIcon className="w-5 h-5" />
                          Trimite înscriere
                        </>
                      )}
                    </button>
                  )}
                </div>

                {currentStep === 4 && (
                  <p className="text-slate-400 text-xs text-center mt-4" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                    Prin trimiterea formularului, ești de acord cu procesarea datelor conform{' '}
                    <Link href="/gdpr" className="text-[#4CD0DC] hover:underline">GDPR</Link>.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-bold text-[#1E1E42] mb-4" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                De ce EDUQO?
              </h3>
              <div className="space-y-4">
                {BENEFITS.map((benefit, idx) => {
                  const Icon = benefit.icon
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${benefit.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: benefit.color }} />
                      </div>
                      <span className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                        {benefit.text}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#1E1E42] to-[#15152F] rounded-3xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                Ai întrebări?
              </h3>
              <p className="text-sm text-white/70 mb-4" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                Nu ezita să ne contactezi pentru orice nelămuriri.
              </p>
              <div className="space-y-3">
                <a href="tel:+37360000000" className="flex items-center gap-3 text-sm text-white/80 hover:text-[#4CD0DC] transition-colors">
                  <PhoneIcon className="w-5 h-5" />
                  +373 60 000 000
                </a>
                <a href="mailto:contact@eduqo.md" className="flex items-center gap-3 text-sm text-white/80 hover:text-[#4CD0DC] transition-colors">
                  <EnvelopeIcon className="w-5 h-5" />
                  contact@eduqo.md
                </a>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-slate-50 rounded-3xl p-6 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-[#FCD700] fill-[#FCD700]" />
                ))}
              </div>
              <p className="text-sm text-slate-600 font-medium" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
                Peste <span className="text-[#1E1E42] font-bold">500+</span> elevi fericiți
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
