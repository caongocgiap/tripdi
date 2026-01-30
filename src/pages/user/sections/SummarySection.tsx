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
		<section className="relative w-full h-screen flex items-center bg-linear-to-b from-amber-50/60 via-white to-sky-50/60">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ amount: 0.3, once: false }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="grid gap-10 md:gap-14 md:grid-cols-2 items-center w-full container mx-auto"
			>
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ amount: 0.3, once: false }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="relative"
				>
					<div className="relative rounded-3xl border border-white/60 bg-white/80 backdrop-blur shadow-[0_18px_60px_rgba(15,23,42,0.12)] overflow-hidden py-2">
						<VietnamMap
							className="w-full h-[80vh]"
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
						/>

						<div className="absolute top-4 left-4 flex flex-col gap-2">
							<div className="flex items-center gap-2 text-xs text-slate-700">
								<span className="h-3 w-3 rounded-[4px] bg-[#22c55e] shadow-[0_0_0_1px_rgba(16,185,129,0.5)]" />
								<span>Đã đặt chân</span>
							</div>
							<div className="flex items-center gap-2 text-xs text-slate-500">
								<span className="h-3 w-3 rounded-[4px] bg-[#e5e7eb] shadow-[0_0_0_1px_rgba(148,163,184,0.7)]" />
								<span>Chưa đặt chân</span>
							</div>
						</div>
					</div>

					{hoverName && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/85 text-white text-xs md:text-sm px-3 py-1 rounded-lg pointer-events-none shadow-sm"
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
					className="space-y-5 md:space-y-7"
				>
					<div>
						<p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-600/80 mb-2">
							Summary
						</p>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
							Hành trình 3 năm của tớ
						</h2>
						<p className="text-sm text-slate-600">
							Một chút tổng kết nhỏ về những nơi tớ đã đi qua và những dấu chân đang dần phủ kín bản đồ Việt Nam.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<motion.div
							whileHover={{ scale: 1.03, translateY: -3 }}
							transition={{ type: "spring", stiffness: 220, damping: 18 }}
							className="rounded-2xl bg-linear-to-b from-amber-50 to-white shadow-sm border border-amber-100 px-4 py-3"
						>
							<p className="text-xs uppercase tracking-wide text-amber-700/80">
								Tỉnh thành đã đặt chân
							</p>
							<p className="mt-1 text-2xl font-semibold text-amber-700">
								{visitedCount}/64
							</p>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.03, translateY: -3 }}
							transition={{ type: "spring", stiffness: 220, damping: 18 }}
							className="rounded-2xl bg-linear-to-b from-sky-50 to-white shadow-sm border border-sky-100 px-4 py-3"
						>
							<p className="text-xs uppercase tracking-wide text-sky-700/80">
								Số chuyến đi
							</p>
							<p className="mt-1 text-2xl font-semibold text-sky-700">
								150+
							</p>
						</motion.div>
					</div>

					<div className="space-y-1.5 text-sm text-slate-700">
						<p>• Khoảng 3 năm rong ruổi khắp miền Bắc.</p>
						<p>• Hơn 80 chuyến đi chỉ riêng năm 2026.</p>
						<p>• Mỗi điểm đến là một câu chuyện nhỏ trong cuốn nhật ký TripDi.</p>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
};