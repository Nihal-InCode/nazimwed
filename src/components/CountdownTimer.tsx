"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { IslamicStarPattern, GoldFlourishDivider } from "./IslamicPattern";

interface CountdownTimerProps {
  targetIsoDateTime: string;
  weddingDateString?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasPassed: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetIsoDateTime,
  weddingDateString,
}) => {
  const [mounted, setMounted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasPassed: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateRemaining = () => {
      const targetTime = new Date(targetIsoDateTime).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (isNaN(targetTime) || difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasPassed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        hasPassed: false,
      });
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetIsoDateTime]);

  // SSR placeholder to prevent hydration flash
  if (!mounted) {
    return (
      <section className="relative px-3 sm:px-6 py-10 flex justify-center">
        <div className="w-full max-w-2xl rounded-3xl bg-emerald-950 p-6 text-center text-ivory-50 animate-pulse">
          <p className="text-xs uppercase tracking-widest text-gold-champagne">
            Loading countdown...
          </p>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="relative px-3 sm:px-6 py-10 sm:py-16 md:py-20 flex justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-5 sm:p-10 text-ivory-50 border-2 border-gold-500/40 shadow-luxury-lg overflow-hidden"
      >
        {/* Subtle geometric watermark */}
        <IslamicStarPattern opacity={0.06} className="text-gold-light" />

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-5 sm:space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2 text-gold-champagne">
              <Clock className="h-4 w-4 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                Counting Down To The Sacred Nikah
              </span>
            </div>
            {weddingDateString && (
              <p className="text-xs sm:text-sm text-ivory-200/80 font-sans">
                {weddingDateString}
              </p>
            )}
          </div>

          <GoldFlourishDivider />

          {/* Conditional Display: Countdown or Begun Celebration */}
          {timeRemaining.hasPassed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="py-5 px-3 rounded-2xl bg-emerald-850/80 border border-gold-500/40 max-w-xl text-center space-y-2.5"
            >
              <div className="flex justify-center text-gold-light">
                <Sparkles className="h-7 w-7 text-gold-champagne animate-pulse" />
              </div>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-gold-champagne">
                Alhamdulillah, the wedding celebration has begun.
              </h3>
              <p className="text-xs sm:text-sm text-ivory-100/90 font-serif italic">
                May Allah bless their marriage, shower them with happiness, and
                unite them in goodness.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full max-w-lg">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex flex-col items-center justify-center rounded-2xl bg-emerald-850/90 border border-gold-500/30 p-2.5 sm:p-5 shadow-inner backdrop-blur-sm group hover:border-gold-500/60 hover:shadow-gold transition-all duration-300"
                >
                  <span className="font-serif text-xl sm:text-4xl md:text-5xl font-bold text-gold-light tracking-tight group-hover:text-white transition-colors">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[9px] sm:text-xs uppercase tracking-wider text-ivory-200/70 font-semibold group-hover:text-gold-champagne transition-colors">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          <p className="font-arabic text-sm sm:text-base text-gold-champagne tracking-wide px-2">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
        </div>
      </motion.div>
    </section>
  );
};
