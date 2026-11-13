"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { CornerOrnament, IslamicStarPattern } from "./IslamicPattern";

interface EnvelopeOpeningProps {
  config: WeddingConfig;
  onOpenComplete?: () => void;
  onSealBreak?: () => void;
}

type Phase = "closed" | "opening" | "unsealed" | "revealed" | "entering";

const cardSpring = { type: "spring", stiffness: 105, damping: 18, mass: 0.9 } as const;
const flapTransition = { duration: 0.95, ease: [0.22, 1, 0.36, 1] } as const;

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ config, onOpenComplete, onSealBreak }) => {
  const [phase, setPhase] = useState<Phase>("closed");
  const [isDismissed, setIsDismissed] = useState(false);
  const transitionTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const schedule = (callback: () => void, delay: number) => {
    transitionTimers.current.push(setTimeout(callback, delay));
  };

  const handleOpen = () => {
    if (phase !== "closed") return;
    onSealBreak?.();
    setPhase("opening");
    schedule(() => setPhase("unsealed"), 620);
    schedule(() => setPhase("revealed"), 1420);
  };

  useEffect(() => () => transitionTimers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (phase !== "revealed") return;

    const autoEnterTimer = window.setTimeout(() => {
      setPhase("entering");
      transitionTimers.current.push(
        setTimeout(() => {
          setIsDismissed(true);
          onOpenComplete?.();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 640)
      );
    }, 3000);

    return () => window.clearTimeout(autoEnterTimer);
  }, [phase, onOpenComplete]);

  if (isDismissed) return null;

  const { couple, mainEvent, bismillah } = config;
  const isOpen = phase !== "closed";
  const isCardLifted = phase === "unsealed" || phase === "revealed" || phase === "entering";
  const isCardRevealed = phase === "revealed" || phase === "entering";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "entering" ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex min-h-[100dvh] items-center justify-center overflow-hidden bg-emerald-950 p-4 sm:p-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(212,175,55,0.16)_0%,_rgba(2,12,8,0.97)_65%)]" />
        <div className="relative my-auto flex w-full max-w-[480px] flex-col items-center [perspective:1800px]">
          <motion.div
            animate={phase === "closed" ? { y: [0, -5, 0], rotateY: [0, 1.2, -1.2, 0] } : { y: phase === "entering" ? 70 : 20, scale: phase === "entering" ? 0.94 : 0.98 }}
            transition={phase === "closed" ? { repeat: Infinity, duration: 6, ease: "easeInOut" } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[5/3.5] max-h-[400px] [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 overflow-hidden rounded-lg border border-emerald-700/60 bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 shadow-[0_28px_50px_-20px_rgba(0,0,0,0.9),inset_0_1px_rgba(255,255,255,0.13)]">
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.28)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />
              <IslamicStarPattern opacity={0.035} className="text-gold-light" />
            </div>

            <motion.div
              animate={{ opacity: isCardLifted ? 0.72 : 0.28, scale: isCardRevealed ? 0.85 : 1 }}
              transition={cardSpring}
              className="pointer-events-none absolute inset-x-[8%] bottom-[9%] h-[18%] rounded-full bg-black blur-2xl"
            />

            <motion.div
              initial={{ y: "3%", scale: 0.955 }}
              animate={{
                y: phase === "closed" || phase === "opening" ? "3%" : phase === "unsealed" ? "-28%" : "-65%",
                scale: isCardRevealed ? 1 : 0.955,
                rotateX: isCardRevealed ? 2 : 0,
                rotateZ: isCardRevealed ? -0.7 : 0,
                zIndex: 12,
                boxShadow: isCardRevealed ? "0 32px 55px -18px rgba(0,0,0,0.78), 0 0 0 1px rgba(212,175,55,0.3)" : "0 12px 18px -12px rgba(0,0,0,0.72)",
              }}
              transition={cardSpring}
              className="absolute inset-[1.5%] flex flex-col items-center overflow-hidden rounded bg-[#fdfbf7] p-4 text-emerald-950 shadow-lg sm:inset-[2%] sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgba(74,50,22,0.42)_0.45px,transparent_0.45px)] [background-size:3px_3px]" />
              <div className="pointer-events-none absolute inset-[5%] rounded-sm border-[0.5px] border-gold-600/40" />
              <div className="pointer-events-none absolute inset-[6.5%] rounded-sm border-[1.5px] border-gold-600/20" />
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-between py-2 text-center sm:py-4">
                <div className="space-y-2">
                  <p className="font-arabic text-sm text-gold-700/90 sm:text-lg">{bismillah.arabic}</p>
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-emerald-900/60 sm:text-[10px]">The Wedding Celebration Of</p>
                </div>
                <div className="my-auto flex w-full flex-col items-center space-y-3 sm:space-y-4">
                  <div className="flex flex-col items-center">
                    {couple.groom.arabicName && <span className="mb-1 font-arabic text-sm text-gold-600/70">{couple.groom.arabicName}</span>}
                    <h2 className="font-serif text-2xl font-normal tracking-wide text-emerald-950 sm:text-3xl">{couple.groom.name}</h2>
                  </div>
                  <div className="flex w-3/4 items-center justify-center space-x-3 text-gold-600">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                    <span className="font-serif text-lg italic sm:text-xl">&amp;</span>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />
                  </div>
                  <div className="flex flex-col items-center">
                    {couple.bride.arabicName && <span className="mb-1 font-arabic text-sm text-gold-600/70">{couple.bride.arabicName}</span>}
                    <h2 className="font-serif text-2xl font-normal tracking-wide text-emerald-950 sm:text-3xl">{couple.bride.name}</h2>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="mb-2 h-px w-12 bg-gold-400/50" />
                  <p className="font-serif text-[11px] uppercase tracking-widest text-emerald-900 sm:text-xs">{mainEvent.date}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ filter: isOpen ? "drop-shadow(0 -1px 3px rgba(0,0,0,0.18))" : "drop-shadow(0 -6px 16px rgba(0,0,0,0.38))" }}
              transition={flapTransition}
              className="pointer-events-none absolute inset-0 z-20"
            >
              <div className="absolute inset-0 rounded-bl-lg rounded-tl-lg border-r border-gold-500/15 bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-[inset_-10px_0_18px_rgba(0,0,0,0.26)] [clip-path:polygon(0_0,50%_50%,0_100%)]" />
              <div className="absolute inset-0 rounded-br-lg rounded-tr-lg border-l border-gold-500/15 bg-gradient-to-bl from-emerald-700 to-emerald-900 shadow-[inset_10px_0_18px_rgba(0,0,0,0.28)] [clip-path:polygon(100%_0,50%_50%,100%_100%)]" />
              <div className="absolute inset-0 rounded-b-lg border-t border-white/10 bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-800 shadow-[inset_0_12px_20px_rgba(0,0,0,0.26)] [clip-path:polygon(0_100%,50%_50%,100%_100%)]" />
              <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-[26deg] bg-gold-200/15 shadow-[0_1px_rgba(0,0,0,0.35)]" />
              <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-[26deg] bg-gold-200/15 shadow-[0_1px_rgba(0,0,0,0.35)]" />
            </motion.div>

            <motion.div
              animate={{ rotateX: isOpen ? -164 : 0, y: isOpen ? -2 : 0, zIndex: isOpen ? 5 : 30, filter: isOpen ? "drop-shadow(0 12px 10px rgba(0,0,0,0.35))" : "drop-shadow(0 10px 12px rgba(0,0,0,0.5))" }}
              transition={flapTransition}
              style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
            >
              <div className="absolute inset-x-0 top-0 h-full rounded-t-lg border-b border-gold-500/25 bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-950 [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_55%)]">
                <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.38)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />
                <div className="opacity-40"><CornerOrnament position="top-left" size={24} /></div>
                <div className="opacity-40"><CornerOrnament position="top-right" size={24} /></div>
              </div>
              <div className="absolute inset-x-0 top-0 h-full border-t border-black/40 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 shadow-[inset_0_18px_30px_rgba(0,0,0,0.52)] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_55%)]" style={{ transform: "rotateX(180deg)" }}>
                <IslamicStarPattern opacity={0.055} className="text-gold-300" />
              </div>
            </motion.div>

            <AnimatePresence>
              {phase === "closed" && (
                <div className="absolute inset-x-0 top-[55%] z-40 flex -translate-y-1/2 justify-center">
                  <motion.div initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.78, y: -5, rotate: -8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative">
                    <button type="button" onClick={handleOpen} aria-label="Break the wax seal and open the invitation" className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:h-24 sm:w-24">
                      <div className="absolute inset-0 rounded-[48%_52%_55%_45%_/_49%_51%_45%_55%] border border-yellow-300/30 bg-gradient-to-br from-[#d8a43a] via-[#a86e12] to-[#5b3105] shadow-[0_10px_20px_rgba(0,0,0,0.62),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-5px_9px_rgba(0,0,0,0.48)]" />
                      <div className="absolute inset-1.5 flex items-center justify-center rounded-full border border-yellow-900/70 bg-gradient-to-tl from-yellow-900 via-yellow-700 to-yellow-500 shadow-[inset_0_3px_5px_rgba(0,0,0,0.48),0_1px_2px_rgba(255,255,255,0.35)]">
                        <span className="font-serif text-xl font-bold italic tracking-tighter text-yellow-100/85 sm:text-2xl">{couple.groom.name.charAt(0)}<span className="mx-1 text-sm">&amp;</span>{couple.bride.name.charAt(0)}</span>
                      </div>
                      <div className="absolute inset-[11%] rounded-full border border-yellow-100/20" />
                    </button>
                    <motion.p animate={{ opacity: [0.45, 0.95, 0.45] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-gold-300">Break seal</motion.p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
