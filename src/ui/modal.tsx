import { ReactNode } from "react";
import { clsx } from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Modal(props: Props) {
  const { children, className } = props;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className={clsx("max-w-[310px] w-full p-6 rounded-[15px] bg-card", className)}>
        {children}
      </div>
    </div>
  );
}
