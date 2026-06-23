'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { IMAGES } from '@/data/assets';
import { Mail, Check, RefreshCw, Send } from 'lucide-react';

export function Contact() {
  const { resetGame } = useGameStore();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shashankvusakoila@gmail.com'); // Example email contact
    setCopied(true);
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('victory');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRestart = () => {
    resetGame();
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('click');
    }
    window.location.hash = '#hero';
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0B132B] to-[#1a1c36] py-20 px-6 overflow-hidden"
    >
      {/* Animated Clouds Background */}
      <div className="absolute inset-x-0 top-16 h-36 opacity-10 pointer-events-none z-0">
        <div className="absolute w-[200%] h-full bg-[url('/images/globe.svg')] bg-repeat-x animate-cloud-slow opacity-60" />
      </div>

      {/* Seagulls flying (SVG vector paths) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-24 left-[15%] w-8 h-4 text-white/20 animate-[float_4s_infinite_ease-in-out]" viewBox="0 0 20 10">
          <path d="M0,5 C5,0 10,5 10,5 C10,5 15,0 20,5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute top-48 right-[20%] w-10 h-5 text-white/15 animate-[float_6s_infinite_1.5s_ease-in-out]" viewBox="0 0 20 10">
          <path d="M0,5 C5,0 10,5 10,5 C10,5 15,0 20,5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="text-center mb-10 z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          JOIN THE CREW
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          Set Alliance Course
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Avatar Display (Using sitred.png again) */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="absolute w-60 h-60 bg-sunny-orange/10 rounded-full blur-3xl animate-[pulse_4s_infinite]" />
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative w-72 h-72 flex items-center justify-center z-10"
          >
            <Image
              src={IMAGES.sitred.src}
              alt="Captain Shashank Welcoming"
              width={IMAGES.sitred.width}
              height={IMAGES.sitred.height}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.5)] animate-float"
              placeholder="blur"
              blurDataURL={IMAGES.sitred.blurDataURL}
            />
          </motion.div>
        </div>

        {/* Right Side: Logbook recruitment form/details */}
        <div className="parchment-bg p-8 rounded-lg border-4 border-[#5a3c1e] shadow-xl">
          <h4 className="font-cinzel text-xl font-black text-[#3b2c1a] uppercase mb-4 text-center border-b border-[#5a3c1e]/20 pb-3">
            Officer Recruitment Form
          </h4>
          
          <p className="font-sans text-sm text-[#3b2c1a] leading-relaxed mb-6 italic text-center">
            "We are recruiting top-tier officers, tech coordinators, and product leads. Submit your coordinate letters or send a message directly to the captain's desk."
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {/* Email Field with copy functionality */}
            <div className="flex items-center justify-between bg-[#5a3c1e]/10 border border-[#5a3c1e]/30 p-4 rounded text-[#3b2c1a]">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D62828]" />
                <span className="font-mono text-sm font-semibold select-all">
                  shashankvusakoila@gmail.com
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 hover:bg-[#5a3c1e]/20 rounded transition-colors text-[#5a3c1e] cursor-pointer"
                title="Copy Coordinates"
              >
                {copied ? <Check className="w-4.5 h-4.5 text-green-700" /> : <Send className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 py-3 px-6 font-cinzel text-xs font-black tracking-widest text-white bg-[#D62828] hover:bg-black rounded transition-all cursor-pointer hover:shadow-[0_0_12px_#D62828]"
            >
              {copied ? 'COPIED COORDINATES' : 'RECRUIT ME'}
            </button>
            
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 py-3 px-6 font-cinzel text-xs font-black tracking-widest text-[#3b2c1a] border border-[#5a3c1e] hover:bg-[#5a3c1e]/10 rounded transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              START NEW ADVENTURE
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
export default Contact;
