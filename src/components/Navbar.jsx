// src/Navbar.jsx
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Navbar = () => {
  // ... your existing logic (unchanged)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { label: "Hero", href: "#hero" },
    { label: "About Me", href: "#about-me" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact Me", href: "#contact-me" },
  ];

  return (
    <>
      <nav className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-14 items-center justify-center rounded-xl bg-slate-200/40 backdrop-blur-sm shadow-lg z-50 hidden lg:flex transition-transform duration-500 ${isVisible ? "translate-y-0" : "translate-y-24"}`}>
        <ul className="w-full h-full flex justify-around items-center text-lg font-semibold text-slate-800">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* mobile button + menu (unchanged visually, animated items) */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button onClick={() => setMobileMenuOpen((p) => !p)} className="fixed top-[50%] right-0 px-4 py-2 rounded-tl-full rounded-bl-full bg-slate-400/40 backdrop-blur-md shadow-md border border-white/20 text-sm font-semibold text-slate-900 hover:scale-105 transition-all">
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-auto"
         aria-hidden={!mobileMenuOpen}
         >
          <div className="relative rounded-full" style={{ width: 290, height: 290 }}>
            {menuItems.map((item, idx) => {
              const n = menuItems.length;
              const startAngle = -120;
              const endAngle = 110;
              const angle = n === 1 ? 0 : startAngle + (idx / (n - 1)) * (endAngle - startAngle);
              const radius = 150;
              const transform = `translate(-20%, 50%) rotate(${angle}deg) translate(${-radius}px) rotate(${-angle}deg)`;

              return (
                <motion.a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} role="menuitem" className="absolute left-1/2 top-1/2 inline-block px-3 py-1 rounded-full font-medium text-sm shadow-md border border-white/10 bg-gradient-to-r from-[var(--my-gradient1)]/90 via-[var(--my-gradient2)]/90 to-[var(--my-gradient3)]/90 text-white" style={{ transform, transition: `transform 320ms cubic-bezier(.2,.9,.2,1)`, transitionDelay: `${idx * 45}ms`, whiteSpace: "nowrap" }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }}>
                  {item.label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
