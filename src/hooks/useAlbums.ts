import { useState, useEffect, useCallback } from "react";
import { db } from "@/config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import type { IAlbum } from "@/types/types";
import { ALBUMS_COLLECTION } from "@/constants/collection.constant";
import { deleteAlbum, updateAlbum as updateAlbumService } from "@/services/firebaseService";

export const useAlbums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, ALBUMS_COLLECTION), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IAlbum[];
      setAlbums(albumList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteAlbum = useCallback(async (albumId: string) => {
    if (!albumId) return;
    setDeletingId(albumId);
    try {
      await deleteAlbum(albumId);
    } catch (err) {
      console.error("Xóa album thất bại:", err);
    } finally {
      setDeletingId(null);
    }
  }, []);

  const handleUpdateAlbum = useCallback(
    async (
      albumId: string,
      data: Partial<Pick<IAlbum, "nameTrip" | "location" | "date" | "description" | "coverImage">>
    ) => {
      if (!albumId) return;
      await updateAlbumService(albumId, data);
    },
    []
  );

  return { albums, loading, handleDeleteAlbum, handleUpdateAlbum, deletingId };
};