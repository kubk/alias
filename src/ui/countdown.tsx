import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { css } from "@emotion/css";
import React from "react";
import { colors } from "../lib/theme";
import { AnimatePresence } from "../lib/animate-presence";
import { useStore } from "../store/store-context";

export const Countdown = observer(() => {
  const store = useStore();
  return (
    <AnimatePresence>
      <div
        className={css({
          color: store.isWarning ? colors.error : colors.text,
          fontSize: 48,
        })}
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
});
