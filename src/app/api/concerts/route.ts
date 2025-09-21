import { NextResponse } from "next/server"
import { getSpotifyToken, getTrackDurationMs, getArtistImage } from "@/services/spotifyService"

function formatDate(dateStr: string): string {
  // Convert DD-MM-YYYY → "May 23, 2025"
  const [day, month, year] = dateStr.split("-").map(Number)
  if (!day || !month || !year) return dateStr
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

async function mapSetlistToConcert(s: any, spotifyToken?: string) {
  const songs = s.sets?.set?.[0]?.song || []
  let totalDurationMs = 0

  if (spotifyToken) {
    for (const song of songs) {
      try {
        const query = `${song.name} ${s.artist?.name}`
        const durationMs = await getTrackDurationMs(query, spotifyToken)
        totalDurationMs += durationMs
      } catch (err) {
        console.error("Spotify fetch failed:", song.name, err)
      }
    }
  }

  let duration = "N/A"
  if (totalDurationMs > 0) {
    const hours = Math.floor(totalDurationMs / (1000 * 60 * 60))
    const minutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60))
    duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  // 🎤 Fetch artist image from Spotify
  let artistImage: string | null = null
  if (spotifyToken && s.artist?.name) {
    artistImage = await getArtistImage(s.artist.name, spotifyToken)
  }

  return {
    id: s.id,
    artist: s.artist?.name ?? "Unknown Artist",
    venue: s.venue?.name ?? "Unknown Venue",
    city: s.venue?.city?.name ?? "Unknown City",
    rawDate: s.eventDate,
    date: formatDate(s.eventDate),
    url: s.url,
    totalSongs: songs.length,
    duration,
    status: "Upcoming",
    image: artistImage || "/concert-stage-lights-crowd-silhouette.png", // fallback
  }
}


export async function GET() {
  try {
    // Try to get Spotify token
    let spotifyToken: string | undefined
    try {
      spotifyToken = await getSpotifyToken()
    } catch (err) {
      console.warn("⚠️ Spotify token fetch failed, falling back to no duration")
    }

    const res = await fetch(
      "https://api.setlist.fm/rest/1.0/search/setlists?artistName=Metallica",
      {
        headers: {
          Accept: "application/json",
          "x-api-key": process.env.SETLIST_FM_API_KEY as string,
        },
      }
    )

    if (!res.ok) {
      console.error("Setlist.fm error:", res.status)
      return NextResponse.json([])
    }

    const data = await res.json()

    // Map + flatten with Spotify enrichment if available
    const concerts = await Promise.all(
      (data.setlist || []).map((s: any) =>
        mapSetlistToConcert(s, spotifyToken).catch((err) => {
          console.error("Mapping failed:", s.id, err)
          return null
        })
      )
    )

    return NextResponse.json(concerts.filter(Boolean))
  } catch (err) {
    console.error("API route failed:", err)
    return NextResponse.json([])
  }
}
