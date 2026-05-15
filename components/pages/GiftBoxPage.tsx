"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const lines = [
  "Still here?",
  "Good.",
  "Because there’s one last thing waiting for you.",
  "Ready?",
];

export default function GiftBoxPage({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < lines.length - 1) setIndex(index + 1);
    else onDone();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6">
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="h-32 w-32 rounded-2xl border border-white/20 bg-white/5 shadow-glow"
      />
      <p className="heading-serif text-lg text-white/90">{lines[index]}</p>
      <button onClick={next} className="btn-soft">
        {index < lines.length - 1 ? "Unwrap" : "Open Final Gift"}
      </button>
    </div>
  );
}
