import prisma from '@/lib/prisma'

/**
 * Fetch all active courses for the homepage
 * Used for SSG/ISR - data is fetched at build time
 */
export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        descriptionShort: true,
        descriptionLong: true,
        ageMin: true,
        ageMax: true,
        duration: true,
        lessonsCount: true,
        level: true,
        price: true,
        discountPrice: true,
        mainImageUrl: true,
        imageUrl: true,
      }
    })
    return courses
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

/**
 * Fetch all published reviews for the homepage
 * Used for SSG/ISR - data is fetched at build time
 */
export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        authorName: true,
        roleLabel: true,
        childName: true,
        childAge: true,
        rating: true,
        message: true,
        avatarUrl: true,
      }
    })
    return reviews
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

/**
 * Get homepage data for SSG
 * Combines courses and reviews in a single call
 */
export async function getHomepageData() {
  const [courses, reviews] = await Promise.all([
    getCourses(),
    getReviews()
  ])
  
  return {
    courses,
    reviews
  }
}
