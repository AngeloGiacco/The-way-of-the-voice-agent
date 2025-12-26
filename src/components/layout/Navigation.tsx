'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { useScrollStore } from '@/stores/scrollStore';
import { chapters } from '@/content/chapters';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const { progress, activeChapter, setActiveChapter } = useScrollStore();

  useEffect(() => {
    setIsVisible(progress > 0.05);

    const chapterThresholds = [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85];
    for (let i = chapterThresholds.length - 1; i >= 0; i--) {
      if (progress >= chapterThresholds[i]) {
        setActiveChapter(chapters[i].id);
        break;
      }
    }
  }, [progress, setActiveChapter]);

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
          <ul className="space-y-3">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  onClick={() => scrollToChapter(chapter.id)}
                  className={cn(
                    'flex items-center gap-3 group transition-opacity',
                    activeChapter === chapter.id
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  )}
                >
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      activeChapter === chapter.id
                        ? 'bg-signal-bright-1 scale-125'
                        : 'bg-white/30 group-hover:bg-white/50'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm transition-all',
                      activeChapter === chapter.id
                        ? 'text-white font-medium'
                        : 'text-white/50 group-hover:text-white/70'
                    )}
                  >
                    {chapter.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
