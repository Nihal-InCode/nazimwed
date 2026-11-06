"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CheckCircle, Users, Heart, Send, Copy, AlertCircle, Check } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";
import { GoldFlourishDivider, CornerOrnament } from "./IslamicPattern";

interface RsvpSectionProps {
  config: WeddingConfig;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config }) => {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Normalize WhatsApp number with 91 prefix if 10 digits
  const getCleanNumber = () => {
    let raw = (config.rsvp.whatsappNumber || "918123312736").replace(/[^0-9]/g, "");
    if (raw.length === 10) {
      raw = "91" + raw;
    }
    return raw;
  };

  // Construct structured WhatsApp message
  const constructWhatsAppMessage = () => {
    const attendanceText =
      attending === "yes"
        ? `Joyfully Attending (${guestCount} ${guestCount === 1 ? "Guest" : "Guests"})`
        : "Regretfully Declining with Best Wishes";

    let text = `*Assalamu Alaikum!*\n\n`;
    text += `*Wedding RSVP for ${config.couple.groom.name} & ${config.couple.bride.name}*\n\n`;
    text += `*Guest Name:* ${name.trim() || "[Guest Name]"}\n`;
    if (phone.trim()) text += `*Contact:* ${phone.trim()}\n`;
    text += `*Status:* ${attendanceText}\n`;
    if (message.trim()) {
      text += `*Dua / Message:* "${message.trim()}"\n`;
    }
    text += `\n_Sent via Wedding Invitation Website_`;

    return text;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name to send your RSVP.");
      return;
    }

    const cleanNumber = getCleanNumber();
    const messageText = constructWhatsAppMessage();
    const encodedText = encodeURIComponent(messageText);

    // Primary mobile deep link for WhatsApp
    const mobileWhatsAppUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
    const webWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

    try {
      // Test if on mobile device to directly trigger app
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = mobileWhatsAppUrl;
      } else {
        window.open(webWhatsAppUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      window.location.href = webWhatsAppUrl;
    }
  };

  const handleCopyMessage = () => {
    const messageText = constructWhatsAppMessage();
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="rsvp" className="relative px-3 sm:px-6 py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2.5 mb-8 sm:mb-10"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-700 font-bold">
            Honour Us With Your Presence
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-emerald-950">
            Confirm Your Attendance
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800/80 font-sans max-w-md mx-auto px-2">
            {config.rsvp.note ||
              "Please kindly confirm your attendance so we may warmly prepare for your reception."}
          </p>
          <GoldFlourishDivider />
        </motion.div>

        {/* Mobile-Optimized RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-ivory-50/98 border-2 border-gold-500/40 p-5 sm:p-8 md:p-10 shadow-luxury overflow-hidden"
        >
          <CornerOrnament position="top-left" size={32} />
          <CornerOrnament position="top-right" size={32} />
          <CornerOrnament position="bottom-left" size={32} />
          <CornerOrnament position="bottom-right" size={32} />

          <form onSubmit={handleSendWhatsApp} className="space-y-5 sm:space-y-6">
            {/* 1. Attendance Choice */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest font-bold text-emerald-950">
                Will you be attending? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setAttending("yes")}
                  className={`flex items-center justify-center space-x-1.5 sm:space-x-2 rounded-2xl py-3.5 px-3 border text-xs sm:text-sm font-bold transition-all duration-300 min-h-[50px] ${
                    attending === "yes"
                      ? "bg-emerald-900 border-gold-500 text-ivory-50 shadow-md scale-[1.02]"
                      : "bg-white border-gold-500/30 text-emerald-900 hover:bg-emerald-50"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 text-gold-champagne flex-shrink-0" />
                  <span>Joyfully Attending</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending("no")}
                  className={`flex items-center justify-center space-x-1.5 sm:space-x-2 rounded-2xl py-3.5 px-3 border text-xs sm:text-sm font-bold transition-all duration-300 min-h-[50px] ${
                    attending === "no"
                      ? "bg-emerald-900 border-gold-500 text-ivory-50 shadow-md scale-[1.02]"
                      : "bg-white border-gold-500/30 text-emerald-900 hover:bg-emerald-50"
                  }`}
                >
                  <Heart className="h-4 w-4 text-gold-champagne flex-shrink-0" />
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* 2. Number of Guests (if attending) */}
            {attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-xs uppercase tracking-widest font-bold text-emerald-950">
                  Number of Guests
                </label>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, "6+"].map((count) => {
                    const countVal = typeof count === "string" ? 6 : count;
                    const isSelected = guestCount === countVal;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(countVal)}
                        className={`rounded-xl py-2.5 sm:py-3 border text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                          isSelected
                            ? "bg-gold-gradient text-emerald-950 border-gold-600 shadow-sm scale-105"
                            : "bg-white border-gold-500/30 text-emerald-900 hover:bg-emerald-50"
                        }`}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 3. Guest Name Input (text-base prevents iOS Safari auto-zoom) */}
            <div className="space-y-1.5">
              <label
                htmlFor="guest-name"
                className="block text-xs uppercase tracking-widest font-bold text-emerald-950"
              >
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Muhammed Farhan & Family"
                className="w-full rounded-2xl border border-gold-500/40 bg-white px-4 py-3.5 text-base text-emerald-950 placeholder:text-emerald-900/40 focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            {/* 4. Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="guest-phone"
                className="block text-xs uppercase tracking-widest font-bold text-emerald-950"
              >
                Your Phone Number <span className="text-[11px] lowercase text-emerald-800/60 font-normal">(optional)</span>
              </label>
              <input
                id="guest-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full rounded-2xl border border-gold-500/40 bg-white px-4 py-3.5 text-base text-emerald-950 placeholder:text-emerald-900/40 focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            {/* 5. Heartfelt Message / Dua */}
            <div className="space-y-1.5">
              <label
                htmlFor="guest-message"
                className="block text-xs uppercase tracking-widest font-bold text-emerald-950"
              >
                Dua / Best Wishes for the Couple <span className="text-[11px] lowercase text-emerald-800/60 font-normal">(optional)</span>
              </label>
              <textarea
                id="guest-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers or congratulations..."
                className="w-full rounded-2xl border border-gold-500/40 bg-white px-4 py-3 text-base text-emerald-950 placeholder:text-emerald-900/40 focus:border-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-300"
              >
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* WhatsApp RSVP Action */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2.5 rounded-full bg-[#25D366] px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#1EBE5D] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] min-h-[52px]"
              >
                <MessageCircle className="h-5 w-5 fill-white text-[#25D366] flex-shrink-0" />
                <span>Send RSVP via WhatsApp</span>
                <Send className="h-4 w-4 opacity-80 flex-shrink-0" />
              </button>

              <div className="flex items-center justify-between text-xs text-emerald-900/70 pt-1 px-1">
                <span className="flex items-center space-x-1">
                  <Users className="h-3.5 w-3.5 text-gold-600 flex-shrink-0" />
                  <span>RSVP to: <strong>8123312736</strong></span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center space-x-1 text-gold-700 hover:text-gold-800 font-semibold underline underline-offset-4 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" />
                      <span className="text-emerald-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
