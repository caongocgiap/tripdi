import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import type { IAlbum, IPhoto } from "@/types/photo";

export const usePhotos = (selectedAlbumId: string | null) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "albums"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const albumList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IAlbum[];

      setAlbums(albumList);
      if (!selectedAlbumId) setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedAlbumId]);

  useEffect(() => {
    if (!selectedAlbumId) {
      setPhotos([]);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "images"),
      where("albumId", "==", selectedAlbumId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IPhoto[];

      setPhotos(photoList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedAlbumId]);

  return { albums, photos, loading };
};
