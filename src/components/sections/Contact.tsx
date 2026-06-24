'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGES } from '@/data/assets';
import { Send, Check } from 'lucide-react';

/* ─── Inline SVG icons for social links ─── */
const LinkedinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/shashank-vusakoila-5b171733a', label: 'LinkedIn' },
  { icon: GithubIcon, href: 'https://github.com/Shashank-Vusakoila', label: 'GitHub' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/divein_webworks', label: 'Instagram' },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleSendMessage = () => {
    window.open('mailto:shashankvusakoila@gmail.com', '_blank');
    if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('shashankvusakoila@gmail.com');
    setCopied(true);
    if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('victory');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-[#0B132B] via-[#1a1c36] to-[#0B132B] py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Sunset glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F77F00]/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* One Piece Jolly Roger */}
            <div className="mb-6">
              <svg className="w-20 h-20 text-white mx-auto lg:mx-0" viewBox="0 0 100 100" fill="none">
                {/* Skull */}
                <circle cx="50" cy="40" r="22" stroke="currentColor" strokeWidth="3" />
                <circle cx="42" cy="36" r="4" fill="currentColor" />
                <circle cx="58" cy="36" r="4" fill="currentColor" />
                <path d="M44 48 Q50 54 56 48" stroke="currentColor" strokeWidth="2" fill="none" />
                {/* Crossbones */}
                <path d="M22 70 L78 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M22 20 L78 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                {/* Straw Hat */}
                <path d="M30 30 Q50 10 70 30" stroke="#F4D35E" strokeWidth="3" fill="none" />
                <path d="M26 32 L74 32" stroke="#D62828" strokeWidth="4" />
              </svg>
            </div>

            <h3 className="font-cinzel text-3xl md:text-4xl font-black text-white tracking-widest uppercase mb-2">
              JOIN THE CREW
            </h3>
            <p className="font-cinzel text-xs tracking-[0.2em] text-sunny-orange uppercase mb-6">
              EVERY LEGEND NEEDS A CREW
            </p>

            <p className="font-sans text-sm text-gray-400 leading-relaxed mb-2 max-w-md">
              Looking for a passionate developer<br />
              to join your crew?
            </p>
            <p className="font-sans text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
              Let&apos;s build something legendary together.
            </p>

            {/* SEND MESSAGE Button */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleSendMessage}
                className="flex items-center gap-2 px-6 py-3 font-cinzel text-xs font-bold tracking-widest text-black bg-gradient-to-r from-bounty-gold to-sunny-orange rounded border-2 border-bounty-gold hover:shadow-[0_0_20px_rgba(244,211,94,0.5)] transition-all cursor-pointer hover:scale-105"
              >
                <Send className="w-4 h-4" />
                {copied ? 'COORDINATES COPIED' : 'SEND MESSAGE'}
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:text-bounty-gold hover:border-bounty-gold/50 transition-all hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Character Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-[#F77F00]/20 via-transparent to-transparent rounded-lg" />
              <Image
                src={IMAGES.sitred.src}
                alt="Captain Shashank Welcoming"
                width={IMAGES.sitred.width}
                height={IMAGES.sitred.height}
                className="w-full h-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                placeholder="blur"
                blurDataURL={IMAGES.sitred.blurDataURL}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
