import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  writeBatch,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
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

/** Xóa album và toàn bộ ảnh thuộc album đó */
export const deleteAlbum = async (albumId: string) => {
  const imagesRef = collection(db, IMAGES_COLLECTION);
  const q = query(imagesRef, where("albumId", "==", albumId));
  const snapshot = await getDocs(q);

  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();

  const albumRef = doc(db, ALBUMS_COLLECTION, albumId);
  await deleteDoc(albumRef);
};

/** Cập nhật thông tin album (metadata + cover) */
export const updateAlbum = async (
  albumId: string,
  data: Partial<Pick<IAlbum, "nameTrip" | "location" | "date" | "description" | "coverImage">>
) => {
  const albumRef = doc(db, ALBUMS_COLLECTION, albumId);
  await updateDoc(albumRef, data);
};

/** Xóa một ảnh trong album */
export const deleteImage = async (imageId: string) => {
  const imageRef = doc(db, IMAGES_COLLECTION, imageId);
  await deleteDoc(imageRef);
};

/** Thêm ảnh vào album (sau khi đã upload lên Cloudinary) */
export const addPhotosToAlbum = async (
  albumId: string,
  photos: { url: string; publicId: string }[]
) => {
  if (photos.length === 0) return;
  const batch = writeBatch(db);
  photos.forEach((p) => {
    const photoRef = doc(collection(db, IMAGES_COLLECTION));
    batch.set(photoRef, {
      albumId,
      url: p.url,
      publicId: p.publicId,
      createdAt: serverTimestamp(),
    });
  });
  await batch.commit();
};
