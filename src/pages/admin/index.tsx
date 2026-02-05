import { useState } from "react";
import AlbumCard from "@/components/gallery/AlbumCard";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import type { IAlbum } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAlbums } from "@/hooks/useAlbums";

export default function AdminPage() {
  const [ selectedAlbumId, setSelectedAlbumId ] = useState<string | null>(null);
  const { albums, loading } = useAlbums();

  if (loading) return (
    <div className="text-center p-10 flex flex-col items-center justify-center gap-4 h-[calc(100vh-100px)]">
      <Spinner className="w-10 h-10" />
      <p className="text-lg font-bold">Loading data...</p>
    </div>
  );

  return (
    <>
      <main className="mx-auto">
        {!selectedAlbumId ? (
          <>
            <h2 className="text-xl font-bold mb-4">Chuyến đi của tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {albums.map((album: IAlbum) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onClick={setSelectedAlbumId}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex align-center justify-between">
              <h1 className="text-3xl font-bold">Ảnh trong chuyến đi</h1>
              <Button
                onClick={() => setSelectedAlbumId(null)}
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Quay lại danh sách album
              </Button>
            </div>
            <PhotoGallery AlbumId={selectedAlbumId} />
          </div>
        )}
      </main>
    </>
  )
}