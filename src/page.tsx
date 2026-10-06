import { observer } from "mobx-react-lite";
import * as m from "framer-motion/m";
import { Settings } from "lucide-preact";
import { AnimatePresence, type Transition } from "framer-motion";
import { StartScreen } from "./screens/start-screen";
import { GameScreen } from "./screens/game-screen";
import { FinishScreen } from "./screens/finish-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { routerStore } from "./store/router-store";

const transition: Transition = { ease: "easeInOut", duration: 0.2 };

export const Page = observer(function Page() {
  return (
    <>
      {routerStore.screen === "start-modal" && (
        <m.button
          onClick={() => routerStore.openSettings()}
          className="fixed right-4 p-2 rounded-lg text-text/50 hover:text-text/80 transition-colors z-50 top-[calc(env(safe-area-inset-top)+1rem)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Settings size={24} />
        </m.button>
      )}

      <AnimatePresence mode="wait">
        <m.div
          key={routerStore.screen}
          className="absolute inset-0"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={transition}
        >
          {routerStore.screen === "start-modal" && <StartScreen />}
          {routerStore.screen === "settings" && <SettingsScreen />}
          {routerStore.screen === "finish" && <FinishScreen />}
          {routerStore.screen === "game" && <GameScreen />}
        </m.div>
      </AnimatePresence>
    </>
  );
});
