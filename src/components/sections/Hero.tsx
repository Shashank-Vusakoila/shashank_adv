'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/data/assets';
import { useGameStore } from '@/store/useGameStore';
import { Compass, ShieldAlert, Sparkles } from 'lucide-react';

export function Hero() {
  const { gearState, setGearState } = useGameStore();
  const [lightningFlash, setLightningFlash] = useState(false);
  const [laughterVisible, setLaughterVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speedY: number; color: string; life: number }>>([]);
  const animationFrameRef = useRef<number | null>(null);

  // 1. Particle generator for Conqueror's Haki sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentGear = useGameStore.getState().gearState;
      
      // Only generate particles during Haki and Gear 5 states
      if (currentGear === 'haki' || currentGear === 'gear5') {
        const count = currentGear === 'haki' ? 3 : 1; // More sparks during haki charge
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 50,
            size: Math.random() * 4 + 1.5,
            speedY: -(Math.random() * 4 + 2),
            color: Math.random() > 0.4 ? '#D62828' : '#000000', // Crimson Red and Pure Black Haki sparks
            life: 1.0,
          });
        }
      }

      particlesRef.current.forEach((p, idx) => {
        p.y += p.speedY;
        p.life -= 0.015;
        p.x += Math.sin(p.y * 0.05) * 1.5; // Jagged/lightning-like movement
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Draw lightning connection lines sometimes for Haki sparks
        if (idx > 0 && Math.random() > 0.93) {
          const prev = particlesRef.current[idx - 1];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(prev.x, prev.y);
          ctx.strokeStyle = '#D62828';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      particlesRef.current = particlesRef.current.filter(p => p.life > 0 && p.y > 0);
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };
    updateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // 2. Automated transformation sequence trigger
  const runTransformation = () => {
    if (gearState !== 'normal') return;

    // Phase A: Haki charging
    setGearState('haki');
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('haki');
    }

    // Trigger thunder flash midway
    setTimeout(() => {
      setLightningFlash(true);
      if (typeof window !== 'undefined' && window.triggerSFX) {
        window.triggerSFX('thunder');
      }
      setTimeout(() => setLightningFlash(false), 200);
    }, 800);

    // Phase B: Transform to Gear 5 (White)
    setTimeout(() => {
      setGearState('gear5');
      setLaughterVisible(true);
      // Play second thunder or aura burst
      if (typeof window !== 'undefined' && window.triggerSFX) {
        window.triggerSFX('thunder');
      }
    }, 1200);

    // Phase C: Revert to Normal
    setTimeout(() => {
      setLaughterVisible(false);
      setGearState('normal');
    }, 5500);
  };

  // Run on mount after 2.5 seconds
  useEffect(() => {
    const introTimer = setTimeout(() => {
      runTransformation();
    }, 2500);

    // Occasional lightning ambient flashes
    const lightningTimer = setInterval(() => {
      if (Math.random() > 0.65) {
        setLightningFlash(true);
        if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('thunder');
        setTimeout(() => setLightningFlash(false), 150);
      }
    }, 12000);

    return () => {
      clearTimeout(introTimer);
      clearInterval(lightningTimer);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0B132B] pt-20 overflow-hidden"
    >
      {/* Lightning Overlay */}
      <AnimatePresence>
        {lightningFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="absolute inset-0 bg-white z-20 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Ocean Stormy Waves (Background SVGs) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Clouds */}
        <div className="absolute top-10 left-0 w-[200%] h-24 bg-[url('/images/globe.svg')] bg-repeat-x opacity-10 animate-cloud-slow" />
        <div className="absolute top-28 left-0 w-[200%] h-24 bg-[url('/images/globe.svg')] bg-repeat-x opacity-15 animate-cloud-fast" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* Ocean Bottom waves */}
      <div className="absolute bottom-0 w-full h-32 overflow-hidden pointer-events-none z-10">
        <svg className="absolute bottom-0 w-[200%] h-24 fill-[#1C2541] opacity-70 translate-x-0 animate-[wave_10s_linear_infinite]" viewBox="0 0 1440 74">
          <path d="M0,32C120,40,240,48,360,42.7C480,37,600,19,720,16C840,13,960,27,1080,34.7C1200,43,1320,45,1380,45.3L1440,46L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,0,74Z" />
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-20 fill-[#0B132B] opacity-90 animate-[wave_7s_linear_infinite_reverse]" viewBox="0 0 1440 74" style={{ animationDelay: '-2s' }}>
          <path d="M0,20C120,24,240,30,360,28C480,26,600,15,720,13C840,11,960,20,1080,25C1200,30,1320,32,1380,32L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,0,74Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Side: Typography and Call to Action */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1 bg-sunny-orange/10 border border-sunny-orange/30 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-bounty-gold animate-spin" />
            <span className="font-cinzel text-xs tracking-wider text-sunny-orange font-bold">
              THE WORLD-CLASS STRAW HAT DEVELOPER
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-5xl md:text-7xl font-black tracking-tight text-white mb-4"
          >
            SHASHANK <br />
            <span className="text-bounty-gold drop-shadow-[0_2px_15px_rgba(244,211,94,0.3)]">
              VUSAKOILA
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg md:text-xl text-gray-400 tracking-[0.2em] uppercase mb-8 font-semibold"
          >
            Full Stack Developer & Systems Captain
          </motion.h2>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <a
              href="#about"
              onClick={() => window.triggerSFX && window.triggerSFX('click')}
              className="px-8 py-3.5 font-cinzel text-sm font-bold tracking-widest text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded-md border-2 border-bounty-gold hover:shadow-[0_0_20px_rgba(244,211,94,0.5)] transition-all cursor-pointer transform hover:scale-[1.05]"
            >
              START ADVENTURE
            </a>
            <a
              href="#projects"
              onClick={() => window.triggerSFX && window.triggerSFX('click')}
              className="px-8 py-3.5 font-cinzel text-sm font-bold tracking-widest text-white border-2 border-white/20 rounded-md hover:border-white hover:bg-white/5 transition-all cursor-pointer transform hover:scale-[1.05]"
            >
              VIEW TREASURE
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive Character Container */}
        <div className="relative flex items-center justify-center min-h-[450px]">
          {/* Haki Energy Canvas (2D background effect) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Golden Circle platform backdrop */}
          <div className="absolute w-72 h-72 rounded-full border border-bounty-gold/15 bg-gradient-to-t from-deep-sea to-transparent animate-[pulse_4s_infinite]" />

          {/* Avatar Container */}
          <motion.div
            onClick={runTransformation}
            whileHover={{ scale: 1.02 }}
            className={`relative w-80 h-96 cursor-pointer z-10 flex items-center justify-center transition-all duration-300 ${
              gearState === 'haki' ? 'haki-aura scale-95' 
              : gearState === 'gear5' ? 'gear5-aura scale-105' 
              : ''
            }`}
          >
            {/* Laughter Text Bubbles (HEHEHE!) */}
            <AnimatePresence>
              {laughterVisible && (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: 40, y: -80 }}
                    animate={{ scale: 1, opacity: 1, x: 60, y: -100 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute font-cinzel text-sunny-orange font-black text-2xl bg-black border border-bounty-gold px-3 py-1 rounded-md rotate-12 shadow-[0_0_10px_#F77F00] z-20 pointer-events-none"
                  >
                    HA!
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: -100, y: -40 }}
                    animate={{ scale: 1.2, opacity: 1, x: -120, y: -60 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute font-cinzel text-white font-black text-3xl bg-black border border-white/40 px-4 py-1.5 rounded-md -rotate-6 shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20 pointer-events-none"
                  >
                    HAHAHA!
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Render character image based on transformation state */}
            <div className="relative w-full h-full">
              {/* Normal State Standred */}
              <Image
                src={IMAGES.standred.src}
                alt="Shashank Vusakoila - Straw Hat Developer"
                width={IMAGES.standred.width}
                height={IMAGES.standred.height}
                priority
                className={`w-full h-full object-contain transition-all duration-500 ${
                  gearState === 'gear5' ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'
                }`}
                placeholder="blur"
                blurDataURL={IMAGES.standred.blurDataURL}
              />

              {/* Gear 5 State Standwhite */}
              <Image
                src={IMAGES.standwhite.src}
                alt="Shashank Vusakoila - Gear 5 Awakened"
                width={IMAGES.standwhite.width}
                height={IMAGES.standwhite.height}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                  gearState === 'gear5' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 blur-sm'
                }`}
                placeholder="blur"
                blurDataURL={IMAGES.standwhite.blurDataURL}
              />
            </div>
            
            {/* Callout tooltip helper */}
            <div className="absolute -bottom-4 font-mono text-[10px] tracking-wider text-bounty-gold/50 bg-[#0B132B]/90 px-3 py-1 border border-bounty-gold/10 rounded-full animate-bounce">
              CLICK AVATAR TO AWAKEN GEAR 5
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bouncing Scroll indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1 z-10 opacity-70">
        <span className="font-cinzel text-[10px] tracking-widest text-bounty-gold">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1.5 h-1.5 border-r-2 border-b-2 border-bounty-gold rotate-45"
        />
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
export default Hero;
