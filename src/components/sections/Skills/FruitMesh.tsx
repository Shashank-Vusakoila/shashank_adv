'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = activeId === fruit.id;

  // Individual phase offsets for floating animation
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // 1. Calculate orbiting coordinates
    const time = state.clock.getElapsedTime();
    
    // Accumulate the angle using global orbitSpeed
    const currentAngle = angle + (time * orbitSpeed.current);
    
    const targetX = Math.cos(currentAngle) * radius;
    const targetZ = Math.sin(currentAngle) * radius;
    // Add floating vertical motion
    const floatY = Math.sin(time * 1.5 + floatOffset.current) * 0.25;

    // Smoothly transition positions (lerp)
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.1);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, floatY, 0.1);
    mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.1);

    // 2. Rotate mesh on its axis (spin faster if hovered or active)
    const spinFactor = hovered ? 3 : isActive ? 4 : 1;
    mesh.rotation.x += 0.01 * spinFactor;
    mesh.rotation.y += 0.015 * spinFactor;
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

  // Render geometry based on type
  const renderGeometry = () => {
    switch (fruit.geometryType) {
      case 'torusKnot':
        return <torusKnotGeometry args={[0.5, 0.15, 64, 8, 2, 3]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.6]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.6]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1.0, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.6]} />;
      case 'sphere':
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.6]} />;
      default:
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    }
  };

  const displayColor = hovered || isActive ? '#F4D35E' : fruit.color;

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={isActive ? 1.4 : hovered ? 1.2 : 1}
    >
      {renderGeometry()}
      
      {/* Premium glowing shader material look */}
      <meshStandardMaterial
        color={displayColor}
        roughness={0.15}
        metalness={0.8}
        emissive={displayColor}
        emissiveIntensity={isActive ? 1.5 : hovered ? 0.8 : 0.2}
      />
      
      {/* Point light attached to active fruit */}
      {(isActive || hovered) && (
        <pointLight color={displayColor} intensity={isActive ? 2 : 1} distance={3} />
      )}
    </mesh>
  );
}
export default FruitMesh;
