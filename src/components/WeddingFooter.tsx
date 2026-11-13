"use client";

import React from "react";
import { Heart, MailOpen, Instagram } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";
import { GoldFlourishDivider, IslamicStarPattern } from "./IslamicPattern";

interface WeddingFooterProps {
  config: WeddingConfig;
  onReopenEnvelope?: () => void;
}

export const WeddingFooter: React.FC<WeddingFooterProps> = ({
  config,
  onReopenEnvelope,
}) => {
  return (
    <footer className="relative bg-emerald-950 text-ivory-50 pt-16 pb-20 px-4 mt-12 overflow-hidden border-t-2 border-gold-500/30">
      <IslamicStarPattern opacity={0.05} className="text-gold-light" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Monogram Seal */}
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gold-500/50 bg-emerald-950 shadow-gold">
          <img
            src="/images/ring.jpg"
            alt="Wedding rings"
            className="h-full w-full scale-125 object-cover object-center"
          />
        </div>

        {/* Couple Names */}
        <div className="space-y-1">
          {config.couple.groom.arabicName && config.couple.bride.arabicName && (
            <p className="font-arabic text-gold-500 text-lg sm:text-2xl font-bold">
              {config.couple.groom.arabicName} &amp; {config.couple.bride.arabicName}
            </p>
          )}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-champagne">
            {config.couple.groom.name} &amp; {config.couple.bride.name}
          </h3>
          <p className="text-xs text-ivory-200/70 font-sans tracking-widest uppercase">
            {config.mainEvent.date} • {config.mainEvent.venueName}
          </p>
        </div>

        <GoldFlourishDivider />

        {/* Traditional Islamic Dua */}
        <p className="font-arabic text-base sm:text-lg text-gold-light max-w-lg leading-relaxed">
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p className="text-xs sm:text-sm text-ivory-200/80 italic font-serif max-w-md">
          &ldquo;May Allah bless you, and shower His blessings upon you, and bring you together in goodness.&rdquo;
        </p>

        {/* Re-open Envelope CTA */}
        {onReopenEnvelope && (
          <button
            type="button"
            onClick={onReopenEnvelope}
            className="inline-flex items-center space-x-2 rounded-full border border-gold-500/40 bg-emerald-900/60 px-5 py-2.5 text-xs text-gold-light hover:bg-gold-500/20 transition-all duration-300 hover:scale-105 active:scale-95 mt-2"
          >
            <MailOpen className="h-3.5 w-3.5" />
            <span>Open Envelope Cover Again</span>
          </button>
        )}

        {/* Creator Signature */}
        <div className="pt-6 border-t border-gold-500/20 w-full flex flex-col items-center justify-center space-y-2">
          <p className="flex items-center justify-center flex-wrap gap-1.5 text-xs text-ivory-200/80 font-sans">
            <span>Created with</span>
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400 animate-pulse inline" />
            <span>by</span>
            <a
              href="https://www.instagram.com/nihalch.exe?rpxt=MWp0N2UaXk1NTAwZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 font-semibold text-gold-champagne hover:text-white transition-all underline underline-offset-4 decoration-gold-500/60 hover:decoration-white"
            >
              <Instagram className="h-3.5 w-3.5 text-gold-champagne" />
              <span>nihalch.exe</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
