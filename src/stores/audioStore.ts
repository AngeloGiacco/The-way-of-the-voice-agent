'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isEnabled: boolean;
  isInitialized: boolean;
  volume: number;
  setEnabled: (enabled: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isEnabled: false,
      isInitialized: false,
      volume: 0.5,
      setEnabled: (isEnabled) => set({ isEnabled }),
      setInitialized: (isInitialized) => set({ isInitialized }),
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: 'audio-preferences',
    }
  )
);
