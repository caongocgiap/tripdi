import { useState, useEffect } from "react";

/**
 * Trả về offset Y dựa trên scroll để tạo hiệu ứng parallax.
 * @param speed Hệ số tốc độ (0.2 = chậm, 0.5 = trung bình, 1 = nhanh)
 */
export const useParallax = (speed: number = 0.3) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
};
