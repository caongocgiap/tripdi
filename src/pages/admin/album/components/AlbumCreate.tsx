import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { uploadImageToCloudinary } from "@/services/cloudinaryService";
import { createAlbumWithPhotos } from "@/services/firebaseService";
import { Spinner } from "@/components/ui/spinner";

const AlbumCreate = () => {
  const [nameTrip, setNameTrip] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setNameTrip("");
    setLocation("");
    setDate("");
    setDescription("");
    setCoverImage(null);
    setImages(null);
  };

  const handleCreateAlbum = async () => {
    if (!nameTrip || !location || !date || !coverImage || (images && images.length === 0)) {
      return alert("Vui lòng nhập đầy đủ thông tin");
    }
    setUploading(true);
    try {
      const uploadPromises = Array.from(images || []).map((image) =>
        uploadImageToCloudinary(image)
      );
      const uploadedImages = await Promise.all(uploadPromises);
      const coverImageUrl = await uploadImageToCloudinary(coverImage);

      const dateParts = date.split("-");
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      await createAlbumWithPhotos(
        {
          nameTrip,
          location: location,
          date: formattedDate,
          description,
          coverImage: coverImageUrl.url,
        },
        uploadedImages
      );
      alert("Album đã được tạo thành công!");
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!" + error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Album</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>
            Add a new album to your collection!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name-trip" className="text-sm font-bold">Name Trip</Label>
            <Input id="name-trip" type="text" placeholder="Vi vu Hà Giang" value={nameTrip} onChange={(e) => setNameTrip(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="location" className="text-sm font-bold">Location</Label>
            <Input id="location" type="text" placeholder="Hà Giang" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="date" className="text-sm font-bold">Date</Label>
            <Input id="date" type="date" placeholder="2026-01-01" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="text-sm font-bold">Description</Label>
            <Textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="cover-image" className="text-sm font-bold">Cover Image</Label>
            <Input id="cover-image" type="file" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="images" className="text-sm font-bold">Images</Label>
            <Input id="images" type="file" multiple onChange={(e) => setImages(e.target.files)} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreateAlbum} disabled={uploading}>{uploading ? <Spinner /> : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AlbumCreate;