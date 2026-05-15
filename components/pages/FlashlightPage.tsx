"use client";

import { useEffect, useRef, useState } from "react";

export default function FlashlightPage({
  messages,
  found,
  setFound,
  onDone,
}: {
  messages: string[];
  found: string[];
  setFound: (value: string[]) => void;
  onDone: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("pointermove", handler);
    return () => el.removeEventListener("pointermove", handler);
  }, []);

  const reveal = (line: string) => {
    if (!found.includes(line)) setFound([...found, line]);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-black"
      style={{
        backgroundImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.15) 0px, rgba(0,0,0,0.95) 160px)`
      }}
    >
      <div className="absolute inset-0">
        {messages.map((line, i) => (
          <button
            key={line}
            onClick={() => reveal(line)}
            className={`absolute text-left text-sm text-white/80 ${
              found.includes(line) ? "opacity-100" : "opacity-30"
            }`}
            style={{
              left: `${10 + (i * 13) % 70}%`,
              top: `${10 + (i * 17) % 70}%`,
            }}
          >
            {line}
          </button>
        ))}
      </div>

      {found.length >= 8 && (
        <div className="absolute bottom-12 w-full text-center">
          <button
            onClick={onDone}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
