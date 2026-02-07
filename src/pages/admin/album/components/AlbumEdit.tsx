import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef, useCallback } from "react";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import { deleteImage, addPhotosToAlbum } from "@/services/firebaseService";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import type { IAlbum, IPhoto } from "@/types/types";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import { IMAGES_COLLECTION } from "@/constants/collection.constant";
import { PhotoThumbItem } from "./PhotoThumbItem";

/** Chuyển date từ DD/MM/YYYY hoặc string sang YYYY-MM-DD cho input[type=date] */
function toInputDate(value: string | undefined): string {
  if (!value) return "";
  const parts = value.trim().split(/[/-]/);
  if (parts.length === 3) {
    const [a, b, c] = parts;
    if (a.length === 4) return value;
    return `${c}-${b.padStart(2, "0")}-${a.padStart(2, "0")}`;
  }
  return value;
}

interface AlbumEditProps {
  album: IAlbum | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    albumId: string,
    data: Partial<Pick<IAlbum, "nameTrip" | "location" | "date" | "description" | "coverImage">>
  ) => Promise<void>;
}

export default function AlbumEdit({ album, open, onOpenChange, onSave }: AlbumEditProps) {
  const [nameTrip, setNameTrip] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [photosInAlbum, setPhotosInAlbum] = useState<IPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const [addingImages, setAddingImages] = useState(false);
  const addPhotosInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (album && open) {
      setNameTrip(album.nameTrip ?? "");
      setLocation(album.location ?? "");
      setDate(toInputDate(album.date));
      setDescription(album.description ?? "");
      setCoverImageFile(null);
    }
  }, [album, open]);

  const fetchPhotos = useCallback(async () => {
    if (!album?.id) return;
    const q = query(
      collection(db, IMAGES_COLLECTION),
      where("albumId", "==", album.id),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as IPhoto[];
    setPhotosInAlbum(list);
  }, [album?.id]);

  useEffect(() => {
    if (!album?.id || !open) {
      setPhotosInAlbum([]);
      return;
    }
    let cancelled = false;
    setLoadingPhotos(true);
    const q = query(
      collection(db, IMAGES_COLLECTION),
      where("albumId", "==", album.id),
      orderBy("createdAt", "desc")
    );
    getDocs(q)
      .then((snapshot) => {
        if (cancelled) return;
        setPhotosInAlbum(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as IPhoto[]);
      })
      .finally(() => {
        if (!cancelled) setLoadingPhotos(false);
      });
    return () => {
      cancelled = true;
    };
  }, [album?.id, open]);

  const handleDeletePhoto = useCallback(
    async (imageId: string) => {
      if (!window.confirm("Delete this image from the album?")) return;
      setDeletingImageId(imageId);
      try {
        await deleteImage(imageId);
        setPhotosInAlbum((prev) => prev.filter((p) => p.id !== imageId));
      } catch (err) {
        console.error(err);
        alert("Cannot delete image.");
      } finally {
        setDeletingImageId(null);
      }
    },
    []
  );

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!album?.id || !files?.length) return;
    setAddingImages(true);
    try {
      const uploads = Array.from(files).map((file) => uploadImageToCloudinary(file));
      const results = await Promise.all(uploads);
      await addPhotosToAlbum(
        album.id,
        results.map((r) => ({ url: r.urlImage, publicId: r.publicId }))
      );
      await fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Cannot add image.");
    } finally {
      setAddingImages(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!album?.id || !nameTrip.trim() || !location.trim() || !date.trim()) {
      alert("Please fill in all the information.");
      return;
    }

    setSaving(true);
    try {
      let coverImageUrl = album.coverImage;
      if (coverImageFile) {
        const res = await uploadImageToCloudinary(coverImageFile);
        coverImageUrl = res.urlImage;
      }

      const dateParts = date.split("-");
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      await onSave(album.id, {
        nameTrip: nameTrip.trim(),
        location: location.trim(),
        date: formattedDate,
        description: description.trim() || undefined,
        coverImage: coverImageUrl,
      });
      alert("Album updated successfully!");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert("Error updating album.");
    } finally {
      setSaving(false);
    }
  };

  if (!album) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Album</DialogTitle>
          <DialogDescription>
            Update information and images in the album. You can delete images or add new images.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-name-trip">Name Trip</Label>
            <Input
              id="edit-name-trip"
              value={nameTrip}
              onChange={(e) => setNameTrip(e.target.value)}
              placeholder="Vi vu Hà Giang"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hà Giang"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-date">Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Cover Image</Label>
            {album.coverImage && !coverImageFile && (
              <img
                src={album.coverImage.replace("/upload/", "/upload/f_auto,q_auto/")}
                alt="Current cover"
                className="h-24 w-24 object-cover rounded border"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImageFile(e.target.files?.[0] ?? null)}
            />
            {coverImageFile && (
              <span className="text-xs text-slate-500">New file selected, will replace the cover image.</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Images in album</Label>
            {loadingPhotos ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Spinner className="w-4 h-4" />
                Loading images...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto rounded border p-2 bg-slate-50/50">
                  {photosInAlbum.map((photo) => (
                    <PhotoThumbItem
                      key={photo.id}
                      photo={photo}
                      onDelete={handleDeletePhoto}
                      isDeleting={deletingImageId === photo.id}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    ref={addPhotosInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleAddPhotos}
                    disabled={addingImages}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={addingImages}
                    onClick={() => addPhotosInputRef.current?.click()}
                  >
                    {addingImages ? <Spinner className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {addingImages ? " Adding..." : " Add image"}
                  </Button>
                  <span className="text-xs text-slate-500">{photosInAlbum.length} images</span>
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? <Spinner className="w-4 h-4" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
