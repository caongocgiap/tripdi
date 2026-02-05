import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";

export const Header = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollDelta = currentY - lastScrollY.current;

      if (currentY <= 10) {
        setVisible(true);
      } else if (scrollDelta > 5) {
        setVisible(false);
      } else if (scrollDelta < -5) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 shadow-lg"
    >
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white hover:text-gray-300 text-2xl font-bold cursor-pointer bg-transparent border-none p-0"
            >
              Tripdi x NgocGiap
            </button>
          </div>
          <div className="flex gap-4">
            <FaFacebookSquare onClick={() => window.open("https://www.facebook.com/ngcoo.giapw", "_blank")} className="text-white hover:text-gray-300 text-2xl cursor-pointer" />
            <FaLinkedin onClick={() => window.open("https://www.linkedin.com/in/ngcoo-giapw", "_blank")} className="text-white hover:text-gray-300 text-2xl cursor-pointer" />
            <FaGithubSquare onClick={() => window.open("https://github.com/caongocgiap", "_blank")} className="text-white hover:text-gray-300 text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};