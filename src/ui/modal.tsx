import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/css";
import { colors, theme } from "../lib/theme";

type Props = {
  children: ReactNode;
  marginTop?: string;
};

export const Modal = (props: Props) => {
  const { children } = props;
  const marginTop = props.marginTop || "200px";

  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: marginTop,
      opacity: 1,
      transition: { delay: 0.2 },
    },
  };

  return (
    <motion.div
      className={css({
        maxWidth: 290,
        margin: "0 auto",
        padding: 24,
        background: colors.card,
        borderRadius: theme.borderRadius,
      })}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={modal}
    >
      {children}
    </motion.div>
  );
};
