'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useAudioStore } from '@/store/useAudioStore';

export function LoadingScreen() {
  const { loadingProgress, isLoaded, gameStarted, setProgress, startGame } = useGameStore();
  const { playBgm } = useAudioStore();
  const [mounted, setMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading of assets
    const interval = setInterval(() => {
      setProgress(useGameStore.getState().loadingProgress + Math.floor(Math.random() * 12) + 5);
    }, 200);

    return () => clearInterval(interval);
  }, [setProgress]);

  const handleStart = () => {
    setIsFading(true);
    
    // Play SFX
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('thunder');
      setTimeout(() => {
        window.triggerSFX('haki');
      }, 300);
    }
    
    // Start global music track (BGM)
    playBgm('ambient');

    // Wait for the slide/fade transitions before unmounting
    setTimeout(() => {
      startGame();
    }, 1200);
  };

  if (!mounted || gameStarted) return null;

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B132B] overflow-hidden"
          exit={{
            y: '-100vh',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Lightning effect overlay */}
          <div className="absolute inset-0 bg-white pointer-events-none opacity-0 animate-[flash_6s_infinite_2s]" />

          {/* Ocean waves svg background decorative */}
          <div className="absolute bottom-0 w-full opacity-10">
            <svg className="w-full h-24 fill-current text-bounty-gold" viewBox="0 0 1440 74" preserveAspectRatio="none">
              <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z"></path>
            </svg>
          </div>

          <div className="relative flex flex-col items-center max-w-md px-6 text-center">
            {/* Spinning Compass Logo */}
            <motion.div
              className="relative w-36 h-36 mb-8 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              <svg className="w-full h-full text-bounty-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="6 3" />
                <circle cx="50" cy="50" r="40" strokeWidth="1.5" />
                {/* Compass markers */}
                <path d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50" strokeWidth="2" />
                {/* Arrow */}
                <path d="M50 20 L58 50 L50 45 L42 50 Z" fill="currentColor" />
                <path d="M50 80 L58 50 L50 55 L42 50 Z" fill="#D62828" />
              </svg>
              {/* Center glow */}
              <div className="absolute w-6 h-6 rounded-full bg-haki-red blur-md opacity-75" />
            </motion.div>

            {/* Typography */}
            <h1 className="font-cinzel text-3xl md:text-4xl text-bounty-gold tracking-widest mb-2 font-bold drop-shadow-[0_2px_10px_rgba(244,211,94,0.3)]">
              THE GRAND LINE
            </h1>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gray-400 mb-8 animate-pulse">
              Entering The Grand Line...
            </p>

            {/* Progress Bar Container */}
            <div className="w-64 h-2 bg-[#1C2541] rounded-full border border-bounty-gold/20 p-[2px] mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sunny-orange to-bounty-gold rounded-full shadow-[0_0_8px_#F4D35E]"
                style={{ width: `${loadingProgress}%` }}
                layout
              />
            </div>

            {/* Percent Text / Action Button */}
            <div className="h-14 flex items-center justify-center">
              {!isLoaded ? (
                <span className="font-mono text-sm text-bounty-gold tracking-widest">
                  {Math.min(100, Math.floor(loadingProgress))}%
                </span>
              ) : (
                <motion.button
                  id="btn-start-adventure"
                  onClick={handleStart}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(244,211,94,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 font-cinzel text-sm text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded-md font-bold tracking-widest cursor-pointer shadow-[0_4px_20px_rgba(244,211,94,0.3)] border-2 border-bounty-gold"
                >
                  START ADVENTURE
                </motion.button>
              )}
            </div>
          </div>

          {/* Simple lightning animation helper styles */}
          <style jsx global>{`
            @keyframes flash {
              0%, 95%, 98%, 100% { opacity: 0; }
              96%, 99% { opacity: 0.25; }
              97% { opacity: 0.8; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default LoadingScreen;
