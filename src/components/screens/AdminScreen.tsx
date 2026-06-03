"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  Eye,
  Flag,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  BarChart3,
  Zap,
  Globe,
  Star,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface AdminScreenProps {
  navigateTo: (screen: Screen) => void;
}

const statsCards = [
  { label: "Total Users", value: "124,847", change: "+12.4%", up: true, icon: Users, color: "#3b82f6" },
  { label: "Active Creators", value: "18,293", change: "+8.7%", up: true, icon: Star, color: "#a855f7" },
  { label: "Content Today", value: "4,521", change: "+15.2%", up: true, icon: Activity, color: "#10b981" },
  { label: "Moderation Queue", value: "23", change: "-42%", up: false, icon: Shield, color: "#f59e0b" },
];

const moderationQueue = [
  {
    id: 1,
    type: "Video",
    creator: "User_38291",
    reason: "Potential PII in video",
    confidence: 87,
    time: "2m ago",
    severity: "medium",
  },
  {
    id: 2,
    type: "Comment",
    creator: "User_72841",
    reason: "Flagged language",
    confidence: 94,
    time: "5m ago",
    severity: "high",
  },
  {
    id: 3,
    type: "Image",
    creator: "User_19283",
    reason: "Copyright detection",
    confidence: 72,
    time: "8m ago",
    severity: "low",
  },
  {
    id: 4,
    type: "Audio",
    creator: "User_56472",
    reason: "Hate speech detected",
    confidence: 96,
    time: "12m ago",
    severity: "critical",
  },
  {
    id: 5,
    type: "Post",
    creator: "User_83921",
    reason: "Spam behavior pattern",
    confidence: 81,
    time: "15m ago",
    severity: "medium",
  },
];

const chartData = [65, 42, 78, 56, 89, 45, 72, 88, 55, 91, 67, 83];
const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const communityHealth = [
  { metric: "Positive Interactions", value: 94, color: "#10b981" },
  { metric: "Content Quality", value: 87, color: "#3b82f6" },
  { metric: "User Retention", value: 79, color: "#a855f7" },
  { metric: "Safety Compliance", value: 98, color: "#06b6d4" },
];

const activeStages = [
  { name: "Music Championship", stage: "National", participants: 320, status: "Semi-Finals", color: "#ec4899" },
  { name: "Code Sprint", stage: "State", participants: 856, status: "Qualifying", color: "#3b82f6" },
  { name: "Art Exhibition", stage: "Local", participants: 2400, status: "Submissions", color: "#f59e0b" },
  { name: "Debate League", stage: "National", participants: 180, status: "Quarter-Finals", color: "#a855f7" },
];

const recentActivity = [
  { action: "User verified", detail: "New face verification completed", time: "Just now", icon: CheckCircle2, color: "#10b981" },
  { action: "Content flagged", detail: "AI detected potential violation", time: "2m ago", icon: Flag, color: "#f59e0b" },
  { action: "Community created", detail: "Tamil Writers Circle — 45 members", time: "5m ago", icon: Users, color: "#3b82f6" },
  { action: "Stage promoted", detail: "Priya M. advanced to National Stage", time: "8m ago", icon: Star, color: "#a855f7" },
  { action: "Report resolved", detail: "Harassment report — action taken", time: "12m ago", icon: Shield, color: "#06b6d4" },
];

export default function AdminScreen({ navigateTo }: AdminScreenProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    chartData.map(() => 0)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(chartData);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-bg-primary pb-8 max-w-full">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo("feed")}
            className="p-2 glass rounded-xl"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-purple-electric/10 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-purple-glow" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Admin Dashboard
            </h1>
            <p className="text-text-muted text-xs">
              Platform overview & moderation
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-safe"
          />
          <span className="text-[10px] text-green-safe font-medium">
            All Systems Active
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {statsCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <span
                  className={`text-[10px] font-medium flex items-center gap-0.5 ${
                    stat.up ? "text-green-safe" : "text-blue-neon"
                  }`}
                >
                  {stat.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="text-xl font-bold font-[family-name:var(--font-display)]">
                {stat.value}
              </div>
              <div className="text-[10px] text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* User Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 mb-4"
      >
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-glow" />
              Creator Growth
            </h3>
            <span className="text-[10px] text-text-muted">Last 12 months</span>
          </div>
          <div className="flex items-end gap-1.5 h-32">
            {chartData.map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(animatedValues[i] / 100) * 100}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className="w-full rounded-t-md min-h-[4px]"
                  style={{
                    background: `linear-gradient(to top, ${
                      value > 80
                        ? "#10b981"
                        : value > 60
                        ? "#3b82f6"
                        : value > 40
                        ? "#a855f7"
                        : "#f59e0b"
                    }80, ${
                      value > 80
                        ? "#10b981"
                        : value > 60
                        ? "#3b82f6"
                        : value > 40
                        ? "#a855f7"
                        : "#f59e0b"
                    }30)`,
                  }}
                />
                <span className="text-[8px] text-text-muted">
                  {chartLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Moderation Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5 mb-4"
      >
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4 text-gold-accent" />
              Live Moderation Queue
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-accent/10 text-gold-accent font-medium">
              {moderationQueue.length} pending
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {moderationQueue.map((item, i) => {
              const severityColors: Record<string, string> = {
                low: "#3b82f6",
                medium: "#f59e0b",
                high: "#ef4444",
                critical: "#dc2626",
              };
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-bg-card/50 hover:bg-bg-card transition-colors"
                >
                  <div
                    className="w-2 h-8 rounded-full shrink-0"
                    style={{
                      background: severityColors[item.severity],
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{item.reason}</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${severityColors[item.severity]}15`,
                          color: severityColors[item.severity],
                        }}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-muted">
                      <span>{item.type}</span>
                      <span>·</span>
                      <span>{item.creator}</span>
                      <span>·</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className="text-xs font-bold"
                      style={{
                        color:
                          item.confidence > 90
                            ? "#ef4444"
                            : item.confidence > 80
                            ? "#f59e0b"
                            : "#3b82f6",
                      }}
                    >
                      {item.confidence}%
                    </div>
                    <div className="text-[9px] text-text-muted">
                      AI conf.
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg bg-green-safe/10 hover:bg-green-safe/20 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-safe" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-danger/10 hover:bg-red-danger/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5 text-red-danger" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Community Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 mb-4"
      >
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-safe" />
            Community Health
          </h3>
          <div className="flex flex-col gap-3">
            {communityHealth.map((item, i) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-secondary">
                    {item.metric}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 bg-bg-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.7 + i * 0.1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Active Stages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mb-4"
      >
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-neon" />
            Active Stages
          </h3>
          <div className="flex flex-col gap-2">
            {activeStages.map((stage, i) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.06 }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-bg-card/50"
              >
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: stage.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium">{stage.name}</span>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-muted">
                    <span
                      style={{ color: stage.color }}
                      className="font-medium"
                    >
                      {stage.stage}
                    </span>
                    <span>·</span>
                    <span>{stage.participants} participants</span>
                  </div>
                </div>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: `${stage.color}15`,
                    color: stage.color,
                  }}
                >
                  {stage.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Real-time Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-5"
      >
        <div className="glass rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-live" />
            Real-time Activity
          </h3>
          <div className="flex flex-col gap-2.5">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={activity.action + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${activity.color}15` }}
                >
                  <activity.icon
                    className="w-3.5 h-3.5"
                    style={{ color: activity.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium">
                    {activity.action}
                  </span>
                  <p className="text-[10px] text-text-muted">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-[9px] text-text-muted shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
