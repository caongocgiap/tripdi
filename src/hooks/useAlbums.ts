import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import type { IAlbum } from "@/types/types";
import { ALBUMS_COLLECTION } from '@/constants/collection.constant'

export const useAlbums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, ALBUMS_COLLECTION), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const albumList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as IAlbum[];

      setAlbums(albumList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { albums, loading };
};