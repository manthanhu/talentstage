"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Music,
  FileText,
  Image,
  Upload,
  X,
  Hash,
  Sparkles,
  Shield,
  CheckCircle2,
  ChevronRight,
  Wand2,
  Eye,
  Tag,
} from "lucide-react";
import type { Screen } from "@/app/page";

interface CreateScreenProps {
  navigateTo: (screen: Screen) => void;
}

const mediaTypes = [
  { icon: Video, label: "Video", desc: "Performance, tutorial, vlog", color: "#ec4899", gradient: "from-pink-glow/20 to-purple-electric/20" },
  { icon: Music, label: "Audio", desc: "Music, podcast, voice", color: "#06b6d4", gradient: "from-cyan-live/20 to-blue-neon/20" },
  { icon: FileText, label: "Research", desc: "Paper, article, project", color: "#10b981", gradient: "from-green-safe/20 to-blue-neon/20" },
  { icon: Image, label: "Image", desc: "Art, photography, design", color: "#f59e0b", gradient: "from-gold-accent/20 to-pink-glow/20" },
];

const suggestedTags = [
  "Music", "Classical", "Performance", "Tutorial", "Research",
  "Coding", "Art", "Dance", "Debate", "Film",
];

export default function CreateScreen({ navigateTo }: CreateScreenProps) {
  const [step, setStep] = useState<"select" | "upload" | "details" | "review">("select");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Music", "Classical"]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setStep("upload");
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setStep("details");
          return 100;
        }
        return p + 3;
      });
    }, 80);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-purple-blue flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Create
            </h1>
            <p className="text-text-muted text-xs">
              Share your talent with the world
            </p>
          </div>
        </div>
        {step !== "select" && (
          <button
            onClick={() => setStep("select")}
            className="p-2 glass rounded-xl"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Step indicator */}
      {step !== "select" && (
        <div className="px-5 mb-4">
          <div className="flex gap-1.5">
            {["upload", "details", "review"].map((s, i) => (
              <div key={s} className="h-1 flex-1 rounded-full bg-bg-card overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: (["upload", "details", "review"].indexOf(step) >= i) ? "100%" : "0%",
                  }}
                  className="h-full rounded-full gradient-purple-blue"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Select media type */}
        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-5"
          >
            <p className="text-sm text-text-secondary mb-4">
              What would you like to share?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {mediaTypes.map((type, i) => (
                <motion.button
                  key={type.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectType(type.label)}
                  className={`bg-gradient-to-br ${type.gradient} glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center group`}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${type.color}20` }}
                  >
                    <type.icon className="w-7 h-7" style={{ color: type.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{type.label}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">
                      {type.desc}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* AI moderation note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass rounded-xl p-3 flex items-center gap-3 border border-green-safe/10"
            >
              <Shield className="w-5 h-5 text-green-safe shrink-0" />
              <p className="text-[11px] text-text-muted">
                All content is reviewed by AI moderation before publishing to
                ensure community safety.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Upload */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-5"
          >
            <div className="glass rounded-2xl p-8 flex flex-col items-center text-center border border-dashed border-border-glow">
              {!isUploading ? (
                <>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className="w-12 h-12 text-purple-glow mb-4" />
                  </motion.div>
                  <h3 className="text-base font-semibold mb-1">
                    Upload Your {selectedType}
                  </h3>
                  <p className="text-xs text-text-muted mb-6">
                    Drag & drop or tap to browse your files
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={simulateUpload}
                    className="px-8 py-3 rounded-xl gradient-purple-blue text-white text-sm font-semibold glow-purple"
                  >
                    Choose File
                  </motion.button>
                  <p className="text-[10px] text-text-muted mt-4">
                    Max size: 500MB · Supported: MP4, MP3, PDF, JPG, PNG
                  </p>
                </>
              ) : (
                <>
                  <div className="w-full mb-4">
                    <div className="flex justify-between text-xs text-text-muted mb-2">
                      <span>Uploading {selectedType?.toLowerCase()}...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-3 bg-bg-card rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full gradient-purple-blue"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Please wait while we upload your content...
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Details */}
        {step === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-5"
          >
            {/* Upload success */}
            <div className="flex items-center gap-2 mb-4 glass rounded-xl p-3">
              <CheckCircle2 className="w-5 h-5 text-green-safe" />
              <span className="text-sm text-green-safe font-medium">
                {selectedType} uploaded successfully
              </span>
            </div>

            {/* Title input */}
            <div className="mb-4">
              <label className="text-xs font-medium text-text-secondary mb-2 block">
                Title
              </label>
              <input
                type="text"
                placeholder="Give your creation a title..."
                className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border-none outline-none placeholder:text-text-muted focus:ring-1 focus:ring-purple-electric/30 transition-all"
                defaultValue="Raag Yaman — Evening Performance"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-xs font-medium text-text-secondary mb-2 block">
                Description
              </label>
              <textarea
                placeholder="Tell the community about this..."
                rows={3}
                className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border-none outline-none placeholder:text-text-muted resize-none focus:ring-1 focus:ring-purple-electric/30 transition-all"
                defaultValue="My rendition of Raag Yaman performed at the inter-college music competition 🎶"
              />
            </div>

            {/* AI caption suggestion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-3 mb-4 border border-purple-electric/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-purple-glow" />
                <span className="text-xs font-medium text-purple-glow">
                  AI-Generated Caption
                </span>
              </div>
              <p className="text-[11px] text-text-secondary italic">
                &quot;A soulful interpretation of Raag Yaman showcasing melodic
                precision and emotional depth. Perfect for evening listening.&quot;
              </p>
              <button className="text-[10px] text-purple-glow mt-2 font-medium">
                Use this caption →
              </button>
            </motion.div>

            {/* Tags */}
            <div className="mb-4">
              <label className="text-xs font-medium text-text-secondary mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Category Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all duration-300 ${
                        isSelected
                          ? "gradient-purple-blue text-white"
                          : "glass text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      <Hash className="w-3 h-3" />
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("review")}
              className="w-full py-3.5 rounded-xl gradient-purple-blue text-white font-semibold text-sm flex items-center justify-center gap-2 glow-purple mt-4"
            >
              Preview & Publish
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-5"
          >
            {/* AI Moderation Preview */}
            <div className="glass rounded-2xl p-4 mb-4 border border-green-safe/20">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-green-safe" />
                <h3 className="text-sm font-semibold">AI Moderation Check</h3>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Content Safety", status: "Passed", color: "#10b981" },
                  { label: "PII Detection", status: "No issues", color: "#10b981" },
                  { label: "Copyright Check", status: "Original", color: "#10b981" },
                  { label: "Community Guidelines", status: "Compliant", color: "#10b981" },
                ].map((check) => (
                  <div
                    key={check.label}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-bg-card/50"
                  >
                    <span className="text-xs text-text-secondary">
                      {check.label}
                    </span>
                    <span
                      className="text-xs font-medium flex items-center gap-1"
                      style={{ color: check.color }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div className="glass rounded-2xl overflow-hidden mb-4">
              <div className="aspect-video bg-gradient-to-br from-purple-electric/20 to-pink-glow/20 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">
                  Raag Yaman — Evening Performance
                </h3>
                <p className="text-[11px] text-text-muted mt-1">
                  My rendition of Raag Yaman performed at the inter-college
                  music competition 🎶
                </p>
                <div className="flex gap-1.5 mt-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-purple-electric/10 text-purple-glow"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Publish */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 py-3.5 rounded-xl glass text-text-secondary font-semibold text-sm"
              >
                Edit
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("feed")}
                className="flex-[2] py-3.5 rounded-xl gradient-purple-blue text-white font-semibold text-sm flex items-center justify-center gap-2 glow-purple"
              >
                <Sparkles className="w-4 h-4" />
                Publish to Stage
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
