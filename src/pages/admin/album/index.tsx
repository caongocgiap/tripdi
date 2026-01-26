import AlbumSearch from "./components/AlbumSearch";
import AlbumCreate from "./components/AlbumCreate";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { ListIcon } from "lucide-react";
import { useAlbums } from "@/hooks/useAlbums";
import { Spinner } from "@/components/ui/spinner";

export default function AlbumPage() {
  const { albums, loading } = useAlbums();

  if (loading) return (
    <div className="text-center p-10 flex flex-col items-center justify-center gap-4 h-[calc(100vh-100px)]">
      <Spinner className="w-10 h-10" />
      <p className="text-lg font-bold">Loading data...</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">Album Page</h1>
      <AlbumSearch />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListIcon className="w-5 h-5" />
          <p className="text-lg font-bold flex items-center gap-2">Albums List: {albums.length}</p>
        </div>
        <AlbumCreate />
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={albums || []} />
      </div>

    </div>
  );
}