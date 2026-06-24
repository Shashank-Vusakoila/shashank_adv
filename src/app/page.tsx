'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Timeline } from '@/components/sections/Timeline';
import { Socials } from '@/components/sections/Socials';
import { Contact } from '@/components/sections/Contact';
import { SunsetEnding } from '@/components/sections/SunsetEnding';

export default function Home() {
  const { gameStarted } = useGameStore();

  return (
    <main className="relative min-h-screen bg-[#0B132B] text-white">
      {/* 1. Loader screen (handles user click audio gesture) */}
      <LoadingScreen />

      {/* 2. Main Navigation dashboard */}
      <Navbar />

      {/* 3. Game Content (Fades in when loaded) */}
      <AnimatePresence>
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full flex flex-col"
          >
            {/* Adventure Sections */}
            <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Achievements />
      <Socials />
      <Contact />
      <SunsetEnding />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
