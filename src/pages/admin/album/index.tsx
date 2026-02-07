import AlbumSearch from "./components/AlbumSearch";
import AlbumCreate from "./components/AlbumCreate";
import AlbumEdit from "./components/AlbumEdit";
import { DataTable } from "./components/data-table";
import { ListIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAlbum } from "./hooks/useAlbum";

export default function AlbumPage() {
  const {
    loading,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    paginatedAlbums,
    columns,
    goToPrevPage,
    goToNextPage,
    editingAlbum,
    setEditingAlbum,
    handleUpdateAlbum,
  } = useAlbum();

  if (loading) {
    return (
      <div className="text-center p-10 flex flex-col items-center justify-center gap-4 h-[calc(100vh-100px)]">
        <Spinner className="w-10 h-10" />
        <p className="text-lg font-bold">Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">Album Page</h1>
      <AlbumSearch />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListIcon className="w-5 h-5" />
          <p className="text-lg font-bold flex items-center gap-2">Albums List: {totalItems}</p>
        </div>
        <AlbumCreate />
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={paginatedAlbums} />
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Display {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, totalItems)} / {totalItems} albums
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={goToPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm font-medium px-2">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={goToNextPage}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <AlbumEdit
        album={editingAlbum}
        open={!!editingAlbum}
        onOpenChange={(open) => !open && setEditingAlbum(null)}
        onSave={async (albumId, data) => {
          await handleUpdateAlbum(albumId, data);
        }}
      />
    </div>
  );
}
