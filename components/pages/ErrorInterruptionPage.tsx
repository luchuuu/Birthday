"use client";

import { useState } from "react";

export default function ErrorInterruptionPage({ onDone }: { onDone: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <div className="text-4xl font-semibold text-red-400">ERROR</div>
      <div className="text-xs uppercase tracking-[0.3em] text-white/50">
        Missing file detected
      </div>
      <div className="rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm text-white/70">
        /why_you_matter
      </div>
      {!opened ? (
        <button
          onClick={() => setOpened(true)}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          Open File
        </button>
      ) : (
        <button
          onClick={onDone}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          Continue
        </button>
      )}
    </div>
  );
}
