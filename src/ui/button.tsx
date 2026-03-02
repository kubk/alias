import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type Props = {
  variant: "error" | "success";
  outline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  const { className, variant, ...restProps } = props;

  return (
    <motion.button
      {...restProps}
      whileHover={{ scale: 1.05 }}
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
