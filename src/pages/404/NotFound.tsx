import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] w-full px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Không tìm thấy</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              404
            </h1>
          </div>
        </div>

        <p className="mt-4 text-slate-600">
          Xin lỗi, trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Trang trước
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#253741] bg-[#253741] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            <Home size={18} />
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
