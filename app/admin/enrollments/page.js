import prisma from '@/lib/prisma'
import Link from 'next/link'
import { 
  UserIcon,
  PhoneIcon, 
  EnvelopeIcon,
  CalendarIcon,
  AcademicCapIcon,
  BookOpenIcon,
  InboxIcon
} from '@heroicons/react/24/outline'

const statusConfig = {
  LEAD: { label: '🔵 Lead', color: 'bg-blue-100 text-blue-800' },
  FARA_RASPUNS: { label: '🔘 Fără Răspuns', color: 'bg-gray-100 text-gray-700' },
  CONTACTAT: { label: '🟡 Contactat', color: 'bg-yellow-100 text-yellow-800' },
  PROGRAMAT: { label: '🟠 Programat', color: 'bg-orange-100 text-orange-800' },
  PRIMA_LECTIE: { label: '🟢 Prima Lecție', color: 'bg-green-100 text-green-800' },
  FINALIZAT: { label: '⚫ Finalizat', color: 'bg-slate-200 text-slate-800' },
  SE_GANDESTE: { label: '🔘 Se Gândește', color: 'bg-gray-100 text-gray-600' },
  ASTEPTAM_PLATA: { label: '💵 Așteptăm Plata', color: 'bg-amber-100 text-amber-800' },
  PLATIT: { label: '💰 Plătit', color: 'bg-emerald-100 text-emerald-800' },
  STUDIAZA: { label: '🟣 Studiază', color: 'bg-purple-100 text-purple-800' },
  PLECAT: { label: '🔴 Plecat', color: 'bg-red-100 text-red-800' },
  LOST_LEAD: { label: '❌ Lost Lead', color: 'bg-red-200 text-red-900' },
  TEST: { label: '🧪 Test', color: 'bg-cyan-100 text-cyan-800' },
  // Compatibilitate
  NOU: { label: '🔵 Nou', color: 'bg-blue-100 text-blue-800' },
  NEW: { label: '🔵 Nou', color: 'bg-blue-100 text-blue-800' },
  CONTACTED: { label: '🟡 Contactat', color: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: '🟢 Confirmat', color: 'bg-green-100 text-green-800' },
  REJECTED: { label: '🔴 Respins', color: 'bg-red-100 text-red-800' },
  CONFIRMAT: { label: '🟢 Confirmat', color: 'bg-green-100 text-green-800' },
  RESPINS: { label: '🔴 Respins', color: 'bg-red-100 text-red-800' },
}

export default async function EnrollmentsPage() {
  // Înscrieri din formularul /inscriere
  const inscrieri = await prisma.inscriere.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Statistici
  const stats = {
    total: inscrieri.length,
    lead: inscrieri.filter(i => i.status === 'LEAD' || i.status === 'NOU').length,
    contactat: inscrieri.filter(i => i.status === 'CONTACTAT').length,
    programat: inscrieri.filter(i => i.status === 'PROGRAMAT').length,
    studiaza: inscrieri.filter(i => i.status === 'STUDIAZA' || i.status === 'PLATIT').length,
  }

  return (
    <div className="space-y-4 xs:space-y-6">
      <div>
        <h1 className="text-xl xs:text-2xl font-bold text-gray-900">Înscrieri</h1>
        <p className="text-sm xs:text-base text-gray-600">Gestionează înscrierile primite</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-4">
        <div className="bg-white rounded-xl p-3 xs:p-4 border border-gray-200">
          <p className="text-xs xs:text-sm text-gray-500">Total</p>
          <p className="text-xl xs:text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-3 xs:p-4 border border-gray-200">
          <p className="text-xs xs:text-sm text-gray-500">Lead-uri</p>
          <p className="text-xl xs:text-2xl font-bold text-blue-600">{stats.lead}</p>
        </div>
        <div className="bg-white rounded-xl p-3 xs:p-4 border border-gray-200">
          <p className="text-xs xs:text-sm text-gray-500">Contactați</p>
          <p className="text-xl xs:text-2xl font-bold text-yellow-600">{stats.contactat}</p>
        </div>
        <div className="bg-white rounded-xl p-3 xs:p-4 border border-gray-200">
          <p className="text-xs xs:text-sm text-gray-500">Programați</p>
          <p className="text-xl xs:text-2xl font-bold text-orange-600">{stats.programat}</p>
        </div>
        <div className="bg-white rounded-xl p-3 xs:p-4 border border-gray-200">
          <p className="text-xs xs:text-sm text-gray-500">Activi</p>
          <p className="text-xl xs:text-2xl font-bold text-green-600">{stats.studiaza}</p>
        </div>
      </div>

      {/* Lista înscrieri */}
      {inscrieri.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <InboxIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nu există înscrieri încă</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inscrieri.map((inscriere) => {
            const status = statusConfig[inscriere.status] || statusConfig.LEAD
            
            return (
              <Link
                key={inscriere.id}
                href={`/admin/enrollments/${inscriere.id}`}
                className={`block bg-white rounded-xl p-3 xs:p-4 border hover:border-[#30919f] hover:shadow-md transition-all ${
                  inscriere.status === 'LEAD' || inscriere.status === 'NOU' ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 xs:gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base">
                        {inscriere.numeCopil}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <div className="flex flex-col xs:flex-row xs:flex-wrap gap-1 xs:gap-x-4 xs:gap-y-1 text-xs xs:text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                        Părinte: {inscriere.numeParinte}
                      </span>
                      <span className="flex items-center gap-1">
                        <PhoneIcon className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                        {inscriere.telefon}
                      </span>
                      {inscriere.email && (
                        <span className="flex items-center gap-1 min-w-0">
                          <EnvelopeIcon className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                          <span className="truncate">{inscriere.email}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                        <AcademicCapIcon className="h-3 w-3" />
                        Clasa {inscriere.clasa}
                      </span>
                      {inscriere.cursuri?.map((curs, idx) => (
                        <span key={idx} className="flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded-lg">
                          <BookOpenIcon className="h-3 w-3" />
                          {curs}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-left xs:text-right text-xs text-gray-400 whitespace-nowrap">
                    <CalendarIcon className="h-3 w-3 xs:h-4 xs:w-4 inline mr-1" />
                    {new Date(inscriere.createdAt).toLocaleDateString('ro-RO', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
