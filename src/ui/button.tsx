import React from "react";
import { cn } from "../lib/cn";

type Props = {
  variant: "error" | "success";
  outline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  const { className, variant, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={cn(
        "flex w-full justify-center items-center cursor-pointer text-white font-bold text-base leading-6 p-4 border-0 rounded-[15px] select-none transition-transform duration-100 ease-in-out active:scale-95",
        {
          "bg-error": variant === "error",
          "bg-success": variant === "success",
        },
        className
      )}
    >
      {props.children}
    </button>
  );
}
