"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  MessageCircle,
  Mic,
  Pin,
  Flame,
  Search,
  ChevronRight,
  Music,
  Code,
  Palette,
  BookOpen,
  Camera,
  Lightbulb,
  Heart,
  ThumbsUp,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface CommunitiesScreenProps {
  navigateTo: (screen: Screen) => void;
}

const communities = [
  {
    name: "Classical Music India",
    desc: "Ragas, compositions, and performance",
    icon: Music,
    members: 12400,
    color: "#ec4899",
    activeNow: 234,
    safe: true,
    trending: true,
  },
  {
    name: "Code Warriors",
    desc: "DSA, system design, and competitive coding",
    icon: Code,
    members: 18700,
    color: "#3b82f6",
    activeNow: 567,
    safe: true,
    trending: true,
  },
  {
    name: "Visual Arts Collective",
    desc: "Digital art, painting, and design",
    icon: Palette,
    members: 8300,
    color: "#f59e0b",
    activeNow: 145,
    safe: true,
    trending: false,
  },
  {
    name: "Research Exchange",
    desc: "Academic papers and peer reviews",
    icon: BookOpen,
    members: 5600,
    color: "#10b981",
    activeNow: 89,
    safe: true,
    trending: false,
  },
  {
    name: "Filmmakers Hub",
    desc: "Short films, editing, and storytelling",
    icon: Camera,
    members: 9200,
    color: "#06b6d4",
    activeNow: 312,
    safe: true,
    trending: true,
  },
  {
    name: "Innovation Lab",
    desc: "Startups, ideas, and hackathons",
    icon: Lightbulb,
    members: 6800,
    color: "#a855f7",
    activeNow: 178,
    safe: true,
    trending: false,
  },
];

const discussions = [
  {
    author: "Kavya N.",
    community: "Classical Music India",
    title: "Best resources for learning Raag Bhairavi?",
    replies: 47,
    likes: 123,
    time: "2h ago",
    pinned: false,
    voiceRoom: false,
  },
  {
    author: "Rahul S.",
    community: "Code Warriors",
    title: "System Design: Building a real-time leaderboard",
    replies: 89,
    likes: 234,
    time: "4h ago",
    pinned: true,
    voiceRoom: false,
  },
  {
    author: "Meera L.",
    community: "Visual Arts",
    title: "Procreate vs Krita — which for beginners?",
    replies: 34,
    likes: 67,
    time: "6h ago",
    pinned: false,
    voiceRoom: false,
  },
  {
    author: "Community",
    community: "Filmmakers Hub",
    title: "🎙 Live Discussion: Cinematography Techniques",
    replies: 0,
    likes: 56,
    time: "Live",
    pinned: false,
    voiceRoom: true,
  },
];

export default function CommunitiesScreen({ navigateTo }: CommunitiesScreenProps) {
  const [activeTab, setActiveTab] = useState<"browse" | "discussions">("browse");

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-neon/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-neon" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
                Communities
              </h1>
              <p className="text-text-muted text-xs">
                Find your people
              </p>
            </div>
          </div>
          <button className="p-2 glass rounded-xl">
            <Search className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Safe community banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-3 flex items-center gap-3 mb-4 border border-green-safe/10"
        >
          <Shield className="w-5 h-5 text-green-safe shrink-0" />
          <div>
            <span className="text-xs font-medium text-green-safe">
              AI-Protected Communities
            </span>
            <p className="text-[10px] text-text-muted">
              All communities are moderated for safety. No harassment. No hate.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="glass rounded-xl p-1 flex">
          {(["browse", "discussions"] as const).map((tab) => (
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

      {activeTab === "browse" && (
        <div className="px-5 mt-4 flex flex-col gap-3">
          {communities.map((comm, i) => (
            <motion.button
              key={comm.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-2xl p-4 flex items-center gap-3 text-left hover:bg-white/5 transition-all group w-full"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${comm.color}20` }}
              >
                <comm.icon className="w-6 h-6" style={{ color: comm.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold truncate">
                    {comm.name}
                  </h3>
                  {comm.trending && (
                    <Flame className="w-3 h-3 text-gold-accent shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-text-muted truncate">
                  {comm.desc}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-text-muted">
                  <span>{comm.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-safe" />
                    {comm.activeNow} active
                  </span>
                  {comm.safe && (
                    <span className="flex items-center gap-0.5 text-green-safe">
                      <Shield className="w-3 h-3" />
                      Safe
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors shrink-0" />
            </motion.button>
          ))}

          {/* Voice rooms preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <Mic className="w-4 h-4 text-cyan-live" />
              <span className="text-sm font-semibold text-text-secondary">
                Active Voice Rooms
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {[
                { name: "Music Jam Session", members: 12, color: "#ec4899" },
                { name: "Code Review Hour", members: 8, color: "#3b82f6" },
                { name: "Art Critique Circle", members: 6, color: "#f59e0b" },
              ].map((room, i) => (
                <motion.button
                  key={room.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  onClick={() => navigateTo("rooms")}
                  className="glass rounded-xl p-3 min-w-[160px] text-left"
                  style={{
                    borderColor: `${room.color}15`,
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: room.color }}
                    />
                    <span className="text-[10px] font-medium" style={{ color: room.color }}>
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs font-medium mb-1">{room.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Users className="w-3 h-3" />
                    {room.members} in room
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === "discussions" && (
        <div className="px-5 mt-4 flex flex-col gap-3">
          {discussions.map((thread, i) => (
            <motion.div
              key={thread.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-4 ${
                thread.voiceRoom ? "border border-cyan-live/20" : ""
              }`}
            >
              {/* Thread header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-bg-card flex items-center justify-center text-[10px] font-bold border border-border-subtle">
                  {thread.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium">{thread.author}</span>
                  <span className="text-[10px] text-text-muted ml-2">
                    in {thread.community}
                  </span>
                </div>
                <span className="text-[10px] text-text-muted">{thread.time}</span>
              </div>

              {/* Title */}
              <div className="flex items-start gap-2">
                {thread.pinned && (
                  <Pin className="w-3.5 h-3.5 text-gold-accent mt-0.5 shrink-0" />
                )}
                {thread.voiceRoom && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="w-3.5 h-3.5 text-cyan-live mt-0.5 shrink-0" />
                  </motion.div>
                )}
                <h3 className="text-sm font-medium leading-snug">
                  {thread.title}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-3 pt-2 border-t border-border-subtle">
                <span className="flex items-center gap-1 text-[11px] text-text-muted">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {thread.likes}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-text-muted">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {thread.replies} replies
                </span>
                {thread.voiceRoom && (
                  <button className="ml-auto text-[11px] font-medium px-3 py-1 rounded-lg bg-cyan-live/20 text-cyan-live">
                    Join Room
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
