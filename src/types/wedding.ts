export interface CoupleDetails {
  groom: {
    name: string;
    arabicName?: string;
    parents?: string;
    family?: string;
  };
  bride: {
    name: string;
    arabicName?: string;
    parents?: string;
    family?: string;
  };
}

export interface WeddingEvent {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  icon?: "nikah" | "reception" | "walima" | "celebration";
  note?: string;
}

export interface WeddingConfig {
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  couple: CoupleDetails;
  bismillah: {
    arabic: string;
    english: string;
  };
  invitationText: {
    title: string;
    subheading: string;
    invitationLine: string;
    familyLine: string;
    quranVerse: string;
    quranReference: string;
  };
  mainEvent: {
    date: string;
    time: string;
    targetIsoDateTime: string; // Used for the countdown timer (e.g. 2026-12-25T11:30:00+05:30)
    timezone: string;
    venueName: string;
    venueAddress: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl?: string;
  };
  events: WeddingEvent[];
  rsvp: {
    whatsappNumber: string; // Format: country code + number (e.g. +91XXXXXXXXXX)
    whatsappContactName: string;
    deadline?: string;
    note?: string;
  };
  options: {
    enableCountdown: boolean;
    enablePetals: boolean;
    enableEnvelopeOpening: boolean;
  };
}
