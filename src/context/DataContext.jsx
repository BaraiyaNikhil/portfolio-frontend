import { createContext, useEffect, useState, useContext } from "react";

/** Existing JSX icons (still used by ProjectCard, etc.) */
const techIcons = {
  HTML: (
    <img
      src="https://icongr.am/devicon/html5-original.svg?size=64&color=currentColor"
      alt="HTML5 logo"
      className="w-6 h-6"
    />
  ),
  CSS: (
    <img
      src="https://icongr.am/devicon/css3-original.svg?size=64&color=currentColor"
      alt="CSS3 logo"
      className="w-6 h-6"
    />
  ),
  JavaScript: (
    <img
      src="https://icongr.am/devicon/javascript-original.svg?size=64&color=currentColor"
      alt="JavaScript logo"
      className="w-6 h-6"
    />
  ),
  React: (
    <img
      src="https://icongr.am/devicon/react-original.svg?size=64&color=currentColor"
      alt="React logo"
      className="w-6 h-6"
    />
  ),
  Express: (
    <img
      src="https://icongr.am/devicon/express-original.svg?size=64&color=currentColor"
      alt="Express logo"
      className="w-6 h-6"
    />
  ),
  "Node.js": (
    <img
      src="https://icongr.am/devicon/nodejs-original.svg?size=64&color=currentColor"
      alt="Node.js logo"
      className="w-6 h-6"
    />
  ),
  MongoDB: (
    <img
      src="https://icongr.am/devicon/mongodb-original.svg?size=64&color=currentColor"
      alt="MongoDB logo"
      className="w-6 h-6"
    />
  ),
};

/** New: metadata for Skills section (colors, bg, level, iconSrc, desc) */
const techMeta = {
  HTML: {
    color: "#e34f26",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Advanced",
    iconSrc:
      "https://icongr.am/devicon/html5-original.svg?size=64&color=currentColor",
    desc: "Semantic HTML5",
  },
  CSS: {
    color: "#2965f1",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Advanced",
    iconSrc:
      "https://icongr.am/devicon/css3-original.svg?size=64&color=currentColor",
    desc: "Layouts, animations",
  },
  JavaScript: {
    color: "#f7df1e",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Advanced",
    iconSrc:
      "https://icongr.am/devicon/javascript-original.svg?size=64&color=currentColor",
    desc: "ES6+, async patterns",
  },
  React: {
    color: "#61dafb",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Advanced",
    iconSrc:
      "https://icongr.am/devicon/react-original.svg?size=64&color=currentColor",
    desc: "Hooks, context, perf",
  },
  "Node.js": {
    color: "#68a063",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Intermediate",
    iconSrc:
      "https://icongr.am/devicon/nodejs-original.svg?size=64&color=currentColor",
    desc: "APIs, tooling",
  },
  Express: {
    color: "#e2e8f0",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Intermediate",
    iconSrc:
      "https://icongr.am/devicon/express-original.svg?size=64&color=currentColor",
    desc: "REST APIs",
  },
  MongoDB: {
    color: "#4DB33D",
    bgClass: "bg-slate-100 dark:bg-slate-800/50",
    level: "Intermediate",
    iconSrc:
      "https://icongr.am/devicon/mongodb-original.svg?size=64&color=currentColor",
    desc: "NoSQL modelling",
  },
};

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"];

const DataContext = createContext();

export function DataProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DataContext.Provider value={{ techIcons, techMeta, skills, isMobile }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
