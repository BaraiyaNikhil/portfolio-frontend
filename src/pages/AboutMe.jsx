// src/AboutMe.jsx
import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useData } from "../context/DataContext";
import CanvasEffect from "../animetions/CanvasEffect";
import CustomCursor from "../animetions/CustomCursor";

export default function AboutMe() {
  const { isMobile } = useData();
  const prefersReducedMotion = useReducedMotion();
  const [cursorActive, setCursorActive] = useState(false);

  const headingDist = prefersReducedMotion || isMobile ? -20 : -50;
  const paraY = prefersReducedMotion || isMobile ? 12 : 30;
  const viewport = { once: false, amount: 0.25 };

  return (
    <div
      id="about-me"
      className="w-full h-auto flex flex-col md:flex-row overflow-x-hidden"
    >
      <div
        id="about-info"
        className="w-full lg:w-1/2 h-auto bg-slate-300 flex flex-col items-start p-6 sm:p-10 overflow-hidden"
      >
        {/* group: heading + paragraphs (staggered) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.28, delayChildren: 0.06 },
            },
          }}
          className="w-full text-left"
        >
          <motion.h1
            className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-8 max-w-full pt-3 break-words leading-tight [text-shadow:_4px_4px_5px_rgba(15,23,42,0.3)]"
            variants={{
              hidden: { opacity: 0, x: headingDist },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            About Me
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg mb-4"
            variants={{
              hidden: { opacity: 0, y: paraY },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            &nbsp;A web developer who loves turning ideas into smooth,
            interactive experiences on the web. I work mainly with the MERN
            stack (MongoDB, Express, React, Node.js) and enjoy making
            applications that feel fast, responsive, and user-friendly. Building
            this portfolio was as much a project as any other — a place where I
            combined code, design, and creativity to reflect who I am. Beyond
            coding, you’ll often find me gaming, playing sports like kabaddi or
            cricket, or exploring new places with friends — because for me,
            inspiration often comes from living outside the screen too.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg"
            variants={{
              hidden: { opacity: 0, y: paraY },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            &nbsp; I’m not just about writing code — I enjoy solving problems,
            learning new tech, and collaborating with creative minds. Outside
            the screen, you’ll often find me on the Kabaddi court, playing
            Cricket, gaming, or traveling with friends to discover new places
            (and good food! I am hungry man).
          </motion.p>
        </motion.div>
      </div>

      {/* right visual */}
      <div
        className="lg:w-1/2 hidden relative lg:flex items-center justify-center cursor-none"
        onMouseEnter={() => setCursorActive(true)}
        onMouseLeave={() => setCursorActive(false)}
      >
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.15 }}
          className="w-full h-full bg-transparent"
        >
          <CanvasEffect mouseEffect={true} />
        </motion.div>

        {/* Custom cursor only for right side */}
        <CustomCursor text="My Favourite Season 🌧️" active={cursorActive} />
      </div>
    </div>
  );
}
