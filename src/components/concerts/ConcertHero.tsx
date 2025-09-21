import { Music, Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ConcertHeroProps {
  artist: string
  venue: string
  city: string
  date: string
  duration: string
  totalSongs: number
}

export default function ConcertHero({
  artist,
  venue,
  city,
  date,
  duration,
  totalSongs,
}: ConcertHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/concert-stage-lights-crowd-silhouette.png')] bg-cover bg-center opacity-10"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Music className="h-5 w-5" />
            <span className="text-sm font-medium">LIVE CONCERT SETLIST</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight">{artist}</h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{venue}, {city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              {totalSongs} Songs Played
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Complete Show
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
