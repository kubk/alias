import type { ComponentChildren } from "preact";
import { clsx } from "clsx";

type Props = {
  children: ComponentChildren;
  className?: string;
  footer?: ComponentChildren;
};

export function Modal(props: Props) {
  const { children, className, footer } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4">
      <div className={clsx("max-w-[310px] w-full p-6 rounded-[15px] bg-card", className)}>
        {children}
      </div>
      {footer}
    </div>
  );
}
