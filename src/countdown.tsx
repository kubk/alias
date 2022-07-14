import { observer } from "mobx-react-lite";
import { store } from "./store";
import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";
import { colors } from "./colors";
import React from "react";

export const Countdown = observer(() => {
  const isWarning = store.secondsLeft <= 10;

  return (
    <div>
      {/** @ts-ignore */}
      <AnimatePresence>
        <div
          className={css({
            color: isWarning ? colors.error : colors.text,
            fontSize: 72,
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
    </div>
  );
});
