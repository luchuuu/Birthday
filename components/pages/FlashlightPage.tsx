"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playSfx } from "@/lib/audio";

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
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setActive(true);
    };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("pointermove", handler);
    return () => el.removeEventListener("pointermove", handler);
  }, []);

  const reveal = (line: string) => {
    if (!found.includes(line)) {
      setFound([...found, line]);
      playSfx("sparkle");
    } else {
      playSfx("tap");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-black"
      style={{
        backgroundImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,${active ? 0.2 : 0}) 0px, rgba(0,0,0,0.9) 180px)`,
      }}
    >
      <div className="absolute inset-0">
        {messages.map((line, i) => {
          const isFound = found.includes(line);
          return (
            <motion.button
              key={line}
              onClick={() => reveal(line)}
              className={`absolute text-left text-sm ${
                isFound ? "text-white/95" : "text-white/50"
              }`}
              style={{
                left: `${10 + (i * 13) % 70}%`,
                top: `${10 + (i * 17) % 70}%`,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {line}
              {isFound && (
                <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-gold/80 shadow-glow" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute top-12 w-full text-center text-xs uppercase tracking-[0.3em] text-white/40">
        Move your light and tap
      </div>

      {found.length >= 8 && (
        <div className="absolute bottom-12 w-full text-center">
          <button onClick={onDone} className="btn-soft">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
