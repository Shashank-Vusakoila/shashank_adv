'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { SKILL_FRUITS } from '@/data/skills';
import { FruitMesh } from './FruitMesh';

interface FruitCanvasProps {
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export function FruitCanvas({ activeId, onSelect }: FruitCanvasProps) {
  // Base speed of orbit rotation
  const orbitSpeed = useRef(0.2);
  const targetSpeed = useRef(0.2);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Speed decays back to default rotation over time
  useEffect(() => {
    let active = true;
    const decay = () => {
      if (!active) return;
      if (!isDragging.current) {
        // Smoothly return to baseline speed of 0.2
        orbitSpeed.current += (0.2 - orbitSpeed.current) * 0.05;
      }
      requestAnimationFrame(decay);
    };
    decay();
    return () => {
      active = false;
    };
  }, []);

  // Pointer drag/momentum handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // Apply swipe rotation input
    orbitSpeed.current += deltaX * 0.008;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const radius = 3.8; // Orbit radius distance

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 2.5, 6.5], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} color="#0B132B" />
        
        {/* Soft atmospheric spot lights */}
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F77F00" />
        <spotLight position={[0, 8, 0]} intensity={1} color="#F4D35E" />

        {/* Orbit Group */}
        {SKILL_FRUITS.map((fruit, idx) => {
          const angle = (idx / SKILL_FRUITS.length) * Math.PI * 2;
          return (
            <FruitMesh
              key={fruit.id}
              fruit={fruit}
              angle={angle}
              radius={radius}
              orbitSpeed={orbitSpeed}
              onSelect={onSelect}
              activeId={activeId}
            />
          );
        })}

        {/* Orbit control helpers */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
export default FruitCanvas;
