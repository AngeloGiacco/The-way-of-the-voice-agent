'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: 'default' | 'elevated' | 'glow';
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, className, children, ...props }, ref) => {
    const baseStyles =
      'bg-surface border border-white/[0.06] rounded-xl p-6 transition-all';

    const variants = {
      default: '',
      elevated: 'bg-surface-elevated shadow-lg',
      glow: 'shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.4),0_0_60px_rgba(107,92,231,0.1)]',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        whileHover={
          hover
            ? {
                y: -2,
                backgroundColor: 'rgba(34, 34, 46, 1)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }
            : undefined
        }
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
