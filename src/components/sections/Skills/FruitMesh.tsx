'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { SkillFruit } from '@/data/skills';

interface FruitMeshProps {
  fruit: SkillFruit;
  angle: number;
  radius: number;
  orbitSpeed: { current: number };
  onSelect: (id: string) => void;
  activeId: string | null;
}

export function FruitMesh({ fruit, angle, radius, orbitSpeed, onSelect, activeId }: FruitMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = activeId === fruit.id;

  // Individual phase offsets for floating animation
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  // Load the stylized AI-generated devil fruit image
  const texture = useLoader(THREE.TextureLoader, fruit.image);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    // 1. Calculate orbiting coordinates
    const time = state.clock.getElapsedTime();
    
    // Accumulate the angle using global orbitSpeed
    const currentAngle = angle + (time * orbitSpeed.current);
    
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    // Add floating vertical motion
    const floatY = Math.sin(time * 1.5 + floatOffset.current) * 0.25;

    // Smoothly transition positions (lerp)
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.1);
    group.position.y = THREE.MathUtils.lerp(group.position.y, floatY, 0.1);
    group.position.z = THREE.MathUtils.lerp(group.position.z, targetZ, 0.1);
    
    // Small breathing scale effect if hovered or active
    const baseScale = isActive ? 1.8 : hovered ? 1.5 : 1.2;
    const breathe = Math.sin(time * 3) * 0.1;
    const currentScale = baseScale + breathe;
    group.scale.set(currentScale, currentScale, currentScale);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(fruit.id);
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('victory');
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('click');
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const displayColor = hovered || isActive ? '#F4D35E' : fruit.color;

  return (
    <group ref={groupRef}>
      <sprite
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <spriteMaterial 
          map={texture} 
          color={hovered || isActive ? '#ffffff' : '#e2e8f0'} 
          transparent={true}
        />
      </sprite>
      
      {/* Point light attached to active/hovered fruit to cast glow on environment */}
      {(isActive || hovered) && (
        <pointLight position={[0,0,0]} color={displayColor} intensity={isActive ? 3 : 1.5} distance={5} />
      )}
    </group>
  );
}
export default FruitMesh;
