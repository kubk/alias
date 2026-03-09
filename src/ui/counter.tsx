import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/cn";

export function Counter(props: {
  variant: "error" | "success";
  value: number;
}) {
  return (
    <div className="relative overflow-hidden h-[1em] text-5xl font-semibold leading-none">
      <AnimatePresence initial={false}>
        <motion.div
          key={props.value}
          className={cn({
            "text-error": props.variant === "error",
            "text-success": props.variant === "success",
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
}
