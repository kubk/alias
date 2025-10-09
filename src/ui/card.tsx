import { motion, MotionProps } from "framer-motion";
import { css } from "@emotion/css";
import { colors, theme } from "../lib/theme";

type FramerMotionProps = Pick<MotionProps, "style" | "animate">;

type Props = {
  word: string;
} & FramerMotionProps;

export function Card({ word, style, animate }: Props) {
  return (
    <motion.div
      className={css({
        position: "absolute",
        left: "50%",
        top: 0,
        height: 290,
        width: 290,
        borderRadius: theme.borderRadius,
        color: colors.text,
        display: "grid",
        marginLeft: -155,
        placeItems: "center center",
        padding: 10,
      })}
      animate={animate}
      style={{ backgroundColor: colors.card, ...style }}
      transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <p
        className={css({
          textAlign: "center",
          fontSize: 48,
          fontWeight: 600,
          textTransform: "capitalize",
          wordBreak: "break-all",
        })}
      >
        {word}
      </p>
    </motion.div>
  );
}
