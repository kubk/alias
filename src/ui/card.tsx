import { motion } from "framer-motion";
import { Textfit } from "react-textfit";
import { cn } from "../lib/cn";

type Props = {
  word: string;
  isFront: boolean;
  exitX?: number;
};

export function Card({ word, isFront, exitX = 0 }: Props) {
  return (
    <motion.div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-0 h-[290px] w-[290px] rounded-[15px] text-text grid place-items-center p-[10px] bg-card"
      )}
      initial={!isFront ? { scale: 0, y: 105, opacity: 0 } : false}
      animate={{
        scale: isFront ? 1 : 0.75,
        y: isFront ? 0 : 60,
        opacity: isFront ? 1 : 0.5,
        x: 0,
      }}
      exit={{
        x: exitX,
        opacity: 0,
        scale: 0.5,
        rotate: exitX > 0 ? 15 : exitX < 0 ? -15 : 0,
        transition: { duration: 0.2 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Textfit
        mode="single"
        className="w-full h-full flex items-center justify-center"
        max={48}
      >
        <p className="text-center font-semibold capitalize whitespace-nowrap">
          {word}
        </p>
      </Textfit>
    </motion.div>
  );
}
