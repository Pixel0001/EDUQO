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
  SparklesIcon
} from '@heroicons/react/24/outline'

const CLASE = [
  { id: 'pregatitoare', name: 'Clasa pregătitoare' },
  { id: '1', name: 'Clasa I' },
  { id: '2', name: 'Clasa a II-a' },
  { id: '3', name: 'Clasa a III-a' },
  { id: '4', name: 'Clasa a IV-a' },
  { id: '5', name: 'Clasa a V-a' },
  { id: '6', name: 'Clasa a VI-a' },
  { id: '7', name: 'Clasa a VII-a' },
  { id: '8', name: 'Clasa a VIII-a' },
  { id: '9', name: 'Clasa a IX-a' },
  { id: '10', name: 'Clasa a X-a' },
  { id: '11', name: 'Clasa a XI-a' }
]

export default function InscrieriPage() {
  const [cursuri, setCursuri] = useState([])
  const [loadingCursuri, setLoadingCursuri] = useState(true)
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
  }

  const handleCursChange = (cursId) => {
    setFormData(prev => ({
      ...prev,
      cursuriSelectate: cursId
    }))
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E1E42] via-[#1E1E42] to-[#15152F] flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-white/10 shadow-2xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#2BA84C] to-[#4CD0DC] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4 px-2" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>Mulțumim pentru înscriere!</h1>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] mb-4 sm:mb-6 md:mb-8 px-2" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
            Am primit cererea dumneavoastră de înscriere. Vă vom contacta în cel mai scurt timp posibil pentru confirmare și detalii.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-semibold hover:from-[#3BB8C4] hover:to-[#0429CC] transition-all duration-300 shadow-lg shadow-[#4CD0DC]/30"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E42] via-[#1E1E42] to-[#15152F] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-[#4CD0DC]/20 to-[#0536FC]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-br from-[#FCD700]/15 to-[#FC0168]/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 group">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-[#4CD0DC]/30 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo eduquo.png"
                  alt="EDUQO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span 
                className="text-lg sm:text-xl md:text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                EDUQO
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 text-[#94A3B8] hover:text-white transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>Înapoi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FCD700]/10 border border-[#FCD700]/30 rounded-full mb-4 sm:mb-6">
            <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCD700] mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-[#FCD700]" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>Înscrieri 2025</span>
          </div>
          <h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <span className="text-white">Formular de</span> <span className="text-[#4CD0DC]">Înscriere</span>
          </h1>
          <p 
            className="text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto px-2"
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            Completați formularul de mai jos pentru a înscrie copilul dumneavoastră la cursurile EDUQO.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FC0168]/10 border border-[#FC0168]/30 rounded-xl text-[#FC0168] text-xs sm:text-sm" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {/* Nume Părinte */}
            <div>
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Numele părintelui/tutorelui *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
                <input
                  type="text"
                  name="numeParinte"
                  value={formData.numeParinte}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  placeholder="Ex: Maria Popescu"
                />
              </div>
            </div>

            {/* Nume Copil */}
            <div>
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Numele copilului *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#FCD700]" />
                <input
                  type="text"
                  name="numeCopil"
                  value={formData.numeCopil}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  placeholder="Ex: Alex Popescu"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Email *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#FC0168]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  placeholder="email@exemplu.com"
                />
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Telefon *
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#2BA84C]" />
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  placeholder="06XX XXX XX"
                />
              </div>
            </div>

            {/* Clasa */}
            <div className="md:col-span-2">
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Clasa copilului *
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#0536FC]" />
                <select
                  name="clasa"
                  value={formData.clasa}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                >
                  <option value="" className="bg-[#1E1E42] text-white">Selectează clasa</option>
                  {CLASE.map(clasa => (
                    <option key={clasa.id} value={clasa.id} className="bg-[#1E1E42] text-white">{clasa.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#94A3B8] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Cursuri */}
            <div className="md:col-span-2">
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Cursuri dorite *
              </label>
              {loadingCursuri ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-[#4CD0DC] border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {/* Opțiunea "Selectăm împreună" */}
                  <label
                    className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.cursuriSelectate === 'selectam-impreuna'
                        ? 'bg-[#FCD700]/20 border-[#FCD700] text-white'
                        : 'bg-white/5 border-white/20 text-[#94A3B8] hover:border-[#FCD700]/50 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="curs"
                      checked={formData.cursuriSelectate === 'selectam-impreuna'}
                      onChange={() => handleCursChange('selectam-impreuna')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.cursuriSelectate === 'selectam-impreuna'
                        ? 'bg-[#FCD700] border-[#FCD700]'
                        : 'border-white/40'
                    }`}>
                      {formData.cursuriSelectate === 'selectam-impreuna' && (
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#1E1E42] rounded-full" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-medium" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>Selectăm împreună</span>
                  </label>

                  {/* Cursurile din baza de date */}
                  {cursuri.map(curs => (
                    <label
                      key={curs.id}
                      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.cursuriSelectate === curs.id
                          ? 'bg-[#4CD0DC]/20 border-[#4CD0DC] text-white'
                          : 'bg-white/5 border-white/20 text-[#94A3B8] hover:border-[#4CD0DC]/50 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="curs"
                        checked={formData.cursuriSelectate === curs.id}
                        onChange={() => handleCursChange(curs.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.cursuriSelectate === curs.id
                          ? 'bg-[#4CD0DC] border-[#4CD0DC]'
                          : 'border-white/40'
                      }`}>
                        {formData.cursuriSelectate === curs.id && (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#1E1E42] rounded-full" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-tight" style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}>{curs.title}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Mesaj */}
            <div className="md:col-span-2">
              <label 
                className="block text-white text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Mesaj suplimentar (opțional)
              </label>
              <div className="relative">
                <ChatBubbleBottomCenterTextIcon className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-[#4CD0DC]" />
                <textarea
                  name="mesaj"
                  value={formData.mesaj}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4CD0DC] focus:bg-white/10 transition-all duration-300 resize-none"
                  style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
                  placeholder="Menționați orice informații suplimentare relevante..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-5 sm:mt-6 md:mt-8">
            <button
              type="submit"
              disabled={isSubmitting || formData.cursuriSelectate.length === 0}
              className="w-full py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:from-[#3BB8C4] hover:to-[#0429CC] transition-all duration-300 shadow-lg shadow-[#4CD0DC]/30 hover:shadow-xl hover:shadow-[#4CD0DC]/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Se trimite...</span>
                </>
              ) : (
                <>
                  <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Trimite cererea de înscriere</span>
                  <span className="sm:hidden">Trimite înscriere</span>
                </>
              )}
            </button>
          </div>

          <p 
            className="text-[#64748B] text-[10px] sm:text-xs text-center mt-3 sm:mt-4 px-2"
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            Prin trimiterea formularului, sunteți de acord cu procesarea datelor personale conform GDPR.
          </p>
        </form>
      </div>
    </div>
  )
}
