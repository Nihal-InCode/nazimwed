"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Copy, Check, ExternalLink } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";
import { GoldFlourishDivider, CornerOrnament } from "./IslamicPattern";

interface VenueSectionProps {
  config: WeddingConfig;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const { venueName, venueAddress, googleMapsUrl, googleMapsEmbedUrl } =
    config.mainEvent;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="relative px-3 sm:px-6 py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2.5 mb-8 sm:mb-12"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-700 font-bold">
            Location &amp; Directions
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-emerald-950">
            The Wedding Venue
          </h2>
          <p className="text-xs sm:text-base text-emerald-800/80 font-sans max-w-lg mx-auto px-2">
            We eagerly await your gracious presence. Find our location below.
          </p>
          <GoldFlourishDivider />
        </motion.div>

        {/* Venue Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-ivory-50/98 border-2 border-gold-500/40 p-5 sm:p-8 md:p-10 shadow-luxury overflow-hidden"
        >
          <CornerOrnament position="top-left" size={36} />
          <CornerOrnament position="top-right" size={36} />
          <CornerOrnament position="bottom-left" size={36} />
          <CornerOrnament position="bottom-right" size={36} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Venue Information */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-bold text-emerald-900 border border-gold-500/30">
                <MapPin className="h-3.5 w-3.5 text-gold-600" />
                <span>Nikah Celebration Venue</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-950">
                  {venueName}
                </h3>
                <p className="text-xs sm:text-base text-emerald-900/85 leading-relaxed font-sans">
                  {venueAddress}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full bg-emerald-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-ivory-50 shadow-md transition-all duration-300 hover:bg-emerald-850 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                >
                  <Navigation className="h-4 w-4 text-gold-champagne flex-shrink-0" />
                  <span>Get Directions</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70 flex-shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-gold-500/50 bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-900 transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-700 flex-shrink-0" />
                      <span className="text-emerald-800 font-bold">
                        Address Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-gold-600 flex-shrink-0" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-emerald-800/70 italic pt-0.5">
                Tip: Tapping &quot;Get Directions&quot; opens Google Maps navigation directly on your mobile device.
              </p>
            </div>

            {/* Right: Map Preview / Embedded Map */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gold-500/40 shadow-inner bg-emerald-950/10">
                {googleMapsEmbedUrl ? (
                  <iframe
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CH Moidu Master Auditorium Map"
                    className="w-full h-full"
                  />
                ) : (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-850 to-emerald-950 p-6 text-center text-ivory-50 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_75%)]" />

                    <div className="relative mb-3 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-7 w-7 text-emerald-950" />
                    </div>

                    <h4 className="font-serif text-lg sm:text-2xl font-bold text-gold-champagne group-hover:text-white transition-colors">
                      Open in Google Maps
                    </h4>
                    <p className="mt-1 text-xs text-ivory-200/80 max-w-xs px-2">
                      Tap to open live turn-by-turn navigation on your phone
                    </p>

                    <div className="mt-3.5 inline-flex items-center space-x-1.5 rounded-full bg-gold-gradient px-5 py-2 text-xs font-bold text-emerald-950 shadow-sm group-hover:shadow-gold transition-all duration-300">
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Start Navigation</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
