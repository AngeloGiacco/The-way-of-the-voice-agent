'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '@/stores/audioStore';

export function AudioToggle() {
  const { isEnabled, setEnabled, setInitialized } = useAudioStore();

  const handleToggle = async () => {
    const newEnabled = !isEnabled;
    setEnabled(newEnabled);

    if (newEnabled) {
      setInitialized(true);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-surface-hover transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isEnabled ? 'Mute audio' : 'Enable audio'}
    >
      <AnimatePresence mode="wait">
        {isEnabled ? (
          <motion.div
            key="on"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Volume2 className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <VolumeX className="w-5 h-5 text-text-secondary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
