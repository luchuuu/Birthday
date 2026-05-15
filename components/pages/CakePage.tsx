"use client";

import { useEffect, useRef, useState } from "react";
import { playSfx } from "@/lib/audio";

export default function CakePage({ onDone }: { onDone: () => void }) {
  const [blown, setBlown] = useState(false);
  const [wish, setWish] = useState("");
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const cleanupMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    analyserRef.current = null;
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => null);
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setListening(false);
  };

  const blowOut = () => {
    if (blown) return;
    setBlown(true);
    playSfx("candle");
    if (navigator.vibrate) navigator.vibrate(150);
    cleanupMic();
  };

  const handleMic = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      source.connect(analyser);
      setListening(true);

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i += 1) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        setLevel(rms);
        if (rms > 0.18) {
          blowOut();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (err) {
      setMicError("Microphone unavailable. Tap to blow instead.");
    }
  };

  const submit = () => {
    window.localStorage.setItem("birthday:wish", wish);
    setSaved(true);
    setTimeout(onDone, 1500);
  };

  useEffect(() => () => cleanupMic(), []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <div className="relative flex h-28 w-40 items-center justify-center rounded-2xl border border-white/20 bg-white/5">
        <div
          className={`absolute -top-6 h-8 w-1 rounded-full ${
            blown ? "bg-white/30" : "bg-gold"
          }`}
        />
        {!blown && (
          <div
            className="absolute -top-10 h-6 w-6 rounded-full bg-amber-200/80 blur-sm"
            style={{ transform: `scale(${1 + level * 1.8})` }}
          />
        )}
      </div>
      <div className="text-sm uppercase tracking-[0.3em] text-white/60">
        Make a wish
      </div>

      {!blown ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-white/60">
            Tap to enable microphone, then blow gently.
          </p>
          <button
            onClick={handleMic}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            {listening ? "Listening..." : "Blow Candle"}
          </button>
          {micError && (
            <button
              onClick={blowOut}
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              Tap to Blow
            </button>
          )}
        </div>
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
