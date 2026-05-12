"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
};

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.4,
}: Props) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        y: 0,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(0.12),
      }
    );
  }, [animate, duration, filter]);

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        ref={scope}
        className="
          flex flex-wrap
          gap-2 sm:gap-3 md:gap-4
          text-white
          text-lg sm:text-2xl md:text-3xl lg:text-4xl
          font-black
          uppercase
          leading-snug
          tracking-tight
          max-w-5xl
        "
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="opacity-0"
            style={{
              y: 20,
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}