import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Modal(props: Props) {
  const { children } = props;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-[310px] w-full p-6 rounded-[15px] bg-card">
        {children}
      </div>
    </div>
  );
}
