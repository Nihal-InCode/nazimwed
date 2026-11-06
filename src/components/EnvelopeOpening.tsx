"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { WeddingConfig } from "@/types/wedding";
import { IslamicStarPattern, CornerOrnament } from "./IslamicPattern";

interface EnvelopeOpeningProps {
  config: WeddingConfig;
  onOpenComplete?: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  config,
  onOpenComplete,
}) => {
  // States: 'closed' | 'opening' | 'showing' | 'transitioning'
  const [phase, setPhase] = useState<"closed" | "opening" | "showing" | "transitioning">("closed");
  const [isDismissed, setIsDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenEnvelope = () => {
    if (phase !== "closed") return;
    setPhase("opening");

    // Launch soft gold confetti when card begins emerging
    setTimeout(() => {
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.55 },
          colors: ["#D4AF37", "#ECC876", "#FFF8E1", "#1B4938", "#C5A059"],
          ticks: 200,
          gravity: 0.75,
          scalar: 0.9,
        });
      } catch {
        // Fallback
      }
      setPhase("showing");
    }, 700);
  };

  // When 'showing', display the card for 3 seconds, then automatically enter
  useEffect(() => {
    if (phase === "showing") {
      timerRef.current = setTimeout(() => {
        enterMainSite();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase]);

  const enterMainSite = () => {
    setPhase("transitioning");
    setTimeout(() => {
      setIsDismissed(true);
      if (onOpenComplete) onOpenComplete();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === "transitioning" ? 0 : 1,
          scale: phase === "transitioning" ? 1.05 : 1,
        }}
        exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-950/98 p-3 sm:p-4 backdrop-blur-2xl overflow-y-auto min-h-[100dvh]"
      >
        {/* Ambient Radial Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.22)_0%,_rgba(13,40,30,0.7)_60%,_rgba(6,24,16,0.98)_100%)] pointer-events-none" />
        <IslamicStarPattern opacity={0.07} className="text-gold-light" />

        {/* Skip button in top corner with safe-area spacing */}
        <button
          type="button"
          onClick={enterMainSite}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 text-[11px] sm:text-xs font-sans uppercase tracking-widest text-ivory-200/80 hover:text-gold-champagne transition-colors py-1.5 px-3 rounded-full hover:bg-emerald-900/60"
        >
          Skip Intro →
        </button>

        {/* Envelope Container - Calibrated to stay 100% within mobile view */}
        <div className="relative flex flex-col items-center max-w-[320px] sm:max-w-md w-full my-auto py-4">
          {/* Envelope Wrapper: glides down when opened so emerging card stays perfectly centered on mobile */}
          <motion.div
            animate={
              phase === "closed"
                ? { y: [0, -6, 0], scale: 1 }
                : { y: 55, scale: 0.94 } // Moves down so card doesn't fly off top of screen
            }
            transition={
              phase === "closed"
                ? { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
                : { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
            }
            className="relative w-full aspect-[4/3] max-h-[290px] sm:max-h-[360px] perspective-[1400px]"
          >
            {/* 1. Envelope Back Base (Royal Emerald) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-900 via-emerald-850 to-emerald-950 border border-gold-500/50 shadow-2xl overflow-hidden">
              <CornerOrnament position="top-left" size={28} />
              <CornerOrnament position="top-right" size={28} />
              <CornerOrnament position="bottom-left" size={28} />
              <CornerOrnament position="bottom-right" size={28} />
              <IslamicStarPattern opacity={0.08} className="text-gold-champagne" />
            </div>

            {/* 2. Invitation Card - Slides out smoothly within safe vertical bounds */}
            <motion.div
              initial={{ y: 0, scale: 0.94, opacity: 0.85 }}
              animate={
                phase !== "closed"
                  ? {
                      y: -85, // Calibrated so card top stays safely inside screen
                      scale: 1.03,
                      opacity: 1,
                      zIndex: 35,
                      transition: {
                        delay: 0.25,
                        duration: 1.1,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
                  : { y: 0, scale: 0.94, opacity: 0.85, zIndex: 10 }
              }
              onClick={phase === "showing" ? enterMainSite : undefined}
              className={`absolute inset-2 sm:inset-3 rounded-2xl bg-gradient-to-b from-white via-ivory-50 to-ivory-100 p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-gold-500/50 flex flex-col items-center justify-between text-center text-emerald-950 backdrop-blur-sm ${
                phase === "showing" ? "cursor-pointer" : ""
              }`}
            >
              {/* Inner card border */}
              <div className="pointer-events-none absolute inset-1 sm:inset-1.5 rounded-xl border border-gold-500/30" />

              {/* Bismillah on Card */}
              <div className="pt-0.5 w-full">
                <p className="font-arabic text-gold-700 text-base sm:text-xl font-bold leading-normal block">
                  {config.bismillah.arabic}
                </p>
                <div className="mt-0.5 flex items-center justify-center space-x-1.5 text-gold-600">
                  <span className="h-[1px] w-4 bg-gold-500/40" />
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-800">
                    Wedding Invitation
                  </span>
                  <span className="h-[1px] w-4 bg-gold-500/40" />
                </div>
              </div>

              {/* Couple Names (English + Arabic Calligraphy) */}
              <div className="my-0.5 space-y-0.5 w-full">
                {/* Groom */}
                <div>
                  {config.couple.groom.arabicName && (
                    <p className="font-arabic text-gold-700 text-sm sm:text-lg font-bold leading-none">
                      {config.couple.groom.arabicName}
                    </p>
                  )}
                  <h2 className="font-serif text-base sm:text-2xl text-emerald-950 font-bold tracking-tight">
                    {config.couple.groom.name}
                  </h2>
                </div>

                {/* Heart divider */}
                <div className="flex items-center justify-center space-x-1.5 text-gold-600 py-0.5">
                  <span className="h-[1px] w-5 bg-gradient-to-r from-transparent to-gold-500/50" />
                  <Heart className="h-2 w-2 fill-gold-500 text-gold-500" />
                  <span className="h-[1px] w-5 bg-gradient-to-l from-transparent to-gold-500/50" />
                </div>

                {/* Bride */}
                <div>
                  {config.couple.bride.arabicName && (
                    <p className="font-arabic text-gold-700 text-sm sm:text-lg font-bold leading-none">
                      {config.couple.bride.arabicName}
                    </p>
                  )}
                  <h2 className="font-serif text-base sm:text-2xl text-emerald-950 font-bold tracking-tight">
                    {config.couple.bride.name}
                  </h2>
                </div>
              </div>

              {/* Venue & Date */}
              <div className="pb-0.5 space-y-0.5">
                <p className="text-[10px] sm:text-xs text-emerald-900 font-serif font-bold">
                  {config.mainEvent.date} • {config.mainEvent.time}
                </p>
                <p className="text-[9px] sm:text-[11px] text-emerald-800/80 font-sans line-clamp-1">
                  {config.mainEvent.venueName}, Kariyad
                </p>
              </div>

              {/* 3-Second Automatic Progress Bar Indicator */}
              {phase === "showing" && (
                <div className="absolute -bottom-1 inset-x-5 h-1 rounded-full bg-emerald-950/20 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className="h-full bg-gold-gradient"
                  />
                </div>
              )}
            </motion.div>

            {/* 3. Envelope Pocket Overlays */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-900 to-emerald-850"
                style={{
                  clipPath: "polygon(0 0, 0 100%, 50% 50%)",
                  filter: "drop-shadow(2px 0 6px rgba(0,0,0,0.4))",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-tl from-emerald-950 via-emerald-900 to-emerald-850"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
                  filter: "drop-shadow(-2px 0 6px rgba(0,0,0,0.4))",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-850 border-b border-gold-500/40 rounded-b-2xl"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 50% 48%)",
                  filter: "drop-shadow(0 -3px 8px rgba(0,0,0,0.45))",
                }}
              />
            </div>

            {/* 4. Top Flap with 3D Hinge Fold */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={
                phase !== "closed"
                  ? {
                      rotateX: 180,
                      zIndex: 5,
                      transition: {
                        duration: 0.85,
                        ease: [0.33, 1, 0.68, 1],
                      },
                    }
                  : { rotateX: 0, zIndex: 30 }
              }
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
            >
              <div
                className="w-full h-full bg-gradient-to-b from-emerald-850 via-emerald-900 to-emerald-950 border-t border-gold-500/50 rounded-t-2xl shadow-xl flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="absolute top-2 flex items-center space-x-1.5 text-gold-500/70">
                  <span className="h-[1px] w-4 bg-gold-500/30" />
                  <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-sans uppercase font-medium">
                    With Blessings
                  </span>
                  <span className="h-[1px] w-4 bg-gold-500/30" />
                </div>
              </div>

              <div
                className="w-full h-full bg-gradient-to-t from-gold-600 via-gold-champagne to-gold-light border-b border-gold-300 rounded-b-2xl shadow-inner flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <IslamicStarPattern opacity={0.15} className="text-emerald-950" />
              </div>
            </motion.div>

            {/* 5. Center Gold Wax Seal Button */}
            {phase === "closed" && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="group relative h-15 w-15 sm:h-20 sm:w-20 rounded-full p-1 shadow-gold-glow flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label="Open Wedding Invitation Envelope"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light via-gold-500 to-gold-700 shadow-md" />
                  <div className="relative h-full w-full rounded-full border border-gold-light/60 flex flex-col items-center justify-center bg-gradient-to-br from-gold-600 via-gold-700 to-gold-800 text-ivory-50 shadow-inner group-hover:from-gold-500 group-hover:to-gold-700 transition-colors">
                    <Sparkles className="h-5 w-5 text-gold-light group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold text-gold-light mt-0.5">
                      OPEN
                    </span>
                  </div>
                </button>
              </div>
            )}
          </motion.div>

          {/* Bottom Label & CTAs */}
          <div className="mt-8 sm:mt-12 flex flex-col items-center text-center space-y-2 z-30 min-h-[65px]">
            {phase === "closed" ? (
              <div className="flex flex-col items-center space-y-2">
                <p className="text-ivory-100 text-xs sm:text-sm tracking-wide font-sans">
                  A sacred union blessed by Allah Almighty
                </p>

                <button
                  onClick={handleOpenEnvelope}
                  className="group relative inline-flex items-center space-x-2 rounded-full bg-gold-gradient px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-emerald-950 shadow-gold transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Sparkles className="h-4 w-4 text-emerald-900 group-hover:rotate-45 transition-transform" />
                  <span className="tracking-wider uppercase">Open Invitation</span>
                  <Sparkles className="h-4 w-4 text-emerald-900 group-hover:-rotate-45 transition-transform" />
                </button>

                <span className="text-[10px] text-ivory-200/60 font-sans tracking-wider">
                  Tap the wax seal or button to open
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-1"
              >
                <div className="flex items-center space-x-1.5 text-gold-champagne text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>Entering wedding celebration...</span>
                </div>
                <button
                  type="button"
                  onClick={enterMainSite}
                  className="text-[11px] text-ivory-200/80 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Tap here to enter right now →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
