import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { StartScreen } from "./screens/start-screen";
import { GameScreen } from "./screens/game-screen";
import { FinishScreen } from "./screens/finish-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { AnimatePresence } from "./lib/animate-presence";
import { store } from "./store/store";

export function Page() {
  return (
    <>
      {store.screen === "start-modal" && (
        <motion.button
          onClick={() => store.openSettings()}
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
        {store.screen === "start-modal" && <StartScreen />}
        {store.screen === "settings" && <SettingsScreen />}
        {store.screen === "finish" && <FinishScreen />}
        {store.screen === "game" && <GameScreen />}
      </AnimatePresence>
    </>
  );
}
