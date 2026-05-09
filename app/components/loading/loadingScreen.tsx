"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  onComplete?: () => void;
};

const FIRST_LINE = "I BELIEVE IN CODE";
const SECOND_LINE = "NOT HUMANS";

const TYPE_SPEED = 70; // ms per character

function TypingText({
  text,
  active,
  color,
  className = "",
}: {
  text: string;
  active: boolean;
  color: string;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!active) {
      // Use startTransition or setTimeout to avoid the warning
      const timer = setTimeout(() => {
        setDisplayedText("");
        setShowCursor(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    let index = 0;
    let cursorTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        cursorTimer = setTimeout(() => setShowCursor(false), 800);
      }
    }, TYPE_SPEED);

    return () => {
      clearInterval(interval);
      if (cursorTimer) clearTimeout(cursorTimer);
    };
  }, [active, text]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <span style={{ color }} className="relative whitespace-nowrap">
        {displayedText}
        {showCursor && active && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 bg-current ml-1 align-middle"
            style={{ height: '1.2em' }}
          />
        )}
      </span>
    </div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"first" | "second" | "exit">("first");
  const [firstActive, setFirstActive] = useState(false);
  const [secondActive, setSecondActive] = useState(false);
  const [showFirstLine, setShowFirstLine] = useState(true);

  const timers = useRef<NodeJS.Timeout[]>([]);
  const completed = useRef(false);

  const timings = useMemo(() => {
    const firstTypingDuration = FIRST_LINE.length * TYPE_SPEED;
    const firstDone = 350 + firstTypingDuration + 700;
    const secondStart = firstDone + 600;
    const secondTypingDuration = SECOND_LINE.length * TYPE_SPEED;
    const secondDone = secondStart + secondTypingDuration + 1400;
    
    return {
      firstDone,
      secondStart,
      secondDone,
      complete: secondDone + 700,
    };
  }, []);

  useEffect(() => {
    const push = (fn: () => void, ms: number) => {
      const timer = setTimeout(fn, ms);
      timers.current.push(timer);
    };

    push(() => setFirstActive(true), 350);
    push(() => {
      setShowFirstLine(false);
      setPhase("second");
    }, timings.firstDone);
    push(() => setSecondActive(true), timings.secondStart);
    push(() => setPhase("exit"), timings.secondDone);
    push(() => {
      if (completed.current) return;
      completed.current = true;
      onComplete?.();
    }, timings.complete);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [onComplete, timings]);

  const isSecondPhase = phase === "second" || phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isSecondPhase ? "#000000" : "#FFFFFF",
        fontFamily: "'Michroma', sans-serif",
      }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background transition effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSecondPhase ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ backgroundColor: "#000000" }}
      />
      
      {/* First Screen - White Background */}
      {!isSecondPhase && showFirstLine && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <TypingText
            text={FIRST_LINE}
            active={firstActive}
            color="#111111"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider"
          />
        </motion.div>
      )}

      {/* Second Screen - Black Background */}
      {isSecondPhase && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <TypingText
            text={SECOND_LINE}
            active={secondActive}
            color="#ffffff"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em]"
          />
        </motion.div>
      )}
    </motion.div>
  );
}