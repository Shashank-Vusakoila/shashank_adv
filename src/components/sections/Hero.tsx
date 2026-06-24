'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/data/assets';
import { useGameStore } from '@/store/useGameStore';
import { Sparkles } from 'lucide-react';

/* ─── Social icon SVGs ─── */
const GithubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const MailIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: 'https://github.com/Shashank-Vusakoila', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/shashank-vusakoila-5b171733a', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/divein_webworks', label: 'Instagram' },
  { icon: MailIcon, href: 'mailto:shashankvusakoila@gmail.com', label: 'Email' },
];

export function Hero() {
  const { gearState, setGearState } = useGameStore();
  const [lightningFlash, setLightningFlash] = useState(false);
  const [laughterVisible, setLaughterVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; size: number; speedY: number; color: string; life: number }>>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Particle generator for Conqueror's Haki sparks
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
      if (currentGear === 'haki' || currentGear === 'gear5') {
        const count = currentGear === 'haki' ? 3 : 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 50,
            size: Math.random() * 4 + 1.5,
            speedY: -(Math.random() * 4 + 2),
            color: Math.random() > 0.4 ? '#D62828' : '#000000',
            life: 1.0,
          });
        }
      }
      particlesRef.current.forEach((p, idx) => {
        p.y += p.speedY;
        p.life -= 0.015;
        p.x += Math.sin(p.y * 0.05) * 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (idx > 0 && Math.random() > 0.93) {
          const prev = particlesRef.current[idx - 1];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(prev.x, prev.y);
          ctx.strokeStyle = '#D62828';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.4;
          ctx.stroke();
          ctx.globalAlpha = 1;
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

  // Automated transformation sequence
  const runTransformation = () => {
    if (gearState !== 'normal') return;
    setGearState('haki');
    if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('haki');
    setTimeout(() => {
      setLightningFlash(true);
      if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('thunder');
      setTimeout(() => setLightningFlash(false), 200);
    }, 800);
    setTimeout(() => {
      setGearState('gear5');
      setLaughterVisible(true);
      if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('thunder');
    }, 1200);
    setTimeout(() => {
      setLaughterVisible(false);
      setGearState('normal');
    }, 5500);
  };

  useEffect(() => {
    const introTimer = setTimeout(() => runTransformation(), 2500);
    const lightningTimer = setInterval(() => {
      if (Math.random() > 0.65) {
        setLightningFlash(true);
        if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('thunder');
        setTimeout(() => setLightningFlash(false), 150);
      }
    }, 12000);
    return () => { clearTimeout(introTimer); clearInterval(lightningTimer); };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Full-bleed cinematic background */}
      <Image
        src="/assets/storm-ocean/hero-bg.jpg"
        alt="Cinematic ocean with Thousand Sunny"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/30 z-[1]" />

      {/* Lightning Overlay */}
      <AnimatePresence>
        {lightningFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="absolute inset-0 bg-white z-30 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* ─── Vertical Social Icons (Left Edge) ─── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-[3] hidden lg:flex flex-col gap-5"
      >
        {SOCIAL_LINKS.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white hover:text-bounty-gold hover:border-bounty-gold/50 transition-all hover:scale-110"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.div>

      {/* ─── Main Content Grid ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:pl-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-[2] pt-28 pb-16">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-sunny-orange/10 border border-sunny-orange/30 rounded-full mb-6"
          >
            <span className="font-cinzel text-[10px] tracking-wider text-sunny-orange font-bold uppercase">
              THE WORLD-CLASS STRAW HAT DEVELOPER &nbsp;⚓
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2 leading-[0.95]"
          >
            SHASHANK<br />
            VUSAKOILA
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-sm md:text-base text-gray-300 tracking-[0.15em] uppercase mb-6 font-semibold"
          >
            Full Stack Developer &bull; Hyderabad, India
          </motion.h2>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-sm text-gray-400/90 italic max-w-md mb-8 leading-relaxed"
          >
            &ldquo;I don&apos;t just write code.<br />
            I build dreams and ship them to the real world.&rdquo;
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#about"
              onClick={() => window.triggerSFX && window.triggerSFX('click')}
              className="px-7 py-3 font-cinzel text-xs font-bold tracking-widest text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded border-2 border-bounty-gold hover:shadow-[0_0_20px_rgba(244,211,94,0.5)] transition-all cursor-pointer transform hover:scale-[1.05]"
            >
              ⚔ START ADVENTURE
            </a>
            <a
              href="#projects"
              onClick={() => window.triggerSFX && window.triggerSFX('click')}
              className="px-7 py-3 font-cinzel text-xs font-bold tracking-widest text-white border-2 border-white/30 rounded hover:border-white hover:bg-white/5 transition-all cursor-pointer transform hover:scale-[1.05]"
            >
              VIEW TREASURE
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive Character Portrait */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          {/* Haki Energy Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Soft radial glow behind character */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,211,94,0.25)_0%,transparent_60%)] mix-blend-screen pointer-events-none opacity-80" />

          {/* Avatar Container */}
          <motion.div
            onClick={runTransformation}
            whileHover={{ scale: 1.02 }}
            className={`relative w-72 h-96 cursor-pointer z-10 flex items-center justify-center transition-all duration-300 ${
              gearState === 'haki' ? 'haki-aura scale-95'
              : gearState === 'gear5' ? 'gear5-aura scale-105'
              : ''
            }`}
          >
            {/* Laughter Bubbles */}
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

            {/* Character Images */}
            <div className="relative w-full h-full">
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
              <Image
                src={IMAGES.standwhite.src}
                alt="Shashank Vusakoila - Gear 5 Awakened"
                width={IMAGES.standwhite.width}
                height={IMAGES.standwhite.height}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                  gearState === 'gear5' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'
                }`}
                placeholder="blur"
                blurDataURL={IMAGES.standwhite.blurDataURL}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Bar: Scroll left, JoyBoy right ─── */}
      <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between px-8 z-[3]">
        <div className="flex flex-col items-center gap-1 opacity-70">
          <span className="font-cinzel text-[10px] tracking-widest text-bounty-gold">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 border-r-2 border-b-2 border-bounty-gold rotate-45"
          />
        </div>
        <button
          onClick={runTransformation}
          className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-bounty-gold/30 rounded-lg backdrop-blur-sm hover:border-bounty-gold/60 transition-all cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-bounty-gold group-hover:animate-spin" />
          <span className="font-cinzel text-[10px] tracking-widest text-bounty-gold font-bold">
            JOYBOY MODE: {gearState === 'gear5' ? 'GEAR 5' : gearState === 'haki' ? 'CHARGING...' : 'GEAR 5'}
          </span>
        </button>
      </div>
    </section>
  );
}
export default Hero;
