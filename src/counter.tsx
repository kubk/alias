import React from "react";
import { css } from "@emotion/css";
import { AnimatePresence, motion } from "framer-motion";

export const Counter = (props: { color: string; value: number }) => {
  return (
    <div>
      {/** @ts-ignore */}
      <AnimatePresence initial={false}>
        <motion.div
          key={props.value}
          className={css({
            fontSize: 48,
            fontWeight: 600,
            color: props.color,
          })}
          exit={{ y: 75, opacity: 0, position: "absolute" }}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -75, opacity: 0 }}
        >
          {props.value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
