"use client";

import { Howl, Howler } from "howler";

let initialized = false;
let music: Howl | null = null;
const sfx: Record<string, Howl> = {};

const isBrowser = () => typeof window !== "undefined";

export function initAudio() {
  if (!isBrowser() || initialized) return;
  initialized = true;

  music = new Howl({
    src: ["/score.mp3"],
    loop: true,
    volume: 0.35,
    html5: true,
  });

  sfx.tap = new Howl({ src: ["/tap.mp3"], volume: 0.25 });
  sfx.glitch = new Howl({ src: ["/glitch.mp3"], volume: 0.3 });
  sfx.unlock = new Howl({ src: ["/unlock.mp3"], volume: 0.35 });
  sfx.unwrap = new Howl({ src: ["/paper.mp3"], volume: 0.35 });
  sfx.sparkle = new Howl({ src: ["/sparkle.mp3"], volume: 0.35 });
  sfx.candle = new Howl({ src: ["/candle.mp3"], volume: 0.35 });
}

export function startMusic() {
  initAudio();
  if (music && !music.playing()) music.play();
}

export function fadeMusic(target: number, duration = 1200) {
  if (!music) return;
  music.fade(music.volume(), target, duration);
}

export function setMuted(muted: boolean) {
  if (!isBrowser()) return;
  Howler.mute(muted);
}

export function playSfx(name: keyof typeof sfx) {
  if (!sfx[name]) return;
  sfx[name].play();
}
