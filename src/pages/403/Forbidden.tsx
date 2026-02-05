import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
	const navigate = useNavigate();

	return (
		<section className="min-h-screen w-full flex items-center justify-center py-16 bg-linear-to-b from-amber-50/60 via-white to-sky-50/60">
			<div className="container w-full mx-auto px-4 sm:px-6">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="max-w-xl mx-auto rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-slate-100 p-8 sm:p-10 text-center"
				>
					<p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-3">
						Bạn mò vào trang này làm gì -.-
					</p>

					<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-4">
						<ShieldAlert size={28} />
					</div>

					<h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
						403
					</h1>

					<p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
						Trang này tớ dùng để thêm bớt ảnh, nếu cậu muốn đóng góp ảnh thì inbox cho tớ qua messenger nhé!
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
						<Button
							onClick={() => navigate("/")}
							className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/50 bg-white px-5 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-50 hover:border-amber-600 transition-colors"
						>
							<Home size={18} />
							Về trang chủ
						</Button>
						<Button
							onClick={() => window.open("https://www.facebook.com/messages/t/ngcoo.giapw", "_blank")}
							className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/50 bg-white px-5 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-50 hover:border-amber-600 transition-colors"
						>
							<MessageCircle size={18} />
							Messenger
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
