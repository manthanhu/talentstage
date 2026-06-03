"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Shield,
  Heart,
  MessageSquare,
  Share2,
  Play,
  Music,
  BookOpen,
  Flame,
  Sparkles,
  TrendingUp,
  Star,
  Award,
  Headphones,
  Zap,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface FeedScreenProps {
  navigateTo: (screen: Screen) => void;
}

const categories = [
  { label: "For You", icon: Sparkles, active: true },
  { label: "Trending", icon: Flame },
  { label: "Music", icon: Music },
  { label: "Research", icon: BookOpen },
  { label: "Coding", icon: Zap },
  { label: "Art", icon: Star },
  { label: "Audio", icon: Headphones },
];

const trendingCreators = [
  { name: "Ananya S.", talent: "Classical Singer", color: "#ec4899", stage: "National", score: 92 },
  { name: "Rohan K.", talent: "AI Researcher", color: "#3b82f6", stage: "State", score: 87 },
  { name: "Priya M.", talent: "Dancer", color: "#f59e0b", stage: "National", score: 95 },
  { name: "Arjun D.", talent: "Developer", color: "#7c3aed", stage: "Global", score: 98 },
  { name: "Meera L.", talent: "Poet", color: "#06b6d4", stage: "Local", score: 76 },
  { name: "Vikram R.", talent: "Filmmaker", color: "#10b981", stage: "State", score: 84 },
];

const feedPosts = [
  {
    id: 1,
    creator: "Ananya Sharma",
    handle: "@ananya_sings",
    talent: "Classical Vocalist",
    stage: "National",
    stageColor: "#f59e0b",
    score: 92,
    verified: true,
    type: "video" as const,
    title: "Raag Yaman — Evening Performance",
    desc: "My rendition of Raag Yaman at the inter-college music competition. Thank you all for the love! 🎶",
    likes: 2847,
    comments: 342,
    shares: 156,
    aiPromoted: true,
    safe: true,
    gradient: "from-pink-glow/20 to-purple-electric/20",
    time: "2h ago",
  },
  {
    id: 2,
    creator: "Rohan Kapoor",
    handle: "@rohan_ai",
    talent: "AI Researcher",
    stage: "State",
    stageColor: "#a855f7",
    score: 87,
    verified: true,
    type: "research" as const,
    title: "Transformer Attention Patterns in Low-Resource Languages",
    desc: "Published my research on attention mechanisms for Hindi-English code-switched text. Read the full paper!",
    likes: 1523,
    comments: 189,
    shares: 478,
    aiPromoted: false,
    safe: true,
    gradient: "from-blue-neon/20 to-purple-electric/20",
    time: "4h ago",
  },
  {
    id: 3,
    creator: "Kavya Nair",
    handle: "@kavya_beats",
    talent: "Music Producer",
    stage: "Local",
    stageColor: "#3b82f6",
    score: 74,
    verified: true,
    type: "audio" as const,
    title: "Monsoon Vibes — Lo-fi Beat",
    desc: "Made this lo-fi track inspired by Mumbai rains ☔ Let me know what you think!",
    likes: 956,
    comments: 87,
    shares: 234,
    aiPromoted: false,
    safe: true,
    gradient: "from-cyan-live/20 to-blue-neon/20",
    time: "6h ago",
  },
  {
    id: 4,
    creator: "Aditya Verma",
    handle: "@adi_codes",
    talent: "Full-Stack Dev",
    stage: "State",
    stageColor: "#a855f7",
    score: 89,
    verified: true,
    type: "video" as const,
    title: "Building a Real-time Collab Editor",
    desc: "Watch me build a Google Docs clone with CRDTs in 30 minutes! Full tutorial on my stage 🚀",
    likes: 3241,
    comments: 567,
    shares: 892,
    aiPromoted: true,
    safe: true,
    gradient: "from-purple-electric/20 to-pink-glow/20",
    time: "8h ago",
  },
];

const stageColorMap: Record<string, string> = {
  Local: "#3b82f6",
  State: "#a855f7",
  National: "#f59e0b",
  Global: "#ef4444",
};

export default function FeedScreen({ navigateTo }: FeedScreenProps) {
  const [activeCategory, setActiveCategory] = useState("For You");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass-strong">
        <div className="px-4 pt-12 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-purple-blue flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold font-[family-name:var(--font-display)]">
              <span className="gradient-purple-blue gradient-text">Talent</span>
              Stage
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-glow" />
            </button>
            <div className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
              <Shield className="w-3.5 h-3.5 text-green-safe" />
              <span className="text-[10px] text-green-safe font-medium">Safe</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.label
                    ? "gradient-purple-blue text-white glow-purple"
                    : "glass text-text-muted hover:text-text-secondary"
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Creators - Horizontal scroll */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-pink-glow" />
          <span className="text-sm font-semibold text-text-secondary">
            Trending Creators
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {trendingCreators.map((creator, i) => (
            <motion.button
              key={creator.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo("profile")}
              className="flex flex-col items-center gap-1.5 min-w-[72px]"
            >
              <div
                className="relative w-14 h-14 rounded-full p-[2px]"
                style={{
                  background: `linear-gradient(135deg, ${creator.color}, ${creator.color}80)`,
                }}
              >
                <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center text-sm font-bold">
                  {creator.name.charAt(0)}
                </div>
                {/* Stage badge */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 text-[8px] px-1.5 py-0.5 rounded-full font-bold text-white"
                  style={{
                    background: stageColorMap[creator.stage],
                    boxShadow: `0 0 8px ${stageColorMap[creator.stage]}60`,
                  }}
                >
                  {creator.stage.charAt(0)}
                </div>
              </div>
              <span className="text-[10px] text-text-muted truncate max-w-[72px]">
                {creator.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="px-4 flex flex-col gap-4">
        {feedPosts.map((post, i) => {
          const isLiked = likedPosts.includes(post.id);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Post header */}
              <div className="p-4 pb-3 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${post.stageColor}40, ${post.stageColor}20)`,
                    border: `1px solid ${post.stageColor}30`,
                  }}
                >
                  {post.creator.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold truncate">
                      {post.creator}
                    </span>
                    {post.verified && (
                      <div className="w-4 h-4 rounded-full bg-blue-neon/20 flex items-center justify-center shrink-0">
                        <Shield className="w-2.5 h-2.5 text-blue-neon" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span>{post.handle}</span>
                    <span>·</span>
                    <span
                      className="font-medium px-1.5 py-0.5 rounded-full text-[10px]"
                      style={{
                        background: `${post.stageColor}15`,
                        color: post.stageColor,
                      }}
                    >
                      {post.stage} Stage
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted">{post.time}</div>
              </div>

              {/* Media area */}
              <div
                className={`relative mx-4 rounded-xl overflow-hidden bg-gradient-to-br ${post.gradient} aspect-video flex items-center justify-center`}
              >
                {post.type === "video" && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full glass-strong flex items-center justify-center cursor-pointer"
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                )}
                {post.type === "audio" && (
                  <div className="flex items-end gap-1 h-12">
                    {[...Array(20)].map((_, j) => (
                      <motion.div
                        key={j}
                        animate={{
                          height: [
                            `${20 + Math.random() * 30}%`,
                            `${50 + Math.random() * 50}%`,
                            `${20 + Math.random() * 30}%`,
                          ],
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.5,
                          repeat: Infinity,
                          delay: j * 0.05,
                        }}
                        className="w-1.5 rounded-full bg-cyan-live/70"
                        style={{ height: "30%" }}
                      />
                    ))}
                  </div>
                )}
                {post.type === "research" && (
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen className="w-10 h-10 text-blue-neon/60" />
                    <span className="text-xs text-text-muted">Research Paper</span>
                  </div>
                )}

                {/* AI Promoted badge */}
                {post.aiPromoted && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 glass rounded-full px-2.5 py-1">
                    <Sparkles className="w-3 h-3 text-gold-accent" />
                    <span className="text-[10px] font-medium text-gold-accent">
                      AI Promoted
                    </span>
                  </div>
                )}

                {/* Safe space indicator */}
                {post.safe && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 glass rounded-full px-2 py-1">
                    <Shield className="w-3 h-3 text-green-safe" />
                  </div>
                )}
              </div>

              {/* Post content */}
              <div className="p-4 pt-3">
                <h3 className="text-sm font-semibold mb-1">{post.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-3">
                  {post.desc}
                </p>

                {/* Talent score */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[10px] text-gold-accent glass rounded-full px-2 py-0.5">
                    <Award className="w-3 h-3" />
                    <span>Score: {post.score}</span>
                  </div>
                  <div className="text-[10px] text-text-muted">
                    {post.talent}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-pink-glow transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all duration-300 ${
                        isLiked
                          ? "text-pink-glow fill-pink-glow scale-110"
                          : ""
                      }`}
                    />
                    <span>
                      {isLiked ? post.likes + 1 : post.likes}
                    </span>
                  </motion.button>
                  <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-blue-neon transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-purple-glow transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
