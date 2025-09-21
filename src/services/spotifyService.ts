// src/services/spotifyService.ts
export async function getSpotifyToken(): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Spotify token")
  }

  const data = await res.json()
  return data.access_token as string
}

export async function getTrackDurationMs(
  query: string,
  token: string
): Promise<number> {
  const spotifyRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!spotifyRes.ok) {
    console.error("Spotify API error:", await spotifyRes.text())
    return 0
  }

  const spotifyData = await spotifyRes.json()
  return spotifyData.tracks?.items?.[0]?.duration_ms || 0
}

export async function getArtistImage(artistName: string, token: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok) {
      console.error("Spotify artist search error:", res.status)
      return null
    }

    const data = await res.json()
    const artist = data?.artists?.items?.[0]
    if (artist?.images?.length > 0) {
      return artist.images[0].url // 👈 largest available
    }

    return null
  } catch (err) {
    console.error("Spotify artist image fetch failed:", artistName, err)
    return null
  }
}
