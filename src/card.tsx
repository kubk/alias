import { DragHandlers, motion, MotionProps } from "framer-motion";
import { css } from "@emotion/css";
import React from "react";
import { colors } from "./colors";

type FramerMotionProps = Pick<MotionProps, "style" | "onDragEnd" | "animate">;

type Props = {
  word: string;
} & FramerMotionProps;

export const Card = ({ word, style, onDragEnd, animate }: Props) => (
  <motion.div
    className={css({
      position: "absolute",
      left: "50%",
      top: 0,
      height: 300,
      width: 300,
      borderRadius: 15,
      color: colors.text,
      display: "grid",
      marginLeft: "-160px",
      placeItems: "center center",
      padding: 10,
    })}
    drag={"x"}
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    onDragEnd={onDragEnd}
    animate={animate}
    style={{ ...style, background: colors.card }}
    transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
    whileTap={{ scale: 0.85 }}
  >
    <p
      className={css({
        textAlign: "center",
        fontSize: 48,
        fontWeight: 600,
        textTransform: "capitalize",
      })}
    >
      {word}
    </p>
  </motion.div>
);
