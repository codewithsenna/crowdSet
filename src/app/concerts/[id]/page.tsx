"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ConcertHero from "@/components/concerts/ConcertHero"
import SetListList from "@/components/concerts/SetListList"
import ConcertStats from "@/components/concerts/ConcertStats"
import { Song } from "@/types/song.types"
import { Loader2 } from "lucide-react"
import { getConcert } from "@/services/setlistService"

export default function ConcertPage() {
  const params = useParams()
  const concertId = params.id as string

  const [songs, setSongs] = useState<Song[]>([])
  const [concert, setConcert] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSetlist = async () => {
      try {
        const setlist = await getConcert(concertId)

        const mappedSongs: Song[] =
          setlist.sets?.set?.flatMap((set: any, setIndex: number) =>
            set.song?.map((s: any, i: number) => ({
              id: setIndex * 100 + i,
              title: s.name,
              album: s.tape ? "Tape / Intro" : "Unknown Album",
              duration: "—",
              played: true,
            }))
          ) || []

        setConcert({
          artist: setlist.artist?.name,
          venue: setlist.venue?.name,
          city: `${setlist.venue?.city?.name}, ${setlist.venue?.city?.country?.name}`,
          date: setlist.eventDate,
          duration: "Unknown",
          totalSongs: mappedSongs.length,
        })

        setSongs(mappedSongs)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchSetlist()
  }, [concertId])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading concert...</p>
        </div>
      </div>
    )
  }
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="min-h-screen bg-background">
      {concert && (
        <>
          <ConcertHero {...concert} />
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Tonight&apos;s Setlist
              </h2>
              <p className="text-muted-foreground">
                All songs performed during this incredible show
              </p>
            </div>

            {songs.length > 0 ? (
              <SetListList songs={songs} />
            ) : (
              <p className="text-muted-foreground">
                No songs found for this setlist.
              </p>
            )}

            <ConcertStats
              totalSongs={concert.totalSongs}
              duration={concert.duration}
              albums={1}
            />
          </div>
        </>
      )}
    </div>
  )
}