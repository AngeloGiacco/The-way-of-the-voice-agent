'use client';

import { motion, useSpring } from 'framer-motion';
import { useScrollStore } from '@/stores/scrollStore';

export function ProgressBar() {
  const progress = useScrollStore((state) => state.progress);

  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-surface/50">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background:
            'linear-gradient(90deg, var(--color-signal-warm-1), var(--color-signal-cool-1), var(--color-signal-bright-1))',
        }}
      />
    </div>
  );
}
