'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Calendar,
  Database,
  CreditCard,
  Ticket,
  Phone,
  MessageSquare,
  Mail,
  Users,
  Shuffle,
  X,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';

const integrations = [
  {
    id: 'calendar',
    label: 'Calendar',
    category: 'action',
    icon: Calendar,
    description: 'Schedule appointments and manage availability',
    example: {
      user: 'Can you book me a dentist appointment next Tuesday?',
      agent: "I found an opening at 2pm on Tuesday with Dr. Smith. Should I book that for you?",
    },
  },
  {
    id: 'database',
    label: 'Knowledge Base',
    category: 'knowledge',
    icon: Database,
    description: 'Access and query business data',
    example: {
      user: 'Is the blue jacket still in stock?',
      agent: 'Yes, we have the blue jacket in sizes S, M, and XL. Would you like me to check a specific size?',
    },
  },
  {
    id: 'payment',
    label: 'Payments',
    category: 'action',
    icon: CreditCard,
    description: 'Process transactions securely',
    example: {
      user: "I'd like to pay my balance.",
      agent: 'Your current balance is $45.00. Would you like to pay with the card ending in 4242?',
    },
  },
  {
    id: 'tickets',
    label: 'Support',
    category: 'action',
    icon: Ticket,
    description: 'Create and manage support tickets',
    example: {
      user: 'I need help with a billing issue.',
      agent: "I've created a support ticket for your billing issue. A specialist will follow up within 24 hours.",
    },
  },
  {
    id: 'phone',
    label: 'Phone',
    category: 'channel',
    icon: Phone,
    description: 'Inbound and outbound voice calls',
    example: {
      user: 'Can I speak to someone?',
      agent: "I'll connect you with a team member right away. Please hold for just a moment.",
    },
  },
  {
    id: 'sms',
    label: 'SMS',
    category: 'channel',
    icon: MessageSquare,
    description: 'Send and receive text messages',
    example: {
      user: 'Send me a confirmation text.',
      agent: "Done! I've sent a confirmation to your phone number ending in 5678.",
    },
  },
  {
    id: 'email',
    label: 'Email',
    category: 'channel',
    icon: Mail,
    description: 'Send email notifications',
    example: {
      user: 'Email me the receipt.',
      agent: "I've sent the receipt to your email address. You should receive it within a few minutes.",
    },
  },
  {
    id: 'handoff',
    label: 'Human Handoff',
    category: 'orchestration',
    icon: Users,
    description: 'Transfer to human agents seamlessly',
    example: {
      user: 'This is too complex, I need a person.',
      agent: "I understand. Let me connect you with a specialist who can help.",
    },
  },
  {
    id: 'routing',
    label: 'Smart Routing',
    category: 'orchestration',
    icon: Shuffle,
    description: 'Route to the right team',
    example: {
      user: 'I have a technical question about API limits.',
      agent: "I'll connect you with our technical team. One moment please.",
    },
  },
];

const categoryColors = {
  knowledge: 'bg-signal-warm-1',
  action: 'bg-signal-cool-1',
  channel: 'bg-signal-bright-1',
  orchestration: 'bg-purple-500',
};

const categoryLabels = {
  knowledge: 'Knowledge & Context',
  action: 'Actions',
  channel: 'Channels',
  orchestration: 'Orchestration',
};

export function Connections() {
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrations[0] | null>(null);

  return (
    <section id="connections" className="section bg-surface">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-4">The Connections</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="heading-3 text-signal-bright-1 mb-6">
            A voice agent alone is a demo. Connected to the world, it&apos;s a product.
          </p>
        </ScrollReveal>

        <div className="max-w-text mb-16">
          <ScrollReveal delay={0.2}>
            <p className="body-large text-text-secondary">
              The moment your agent can actually do things—check calendars, look
              up information, take actions—is the moment it becomes useful.
            </p>
          </ScrollReveal>
        </div>

        {/* Constellation Visualization */}
        <ScrollReveal delay={0.3}>
          <div className="relative py-16">
            <div className="flex flex-col items-center">
              {/* Central Agent Node */}
              <motion.div
                className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-16"
                style={{
                  background: 'linear-gradient(135deg, var(--color-signal-warm-1), var(--color-signal-cool-1), var(--color-signal-bright-1))',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(107,92,231,0.3)',
                    '0 0 40px rgba(107,92,231,0.5)',
                    '0 0 20px rgba(107,92,231,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-10 h-10 text-background" />
              </motion.div>

              {/* Category Legend */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'w-3 h-3 rounded-full',
                        categoryColors[key as keyof typeof categoryColors]
                      )}
                    />
                    <span className="text-sm text-text-secondary">{label}</span>
                  </div>
                ))}
              </div>

              {/* Integration Grid */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl">
                {integrations.map((integration, index) => (
                  <motion.button
                    key={integration.id}
                    className="flex flex-col items-center p-4 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors"
                    onClick={() => setSelectedIntegration(integration)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center mb-2',
                        categoryColors[integration.category as keyof typeof categoryColors]
                      )}
                    >
                      <integration.icon className="w-5 h-5 text-background" />
                    </div>
                    <span className="text-xs text-text-secondary text-center">
                      {integration.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Integration Detail Modal */}
        <AnimatePresence>
          {selectedIntegration && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntegration(null)}
            >
              <motion.div
                className="relative max-w-lg w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="relative">
                  <button
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-hover transition-colors"
                    onClick={() => setSelectedIntegration(null)}
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        categoryColors[selectedIntegration.category as keyof typeof categoryColors]
                      )}
                    >
                      <selectedIntegration.icon className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h3 className="heading-4">{selectedIntegration.label}</h3>
                      <p className="text-sm text-text-secondary">
                        {selectedIntegration.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-elevated rounded-lg p-4">
                    <p className="text-sm text-text-tertiary mb-2">Example conversation</p>
                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-signal-cool-1 text-white px-4 py-2 rounded-2xl max-w-[80%]">
                          <p className="text-sm">{selectedIntegration.example.user}</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-surface text-text-primary px-4 py-2 rounded-2xl max-w-[80%]">
                          <p className="text-sm">{selectedIntegration.example.agent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
