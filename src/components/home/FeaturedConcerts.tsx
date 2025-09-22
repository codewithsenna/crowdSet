"use client"

import { useEffect, useState } from "react"
import { Concert } from "@/types/concert.types"
import { getConcerts } from "@/services/setlistService"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Loader2, MapPin, Play, Search, Users } from "lucide-react"
import { Input } from "../ui/input"

export default function FeaturedConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // 🌍 Auto-detect city from IP
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()
        if (data.city) {
          setSearchQuery(data.city) // set as default search
        } else {
          setSearchQuery("Toronto") // fallback
        }
      } catch (err) {
        console.error("IP location fetch failed:", err)
        setSearchQuery("Toronto") // fallback
      }
    }

    fetchCity()
  }, [])

  useEffect(() => {
    if (!searchQuery) return
    const load = async () => {
      setLoading(true)
      try {
        const data = await getConcerts(searchQuery)
        setConcerts(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(load, 500)
    return () => clearTimeout(timeout)
  }, [searchQuery])


  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Featured <span className="text-primary">Concerts</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover the latest performances and upcoming shows from your favorite artists.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              <Input
                type="text"
                placeholder="Search by city or artist..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchQuery(value.trim() === "" ? "Toronto" : value)
                }} className="pl-10 bg-background border-border/50 focus:border-primary/50"
              />
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading concerts...</span>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concerts.map((concert) => (
              <Link key={concert.id} href={`/concerts/${concert.id}`} className="block">
                <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10"></div>
                    {concert.image ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{ backgroundImage: `url(${concert.image})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[url('/concert-stage-lights-crowd-silhouette.png')] bg-cover bg-center opacity-30"></div>
                    )}
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
