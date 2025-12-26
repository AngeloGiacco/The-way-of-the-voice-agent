'use client';

import { create } from 'zustand';

interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  activeChapter: string;
  setProgress: (progress: number) => void;
  setDirection: (direction: 'up' | 'down') => void;
  setActiveChapter: (chapter: string) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  direction: 'down',
  activeChapter: 'hero',
  setProgress: (progress) => set({ progress }),
  setDirection: (direction) => set({ direction }),
  setActiveChapter: (activeChapter) => set({ activeChapter }),
}));
