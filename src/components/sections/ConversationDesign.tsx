'use client';

import { motion } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';

const sections = [
  {
    id: 'persona',
    icon: User,
    title: 'Persona & Voice',
    description:
      'Your agent is a character. Every character needs identity, consistency, and boundaries.',
    details: [
      {
        title: 'Identity',
        text: "Who are they? A helpful assistant? A knowledgeable expert? A friendly guide? This isn't just branding—it shapes every word choice, every pause, every response.",
      },
      {
        title: 'Consistency',
        text: "The agent that's formal in one response and casual in the next feels broken. Voice, vocabulary, and manner should be rock-solid consistent.",
      },
      {
        title: 'Boundaries',
        text: "What will your agent discuss? What won't it? Boundaries aren't limitations—they're definition. A character without boundaries is no character at all.",
      },
    ],
  },
  {
    id: 'turn-taking',
    icon: MessageSquare,
    title: 'The Turn-Taking Dance',
    description:
      "Human conversation is a duet, not a monologue. We don't wait for complete silence to respond.",
    details: [
      {
        title: 'When to speak',
        text: 'Too fast feels robotic. Too slow feels dumb. The sweet spot depends on context.',
      },
      {
        title: 'When to listen',
        text: 'Detecting true turn-completion vs. a pause for thought is hard. Cutting someone off is worse than waiting too long.',
      },
      {
        title: 'When to interrupt yourself',
        text: 'The user started speaking while your agent was talking. Stop. Listen. This is the single most important turn-taking behavior.',
      },
      {
        title: 'Back-channels',
        text: '"Mm-hmm." "I see." "Got it." These aren\'t words—they\'re signals. They say "I\'m here, I\'m listening, continue."',
      },
    ],
  },
  {
    id: 'error-recovery',
    icon: AlertCircle,
    title: 'Error Recovery',
    description:
      "Users will say things your agent doesn't understand. Grace under pressure matters.",
    details: [
      {
        title: 'Clarification without condescension',
        text: '"I didn\'t quite catch that" not "Please repeat your request clearly."',
      },
      {
        title: 'Partial understanding',
        text: '"I heard you mention Thursday—were you asking about scheduling?" Confirm what you got, ask about what you missed.',
      },
      {
        title: 'Graceful limits',
        text: '"I\'m not able to help with that, but I can..." Always offer a path forward.',
      },
      {
        title: 'Recovery, not restart',
        text: "Don't make the user repeat everything. Remember context. Pick up where you can.",
      },
    ],
  },
  {
    id: 'emotional',
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'Voice carries emotion. Recognize it. Respond to it.',
    details: [
      {
        title: 'Detect frustration',
        text: 'Repeated questions, sharp tone, explicit statements. When detected, acknowledge it. Slow down. Offer alternatives.',
      },
      {
        title: 'Match energy appropriately',
        text: "An excited user sharing good news doesn't want a monotone response. A stressed user doesn't want excessive enthusiasm.",
      },
      {
        title: 'Know when to hand off',
        text: 'Some situations need a human. Recognize them. Make the transition smooth.',
      },
    ],
  },
];

export function ConversationDesign() {
  return (
    <section id="design" className="section bg-surface">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-2 mb-4">Conversation Design</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="heading-3 text-signal-warm-1 mb-6">
            Infrastructure is necessary. Design is everything.
          </p>
        </ScrollReveal>

        <div className="max-w-text mb-16">
          <ScrollReveal delay={0.2}>
            <p className="body-large text-text-secondary">
              The difference between a voice agent that feels like a phone tree
              and one that feels like talking to a helpful person? It&apos;s not
              the model. It&apos;s not the latency. It&apos;s the thousand small
              decisions about how the conversation flows.
            </p>
          </ScrollReveal>
        </div>

        {/* Design Principles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <ScrollReveal key={section.id} delay={0.1 * index}>
              <Card className="h-full">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-signal-cool-1/20 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <section.icon className="w-6 h-6 text-signal-cool-1" />
                  </motion.div>
                  <div>
                    <h3 className="heading-4 mb-2">{section.title}</h3>
                    <p className="text-text-secondary text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detail.title}
                      className="border-l-2 border-signal-cool-1/30 pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: detailIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-sm font-medium text-text-primary mb-1">
                        {detail.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {detail.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
