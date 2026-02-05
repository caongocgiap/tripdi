import VietnamMap from "@/assets/images/vn.svg?react";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import "@/pages/user/css/index.css";

type Props = {
	visited: string[];
};

export const SummarySection = ({ visited }: Props) => {
	const [hoverName, setHoverName] = useState<string | null>(null);

	useEffect(() => {
		visited.forEach((id) => {
			const el = document.getElementById(id);
			if (el) el.classList.add("visited");
		});
	}, [visited]);

	const handleMouseOver = (e: React.MouseEvent<SVGSVGElement>) => {
		const target = e.target;

		if (!(target instanceof SVGPathElement)) return;
		if (!target.classList.contains("province")) return;

		setHoverName(target.dataset.name ?? null);
	};

	const handleMouseOut = () => setHoverName(null);

	const visitedCount = visited.length;

	return (
		<section className="relative w-full min-h-screen flex items-center py-16 bg-linear-to-b from-amber-50/70 via-white to-sky-50/70">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ amount: 0.3, once: false }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="flex flex-col md:flex-row gap-10 md:gap-14 items-center w-full container mx-auto"
			>
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ amount: 0.3, once: false }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="relative w-full md:flex-1 md:min-w-0"
				>
					<div className="relative rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden">
						<VietnamMap
							className="w-full h-[70vh] min-h-[320px] object-contain"
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
						/>
						<div className="absolute top-4 left-4 flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/95 shadow-lg border border-slate-100/80 backdrop-blur-sm">
							<div className="flex items-center gap-2 text-xs font-medium text-slate-700">
								<span className="h-3.5 w-3.5 rounded-md bg-emerald-500 ring-2 ring-emerald-500/30" />
								<span>Đã đặt chân</span>
							</div>
							<div className="flex items-center gap-2 text-xs font-medium text-slate-500">
								<span className="h-3.5 w-3.5 rounded-md bg-slate-200 ring-2 ring-slate-200" />
								<span>Chưa đặt chân</span>
							</div>
						</div>
					</div>

					{hoverName && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-800/90 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-xl pointer-events-none shadow-lg ring-1 ring-white/10"
						>
							📍 {hoverName}
						</motion.div>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ amount: 0.3, once: false }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
					className="w-full md:flex-1 md:max-w-md space-y-6 md:space-y-8"
				>
					<div>
						<p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-2">
							Summary
						</p>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
							Hành trình 3 năm của tớ (11/2022 - Nay)
						</h2>
						<p className="text-sm text-slate-600 leading-relaxed">
							Một chút tổng kết nhỏ về những nơi tớ đã đi qua và những dấu chân đang dần phủ kín bản đồ Việt Nam.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:gap-4">
						<motion.div
							whileHover={{ scale: 1.02, y: -2 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="rounded-2xl bg-linear-to-br from-amber-50 to-white shadow-md border border-amber-100/80 px-4 py-4 hover:shadow-lg hover:border-amber-200/80 transition-shadow"
						>
							<p className="text-xs font-medium uppercase tracking-wider text-amber-700/90">
								Tỉnh thành đã đặt chân
							</p>
							<p className="mt-2 text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums">
								{visitedCount}/64
							</p>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.02, y: -2 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="rounded-2xl bg-linear-to-br from-sky-50 to-white shadow-md border border-sky-100/80 px-4 py-4 hover:shadow-lg hover:border-sky-200/80 transition-shadow"
						>
							<p className="text-xs font-medium uppercase tracking-wider text-sky-700/90">
								Số chuyến đi
							</p>
							<p className="mt-2 text-2xl sm:text-3xl font-bold text-sky-700 tabular-nums">
								150+
							</p>
						</motion.div>
					</div>

					<ul className="space-y-2 text-sm text-slate-600 list-none">
						<li className="flex items-start gap-2">
							<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
							<span>Tớ đã đi được gần hết miền Bắc Việt Nam.</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
							<span>2025 là năm tớ đã đi được nhiều nhất.</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
							<span>Mỗi chuyến đi đều khiến tớ cảm thấy trưởng thành thêm một chút.</span>
						</li>
					</ul>
				</motion.div>
			</motion.div>
		</section>
	);
};