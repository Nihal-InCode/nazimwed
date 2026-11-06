"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { LivingBackground } from "@/components/LivingBackground";
import { HeroInvitation } from "@/components/HeroInvitation";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventCards } from "@/components/EventCards";
import { VenueSection } from "@/components/VenueSection";
import { RsvpSection } from "@/components/RsvpSection";
import { WeddingFooter } from "@/components/WeddingFooter";
import { FloatingActions } from "@/components/FloatingActions";

export default function WeddingPage() {
  const [showEnvelope, setShowEnvelope] = useState(
    weddingConfig.options.enableEnvelopeOpening
  );

  return (
    <main className="relative min-h-screen bg-ivory-50 overflow-hidden text-emerald-950">
      {/* 1. Interactive Luxury Envelope Opening Experience */}
      {showEnvelope && (
        <EnvelopeOpening
          config={weddingConfig}
          onOpenComplete={() => setShowEnvelope(false)}
        />
      )}

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

      {/* 7. WhatsApp RSVP System */}
      <RsvpSection config={weddingConfig} />

      {/* 8. Footer & Traditional Blessings with Nihal's Signature */}
      <WeddingFooter
        config={weddingConfig}
        onReopenEnvelope={() => setShowEnvelope(true)}
      />

      {/* 9. Floating Quick Share Action */}
      <FloatingActions
        config={weddingConfig}
        onReopenEnvelope={() => setShowEnvelope(true)}
      />
    </main>
  );
}
