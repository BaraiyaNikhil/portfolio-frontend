import { useEffect } from "react";
import logo from "../assets/imgs/logo.png";
import profile from "../assets/imgs/profile.jpg";
import resume from "../assets/files/Resume_Nikhil_Baraiya.pdf";
import { motion } from "motion/react";
import { useData } from "../context/DataContext";
import CanvasEffect from "../animetions/CanvasEffect";
import { useCursor } from "../context/CursorContext";

function Hero() {
  const { isMobile } = useData();
  const { setCursorText, setActive } = useCursor();

  // 🔹 Make sure cursor turns off if mouse leaves window or scroll hides the left div
  useEffect(() => {
    const handleMouseLeave = () => setActive(false);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Use IntersectionObserver to detect when left div is out of view
    const leftDiv = document.getElementById("left-cursor-zone");
    let observer;
    if (leftDiv) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) setActive(false);
        },
        { threshold: 0.1 }
      );
      observer.observe(leftDiv);
    }

    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (observer && leftDiv) observer.unobserve(leftDiv);
    };
  }, [setActive]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { x: isMobile ? -30 : 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div id="hero" className="w-full h-full flex flex-col md:flex-row overflow-x-hidden">
      {/* Left Transparent Div (activates cursor) */}
      <div
        id="left-cursor-zone"
        className="hidden relative lg:flex w-1/2 h-auto bg-transparent justify-between items-start flex-col cursor-none"
        onMouseEnter={() => {
          setCursorText("My Favourite Season 🌧️");
          setActive(true);
        }}
        onMouseLeave={() => setActive(false)}
      >
        <CanvasEffect mouseEffect={true} />

        <div id="logo" className="w-24 h-24 mx-5 my-3 flex items-center">
          <img src={logo} alt="Hero Logo" className="max-w-full h-auto object-contain" />
        </div>
        <div className="spcaebox w-full h-30 bg-slate-300 rounded-t-2xl"></div>
      </div>

      {/* Mobile Profile Image */}
      <motion.div
        className="lg:hidden w-30 h-30 mx-5 my-3 absolute top-10 right-5 rounded-b-full overflow-hidden shadow-lg shadow-slate-600"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={profile} alt="Hero Profile" className="max-w-full h-auto object-contain" />
      </motion.div>

      {/* Hero Info */}
      <motion.div
        className="w-full lg:w-1/2 h-auto bg-slate-300 flex flex-col items-start p-6 sm:p-10 overflow-hidden lg:rounded-b-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="font-semibold text-xl sm:text-2xl mb-8 sm:mb-16" variants={itemVariants}>
          Hi, I am
        </motion.p>

        <motion.h1
          className="font-['Borel'] text-4xl md:text-7xl lg:text-7xl mb-8 sm:mb-16 break-words leading-tight"
          variants={itemVariants}
        >
          Baraiya
        </motion.h1>

        <motion.h1
          className="font-['Borel'] text-6xl md:text-9xl mb-4 break-words leading-tight"
          variants={itemVariants}
        >
          Nikhil
        </motion.h1>

        <motion.h2 className="text-lg sm:text-2xl mb-5" variants={itemVariants}>
          Web || MERN Developer
        </motion.h2>

        <motion.div className="text-base sm:text-lg mb-3" variants={itemVariants}>
          <p>
            MERN-focused Web Developer skilled in React, Node.js, Express and MongoDB,
            building responsive and user-friendly web applications.
          </p>
          <br />
          <p>
            Motivated, detail-oriented MERN developer who quickly builds practical web
            solutions and thrives in team environments.
          </p>
        </motion.div>

        <motion.a
          href={resume}
          download
          className="download inline-flex items-center gap-2 px-6 py-3 bg-slate-200/40 backdrop-blur-md hover:bg-gradient-to-r hover:from-[var(--my-gradient1)] hover:via-[var(--my-gradient2)] hover:to-[var(--my-gradient3)] text-slate-950 font-semibold rounded-lg shadow-md shadow-indigo-300/50 hover:rotate-1 hover:scale-105 transition-all duration-500 font-['Poppins']"
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
          Download Resume
        </motion.a>
      </motion.div>
    </div>
  );
}

export default Hero;
