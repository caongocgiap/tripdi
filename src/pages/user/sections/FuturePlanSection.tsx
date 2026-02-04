import { motion } from "framer-motion";

const FUTURE_PHOTOS = [
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1770175576/z7499408337024_481aa734d51df2fdc79e102d2568ea7a_vziauz.jpg", alt: "Đèo Khau Phạ - Yên Bái" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1770175576/z7499408292499_90bfc5fa520b01117bd9acfa7b7b56ca_memxyq.jpg", alt: "Đèo Pha Đin - Sơn La" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1770175576/z7499408206058_bbb54bbd27595a6d5bd145e057add372_k5qilr.jpg", alt: "Đèo Mã Pí Lèng - Hà Giang" },
	{ src: "https://res.cloudinary.com/tripdi/image/upload/v1770175576/z7499408380421_b2d46103ad38b52ff1d94a854d76631d_tqrst9.jpg", alt: "Đèo Ô Quy Hồ - Lào Cai" },
];

export const FuturePlanSection = () => {
	return (
		<section className="relative w-full min-h-screen flex items-center justify-center py-16">
			<div className="container w-full mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2, margin: "-50px" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-slate-100 overflow-hidden"
				>
					<div className="p-8 sm:p-10 md:p-12">
						<div className="mb-8">
							<div className="shrink-0">
								<p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600 mb-3">
									Tương lai
								</p>
								<motion.h2
									initial={{ opacity: 0, x: -24 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ amount: 0.2, margin: "-50px" }}
									transition={{ duration: 0.5 }}
									className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight"
								>
									Tớ muốn{" "}
									<span className="text-amber-600 relative inline-block">
										đi xuyên Việt
										<span
											className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400/50 rounded-full"
											aria-hidden
										/>
									</span>
								</motion.h2>
							</div>
							<motion.p
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ amount: 0.2, margin: "-50px" }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-base sm:text-lg text-slate-600 leading-relaxed md:pt-9"
							>
								Một chuyến từ Bắc vào Nam — trải nghiệm từng vùng miền, gặp con người và cảnh sắc khắp đất nước.
								Hành trình ấy tớ sẽ tiếp tục ghi lại trên TripDi, để vừa đi vừa lưu và sau này mở ra vẫn thấy rõ từng chặng đường tớ đi qua.
							</motion.p>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ amount: 0.2, margin: "-50px" }}
							transition={{ duration: 0.5, delay: 0.15 }}
							className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8"
						>
							{FUTURE_PHOTOS.map((photo, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.96 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ amount: 0.2, margin: "-30px" }}
									transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
									className="relative aspect-square rounded-2xl overflow-hidden shadow-md border border-slate-100 ring-1 ring-slate-100/50"
								>
									<img
										src={photo.src}
										alt={photo.alt}
										className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
										loading="lazy"
										decoding="async"
									/>
								</motion.div>
							))}
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ amount: 0.2, margin: "-50px" }}
							transition={{ delay: 0.3 }}
							className="mt-8 border-l-4 border-amber-500/70 pl-5 py-4 bg-amber-50/60 rounded-r-xl"
						>
							<p className="text-slate-700 italic leading-relaxed">
								&quot;Tớ đã chinh phục thành công tứ đại đỉnh đèo trong năm 2025, vài năm tới sẽ là chuyến xuyên Việt đầu tiên của tớ!&quot;
							</p>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
