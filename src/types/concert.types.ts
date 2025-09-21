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
