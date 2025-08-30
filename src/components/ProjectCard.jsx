import { motion, useReducedMotion } from "motion/react";
import { useData } from "../context/DataContext";
import { useCursor } from "../context/CursorContext";

export default function ProjectCard({
  title = "Project Title",
  description = "Short project description goes here.",
  url = "#", // GitHub link
  liveUrl = "#", // Live project link
  techs = [],
  imageSrc,
  isReverse = false,
  isMobile: isMobileProp = false,
}) {
  const { techIcons, isMobile: isMobileCtx } = useData();
  const { setCursorText, setActive } = useCursor();
  const isMobile = isMobileProp ?? isMobileCtx;
  const prefersReduced = useReducedMotion();
  const imgY = prefersReduced || isMobile ? 8 : 20;
  const viewport = { once: false, amount: 0.2 };

  return (
    <motion.article
      className="disable-cursor-glow z-0 project-card relative w-full max-w-7xl mx-auto bg-transparent shadow-inner shadow-slate-500 rounded-2xl p-10 cursor-none"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      whileHover={
        !isMobile
          ? {
              y: -12,
              scale: 1.02,
              boxShadow: "0px 12px 30px rgba(0,0,0,0.3)",
            }
          : {}
      }
      whileTap={
        isMobile
          ? {
              scale: 0.97, // subtle press-down animation for mobile
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseEnter={() => {
        if (!isMobile) {
          setCursorText("click to 👀");
          setActive(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) setActive(false);
      }}
      onClick={() => {
        if (liveUrl && liveUrl !== "#") {
          window.open(liveUrl, "_blank");
        }
      }}
    >
      <div
        className={`flex flex-col lg:items-center lg:justify-between lg:gap-8 lg:flex-row ${
          isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Project Image */}
        <motion.div
          className="lg:w-1/2 w-full flex-shrink-0"
          variants={{
            hidden: { opacity: 0, y: imgY },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl bg-slate-800 shadow-slate-600">
            <img
              src={imageSrc}
              alt={`${title} screenshot`}
              className="w-full h-96 object-cover"
            />
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          className="lg:w-1/2 w-full mt-6 lg:mt-0"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight">
            {title}
          </h3>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-lg font-semibold text-indigo-500 hover:underline"
            onClick={(e) => e.stopPropagation()} // prevent triggering card click
          >
            Github Link
          </a>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {techs.length === 0 ? (
              <span className="text-sm">No techs listed</span>
            ) : (
              techs.map((t) => (
                <motion.div
                  key={t}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700 shadow-lg shadow-slate-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                >
                  {techIcons[t] || null}
                  <span className="text-sm text-white">{t}</span>
                </motion.div>
              ))
            )}
          </div>

          <p className="mt-5 text-base lg:text-lg max-w-xl">{description}</p>
          <p className="mt-5 text-base lg:text-lg max-w-xl text-indigo-400 font-semibold">Click to view project</p>
        </motion.div>
      </div>
    </motion.article>
  );
}
