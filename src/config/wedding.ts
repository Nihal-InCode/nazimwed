import { WeddingConfig } from "@/types/wedding";

/**
 * =======================================================================
 * WEDDING INVITATION CONFIGURATION
 * =======================================================================
 */

export const weddingConfig: WeddingConfig = {
  meta: {
    title: "Muhammed Nazim HF & Nafeesathul Misriya Wafiya | Wedding Invitation",
    description:
      "Together with their beloved families, Muhammed Nazim HF (Son of Abdul Nasar & Shameema) and Nafeesathul Misriya Wafiya (Daughter of Haneefa AK & Juvariya) request the honour of your presence at their Nikah ceremony on Thursday, 24 December 2026 at CH Moidu Master Auditorium, Kariyad.",
  },

  // 1. Couple Details with Arabic Calligraphy & Beloved Parents
  couple: {
    groom: {
      name: "Muhammed Nazim HF",
      arabicName: "محمد ناظم",
      parents: "Son of Abdul Nasar & Shameema",
      family: "",
    },
    bride: {
      name: "Nafeesathul Misriya Wafiya",
      arabicName: "نفيسة المصرية وافية",
      parents: "Daughter of Haneefa AK & Juvariya",
      family: "",
    },
  },

  // 2. Bismillah & Quranic Verse (Clean without harakat)
  bismillah: {
    arabic: "بسم الله الرحمن الرحيم",
    english: "In the name of Allah, the Most Gracious, the Most Merciful",
  },

  invitationText: {
    title: "Wedding Invitation",
    subheading: "With the blessings of Allah Almighty",
    invitationLine:
      "We cordially invite you to celebrate the wedding ceremony of",
    familyLine: "Together with their beloved families",
    quranVerse:
      "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them; and He has put love and mercy between your hearts.",
    quranReference: "Surah Ar-Rum (30:21)",
  },

  // 3. Primary Wedding Ceremony & Live Countdown Target
  mainEvent: {
    date: "Thursday, 24 December 2026",
    time: "11:00 AM",
    targetIsoDateTime: "2026-12-24T11:00:00+05:30",
    timezone: "Asia/Kolkata",
    venueName: "CH Moidu Master Auditorium",
    venueAddress: "Kariyad, Kerala 673316",
    googleMapsUrl: "https://maps.app.goo.gl/8WGT85h5VVTHTeL17",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=11.6941424,75.5805631&hl=en&z=16&output=embed",
  },

  // 4. Single Main Wedding Event
  events: [
    {
      id: "nikah",
      title: "Nikah Ceremony & Wedding Feast",
      subtitle: "Solemnization of Marriage & Celebrations",
      date: "Thursday, 24 December 2026",
      time: "11:00 AM",
      venueName: "CH Moidu Master Auditorium",
      address: "Kariyad, Kerala 673316",
      googleMapsUrl: "https://maps.app.goo.gl/8WGT85h5VVTHTeL17",
      icon: "nikah",
      note: "Join us in prayer as the sacred marital vows are solemnized, followed by the traditional Kerala Muslim wedding banquet.",
    },
  ],

  // 5. WhatsApp RSVP
  rsvp: {
    whatsappNumber: "918123312736",
    whatsappContactName: "Abdul Nasar & Family",
    deadline: "[RSVP DEADLINE DATE]",
    note: "Please kindly confirm your attendance so we may warmly prepare for your reception.",
  },

  // 6. Interactive Feature Flags
  options: {
    enableCountdown: true,
    enablePetals: true,
    enableEnvelopeOpening: true,
  },
};
