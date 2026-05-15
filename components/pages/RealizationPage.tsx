"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6 },
  }),
};

export default function RealizationPage({
  lines,
  onDone,
}: {
  lines: string[];
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < lines.length - 1) setIndex(index + 1);
    else onDone();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      {lines.slice(0, index + 1).map((line, i) => (
        <motion.p
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="heading-serif text-lg text-white/90"
        >
          {line}
        </motion.p>
      ))}
      <button onClick={next} className="btn-soft mt-6">
        Continue
      </button>
    </div>
  );
}
