'use client';

import { motion } from 'framer-motion';
import { Mic, Waves, Brain, Volume2, Speaker } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils/cn';

const stages = [
  { id: 'voice-in', label: 'Voice', color: 'warm', icon: Mic },
  { id: 'stt', label: 'Speech to Text', color: 'warm', icon: Waves },
  { id: 'llm', label: 'Language Model', color: 'cool', icon: Brain },
  { id: 'tts', label: 'Text to Speech', color: 'cool', icon: Volume2 },
  { id: 'voice-out', label: 'Voice', color: 'bright', icon: Speaker },
];

const colorClasses = {
  warm: 'bg-signal-warm-1 text-background',
  cool: 'bg-signal-cool-1 text-white',
  bright: 'bg-signal-bright-1 text-background',
};

const glowClasses = {
  warm: 'shadow-[0_0_30px_rgba(245,166,35,0.4)]',
  cool: 'shadow-[0_0_30px_rgba(107,92,231,0.4)]',
  bright: 'shadow-[0_0_30px_rgba(0,212,170,0.4)]',
};

export function TheMedium() {
  return (
    <section id="medium" className="section bg-background">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-8">The Medium</h2>
        </ScrollReveal>

        <div className="max-w-text">
          <ScrollReveal delay={0.1}>
            <p className="body-large text-text-secondary mb-16">
              Every voice conversation is a small miracle of engineering.
            </p>
          </ScrollReveal>
        </div>

        {/* Pipeline Visualization */}
        <ScrollReveal delay={0.2}>
          <div className="relative py-16 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[700px] max-w-4xl mx-auto">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={cn(
                        'w-16 h-16 rounded-full flex items-center justify-center',
                        colorClasses[stage.color as keyof typeof colorClasses],
                        glowClasses[stage.color as keyof typeof glowClasses]
                      )}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          `0 0 20px rgba(107,92,231,0.2)`,
                          `0 0 40px rgba(107,92,231,0.4)`,
                          `0 0 20px rgba(107,92,231,0.2)`,
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <stage.icon className="w-7 h-7" />
                    </motion.div>
                    <span className="mt-3 text-sm text-text-secondary text-center max-w-[80px]">
                      {stage.label}
                    </span>
                  </motion.div>

                  {/* Connection line */}
                  {index < stages.length - 1 && (
                    <div className="relative w-16 mx-2">
                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-signal-warm-1 via-signal-cool-1 to-signal-bright-1"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{ originX: 0 }}
                      />
                      {/* Animated pulse */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal-bright-1"
                        animate={{
                          x: [0, 64, 0],
                          opacity: [1, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-text mx-auto">
          <ScrollReveal delay={0.3}>
            <p className="body-large text-text-secondary mb-6">
              Sound waves from a human mouth travel through air, hit a
              microphone, become electrical signals, get digitized, compressed,
              sent across networks, decompressed, analyzed by neural networks
              trained on millions of hours of speech, converted to text,
              processed by large language models with billions of parameters,
              transformed back to text meant for speaking, synthesized into
              audio, compressed again, transmitted, decompressed, converted to
              electrical signals, and pushed through a speaker—
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="heading-3 text-signal-bright-1 mb-12">
              All in less time than it takes to blink.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="body-large text-text-secondary mb-8">
              The infrastructure required to make this reliable at scale is
              immense. The good news: you don&apos;t need to build it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="body-large text-text-primary font-medium">
              Your job is more interesting. Your job is to make the conversation{' '}
              <em className="text-signal-bright-1 not-italic">good</em>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
