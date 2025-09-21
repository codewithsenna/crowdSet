
// Get MBID from artist name or short ID
export async function getArtistMbid(nameOrId: string): Promise<string> {
  const res = await fetch(`/api/artist?name=${encodeURIComponent(nameOrId)}`);

  let data: any;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error(`Failed to parse JSON. Maybe /api/artist is not returning JSON?`);
  }


  if (!res.ok) throw new Error(`Artist lookup failed: ${res.status}`);
  if (!data.mbid) throw new Error(`No MBID returned in /api/artist response`);

  return data.mbid;
}


// Get setlists from MBID
export async function getSetlists(mbid: string, page = 1) {
  const res = await fetch(`/api/setlists?artistId=${mbid}&p=${page}`);
  if (!res.ok) throw new Error(`Setlist fetch failed: ${res.status}`);
  return res.json();
}
