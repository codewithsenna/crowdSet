import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import FeaturedConcerts from "@/components/home/FeaturedConcerts"
import CTASection from "@/components/home/CTASection"
import FeaturedFestivals from "@/components/home/FeaturedFestivals"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <FeaturedFestivals />
      <CTASection />
    </div>
  )
}
