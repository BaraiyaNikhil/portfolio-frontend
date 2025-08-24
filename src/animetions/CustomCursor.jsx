// portfolio/src/animetions/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor({ text = "", active = false }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Fallback update on scroll/resize (prevents "stuck" state)
    const handleScrollOrResize = () => {
      // Force re-check last mouse position
      setPosition((pos) => ({ ...pos }));
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  if (!active) return null;

  return (
    <motion.div
      className="
        fixed top-0 left-0 z-[9999] pointer-events-none
        px-3 py-3 flex items-center justify-center
        rounded-full backdrop-blur-md bg-white/20 border border-white/30
        shadow-lg shadow-slate-900/30
        font-semibold text-sm text-slate-800
      "
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        x: position.x - 90, // offset to center cursor
        y: position.y -50,
        scale: 1,
        opacity: 1,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {text}
    </motion.div>
  );
}
