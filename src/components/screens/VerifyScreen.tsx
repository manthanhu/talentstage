"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, CheckCircle2, Scan, Eye, Fingerprint } from "lucide-react";

interface VerifyScreenProps {
  onComplete: () => void;
}

type VerifyPhase = "intro" | "scanning" | "processing" | "success";

export default function VerifyScreen({ onComplete }: VerifyScreenProps) {
  const [phase, setPhase] = useState<VerifyPhase>("intro");
  const [scanProgress, setScanProgress] = useState(0);

  const startVerification = () => {
    setPhase("scanning");
  };

  useEffect(() => {
    if (phase === "scanning") {
      const interval = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setPhase("processing");
            return 100;
          }
          return p + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "processing") {
      const t = setTimeout(() => setPhase("success"), 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "success") {
      const t = setTimeout(() => onComplete(), 2000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <div className="min-h-dvh flex flex-col items-center relative overflow-hidden bg-bg-primary">
      {/* Background mesh */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 w-full px-6 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-neon/10 flex items-center justify-center">
            <Fingerprint className="w-5 h-5 text-blue-neon" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Identity Verification
            </h1>
            <p className="text-text-muted text-xs">
              One person. One account.
            </p>
          </div>
        </div>
      </div>

      {/* Main verification area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 w-full">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              {/* Camera frame preview */}
              <div className="relative w-56 h-56 mb-8">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-neon/20" />
                <div className="absolute inset-2 rounded-full border border-blue-neon/10" />

                {/* Inner camera area */}
                <div className="absolute inset-4 rounded-full bg-bg-card/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  {/* Face outline */}
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-text-muted/30">
                    <ellipse cx="50" cy="45" rx="25" ry="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4" />
                    <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.3" />
                    <circle cx="60" cy="40" r="3" fill="currentColor" opacity="0.3" />
                    <path d="M42 55 Q50 62 58 55" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                  </svg>
                </div>

                {/* Corner brackets */}
                {[
                  "top-6 left-6",
                  "top-6 right-6",
                  "bottom-6 left-6",
                  "bottom-6 right-6",
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className={`absolute ${pos} w-6 h-6`}
                  >
                    <div
                      className={`w-full h-full ${
                        i < 2 ? "border-t-2" : "border-b-2"
                      } ${
                        i % 2 === 0 ? "border-l-2" : "border-r-2"
                      } border-blue-neon/60 ${
                        i === 0
                          ? "rounded-tl-lg"
                          : i === 1
                          ? "rounded-tr-lg"
                          : i === 2
                          ? "rounded-bl-lg"
                          : "rounded-br-lg"
                      }`}
                    />
                  </motion.div>
                ))}

                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-blue-neon/30"
                />
              </div>

              <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3">
                Align Your Face
              </h2>
              <p className="text-text-secondary text-sm mb-2 max-w-xs">
                Position your face within the circle. We&apos;ll verify your identity
                to keep the community safe.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
                {[
                  {
                    icon: Lock,
                    text: "Your face data is encrypted end-to-end",
                    color: "text-green-safe",
                  },
                  {
                    icon: Eye,
                    text: "Never shared with third parties",
                    color: "text-blue-neon",
                  },
                  {
                    icon: Shield,
                    text: "Deleted after verification",
                    color: "text-purple-glow",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-3 glass rounded-xl px-4 py-3"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                    <span className="text-text-secondary text-xs">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startVerification}
                className="mt-8 w-full max-w-xs py-4 rounded-2xl gradient-purple-blue text-white font-semibold flex items-center justify-center gap-2 glow-purple"
              >
                <Scan className="w-5 h-5" />
                Begin Verification
              </motion.button>
            </motion.div>
          )}

          {phase === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              {/* Scanning animation */}
              <div className="relative w-56 h-56 mb-8">
                {/* Rotating scanner ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, rgba(59,130,246,0.6), transparent)`,
                    mask: "radial-gradient(circle, transparent 65%, black 66%, black 100%)",
                    WebkitMask: "radial-gradient(circle, transparent 65%, black 66%, black 100%)",
                  }}
                />

                {/* Static ring */}
                <div className="absolute inset-2 rounded-full border border-blue-neon/30" />

                {/* Inner face area */}
                <div className="absolute inset-4 rounded-full bg-bg-card/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  {/* Scan line */}
                  <motion.div
                    animate={{ y: [-60, 60, -60] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-neon to-transparent"
                  />
                  {/* Face outline */}
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-neon/40">
                    <ellipse cx="50" cy="45" rx="25" ry="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="40" cy="40" r="3" fill="currentColor" />
                    <circle cx="60" cy="40" r="3" fill="currentColor" />
                    <path d="M42 55 Q50 62 58 55" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Pulse rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="absolute inset-0 rounded-full border border-blue-neon/30"
                  />
                ))}
              </div>

              <h2 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">
                Scanning...
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Hold still, verifying your identity
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-text-muted mb-2">
                  <span>Verifying</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="h-2 bg-bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full gradient-blue-cyan"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-2 border-transparent border-t-blue-neon border-r-purple-glow mb-6"
              />
              <h2 className="text-lg font-semibold">Processing verification...</h2>
              <p className="text-text-muted text-sm mt-2">
                Ensuring one person, one account
              </p>
            </motion.div>
          )}

          {phase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-24 h-24 rounded-full bg-green-safe/20 flex items-center justify-center mb-6"
                style={{
                  boxShadow: "0 0 40px rgba(16,185,129,0.3)",
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-green-safe" />
              </motion.div>

              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2">
                Verified!
              </h2>
              <p className="text-text-secondary text-sm mb-2">
                Welcome to TalentStage
              </p>
              <div className="flex items-center gap-2 text-green-safe text-xs">
                <Shield className="w-4 h-4" />
                <span>Your identity is now verified</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
