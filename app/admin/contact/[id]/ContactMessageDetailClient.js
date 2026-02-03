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
  ClockIcon
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

export default function ContactMessageDetailClient({ message: initialMessage }) {
  const router = useRouter()
  const [message, setMessage] = useState(initialMessage)
  const [notesList, setNotesList] = useState(initialMessage.notesList || [])
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const updateStatus = async (newStatus) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/contact/${message.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!res.ok) throw new Error('Eroare la actualizare')

      setMessage({ ...message, status: newStatus })
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
      const res = await fetch(`/api/admin/contact/${message.id}`, {
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
      const res = await fetch(`/api/admin/contact/${message.id}`, {
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

  const deleteMessage = async () => {
    if (!confirm('Sigur vrei să ștergi acest mesaj?')) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/contact/${message.id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Eroare la ștergere')

      toast.success('Mesaj șters!')
      router.push('/admin/contact')
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
            href="/admin/contact"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl xs:text-2xl font-bold text-gray-900">Mesaj de la {message.name}</h1>
            <p className="text-sm text-gray-500">Primit pe {new Date(message.createdAt).toLocaleDateString('ro-RO')}</p>
          </div>
        </div>

        <button
          onClick={deleteMessage}
          disabled={deleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Info principale */}
        <div className="lg:col-span-2 space-y-4">
          {/* Contact info */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-[#30919f]" />
              Informații Contact
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nume</p>
                <p className="font-medium text-gray-900">{message.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${message.email}`} className="font-medium text-[#30919f] hover:underline flex items-center gap-1">
                  <EnvelopeIcon className="h-4 w-4" />
                  {message.email}
                </a>
              </div>
              {message.phone && (
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <a href={`tel:${message.phone}`} className="font-medium text-[#30919f] hover:underline flex items-center gap-1">
                    <PhoneIcon className="h-4 w-4" />
                    {message.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mesajul */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChatBubbleLeftIcon className="h-5 w-5 text-[#30919f]" />
              Mesaj
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </div>

          {/* Acțiuni rapide */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Acțiuni Rapide</h2>
            <div className="flex flex-wrap gap-3">
              <a 
                href={`mailto:${message.email}?subject=Re: Mesajul tău pe EDUQO After School`}
                className="px-4 py-2 bg-[#30919f] text-white rounded-lg hover:bg-[#247a86] transition-colors"
              >
                Răspunde prin Email
              </a>
              {message.phone && (
                <a 
                  href={`tel:${message.phone}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Sună
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-xl p-4 xs:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Status</h2>
            <select
              value={message.status}
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
              {statusOptions.find(s => s.value === message.status) && (
                <span className={`inline-block px-3 py-1.5 rounded-lg border-2 text-sm font-medium ${statusOptions.find(s => s.value === message.status)?.color}`}>
                  {statusOptions.find(s => s.value === message.status)?.label}
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
            <h2 className="font-semibold text-gray-900 mb-2">Data primirii</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {new Date(message.createdAt).toLocaleDateString('ro-RO', {
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
