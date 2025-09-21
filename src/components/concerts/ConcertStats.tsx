import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ConcertStatsProps {
  totalSongs: number
  duration: string
  albums: number
}

export default function ConcertStats({ totalSongs, duration, albums }: ConcertStatsProps) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">{totalSongs}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">Songs Performed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">{duration}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">Total Duration</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">{albums}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">Albums Featured</p>
        </CardContent>
      </Card>
    </div>
  )
}
