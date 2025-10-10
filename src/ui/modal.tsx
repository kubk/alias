import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  marginTop?: string;
};

export function Modal(props: Props) {
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
      className="max-w-[310px] mx-auto p-6 rounded-[15px] bg-card"
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={modal}
    >
      {children}
    </motion.div>
  );
}
