import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { motion } from "framer-motion";
import { store } from "../store/store";

export function StartScreen() {
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <span className="text-4xl">Alias game</span>
        <p className="text mt-4 mb-0 pb-2">Seconds per round</p>
        <div className="text-lg flex gap-[18px] items-center">
          {[10, 30, 60, 90].map((item, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="time"
                checked={store.secondsPerRound === item}
                onChange={() => {
                  store.changeSecondsPerRound(item);
                }}
              />
              <span>{item}</span>
            </label>
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
