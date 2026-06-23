'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Compass } from 'lucide-react';
import { useAudioStore } from '@/store/useAudioStore';
import { useGameStore } from '@/store/useGameStore';

const NAV_LINKS = [
  { href: '#hero', label: 'Intro' },
  { href: '#about', label: 'Pirate Log' },
  { href: '#skills', label: 'Devil Fruits' },
  { href: '#projects', label: 'Boss Battles' },
  { href: '#achievements', label: 'Bounty Board' },
  { href: '#timeline', label: 'Grand Line' },
  { href: '#contact', label: 'Recruit Me' },
];

export function Navbar() {
  const { isMuted, bgmVolume, toggleMute, setBgmVolume } = useAudioStore();
  const { gameStarted } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Handle background opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll offset
      const sections = NAV_LINKS.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 200;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i] as HTMLElement;
        if (sec) {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(NAV_LINKS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync menu state with clicking links
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.triggerSFX) {
      window.triggerSFX('click');
    }
  };

  if (!gameStarted) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-dark-ocean/90 border-b border-bounty-gold/20 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 text-bounty-gold group">
          <Compass className="w-6 h-6 transition-transform group-hover:rotate-45 duration-300" />
          <span className="font-cinzel text-lg font-black tracking-widest text-white group-hover:text-bounty-gold transition-colors">
            SHASHANK
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className={`font-cinzel text-xs tracking-widest transition-all relative py-1 uppercase ${
                activeSection === link.href ? 'text-bounty-gold font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-sunny-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Audio Interface dashboard & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Audio volume settings */}
          <div className="flex items-center gap-2 bg-[#1C2541]/80 px-3 py-1.5 rounded-full border border-bounty-gold/10">
            <button
              onClick={() => {
                toggleMute();
                if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
              }}
              className="text-bounty-gold hover:text-sunny-orange transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : bgmVolume}
              onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-deep-sea rounded-lg appearance-none cursor-pointer accent-bounty-gold"
            />
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
            }}
            className="md:hidden text-white hover:text-bounty-gold transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-ocean/95 border-b border-bounty-gold/10 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`font-cinzel text-sm tracking-wider uppercase py-2 border-b border-white/5 transition-colors ${
                    activeSection === link.href ? 'text-bounty-gold font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
export default Navbar;
