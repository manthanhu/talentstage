"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden bg-bg-primary">
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            opacity: [0, 0.4, 0.2, 0.5, 0.3],
            scale: [1, 1.2, 1, 1.1, 1],
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            opacity: [0, 0.3, 0.15, 0.35],
            x: ["-50%", "-45%", "-55%", "-50%"],
          }}
          transition={{ duration: 5, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Stage spotlight beams */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={
              phase >= 1
                ? {
                    opacity: [0, 0.15, 0.05, 0.12],
                    scaleY: [0, 1, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              delay: i * 0.15,
              ease: "easeOut",
            }}
            className="absolute bottom-0 origin-bottom"
            style={{
              left: `${15 + i * 17}%`,
              width: "3px",
              height: "100%",
              background: `linear-gradient(to top, rgba(124,58,237,0.3), transparent)`,
              filter: "blur(8px)",
              transform: `rotate(${(i - 2) * 8}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          initial={{ opacity: 0, y: 100 }}
          animate={
            phase >= 1
              ? {
                  opacity: [0, 0.6, 0],
                  y: [100, -200],
                  x: [0, (Math.random() - 0.5) * 100],
                }
              : {}
          }
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "10%",
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background:
              i % 3 === 0
                ? "#7c3aed"
                : i % 3 === 1
                ? "#3b82f6"
                : "#f472b6",
          }}
        />
      ))}

      {/* Main Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Icon - Stage/Spotlight */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={phase >= 0 ? { scale: 1, rotate: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl gradient-purple-blue flex items-center justify-center relative overflow-hidden glow-purple">
            {/* Stage icon */}
            <svg
              viewBox="0 0 48 48"
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Spotlight beam */}
              <path d="M24 4 L16 20 L32 20 Z" fill="currentColor" opacity="0.3" />
              <path d="M24 4 L24 20" strokeWidth="1.5" />
              {/* Stage platform */}
              <rect x="8" y="30" width="32" height="4" rx="2" fill="currentColor" />
              {/* Star */}
              <path
                d="M24 22 L25.5 26 L30 26 L26.5 28.5 L28 33 L24 30.5 L20 33 L21.5 28.5 L18 26 L22.5 26 Z"
                fill="currentColor"
              />
            </svg>
            {/* Shine overlay */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>
          {/* Glow ring */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl border-2 border-purple-electric/30"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-2"
        >
          <span className="gradient-purple-blue gradient-text">Talent</span>
          <span className="text-text-primary">Stage</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-text-secondary text-sm tracking-widest uppercase"
        >
          Where Talent Gets Its Stage
        </motion.p>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-10 w-48 h-1 bg-bg-card rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={phase >= 2 ? { width: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full rounded-full gradient-purple-blue"
          />
        </motion.div>
      </div>

      {/* Bottom safe indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 flex items-center gap-2 text-text-muted text-xs"
      >
        <div className="w-2 h-2 rounded-full bg-green-safe animate-pulse" />
        <span>Safe & Verified Platform</span>
      </motion.div>
    </div>
  );
}
