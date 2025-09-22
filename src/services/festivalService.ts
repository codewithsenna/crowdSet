import { Festival } from "@/types/festival.types"

export async function getFestivals(city?: string): Promise<Festival[]> {
  const url = city 
    ? `/api/festivals?city=${encodeURIComponent(city)}`
    : "/api/festivals"

  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch festivals")
  return res.json()
}


