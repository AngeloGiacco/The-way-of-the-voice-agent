'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Zap, HeartPulse, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';

const metrics = [
  {
    label: 'Uptime',
    value: '99.99%',
    description: '52 minutes downtime per year. Maximum.',
    icon: Shield,
    color: 'signal-bright-1',
  },
  {
    label: 'Latency',
    value: '<500ms',
    description: 'First word within 500ms of turn completion. Consistently.',
    icon: Clock,
    color: 'signal-cool-1',
  },
  {
    label: 'Quality',
    value: '100%',
    description: 'Transcription is accurate. Synthesis is clear.',
    icon: Zap,
    color: 'signal-warm-1',
  },
  {
    label: 'Graceful',
    value: 'Always',
    description: 'When something goes wrong, fail gracefully.',
    icon: HeartPulse,
    color: 'purple-500',
  },
];

const handled = [
  'Redundant speech recognition across providers',
  'Automatic failover for synthesis',
  'Geographic distribution for low latency everywhere',
  'Real-time monitoring and alerting',
  'Circuit breakers that protect from cascade failures',
];

const yourFocus = [
  'Design quality: Conversations that don\'t confuse users',
  'Guard rails: Boundaries that prevent going off-track',
  'Testing: Catching issues before users do',
  'Monitoring: Watching conversation-level metrics',
];

export function Reliability() {
  return (
    <section id="reliability" className="section bg-background">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-4">The Reliability</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="heading-3 text-text-primary mb-6">
            Every dropped call is a broken promise.
          </p>
        </ScrollReveal>

        <div className="max-w-text mb-16">
          <ScrollReveal delay={0.2}>
            <p className="body-large text-text-secondary">
              Users don&apos;t think about infrastructure. They think about whether
              your agent works. Works every time. Works fast. Works when they
              need it. <span className="text-signal-bright-1">99.99% uptime isn&apos;t a number. It&apos;s trust.</span>
            </p>
          </ScrollReveal>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={0.1 * index}>
              <Card className="text-center h-full">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-${metric.color}/20 flex items-center justify-center mx-auto mb-4`}
                  style={{
                    backgroundColor: `rgb(var(--color-${metric.color}) / 0.2)`,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <metric.icon
                    className="w-6 h-6"
                    style={{ color: `var(--color-${metric.color})` }}
                  />
                </motion.div>
                <div className="text-3xl font-display font-bold mb-1 gradient-text">
                  {metric.value}
                </div>
                <div className="text-sm font-medium mb-2">{metric.label}</div>
                <p className="text-xs text-text-tertiary">{metric.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Status Dashboard */}
        <ScrollReveal delay={0.3}>
          <Card variant="glow" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-3 h-3 rounded-full bg-signal-bright-1"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(0,212,170,0.5)',
                    '0 0 20px rgba(0,212,170,0.5)',
                    '0 0 0px rgba(0,212,170,0.5)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-medium">All Systems Operational</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {['Voice Processing', 'Language Model', 'Speech Synthesis'].map(
                (system, index) => (
                  <div
                    key={system}
                    className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg"
                  >
                    <span className="text-sm">{system}</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Check className="w-5 h-5 text-signal-bright-1" />
                    </motion.div>
                  </div>
                )
              )}
            </div>
          </Card>
        </ScrollReveal>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.4}>
            <Card>
              <h3 className="heading-4 mb-4 text-signal-cool-1">
                What We Handle
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                The cascaded reliability problem is our problem, not yours.
              </p>
              <ul className="space-y-3">
                {handled.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-signal-bright-1 mt-0.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <Card>
              <h3 className="heading-4 mb-4 text-signal-bright-1">
                Your Focus
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                With infrastructure handled, focus on what matters:
              </p>
              <ul className="space-y-3">
                {yourFocus.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-signal-bright-1 mt-0.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
