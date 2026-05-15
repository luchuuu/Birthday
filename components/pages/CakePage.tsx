"use client";

import { useState } from "react";

export default function CakePage({ onDone }: { onDone: () => void }) {
  const [blown, setBlown] = useState(false);
  const [wish, setWish] = useState("");
  const [saved, setSaved] = useState(false);

  const handleBlow = () => {
    setBlown(true);
  };

  const submit = () => {
    window.localStorage.setItem("birthday:wish", wish);
    setSaved(true);
    setTimeout(onDone, 1500);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <div className="h-24 w-40 rounded-2xl border border-white/20 bg-white/5" />
      <div className="text-sm uppercase tracking-[0.3em] text-white/60">
        Make a wish
      </div>
      {!blown ? (
        <button
          onClick={handleBlow}
          className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          Blow Candle
        </button>
      ) : (
        <div className="w-full max-w-sm space-y-3">
          <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
            Write your wish
          </label>
          <textarea
            className="w-full rounded-xl border border-white/20 bg-black/50 p-3 text-sm text-white/80"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            rows={4}
          />
          <button
            onClick={submit}
            className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            {saved ? "Wish recorded" : "Send Wish"}
          </button>
        </div>
      )}
    </div>
  );
}
