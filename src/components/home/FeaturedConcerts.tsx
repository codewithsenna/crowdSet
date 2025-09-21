"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Play, Loader2 } from "lucide-react"
import Link from "next/link"

interface Concert {
  id: string
  artist: string
  venue: string
  city: string
  date: string
  status: string
}

export default function FeaturedConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/concerts")
        const data = await res.json()
        setConcerts(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            FEATURED <span className="block text-primary">CONCERTS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the latest performances and upcoming shows from your favorite artists.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading concerts...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concerts.map((concert) => (
              <Link key={concert.id} href={`/concerts/${concert.id}`} className="block">
                <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10"></div>
                    <div className="absolute inset-0 bg-[url('/concert-stage-lights-crowd-silhouette.png')] bg-cover bg-center opacity-30"></div>
                    <div className="absolute top-4 left-4">
                      <Badge variant={concert.status === "Live Now" ? "default" : "secondary"}>
                        {concert.status}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="lg" className="rounded-full w-16 h-16 p-0">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {concert.artist}
                    </h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{concert.venue}, {concert.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{concert.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>— attendees TBD —</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View Setlist</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
