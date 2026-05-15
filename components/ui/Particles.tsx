"use client";

import { useEffect, useRef } from "react";

const particleCount = 70;

const modes: Record<string, { color: string; speed: number; opacity: number }> = {
  preloader: { color: "rgba(120,170,255,0.35)", speed: 0.3, opacity: 0.7 },
  entry: { color: "rgba(180,180,255,0.3)", speed: 0.2, opacity: 0.6 },
  realization: { color: "rgba(180,140,255,0.3)", speed: 0.2, opacity: 0.6 },
  wordspace: { color: "rgba(200,160,90,0.35)", speed: 0.15, opacity: 0.7 },
  flashlight: { color: "rgba(100,100,120,0.2)", speed: 0.08, opacity: 0.3 },
  emotional: { color: "rgba(140,120,200,0.2)", speed: 0.1, opacity: 0.4 },
  error: { color: "rgba(255,80,120,0.25)", speed: 0.2, opacity: 0.6 },
  core: { color: "rgba(170,150,220,0.2)", speed: 0.1, opacity: 0.3 },
  birthday: { color: "rgba(230,190,120,0.4)", speed: 0.2, opacity: 0.8 },
  gift: { color: "rgba(230,190,120,0.35)", speed: 0.2, opacity: 0.7 },
  cake: { color: "rgba(230,190,120,0.35)", speed: 0.2, opacity: 0.6 },
  final: { color: "rgba(230,190,120,0.25)", speed: 0.1, opacity: 0.4 },
  end: { color: "rgba(120,120,140,0.1)", speed: 0.05, opacity: 0.2 },
};

export default function Particles({ mode }: { mode: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef(
    Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.5,
      vy: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { color, speed, opacity } = modes[mode] || modes.entry;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      particles.current.forEach((p) => {
        p.y -= p.vy * speed;
        p.x += p.vx * speed;
        if (p.y < -0.1) p.y = 1.1;
        if (p.x < -0.1) p.x = 1.1;
        if (p.x > 1.1) p.x = -0.1;

        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
