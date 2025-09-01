// src/Footer.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/imgs/logo.png";
import resume from "../assets/files/Baraiya_Resume_Nikhil.pdf";

const Footer = () => {
  const messages = [
    "and collaborate on impactful projects.",
    ", always open to exciting opportunities.",
    ", ready to embrace new challenges.",
  ];

  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const type = () => {
      if (!isDeleting && charIndex < currentMessage.length) {
        setText(currentMessage.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentMessage.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentMessage.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, messageIndex, messages]);

  // Scroll to top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="p-4 bg-slate-600 shadow-inner shadow-slate-300 sm:p-6 overflow-x-hidden">
      <motion.div
        className="mx-auto max-w-screen-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:flex md:justify-between">
          {/* Left section */}
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={logo} className="mr-3 h-8" alt="logo" />
            <h1 className="mt-3 text-2xl lg:text-5xl font-serif text-slate-200 hidden md:block break-words">
              Let's Connect{" "}
              <span className="text-indigo-300">
                {text}
                <span className="border-r-2 animate-pulse border-slate-200 ml-1"></span>
              </span>
            </h1>
          </motion.div>

          {/* Right section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-sm font-semibold text-slate-50 uppercase">
              Follow Me
            </h2>
            <ul className="text-slate-300 space-y-3">
              <li>
                <a
                  href="https://github.com/BaraiyaNikhil"
                  className="hover:text-slate-50 text-slate-950 font-semibold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/baraiyanikhil"
                  className="hover:text-indigo-950 text-blue-400 font-semibold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <hr className="my-6 border-slate-300 sm:mx-auto lg:my-8" />

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-slate-300 sm:text-center">
            © {new Date().getFullYear()} Baraiya Nikhil. All Rights Reserved.
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={resume}
              download
              className="text-sm text-slate-200 hover:text-slate-50 transition-colors"
            >
              📄 Download Resume
            </a>

            <button
              onClick={handleBackToTop}
              className="text-sm text-slate-200 hover:text-slate-50 transition-colors"
            >
              ↑ Back to Top
            </button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
