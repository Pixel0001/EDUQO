import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import CoursesSection from '@/components/public/CoursesSection'
import AboutSection from '@/components/public/AboutSection'
import ContactSection from '@/components/public/ContactSection'
import ReviewsSection from '@/components/public/ReviewsSection'
import FAQSection from '@/components/public/FAQSection'
import Footer from '@/components/public/Footer'
import { getHomepageData } from '@/lib/data'

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
