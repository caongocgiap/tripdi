"use client";

import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { IAlbum } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";

const PhotoCount = ({ albumId }: { albumId: string | undefined }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!albumId) {
      setCount(0);
      return;
    }

    const q = query(
      collection(db, "images"),
      where("albumId", "==", albumId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [albumId]);

  return <span>{count ?? "-"}</span>;
};

export const getColumns = (
  onDelete: (albumId: string) => void,
  onEdit: (album: IAlbum) => void,
  deletingId: string | null
): ColumnDef<IAlbum>[] => [
    {
      id: "stt",
      header: "STT",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: "nameTrip",
      header: "Name Trip",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const dateValue = row.getValue("date") as string;
        if (!dateValue) return "-";
        try {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return dateValue;

          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        } catch {
          return dateValue;
        }
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Total Images",
      cell: ({ row }) => {
        const albumId = row.original.id;
        return <PhotoCount albumId={albumId} />;
      },
    },
    {
      accessorKey: "coverImage",
      header: "Cover Image",
      cell: ({ row }) => {
        const imageUrl = (row.getValue("coverImage") as string)?.replace("/upload/", "/upload/f_auto,q_auto/") ?? "";
        return (
          <img
            src={imageUrl}
            alt="Cover"
            className="w-16 h-16 object-cover rounded"
          />
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
        if (!createdAt) return "-";

        let date: Date;
        if (createdAt instanceof Date) {
          date = createdAt;
        } else if (typeof createdAt === "number") {
          date = new Date(createdAt);
        } else if (typeof createdAt === "object" && createdAt !== null && "seconds" in createdAt) {
          date = new Date((createdAt as { seconds: number }).seconds * 1000);
        } else if (typeof createdAt === "string") {
          date = new Date(createdAt);
        } else {
          return "-";
        }

        if (isNaN(date.getTime())) return "-";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const album = row.original;
        const albumId = album.id;
        const isDeleting = albumId !== undefined && deletingId === albumId;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              disabled={!!deletingId}
              onClick={() => onEdit(album)}
            >
              <Pencil size={16} />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={isDeleting}
              onClick={() => {
                if (!albumId) return;
                if (window.confirm("Are you sure you want to delete this album? All images in the album will also be deleted.")) {
                  onDelete(albumId);
                }
              }}
            >
              <Trash2 size={16} />
              {isDeleting ? " Deleting..." : " Delete"}
            </Button>
          </div>
        );
      },
    },
  ];