"use client";

import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Lock,
  Flag,
  Ban,
  Info,
  Heart,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface SafetyScreenProps {
  navigateTo: (screen: Screen) => void;
}

const safetyMetrics = [
  { label: "Community Trust Score", value: "98%", color: "#10b981", icon: Shield },
  { label: "AI Moderation Active", value: "24/7", color: "#3b82f6", icon: Eye },
  { label: "Safe Interactions", value: "99.2%", color: "#06b6d4", icon: Heart },
];

const strikes = [
  {
    type: "warning",
    title: "Community Guideline Reminder",
    desc: "Your comment on \"Code Warriors\" was flagged for inappropriate language. Please review our community guidelines.",
    time: "2 days ago",
    status: "acknowledged",
  },
];

const moderationFeatures = [
  {
    icon: Eye,
    title: "AI Content Scanning",
    desc: "Every post is scanned for harmful content, PII exposure, and copyright violations before publishing.",
    color: "#3b82f6",
  },
  {
    icon: Lock,
    title: "PII Protection",
    desc: "Personal information like phone numbers, addresses, and IDs are automatically detected and blocked.",
    color: "#7c3aed",
  },
  {
    icon: Ban,
    title: "No Private DMs",
    desc: "All interactions happen in public communities. No private messaging prevents harassment and predatory behavior.",
    color: "#ec4899",
  },
  {
    icon: Shield,
    title: "Verified Identities",
    desc: "Every user is face-verified. One person, one account. No anonymous trolling.",
    color: "#10b981",
  },
  {
    icon: Flag,
    title: "Community Reporting",
    desc: "Report inappropriate content or behavior. Our AI + human moderation team reviews within 2 hours.",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Real-time Detection",
    desc: "Live voice rooms and discussions are monitored in real-time for safety violations.",
    color: "#06b6d4",
  },
];

export default function SafetyScreen({ navigateTo }: SafetyScreenProps) {
  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-safe/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-safe" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Safety Center
            </h1>
            <p className="text-text-muted text-xs">
              Your safety is our priority
            </p>
          </div>
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-safe" />
            <span className="text-sm font-semibold text-green-safe">
              Your account is safe & secure
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {safetyMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${metric.color}15` }}
                >
                  <metric.icon
                    className="w-5 h-5"
                    style={{ color: metric.color }}
                  />
                </div>
                <div
                  className="text-lg font-bold font-[family-name:var(--font-display)]"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="text-[9px] text-text-muted leading-tight">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Strike History */}
      <div className="px-5 mb-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gold-accent" />
          Moderation History
        </h3>
        {strikes.length > 0 ? (
          strikes.map((strike, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-4 border-l-4"
              style={{
                borderLeftColor:
                  strike.type === "warning" ? "#f59e0b" : "#ef4444",
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{
                    color:
                      strike.type === "warning" ? "#f59e0b" : "#ef4444",
                  }}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{strike.title}</h4>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    {strike.desc}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-text-muted">
                      {strike.time}
                    </span>
                    <span className="text-[10px] text-green-safe flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Acknowledged
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="glass rounded-xl p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-safe mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              No strikes — you&apos;re a model community member!
            </p>
          </div>
        )}
      </div>

      {/* How We Protect You */}
      <div className="px-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-glow" />
          How We Protect You
        </h3>
        <div className="flex flex-col gap-3">
          {moderationFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="glass rounded-xl p-4 flex items-start gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${feature.color}15` }}
              >
                <feature.icon
                  className="w-5 h-5"
                  style={{ color: feature.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{feature.title}</h4>
                <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Report Section */}
      <div className="px-5 mt-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 border border-red-danger/10 hover:bg-white/5 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-danger/10 flex items-center justify-center shrink-0">
            <Flag className="w-5 h-5 text-red-danger" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-sm font-medium">Report a Problem</h4>
            <p className="text-[11px] text-text-muted">
              See something wrong? Let us know immediately.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors" />
        </motion.button>
      </div>

      {/* Community Guidelines */}
      <div className="px-5 mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="glass rounded-xl p-4 border border-blue-neon/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-blue-neon" />
            <span className="text-xs font-medium text-blue-neon">
              Community Guidelines
            </span>
          </div>
          <ul className="text-[11px] text-text-muted space-y-1.5">
            <li className="flex items-start gap-2">
              <XCircle className="w-3 h-3 text-red-danger mt-0.5 shrink-0" />
              No harassment, bullying, or hate speech
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-3 h-3 text-red-danger mt-0.5 shrink-0" />
              No sharing of personal information
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-3 h-3 text-red-danger mt-0.5 shrink-0" />
              No explicit or inappropriate content
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-safe mt-0.5 shrink-0" />
              Be respectful and constructive
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-safe mt-0.5 shrink-0" />
              Support and uplift fellow creators
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
