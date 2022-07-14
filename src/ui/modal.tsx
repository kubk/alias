import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/css";
import { colors, theme } from "../lib/theme";

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

type Props = {
  children: ReactNode;
};

export const Modal = (props: Props) => {
  const { children } = props;

  return (
    <motion.div
      className={css({
        maxWidth: 310,
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
