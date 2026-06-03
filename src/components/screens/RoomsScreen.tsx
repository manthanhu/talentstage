"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Users,
  Hand,
  Smile,
  Shield,
  Settings,
  PhoneOff,
  Volume2,
  Crown,
  Radio,
  ChevronRight,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface RoomsScreenProps {
  navigateTo: (screen: Screen) => void;
}

const activeRooms = [
  {
    name: "Classical Music Jam Session",
    host: "Ananya S.",
    topic: "Exploring Raag Bhairavi variations",
    speakers: 4,
    listeners: 28,
    color: "#ec4899",
    category: "Music",
  },
  {
    name: "Code Review Hour",
    host: "Aditya V.",
    topic: "React Server Components deep dive",
    speakers: 3,
    listeners: 42,
    color: "#3b82f6",
    category: "Coding",
  },
  {
    name: "Debate: AI in Education",
    host: "Dr. Priya K.",
    topic: "Should AI replace traditional teaching?",
    speakers: 6,
    listeners: 156,
    color: "#a855f7",
    category: "Debate",
  },
  {
    name: "Filmmaking Masterclass",
    host: "Vikram R.",
    topic: "Lighting techniques for short films",
    speakers: 2,
    listeners: 67,
    color: "#f59e0b",
    category: "Film",
  },
];

const roomSpeakers = [
  { name: "Ananya S.", role: "Host", speaking: true, muted: false },
  { name: "Rohan K.", role: "Speaker", speaking: false, muted: false },
  { name: "Kavya N.", role: "Speaker", speaking: true, muted: false },
  { name: "Arjun D.", role: "Speaker", speaking: false, muted: true },
];

const roomListeners = [
  "Meera L.", "Priya M.", "Vikram R.", "Zara K.",
  "Rahul S.", "Neha T.", "Amit P.", "Sara J.",
  "Dev G.", "Riya C.", "Karan M.", "Nisha B.",
];

const emojis = ["🔥", "👏", "❤️", "💡", "🎵", "✨"];

export default function RoomsScreen({ navigateTo }: RoomsScreenProps) {
  const [inRoom, setInRoom] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: number; emoji: string; x: number }[]
  >([]);

  const sendEmoji = (emoji: string) => {
    const id = Date.now();
    const x = 20 + Math.random() * 60;
    setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
    }, 2000);
  };

  if (inRoom) {
    return (
      <div className="min-h-dvh bg-bg-primary pb-36 relative overflow-hidden">
        {/* Floating emojis */}
        {floatingEmojis.map((e) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 1, y: 0, x: `${e.x}%` }}
            animate={{ opacity: 0, y: -200 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-40 text-2xl z-50 pointer-events-none"
            style={{ left: `${e.x}%` }}
          >
            {e.emoji}
          </motion.div>
        ))}

        {/* Room Header */}
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setInRoom(false)}
              className="text-sm text-text-muted"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-danger"
              />
              <span className="text-xs font-medium text-red-danger">LIVE</span>
            </div>
            <button className="p-2 glass rounded-xl">
              <Settings className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">
              Classical Music Jam Session
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Exploring Raag Bhairavi variations
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                32 listening
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-safe" />
                Moderated
              </span>
            </div>
          </div>
        </div>

        {/* Speakers Stage */}
        <div className="px-5 mt-4">
          <div className="text-xs font-medium text-text-secondary mb-3 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-live" />
            On Stage
          </div>
          <div className="grid grid-cols-2 gap-3">
            {roomSpeakers.map((speaker, i) => (
              <motion.div
                key={speaker.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-4 flex flex-col items-center text-center relative"
              >
                {/* Speaking indicator ring */}
                <div className="relative mb-2">
                  {speaker.speaking && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-green-safe"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2], opacity: [0.3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                        className="absolute inset-0 rounded-full border border-green-safe"
                      />
                    </>
                  )}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                      speaker.speaking
                        ? "ring-2 ring-green-safe"
                        : "ring-1 ring-border-subtle"
                    }`}
                    style={{
                      background: speaker.speaking
                        ? "rgba(16,185,129,0.1)"
                        : "rgba(26,26,46,0.5)",
                    }}
                  >
                    {speaker.name.charAt(0)}
                  </div>
                  {speaker.muted && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-danger/20 flex items-center justify-center">
                      <MicOff className="w-3 h-3 text-red-danger" />
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{speaker.name}</span>
                <span className="text-[10px] text-text-muted flex items-center gap-1">
                  {speaker.role === "Host" && (
                    <Crown className="w-3 h-3 text-gold-accent" />
                  )}
                  {speaker.role}
                </span>

                {/* Audio wave */}
                {speaker.speaking && !speaker.muted && (
                  <div className="flex items-end gap-0.5 h-3 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        animate={{
                          height: [`${30 + Math.random() * 20}%`, `${60 + Math.random() * 40}%`, `${30 + Math.random() * 20}%`],
                        }}
                        transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity }}
                        className="w-0.5 rounded-full bg-green-safe"
                        style={{ height: "40%" }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Listeners */}
        <div className="px-5 mt-6">
          <div className="text-xs font-medium text-text-secondary mb-3 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5" />
            Listeners ({roomListeners.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {roomListeners.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-xs font-medium border border-border-subtle"
                title={name}
              >
                {name.charAt(0)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pb-4">
          {/* Emoji bar */}
          <div className="flex justify-center gap-2 mb-3">
            {emojis.map((emoji) => (
              <motion.button
                key={emoji}
                whileTap={{ scale: 0.8 }}
                onClick={() => sendEmoji(emoji)}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform"
              >
                {emoji}
              </motion.button>
            ))}
          </div>

          <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-around">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-all ${
                isMuted ? "bg-red-danger/20" : "bg-green-safe/20"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5 text-red-danger" />
              ) : (
                <Mic className="w-5 h-5 text-green-safe" />
              )}
            </button>
            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`p-3 rounded-full transition-all ${
                handRaised ? "bg-gold-accent/20" : "glass"
              }`}
            >
              <Hand
                className={`w-5 h-5 ${
                  handRaised ? "text-gold-accent" : "text-text-muted"
                }`}
              />
            </button>
            <button className="p-3 glass rounded-full">
              <Smile className="w-5 h-5 text-text-muted" />
            </button>
            <button
              onClick={() => setInRoom(false)}
              className="px-5 py-2.5 rounded-full bg-red-danger/20 text-red-danger text-sm font-medium"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg-primary pb-36">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-live/10 flex items-center justify-center">
            <Mic className="w-5 h-5 text-cyan-live" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Voice Rooms
            </h1>
            <p className="text-text-muted text-xs">
              Join live conversations
            </p>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="px-5 flex flex-col gap-3">
        {activeRooms.map((room, i) => (
          <motion.button
            key={room.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setInRoom(true)}
            className="glass rounded-2xl p-4 text-left w-full hover:bg-white/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${room.color}20` }}
              >
                <Mic className="w-5 h-5" style={{ color: room.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold truncate">
                    {room.name}
                  </h3>
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: room.color }}
                  />
                </div>
                <p className="text-[11px] text-text-muted truncate">
                  {room.topic}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <Radio className="w-3 h-3" style={{ color: room.color }} />
                    {room.speakers} speaking
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {room.listeners} listening
                  </span>
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[9px]"
                    style={{
                      background: `${room.color}15`,
                      color: room.color,
                    }}
                  >
                    {room.category}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-secondary transition-colors shrink-0 mt-2" />
            </div>

            {/* Hosted by */}
            <div className="mt-3 pt-2 border-t border-border-subtle flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-bg-card flex items-center justify-center text-[9px] font-bold border border-border-subtle">
                {room.host.charAt(0)}
              </div>
              <span className="text-[10px] text-text-muted">
                Hosted by <span className="text-text-secondary">{room.host}</span>
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
