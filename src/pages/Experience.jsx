// src/Experience.jsx
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import johnCena from "../assets/imgs/john-cena.png";
import { useData } from "../context/DataContext";

export default function Experience() {
  const { isMobile } = useData();
  const prefersReducedMotion = useReducedMotion();
  const imgScale = prefersReducedMotion || isMobile ? 0.98 : 1.02;
  const viewport = { once: false, amount: 0.25 };

  return (
    <div
      id="experience"
      className="w-full sticky lg:top-0 lg:z-20 bg-slate-300 lg:rounded-t-2xl h-full flex flex-col overflow-x-hidden p-6 sm:p-10"
    >
      <span
        className="absolute top-3 right-3 text-slate-900 text-lg font-semibold tracking-wide"
      >
        Experience
      </span>
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-8 max-w-full break-words leading-tight pt-3 [text-shadow:_4px_4px_5px_rgba(15,23,42,0.3)]"
      >
        Experience
      </motion.h1>

      <div
        id="experience-info"
        className="relative w-full h-full flex flex-col justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: imgScale }}
          viewport={viewport}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="container w-52 h-52 mb-6 z-10 rounded-xl overflow-hidden hover:scale-105 transition-transform"
        >
          <img
            src={johnCena}
            alt="John Cena"
            className="w-full h-full object-cover hover:opacity-0 backdrop-blur-lg duration-500"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.08 }}
          className="absolute font-['Borel'] text-5xl z-0"
        >
          Sorry
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.16 }}
          className="text-base md:text-lg lg:text-2xl mb-3 max-w-2xl text-center"
        >
          <p>Hi there, I am open to work 😁🧑‍💻.</p>
        </motion.div>
      </div>
    </div>
  );
}
