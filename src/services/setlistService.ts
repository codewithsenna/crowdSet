import { Concert } from "@/types/concert.types"

// export async function getConcerts(): Promise<Concert[]> {
//   const res = await fetch("/api/setlists")
//   if (!res.ok) throw new Error("Failed to fetch concerts")
//   return res.json()
// }
export async function getConcerts(query?: string): Promise<Concert[]> {
  const url = query ? `/api/setlists?q=${encodeURIComponent(query)}` : "/api/setlists"
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch concerts")
  return res.json()
}

export async function getConcert(id: string): Promise<any> {
  const res = await fetch(`/api/setlists/${id}`)
  if (!res.ok) throw new Error("Failed to fetch setlist")
  return res.json()
}
