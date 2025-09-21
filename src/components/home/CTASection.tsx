import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
          READY TO EXPERIENCE <span className="block text-primary">THE MUSIC?</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of music lovers tracking their favorite concerts and discovering new artists.
        </p>
        <Button size="lg" className="text-lg px-8 py-6">Get Started Today</Button>
      </div>
    </section>
  )
}
