import { observer } from "mobx-react-lite";
import * as m from "framer-motion/m";
import { AnimatePresence } from "framer-motion";
import { gameStore } from "../store/game-store";
import { cn } from "../lib/cn";

export const Countdown = observer(function Countdown() {
  return (
    <AnimatePresence>
      <div
        className={cn(
          "text-5xl",
          gameStore.isWarning ? "text-error" : "text-text"
        )}
      >
        <m.div
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
        </m.div>
      </div>
    </AnimatePresence>
  );
});
