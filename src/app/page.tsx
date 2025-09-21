import Hero from "@/components/home/Hero"
import StatsSection from "@/components/home/StatsSection"
import FeaturedConcerts from "@/components/home/FeaturedConcerts"
import CTASection from "@/components/home/CTASection"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <FeaturedConcerts />
      <CTASection />
    </div>
  )
}
