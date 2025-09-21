import { Button } from "@/components/ui/button"
import { Music, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-accent mb-6">
            <Music className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Live Concert Experience</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground leading-none mb-8">
            THE ECHO <span className="block text-primary">OF LIVE</span>{" "}
            <span className="block">MUSIC</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl">
            Experience the raw energy of live performances. Track setlists, discover new artists,
            and relive the magic of every concert moment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Explore Concerts button (could scroll to featured section) */}
            <Button size="lg" className="text-lg px-8 py-6 group">
              Explore Concerts
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* ✅ This goes to app/concerts/page.tsx (ConcertPage) */}
            <Link href="/concerts">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                View Setlists
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
