import { css, cx } from "@emotion/css";
import React, { useMemo } from "react";
import { colord } from "colord";
import { reset } from "../lib/reset";
import { colors, theme } from "../lib/theme";

type Props = {
  mainColor: string;
  outline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { className, mainColor, ...restProps } = props;
  const parsedColor = useMemo(() => colord(mainColor), [mainColor]);

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
          ":hover": {
            backgroundColor: parsedColor.darken(0.1).toHex(),
          },
          ":focus": {
            boxShadow: `0 0 0 0.2rem ${parsedColor.alpha(0.4).toHex()}`,
          },
          ":active": {
            backgroundColor: parsedColor.darken(0.1).toHex(),
          },
          ":disabled": {
            backgroundColor: parsedColor.lighten(0.15).toHex(),
            cursor: "not-allowed",
          },
          color: colors.white,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.5,
          padding: "0.45rem 0.75rem",
          userSelect: "none",
          transitionDuration: "0.2s",
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "background-color, border, box-shadow, color",
          borderRadius: theme.borderRadius,
        }),
        className
      )}
    >
      {props.children}
    </button>
  );
};
