'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENT_BOUNTIES, AchievementBounty } from '@/data/achievements';
import { useGameStore } from '@/store/useGameStore';
import { IMAGES } from '@/data/assets';
import { X, Award, CheckCircle } from 'lucide-react';

// Sub-component for smooth animated slot-machine bounty tick-up
function BountyCounter({ target }: { target: number }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let active = true;
    const start = displayCount;
    const end = target;
    if (start === end) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      if (!active) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Easing out quadratic
      const ease = progress * (2 - progress);
      const current = Math.floor(start + (end - start) * ease);
      
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    return () => {
      active = false;
    };
  }, [target]);

  return (
    <span className="font-cinzel text-3xl md:text-5xl font-black text-bounty-gold tracking-widest drop-shadow-[0_2px_12px_#F4D35E]">
      ฿ {displayCount.toLocaleString()} -
    </span>
  );
}

export function Achievements() {
  const { totalBounty, unlockedBounties, claimBounty } = useGameStore();
  const [selectedBounty, setSelectedBounty] = useState<AchievementBounty | null>(null);

  const handleClaim = (bounty: AchievementBounty) => {
    claimBounty(bounty.id, bounty.bountyValue);
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('victory');
    }
  };

  return (
    <section
      id="achievements"
      className="relative w-full flex flex-col items-center justify-center bg-[#0B132B] py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background stars / dust */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,37,65,0.5),transparent_80%)] pointer-events-none" />

      {/* Counter Block */}
      <div className="text-center mb-12 z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-[0.2em] text-sunny-orange font-bold uppercase mb-2">
          CURRENT ACTIVE BOUNTY
        </span>
        <div className="flex items-center gap-3 bg-[#1C2541]/85 border-2 border-bounty-gold/30 px-8 py-4 rounded-lg shadow-[0_4px_25px_rgba(244,211,94,0.1)]">
          <BountyCounter target={totalBounty} />
        </div>
      </div>

      {/* Section Titles */}
      <div className="text-center mb-12 z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          BOUNTY BOARD
        </h2>
        <h3 className="font-cinzel text-2xl md:text-4xl font-black text-white tracking-widest uppercase">
          Legendary Accomplishments
        </h3>
        <div className="w-16 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      {/* Wanted Posters Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center relative z-10">
        {ACHIEVEMENT_BOUNTIES.map((bounty) => {
          const isClaimed = unlockedBounties.includes(bounty.id);
          return (
            <motion.div
              key={bounty.id}
              onClick={() => {
                setSelectedBounty(bounty);
                if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
              }}
              whileHover={{ 
                rotateY: 12, 
                rotateX: -4, 
                scale: 1.04,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="parchment-bg w-64 p-4 rounded cursor-pointer relative flex flex-col justify-between aspect-[3/4] border-4 border-[#5a3c1e]"
            >
              {/* Burned Edges Shade */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(90,60,30,0.2)_100%)] pointer-events-none" />

              {/* Wanted Header */}
              <div className="text-center mb-2 select-none">
                <span className="font-cinzel text-lg tracking-[0.2em] font-black text-[#3b2c1a] leading-none block">
                  WANTED
                </span>
                <span className="font-cinzel text-[7px] tracking-[0.3em] text-[#5a3c1e] font-bold block mt-0.5">
                  DEAD OR ALIVE
                </span>
              </div>

              {/* Wanted Image Center (Using poster.png) */}
              <div className="relative w-full aspect-square bg-[#0b132b] rounded-sm border-2 border-[#5a3c1e]/40 overflow-hidden shadow-inner group">
                <Image
                  src={IMAGES.poster.src}
                  alt="Wanted Poster Avatar"
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  placeholder="blur"
                  blurDataURL={IMAGES.poster.blurDataURL}
                />
                
                {/* Stamp if claimed */}
                {isClaimed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-950/20 backdrop-blur-[1px]">
                    <span className="font-cinzel font-black text-2xl text-green-700 border-4 border-double border-green-700 px-4 py-2 -rotate-12 bg-white/90 rounded shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                      CLAIMED
                    </span>
                  </div>
                )}
              </div>

              {/* Achievement description */}
              <div className="text-center mt-3 select-none flex-grow flex flex-col justify-end">
                <h4 className="font-cinzel font-bold text-sm text-[#3b2c1a] tracking-wider truncate uppercase">
                  {bounty.title}
                </h4>
                <p className="font-mono text-[7px] text-[#5a3c1e] uppercase tracking-widest mt-0.5 truncate">
                  {bounty.subtitle}
                </p>
                
                {/* Reward price Tag */}
                <div className="mt-2 text-center text-[#D62828] font-cinzel font-black text-xs tracking-wider border-t border-[#5a3c1e]/20 pt-2">
                  ฿ {(bounty.bountyValue / 1000000).toFixed(0)}M -
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedBounty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="parchment-bg max-w-xl w-full p-8 rounded-lg relative border-4 border-[#5a3c1e] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedBounty(null);
                  if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
                }}
                className="absolute top-4 right-4 text-[#5a3c1e] hover:text-[#3b2c1a] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title Header */}
              <div className="flex items-center gap-3 border-b border-[#5a3c1e]/20 pb-4 mb-4">
                <div className="p-2 bg-[#5a3c1e]/10 rounded text-[#D62828]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-cinzel text-2xl font-black text-[#3b2c1a] uppercase leading-none">
                    {selectedBounty.title}
                  </h4>
                  <span className="font-mono text-[10px] text-[#5a3c1e] uppercase tracking-wider">
                    {selectedBounty.subtitle}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-[#3b2c1a] leading-relaxed mb-6">
                {selectedBounty.description}
              </p>

              {/* Syllabus points */}
              <div className="mb-6">
                <h5 className="font-cinzel text-xs font-bold text-[#5a3c1e] uppercase tracking-wider mb-2">
                  Acquired Skills & Accomplishments:
                </h5>
                <ul className="flex flex-col gap-2">
                  {selectedBounty.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#3b2c1a]">
                      <span className="text-sunny-orange mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reward Action */}
              <div className="flex items-center justify-between border-t border-[#5a3c1e]/20 pt-5">
                <div>
                  <span className="font-cinzel text-[10px] text-[#5a3c1e] uppercase block">Bounty Value</span>
                  <span className="font-cinzel font-black text-xl text-[#D62828]">
                    ฿ {selectedBounty.bountyValue.toLocaleString()}
                  </span>
                </div>

                {unlockedBounties.includes(selectedBounty.id) ? (
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3 bg-[#5a3c1e]/10 text-[#5a3c1e]/60 border border-[#5a3c1e]/20 rounded font-cinzel text-xs font-bold uppercase"
                  >
                    <CheckCircle className="w-4 h-4" />
                    BOUNTY CLAIMED
                  </button>
                ) : (
                  <button
                    onClick={() => handleClaim(selectedBounty)}
                    className="px-6 py-3 bg-[#D62828] hover:bg-black text-white hover:shadow-[0_0_15px_#D62828] transition-all rounded font-cinzel text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    CLAIM BOUNTY REWARD
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default Achievements;
