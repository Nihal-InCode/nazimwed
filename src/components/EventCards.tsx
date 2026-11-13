"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation, Heart, Sparkles } from "lucide-react";
import { WeddingEvent } from "@/types/wedding";
import { GoldFlourishDivider, CornerOrnament } from "./IslamicPattern";

interface EventCardsProps {
  events: WeddingEvent[];
}

export const EventCards: React.FC<EventCardsProps> = ({ events }) => {
  const [savedEventId, setSavedEventId] = useState<string | null>(null);
  const heartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const calendarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!events || events.length === 0) return null;

  const playSaveAnimation = (eventId: string) => {
    setSavedEventId(eventId);
    if (heartTimer.current) clearTimeout(heartTimer.current);
    heartTimer.current = setTimeout(() => setSavedEventId(null), 650);
  };

  const openCalendarAfterAnimation = (event: WeddingEvent) => {
    playSaveAnimation(event.id);
    if (calendarTimer.current) clearTimeout(calendarTimer.current);
    calendarTimer.current = setTimeout(() => {
      window.open(createGoogleCalendarUrl(event), "_blank", "noopener,noreferrer");
    }, 600);
  };

  const createGoogleCalendarUrl = (event: WeddingEvent) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(
      `${event.subtitle || "Wedding Event"}\nVenue: ${event.venueName}\nAddress: ${event.address}\n${event.note || ""}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);
    const formatCalendarTime = (dateTime: string) =>
      new Date(dateTime).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const dates = event.calendarStart && event.calendarEnd
      ? `&dates=${formatCalendarTime(event.calendarStart)}/${formatCalendarTime(event.calendarEnd)}`
      : "";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dates}`;
  };

  const isSingleEvent = events.length === 1;

  return (
    <section id="events" className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 mb-10 sm:mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gold-700 font-semibold">
            Sacred Ceremony &amp; Celebration
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-950">
            {isSingleEvent ? "The Wedding Ceremony" : "Wedding Celebrations"}
          </h2>
          <p className="text-sm sm:text-base text-emerald-800/80 font-sans max-w-lg mx-auto">
            Please join us to commemorate every cherished prayer, sacred marital vows, and banquet.
          </p>
          <GoldFlourishDivider />
        </motion.div>

        {/* Featured Single Card or Grid */}
        <div
          className={
            isSingleEvent
              ? "max-w-2xl mx-auto"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          }
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: index * 0.18,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative flex flex-col justify-between rounded-3xl bg-ivory-50/95 p-7 sm:p-10 border-2 border-gold-500/40 shadow-luxury transition-all duration-500 hover:shadow-luxury-lg hover:border-gold-500/80"
            >
              {/* Corner filigrees */}
              <CornerOrnament position="top-left" size={38} />
              <CornerOrnament position="top-right" size={38} />
              <CornerOrnament position="bottom-left" size={38} />
              <CornerOrnament position="bottom-right" size={38} />

              {/* Main Content */}
              <div className="space-y-6">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    aria-label={`Add ${event.title} to Google Calendar`}
                    title="Add to Google Calendar"
                    onClick={() => openCalendarAfterAnimation(event)}
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500/50 bg-emerald-900 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                  >
                    <motion.div
                      animate={savedEventId === event.id ? { scale: [1, 1.75, 0.88, 1.12, 1], rotate: [0, -10, 8, -3, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.58, times: [0, 0.28, 0.55, 0.78, 1], ease: [0.18, 0.89, 0.32, 1] }}
                      className="relative"
                    >
                      <Heart
                        className={`h-6 w-6 transition-colors duration-150 ${savedEventId === event.id ? "fill-[#ff4d3d] text-[#ff9a3d] drop-shadow-[0_0_8px_rgba(255,90,50,0.65)]" : "fill-gold-500/20 text-gold-champagne"}`}
                        strokeWidth={savedEventId === event.id ? 2.8 : 2}
                      />
                      <AnimatePresence>
                        {savedEventId === event.id && (
                          <motion.span
                            initial={{ scale: 0.45, opacity: 0.75 }}
                            animate={{ scale: 2.7, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.48, ease: "easeOut" }}
                            className="pointer-events-none absolute -inset-1 rounded-full border-2 border-orange-400"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </button>
                  <span className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 border border-gold-500/30">
                    <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                    <span>Main Ceremony</span>
                  </span>
                </div>

                {/* Event Name & Subtitle */}
                <div className="space-y-1">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 group-hover:text-gold-700 transition-colors duration-300">
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <p className="text-sm text-gold-700 font-medium tracking-wide">
                      {event.subtitle}
                    </p>
                  )}
                </div>

                {/* Date & Time Plaque */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl bg-emerald-50/70 p-4 sm:p-5 border border-gold-500/30 text-emerald-950">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gold-500/30 shadow-sm flex-shrink-0">
                      <Calendar className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gold-700 font-bold">
                        Date
                      </p>
                      <p className="text-sm sm:text-base font-bold font-serif">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gold-500/30 shadow-sm flex-shrink-0">
                      <Clock className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gold-700 font-bold">
                        Auspicious Time
                      </p>
                      <p className="text-sm sm:text-base font-bold font-serif">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="flex items-start space-x-3 text-sm text-emerald-950 pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/70 border border-gold-500/30 shadow-sm flex-shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-emerald-950">
                      {event.venueName}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-800/80 mt-0.5">
                      {event.address}
                    </p>
                  </div>
                </div>

                {/* Note */}
                {event.note && (
                  <p className="text-xs sm:text-sm text-emerald-900/80 italic border-l-2 border-gold-500/50 pl-3.5 py-1 bg-ivory-100/60 rounded-r-lg font-serif">
                    {event.note}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gold-500/25 flex flex-col sm:flex-row gap-3">
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 rounded-full bg-emerald-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-ivory-50 shadow-md transition-all duration-300 hover:bg-emerald-850 hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="h-4 w-4 text-gold-champagne" />
                  <span>Get Directions on Google Maps</span>
                </a>
                <a
                  href={createGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 rounded-full border border-gold-500/50 bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-900 transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98]"
                  title="Add to Google Calendar"
                >
                  <Calendar className="h-4 w-4 text-gold-600" />
                  <span>Add to Calendar</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
