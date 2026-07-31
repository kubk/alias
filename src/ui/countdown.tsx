import { AnimatePresence, motion } from "framer-motion";
import { gameStore } from "../store/game-store";
import { cn } from "../lib/cn";

export function Countdown() {
  return (
    <AnimatePresence>
      <div
        className={cn(
          "text-5xl",
          gameStore.isWarning ? "text-error" : "text-text"
        )}
      >
        <motion.div
          key={gameStore.secondsLeft}
          exit={{
            opacity: 0,
            position: "absolute",
            scale: 1,
          }}
          animate={{ opacity: 1, scale: 1.1 }}
          initial={{ opacity: 0, scale: 1 }}
        >
          {gameStore.secondsLeft}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
