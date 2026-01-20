import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import type { IAlbum, IPhoto } from "@/types/photo";

const COLLECTION_IMAGES = "images";
const COLLECTION_ALBUMS = "albums";

export const savePhotoMetadata = async (
  photoData: Omit<IPhoto, "id" | "createdAt">
) => {
  return await addDoc(collection(db, COLLECTION_IMAGES), {
    ...photoData,
    createdAt: serverTimestamp(),
  });
};

export const createAlbumWithPhotos = async (
  albumData: Omit<IAlbum, "id" | "createdAt">,
  photos: { url: string; publicId: string }[]
) => {
  const albumRef = await addDoc(collection(db, COLLECTION_ALBUMS), {
    ...albumData,
    createdAt: serverTimestamp(),
  });

  const batch = writeBatch(db);
  photos.forEach((p) => {
    const photoRef = doc(collection(db, COLLECTION_IMAGES));
    batch.set(photoRef, {
      albumId: albumRef.id,
      url: p.url,
      publicId: p.publicId,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
  return albumRef.id;
};
