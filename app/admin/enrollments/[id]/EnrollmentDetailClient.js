'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  EnvelopeIcon, 
  PhoneIcon, 
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  PlusIcon,
  ClockIcon,
  AcademicCapIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const statusOptions = [
  { value: 'LEAD', label: '🔵 Lead', color: 'bg-blue-100 text-blue-800 border-blue-400' },
  { value: 'FARA_RASPUNS', label: '🔘 Fără Răspuns', color: 'bg-gray-100 text-gray-700 border-gray-400' },
  { value: 'CONTACTAT', label: '🟡 Contactat', color: 'bg-yellow-100 text-yellow-800 border-yellow-400' },
  { value: 'PROGRAMAT', label: '🟠 Programat', color: 'bg-orange-100 text-orange-800 border-orange-400' },
  { value: 'PRIMA_LECTIE', label: '🟢 Prima Lecție', color: 'bg-green-100 text-green-800 border-green-400' },
  { value: 'FINALIZAT', label: '⚫ Finalizat Lecția', color: 'bg-slate-200 text-slate-800 border-slate-500' },
  { value: 'SE_GANDESTE', label: '🔘 Se Gândește', color: 'bg-gray-100 text-gray-600 border-gray-400' },
  { value: 'ASTEPTAM_PLATA', label: '💵 Așteptăm Plata', color: 'bg-amber-100 text-amber-800 border-amber-400' },
  { value: 'PLATIT', label: '💰 Plătit', color: 'bg-emerald-100 text-emerald-800 border-emerald-400' },
  { value: 'STUDIAZA', label: '🟣 Studiază', color: 'bg-purple-100 text-purple-800 border-purple-400' },
  { value: 'PLECAT', label: '🔴 Plecat', color: 'bg-red-100 text-red-800 border-red-400' },
  { value: 'LOST_LEAD', label: '❌ Lost Lead', color: 'bg-red-200 text-red-900 border-red-500' },
  { value: 'TEST', label: '🧪 Test', color: 'bg-cyan-100 text-cyan-800 border-cyan-400' },
]

export default function EnrollmentDetailClient({ inscriere: initialInscriere }) {
  const router = useRouter()
  const [inscriere, setInscriere] = useState(initialInscriere)
  const [notesList, setNotesList] = useState(initialInscriere.notesList || [])
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const updateStatus = async (newStatus) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/enrollments/${inscriere.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!res.ok) throw new Error('Eroare la actualizare')

      setInscriere({ ...inscriere, status: newStatus })
      toast.success('Status actualizat!')
    } catch (error) {
      toast.error('Eroare la actualizare')
    } finally {
      setSaving(false)
    }
  }

  const addNote = async () => {
    if (!newNote.trim()) return
    
    setSaving(true)
    const updatedNotes = [
      ...notesList,
      {
        id: Date.now().toString(),
        text: newNote.trim(),
        createdAt: new Date().toISOString()
      }
    ]
    
    try {
      const res = await fetch(`/api/admin/enrollments/${inscriere.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notesList: updatedNotes })
      })

      if (!res.ok) throw new Error('Eroare la salvare')

      setNotesList(updatedNotes)
      setNewNote('')
      toast.success('Notă adăugată!')
    } catch (error) {
      toast.error('Eroare la salvare')
    } finally {
      setSaving(false)
    }
  }

  const deleteNote = async (noteId) => {
    setSaving(true)
    const updatedNotes = notesList.filter(n => n.id !== noteId)
    
    try {
      const res = await fetch(`/api/admin/enrollments/${inscriere.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notesList: updatedNotes })
      })

      if (!res.ok) throw new Error('Eroare la ștergere')

      setNotesList(updatedNotes)
      toast.success('Notă ștearsă!')
    } catch (error) {
      toast.error('Eroare la ștergere')
    } finally {
      setSaving(false)
    }
  }

  const deleteInscriere = async () => {
    if (!confirm('Sigur vrei să ștergi această înscriere?')) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/enrollments/${inscriere.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Eroare la ștergere')

      toast.success('Înscriere ștearsă!')
      router.push('/admin/enrollments')
    } catch (error) {
      toast.error('Eroare la ștergere')
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4 xs:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enrollments"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl xs:text-2xl font-bold text-gray-900">Înscriere - {inscriere.numeCopil}</h1>
            <p className="text-sm text-gray-500">Primită pe {new Date(inscriere.createdAt).toLocaleDateString('ro-RO')}</p>
          </div>
        </div>

        <button
          onClick={deleteInscriere}
          disabled={deleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Info principale */}
        <div className="lg:col-span-2 space-y-4">
          {/* Info Elev */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-[#30919f]" />
              Informații Elev
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nume elev</p>
                <p className="font-medium text-gray-900 text-lg">{inscriere.numeCopil}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Clasa</p>
                <p className="font-medium text-gray-900">{inscriere.clasa}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 mb-2">Cursuri dorite</p>
                <div className="flex flex-wrap gap-2">
                  {inscriere.cursuri?.map((curs, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      <BookOpenIcon className="h-4 w-4" />
                      {curs}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-[#30919f]" />
              Informații Părinte
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nume părinte</p>
                <p className="font-medium text-gray-900">{inscriere.numeParinte}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <a href={`tel:${inscriere.telefon}`} className="font-medium text-[#30919f] hover:underline flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" />
                  {inscriere.telefon}
                </a>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${inscriere.email}`} className="font-medium text-[#30919f] hover:underline flex items-center gap-1">
                  <EnvelopeIcon className="h-4 w-4" />
                  {inscriere.email}
                </a>
              </div>
            </div>
          </div>

          {/* Mesajul */}
          {inscriere.mesaj && (
            <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ChatBubbleLeftIcon className="h-5 w-5 text-[#30919f]" />
                Mesaj
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{inscriere.mesaj}</p>
            </div>
          )}

          {/* Acțiuni rapide */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Acțiuni Rapide</h2>
            <div className="flex flex-wrap gap-3">
              <a 
                href={`mailto:${inscriere.email}?subject=Înscriere EDUQO - ${inscriere.numeCopil}`}
                className="px-4 py-2 bg-[#30919f] text-white rounded-lg hover:bg-[#247a86] transition-colors"
              >
                Trimite Email
              </a>
              <a 
                href={`tel:${inscriere.telefon}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sună
              </a>
              <a 
                href={`https://wa.me/${inscriere.telefon.replace(/\D/g, '')}?text=Bună ziua! Vă contactăm în legătură cu înscrierea pentru ${inscriere.numeCopil} la EDUQO.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Status</h2>
            <select
              value={inscriere.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={saving}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30919f] focus:border-transparent text-sm font-medium disabled:opacity-50"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-3">
              {statusOptions.find(s => s.value === inscriere.status) && (
                <span className={`inline-block px-3 py-1.5 rounded-lg border-2 text-sm font-medium ${statusOptions.find(s => s.value === inscriere.status)?.color}`}>
                  {statusOptions.find(s => s.value === inscriere.status)?.label}
                </span>
              )}
            </div>
          </div>

          {/* Note Multiple */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Note interne</h2>
            
            {/* Add new note */}
            <div className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Scrie o notă nouă..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30919f] focus:border-transparent resize-none text-sm"
                rows={2}
              />
              <button
                onClick={addNote}
                disabled={saving || !newNote.trim()}
                className="mt-2 w-full px-4 py-2 bg-[#30919f] text-white rounded-lg hover:bg-[#247a86] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <PlusIcon className="h-4 w-4" />
                {saving ? 'Se adaugă...' : 'Adaugă notă'}
              </button>
            </div>
            
            {/* Notes list */}
            {notesList.length > 0 && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notesList.slice().reverse().map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3 group relative">
                    <p className="text-sm text-gray-700 pr-6">{note.text}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <ClockIcon className="h-3 w-3" />
                      {new Date(note.createdAt).toLocaleDateString('ro-RO', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {notesList.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-2">Nu există note încă</p>
            )}
          </div>

          {/* Data */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-2">Data înscrierii</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {new Date(inscriere.createdAt).toLocaleDateString('ro-RO', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
