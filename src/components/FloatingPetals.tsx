"use client";

import React, { useEffect, useState } from "react";

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  type: "petal" | "goldDust";
}

export const FloatingPetals: React.FC = () => {
  const [items, setItems] = useState<PetalItem[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    // Generate floating elements
    const generated: PetalItem[] = [];
    const count = 18; // Keep modest for high mobile performance

    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        left: Math.random() * 96 + 2, // 2% to 98%
        size: Math.random() * 12 + 10, // 10px to 22px
        duration: Math.random() * 8 + 12, // 12s to 20s
        delay: Math.random() * 10,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.4 + 0.25,
        type: i % 3 === 0 ? "goldDust" : "petal",
      });
    }

    setItems(generated);
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute will-change-transform"
          style={{
            left: `${item.left}%`,
            top: "-40px",
            animation: `petalFall ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {item.type === "petal" ? (
            // Delicate white jasmine/rose petal with gold tint
            <svg
              width={item.size}
              height={item.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              style={{
                transform: `rotate(${item.rotation}deg)`,
                filter: "drop-shadow(0 2px 4px rgba(212,175,55,0.15))",
              }}
            >
              <path
                d="M12 0 C2 8 0 20 12 32 C24 20 22 8 12 0 Z"
                fill="url(#petalGradient)"
              />
              <defs>
                <linearGradient
                  id="petalGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FAF4E8" />
                  <stop offset="100%" stopColor="#EAD8AA" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            // Shimmering gold sparkle dust
            <div
              className="rounded-full bg-gradient-to-tr from-gold-600 via-gold-champagne to-white shadow-gold"
              style={{
                width: `${Math.max(4, item.size / 3)}px`,
                height: `${Math.max(4, item.size / 3)}px`,
              }}
            />
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(25vh) translateX(15px) rotate(45deg);
          }
          50% {
            transform: translateY(50vh) translateX(-15px) rotate(90deg);
          }
          75% {
            transform: translateY(75vh) translateX(15px) rotate(135deg);
          }
          100% {
            transform: translateY(105vh) translateX(-5px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};
