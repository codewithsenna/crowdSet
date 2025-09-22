import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const city = searchParams.get("city")
    if (!city) {
      return NextResponse.json([])
    }

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${encodeURIComponent(
        city
      )}&classificationName=festival&apikey=${process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
      }`
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch festivals: ${res.status}`)
    }

    const data = await res.json()
    const events = data._embedded?.events || []

    const festivals = events.map((e: any) => ({
      id: e.id ?? "unknown",
      name: e.name ?? "Unknown Festival",
      city: e._embedded?.venues?.[0]?.city?.name ?? "Unknown City",
      country: e._embedded?.venues?.[0]?.country?.name ?? "Unknown Country",
      date: e.dates?.start?.localDate ?? "TBA",
      venue: e._embedded?.venues?.[0]?.name ?? "Unknown Venue",
      image: e.images?.[0]?.url ?? null,
      website: e.url ?? null,
    }))

    return NextResponse.json(festivals)
  } catch (err: any) {
    console.error("Festivals API failed:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
