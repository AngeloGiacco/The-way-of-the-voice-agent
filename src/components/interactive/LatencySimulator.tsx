'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type Phase = 'idle' | 'listening' | 'processing' | 'speaking';

export function LatencySimulator() {
  const [latency, setLatency] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const simulateConversation = () => {
    clearAllTimeouts();
    setPhase('listening');
    setProgress(0);

    // User speaks (1 second)
    timeoutsRef.current.push(
      setTimeout(() => {
        setPhase('processing');
        setProgress(33);
      }, 1000)
    );

    // Processing (variable latency)
    timeoutsRef.current.push(
      setTimeout(() => {
        setPhase('speaking');
        setProgress(66);
      }, 1000 + latency)
    );

    // Agent speaks (1 second)
    timeoutsRef.current.push(
      setTimeout(() => {
        setPhase('idle');
        setProgress(100);
        setIsPlaying(false);
      }, 2000 + latency)
    );
  };

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearAllTimeouts();
      setPhase('idle');
    } else {
      setIsPlaying(true);
      simulateConversation();
    }
  };

  const handleReset = () => {
    clearAllTimeouts();
    setIsPlaying(false);
    setPhase('idle');
    setProgress(0);
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const getLatencyFeedback = () => {
    if (latency < 200) return { text: 'Excellent', color: 'text-signal-bright-1' };
    if (latency < 400) return { text: 'Good', color: 'text-signal-bright-1' };
    if (latency < 600) return { text: 'Noticeable', color: 'text-signal-warm-1' };
    return { text: 'Poor', color: 'text-signal-warm-2' };
  };

  const feedback = getLatencyFeedback();

  return (
    <div className="bg-surface rounded-2xl p-8 border border-white/5">
      <h4 className="heading-4 mb-6">Feel the Latency</h4>

      {/* Visualization */}
      <div className="relative h-32 mb-8 bg-surface-elevated rounded-xl overflow-hidden">
        {/* Progress bar */}
        <motion.div
          className="absolute inset-y-0 left-0 opacity-20"
          style={{
            background:
              'linear-gradient(90deg, var(--color-signal-warm-1), var(--color-signal-cool-1), var(--color-signal-bright-1))',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Phase indicators */}
        <div className="absolute inset-0 flex items-center justify-around px-8">
          <PhaseIndicator
            label="User Speaks"
            active={phase === 'listening'}
            complete={phase !== 'idle' && phase !== 'listening'}
          />
          <PhaseIndicator
            label="Processing"
            active={phase === 'processing'}
            complete={phase === 'speaking' || (phase === 'idle' && progress === 100)}
            duration={phase === 'processing' ? `${latency}ms` : undefined}
          />
          <PhaseIndicator
            label="Agent Speaks"
            active={phase === 'speaking'}
            complete={phase === 'idle' && progress === 100}
          />
        </div>
      </div>

      {/* Latency slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-text-secondary">Response Latency</label>
          <span className="text-sm font-mono text-text-primary">{latency}ms</span>
        </div>
        <input
          type="range"
          min={100}
          max={1000}
          step={50}
          value={latency}
          onChange={(e) => setLatency(Number(e.target.value))}
          className="w-full h-2 bg-surface-elevated rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal-bright-1"
        />
        <div className="flex justify-between text-xs text-text-tertiary mt-1">
          <span>100ms</span>
          <span className={feedback.color}>{feedback.text}</span>
          <span>1000ms</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={handlePlay}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all',
            isPlaying
              ? 'bg-surface-elevated hover:bg-surface-hover'
              : 'bg-signal-cool-1 text-white hover:opacity-90'
          )}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Simulate
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-3 rounded-xl bg-surface-elevated hover:bg-surface-hover transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function PhaseIndicator({
  label,
  active,
  complete,
  duration,
}: {
  label: string;
  active: boolean;
  complete: boolean;
  duration?: string;
}) {
  return (
    <div
      className={cn(
        'text-center transition-opacity',
        active ? 'opacity-100' : complete ? 'opacity-50' : 'opacity-30'
      )}
    >
      <motion.div
        className={cn(
          'w-4 h-4 rounded-full mx-auto mb-2 transition-colors',
          active
            ? 'bg-signal-bright-1'
            : complete
            ? 'bg-signal-bright-1'
            : 'bg-surface'
        )}
        animate={active ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: active ? Infinity : 0 }}
      />
      <div className="text-xs font-medium">{label}</div>
      {duration && active && (
        <div className="text-xs text-signal-warm-1 mt-1">{duration}</div>
      )}
    </div>
  );
}
