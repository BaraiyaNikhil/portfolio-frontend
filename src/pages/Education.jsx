// src/Education.jsx
import { motion, useReducedMotion } from "motion/react";

export default function Education() {
  const prefersReduced = useReducedMotion();
  const itemY = prefersReduced ? 8 : 18;
  const viewport = { once: false, amount: 0.18 };

  const list = [
    {
      title: "Master of Computer Applications (MCA)",
      school: "Darshan University",
      desc: "Graduated with 6.74 CGPA and 9.00 SGPA in 4th sem.",
    },
    {
      title: "Bachelor of Computer Applications (BCA)",
      school: "Savjani BBA Computer College, Veraval",
      desc: "Graduated with 73%.",
    },
    { title: "HSC – GSEB", school: "", desc: "Passed with 59%." },
    { title: "SSC – GSEB", school: "", desc: "Passed with 71%." },
  ];

  return (
    <div id="education" className="w-full sticky bg-slate-300 lg:bg-slate-400 lg:top-30 lg:z-30 lg:rounded-t-2xl flex flex-col overflow-x-hidden p-6 sm:p-10">
      <span
        className="absolute top-3 right-3 text-slate-900 text-lg font-semibold tracking-wide"
      >
        Education
      </span>
      <motion.h1 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} viewport={viewport} className="font-['Borel'] text-3xl sm:text-5xl lg:text-6xl mb-6 leading-tight pt-3">
        Education
      </motion.h1>

      <section className="w-full">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-6 p-2">
          <div className="lg:col-span-7">
            <ol className="relative border-s border-slate-600 ps-6">
              {list.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="mb-10 ms-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.45, ease: "easeInOut", delay: idx * 0.06 }}
                >
                  <span className="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 ring-8 ring-slate-800">
                    <svg className="h-3 w-3 text-slate-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                  {item.school && <h4 className="mb-1.5 text-base font-semibold text-slate-700">{item.school}</h4>}
                  <p className="text-base text-slate-700">{item.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <aside className="relative hidden lg:block lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5 }} className="sticky w-full h-full top-24 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-md shadow-xl shadow-slate-500/20 p-6">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Highlights</h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">MCA</p>
                  <p className="text-2xl font-bold text-slate-900">6.74 CGPA</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">BCA</p>
                  <p className="text-2xl font-bold text-slate-900">73%</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">HSC</p>
                  <p className="text-2xl font-bold text-slate-900">59%</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">SSC</p>
                  <p className="text-2xl font-bold text-slate-900">71%</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-800">Key Coursework</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-900/90 text-white text-xs px-3 py-1">Data Structures</span>
                  <span className="rounded-full bg-slate-800/90 text-white text-xs px-3 py-1">React Js</span>
                  <span className="rounded-full bg-slate-700/90 text-white text-xs px-3 py-1">MongoDB</span>
                  <span className="rounded-full bg-slate-600/90 text-white text-xs px-3 py-1">Web Dev</span>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
}
