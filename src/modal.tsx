import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { css } from "@emotion/css";
import { colors, theme } from "./theme";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

type Props = {
  isVisible: boolean;
  children: ReactNode;
  id?: string;
};

export const Modal = (props: Props) => {
  const { isVisible, children } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.div
          id={props.id}
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 10,
          })}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className={css({
              maxWidth: 310,
              margin: "0 auto",
              padding: "24px",
              background: colors.card,
              borderRadius: theme.borderRadius,
            })}
            variants={modal}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
