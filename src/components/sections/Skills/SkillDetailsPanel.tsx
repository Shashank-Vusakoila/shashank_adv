'use client';

import { motion } from 'framer-motion';
import { X, Sparkles, Zap, Shield } from 'lucide-react';
import { SKILL_FRUITS } from '@/data/skills';

interface SkillDetailsPanelProps {
  activeId: string | null;
  onClose: () => void;
}

export function SkillDetailsPanel({ activeId, onClose }: SkillDetailsPanelProps) {
  const fruit = SKILL_FRUITS.find(f => f.id === activeId);

  if (!fruit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-6 rounded-lg w-full max-w-md relative z-20 overflow-hidden border border-bounty-gold/30 shadow-[0_10px_35px_rgba(244,211,94,0.15)]"
    >
      {/* Glow corner elements */}
      <div 
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: fruit.color }}
      />

      {/* Close button */}
      <button
        onClick={() => {
          onClose();
          if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
        }}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Info */}
      <div className="mb-4">
        <span 
          className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/10"
          style={{ color: fruit.color }}
        >
          {fruit.type}
        </span>
        <h3 className="font-cinzel text-xl font-black text-bounty-gold uppercase mt-3">
          {fruit.fruitName}
        </h3>
        <h4 className="font-cinzel text-sm text-white tracking-widest uppercase opacity-75">
          Ability: {fruit.name}
        </h4>
      </div>

      {/* Description */}
      <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6 italic">
        "{fruit.description}"
      </p>

      {/* Stats / Mastery meters */}
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-xs uppercase tracking-wider font-cinzel">
            <span className="text-gray-400">Mastery Level</span>
            <span className="text-bounty-gold font-bold">{fruit.level} ({fruit.mastery}%)</span>
          </div>
          <div className="h-2.5 bg-[#0B132B] rounded-full overflow-hidden p-[2px] border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fruit.mastery}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: fruit.color }}
            />
          </div>
        </div>

        {/* Combat Stats Indicators */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 bg-[#0B132B]/50 p-2 rounded border border-white/5">
            <Zap className="w-4 h-4 text-sunny-orange" />
            <span className="font-mono text-[10px] text-gray-400 uppercase">Power: S-Tier</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0B132B]/50 p-2 rounded border border-white/5">
            <Shield className="w-4 h-4 text-bounty-gold" />
            <span className="font-mono text-[10px] text-gray-400 uppercase">Haki: Infused</span>
          </div>
        </div>
      </div>

      {/* Projects list */}
      <div>
        <h5 className="font-cinzel text-xs tracking-wider text-white uppercase mb-2">
          Deployed in Battles:
        </h5>
        <div className="flex flex-wrap gap-2">
          {fruit.projectsUsed.map((proj, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono bg-[#1C2541] border border-white/10 px-2 py-1 rounded text-gray-300"
            >
              {proj}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
export default SkillDetailsPanel;
