'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useAudioStore } from '@/store/useAudioStore';
import { useGameStore } from '@/store/useGameStore';
import { IMAGES } from '@/data/assets';
import { Mail, Compass, Navigation } from 'lucide-react';

export function SunsetEnding() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-20%', once: false });
  const { playBgm } = useAudioStore();
  const { totalBounty } = useGameStore();

  // Trigger emotional BGM transition when sunset is visible
  useEffect(() => {
    if (isInView) {
      playBgm('sunset');
    }
  }, [isInView, playBgm]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shashankvusakoila@gmail.com');
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('victory');
    }
    alert('Coordinates copied! Reach the captain at: shashankvusakoila@gmail.com');
  };

  return (
    <section
      ref={ref}
      id="sunset"
      className="relative w-full flex flex-col items-center justify-between bg-gradient-to-t from-[#F77F00]/20 via-[#0B132B] to-[#1a1c36] py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Sunset Background sky glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B132B] to-[#F77F00]/30 opacity-40 pointer-events-none z-0" />
      
      {/* Golden Sun */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-t from-bounty-gold to-sunny-orange blur-3xl opacity-20 pointer-events-none z-0" />

      {/* Ocean Wave SVGs */}
      <div className="absolute bottom-0 w-full h-24 overflow-hidden pointer-events-none z-10 opacity-40">
        <svg className="absolute bottom-0 w-[200%] h-16 fill-[#F77F00]/10 animate-[wave_14s_linear_infinite]" viewBox="0 0 1440 74">
          <path d="M0,32C120,40,240,48,360,42.7C480,37,600,19,720,16C840,13,960,27,1080,34.7C1200,43,1320,45,1380,45.3L1440,46L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,0,74Z" />
        </svg>
      </div>

      <div className="w-full flex justify-center pt-8 z-10">
        <div className="flex items-center gap-2 text-bounty-gold opacity-50">
          <Compass className="w-5 h-5 animate-spin-slow" />
          <span className="font-cinzel text-xs tracking-widest uppercase">THE END OF THE LINE</span>
        </div>
      </div>

      {/* Center Cinematic Scene */}
      <div className="relative flex flex-col items-center justify-center text-center max-w-2xl w-full z-10 flex-grow py-12">
        {/* Thousand Sunny Sailing Away (translates and scales down) */}
        <motion.div
          animate={isInView ? {
            y: [-10, 45],
            x: [0, 100],
            scale: [1, 0.45],
            opacity: [1, 0.4]
          } : {}}
          transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          className="relative w-28 h-28 mb-8 flex items-center justify-center"
        >
          {/* Avatar Standing on Deck */}
          <div className="absolute top-2 w-10 h-10 z-10 pointer-events-none opacity-85">
            <Image
              src={IMAGES.standred.src}
              alt="Captain Shashank on Deck"
              width={IMAGES.standred.width}
              height={IMAGES.standred.height}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Boat icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-sunny-orange to-bounty-gold rounded-full flex items-center justify-center shadow-[0_0_20px_#F77F00] border-2 border-white/40">
            <Navigation className="w-10 h-10 text-black rotate-45" />
          </div>
        </motion.div>

        {/* Cinematic Text Fades */}
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-cinzel text-4xl md:text-5xl font-black text-white tracking-widest uppercase mb-4"
        >
          The Journey Has <br />
          <span className="text-bounty-gold">Just Begun</span>
        </motion.h4>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-cinzel text-xs md:text-sm text-gray-400 tracking-wider uppercase mb-8"
        >
          Completed Voyage • Earned Bounty: ฿ {totalBounty.toLocaleString()} Berry
        </motion.p>
      </div>

      {/* Footer Block */}
      <div className="w-full flex flex-col items-center gap-4 z-10 pb-4">
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-3 px-8 py-3.5 font-cinzel text-xs font-black tracking-widest text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded-md border-2 border-bounty-gold hover:shadow-[0_0_25px_rgba(244,211,94,0.6)] transition-all cursor-pointer transform hover:scale-[1.03]"
        >
          <Mail className="w-4 h-4" />
          RECRUIT THE CAPTAIN
        </button>

        <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">
          © {new Date().getFullYear()} SHASHANK VUSAKOILA • GRAND LINE ARCHIVES
        </span>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
export default SunsetEnding;
