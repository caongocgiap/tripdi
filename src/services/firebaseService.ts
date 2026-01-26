import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import type { IAlbum, IPhoto } from "@/types/types";
import { IMAGES_COLLECTION, ALBUMS_COLLECTION } from "@/constants/collection.constant";

export const savePhotoMetadata = async (
  photoData: Omit<IPhoto, "id" | "createdAt">
) => {
  return await addDoc(collection(db, IMAGES_COLLECTION), {
    ...photoData,
    createdAt: serverTimestamp(),
  });
};

export const createAlbumWithPhotos = async (
  albumData: Omit<IAlbum, "id" | "createdAt">,
  photos: { url: string; publicId: string }[]
) => {
  const albumRef = await addDoc(collection(db, ALBUMS_COLLECTION), {
    ...albumData,
    createdAt: serverTimestamp(),
  });

  const batch = writeBatch(db);
  photos.forEach((p) => {
    const photoRef = doc(collection(db, IMAGES_COLLECTION));
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
