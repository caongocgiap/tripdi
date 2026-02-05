import { memo } from "react";
import { Calendar } from "lucide-react";
import type { IAlbum } from "@/types/types";

interface Props {
  album: IAlbum;
  onClick: (id: string) => void;
}

const AlbumCard = memo(({ album, onClick }: Props) => {
  const coverUrl = album.coverImage?.replace("/upload/", "/upload/f_auto,q_auto/") ?? "";

  return (
    <div
      onClick={() => onClick(album.id!)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100/80 hover:shadow-lg hover:border-blue-100 ring-1 ring-slate-100/50 transition-[box-shadow,border-color] duration-150 ease-out"
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={coverUrl}
          alt={album.nameTrip}
          className="object-cover w-full h-full will-change-transform group-hover:scale-105 transition-transform duration-200 ease-out"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          aria-hidden
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base text-slate-800 truncate transition-colors duration-150">
          {album.nameTrip} — {album.location}
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
          <Calendar size={14} className="shrink-0 text-slate-500" />
          <span>{album.date}</span>
        </div>
      </div>
    </div>
  );
});

export default AlbumCard;