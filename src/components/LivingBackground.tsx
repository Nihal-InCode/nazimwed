"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  type: "jasmine" | "goldDust" | "sparkle";
}

// Pre-seeded initial items for instant display with zero delay
const INITIAL_PETALS: PetalItem[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  left: ((i * 17) % 94) + 3,
  size: 14 + ((i * 3) % 12),
  duration: 11 + ((i * 2) % 6),
  delay: (i * 0.7) % 7,
  rotation: (i * 45) % 360,
  opacity: 0.45 + ((i % 3) * 0.12),
  type: i % 4 === 0 ? "goldDust" : i % 5 === 0 ? "sparkle" : "jasmine",
}));

export const LivingBackground: React.FC = () => {
  const [items, setItems] = useState<PetalItem[]>(INITIAL_PETALS);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    }
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Bride & Groom Hands Wedding Background Photo with Soft Transparency */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center will-change-transform opacity-25 sm:opacity-20"
        style={{
          backgroundImage: "url('/images/wedding-hands-bg.jpg')",
          filter: "sepia(20%) saturate(110%)",
        }}
      />

      {/* 2. Soft Ivory & Champagne Radial Gradient Veil for 100% Text Legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(252,250,246,0.72)_0%,_rgba(252,250,246,0.92)_70%,_rgba(248,244,235,0.98)_100%)]" />

      {/* 3. Subtle Ambient Golden & Emerald Aurora Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 20, 0],
          y: [0, -25, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 h-[450px] w-[450px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-br from-gold-500/25 via-gold-champagne/20 to-transparent blur-3xl will-change-transform"
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{ repeat: Infinity, duration: 15, delay: 2, ease: "easeInOut" }}
        className="absolute -bottom-36 -left-36 h-[480px] w-[480px] sm:h-[700px] sm:w-[700px] rounded-full bg-gradient-to-tr from-emerald-800/20 via-emerald-700/15 to-transparent blur-3xl will-change-transform"
      />

      {/* 4. Floating Jasmine Petals & Gold Sparkle Dust */}
      {!prefersReducedMotion &&
        items.map((item) => (
          <div
            key={item.id}
            className="absolute will-change-transform"
            style={{
              left: `${item.left}%`,
              top: "-50px",
              animation: `petalDrift ${item.duration}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              opacity: item.opacity,
            }}
          >
            {item.type === "jasmine" ? (
              // Traditional Kerala white jasmine (mulla) petal with golden aura
              <svg
                width={item.size}
                height={item.size * 1.3}
                viewBox="0 0 24 32"
                fill="none"
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                  filter: "drop-shadow(0 3px 6px rgba(212,175,55,0.3))",
                }}
              >
                <path
                  d="M12 0 C3 9 1 21 12 32 C23 21 21 9 12 0 Z"
                  fill="url(#jasminePetalGrad)"
                />
                <path
                  d="M12 4 Q13 16 12 28"
                  stroke="#E8D196"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient
                    id="jasminePetalGrad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#FFFDF7" />
                    <stop offset="100%" stopColor="#ECD599" />
                  </linearGradient>
                </defs>
              </svg>
            ) : item.type === "sparkle" ? (
              // 4-Point Golden Star Sparkle
              <svg
                width={item.size * 0.8}
                height={item.size * 0.8}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gold-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            ) : (
              // Shimmering Golden Dust Particle
              <div
                className="rounded-full bg-gradient-to-tr from-gold-600 via-gold-champagne to-white shadow-gold-glow animate-pulse"
                style={{
                  width: `${Math.max(5, item.size / 2.5)}px`,
                  height: `${Math.max(5, item.size / 2.5)}px`,
                }}
              />
            )}
          </div>
        ))}

      <style jsx>{`
        @keyframes petalDrift {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(28vh) translateX(16px) rotate(45deg);
          }
          50% {
            transform: translateY(54vh) translateX(-16px) rotate(90deg);
          }
          75% {
            transform: translateY(80vh) translateX(14px) rotate(140deg);
          }
          100% {
            transform: translateY(112vh) translateX(-6px) rotate(190deg);
          }
        }
      `}</style>
    </div>
  );
};
