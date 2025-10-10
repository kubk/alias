import { motion } from "framer-motion";
import { AnimatePresence } from "../lib/animate-presence";
import { cn } from "../lib/cn";
import { colors } from "../lib/theme";

export function Counter(props: { color: string; value: number }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={props.value}
        className={cn("text-5xl font-semibold", {
          "text-error": props.color === colors.error,
          "text-success": props.color === colors.success,
        })}
        exit={{ y: 75, opacity: 0, position: "absolute" }}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -75, opacity: 0 }}
      >
        {props.value}
      </motion.div>
    </AnimatePresence>
  );
}
