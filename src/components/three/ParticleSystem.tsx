'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/stores/scrollStore';

const vertexShader = `
attribute float aSize;
attribute vec3 aColor;

varying vec3 vColor;

uniform float uTime;
uniform float uScrollProgress;

void main() {
  vColor = aColor;

  vec3 pos = position;

  // Orbit animation
  float angle = uTime * 0.5 + position.x * 0.5;
  pos.x += sin(angle) * 0.1;
  pos.y += cos(angle * 0.7) * 0.1;

  // Flow animation based on scroll
  pos.x += uScrollProgress * 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

  // Glow effect
  alpha *= 0.8;

  gl_FragColor = vec4(vColor, alpha);
}
`;

interface ParticleSystemProps {
  count?: number;
}

export function ParticleSystem({ count = 500 }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const progress = useScrollStore((state) => state.progress);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorWarm = new THREE.Color(0xf5a623);
    const colorCool = new THREE.Color(0x6b5ce7);
    const colorBright = new THREE.Color(0x00d4aa);

    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 0.1 + 0.05;

      // Random color from palette
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.33) {
        color = colorWarm;
      } else if (colorChoice < 0.66) {
        color = colorCool;
      } else {
        color = colorBright;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
    };
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uScrollProgress.value = progress;
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
