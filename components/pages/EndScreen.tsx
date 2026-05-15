"use client";

export default function EndScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6">
      <div className="h-20 w-20 rounded-full border border-white/10 bg-white/5 soft-shadow" />
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        Thank you for staying.
      </p>
    </div>
  );
}
