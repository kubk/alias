import { ReactNode } from "react";
import { AnimatePresence as FramerMotionAnimatePresence } from "framer-motion";

export function AnimatePresence(props: {
  children: ReactNode;
  initial?: boolean;
}) {
  return (
    <div>
      {/* @ts-ignore */}
      <FramerMotionAnimatePresence initial={props.initial}>
        {props.children}
      </FramerMotionAnimatePresence>
    </div>
  );
}
