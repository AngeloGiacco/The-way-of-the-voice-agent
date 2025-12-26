'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAudioStore } from '@/stores/audioStore';

export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const { isEnabled, isInitialized, setInitialized } = useAudioStore();

  const initializeAudio = useCallback(async () => {
    if (audioContextRef.current) return audioContextRef.current;

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      setInitialized(true);
      return audioContextRef.current;
    } catch (error) {
      console.error('Failed to initialize AudioContext:', error);
      return null;
    }
  }, [setInitialized]);

  const getAudioContext = useCallback(() => {
    return audioContextRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  return {
    initializeAudio,
    getAudioContext,
    isEnabled,
    isInitialized,
  };
}
