"use client";

import React, { useRef, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { LivingBackground } from "@/components/LivingBackground";
import { HeroInvitation } from "@/components/HeroInvitation";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventCards } from "@/components/EventCards";
import { VenueSection } from "@/components/VenueSection";
import { WeddingFooter } from "@/components/WeddingFooter";
import { FloatingActions } from "@/components/FloatingActions";

export default function WeddingPage() {
  const [showEnvelope, setShowEnvelope] = useState(
    weddingConfig.options.enableEnvelopeOpening
  );
  const backgroundAudio = useRef<HTMLAudioElement>(null);

  const startBackgroundAudio = () => {
    const audio = backgroundAudio.current;
    if (!audio) return;

    audio.volume = 0;
    void audio.play().then(() => {
      const targetVolume = 0.28;
      const fadeDurationMs = 1800;
      const fadeStartedAt = performance.now();

      const fadeIn = (now: number) => {
        const progress = Math.max(
          0,
          Math.min((now - fadeStartedAt) / fadeDurationMs, 1)
        );
        audio.volume = targetVolume * progress;
        if (progress < 1) requestAnimationFrame(fadeIn);
      };

      requestAnimationFrame(fadeIn);
    }).catch(() => undefined);
  };

  return (
    <main className="relative min-h-screen bg-ivory-50 overflow-hidden text-emerald-950">
      {/* 1. Interactive Luxury Envelope Opening Experience */}
      {showEnvelope && (
        <EnvelopeOpening
          config={weddingConfig}
          onOpenComplete={() => setShowEnvelope(false)}
          onSealBreak={startBackgroundAudio}
        />
      )}

      <audio ref={backgroundAudio} src="/audio/wedding-nasheed.mp3" loop preload="auto" />

      {/* 2. Living Animated Background (Glowing Orbs + Floating Jasmine Petals + Gold Stardust) */}
      <LivingBackground />

      {/* 3. Main Hero Wedding Invitation */}
      <HeroInvitation config={weddingConfig} />

      {/* 4. Live Wedding Countdown Timer */}
      {weddingConfig.options.enableCountdown && (
        <CountdownTimer
          targetIsoDateTime={weddingConfig.mainEvent.targetIsoDateTime}
          weddingDateString={`${weddingConfig.mainEvent.date} • ${weddingConfig.mainEvent.time}`}
        />
      )}

      {/* 5. Nikah Ceremony Details */}
      <EventCards events={weddingConfig.events} />

      {/* 6. Location & Google Maps Navigation */}
      <VenueSection config={weddingConfig} />

      {/* 7. Footer & Traditional Blessings with Nihal's Signature */}
      <WeddingFooter
        config={weddingConfig}
        onReopenEnvelope={() => setShowEnvelope(true)}
      />

      {/* 8. Floating Quick Share Action */}
      <FloatingActions
        config={weddingConfig}
        onReopenEnvelope={() => setShowEnvelope(true)}
      />
    </main>
  );
}
