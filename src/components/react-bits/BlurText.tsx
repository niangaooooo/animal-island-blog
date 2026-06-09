import { createElement, useEffect, useRef, useState } from "react";
import "./BlurText.css";

interface BlurTextProps {
  text: string;
  as?: "h1" | "h2" | "p" | "div" | "span";
  className?: string;
  delay?: number;
  stepDuration?: number;
}

export function BlurText({
  text,
  as: Tag = "div",
  className = "",
  delay = 40,
  stepDuration = 560,
}: BlurTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: `rb-blur-text ${visible ? "is-visible" : ""} ${className}`,
    },
    Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="rb-blur-text__char"
          style={{
            animationDelay: `${index * delay}ms`,
            animationDuration: `${stepDuration}ms`,
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      )),
  );
}
