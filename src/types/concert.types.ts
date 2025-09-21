// src/types/concert.ts
export interface FeaturedConcert {
  id: string
  artist: string
  venue: string
  city: string
  date: string
  attendees: string
  status: "Live Now" | "Upcoming"
}

// types/concert.types.ts
export interface Concert {
  id: string
  artist: string
  venue: string
  city: string
  date: string
  rawDate: string
  url: string
  totalSongs: number
  duration: string
  status: string
  image: string
}
