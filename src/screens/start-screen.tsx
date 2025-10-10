import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { motion } from "framer-motion";
import { store } from "../store/store";

export function StartScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold pt-2">Alias game</span>
        <p className="text mt-8 mb-0 pb-2">Seconds per round</p>
        <div className="flex gap-3 w-full">
          {[10, 30, 60, 90].map((seconds) => (
            <motion.button
              key={seconds}
              onClick={() => store.changeSecondsPerRound(seconds)}
              className="flex-1 h-12 rounded-lg font-bold text-lg relative bg-card"
              animate={{
                backgroundColor:
                  store.secondsPerRound === seconds
                    ? "var(--color-success)"
                    : "var(--color-card)",
                color:
                  store.secondsPerRound === seconds
                    ? "var(--color-white)"
                    : "var(--color-text)",
              }}
              transition={{ duration: 0.2 }}
            >
              {seconds}
            </motion.button>
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
