'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wrench, Plug, Rocket, Crown, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

const stages = [
  {
    id: 'experiment',
    number: 1,
    title: 'Experiment',
    icon: Sparkles,
    description: 'Build your first agent in minutes. No infrastructure, no complexity.',
    learns: 'What voice agents feel like. What\'s possible. What excites you.',
    color: 'signal-warm-1',
  },
  {
    id: 'refine',
    number: 2,
    title: 'Refine',
    icon: Wrench,
    description: 'Iterate on conversation design. Test with real scenarios.',
    learns: 'The craft of conversation. The details that separate good from great.',
    color: 'signal-warm-2',
  },
  {
    id: 'integrate',
    number: 3,
    title: 'Integrate',
    icon: Plug,
    description: 'Connect your agent to knowledge bases and actions.',
    learns: 'The power of context. The importance of capabilities.',
    color: 'signal-cool-1',
  },
  {
    id: 'deploy',
    number: 4,
    title: 'Deploy',
    icon: Rocket,
    description: 'Move to production. Handle real users. Monitor, learn, improve.',
    learns: 'What real usage teaches you. The feedback loop that makes agents better.',
    color: 'signal-cool-2',
  },
  {
    id: 'scale',
    number: 5,
    title: 'Scale',
    icon: Crown,
    description: 'Handle thousands of concurrent conversations.',
    learns: 'The patterns that work at scale. The orchestration of complex systems.',
    color: 'signal-bright-1',
  },
];

export function PathForward() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="path" className="section bg-surface">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-4">The Path Forward</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="heading-3 text-signal-warm-1 mb-6">
            Every expert was once a beginner.
          </p>
        </ScrollReveal>

        <div className="max-w-text mb-16">
          <ScrollReveal delay={0.2}>
            <p className="body-large text-text-secondary">
              The path from &quot;hello world&quot; to production-grade voice agents
              isn&apos;t mysterious. It&apos;s a series of learnable steps, each building
              on the last.
            </p>
          </ScrollReveal>
        </div>

        {/* Journey Path */}
        <ScrollReveal delay={0.3}>
          <div className="relative mb-16">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-surface-elevated">
              <motion.div
                className="h-full bg-gradient-to-r from-signal-warm-1 via-signal-cool-1 to-signal-bright-1"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: (activeStage + 1) / stages.length }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />
            </div>

            {/* Stage Cards */}
            <div className="grid md:grid-cols-5 gap-4">
              {stages.map((stage, index) => (
                <motion.button
                  key={stage.id}
                  className={cn(
                    'relative text-left p-4 rounded-xl transition-all',
                    index <= activeStage
                      ? 'bg-surface-elevated'
                      : 'bg-surface/50 opacity-60'
                  )}
                  onClick={() => setActiveStage(index)}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center mb-3',
                      index <= activeStage ? 'bg-signal-cool-1' : 'bg-surface'
                    )}
                    animate={
                      index === activeStage
                        ? {
                            boxShadow: [
                              '0 0 0px rgba(107,92,231,0)',
                              '0 0 20px rgba(107,92,231,0.5)',
                              '0 0 0px rgba(107,92,231,0)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <stage.icon
                      className={cn(
                        'w-5 h-5',
                        index <= activeStage ? 'text-white' : 'text-text-tertiary'
                      )}
                    />
                  </motion.div>

                  <div className="text-xs text-text-tertiary mb-1">
                    Stage {stage.number}
                  </div>
                  <h3 className="font-medium mb-2">{stage.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {stage.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Active Stage Detail */}
        <ScrollReveal delay={0.4}>
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated mb-4">
              {(() => {
                const StageIcon = stages[activeStage].icon;
                return <StageIcon className="w-4 h-4 text-signal-cool-1" />;
              })()}
              <span className="text-sm font-medium">
                {stages[activeStage].title}
              </span>
            </div>
            <p className="body-large text-text-secondary mb-4">
              {stages[activeStage].description}
            </p>
            <p className="text-text-secondary">
              <span className="text-signal-bright-1 font-medium">You&apos;ll learn: </span>
              {stages[activeStage].learns}
            </p>
          </motion.div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center">
            <p className="heading-3 mb-8">
              The best way to learn is to{' '}
              <span className="gradient-text">build</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Start Building
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="lg">
                Read the Documentation
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
