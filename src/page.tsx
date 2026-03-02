import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { StartScreen } from "./screens/start-screen";
import { GameScreen } from "./screens/game-screen";
import { FinishScreen } from "./screens/finish-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { AnimatePresence } from "./lib/animate-presence";
import { appStore } from "./store/app-store";
import { ReactNode } from "react";

const transition = { ease: "easeInOut", duration: 0.2 };

function AnimatedScreen({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function Page() {
  return (
    <>
      {appStore.screen === "start-modal" && (
        <motion.button
          onClick={() => appStore.openSettings()}
          className="fixed top-4 right-4 p-2 rounded-lg text-text/50 hover:text-text/80 transition-colors z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Settings size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {appStore.screen === "start-modal" && (
          <AnimatedScreen key="start">
            <StartScreen />
          </AnimatedScreen>
        )}
        {appStore.screen === "settings" && (
          <AnimatedScreen key="settings">
            <SettingsScreen />
          </AnimatedScreen>
        )}
        {appStore.screen === "finish" && (
          <AnimatedScreen key="finish">
            <FinishScreen />
          </AnimatedScreen>
        )}
        {appStore.screen === "game" && (
          <AnimatedScreen key="game">
            <GameScreen />
          </AnimatedScreen>
        )}
      </AnimatePresence>
    </>
  );
}
