import React, { ReactNode } from "react";
import { AnimatePresence as FramerMotionAnimatePresence } from "framer-motion";

// Due to typing issues in framer-motion library we have to create this wrapper
export const AnimatePresence = (props: {
  children: ReactNode;
  exitBeforeEnter?: boolean;
  initial?: boolean;
}) => {
  return (
    <div>
      {/** @ts-ignore */}
      <FramerMotionAnimatePresence
        exitBeforeEnter={props.exitBeforeEnter}
        initial={props.initial}
      >
        {props.children}
      </FramerMotionAnimatePresence>
    </div>
  );
};
