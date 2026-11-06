"use client";

import React, { useState, useEffect } from "react";
import { Share2, ArrowUp, Check } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";

interface FloatingActionsProps {
  config: WeddingConfig;
  onReopenEnvelope?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  config,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const shareTitle = `${config.couple.groom.name} & ${config.couple.bride.name} - Wedding Invitation`;
    const shareText = `With the blessings of Allah Almighty, you are cordially invited to celebrate the Nikah of ${config.couple.groom.name} & ${config.couple.bride.name} on Thursday, 24 December 2026 at CH Moidu Master Auditorium, Kariyad. Please view the digital invitation here:`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Dismissed or unsupported
      }
    }

    // Direct WhatsApp share fallback
    const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText} ${shareUrl}`
    )}`;
    window.open(waShareUrl, "_blank");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <aside
      aria-label="Quick mobile actions"
      className="fixed bottom-4 right-3 sm:right-6 z-40 flex flex-col items-end space-y-2.5 pb-[env(safe-area-inset-bottom)]"
    >
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-950/90 text-gold-light border border-gold-500/40 shadow-lg backdrop-blur-sm transition-all hover:bg-emerald-900 hover:scale-105 active:scale-95"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      {/* Share Invitation Button */}
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share Wedding Invitation"
        className="flex items-center space-x-1.5 rounded-full bg-white/95 text-emerald-950 px-3.5 py-2 sm:px-4 sm:py-2.5 border border-gold-500/50 shadow-luxury backdrop-blur-sm transition-all hover:bg-ivory-100 hover:scale-105 active:scale-95 text-xs font-bold"
      >
        {copiedLink ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-700" />
            <span className="text-emerald-800">Shared!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5 text-gold-600" />
            <span>Share Invite</span>
          </>
        )}
      </button>
    </aside>
  );
};
