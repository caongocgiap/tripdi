import type { IPhoto } from "@/types/photo";

interface Props {
  photos: IPhoto[];
}

const PhotoGrid = ({ photos }: Props) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
      {photos.map((photo: IPhoto) => {
        const optimizedUrl = photo.url.replace('/upload/', '/upload/f_auto,q_auto/');
        return (
          <div
            key={photo.id}
            className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:opacity-90 transition-opacity cursor-zoom-in"
          >
            {photo.url.endsWith('.mp4') || photo.url.includes('/video/') ? (
              <video
                src={photo.url}
                controls
                className="w-full rounded-xl shadow-md"
              />
            ) : (
              <img
                src={optimizedUrl}
                alt="trip-image"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
