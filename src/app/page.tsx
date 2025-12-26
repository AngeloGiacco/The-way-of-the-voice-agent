'use client';

import { useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

import { Navigation } from '@/components/layout/Navigation';
import { ProgressBar } from '@/components/layout/ProgressBar';
import { AudioToggle } from '@/components/layout/AudioToggle';

import { Hero } from '@/components/sections/Hero';
import { TheMedium } from '@/components/sections/TheMedium';
import { ConversationDesign } from '@/components/sections/ConversationDesign';
import { IterationLoop } from '@/components/sections/IterationLoop';
import { Connections } from '@/components/sections/Connections';
import { Reliability } from '@/components/sections/Reliability';
import { PathForward } from '@/components/sections/PathForward';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  // Initialize scroll tracking
  useScrollProgress();

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Layout Components */}
      <ProgressBar />
      <Navigation />
      <AudioToggle />

      {/* Sections */}
      <Hero />
      <TheMedium />
      <ConversationDesign />
      <IterationLoop />
      <Connections />
      <Reliability />
      <PathForward />
      <Footer />
    </main>
  );
}
