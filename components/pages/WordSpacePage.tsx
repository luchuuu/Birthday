"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WordSpacePage({
  words,
  messages,
  opened,
  setOpened,
  onDone,
}: {
  words: string[];
  messages: Record<string, string[]>;
  opened: string[];
  setOpened: (value: string[]) => void;
  onDone: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const unlocked = useMemo(() => {
    return opened.length >= words.length - 1;
  }, [opened.length, words.length]);

  const handleOpen = (word: string) => {
    if (word === "Love" && !unlocked) return;
    if (!opened.includes(word)) setOpened([...opened, word]);
    setActive(word);
  };

  const availableWords = unlocked ? words : words.filter((w) => w !== "Love");

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6">
      <div className="absolute top-10 text-xs uppercase tracking-[0.3em] text-white/40">
        Tap to explore
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {availableWords.map((word) => (
          <button
            key={word}
            onClick={() => handleOpen(word)}
            className="text-lg font-semibold text-white/80 word-glow"
          >
            {word}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-x-6 bottom-20 rounded-2xl border border-white/10 bg-black/70 p-6 text-left text-sm leading-relaxed text-white/80 backdrop-blur"
          >
            {messages[active].map((line, i) => (
              <p key={i} className="mb-2">
                {line}
              </p>
            ))}
            <button
              onClick={() => setActive(null)}
              className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {unlocked && (
        <button
          onClick={onDone}
          className="mt-8 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          Continue
        </button>
      )}
    </div>
  );
}
