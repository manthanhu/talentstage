"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/screens/SplashScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import VerifyScreen from "@/components/screens/VerifyScreen";
import FeedScreen from "@/components/screens/FeedScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import StagesScreen from "@/components/screens/StagesScreen";
import CommunitiesScreen from "@/components/screens/CommunitiesScreen";
import CreateScreen from "@/components/screens/CreateScreen";
import RoomsScreen from "@/components/screens/RoomsScreen";
import SafetyScreen from "@/components/screens/SafetyScreen";
import AdminScreen from "@/components/screens/AdminScreen";
import BottomNav from "@/components/ui/BottomNav";
import { useAuth } from "./hooks";
import type { Screen } from "./types";

const screensWithNav: Screen[] = [
  "feed",
  "profile",
  "stages",
  "communities",
  "create",
  "rooms",
  "safety",
];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [showNav, setShowNav] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Auto-redirect authenticated users from splash/onboarding to feed
    if (isAuthenticated && currentScreen === "splash") {
      setCurrentScreen("feed");
    }

    setShowNav(screensWithNav.includes(currentScreen));
  }, [currentScreen, isAuthenticated]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="mobile-frame bg-bg-primary relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onComplete={() => navigateTo("onboarding")} />
          </motion.div>
        )}

        {currentScreen === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <OnboardingScreen onComplete={() => navigateTo("verify")} />
          </motion.div>
        )}

        {currentScreen === "verify" && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <VerifyScreen onComplete={() => navigateTo("feed")} />
          </motion.div>
        )}

        {currentScreen === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <FeedScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <ProfileScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "stages" && (
          <motion.div
            key="stages"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <StagesScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "communities" && (
          <motion.div
            key="communities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <CommunitiesScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
          >
            <CreateScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "rooms" && (
          <motion.div
            key="rooms"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <RoomsScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "safety" && (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
          >
            <SafetyScreen navigateTo={navigateTo} />
          </motion.div>
        )}

        {currentScreen === "admin" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="desktop-layout"
          >
            <AdminScreen navigateTo={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>

      {showNav && (
        <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
      )}
    </div>
  );
}
