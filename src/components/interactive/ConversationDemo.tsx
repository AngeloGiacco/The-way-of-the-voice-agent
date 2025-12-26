'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
}

const sampleConversation: Message[] = [
  { id: '1', role: 'user', text: "Hi, I'd like to schedule a demo.", timestamp: 0 },
  { id: '2', role: 'agent', text: "I'd be happy to help you schedule a demo. What day works best for you?", timestamp: 1500 },
  { id: '3', role: 'user', text: 'How about next Tuesday?', timestamp: 4000 },
  { id: '4', role: 'agent', text: "Tuesday works great. I have openings at 10am, 2pm, and 4pm. Which would you prefer?", timestamp: 5500 },
  { id: '5', role: 'user', text: '2pm sounds perfect.', timestamp: 8000 },
  { id: '6', role: 'agent', text: "Excellent! I've scheduled your demo for Tuesday at 2pm. You'll receive a calendar invite shortly. Is there anything specific you'd like us to cover?", timestamp: 9500 },
];

export function ConversationDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying || currentIndex >= sampleConversation.length) return;

    const nextMessage = sampleConversation[currentIndex];
    const delay =
      currentIndex === 0
        ? 500
        : nextMessage.timestamp - sampleConversation[currentIndex - 1].timestamp;

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, nextMessage]);
      setCurrentIndex((prev) => prev + 1);

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    if (currentIndex >= sampleConversation.length) {
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const handlePlay = () => {
    if (currentIndex >= sampleConversation.length) {
      setMessages([]);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setMessages([]);
    setCurrentIndex(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              'w-3 h-3 rounded-full',
              isPlaying ? 'bg-signal-bright-1' : 'bg-text-tertiary'
            )}
            animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-medium">Demo Agent</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="h-80 overflow-y-auto p-6 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] px-4 py-3 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-signal-cool-1 text-white'
                    : 'bg-surface-elevated text-text-primary'
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isPlaying && currentIndex < sampleConversation.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-surface-elevated px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <motion.span
                  className="w-2 h-2 rounded-full bg-text-tertiary"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 rounded-full bg-text-tertiary"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                />
                <motion.span
                  className="w-2 h-2 rounded-full bg-text-tertiary"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-t border-white/5">
        {!isPlaying && currentIndex === 0 ? (
          <button
            onClick={handlePlay}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-signal-warm-1 via-signal-cool-1 to-signal-bright-1 text-background font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Watch Demo Conversation
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="px-6 py-2 rounded-lg bg-surface-elevated hover:bg-surface-hover transition-colors flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Continue
                </>
              )}
            </button>
            <span className="text-sm text-text-secondary">
              {currentIndex >= sampleConversation.length
                ? 'Conversation complete'
                : `${currentIndex}/${sampleConversation.length} messages`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
