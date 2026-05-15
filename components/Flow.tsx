"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@/components/ui/Particles";
import MuteButton from "@/components/ui/MuteButton";
import {
  entryLines,
  realizationLines,
  emotionalLines,
  coreLines,
  flashlightLines,
  birthdayLines,
  finalLines,
  wordSpaceWords,
  wordMessages,
} from "@/lib/text";
import usePersistentState from "@/lib/usePersistentState";
import PreloaderPage from "@/components/pages/PreloaderPage";
import EntryPage from "@/components/pages/EntryPage";
import RealizationPage from "@/components/pages/RealizationPage";
import WordSpacePage from "@/components/pages/WordSpacePage";
import FlashlightPage from "@/components/pages/FlashlightPage";
import EmotionalTextPage from "@/components/pages/EmotionalTextPage";
import ErrorInterruptionPage from "@/components/pages/ErrorInterruptionPage";
import CoreMessagePage from "@/components/pages/CoreMessagePage";
import BirthdayPage from "@/components/pages/BirthdayPage";
import GiftBoxPage from "@/components/pages/GiftBoxPage";
import CakePage from "@/components/pages/CakePage";
import FinalMessagePage from "@/components/pages/FinalMessagePage";
import EndScreen from "@/components/pages/EndScreen";
import { fadeMusic, initAudio, playSfx, setMuted, startMusic } from "@/lib/audio";

const pages = [
  "preloader",
  "entry",
  "realization",
  "wordspace",
  "flashlight",
  "emotional",
  "error",
  "core",
  "birthday",
  "gift",
  "cake",
  "final",
  "end",
] as const;

type PageKey = (typeof pages)[number];

const transition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
};

const volumeMap: Record<PageKey, number> = {
  preloader: 0.0,
  entry: 0.25,
  realization: 0.3,
  wordspace: 0.35,
  flashlight: 0.28,
  emotional: 0.4,
  error: 0.2,
  core: 0.42,
  birthday: 0.5,
  gift: 0.45,
  cake: 0.4,
  final: 0.28,
  end: 0.0,
};

export default function Flow() {
  const [pageIndex, setPageIndex] = usePersistentState<number>(
    "birthday:pageIndex",
    0
  );
  const [muted, setMutedState] = usePersistentState<boolean>(
    "birthday:muted",
    true
  );
  const [audioStarted, setAudioStarted] = usePersistentState<boolean>(
    "birthday:audioStarted",
    false
  );

  const [openedWords, setOpenedWords] = usePersistentState<string[]>(
    "birthday:openedWords",
    []
  );

  const [foundFlashMessages, setFoundFlashMessages] =
    usePersistentState<string[]>("birthday:flashFound", []);

  const current = pages[pageIndex] as PageKey;

  const canGoNext = useMemo(() => {
    if (current === "wordspace") return openedWords.length >= wordSpaceWords.length - 1;
    if (current === "flashlight") return foundFlashMessages.length >= 8;
    return true;
  }, [current, openedWords.length, foundFlashMessages.length]);

  const next = () => {
    if (!canGoNext) return;
    playSfx("tap");
    setPageIndex((prev) => Math.min(prev + 1, pages.length - 1));
  };

  useEffect(() => {
    if (pageIndex < 0) setPageIndex(0);
  }, [pageIndex, setPageIndex]);

  useEffect(() => {
    initAudio();
    setMuted(muted);
  }, [muted]);

  useEffect(() => {
    if (!audioStarted) return;
    startMusic();
    fadeMusic(volumeMap[current] ?? 0.3, 1200);
  }, [audioStarted, current]);

  useEffect(() => {
    const handleStart = () => {
      if (!audioStarted) {
        setAudioStarted(true);
        startMusic();
      }
    };
    window.addEventListener("pointerdown", handleStart, { once: true });
    return () => window.removeEventListener("pointerdown", handleStart);
  }, [audioStarted, setAudioStarted]);

  return (
    <div className="relative h-full w-full overflow-hidden text-center">
      <Particles mode={current} />
      <MuteButton muted={muted} setMuted={setMutedState} />

      <AnimatePresence mode="wait">
        <motion.div key={current} {...transition} className="h-full w-full">
          {current === "preloader" && (
            <PreloaderPage onDone={next} />
          )}
          {current === "entry" && (
            <EntryPage lines={entryLines} onDone={next} />
          )}
          {current === "realization" && (
            <RealizationPage lines={realizationLines} onDone={next} />
          )}
          {current === "wordspace" && (
            <WordSpacePage
              words={wordSpaceWords}
              messages={wordMessages}
              opened={openedWords}
              setOpened={setOpenedWords}
              onDone={next}
            />
          )}
          {current === "flashlight" && (
            <FlashlightPage
              messages={flashlightLines}
              found={foundFlashMessages}
              setFound={setFoundFlashMessages}
              onDone={next}
            />
          )}
          {current === "emotional" && (
            <EmotionalTextPage lines={emotionalLines} onDone={next} />
          )}
          {current === "error" && (
            <ErrorInterruptionPage onDone={next} />
          )}
          {current === "core" && (
            <CoreMessagePage lines={coreLines} onDone={next} />
          )}
          {current === "birthday" && (
            <BirthdayPage lines={birthdayLines} onDone={next} />
          )}
          {current === "gift" && <GiftBoxPage onDone={next} />}
          {current === "cake" && <CakePage onDone={next} />}
          {current === "final" && (
            <FinalMessagePage lines={finalLines} onDone={next} />
          )}
          {current === "end" && <EndScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
