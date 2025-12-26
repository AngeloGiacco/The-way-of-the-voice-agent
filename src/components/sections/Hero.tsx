'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Canvas } from '@/components/three/Canvas';
import { NoiseBackground } from '@/components/three/NoiseBackground';
import { SignalFlowMesh } from '@/components/three/SignalFlowMesh';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <NoiseBackground />
            <SignalFlowMesh />
          </Canvas>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.p
            className="caption mb-8 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ opacity: subtitleOpacity }}
          >
            The space between speaking and being heard
          </motion.p>

          <motion.h1
            className="heading-1 mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <span className="block">THE WAY OF THE</span>
            <span className="gradient-text">VOICE AGENT</span>
          </motion.h1>

          <motion.p
            className="body-large text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{ opacity: subtitleOpacity }}
          >
            A guide to building AI conversations that feel human
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ opacity: subtitleOpacity }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-text-secondary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-sm uppercase tracking-wider">Begin</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
