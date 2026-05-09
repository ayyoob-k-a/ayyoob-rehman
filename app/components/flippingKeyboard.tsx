"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES: string[] = [
  "I BELIEVE IN CODE \nNOT HUMANS.",
  "CODE NEVER LIES \nPEOPLE DO.",
  "TRUST THE LOGIC \nNOT THE NOISE.",
  "IN CODE I TRUST.",
  "BUILD. BREAK. FIX. REPEAT.",
  "LESS TALK \nMORE CODE.",
  "LOGIC OVER EMOTION.",
  "REALITY IS WRITTEN \nIN CODE.",
  "SYSTEM > OPINION.",
  "CODE IS MY LANGUAGE \nSILENCE IS MY REPLY.",
];

export function FlippingKeyboard() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(() => {
    setMsgIdx((i) => (i + 1) % MESSAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}