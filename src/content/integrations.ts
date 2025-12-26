import type { Integration } from '@/types';

export const integrations: Integration[] = [
  {
    id: 'calendar',
    label: 'Calendar',
    category: 'action',
    description: 'Schedule appointments and manage availability',
    example: {
      user: 'Can you book me a dentist appointment next Tuesday?',
      agent: "I found an opening at 2pm on Tuesday with Dr. Smith. Should I book that for you?",
    },
    position: { x: 0.7, y: -0.3 },
  },
  {
    id: 'crm',
    label: 'CRM',
    category: 'knowledge',
    description: 'Access customer information and history',
    example: {
      user: 'What was my last order?',
      agent: 'Your last order was on December 15th - a subscription renewal for the Pro plan.',
    },
    position: { x: 0.8, y: 0.2 },
  },
  {
    id: 'database',
    label: 'Database',
    category: 'knowledge',
    description: 'Query and update business data',
    example: {
      user: 'Is the blue jacket still in stock?',
      agent: 'Yes, we have the blue jacket in sizes S, M, and XL. Would you like me to check a specific size?',
    },
    position: { x: 0.6, y: 0.5 },
  },
  {
    id: 'payment',
    label: 'Payments',
    category: 'action',
    description: 'Process transactions securely',
    example: {
      user: "I'd like to pay my balance.",
      agent: 'Your current balance is $45.00. Would you like to pay with the card ending in 4242?',
    },
    position: { x: -0.7, y: -0.2 },
  },
  {
    id: 'tickets',
    label: 'Support Tickets',
    category: 'action',
    description: 'Create and manage support tickets',
    example: {
      user: 'I need help with a billing issue.',
      agent: "I've created a support ticket for your billing issue. A specialist will follow up within 24 hours.",
    },
    position: { x: -0.6, y: 0.4 },
  },
  {
    id: 'phone',
    label: 'Phone',
    category: 'channel',
    description: 'Inbound and outbound voice calls',
    example: {
      user: 'Can I speak to someone?',
      agent: "I'll connect you with a team member right away. Please hold for just a moment.",
    },
    position: { x: 0.3, y: -0.7 },
  },
  {
    id: 'sms',
    label: 'SMS',
    category: 'channel',
    description: 'Send and receive text messages',
    example: {
      user: 'Send me a confirmation text.',
      agent: "Done! I've sent a confirmation to your phone number ending in 5678.",
    },
    position: { x: -0.3, y: -0.7 },
  },
  {
    id: 'email',
    label: 'Email',
    category: 'channel',
    description: 'Send email notifications and updates',
    example: {
      user: 'Email me the receipt.',
      agent: "I've sent the receipt to your email address. You should receive it within a few minutes.",
    },
    position: { x: -0.5, y: -0.5 },
  },
  {
    id: 'handoff',
    label: 'Human Handoff',
    category: 'orchestration',
    description: 'Seamlessly transfer to human agents',
    example: {
      user: 'This is too complex, I need a person.',
      agent: "I understand. Let me connect you with a specialist who can help. They'll have all the context from our conversation.",
    },
    position: { x: 0.0, y: 0.8 },
  },
  {
    id: 'routing',
    label: 'Smart Routing',
    category: 'orchestration',
    description: 'Route conversations to the right team',
    example: {
      user: 'I have a technical question about API limits.',
      agent: "I'll connect you with our technical team. One moment please.",
    },
    position: { x: -0.8, y: 0.1 },
  },
];
