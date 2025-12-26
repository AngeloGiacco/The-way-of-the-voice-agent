'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/stores/scrollStore';

const vertexShader = `
attribute float aRandom;
varying vec2 vUv;
varying float vRandom;
varying float vElevation;

uniform float uTime;
uniform float uScrollProgress;

void main() {
  vUv = uv;
  vRandom = aRandom;

  vec3 pos = position;

  // Wave animation
  float wave = sin(pos.x * 4.0 + uTime * 2.0) * 0.1;
  wave += sin(pos.x * 2.0 - uTime * 1.5) * 0.05;
  pos.y += wave * (1.0 - uScrollProgress * 0.5);

  // Dispersion based on scroll
  float dispersion = uScrollProgress * 0.5;
  pos.x += sin(aRandom * 6.28 + uTime) * dispersion * aRandom;
  pos.y += cos(aRandom * 6.28 + uTime * 0.7) * dispersion * aRandom * 0.5;
  pos.z += sin(aRandom * 3.14 + uTime * 0.5) * dispersion * 0.3;

  vElevation = pos.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 3.0 * (1.0 - uScrollProgress * 0.3);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vRandom;
varying float vElevation;

uniform float uTime;
uniform float uScrollProgress;

void main() {
  vec3 colorWarm = vec3(0.96, 0.65, 0.14);
  vec3 colorCool = vec3(0.42, 0.36, 0.91);
  vec3 colorBright = vec3(0.0, 0.83, 0.67);

  float colorMix = uScrollProgress;
  vec3 color;
  if (colorMix < 0.5) {
    color = mix(colorWarm, colorCool, colorMix * 2.0);
  } else {
    color = mix(colorCool, colorBright, (colorMix - 0.5) * 2.0);
  }

  // Add some variation based on position
  color += vElevation * 0.1;

  // Point fade
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  alpha *= 0.6;

  gl_FragColor = vec4(color, alpha);
}
`;

export function SignalFlowMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const progress = useScrollStore((state) => state.progress);

  const { geometry, uniforms } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a wave-like distribution
      const x = (i / count) * 8 - 4;
      const y = Math.sin(x * 2) * 0.5 + (Math.random() - 0.5) * 0.3;
      const z = (Math.random() - 0.5) * 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      randoms[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
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
