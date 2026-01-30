import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Header = () => {
  const navigate = useNavigate();
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
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10"
    >
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <h1>Tripdi x NgocGiap</h1>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/admin')} variant="outline">To Admin Page</Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};