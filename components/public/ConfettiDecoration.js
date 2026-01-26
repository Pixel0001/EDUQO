export default function ConfettiDecoration({ variant = 'default' }) {
  const decorations = {
    default: (
      <>
        {/* Top left corner */}
        <svg className="absolute top-8 left-8 w-4 h-4 text-[var(--cyan)] opacity-60" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="8" />
        </svg>
        <svg className="absolute top-20 left-16 w-0 h-0 opacity-50" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '10px solid var(--yellow)' }} />
        <svg className="absolute top-12 left-32 w-5 h-5 text-[var(--pink)] opacity-40" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="10" r="8" />
        </svg>
        
        {/* Top right corner */}
        <svg className="absolute top-16 right-12 w-3 h-3 text-[var(--green)] opacity-60" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="6" cy="6" r="6" />
        </svg>
        <svg className="absolute top-8 right-28 w-4 h-4 text-[var(--blue)] opacity-40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="12" height="12" transform="rotate(15 8 8)" />
        </svg>
        <div className="absolute top-24 right-20 w-0 h-0 opacity-50" style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '9px solid var(--cyan)' }} />
        
        {/* Bottom decorations */}
        <svg className="absolute bottom-16 left-12 w-4 h-4 text-[var(--yellow)] opacity-50" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="8" />
        </svg>
        <svg className="absolute bottom-8 right-16 w-5 h-5 text-[var(--green)] opacity-40" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="10" r="8" />
        </svg>
      </>
    ),
    sparse: (
      <>
        <svg className="absolute top-12 left-8 w-3 h-3 text-[var(--cyan)] opacity-50" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="6" cy="6" r="6" />
        </svg>
        <div className="absolute top-8 right-16 w-0 h-0 opacity-40" style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '9px solid var(--yellow)' }} />
        <svg className="absolute bottom-12 right-8 w-4 h-4 text-[var(--pink)] opacity-40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="8" cy="8" r="6" />
        </svg>
      </>
    ),
    hero: (
      <>
        {/* Large decorative elements for hero */}
        <svg className="absolute top-32 left-[5%] w-6 h-6 text-[var(--cyan)] opacity-40 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="12" />
        </svg>
        <div className="absolute top-48 left-[15%] w-0 h-0 opacity-50 animate-bounce-gentle" style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '18px solid var(--yellow)', animationDelay: '0.5s' }} />
        <svg className="absolute top-24 right-[10%] w-8 h-8 text-[var(--pink)] opacity-30 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="16" cy="16" r="12" />
        </svg>
        <svg className="absolute top-56 right-[20%] w-5 h-5 text-[var(--green)] opacity-50 animate-bounce-gentle" style={{ animationDelay: '1.5s' }} viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="10" />
        </svg>
        <div className="absolute bottom-32 left-[8%] w-0 h-0 opacity-40" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid var(--blue)' }} />
        <svg className="absolute bottom-24 right-[12%] w-6 h-6 text-[var(--yellow)] opacity-40 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(12 12 12)" />
        </svg>
      </>
    ),
  }

  return (
    <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
      {decorations[variant] || decorations.default}
    </div>
  )
}
