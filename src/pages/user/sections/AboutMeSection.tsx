import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHOTOS = [
  {
    src: "https://res.cloudinary.com/tripdi/image/upload/v1769569102/z7475433258494_eef9b96b81d1b1cc7422bc7839ad5896_vfhpmy.jpg",
    class: "absolute top-0 left-10 w-64 h-80 object-cover rounded-2xl shadow-xl border-8 border-white z-20",
    motion: { initial: { rotate: -5, scale: 0.9 }, whileInView: { rotate: -2, scale: 1 } },
  },
  {
    src: "https://res.cloudinary.com/tripdi/image/upload/v1769569101/z7475433187988_b9b65eed9f7f0b6af7363d277756c1d9_dggh7m.jpg",
    class: "absolute bottom-0 right-0 w-48 h-48 object-cover rounded-2xl shadow-lg border-8 border-white z-10",
    motion: { initial: { rotate: 10, scale: 0.8 }, whileInView: { rotate: 5, scale: 1 } },
  },
  {
    src: "https://res.cloudinary.com/tripdi/image/upload/v1769569100/z7475433044157_2b1b822cac26bd94c05717ee2b6d52e3_hsyooo.jpg",
    class: "absolute top-5 right-5 w-48 h-48 object-cover rounded-2xl shadow-md border-4 border-white z-30",
    motion: { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
  },
];

export const AboutMeSection = () => {
  const scrollToAlbums = () => {
    document.getElementById("trip-diary")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden h-screen flex items-center justify-center">
      <div className="container bg-[#faf9f6] rounded-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 md:gap-20 h-[80vh] shadow-xl">
        <div className="flex-1 order-2 md:order-1">
          <motion.h2
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ amount: 0.2, margin: "-50px" }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Cảm ơn cậu đã ghé thăm,
            <br />
            tớ là <span className="text-amber-600 relative inline-block">
              Giáp
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400/40 rounded-full" aria-hidden />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ amount: 0.2, margin: "-50px" }}
            className="text-lg text-gray-600 leading-relaxed mb-6"
          >
            Một người đam mê du lịch bụi và thích ghi lại những khoảnh khắc đời thường qua ống kính.
            TripDi không chỉ là một website, nó là cuốn nhật ký mở nơi tớ lưu giữ dấu chân mình
            trên những nẻo đường, từ đỉnh Tam Đảo mờ sương đến những góc phố lạ lẫm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ amount: 0.2, margin: "-50px" }}
            className="border-l-4 border-amber-500/60 pl-5 py-2 mb-6 bg-amber-50/50 rounded-r-lg"
          >
            <p className="text-gray-700 italic">
              &ldquo;Rất vui được chia sẻ hành trình này cùng cậu.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ amount: 0.2, margin: "-50px" }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <Heart size={18} className="fill-red-400 text-red-400" />
              <span className="text-sm">Kỷ niệm mỗi chuyến đi</span>
            </div>
            <Button
              onClick={scrollToAlbums}
              variant="outline"
              size="sm"
              className="rounded-full border-amber-500/50 text-amber-700 hover:bg-amber-50 hover:border-amber-600"
            >
              Xem các chuyến đi
            </Button>
          </motion.div>
        </div>

        {/* Collage ảnh */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.2, margin: "-50px" }}
          className="flex-1 relative h-[400px] w-full max-w-md order-1 md:order-2 min-h-[360px] me-6"
        >
          {PHOTOS.map((photo, i) => (
            <motion.img
              key={i}
              src={photo.src}
              alt="Tớ đây"
              {...photo.motion}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ amount: 0.2, margin: "-50px" }}
              className={`${photo.class} hover:shadow-2xl transition-shadow duration-300`}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ amount: 0.2, margin: "-50px" }}
            className="absolute -bottom-3 -left-3 z-40 bg-white/95 backdrop-blur rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 text-gray-600 text-sm"
          >
            <Camera size={16} className="text-amber-600" />
            <span>Đây là tớ</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
