// src/Skills.jsx
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useData } from "../context/DataContext";

export default function Skills() {
  const { techMeta, skills, isMobile } = useData();
  const prefersReduced = useReducedMotion();
  const itemY = prefersReduced || isMobile ? 8 : 20;
  const viewport = { once: false, amount: 0.18 };

  return (
    <div id="skills" className="w-full bg-slate-300 h-full flex flex-col md:flex-col overflow-x-hidden p-6 sm:p-10">
      <section>
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-6 leading-tight pt-3"
        >
          My Skills
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((tech) => {
            const meta = techMeta[tech];
            if (!meta) return null;

            return (
              <motion.div
                key={tech}
                className="flex items-center gap-4 p-4 rounded-xl shadow-inner shadow-slate-500 bg-white/30"
                variants={{ hidden: { opacity: 0, y: itemY }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg" style={{ color: meta.color }} aria-hidden>
                  <img src={meta.iconSrc} alt={`${tech} logo`} className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{tech}</h3>
                    <span className="text-sm font-medium">{meta.level}</span>
                  </div>

                  <p className="text-sm text-slate-800 mt-1">{meta.desc}</p>

                  <div className="mt-3 h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: meta.level === "Advanced" ? "90%" : meta.level === "Intermediate" ? "65%" : "40%", background: meta.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
