import React from "react";
import { css } from "@emotion/css";
import { motion } from "framer-motion";
import { AnimatePresence } from "../lib/animate-presence";

export const Counter = (props: { color: string; value: number }) => {
  return (
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
  );
};
