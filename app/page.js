import dynamic from 'next/dynamic'
import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import CoursesSection from '@/components/public/CoursesSection'
import { getHomepageData } from '@/lib/data'

// Dynamic imports pentru componente below-fold (lazy loading)
// Acestea se încarcă doar când userul scrollează spre ele
const AboutSection = dynamic(() => import('@/components/public/AboutSection'), {
  loading: () => <section className="min-h-[300px]" />,
  ssr: true // SSR activat pentru SEO
})

const ContactSection = dynamic(() => import('@/components/public/ContactSection'), {
  loading: () => <section className="min-h-[400px]" />,
  ssr: true
})

const ReviewsSection = dynamic(() => import('@/components/public/ReviewsSection'), {
  loading: () => <section className="min-h-[300px]" />,
  ssr: true
})

const FAQSection = dynamic(() => import('@/components/public/FAQSection'), {
  loading: () => <section className="min-h-[200px]" />,
  ssr: true
})

const Footer = dynamic(() => import('@/components/public/Footer'), {
  loading: () => <footer className="min-h-[200px] bg-[#1E1E42]" />,
  ssr: true
})

// ISR: Revalidare la fiecare zi (86400 secunde)
// Pagina e pre-renderată la build, apoi actualizată în background la fiecare 24h
export const revalidate = 86400

export default async function Home() {
  // Fetch data la build time / revalidare (server-side)
  const { courses, reviews } = await getHomepageData()
  
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CoursesSection initialCourses={courses} />
        <AboutSection />
        <ContactSection />
        <ReviewsSection initialReviews={reviews} />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
