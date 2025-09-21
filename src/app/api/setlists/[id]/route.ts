import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const res = await fetch(`https://api.setlist.fm/rest/1.0/setlist/${id}`, {
    headers: {
      Accept: "application/json",
      "x-api-key": process.env.SETLIST_FM_API_KEY as string,
    },
  })
  if (!res.ok) {
    return NextResponse.json(
      { error: `Failed to fetch setlist ${res.status}` },
      { status: res.status }
    )
  }

const setlist: unknown = await res.json()
  return NextResponse.json(setlist)
}
