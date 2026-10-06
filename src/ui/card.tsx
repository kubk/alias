import * as m from "framer-motion/m";
import { cn } from "../lib/cn";
import { Textfit } from "./textfit";

type Props = {
  word: string;
  isFront: boolean;
  exitX?: number;
};

export function Card({ word, isFront, exitX = 0 }: Props) {
  return (
    <m.div
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
      <Textfit className="w-full h-full" max={48}>
        <p className="text-center font-semibold capitalize">
          {word}
        </p>
      </Textfit>
    </m.div>
  );
}
