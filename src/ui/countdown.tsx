import { motion } from "framer-motion";
import { AnimatePresence } from "../lib/animate-presence";
import { appStore } from "../store/app-store";
import { cn } from "../lib/cn";

export function Countdown() {
  return (
    <AnimatePresence>
      <div
        className={cn(
          "text-5xl",
          appStore.isWarning ? "text-error" : "text-text"
        )}
      >
        <motion.div
          key={appStore.secondsLeft}
          exit={{
            opacity: 0,
            position: "absolute",
            scale: 1,
          }}
          animate={{ opacity: 1, scale: 1.1 }}
          initial={{ opacity: 0, scale: 1 }}
        >
          {appStore.secondsLeft}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
