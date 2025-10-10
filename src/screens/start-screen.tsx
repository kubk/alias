import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { motion } from "framer-motion";
import { store } from "../store/store";
import { cn } from "../lib/cn";

export function StartScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <span className="text-4xl">Alias game</span>
        <p className="text mt-8 mb-0 pb-2 self-start">Seconds per round</p>
        <div className="flex gap-3 w-full">
          {[10, 30, 60, 90].map((seconds) => (
            <button
              key={seconds}
              onClick={() => store.changeSecondsPerRound(seconds)}
              className={cn(
                "flex-1 h-12 rounded-lg font-bold text-lg transition-colors",
                store.secondsPerRound === seconds
                  ? "bg-success text-white"
                  : "bg-card text-text hover:bg-success/20"
              )}
            >
              {seconds}
            </button>
          ))}
        </div>

        <div className="mt-9" />
        <Button
          variant="success"
          onClick={() => {
            store.startTimer();
          }}
        >
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            className="font-semibold text-xl"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.3,
            }}
          >
            Start!
          </motion.div>
        </Button>
      </div>
    </Modal>
  );
}
