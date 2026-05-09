"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "@/app/components/loading/loadingScreen";
import HeroSection from "@/app/components/hero/heroSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main>
      <HeroSection />
    </main>
  );
}