import type { Message } from '@/types';

export const schedulingConversation: Message[] = [
  {
    id: '1',
    role: 'user',
    text: "Hi, I'd like to schedule a demo.",
    timestamp: 0,
  },
  {
    id: '2',
    role: 'agent',
    text: "I'd be happy to help you schedule a demo. What day works best for you?",
    timestamp: 1500,
  },
  {
    id: '3',
    role: 'user',
    text: 'How about next Tuesday?',
    timestamp: 4000,
  },
  {
    id: '4',
    role: 'agent',
    text: "Tuesday works great. I have openings at 10am, 2pm, and 4pm. Which would you prefer?",
    timestamp: 5500,
  },
  {
    id: '5',
    role: 'user',
    text: "2pm sounds perfect.",
    timestamp: 8000,
  },
  {
    id: '6',
    role: 'agent',
    text: "Excellent! I've scheduled your demo for Tuesday at 2pm. You'll receive a calendar invite shortly. Is there anything specific you'd like us to cover?",
    timestamp: 9500,
  },
];

export const supportConversation: Message[] = [
  {
    id: '1',
    role: 'user',
    text: "I can't log into my account.",
    timestamp: 0,
  },
  {
    id: '2',
    role: 'agent',
    text: "I'm sorry you're having trouble logging in. Let me help you with that. Are you seeing a specific error message?",
    timestamp: 1500,
  },
  {
    id: '3',
    role: 'user',
    text: 'It says my password is incorrect, but I know it\'s right.',
    timestamp: 4000,
  },
  {
    id: '4',
    role: 'agent',
    text: "That's frustrating. I can help reset your password. I'll send a reset link to the email associated with your account. Would you like me to do that?",
    timestamp: 5500,
  },
];

export const orderConversation: Message[] = [
  {
    id: '1',
    role: 'user',
    text: "I'd like to order my usual.",
    timestamp: 0,
  },
  {
    id: '2',
    role: 'agent',
    text: "Of course! I see your usual order is a large cappuccino with oat milk and a blueberry muffin. Should I place that order now?",
    timestamp: 1500,
  },
  {
    id: '3',
    role: 'user',
    text: 'Yes, please.',
    timestamp: 4000,
  },
  {
    id: '4',
    role: 'agent',
    text: "Done! Your order will be ready for pickup in about 10 minutes. The total is $8.50, charged to your card on file ending in 4242.",
    timestamp: 5000,
  },
];
