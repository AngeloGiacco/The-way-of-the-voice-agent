'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, TestTube, Workflow, RotateCcw } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

interface Version {
  id: string;
  label: string;
  date: string;
  changes: string[];
  metrics: {
    satisfaction: number;
    completionRate: number;
    avgLatency: number;
  };
}

const versions: Version[] = [
  {
    id: 'v1.0',
    label: 'Initial Release',
    date: 'Week 1',
    changes: ['Basic conversation flow', 'Simple persona'],
    metrics: { satisfaction: 72, completionRate: 65, avgLatency: 450 },
  },
  {
    id: 'v1.1',
    label: 'Improved Turn-Taking',
    date: 'Week 2',
    changes: ['Reduced interruption threshold', 'Added back-channels'],
    metrics: { satisfaction: 78, completionRate: 71, avgLatency: 420 },
  },
  {
    id: 'v1.2',
    label: 'Error Recovery',
    date: 'Week 3',
    changes: ['Better clarification prompts', 'Context preservation'],
    metrics: { satisfaction: 82, completionRate: 79, avgLatency: 410 },
  },
  {
    id: 'v2.0',
    label: 'Major Update',
    date: 'Week 4',
    changes: ['New persona', 'Emotional detection', 'Knowledge base'],
    metrics: { satisfaction: 88, completionRate: 85, avgLatency: 380 },
  },
];

const concepts = [
  {
    icon: GitBranch,
    title: 'Versioning',
    description:
      'Your agent is a system—prompt, guardrails, tools, voice, timing. All versioned together.',
    benefits: [
      'Rollback: One click to restore working version',
      'A/B testing: Run versions simultaneously',
      'Audit trail: What changed, when, why',
      'Confidence: Experiment freely',
    ],
  },
  {
    icon: TestTube,
    title: 'Testing',
    description:
      'How do you test something about feel? With automated and human evaluation.',
    benefits: [
      'Automated conversation simulations',
      'Latency testing with percentile tracking',
      'Persona consistency checks',
      'Edge case libraries',
    ],
  },
  {
    icon: Workflow,
    title: 'Workflows',
    description:
      "Moving from development to production shouldn't be scary.",
    benefits: [
      'Staging environments',
      'Gradual rollouts',
      'Monitoring dashboards',
      'Real-time alerting',
    ],
  },
];

export function IterationLoop() {
  const [selectedVersion, setSelectedVersion] = useState(versions[versions.length - 1]);

  return (
    <section id="iteration" className="section bg-background">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-4">The Iteration Loop</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="heading-3 text-signal-cool-1 mb-6">
            Voice agents aren&apos;t shipped. They&apos;re cultivated.
          </p>
        </ScrollReveal>

        <div className="max-w-text mb-16">
          <ScrollReveal delay={0.2}>
            <p className="body-large text-text-secondary">
              The first version of your agent will be wrong. The tenth will be
              better. The hundredth will be good. This isn&apos;t failure—it&apos;s
              the nature of conversational AI.
            </p>
          </ScrollReveal>
        </div>

        {/* Version Timeline */}
        <ScrollReveal delay={0.3}>
          <Card className="mb-16">
            <h3 className="heading-4 mb-6 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-signal-cool-1" />
              Version History
            </h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-surface-elevated" />

                {versions.map((version, index) => (
                  <motion.button
                    key={version.id}
                    className={cn(
                      'relative pl-12 pb-6 w-full text-left transition-opacity',
                      selectedVersion.id === version.id
                        ? 'opacity-100'
                        : 'opacity-60 hover:opacity-80'
                    )}
                    onClick={() => setSelectedVersion(version)}
                    whileHover={{ x: 4 }}
                  >
                    <motion.div
                      className={cn(
                        'absolute left-2 top-1 w-5 h-5 rounded-full border-2',
                        selectedVersion.id === version.id
                          ? 'bg-signal-bright-1 border-signal-bright-1'
                          : 'bg-surface border-surface-elevated'
                      )}
                      animate={
                        selectedVersion.id === version.id
                          ? { scale: [1, 1.2, 1] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    />

                    <div className="text-sm text-text-tertiary">
                      {version.date}
                    </div>
                    <div className="font-medium">{version.label}</div>
                    <div className="text-sm text-text-tertiary">{version.id}</div>
                  </motion.button>
                ))}
              </div>

              {/* Metrics */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVersion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Changes</h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {selectedVersion.changes.map((change) => (
                        <li key={change} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-signal-bright-1" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <MetricCard
                      label="Satisfaction"
                      value={selectedVersion.metrics.satisfaction}
                      format={(v) => `${v}%`}
                    />
                    <MetricCard
                      label="Completion"
                      value={selectedVersion.metrics.completionRate}
                      format={(v) => `${v}%`}
                    />
                    <MetricCard
                      label="Latency"
                      value={selectedVersion.metrics.avgLatency}
                      format={(v) => `${v}ms`}
                      lowerIsBetter
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </ScrollReveal>

        {/* Concepts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <ScrollReveal key={concept.title} delay={0.1 * index}>
              <Card className="h-full">
                <div className="w-12 h-12 rounded-xl bg-signal-cool-1/20 flex items-center justify-center mb-4">
                  <concept.icon className="w-6 h-6 text-signal-cool-1" />
                </div>
                <h3 className="heading-4 mb-2">{concept.title}</h3>
                <p className="text-text-secondary text-sm mb-4">
                  {concept.description}
                </p>
                <ul className="space-y-2">
                  {concept.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="w-1 h-1 rounded-full bg-signal-bright-1 mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  format,
  lowerIsBetter = false,
}: {
  label: string;
  value: number;
  format: (v: number) => string;
  lowerIsBetter?: boolean;
}) {
  const percentage = lowerIsBetter
    ? ((500 - value) / 500) * 100
    : value;

  return (
    <div className="bg-surface-elevated rounded-lg p-4">
      <div className="text-xs text-text-tertiary mb-1">{label}</div>
      <div className="text-xl font-display font-semibold mb-2">
        {format(value)}
      </div>
      <div className="h-1 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-signal-bright-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
