"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Star,
  Users,
  Heart,
  MapPin,
  Calendar,
  Music,
  Code,
  BookOpen,
  Trophy,
  ChevronRight,
  Settings,
  ExternalLink,
} from "lucide-react";
import type { Screen } from "@/app/page";

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void;
}

const achievements = [
  { icon: Trophy, label: "State Finalist", color: "#f59e0b" },
  { icon: Star, label: "Top 10 Creator", color: "#a855f7" },
  { icon: Award, label: "100 Appreciations", color: "#ec4899" },
  { icon: Shield, label: "Verified Identity", color: "#3b82f6" },
  { icon: Music, label: "Music Maestro", color: "#06b6d4" },
  { icon: Users, label: "Community Leader", color: "#10b981" },
];

const skills = [
  "Classical Music",
  "Hindustani Vocal",
  "Music Theory",
  "Composition",
  "Piano",
  "Audio Production",
];

const communities = [
  { name: "Classical Music India", members: 12400, color: "#ec4899" },
  { name: "Music Producers Hub", members: 8700, color: "#3b82f6" },
  { name: "Delhi Performers", members: 3200, color: "#f59e0b" },
];

const contentGrid = [
  { type: "video", gradient: "from-purple-electric/30 to-pink-glow/30", label: "Performance" },
  { type: "audio", gradient: "from-blue-neon/30 to-cyan-live/30", label: "Track" },
  { type: "video", gradient: "from-gold-accent/30 to-pink-glow/30", label: "Tutorial" },
  { type: "research", gradient: "from-green-safe/30 to-blue-neon/30", label: "Paper" },
  { type: "video", gradient: "from-pink-glow/30 to-purple-electric/30", label: "Live" },
  { type: "audio", gradient: "from-cyan-live/30 to-blue-neon/30", label: "Remix" },
];

export default function ProfileScreen({ navigateTo }: ProfileScreenProps) {
  const [talentScore, setTalentScore] = useState(0);
  const targetScore = 92;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTalentScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval);
            return targetScore;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (talentScore / 100) * circumference;

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover gradient */}
        <div className="h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-electric/40 via-blue-neon/20 to-pink-glow/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />

          {/* Animated particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-1 h-1 rounded-full bg-purple-glow"
              style={{
                left: `${10 + i * 12}%`,
                top: `${40 + (i % 3) * 15}%`,
              }}
            />
          ))}
        </div>

        {/* Settings button */}
        <button
          onClick={() => navigateTo("safety")}
          className="absolute top-12 right-4 z-10 p-2 glass rounded-xl"
        >
          <Settings className="w-5 h-5 text-text-secondary" />
        </button>

        {/* Profile info overlay */}
        <div className="relative -mt-16 px-5">
          <div className="flex gap-4">
            {/* Avatar with talent score ring */}
            <div className="relative shrink-0">
              <svg width="120" height="120" className="absolute -top-1 -left-1">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(124,58,237,0.15)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-[108px] h-[108px] rounded-full bg-gradient-to-br from-purple-electric/30 to-pink-glow/20 flex items-center justify-center text-3xl font-bold m-[5px]">
                A
              </div>
              {/* Verified badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-neon flex items-center justify-center"
                style={{
                  boxShadow: "0 0 12px rgba(59,130,246,0.6)",
                }}
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            {/* Name and info */}
            <div className="pt-4">
              <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
                Ananya Sharma
              </h1>
              <p className="text-text-muted text-sm">@ananya_sings</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#f59e0b",
                    boxShadow: "0 0 10px rgba(245,158,11,0.2)",
                  }}
                >
                  ★ National Stage
                </span>
              </div>
            </div>
          </div>

          {/* Talent Score Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 glass rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold gradient-purple-blue gradient-text font-[family-name:var(--font-display)]">
                {talentScore}
              </div>
              <div>
                <div className="text-xs font-semibold text-text-primary">
                  Talent Score
                </div>
                <div className="text-[10px] text-text-muted">
                  Top 8% of creators
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-safe text-xs">
              <TrendingIcon />
              <span>+5 this week</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-around py-5 mx-5 mt-4 glass rounded-2xl"
      >
        {[
          { value: "156", label: "Posts" },
          { value: "12.4K", label: "Followers" },
          { value: "28.7K", label: "Appreciations" },
          { value: "847", label: "Following" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg font-bold font-[family-name:var(--font-display)]">
              {stat.value}
            </div>
            <div className="text-[10px] text-text-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-5 mt-5"
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          🎵 Classical vocalist | Hindustani music student at Delhi University |
          National stage performer | Dreaming of making Indian classical music
          mainstream for Gen Z
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> New Delhi, India
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Joined Mar 2026
          </span>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-gold-accent" />
          Achievements
        </h3>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {achievements.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="flex flex-col items-center gap-1.5 min-w-[72px] glass rounded-xl p-3"
              style={{
                borderColor: `${badge.color}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${badge.color}20`,
                }}
              >
                <badge.icon
                  className="w-5 h-5"
                  style={{ color: badge.color }}
                />
              </div>
              <span className="text-[9px] text-text-muted text-center leading-tight">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-purple-glow" />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1.5 rounded-lg glass text-text-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Communities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="px-5 mt-6"
      >
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-neon" />
          Communities
        </h3>
        <div className="flex flex-col gap-2">
          {communities.map((comm) => (
            <button
              key={comm.name}
              onClick={() => navigateTo("communities")}
              className="glass rounded-xl p-3 flex items-center gap-3 hover:bg-white/5 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ background: `${comm.color}20`, color: comm.color }}
              >
                {comm.name.charAt(0)}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{comm.name}</div>
                <div className="text-[11px] text-text-muted">
                  {comm.members.toLocaleString()} members
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-5 mt-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-pink-glow" />
            Portfolio
          </h3>
          <button className="text-xs text-purple-glow">View All</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {contentGrid.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + i * 0.05 }}
              className={`aspect-square rounded-xl bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform`}
            >
              {item.type === "video" && (
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5" />
                </div>
              )}
              {item.type === "audio" && (
                <Music className="w-5 h-5 text-cyan-live" />
              )}
              {item.type === "research" && (
                <BookOpen className="w-5 h-5 text-green-safe" />
              )}
              <span className="text-[9px] text-text-muted">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TrendingIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 9L5 5L7 7L10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3H10V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
