'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XMarkIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function EnrollmentModal({ isOpen, onClose, courseName }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E1E42]/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-gradient-to-br from-[#1E1E42] to-[#15152F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4CD0DC]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#FCD700]/20 to-transparent rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative text-center">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[#4CD0DC] to-[#0536FC] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4CD0DC]/30">
            <AcademicCapIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Title */}
          <h3 
            className="text-xl sm:text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            Înscrie-te la curs
          </h3>

          {/* Course name */}
          {courseName && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FCD700]/10 border border-[#FCD700]/30 rounded-full mb-4">
              <SparklesIcon className="w-4 h-4 text-[#FCD700]" />
              <span 
                className="text-sm text-[#FCD700] font-medium"
                style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
              >
                {courseName}
              </span>
            </div>
          )}

          {/* Description */}
          <p 
            className="text-[#94A3B8] text-sm sm:text-base mb-6"
            style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
          >
            Completează formularul de înscriere și te vom contacta în cel mai scurt timp pentru confirmare.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-[#94A3B8] hover:bg-white/10 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium"
              style={{ fontFamily: 'var(--font-quicksand), Quicksand, sans-serif' }}
            >
              Anulează
            </button>
            <Link
              href="/inscriere"
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#4CD0DC] to-[#0536FC] text-white hover:from-[#3BB8C4] hover:to-[#0429CC] transition-all duration-300 shadow-lg shadow-[#4CD0DC]/30 text-sm sm:text-base font-semibold text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              Completează formularul
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
