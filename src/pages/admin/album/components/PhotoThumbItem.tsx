import { Spinner } from "@/components/ui/spinner";
import { getSmallThumbUrl } from "@/services/cloudinaryService";
import type { IPhoto } from "@/types/types";
import { Trash2 } from "lucide-react";
import { memo } from "react";

export const PhotoThumbItem = memo(
	({
		photo,
		onDelete,
		isDeleting,
	}: {
		photo: IPhoto;
		onDelete: (id: string) => void;
		isDeleting: boolean;
	}) => (
		<div className="relative group aspect-square rounded overflow-hidden bg-slate-200">
			<img
				src={getSmallThumbUrl(photo.url ?? "")}
				alt=""
				loading="lazy"
				decoding="async"
				className="w-full h-full object-cover"
			/>
			<button
				type="button"
				onClick={() => onDelete(photo.id!)}
				disabled={isDeleting}
				className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-70"
			>
				{isDeleting ? (
					<Spinner className="w-6 h-6 text-white" />
				) : (
					<Trash2 className="w-6 h-6 text-white" />
				)}
			</button>
		</div>
	)
);