import { motion } from "framer-motion";
import { AnimatePresence } from "../lib/animate-presence";
import { store } from "../store/store";
import { cn } from "../lib/cn";

export function Countdown() {
  return (
    <AnimatePresence>
      <div
        className={cn("text-5xl", store.isWarning ? "text-error" : "text-text")}
      >
        <motion.div
          key={store.secondsLeft}
          exit={{
            opacity: 0,
            position: "absolute",
            scale: 1,
          }}
          animate={{ opacity: 1, scale: 1.1 }}
          initial={{ opacity: 0, scale: 1 }}
        >
          {store.secondsLeft}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
