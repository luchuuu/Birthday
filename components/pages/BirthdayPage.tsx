"use client";

import { useState } from "react";

export default function BirthdayPage({
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6">
      {lines.slice(0, index + 1).map((line, i) => (
        <p key={i} className="font-serif text-xl text-gold">
          {line}
        </p>
      ))}
      <button
        onClick={next}
        className="mt-6 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
      >
        Continue
      </button>
    </div>
  );
}
