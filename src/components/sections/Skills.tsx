'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { IMAGES } from '@/data/assets';
import { SkillDetailsPanel } from './Skills/SkillDetailsPanel';

// Dynamically import Three.js Canvas to prevent SSR compile issues
const FruitCanvas = dynamic(() => import('./Skills/FruitCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bounty-gold" />
    </div>
  ),
});

export function Skills() {
  const { activeSkillFruit, selectFruit, gearState } = useGameStore();

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0B132B] py-20 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,37,65,0.6),transparent_70%)] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-4 z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          DEVIL FRUIT COLLECTION
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          Skill Mastery
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      {/* Interactive 3D Orbit Display area */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center z-10">
        
        {/* Center: Character Avatar layered behind the 3D orbit ring */}
        <div className="absolute w-64 h-80 pointer-events-none select-none z-0 flex items-center justify-center">
          {/* Glowing pedestal backing */}
          <div className="absolute -bottom-4 w-44 h-8 bg-bounty-gold/10 rounded-full blur-md animate-[pulse_3s_infinite]" />
          
          <Image
            src={gearState === 'gear5' ? IMAGES.sitwhite.src : IMAGES.sitred.src}
            alt="Captain Shashank Sitting"
            width={IMAGES.sitred.width}
            height={IMAGES.sitred.height}
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-float"
            placeholder="blur"
            blurDataURL={gearState === 'gear5' ? IMAGES.sitwhite.blurDataURL : IMAGES.sitred.blurDataURL}
          />
        </div>

        {/* transparent Three.js canvas orbiting layer */}
        <div className="absolute inset-0 z-10">
          <FruitCanvas 
            activeId={activeSkillFruit}
            onSelect={selectFruit}
          />
        </div>
      </div>

      {/* Active detail panel overlay */}
      <div className="relative z-20 w-full max-w-md px-6 flex justify-center mt-6 h-72">
        <AnimatePresence mode="wait">
          {activeSkillFruit && (
            <SkillDetailsPanel 
              activeId={activeSkillFruit}
              onClose={() => selectFruit(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating Instruction overlay */}
      <div className="absolute bottom-6 font-mono text-[10px] tracking-wider text-gray-500 z-10">
        DRAG TO SPIN ORBIT • SCROLL OR CLICK A FRUIT TO INSPECT POWERS
      </div>
    </section>
  );
}
export default Skills;
