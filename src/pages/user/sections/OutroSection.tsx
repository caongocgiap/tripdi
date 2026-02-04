import { motion } from "framer-motion";
import { Heart, Plane } from "lucide-react";

export const OutroSection = () => {
	return (
		<section className="relative w-full h-screen py-16 bg-linear-to-b from-amber-50/60 via-white to-sky-50/60">
			<div className="container w-full h-full mx-auto px-4 sm:px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.2, margin: "-50px" }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="h-full w-full mx-auto text-center flex flex-col items-center justify-center gap-4"
				>
					<div className="inline-flex items-center justify-center gap-2 text-amber-600 text-sm font-medium px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 mb-1">
						<Plane size={16} />
						<span>Cảm ơn cậu đã đi cùng tớ đến đây</span>
					</div>

					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
						Nhân lúc bạn và trái tim đều còn trẻ, còn khao khát
						<br />
						thì hãy đi đến nơi bạn muốn đến trước khi{" "}
						<span className="text-amber-600 relative inline-block">
							bạn thay đổi và nơi đó cũng thay đổi.
							<span
								className="absolute -bottom-1 left-0 w-full h-1 bg-amber-300/60 rounded-full"
								aria-hidden
							/>
						</span>{" "}
						<br />
						Bạn sẽ không trẻ mãi và đôi khi cảnh đẹp cũng không trường tồn.
					</h2>

					<p className="text-sm sm:text-base text-slate-600 leading-relaxed">
						Cảm ơn vì đã ghé qua TripDi và dành thời gian nhìn lại những chuyến đi của tớ.
						Hy vọng đâu đó cậu cũng sẽ tìm thấy một chút cảm hứng, một điểm đến mới
						hoặc đơn giản là một cảm giác bình yên.
					</p>

					<div className="flex items-center justify-center gap-2 pt-2 text-amber-600 text-sm font-medium">
						<Heart size={16} className="fill-amber-500/80 text-amber-500" />
						<span>Tớ là Giáp — cảm ơn cậu rất nhiều vì đã ghé thăm.</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
};