import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import {
  collection,
  query,
  orderBy,
  where,
  QueryDocumentSnapshot,
  type DocumentData,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import type { IPhoto } from "@/types/types";
import { IMAGES_COLLECTION } from "@/constants/collection.constant";

const PAGE_SIZE = 12;

export const usePhotos = (AlbumId: string | null) => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  useEffect(() => {
    if (!AlbumId) {
      setPhotos([]);
      setLastDoc(null);
      setHasMore(true);
      return;
    }

    fetchFirstPage();
  }, [AlbumId]);

  const fetchFirstPage = async () => {
    setLoading(true);

    const q = query(
      collection(db, IMAGES_COLLECTION),
      where("albumId", "==", AlbumId),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);

    const photoList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IPhoto[];

    setPhotos(photoList);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setHasMore(snapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  const fetchNextPage = async () => {
    if (!lastDoc || !hasMore || loading) return;

    setLoading(true);

    const q = query(
      collection(db, IMAGES_COLLECTION),
      where("albumId", "==", AlbumId),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);

    const newPhotos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IPhoto[];

    setPhotos((prev) => [...prev, ...newPhotos]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setHasMore(snapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  return { photos, loading, hasMore, fetchNextPage };
};
