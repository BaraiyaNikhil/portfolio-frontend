import { useEffect, useRef, useState } from "react";

export default function CosmicCursorBall() {
  const MAIN_SIZE = 15;
  const TAIL_LENGTH = 10;
  const LERP = 0.25;

  const startX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const startY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const [pos, setPos] = useState({ x: startX, y: startY });
  const [trail, setTrail] = useState([]);
  const [hidden, setHidden] = useState(true);

  const mouse = useRef({ x: startX, y: startY });
  const current = useRef({ x: startX, y: startY });
  const positions = useRef([]);

  useEffect(() => {
    function handleMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const overDisable = e.target.closest(".disable-cursor-glow");
      if (overDisable) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }

    function handleEnterWindow() {
      setHidden(false);
    }

    function handleLeaveWindow() {
      setHidden(true);
    }

    function animate() {
      current.current.x += (mouse.current.x - current.current.x) * LERP;
      current.current.y += (mouse.current.y - current.current.y) * LERP;

      setPos({ x: current.current.x, y: current.current.y });

      positions.current.push({ x: current.current.x, y: current.current.y });
      if (positions.current.length > TAIL_LENGTH) positions.current.shift();

      setTrail([...positions.current]);
      requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleEnterWindow);
    document.addEventListener("mouseleave", handleLeaveWindow);

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleEnterWindow);
      document.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((t, i) => {
        const progress = i / TAIL_LENGTH;
        const size = MAIN_SIZE * (0.7 - progress * 0.6);
        const opacity = hidden ? 0 : 1 - progress;
        const color = `hsl(${300 - progress * 240}, 100%, 60%)`; // pink → blue

        return (
          <div
            key={i}
            className="hidden lg:block pointer-events-none fixed rounded-full z-[9998]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${t.x}px`,
              top: `${t.y}px`,
              transform: "translate(-50%, -50%)",
              background: color,
              filter: `blur(${2 + progress * 2}px)`,
              opacity,
              transition: "opacity 0.15s linear",
            }}
          ></div>
        );
      })}

      {/* Main Ball */}
      <div
        className={`hidden lg:block pointer-events-none fixed rounded-full z-[9999] transition-opacity duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: `${MAIN_SIZE}px`,
          height: `${MAIN_SIZE}px`,
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
          background: "linear-gradient(135deg, #ff00cc, #3333ff)",
          boxShadow: "0 0 14px 6px rgba(255,0,200,0.85)",
        }}
      ></div>
    </>
  );
}
