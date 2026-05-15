"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PreloaderPage({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = Date.now();

    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      let value = Math.min(99, Math.floor((elapsed / 10) * 99));
      if (elapsed > 10 && elapsed < 30) value = 99;
      if (elapsed >= 30) value = 100;
      setProgress(value);

      if (value >= 100) {
        setDone(true);
        setTimeout(onDone, 1200);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-white/80">
      <div className="text-xs uppercase tracking-[0.35em] text-white/50">
        Initializing
      </div>
      <div className="text-4xl font-semibold">{progress}%</div>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-white/50"
          style={{ width: `${progress}%` }}
        />
      </div>
      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.45em] text-white/70"
        >
          Access Granted
        </motion.div>
      )}
    </div>
  );
}
