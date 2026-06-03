"use client";

import { motion } from "framer-motion";
import {
  Home,
  Search,
  Plus,
  Trophy,
  User,
  MessageCircle,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import type { Screen } from "@/app/types";

interface BottomNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

const navItems: { icon: typeof Home; label: string; screen: Screen }[] = [
  { icon: Home, label: "Feed", screen: "feed" },
  { icon: MessageCircle, label: "Community", screen: "communities" },
  { icon: Plus, label: "Create", screen: "create" },
  { icon: Trophy, label: "Stages", screen: "stages" },
  { icon: User, label: "Profile", screen: "profile" },
];

export default function BottomNav({
  currentScreen,
  navigateTo,
}: BottomNavProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-4 pb-2"
    >
      {/* Quick access buttons above nav */}
      <div className="flex justify-end gap-2 mb-2 px-2">
        <button
          onClick={() => navigateTo("rooms")}
          className="glass rounded-full p-2.5 hover:glow-blue transition-all duration-300 group"
          title="Voice Rooms"
          aria-label="Voice Rooms"
        >
          <Search className="w-4 h-4 text-text-secondary group-hover:text-blue-neon transition-colors" />
        </button>
        <button
          onClick={() => navigateTo("safety")}
          className="glass rounded-full p-2.5 hover:glow-purple transition-all duration-300 group"
          title="Safety"
          aria-label="Safety Center"
        >
          <Shield className="w-4 h-4 text-text-secondary group-hover:text-green-safe transition-colors" />
        </button>
        <button
          onClick={() => navigateTo("admin")}
          className="glass rounded-full p-2.5 hover:glow-purple transition-all duration-300 group"
          title="Admin Dashboard"
          aria-label="Admin Dashboard"
        >
          <LayoutDashboard className="w-4 h-4 text-text-secondary group-hover:text-purple-glow transition-colors" />
        </button>
      </div>

      <nav
        className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around"
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const isCreate = item.screen === "create";

          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-purple-glow"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {isCreate ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl gradient-purple-blue flex items-center justify-center -mt-4 glow-purple"
                >
                  <item.icon className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-purple-glow"
                      style={{
                        boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                      }}
                    />
                  )}
                </>
              )}
              <span
                className={`text-[10px] font-medium ${
                  isCreate ? "mt-0.5" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
