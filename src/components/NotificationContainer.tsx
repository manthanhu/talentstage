"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useAppStore } from "@/app/store";

export function NotificationContainer() {
  const { notifications, removeNotification } = useAppStore();

  return (
    <AnimatePresence>
      <div className="fixed top-4 right-4 z-[100] space-y-2 pointer-events-none">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl
              backdrop-blur-md border pointer-events-auto
              ${
                notification.type === "success"
                  ? "bg-green-safe/10 border-green-safe/30 text-green-safe"
                  : "bg-red-danger/10 border-red-danger/30 text-red-danger"
              }
            `}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}

            <span className="text-sm font-medium">{notification.message}</span>

            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-current hover:opacity-70 transition-opacity flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
