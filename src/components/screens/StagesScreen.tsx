"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Flame,
  Globe,
  MapPin,
  Crown,
  Timer,
  Users,
  ChevronRight,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface StagesScreenProps {
  navigateTo: (screen: Screen) => void;
}

const stages = [
  {
    name: "Local Stage",
    icon: MapPin,
    color: "#3b82f6",
    bgGrad: "from-blue-neon/20 to-blue-neon/5",
    description: "City & district level",
    participants: "2.4K",
    status: "completed" as const,
    rank: 3,
  },
  {
    name: "State Stage",
    icon: Star,
    color: "#a855f7",
    bgGrad: "from-purple-glow/20 to-purple-glow/5",
    description: "State-wide competition",
    participants: "856",
    status: "active" as const,
    rank: 12,
  },
  {
    name: "National Stage",
    icon: Trophy,
    color: "#f59e0b",
    bgGrad: "from-gold-accent/20 to-gold-accent/5",
    description: "Country-wide championship",
    participants: "320",
    status: "locked" as const,
    rank: null,
  },
  {
    name: "Global Stage",
    icon: Globe,
    color: "#ef4444",
    bgGrad: "from-red-danger/20 to-red-danger/5",
    description: "International spotlight",
    participants: "64",
    status: "locked" as const,
    rank: null,
  },
];

const leaderboard = [
  { rank: 1, name: "Priya Menon", score: 98, talent: "Bharatanatyam", stage: "National", trending: true },
  { rank: 2, name: "Arjun Dev", score: 97, talent: "Full-Stack Dev", stage: "National", trending: false },
  { rank: 3, name: "Zara Khan", score: 95, talent: "Urdu Poetry", stage: "State", trending: true },
  { rank: 4, name: "Rohan K.", score: 94, talent: "AI Research", stage: "State", trending: false },
  { rank: 5, name: "Ananya S.", score: 92, talent: "Classical Vocal", stage: "State", trending: true },
];

const liveEvents = [
  {
    title: "State Music Championship — Semi-Finals",
    category: "Music",
    time: "Live Now",
    viewers: 1247,
    color: "#ec4899",
  },
  {
    title: "National Coding Sprint — Round 2",
    category: "Coding",
    time: "In 2 hours",
    viewers: 856,
    color: "#3b82f6",
  },
  {
    title: "Delhi Art Showcase — Finals",
    category: "Art",
    time: "Tomorrow",
    viewers: 432,
    color: "#f59e0b",
  },
];

export default function StagesScreen({ navigateTo }: StagesScreenProps) {
  const [activeTab, setActiveTab] = useState<"stages" | "leaderboard" | "events">("stages");

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-accent/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-gold-accent" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Performance Stages
            </h1>
            <p className="text-text-muted text-xs">
              Rise from Local to Global
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="glass rounded-xl p-1 flex">
          {(["stages", "leaderboard", "events"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 capitalize ${
                activeTab === tab
                  ? "gradient-purple-blue text-white"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "stages" && (
        <div className="px-5">
          {/* Stage Progression Path */}
          <div className="relative">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < stages.length - 1 && (
                  <div className="absolute left-[22px] top-[60px] w-0.5 h-[40px] z-0">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          stage.status === "completed"
                            ? `linear-gradient(to bottom, ${stage.color}, ${stages[i + 1].color})`
                            : "rgba(100,116,139,0.2)",
                      }}
                    />
                  </div>
                )}

                {/* Stage Card */}
                <div
                  className={`relative z-10 glass rounded-2xl p-4 mb-4 flex items-center gap-4 ${
                    stage.status === "active"
                      ? "ring-1"
                      : stage.status === "locked"
                      ? "opacity-50"
                      : ""
                  }`}
                  style={
                    stage.status === "active"
                      ? {
                          borderColor: `${stage.color}40`,
                          boxShadow: `0 0 20px ${stage.color}15`,
                        }
                      : {}
                  }
                >
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}
                    style={{
                      background: `${stage.color}20`,
                    }}
                  >
                    <stage.icon
                      className="w-5 h-5"
                      style={{ color: stage.color }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{stage.name}</h3>
                      {stage.status === "active" && (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${stage.color}30`,
                            color: stage.color,
                          }}
                        >
                          ACTIVE
                        </motion.span>
                      )}
                      {stage.status === "completed" && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-safe/20 text-green-safe">
                          ✓ DONE
                        </span>
                      )}
                      {stage.status === "locked" && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                          🔒 LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {stage.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {stage.participants} participants
                      </span>
                      {stage.rank && (
                        <span
                          className="font-semibold"
                          style={{ color: stage.color }}
                        >
                          Rank #{stage.rank}
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Current Stage Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-2xl p-5 mt-2"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-glow" />
                State Stage Progress
              </h3>
              <span className="text-xs text-purple-glow">Rank #12</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-bg-card rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #a855f7, #3b82f6)",
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>680 / 1000 points</span>
              <span>320 to qualify</span>
            </div>

            {/* Countdown */}
            <div className="mt-4 flex items-center gap-2 text-xs">
              <Timer className="w-4 h-4 text-gold-accent" />
              <span className="text-text-secondary">
                Next evaluation in{" "}
                <span className="text-gold-accent font-semibold">3d 14h 22m</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="px-5">
          {/* Top 3 podium */}
          <div className="flex items-end justify-center gap-3 mb-6 pt-4">
            {[leaderboard[1], leaderboard[0], leaderboard[2]].map(
              (user, i) => {
                const heights = ["h-20", "h-28", "h-16"];
                const sizes = ["w-12 h-12", "w-16 h-16", "w-12 h-12"];
                const colors = ["#C0C0C0", "#FFD700", "#CD7F32"];
                const positions = [2, 1, 3];

                return (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`${sizes[i]} rounded-full flex items-center justify-center text-sm font-bold mb-2`}
                      style={{
                        border: `2px solid ${colors[i]}`,
                        boxShadow: `0 0 15px ${colors[i]}40`,
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium mb-1 text-center">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-text-muted mb-2">
                      {user.score} pts
                    </span>
                    <div
                      className={`${heights[i]} w-16 rounded-t-xl flex items-start justify-center pt-2`}
                      style={{
                        background: `linear-gradient(to top, ${colors[i]}10, ${colors[i]}30)`,
                        border: `1px solid ${colors[i]}30`,
                        borderBottom: "none",
                      }}
                    >
                      {positions[i] === 1 && (
                        <Crown
                          className="w-5 h-5"
                          style={{ color: colors[i] }}
                        />
                      )}
                      {positions[i] !== 1 && (
                        <span
                          className="text-sm font-bold"
                          style={{ color: colors[i] }}
                        >
                          #{positions[i]}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* Rest of leaderboard */}
          <div className="flex flex-col gap-2">
            {leaderboard.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <div className="w-8 text-center">
                  <span
                    className={`text-sm font-bold ${
                      user.rank <= 3 ? "text-gold-accent" : "text-text-muted"
                    }`}
                  >
                    #{user.rank}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-bg-card flex items-center justify-center text-sm font-bold border border-border-subtle">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium truncate">
                      {user.name}
                    </span>
                    {user.trending && (
                      <TrendingUp className="w-3 h-3 text-green-safe" />
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted">
                    {user.talent}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold gradient-purple-blue gradient-text">
                    {user.score}
                  </div>
                  <div className="text-[9px] text-text-muted">pts</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="px-5 flex flex-col gap-3">
          {liveEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="glass rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${event.color}20` }}
                >
                  <Award className="w-6 h-6" style={{ color: event.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-1">{event.title}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: `${event.color}15`,
                        color: event.color,
                      }}
                    >
                      {event.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.viewers.toLocaleString()} watching
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {event.time === "Live Now" ? (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center gap-1 text-xs font-semibold text-red-danger"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-danger" />
                      LIVE
                    </motion.div>
                  ) : (
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {event.time}
                    </span>
                  )}
                </div>
                <button className="text-xs font-medium px-4 py-1.5 rounded-lg gradient-purple-blue text-white">
                  {event.time === "Live Now" ? "Watch" : "Remind Me"}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Voting card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-4 border border-gold-accent/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-gold-accent" />
              <h3 className="text-sm font-semibold">Vote Now — State Finals</h3>
            </div>
            <div className="flex flex-col gap-2">
              {["Ananya S. — Classical Vocal", "Vikram R. — Film Direction"].map(
                (name, i) => (
                  <button
                    key={name}
                    className="glass rounded-xl p-3 flex items-center justify-between hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center text-xs font-bold border border-border-subtle">
                        {name.charAt(0)}
                      </div>
                      <span className="text-xs">{name}</span>
                    </div>
                    <div className="text-xs text-purple-glow opacity-0 group-hover:opacity-100 transition-opacity">
                      Vote →
                    </div>
                  </button>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
