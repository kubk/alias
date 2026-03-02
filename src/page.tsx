import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { StartScreen } from "./screens/start-screen";
import { GameScreen } from "./screens/game-screen";
import { FinishScreen } from "./screens/finish-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { AnimatePresence } from "./lib/animate-presence";
import { appStore } from "./store/app-store";

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
        {appStore.screen === "start-modal" && <StartScreen />}
        {appStore.screen === "settings" && <SettingsScreen />}
        {appStore.screen === "finish" && <FinishScreen />}
        {appStore.screen === "game" && <GameScreen />}
      </AnimatePresence>
    </>
  );
}
