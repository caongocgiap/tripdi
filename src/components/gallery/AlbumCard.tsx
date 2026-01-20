import { Calendar } from "lucide-react";
import type { IAlbum } from "@/types/photo";

interface Props {
  album: IAlbum;
  onClick: (id: string) => void;
}

const AlbumCard = ({ album, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(album.id!)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={album.coverImage?.replace('/upload/', '/upload/f_auto,q_auto/')}
          alt={album.nameTrip}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">
          {album.nameTrip} - {album.location}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <Calendar size={14} />
          <span>{album.date}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;