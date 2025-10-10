import { motion, MotionProps } from "framer-motion";
import { cn } from "../lib/cn";

type FramerMotionProps = Pick<MotionProps, "style" | "animate">;

type Props = {
  word: string;
  bgColor?: "error" | "success" | "card";
} & FramerMotionProps;

export function Card({ word, style, animate, bgColor = "card" }: Props) {
  return (
    <motion.div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-0 h-[290px] w-[290px] rounded-[15px] text-text grid place-items-center p-[10px]",
        {
          "bg-error": bgColor === "error",
          "bg-success": bgColor === "success",
          "bg-card": bgColor === "card",
        }
      )}
      animate={animate}
      style={style}
      transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <p className="text-center text-5xl font-semibold capitalize break-all">
        {word}
      </p>
    </motion.div>
  );
}
