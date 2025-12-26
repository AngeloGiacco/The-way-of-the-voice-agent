'use client';

import { Suspense } from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { cn } from '@/lib/utils/cn';

interface CanvasProps {
  children: React.ReactNode;
  className?: string;
}

export function Canvas({ children, className }: CanvasProps) {
  return (
    <R3FCanvas
      className={cn('pointer-events-none', className)}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </R3FCanvas>
  );
}
