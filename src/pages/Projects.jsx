// src/Projects.jsx
import React from "react";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectCard";
import todoImage from "../assets/imgs/todo-p-img.png";
import { useData } from "../context/DataContext";

export default function Projects() {
  const { isMobile } = useData();
  const viewport = { once: false, amount: 0.22 };

  const todoapp = {
    title: "ToDo App",
    description:
      "The To-Do List system is a modern digital platform that replaces paper-based methods, allowing users to easily create, update, and organize tasks with features like prioritization, deadlines, and collaboration. Its simple, user-friendly interface suits all skill levels, while automation reduces manual effort and boosts productivity, making it ideal for both personal use and team projects.",
    url: "https://github.com/BaraiyaNikhil/Projects/tree/0ba9632a74783a49cb6cbae7ca3800f6b2369d2a/mern-todo-app",
    techs: ["HTML", "CSS", "JavaScript", "React", "Express", "Node.js", "MongoDB"],
    imageSrc: todoImage,
    isReverse: true,
  };

  return (
    <div id="projects" className="w-full bg-slate-300 h-full flex flex-col md:flex-col overflow-x-hidden p-6 sm:p-10">
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-8 max-w-full break-words leading-tight pt-3"
      >
        My Lab
      </motion.h1>

      <ProjectCard {...todoapp} isMobile={isMobile} />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.08 }}
        className="font-['Borel'] text-2xl text-center mt-5"
      >
        Coming Soon ..
      </motion.h2>
    </div>
  );
}
