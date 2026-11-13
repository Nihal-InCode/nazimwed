"use client";

import React from "react";
import { motion } from "framer-motion";

// 8-Fold Islamic Star Geometric Jaali Pattern (Vector SVG)
export const IslamicStarPattern: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = "", opacity = 0.07 }) => {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="islamic-geom-star"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Central 8-pointed star */}
          <path
            d="M 40 10 L 48 24 L 64 24 L 52 34 L 57 50 L 40 40 L 23 50 L 28 34 L 16 24 L 32 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Outer intersecting geometric lines */}
          <path
            d="M 0 0 L 80 80 M 80 0 L 0 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2,2"
          />
          <path
            d="M 40 0 L 40 80 M 0 40 L 80 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Corner star quarters */}
          <circle
            cx="40"
            cy="40"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="80"
            cy="0"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="0"
            cy="80"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="80"
            cy="80"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-geom-star)" />
    </svg>
  );
};

// Luxury Gold Flourish Divider with Animated Wings & Shimmer
export const GoldFlourishDivider: React.FC<{
  className?: string;
  centerIcon?: "star" | "moon";
}> = ({
  className = "",
  centerIcon = "star",
}) => {
  return (
    <div
      className={`flex items-center justify-center space-x-3 text-gold-500 overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold-500 to-gold-600"
      />
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <svg
          className="h-6 w-6 text-gold-500 drop-shadow-[0_1px_6px_rgba(212,175,55,0.4)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {centerIcon === "moon" ? (
            <path d="M20.6 15.79A9 9 0 0 1 8.21 3.4A9 9 0 1 0 20.6 15.79Z" />
          ) : (
            <path d="M12 2L13.8 8.2L20.2 10L14.8 13.5L16.5 19.8L12 16.2L7.5 19.8L9.2 13.5L3.8 10L10.2 8.2L12 2Z" />
          )}
        </svg>
        <span className="absolute h-2 w-2 rounded-full bg-gold-400/40 animate-ping" />
      </motion.div>
      <div className="h-1.5 w-1.5 rotate-45 bg-gold-600" />
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-gold-500 to-gold-600"
      />
    </div>
  );
};

// Intricate Gold Corner Ornament with Entrance Fade
export const CornerOrnament: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
}> = ({ position, size = 48 }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scaleX(-1)";
      case "bottom-left":
        return "scaleY(-1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  const getPosClasses = () => {
    switch (position) {
      case "top-left":
        return "top-2 left-2";
      case "top-right":
        return "top-2 right-2";
      case "bottom-left":
        return "bottom-2 left-2";
      case "bottom-right":
        return "bottom-2 right-2";
    }
  };

  return (
    <div
      className={`pointer-events-none absolute ${getPosClasses()} text-gold-500/80 transition-opacity duration-700`}
      style={{ transform: getTransform() }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2 H 45 C 30 2 2 30 2 45 V 2 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M8 8 H 32 C 22 8 8 22 8 32 V 8 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2,2"
          fill="none"
        />
        <circle cx="6" cy="6" r="2.5" fill="currentColor" />
        <circle cx="20" cy="6" r="1.5" fill="currentColor" />
        <circle cx="6" cy="20" r="1.5" fill="currentColor" />
        <path
          d="M12 12 Q 22 16 16 22 Q 16 12 12 12 Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

// Islamic Arch (Mihrab) Frame Silhouette
export const MihrabFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative rounded-t-[140px] md:rounded-t-[200px] border border-gold-500/35 p-6 sm:p-8 md:p-14 shadow-luxury bg-ivory-50/95 backdrop-blur-md transition-all duration-500 hover:shadow-luxury-lg ${className}`}
    >
      {/* Decorative inner arch border with smooth dashed line */}
      <div className="pointer-events-none absolute inset-2 md:inset-4 rounded-t-[130px] md:rounded-t-[185px] border border-gold-500/25" />
      <div className="pointer-events-none absolute inset-3 md:inset-6 rounded-t-[120px] md:rounded-t-[170px] border border-dashed border-gold-500/20" />
      {children}
    </div>
  );
};
