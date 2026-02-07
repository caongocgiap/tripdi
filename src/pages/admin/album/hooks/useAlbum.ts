import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlbums } from "@/hooks/useAlbums";
import { getColumns } from "../components/columns";
import type { IAlbum } from "@/types/types";

const PAGE_SIZE = 10;

export const useAlbum = () => {
  const { albums, loading, handleDeleteAlbum, handleUpdateAlbum, deletingId } = useAlbums();
  const [editingAlbum, setEditingAlbum] = useState<IAlbum | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = (albums || []).length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const paginatedAlbums = useMemo(() => {
    const list = albums || [];
    const start = (currentPage - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }, [albums, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const columns = useMemo(
    () => getColumns(handleDeleteAlbum, (album) => setEditingAlbum(album), deletingId),
    [handleDeleteAlbum, deletingId]
  );

  return {
    loading,
    totalItems,
    totalPages,
    currentPage,
    pageSize: PAGE_SIZE,
    paginatedAlbums,
    columns,
    goToPrevPage,
    goToNextPage,
    editingAlbum,
    setEditingAlbum,
    handleUpdateAlbum,
  };
};
