"use client";

export default function MuteButton({
  muted,
  setMuted,
}: {
  muted: boolean;
  setMuted: (value: boolean) => void;
}) {
  return (
    <button
      className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur"
      onClick={() => setMuted(!muted)}
      aria-label="Toggle mute"
    >
      {muted ? "Muted" : "Sound"}
    </button>
  );
}
