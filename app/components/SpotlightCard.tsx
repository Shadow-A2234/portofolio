"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpotlightCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Extra Tailwind classes for the outer wrapper */
  className?: string;
  /** Spotlight radius in px (default: 280) */
  spotlightRadius?: number;
  /** Spotlight color — any valid CSS color (default: cyan-400 tint) */
  spotlightColor?: string;
  /** Subtle tilt intensity 0–20 (default: 8) */
  tiltIntensity?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpotlightCard({
  children,
  className = "",
  spotlightRadius = 280,
  spotlightColor = "rgba(34, 211, 238, 0.13)", // cyan-400 @ ~13 %
  tiltIntensity = 8,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position (relative to card, 0–1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring for the spotlight blob
  const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
  const spotX = useSpring(mouseX, springConfig);
  const spotY = useSpring(mouseY, springConfig);

  // Tilt — maps 0–1 → -tilt…+tilt degrees
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [tiltIntensity, -tiltIntensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-tiltIntensity, tiltIntensity]),
    springConfig
  );

  // Opacity spring for spotlight reveal
  const spotOpacity = useSpring(0, { stiffness: 180, damping: 22 });

  // ── Event handlers ──────────────────────────────────────────────────────────

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    spotOpacity.set(1);
  }, [spotOpacity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    spotOpacity.set(0);
    // Gently reset position to centre
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [spotOpacity, mouseX, mouseY]);

  // ── Derived CSS background for the spotlight layer ─────────────────────────

  // We render the radial gradient position via a CSS custom property driven by
  // a motion div so the GPU handles the repaint — no JS style mutation per frame.

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={[
        // Base shell
        "relative isolate overflow-hidden rounded-2xl",
        // Border
        "border border-cyan-500/20",
        // Background: dark base + grid pattern via CSS
        "bg-[#0a0f1a]",
        // Smooth cursor
        "cursor-default",
        // Transition for border glow
        "transition-shadow duration-500",
        isHovered ? "shadow-[0_0_40px_rgba(34,211,238,0.08)]" : "shadow-none",
        className,
      ].join(" ")}
    >
      {/* ── Grid pattern layer ───────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Corner scan-line accent ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, transparent 50%)",
        }}
      />

      {/* ── Spotlight layer — rendered via motion.div with inline mask ─────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        style={{
          opacity: spotOpacity,
          background: useTransform(
            [spotX, spotY],
            ([x, y]: number[]) =>
              `radial-gradient(${spotlightRadius}px circle at ${x * 100}% ${
                y * 100
              }%, ${spotlightColor}, transparent 80%)`
          ),
        }}
      />

      {/* ── Card edge shimmer on hover ──────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: spotOpacity,
          background: useTransform(
            [spotX, spotY],
            ([x, y]: number[]) =>
              `radial-gradient(${spotlightRadius * 1.4}px circle at ${
                x * 100
              }% ${y * 100}%, rgba(34,211,238,0.05), transparent 70%)`
          ),
        }}
      />

      {/* ── Actual card content ────────────────────────────────────────────────── */}
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}
