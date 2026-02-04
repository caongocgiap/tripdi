import { useMemo, useState } from "react";
import { PhotoLightbox } from "./PhotoLightbox";
import type { IPhoto } from "@/types/types"
import { usePhotos } from "@/hooks/usePhotos";
import { Skeleton } from "../ui/skeleton";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PhotoGallery = ({ AlbumId }: { AlbumId: string | null }) => {
  const [index, setIndex] = useState(-1);
  const { photos, loading, hasMore, fetchNextPage } = usePhotos(AlbumId);
  const navigate = useNavigate();

  const photoItems = useMemo(() => {
    return photos.map((photo: IPhoto, i: number) => (
      <img
        key={photo.id || i}
        src={photo.url.replace('/upload/', '/upload/f_auto,q_auto/')}
        alt="Trip memory"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onClick={() => setIndex(i)}
        className="w-full h-full object-cover cursor-zoom-in transition-all duration-500 rounded-2xl aspect-3/4 shadow-soft group hover:scale-105"
      />
    ));
  }, [photos]);

  if (photos.length === 0 && !loading) {
    return (
      <div className="text-center text-lg font-bold py-20 text-gray-400">
        Album này chưa có tấm ảnh nào, <span onClick={() => navigate(-1)} className="text-blue-500 cursor-pointer">Quay lại!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
        {photoItems}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
          {[...Array(12)].map((_, i: number) => (
            <Skeleton key={i} className="aspect-3/4 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {/* Load more */}
      {!loading && hasMore && (
        <div className="flex justify-center">
          <span>Còn nữa,&nbsp;</span>
          <span
            onClick={fetchNextPage}
            className="text-blue-500 cursor-pointer"
          >
            tải thêm nhé!
          </span>
        </div>
      )}

      {/* End */}
      {!hasMore && photos.length > 0 && (
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-green-500" />
          <span>Đã tải hết ảnh 🎉</span>
          <span onClick={() => navigate(-1)} className="text-blue-500 cursor-pointer flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4 text-blue-500" />
            Quay lại!
          </span>
        </div>
      )}

      <PhotoLightbox
        photos={photos}
        index={index}
        isOpen={index >= 0}
        onClose={() => setIndex(-1)}
      />
    </div>
  );
};