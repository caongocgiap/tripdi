import { useState, useEffect } from "react";

type BannerImage = { src: string; alt?: string };

const DEFAULT_IMAGES: BannerImage[] = [
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1769566957/z7475269742987_f0194fc399792661a38df03c25027946_j6eibe.jpg" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1769566956/z7475269669626_fe683c63edfdbe0859a77fb7811c96cd_evpgwg.jpg" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1769566957/z7475269387667_bff0cd61ba94a756d0e9a040e0bf6837_a7rr2h.jpg" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1769566957/z7475269495219_cc67f4ee26f20ad2dd20f76b180656f0_opfjeg.jpg" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1769566956/z7475269215418_821b5304b32e012d89a6edd392699ab2_xzp6pb.jpg" },
];

interface BannerSectionProps {
	images?: (string | BannerImage)[];
	title?: string;
	subtitle?: string;
}

export const BannerSection = ({ images, title, subtitle }: BannerSectionProps) => {
	const [scrollY, setScrollY] = useState(0);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const list: BannerImage[] = (images ?? DEFAULT_IMAGES).map((x) =>
		typeof x === "string" ? { src: x, alt: "" } : x
	);

	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Parallax: mỗi ảnh dịch theo scroll với tốc độ khác nhau
	const speeds = [0.15, 0.25, 0.35, 0.2, 0.3];

	return (
		<section
			className="relative h-screen overflow-hidden bg-black"
			aria-label="Banner Expandable Photos Parallax"
		>
			{/* Dải ảnh nằm ngang – hover để ô đó expand */}
			<div className="absolute inset-0 flex gap-[2px]">
				{list.slice(0, 5).map((img, i) => {
					const offset = scrollY * (speeds[i] ?? 0.2);
					const isHovered = hoveredIndex === i;
					// Hover → ô đó mở rộng chiếm ~60%, các ô khác thu nhỏ
					return (
						<div
							key={i}
							className="relative shrink-0 overflow-hidden transition-all duration-700 ease-in-out cursor-pointer group"
							style={{
								flex: isHovered ? "1 1 60%" : "1 1 18%",
								transform: `translateY(${offset * 0.35}px)`,
							}}
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<img
								src={img.src}
								alt={img.alt ?? `Ảnh ${i + 1}`}
								className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
								loading="eager"
								decoding="async"
							/>
							<div
								className="absolute inset-0 bg-black/30 transition-opacity duration-500"
								style={{ opacity: isHovered ? 0 : 1 }}
								aria-hidden
							/>
						</div>
					);
				})}
			</div>

			<div
				className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
				style={{ transform: `translateY(${scrollY * 0.1}px)` }}
			>
				<h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-center drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]">
					{title}
				</h1>
				{subtitle && (
					<p className="mt-3 text-lg sm:text-xl text-white/90 drop-shadow-lg max-w-xl text-center">
						{subtitle}
					</p>
				)}
			</div>
		</section>
	);
};
