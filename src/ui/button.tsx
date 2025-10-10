import React from "react";
import { cn } from "../lib/cn";
import { colors } from "../lib/theme";

type Props = {
  mainColor: string;
  outline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  const { className, mainColor, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={cn(
        "flex w-full justify-center items-center cursor-pointer text-white font-bold text-base leading-6 p-4 border-0 rounded-[15px] select-none transition-transform duration-100 ease-in-out active:scale-95",
        {
          "bg-error": mainColor === colors.error,
          "bg-success": mainColor === colors.success,
        },
        className
      )}
    >
      {props.children}
    </button>
  );
}
