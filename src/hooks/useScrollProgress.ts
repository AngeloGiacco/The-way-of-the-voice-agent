'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/stores/scrollStore';

export function useScrollProgress() {
  const { progress, setProgress, setDirection } = useScrollStore();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(Math.max(currentProgress, 0), 1));

      // Determine direction
      if (window.scrollY > lastScrollY.current) {
        setDirection('down');
      } else if (window.scrollY < lastScrollY.current) {
        setDirection('up');
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setProgress, setDirection]);

  return progress;
}
