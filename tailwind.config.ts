import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCFAF6",
          100: "#F8F4EB",
          200: "#F1E9DB",
          300: "#E6DBC6",
          400: "#D8C7A9",
        },
        emerald: {
          950: "#061810",
          900: "#0D281E",
          850: "#12382A",
          800: "#1A4635",
          700: "#245C47",
          600: "#30745A",
          100: "#E3ECE7",
          50: "#F0F5F2",
        },
        gold: {
          light: "#F7E8C4",
          champagne: "#E5D2A0",
          500: "#D4AF37",
          600: "#C59E3F",
          700: "#AC842A",
          800: "#8B651B",
          dark: "#6F4F13",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Outfit", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Amiri", "Traditional Arabic", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ECC876 0%, #D4AF37 50%, #AC842A 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D4AF37 0%, #FFF3D1 50%, #D4AF37 100%)",
        "emerald-gradient": "linear-gradient(180deg, #0D281E 0%, #081B14 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 244, 235, 0.95) 100%)",
      },
      boxShadow: {
        luxury: "0 20px 50px -10px rgba(13, 40, 30, 0.15)",
        "luxury-lg": "0 25px 60px -15px rgba(13, 40, 30, 0.22)",
        gold: "0 8px 30px rgba(212, 175, 55, 0.25)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.35)",
        innerGlow: "inset 0 0 15px rgba(212, 175, 55, 0.15)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
