import { Spinner } from "@/components/ui/spinner";
import { useAlbums } from "@/hooks/useAlbums";
import { useState } from "react";
import type { IAlbum } from "@/types/types";
import AlbumCard from "@/components/gallery/AlbumCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";

export const MyTripSection = () => {
	const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
	const { albums, loading: albumsLoading } = useAlbums();

	if (albumsLoading) return (
		<div className="text-center p-10 flex flex-col items-center justify-center gap-4 h-screen">
			<Spinner className="w-10 h-10" />
			<p className="text-lg font-bold">Loading data...</p>
		</div>
	);

	return (
		<section className="container mx-auto h-screen">
			{!selectedAlbumId ? (
				<section id="trip-diary" className="pt-4 scroll-mt-24">
					<h2 className="text-3xl font-bold mb-6">Chuyến đi của tôi</h2>
					{albumsLoading ? (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[1, 2, 3].map(i => <div key={i} className="aspect-3/4 bg-gray-200 animate-shimmer rounded-travel" />)}
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
							{albums.map((album: IAlbum) => (
								<AlbumCard
									key={album.id}
									album={album}
									onClick={setSelectedAlbumId}
								/>
							))}
						</div>
					)}
				</section>
			) : (
				<section className="pt-4 scroll-mt-24 pb-24">
					<div className="flex flex-col gap-6">
						<div className="flex align-center justify-between">
							<h1 className="text-3xl font-bold">Ảnh trong chuyến đi</h1>
							<Button
								onClick={() => setSelectedAlbumId(null)}
								variant="outline"
								className="flex items-center gap-2 cursor-pointer"
							>
								<ArrowLeftIcon className="w-4 h-4" />
								Quay lại danh sách album
							</Button>
						</div>
						<PhotoGallery AlbumId={selectedAlbumId} />
					</div>
				</section>
			)}
		</section>
	);
};