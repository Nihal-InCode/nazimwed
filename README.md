# 💍 Premium Digital Wedding Invitation Website

A luxurious, modern Indian Muslim wedding invitation website crafted with **Next.js**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**. Designed mobile-first for sharing with relatives, friends, and guests via WhatsApp.

---

## ✨ Features

- **Royal Envelope Opening Animation**: 3D envelope with gold wax seal, unfolding top flap, floating card slide-out, and celebratory gold shimmer.
- **Kerala Muslim Wedding Aesthetics**: Traditional emerald green (`#0D281E`), champagne gold accents (`#D4AF37`), warm ivory card stock (`#FCFAF6`), and delicate white jasmine (mulla/malli) petals.
- **Sacred Islamic Typography**: Elegant *Amiri* Arabic calligraphy for Bismillah (*بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ*), Surah Ar-Rum verse (30:21), and traditional wedding Duas.
- **Prominent Couple Typography**: Luxury serif (*Cormorant Garamond*) with graceful flourishes and family acknowledgements.
- **Live Countdown Timer**: Real-time Days, Hours, Minutes, and Seconds countdown. Transitions automatically after the wedding date to *"Alhamdulillah, the wedding celebration has begun."*
- **Event Itinerary**: Dedicated cards for Nikah, Wedding Reception, Walima (or custom events) with Google Maps directions and one-tap **Add to Google Calendar**.
- **Interactive Venue & Navigation**: Full venue address, one-tap copy button, and direct link to open Google Maps / Apple Maps navigation on mobile.
- **WhatsApp RSVP Integration**: Interactive RSVP form (Attendance, Number of Guests, Name, Heartfelt Dua) that auto-generates a WhatsApp message and opens the host's WhatsApp chat directly.
- **Floating Mobile Actions**: Quick WhatsApp RSVP button and native mobile **Share Invite** button (opens WhatsApp share sheet).
- **Single Configuration File**: All names, dates, times, venues, and contact numbers are managed in one simple file (`src/config/wedding.ts`).

---

## 🛠️ How to Customize the Wedding Details

All details are centralized in:
📁 **`src/config/wedding.ts`**

Simply open that file and replace the placeholders:
1. **Couple Names**: Replace `[GROOM NAME]` and `[BRIDE NAME]`.
2. **Family & Parents**: Add parents' names and house/family names.
3. **Wedding Date & Time**: Set the date (e.g., `Sunday, 27 December 2026`) and ISO timestamp for the countdown (e.g., `2026-12-27T11:30:00+05:30`).
4. **Events**: Customize the Nikah, Reception, or Walima dates, timings, and venues.
5. **Venue & Google Maps**: Enter your venue address and paste the Google Maps link.
6. **WhatsApp RSVP Number**: Put the WhatsApp number (with country code, e.g. `919876543210`) to receive guests' RSVPs.

---

## 🚀 Running the Website Locally

```bash
# 1. Start the development server
npm run dev

# 2. Open in your browser:
# http://localhost:3000
```

To build for production:
```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Vercel / Netlify

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Import your repository and click **Deploy**.
4. Share the generated link with your relatives and guests via WhatsApp!
