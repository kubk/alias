import { css, cx } from "@emotion/css";
import React from "react";
import { reset } from "../lib/reset";
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
      className={cx(
        reset.button,
        css({
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: mainColor,
          cursor: "pointer",
          ":active": {
            transform: "scale(0.95)",
          },
          color: colors.white,
          fontWeight: "bold",
          fontSize: 16,
          lineHeight: 1.5,
          padding: 16,
          border: "none",
          borderRadius: 15,
          userSelect: "none",
          transition: "transform 0.1s ease",
        }),
        className
      )}
    >
      {props.children}
    </button>
  );
}
