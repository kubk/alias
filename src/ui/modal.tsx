import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  marginTop?: string;
};

export function Modal(props: Props) {
  const { children } = props;
  const marginTop = props.marginTop || "200px";

  return (
    <div
      className="max-w-[310px] mx-auto p-6 rounded-[15px] bg-card"
      style={{ marginTop }}
    >
      {children}
    </div>
  );
}
