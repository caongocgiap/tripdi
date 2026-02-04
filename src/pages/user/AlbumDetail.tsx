import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AlbumDetail() {
	const { albumId } = useParams();
	const navigate = useNavigate();

	return (
		<section className="pt-20 pb-16 scroll-mt-24 container mx-auto">
			<div className="flex flex-col gap-6">
				<div className="flex align-center justify-between">
					<h1 className="text-3xl font-bold">Ảnh trong chuyến đi</h1>
					<Button
						onClick={() => navigate(-1)}
						variant="outline"
						className="flex items-center gap-2 cursor-pointer"
					>
						<ArrowLeftIcon className="w-4 h-4" />
						Quay lại
					</Button>
				</div>
				<PhotoGallery AlbumId={albumId || null} />
			</div>
		</section>
	);
}