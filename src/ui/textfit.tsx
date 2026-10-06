import type { ComponentChildren } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import { cn } from "../lib/cn";

type Props = {
  children: ComponentChildren;
  className?: string;
  max?: number;
};

export function Textfit({ children, className, max = 48 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      text.style.fontSize = `${max}px`;
      const width = text.scrollWidth;
      if (width > container.clientWidth) {
        text.style.fontSize = `${Math.max(
          1,
          Math.floor((max * container.clientWidth) / width)
        )}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [children, max]);

  return (
    <div
      ref={containerRef}
      className={cn("flex min-w-0 items-center justify-center", className)}
    >
      <div
        ref={textRef}
        className="shrink-0 whitespace-nowrap"
        style={{ fontSize: max }}
      >
        {children}
      </div>
    </div>
  );
}
