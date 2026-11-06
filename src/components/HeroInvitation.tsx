"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";
import {
  GoldFlourishDivider,
  CornerOrnament,
  MihrabFrame,
  IslamicStarPattern,
} from "./IslamicPattern";

interface HeroInvitationProps {
  config: WeddingConfig;
}

export const HeroInvitation: React.FC<HeroInvitationProps> = ({ config }) => {
  return (
    <section className="relative px-3 sm:px-6 py-6 sm:py-16 md:py-24 flex justify-center items-center overflow-hidden">
      {/* Background Islamic Jaali Watermark with slow parallax breathing */}
      <IslamicStarPattern opacity={0.04} className="text-emerald-900" />

      {/* Main Luxury Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl"
      >
        <MihrabFrame className="bg-ivory-50/98 shadow-luxury-lg border-2 border-gold-500/40 p-5 sm:p-8 md:p-14">
          {/* Corner filigrees */}
          <CornerOrnament position="top-left" size={42} />
          <CornerOrnament position="top-right" size={42} />
          <CornerOrnament position="bottom-left" size={42} />
          <CornerOrnament position="bottom-right" size={42} />

          <div className="relative z-10 flex flex-col items-center text-center space-y-5 sm:space-y-6 pt-3 pb-2">
            {/* 1. Bismillah Calligraphy */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center pt-2 pb-1"
            >
              <h1 className="font-arabic text-2xl sm:text-4xl md:text-5xl text-emerald-950 font-medium leading-loose tracking-wide block drop-shadow-sm mb-2">
                {config.bismillah.arabic}
              </h1>
              <p className="text-[10px] sm:text-xs text-emerald-800/80 font-sans tracking-widest uppercase mt-2 px-2">
                {config.bismillah.english}
              </p>
            </motion.div>

            {/* Gold Flourish Divider */}
            <div className="w-full my-1 sm:my-2">
              <GoldFlourishDivider />
            </div>

            {/* 2. Invitation Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5 max-w-lg px-2"
            >
              <p className="text-[11px] sm:text-sm uppercase tracking-[0.25em] text-gold-700 font-bold">
                {config.invitationText.subheading}
              </p>
              <p className="text-xs sm:text-base text-emerald-900/90 font-serif italic">
                {config.invitationText.invitationLine}
              </p>
            </motion.div>

            {/* 3. Prominent Couple Names with Arabic Script */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="my-2 sm:my-5 space-y-3 sm:space-y-5 w-full"
            >
              {/* Groom's Name */}
              <div className="space-y-1 group px-2">
                {config.couple.groom.arabicName && (
                  <p className="font-arabic text-xl sm:text-3xl md:text-5xl text-gold-700 font-bold leading-tight drop-shadow-sm">
                    {config.couple.groom.arabicName}
                  </p>
                )}
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-emerald-950 group-hover:text-gold-700 transition-colors duration-300">
                  {config.couple.groom.name}
                </h2>
                {config.couple.groom.parents && (
                  <p className="text-[11px] sm:text-sm text-emerald-800/80 font-sans">
                    {config.couple.groom.parents}
                  </p>
                )}
                {config.couple.groom.family && (
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
                    {config.couple.groom.family}
                  </p>
                )}
              </div>

              {/* Decorative Ampersand & Heart */}
              <div className="flex items-center justify-center space-x-3 text-gold-600">
                <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-600" />
                <span className="font-serif italic text-xl sm:text-3xl text-gold-600 px-2 font-normal">
                  &amp;
                </span>
                <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-600" />
              </div>

              {/* Bride's Name */}
              <div className="space-y-1 group px-2">
                {config.couple.bride.arabicName && (
                  <p className="font-arabic text-xl sm:text-3xl md:text-5xl text-gold-700 font-bold leading-tight drop-shadow-sm">
                    {config.couple.bride.arabicName}
                  </p>
                )}
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-emerald-950 group-hover:text-gold-700 transition-colors duration-300">
                  {config.couple.bride.name}
                </h2>
                {config.couple.bride.parents && (
                  <p className="text-[11px] sm:text-sm text-emerald-800/80 font-sans">
                    {config.couple.bride.parents}
                  </p>
                )}
                {config.couple.bride.family && (
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-700 font-semibold">
                    {config.couple.bride.family}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Families Line */}
            <p className="text-xs sm:text-sm text-emerald-900/80 font-serif italic max-w-md px-2">
              {config.invitationText.familyLine}
            </p>

            {/* 4. Quranic Verse / Dua */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="my-2 max-w-xl rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-gold-500/30 text-emerald-900 shadow-inner backdrop-blur-sm mx-2"
            >
              <p className="text-xs sm:text-sm italic leading-relaxed text-emerald-950 font-serif">
                &ldquo;{config.invitationText.quranVerse}&rdquo;
              </p>
              <p className="mt-1.5 text-[10px] sm:text-[11px] tracking-wider uppercase text-gold-700 font-bold">
                — {config.invitationText.quranReference}
              </p>
            </motion.div>

            {/* 5. Primary Wedding Date, Time & Venue Plaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-850 to-emerald-950 p-5 sm:p-7 text-ivory-50 border border-gold-500/50 shadow-luxury"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gold-500/30 text-center">
                {/* Date & Time */}
                <div className="space-y-1.5 pb-3 sm:pb-0 sm:pr-3 flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-1.5 text-gold-light">
                    <Calendar className="h-4 w-4 text-gold-champagne" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                      Date &amp; Time
                    </span>
                  </div>
                  <p className="text-sm sm:text-lg font-serif font-bold text-ivory-100">
                    {config.mainEvent.date}
                  </p>
                  <div className="flex items-center space-x-1.5 text-xs text-gold-light/90">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{config.mainEvent.time}</span>
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="space-y-1.5 pt-3 sm:pt-0 sm:pl-3 flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-1.5 text-gold-light">
                    <MapPin className="h-4 w-4 text-gold-champagne" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                      Wedding Venue
                    </span>
                  </div>
                  <p className="text-sm sm:text-lg font-serif font-bold text-ivory-100">
                    {config.mainEvent.venueName}
                  </p>
                  <p className="text-xs text-ivory-200/80 line-clamp-2 max-w-xs">
                    {config.mainEvent.venueAddress}
                  </p>
                </div>
              </div>

              {/* Action buttons inside card */}
              <div className="mt-5 pt-4 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href="#events"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold text-emerald-950 shadow-gold transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Nikah Ceremony Details</span>
                </a>
                <a
                  href={config.mainEvent.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-gold-500/60 bg-emerald-900/50 px-6 py-3 text-xs font-semibold text-gold-light transition-all duration-300 hover:bg-gold-500/20 hover:scale-105 active:scale-95"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>
          </div>
        </MihrabFrame>
      </motion.div>
    </section>
  );
};
