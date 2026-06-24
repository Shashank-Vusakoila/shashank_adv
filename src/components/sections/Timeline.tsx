'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VOYAGE_MILESTONES, JourneyMilestone } from '@/data/timeline';
import { Anchor } from 'lucide-react';

export function Timeline() {
  const [activeMilestone, setActiveMilestone] = useState<JourneyMilestone | null>(null);

  return (
    <div
      id="timeline"
      className="relative w-full bg-[#0B132B] py-20 md:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          GRAND LINE JOURNEY
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase italic">
          Voyage Logbook
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      {/* Parchment Voyage Strip */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="parchment-bg rounded-lg border-2 border-[#8B5A2B] p-6 md:p-8 relative overflow-hidden shadow-[inset_0_0_40px_rgba(139,90,43,0.3)]">
          
          {/* EAST BLUE label (left) */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-cinzel text-lg md:text-2xl font-black text-[#8B5A2B]/30 uppercase tracking-widest -rotate-0 select-none hidden md:block" style={{ writingMode: 'horizontal-tb' }}>
            EAST BLUE
          </span>
          
          {/* GRAND LINE label (right) */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-cinzel text-lg md:text-2xl font-black text-[#8B5A2B]/30 uppercase tracking-widest italic select-none hidden md:block">
            GRAND LINE
          </span>

          {/* Horizontal Timeline */}
          <div className="relative flex items-center justify-between py-10 px-8 md:px-16 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            
            {/* Connecting dotted line */}
            <div className="absolute top-[52px] left-16 right-16 h-[2px] border-t-2 border-dashed border-[#8B5A2B]/40" />

            {/* Island Nodes */}
            {VOYAGE_MILESTONES.map((m, idx) => {
              const isActive = activeMilestone?.id === m.id;
              return (
                <div
                  key={m.id}
                  className="relative flex flex-col items-center cursor-pointer group flex-shrink-0 w-[100px] md:w-auto"
                  onClick={() => {
                    setActiveMilestone(isActive ? null : m);
                    if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
                  }}
                >
                  {/* Dot */}
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                    isActive 
                      ? 'bg-[#D62828] border-[#D62828] scale-150 shadow-[0_0_12px_rgba(214,40,40,0.6)]'
                      : 'bg-[#8B5A2B] border-[#5C3A21] group-hover:bg-[#D62828] group-hover:scale-125'
                  }`} />

                  {/* Label Below */}
                  <div className="mt-3 text-center">
                    <span className={`font-cinzel text-[8px] md:text-[9px] tracking-widest uppercase block font-bold ${
                      isActive ? 'text-[#D62828]' : 'text-[#5C3A21]'
                    }`}>
                      {m.name}
                    </span>
                    <span className="font-cinzel text-[9px] md:text-[10px] text-[#3b2c1a] font-bold block mt-0.5">
                      {m.label}
                    </span>
                    <span className="font-mono text-[7px] md:text-[8px] text-[#5a3c1e]/60 block">
                      {m.epoch}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Pop-up */}
      <AnimatePresence>
        {activeMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-xl mx-auto mt-6 px-6"
          >
            <div className="parchment-bg p-6 rounded-lg border-2 border-[#8B5A2B] text-center">
              <span className="font-mono text-[10px] text-[#D62828] font-bold tracking-wider">{activeMilestone.epoch}</span>
              <h4 className="font-cinzel text-lg font-black text-[#3b2c1a] uppercase mt-1 mb-2">{activeMilestone.name}: {activeMilestone.label}</h4>
              <p className="font-sans text-xs text-[#3b2c1a] leading-relaxed italic">&ldquo;{activeMilestone.details}&rdquo;</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Timeline;
