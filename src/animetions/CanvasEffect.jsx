import { useEffect, useRef } from "react";

function RainCanvas({
  density = 120,
  color = "rgba(190,220,255,0.9)",
  mouseRadius = 90,
  splashCount = 6,
  disabledOnMobile = true,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, hovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (disabledOnMobile && /Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    let width = canvas.parentElement.offsetWidth;
    let height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    class Drop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 6 + Math.random() * 4;
        this.len = 15 + Math.random() * 10;
      }
      update() {
        this.y += this.vy;

        // collision with mouse only if hovering
        if (mouseRef.current.hovering) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            createSplash(this.x, this.y);
            this.reset();
          }
        }

        // bottom collision
        if (this.y > height) {
          createSplash(this.x, height - 2, true);
          this.reset();
        }
      }
      draw() {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.len);
        ctx.stroke();
      }
    }

    class Splash {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = -(Math.random() * 2 + 2);
        this.alpha = 1;
        this.size = 2 + Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.alpha -= 0.02;
      }
      draw() {
        ctx.fillStyle = `rgba(190,220,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drops = Array.from({ length: density }, () => new Drop());
    let splashes = [];

    const createSplash = (x, y, bottom = false) => {
      for (let i = 0; i < splashCount; i++) {
        splashes.push(new Splash(x, y));
      }
      if (splashes.length > 500) {
        splashes = splashes.slice(-400);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach((d) => {
        d.update();
        d.draw();
      });
      splashes.forEach((s, i) => {
        s.update();
        if (s.alpha <= 0) splashes.splice(i, 1);
        else s.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleEnter = () => {
      mouseRef.current.hovering = true;
      window.dispatchEvent(new CustomEvent("canvas-hover", { detail: { hovering: true } }));
    };
    const handleLeave = () => {
      mouseRef.current.hovering = false;
      // move cursor far away so no collision occurs
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      window.dispatchEvent(new CustomEvent("canvas-hover", { detail: { hovering: false } }));
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [density, color, mouseRadius, splashCount, disabledOnMobile]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 disable-cursor-glow" />;
}

export default RainCanvas;
