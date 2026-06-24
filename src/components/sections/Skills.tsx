'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { SKILL_FRUITS } from '@/data/skills';
import { ChevronLeft, ChevronRight, X, Zap, Shield } from 'lucide-react';

const RARITY_COLORS: Record<string, string> = {
  Legendary: '#F4D35E',
  Epic: '#A29BFE',
  Rare: '#74B9FF',
  Mythical: '#FF6B6B',
  Common: '#636E72',
};

export function Skills() {
  const { activeSkillFruit, selectFruit } = useGameStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState<string | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const activeFruit = SKILL_FRUITS.find(f => f.id === showDetail);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#0B132B] py-20 md:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          DEVIL FRUIT COLLECTION
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          Skill Mastery
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      {/* Cards Container with arrows */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 border border-bounty-gold/30 rounded-full text-bounty-gold hover:bg-bounty-gold/20 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 border border-bounty-gold/30 rounded-full text-bounty-gold hover:bg-bounty-gold/20 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SKILL_FRUITS.map((fruit) => {
            const rarityColor = RARITY_COLORS[fruit.rarity] || '#636E72';
            return (
              <motion.div
                key={fruit.id}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => {
                  setShowDetail(fruit.id);
                  selectFruit(fruit.id);
                  if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
                }}
                className="flex-shrink-0 w-[220px] snap-center cursor-pointer group"
              >
                {/* Card with ornate golden border */}
                <div className="relative bg-gradient-to-b from-[#1a1a2e] to-[#0B132B] border-2 border-bounty-gold/40 rounded-lg overflow-hidden shadow-lg hover:border-bounty-gold/80 hover:shadow-[0_0_25px_rgba(244,211,94,0.2)] transition-all">
                  
                  {/* Fruit Image Area */}
                  <div className="relative h-[180px] flex items-center justify-center bg-gradient-to-b from-[#1C2541] to-[#0B132B] overflow-hidden">
                    {/* Corner ornaments */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-bounty-gold/50" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-bounty-gold/50" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-bounty-gold/50" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-bounty-gold/50" />

                    {/* Glow behind fruit */}
                    <div
                      className="absolute w-32 h-32 rounded-full blur-2xl opacity-30"
                      style={{ backgroundColor: fruit.color }}
                    />

                    <Image
                      src={fruit.image}
                      alt={fruit.name}
                      width={160}
                      height={160}
                      className="relative z-10 w-32 h-32 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Type tag */}
                    <span className="absolute top-2 right-2 font-mono text-[8px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-gray-400 z-10">
                      {fruit.type}
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 text-center">
                    <h4 className="font-cinzel text-base font-black text-white uppercase tracking-wide mb-0.5">
                      {fruit.name}
                    </h4>
                    <span className="font-cinzel text-[10px] tracking-widest text-gray-400 uppercase block mb-3">
                      {fruit.category}
                    </span>

                    {/* Tech icons as text badges */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3 min-h-[28px]">
                      {fruit.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="text-[8px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Rarity Badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-cinzel font-bold tracking-widest uppercase"
                      style={{
                        backgroundColor: `${rarityColor}20`,
                        color: rarityColor,
                        border: `1px solid ${rarityColor}40`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rarityColor }} />
                      {fruit.rarity}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel Overlay */}
      <AnimatePresence>
        {showDetail && activeFruit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => { setShowDetail(null); selectFruit(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 rounded-lg w-full max-w-md border border-bounty-gold/30 shadow-[0_10px_35px_rgba(244,211,94,0.15)] relative"
            >
              <button
                onClick={() => { setShowDetail(null); selectFruit(null); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={activeFruit.image}
                  alt={activeFruit.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain rounded-lg bg-[#1C2541] p-2"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10" style={{ color: activeFruit.color }}>
                    {activeFruit.type}
                  </span>
                  <h3 className="font-cinzel text-xl font-black text-bounty-gold uppercase mt-1">{activeFruit.name}</h3>
                  <span className="font-cinzel text-xs text-gray-400 tracking-widest uppercase">{activeFruit.category} · {activeFruit.rarity}</span>
                </div>
              </div>

              <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{activeFruit.description}&rdquo;
              </p>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1 text-xs uppercase tracking-wider font-cinzel">
                  <span className="text-gray-400">Power Level</span>
                  <span className="text-bounty-gold font-bold">{activeFruit.powerLevel} / 100</span>
                </div>
                <div className="h-2.5 bg-[#0B132B] rounded-full overflow-hidden p-[2px] border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeFruit.powerLevel}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeFruit.color }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-[#0B132B]/50 p-2 rounded border border-white/5">
                  <Zap className="w-4 h-4 text-sunny-orange" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase">Power: S-Tier</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0B132B]/50 p-2 rounded border border-white/5">
                  <Shield className="w-4 h-4 text-bounty-gold" />
                  <span className="font-mono text-[10px] text-gray-400 uppercase">Haki: Infused</span>
                </div>
              </div>

              <h5 className="font-cinzel text-xs tracking-wider text-white uppercase mb-2">Abilities Unlocked:</h5>
              <div className="flex flex-wrap gap-2">
                {activeFruit.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[#1C2541] border border-white/10 px-2 py-1 rounded text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default Skills;
