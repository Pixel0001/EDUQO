import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EnrollmentDetailClient from './EnrollmentDetailClient'

export default async function EnrollmentDetailPage({ params }) {
  const { id } = await params

  const inscriere = await prisma.inscriere.findUnique({
    where: { id }
  })

  if (!inscriere) {
    notFound()
  }

  return <EnrollmentDetailClient inscriere={JSON.parse(JSON.stringify(inscriere))} />
}
