import { Song } from "@/types/song.types"
import SetlistItem from "./SetListItem"

interface SetlistListProps {
  songs: Song[]
}

export default function SetListList({ songs }: SetlistListProps) {
  return (
    <div className="grid gap-4">
      {songs.map((song, index) => (
        <SetlistItem
          key={song.id}
          index={index}
          title={song.title}
          album={song.album}
          duration={song.duration}
          played={song.played}
        />
      ))}
    </div>
  )
}
