'use client';

import { create } from 'zustand';

interface InteractionState {
  hasInteracted: boolean;
  interactedElements: Set<string>;
  setHasInteracted: (value: boolean) => void;
  addInteractedElement: (id: string) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  hasInteracted: false,
  interactedElements: new Set(),
  setHasInteracted: (hasInteracted) => set({ hasInteracted }),
  addInteractedElement: (id) =>
    set((state) => ({
      interactedElements: new Set(state.interactedElements).add(id),
    })),
}));
