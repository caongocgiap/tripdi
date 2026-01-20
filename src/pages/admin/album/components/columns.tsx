"use client"

import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { IAlbum } from "@/types/photo"
import type { ColumnDef } from "@tanstack/react-table"

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

export const columns: ColumnDef<IAlbum>[] = [
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
      const imageUrl = row.getValue("coverImage") as string;
      return (
        <img
          src={imageUrl?.replace('/upload/', '/upload/f_auto,q_auto/')}
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
]