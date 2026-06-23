'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PROJECT_BOSSES, ProjectBoss } from '@/data/projects';
import { useGameStore } from '@/store/useGameStore';
import { Swords, Trophy, ShieldAlert, RotateCcw, ExternalLink } from 'lucide-react';
import { IMAGES } from '@/data/assets';

export function Projects() {
  const { bossBattles, attackBoss, resetBoss } = useGameStore();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  const [combatAnim, setCombatAnim] = useState<'none' | 'punch' | 'cannon' | 'slash' | 'fire'>('none');

  const activeBoss = PROJECT_BOSSES[activeIdx];
  const battleState = bossBattles[activeBoss.id] || { health: 100, defeated: false };

  const handleAttack = () => {
    if (battleState.defeated || isAttacking) return;

    setIsAttacking(true);
    setShake(true);
    setFlash(true);
    setCombatAnim(activeBoss.theme);

    // Play corresponding SFX
    const sfxName = activeBoss.theme === 'punch' ? 'punch' 
                  : activeBoss.theme === 'slash' ? 'slash'
                  : activeBoss.theme === 'cannon' ? 'thunder'
                  : 'haki'; // fire theme plays haki sound effect

    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX(sfxName);
    }

    // Trigger damage in Zustand store (25 damage = 4 hits to defeat)
    const targetDamage = 25;
    const nextHealth = Math.max(0, battleState.health - targetDamage);
    
    // Quick timeout to reset flashing/shaking
    setTimeout(() => {
      setFlash(false);
      setCombatAnim('none');
    }, 150);

    setTimeout(() => {
      setShake(false);
      setIsAttacking(false);
      attackBoss(activeBoss.id, targetDamage);

      // Trigger Confetti and Victory sound if defeated
      if (nextHealth <= 0) {
        if (typeof window !== 'undefined' && window.triggerSFX) {
          window.triggerSFX('victory');
        }
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 450);
  };

  const handleReset = (bossId: string) => {
    resetBoss(bossId);
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('click');
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0B132B] py-20 px-6 overflow-hidden"
    >
      {/* Dynamic Screen shake/flash overlay on hit */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-30 pointer-events-none mix-blend-difference ${
              activeBoss.theme === 'fire' ? 'bg-red-500' : 'bg-white'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center mb-10 z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          BOSS BATTLES SHOWCASE
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          Defeat the Bosses
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Side: Boss Select Nodes (4 Columns on large screen) */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 w-full scrollbar-none">
          {PROJECT_BOSSES.map((boss, idx) => {
            const state = bossBattles[boss.id] || { health: 100, defeated: false };
            const isActive = activeIdx === idx;
            return (
              <button
                key={boss.id}
                onClick={() => {
                  setActiveIdx(idx);
                  if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
                }}
                className={`flex-shrink-0 flex items-center justify-between gap-4 p-4 rounded-lg text-left border transition-all cursor-pointer w-48 lg:w-full ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#1C2541] to-sunny-orange/20 border-sunny-orange shadow-[0_0_15px_rgba(247,127,0,0.25)]' 
                    : 'bg-[#1C2541]/50 border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="font-cinzel text-[10px] tracking-wider text-sunny-orange block font-bold uppercase">
                    Battle 0{idx + 1}
                  </span>
                  <span className="font-cinzel text-xs font-black text-white uppercase block truncate max-w-[120px] lg:max-w-none">
                    {boss.projectName}
                  </span>
                </div>

                {state.defeated ? (
                  <span className="text-[10px] font-mono text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 uppercase">
                    DEFEATED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-sunny-orange font-bold bg-sunny-orange/10 px-2 py-0.5 rounded border border-sunny-orange/20 uppercase animate-pulse">
                    ALIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Combat Arena Window (9 Columns on large screen) */}
        <div className={`lg:col-span-9 glass-panel rounded-lg border-2 border-bounty-gold/20 p-6 md:p-8 flex flex-col items-center justify-center min-h-[500px] transition-transform duration-75 ${
          shake ? 'animate-[shake_0.4s_infinite]' : ''
        }`}>
          
          <AnimatePresence mode="wait">
            {!battleState.defeated ? (
              /* ACTIVE COMBAT MODE */
              <motion.div
                key="combat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center text-center"
              >
                {/* Boss Identity Card */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-haki-red font-bold uppercase bg-haki-red/10 px-3 py-1 rounded-full border border-haki-red/20">
                    BOSS CLAN ENCOUNTER
                  </span>
                  <h4 className="font-cinzel text-3xl font-black text-white mt-4 uppercase">
                    {activeBoss.bossName}
                  </h4>
                  <p className="font-cinzel text-xs text-bounty-gold tracking-widest uppercase opacity-75 mt-1">
                    {activeBoss.bossTitle}
                  </p>
                  <p className="font-sans text-sm text-gray-400 max-w-md mx-auto mt-3 italic">
                    "{activeBoss.bossDescription}"
                  </p>
                </div>

                {/* Combat Animation Visual Triggers */}
                <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                  {/* Haki Battle Avatar overlay */}
                  <div className="w-full h-full relative">
                    <Image
                      src={IMAGES.haki.src}
                      alt="Battle Haki Pose"
                      width={IMAGES.haki.width}
                      height={IMAGES.haki.height}
                      className={`w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(214,40,40,0.3)] transition-all ${
                        isAttacking ? 'scale-110 filter brightness-150 rotate-3' : 'scale-100 animate-float'
                      }`}
                      placeholder="blur"
                      blurDataURL={IMAGES.haki.blurDataURL}
                    />

                    {/* Anime Combat Effects */}
                    <AnimatePresence>
                      {combatAnim === 'punch' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center font-cinzel text-5xl font-black text-haki-red drop-shadow-[0_0_20px_#D62828] z-20 pointer-events-none"
                        >
                          PUNCH!
                        </motion.div>
                      )}
                      {combatAnim === 'cannon' && (
                        <motion.div
                          initial={{ scale: 0.2, opacity: 0 }}
                          animate={{ scale: 1.8, opacity: [1, 1, 0] }}
                          exit={{ scale: 0 }}
                          className="absolute w-24 h-24 rounded-full bg-sunny-orange/80 blur-md z-20 flex items-center justify-center border-4 border-bounty-gold"
                        />
                      )}
                      {combatAnim === 'slash' && (
                        <motion.div
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1.5, opacity: 1, rotate: [45, 45] }}
                          exit={{ opacity: 0 }}
                          className="absolute w-2 h-72 bg-gradient-to-t from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00D8FF] z-20 pointer-events-none"
                        />
                      )}
                      {combatAnim === 'fire' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.8, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center text-sunny-orange drop-shadow-[0_0_25px_#F77F00] z-20 pointer-events-none font-black text-4xl"
                        >
                          BURST!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Boss Health Bar */}
                <div className="w-full max-w-md mb-8">
                  <div className="flex justify-between items-center mb-2 font-mono text-xs text-gray-400">
                    <span>HP STATUS</span>
                    <span className={`${battleState.health <= 30 ? 'text-haki-red font-bold animate-pulse' : 'text-green-500'}`}>
                      {battleState.health} / 100
                    </span>
                  </div>
                  <div className="h-4 bg-[#0B132B] rounded p-[3px] border border-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${battleState.health}%` }}
                      className={`h-full rounded-sm ${
                        battleState.health <= 30 ? 'bg-gradient-to-r from-haki-red to-sunny-orange' : 'bg-gradient-to-r from-green-500 to-emerald-400'
                      }`}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                {/* Attack Trigger Button */}
                <button
                  id={`btn-attack-${activeBoss.id}`}
                  onClick={handleAttack}
                  disabled={isAttacking}
                  className="flex items-center gap-3 px-8 py-4 font-cinzel text-sm font-black tracking-widest text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded-md border-2 border-bounty-gold hover:shadow-[0_0_20px_rgba(244,211,94,0.4)] transition-all cursor-pointer transform hover:scale-[1.03] disabled:opacity-50"
                >
                  <Swords className="w-5 h-5 animate-pulse" />
                  {activeBoss.combatText}
                </button>
              </motion.div>
            ) : (
              /* DEFEATED / VICTORY CARD DISPLAY */
              <motion.div
                key="victory"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {/* Project Screenshot Display (Optimized) */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-bounty-gold/30 shadow-[0_0_15px_rgba(244,211,94,0.15)] group">
                  <Image
                    src={activeBoss.screenshot}
                    alt={activeBoss.projectName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Reward badge overlay */}
                  <div className="absolute top-3 left-3 bg-[#0B132B]/85 border border-bounty-gold/30 px-3 py-1 rounded text-bounty-gold font-mono text-[10px] font-bold tracking-wider">
                    REWARD: +{(activeBoss.rewardBounty / 1000000).toFixed(0)}M BERRY
                  </div>
                </div>

                {/* Project Details */}
                <div className="text-left flex flex-col h-full justify-between">
                  <div>
                    {/* Victory Banner */}
                    <div className="flex items-center gap-2 text-green-500 font-cinzel text-xs font-black tracking-widest mb-3">
                      <Trophy className="w-4 h-4 animate-bounce" />
                      VICTORY SECURED
                    </div>
                    
                    <h4 className="font-cinzel text-2xl font-black text-white uppercase mb-2">
                      {activeBoss.projectName}
                    </h4>

                    <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
                      {activeBoss.description}
                    </p>

                    {/* Tech Badges */}
                    <h5 className="font-cinzel text-[10px] tracking-wider text-gray-400 uppercase mb-2">
                      Tech Arsenal
                    </h5>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeBoss.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono bg-[#0C142C] border border-white/5 px-2.5 py-1 rounded text-bounty-gold font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={activeBoss.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => window.triggerSFX && window.triggerSFX('click')}
                      className="flex items-center gap-2 px-5 py-2.5 font-cinzel text-xs font-bold tracking-wider text-black bg-bounty-gold rounded hover:bg-sunny-orange hover:text-white transition-all cursor-pointer"
                    >
                      EXPLORE SOURCE
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    
                    <button
                      onClick={() => handleReset(activeBoss.id)}
                      className="flex items-center gap-2 px-5 py-2.5 font-cinzel text-xs font-bold tracking-wider text-gray-400 border border-white/10 rounded hover:border-white hover:text-white transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      REPLAY BATTLE
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-4px, 4px) rotate(-1deg); }
          40% { transform: translate(4px, -4px) rotate(1deg); }
          60% { transform: translate(-4px, -4px) rotate(-1deg); }
          80% { transform: translate(4px, 4px) rotate(1deg); }
        }
      `}</style>
    </section>
  );
}
export default Projects;
