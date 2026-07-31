import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../lib/cn";

type Props = {
  variant: "error" | "success";
} & HTMLMotionProps<"button">;

export function Button(props: Props) {
  const { className, variant, ...restProps } = props;

  return (
    <motion.button
      {...restProps}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex w-full justify-center items-center cursor-pointer text-white font-bold text-base leading-6 p-4 border-0 rounded-[15px] select-none",
        {
          "bg-error": variant === "error",
          "bg-success": variant === "success",
        },
        className
      )}
    >
      {props.children}
    </motion.button>
  );
}
