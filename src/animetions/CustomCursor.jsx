// src/animations/CustomCursor.jsx
import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "../context/CursorContext";

const lerp = (a, b, n) => a + (b - a) * n;
const SCROLL_LABEL = "Scroll";

export default function CustomCursor() {
  const { cursorText, active } = useCursor();

  const elRef = useRef(null);
  const rafRef = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [ui, setUi] = useState({ hovering: false, scrolling: false, label: "" });

  useEffect(() => {
    if (!active) return;

    const tick = () => {
      const node = elRef.current;
      if (!node) return;

      pos.current.x = lerp(pos.current.x, target.current.x, 0.22);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.22);
      node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!ready) setReady(true);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    let scrollTimeout;
    const refreshHover = () => {
      const el = document.elementFromPoint(target.current.x, target.current.y);
      if (!el) {
        setUi((u) => ({ ...u, hovering: false, label: "" }));
        return;
      }
      const hovered = el.closest("[data-cursor-text],a,button");
      if (hovered) {
        setUi((u) => ({
          ...u,
          hovering: true,
          label: hovered.getAttribute("data-cursor-text") || "",
        }));
      } else {
        setUi((u) => ({ ...u, hovering: false, label: "" }));
      }
    };

    const handleScroll = () => {
      setUi((u) => (u.scrolling ? u : { ...u, scrolling: true }));
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setUi((u) => ({ ...u, scrolling: false }));
        refreshHover();
      }, 140);
    };

    const handleMouseOver = (e) => {
      const el = e.target.closest("[data-cursor-text],a,button");
      if (!el) return;
      const label = el.getAttribute("data-cursor-text") || "";
      setUi((u) => ({ ...u, hovering: true, label }));
    };

    const handleMouseOut = (e) => {
      if (e.relatedTarget && elRef.current?.contains(e.relatedTarget)) return;
      setUi((u) => ({ ...u, hovering: false, label: "" }));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", refreshHover, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", refreshHover);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      clearTimeout(scrollTimeout);
    };
  }, [active, ready]);

  if (!active) return null;

  const text = ui.label || cursorText || (ui.scrolling ? SCROLL_LABEL : "");
  const showText = Boolean(text);

  return (
    <div
      ref={elRef}
      className={[
        "fixed top-0 left-0 z-[9999] pointer-events-none select-none",
        "flex items-center justify-center will-change-transform",
        "rounded-full border border-white/30 backdrop-blur-md bg-white/20",
        "text-slate-900 font-medium shadow-lg shadow-slate-900/20",
        "transition-[width,height,opacity,filter,backdrop-filter] duration-150 ease-out",
        showText ? "px-3 h-8 min-w-8" : "w-3 h-3",
        ready ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        filter: showText ? "none" : "drop-shadow(0 1px 2px rgba(0,0,0,.25))",
      }}
    >
      <span
        className={[
          "whitespace-nowrap leading-none text-[12px]",
          "transition-opacity duration-100",
          showText ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {text}
      </span>
    </div>
  );
}
