import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ContactMessageDetailClient from './ContactMessageDetailClient'

export default async function ContactMessageDetailPage({ params }) {
  const { id } = await params

  const message = await prisma.contactMessage.findUnique({
    where: { id }
  })

  if (!message) {
    notFound()
  }

  return <ContactMessageDetailClient message={JSON.parse(JSON.stringify(message))} />
}
