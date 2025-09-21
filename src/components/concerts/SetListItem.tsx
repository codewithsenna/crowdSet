import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Play } from "lucide-react"

interface SetlistItemProps {
  index: number
  title: string
  album: string
  duration: string
  played: boolean
}

export default function SetlistItem({ index, title, album, duration, played }: SetlistItemProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Song Number */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{index + 1}</span>
          </div>

          {/* Album Cover Placeholder */}
          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Music className="h-8 w-8 text-primary/60" />
          </div>

          {/* Song Info */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{album}</p>
          </div>

          {/* Duration */}
          <div className="flex-shrink-0 text-sm text-muted-foreground">{duration}</div>

          {/* Play Button */}
          <Button
            size="sm"
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            variant="ghost"
          >
            <Play className="h-4 w-4" />
          </Button>

          {/* Played Status */}
          {played && (
            <Badge variant="secondary" className="flex-shrink-0">
              Played
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
