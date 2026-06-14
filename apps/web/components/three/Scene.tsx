'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#a5b0ec';
const ACCENT_2 = '#7681c9';

/** Shared, mutable scroll progress (0..1) updated outside the render loop. */
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

function StarField({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1700;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x = scroll.current * Math.PI * 0.5;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={ACCENT}
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

function Crystal({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    const target = group.current.rotation;
    // Gentle pointer parallax + scroll-driven tumble.
    target.y = THREE.MathUtils.lerp(target.y, x * 0.35 + scroll.current * Math.PI * 1.6, 0.04);
    target.x = THREE.MathUtils.lerp(target.x, -y * 0.25 + scroll.current * Math.PI * 0.6, 0.04);
    target.z += delta * 0.02;
    // Drift slightly as the user scrolls.
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0.4 - scroll.current * 2.4, 0.05);
  });

  return (
    <group ref={group} position={[2.6, 0.4, -1]}>
      {/* Faint solid core */}
      <Icosahedron args={[2.3, 1]}>
        <meshStandardMaterial
          color={ACCENT_2}
          emissive={ACCENT_2}
          emissiveIntensity={0.12}
          roughness={0.5}
          metalness={0.4}
          transparent
          opacity={0.06}
          flatShading
        />
      </Icosahedron>
      {/* Wireframe shell */}
      <Icosahedron args={[2.32, 1]}>
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.16} />
      </Icosahedron>
    </group>
  );
}

export default function Scene() {
  const scroll = useScrollProgress();
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={0.9} color={ACCENT} />
      <pointLight position={[-5, -3, -4]} intensity={1.4} color={ACCENT_2} />
      <Crystal scroll={scroll} />
      <StarField scroll={scroll} />
    </Canvas>
  );
}
