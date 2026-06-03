"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Star,
  Users,
  Mic,
  Palette,
  Code,
  BookOpen,
  Music,
  Camera,
  Lightbulb,
  Globe,
  ChevronRight,
  Sparkles,
  Lock,
  Heart,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth, useAppNotification } from "@/app/hooks";
import {
  validateEmail,
  validatePassword,
  validateDisplayName,
} from "@/app/validators";
import type { TalentCategory } from "@/app/types";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Sparkles,
    title: "Your Talent Deserves a Stage",
    desc: "Join a community where your skills shine — singing, coding, debating, research, art, and more.",
    gradient: "from-purple-electric to-blue-neon",
    accent: "#7c3aed",
  },
  {
    icon: Shield,
    title: "Safe by Design",
    desc: "No private DMs. No trolls. AI-powered moderation keeps every interaction respectful and secure.",
    gradient: "from-green-safe to-blue-cyan",
    accent: "#10b981",
  },
  {
    icon: Lock,
    title: "Verified Identities Only",
    desc: "One person. One account. Face verification ensures a trusted community for everyone.",
    gradient: "from-blue-neon to-purple-glow",
    accent: "#3b82f6",
  },
  {
    icon: Star,
    title: "Rise Through the Stages",
    desc: "From Local to Global — compete, perform, and grow. Your talent unlocks bigger stages.",
    gradient: "from-gold-accent to-pink-glow",
    accent: "#f59e0b",
  },
];

const talentCategories: { icon: any; label: TalentCategory; color: string }[] =
  [
    { icon: Music, label: "Music", color: "#ec4899" },
    { icon: Code, label: "Coding", color: "#3b82f6" },
    { icon: Palette, label: "Art", color: "#f59e0b" },
    { icon: Mic, label: "Speaking", color: "#7c3aed" },
    { icon: Camera, label: "Film", color: "#06b6d4" },
    { icon: BookOpen, label: "Research", color: "#10b981" },
    { icon: Lightbulb, label: "Innovation", color: "#f472b6" },
    { icon: Users, label: "Debate", color: "#a855f7" },
    { icon: Heart, label: "Dance", color: "#ef4444" },
    { icon: Globe, label: "Language", color: "#22d3ee" },
  ];

const languages = [
  "English",
  "हिन्दी",
  "தமிழ்",
  "తెలుగు",
  "বাংলা",
  "मराठी",
  "ગુજરાતી",
  "ಕನ್ನಡ",
  "മലയാളം",
  "ਪੰਜਾਬੀ",
];

export default function OnboardingScreen({
  onComplete,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<TalentCategory[]>(
    []
  );
  const [selectedLang, setSelectedLang] = useState("English");

  // Sign up form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signup, isLoading: authLoading } = useAuth();
  const { error: showError, success } = useAppNotification();

  const totalSteps = slides.length + 3; // slides + signup + categories + language

  const toggleCategory = (label: TalentCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(label)
        ? prev.filter((c) => c !== label)
        : prev.length < 5
        ? [...prev, label]
        : prev
    );
  };

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) newErrors.email = emailVal.error || "";

    const passwordVal = validatePassword(password);
    if (!passwordVal.isValid) newErrors.password = passwordVal.error || "";

    const nameVal = validateDisplayName(displayName);
    if (!nameVal.isValid) newErrors.displayName = nameVal.error || "";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateSignupForm()) return;

    const result = await signup(email, password, displayName);
    if (result.success) {
      success("Account created! Proceeding to setup...");
      // Move to categories step
      setStep(slides.length + 1);
    } else {
      showError(result.error || "Signup failed");
    }
  };

  const nextStep = async () => {
    // Sign up step (step = slides.length)
    if (step === slides.length) {
      await handleSignup();
      return;
    }

    // Categories step (step = slides.length + 1)
    if (step === slides.length + 1) {
      if (selectedCategories.length === 0) {
        showError("Please select at least one talent category");
        return;
      }
      setStep(step + 1);
      return;
    }

    // Language step (step = slides.length + 2)
    if (step === slides.length + 2) {
      success("Setup complete!");
      // Brief pause then complete
      setTimeout(onComplete, 300);
      return;
    }

    // Regular slides
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const isSlide = step < slides.length;
  const isSignup = step === slides.length;
  const isCategories = step === slides.length + 1;
  const isLanguage = step === slides.length + 2;

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-bg-primary">
      {/* Background glow */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      {/* Progress bar */}
      <div className="relative z-10 flex gap-1.5 px-6 pt-14 pb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full bg-bg-card overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full rounded-full gradient-purple-blue"
            />
          </div>
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-14 right-6 z-20 text-text-muted text-sm hover:text-text-secondary transition-colors"
      >
        Skip
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          {isSlide && (
            <motion.div
              key={`slide-${step}`}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              {/* Floating icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8"
              >
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[step].gradient} flex items-center justify-center`}
                  style={{
                    boxShadow: `0 0 40px ${slides[step].accent}40, 0 0 80px ${slides[step].accent}20`,
                  }}
                >
                  {(() => {
                    const Icon = slides[step].icon;
                    return <Icon className="w-14 h-14 text-white" />;
                  })()}
                </div>
              </motion.div>

              {/* Decorative dots */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 3) * 10}%`,
                    background: slides[step].accent,
                  }}
                />
              ))}

              <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4 leading-tight">
                {slides[step].title}
              </h2>
              <p className="text-text-secondary text-base leading-relaxed max-w-xs">
                {slides[step].desc}
              </p>
            </motion.div>
          )}

          {isSignup && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center w-full"
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2 text-center">
                Create Account
              </h2>
              <p className="text-text-secondary text-sm mb-8 text-center">
                Join the talent community
              </p>

              <div className="space-y-4 w-full max-w-sm">
                <Input
                  label="Display Name"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    if (errors.displayName)
                      setErrors({ ...errors, displayName: "" });
                  }}
                  error={errors.displayName}
                  placeholder="Your name"
                  fullWidth
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  error={errors.email}
                  placeholder="you@example.com"
                  fullWidth
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors({ ...errors, password: "" });
                  }}
                  error={errors.password}
                  placeholder="At least 8 characters"
                  helpText="8+ chars, 1 uppercase, 1 number"
                  fullWidth
                />

                {Object.keys(errors).length > 0 && (
                  <div className="flex gap-2 p-3 rounded-lg bg-red-danger/10 border border-red-danger/30">
                    <AlertCircle className="w-4 h-4 text-red-danger flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-danger">
                      Please fix errors above
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {isCategories && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2 text-center">
                What&apos;s Your Talent?
              </h2>
              <p className="text-text-secondary text-sm mb-8 text-center">
                Select up to 5 interests
              </p>

              <div className="flex flex-wrap gap-3 justify-center max-w-sm">
                {talentCategories.map((cat, i) => {
                  const isSelected = selectedCategories.includes(cat.label);
                  return (
                    <motion.button
                      key={cat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCategory(cat.label)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isSelected
                          ? "text-white"
                          : "glass text-text-secondary hover:text-text-primary"
                      }`}
                      style={
                        isSelected
                          ? {
                              background: `${cat.color}30`,
                              border: `1px solid ${cat.color}60`,
                              boxShadow: `0 0 15px ${cat.color}30`,
                            }
                          : {}
                      }
                    >
                      <cat.icon
                        className="w-4 h-4"
                        style={isSelected ? { color: cat.color } : {}}
                      />
                      {cat.label}
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-text-muted text-xs mt-6">
                {selectedCategories.length}/5 selected
              </p>
            </motion.div>
          )}

          {isLanguage && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <Globe className="w-12 h-12 text-blue-cyan mb-4" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2 text-center">
                Choose Language
              </h2>
              <p className="text-text-secondary text-sm mb-8 text-center">
                Select your preferred language
              </p>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {languages.map((lang, i) => (
                  <motion.button
                    key={lang}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLang(lang)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedLang === lang
                        ? "gradient-purple-blue text-white glow-purple"
                        : "glass text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {lang}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-12">
        <Button
          onClick={nextStep}
          fullWidth
          size="lg"
          isLoading={authLoading && isSignup}
          disabled={isSignup && authLoading}
        >
          {isSignup ? (
            <>Create Account</>
          ) : step === totalSteps - 1 ? (
            <>
              Finish Setup
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
