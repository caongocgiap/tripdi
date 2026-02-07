import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { useAlbums } from "@/hooks/useAlbums";
import type { IAlbum } from "@/types/types";
import AlbumCard from "@/components/gallery/AlbumCard";
import { useNavigate } from "react-router-dom";
import { PREFIX_USER_ALBUM_DETAIL } from "@/constants/url.constant";

export const AlbumSection = () => {
	const { albums, loading: albumsLoading } = useAlbums();
	const navigate = useNavigate();
	const handleAlbumClick = useCallback(
		(id: string) => navigate(`${PREFIX_USER_ALBUM_DETAIL}/${id}`),
		[navigate]
	);

	const albumsByYear = useMemo(() => {
		const map = new Map<string, IAlbum[]>();

		albums.forEach((album) => {
			let year = "Khác";
			if (album.date) {
				const match = album.date.match(/(20\d{2})/);
				if (match) year = match[1];
			}

			if (!map.has(year)) {
				map.set(year, []);
			}
			map.get(year)!.push(album);
		});

		return Array.from(map.entries()).sort(([a], [b]) => {
			if (a === "Khác") return 1;
			if (b === "Khác") return -1;
			return Number(b) - Number(a);
		});
	}, [albums]);

	if (albumsLoading)
		return (
			<section className="relative w-full min-h-screen flex items-center justify-center py-16 bg-linear-to-b from-amber-50/50 via-white to-sky-50/50">
				<div className="flex flex-col items-center justify-center gap-5">
					<Spinner className="w-10 h-10 text-amber-600" />
					<p className="text-slate-600 font-medium">Loading trips...</p>
				</div>
			</section>
		);

	return (
		<section className="relative w-full min-h-screen py-16 overflow-hidden bg-linear-to-b from-amber-50/50 via-white to-sky-50/50">
			<div className="container w-full mx-auto px-4 sm:px-6">
				<div id="trip-diary" className="scroll-mt-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ amount: 0.2, margin: "-50px" }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="mb-8 md:mb-10"
					>
						<p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-2">
							Album
						</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
							Chuyến đi của{" "}
							<span className="text-amber-600 relative inline-block">
								tớ
								<span
									className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400/50 rounded-full"
									aria-hidden
								/>
							</span>
						</h2>
						<p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl">
							Mỗi chuyến đi đều được tớ lưu lại ở đây!
						</p>
					</motion.div>

					<div className="space-y-10 sm:space-y-12">
						{albumsByYear.map(([year, yearAlbums]) => (
							<section key={year} aria-label={`Album năm ${year}`} className="space-y-4">
								<div className="flex items-baseline justify-between gap-3">
									<div className="flex items-center gap-2">
										<p className="text-lg font-semibold text-slate-800">
											{year === "Khác" ? "Khác" : `Năm ${year}`}
										</p>
									</div>
									<p className="text-xs text-slate-500">
										{yearAlbums.length} chuyến đi
									</p>
								</div>

								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ amount: 0.05, margin: "-20px" }}
									transition={{ duration: 0.4 }}
									className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6"
								>
									{yearAlbums.map((album) => (
										<AlbumCard
											key={album.id}
											album={album}
											onClick={handleAlbumClick}
										/>
									))}
								</motion.div>
							</section>
						))}
					</div>

					{albums.length === 0 && (
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ amount: 0.2 }}
							className="text-center text-slate-500 py-12"
						>
							Chưa có album nào. Tớ sẽ cập nhật sau!
						</motion.p>
					)}
				</div>
			</div>
		</section>
	);
};
