'use client';

import { motion } from 'framer-motion';
import { BookOpen, Compass, Award, Anchor } from 'lucide-react';

const LOG_ITEMS = [
  { icon: Compass, label: 'Captain', value: 'Shashank Vusakoila' },
  { icon: Anchor, label: 'Current Island', value: 'Anurag University' },
  { icon: Award, label: 'Class Type', value: 'Full Stack Software Engineer' },
  { icon: BookOpen, label: 'Ultimate Dream', value: 'Become World-Class Software Architect' },
];

export function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.25,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#0B132B] py-20 px-6 overflow-hidden"
    >
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(28,37,65,0.4),transparent)] pointer-events-none" />

      {/* Parallax elements */}
      <div className="absolute top-20 right-10 w-24 h-24 border border-bounty-gold/5 rounded-full animate-[pulse_6s_infinite]" />
      <div className="absolute bottom-20 left-10 w-36 h-36 border border-sunny-orange/5 rounded-full animate-[pulse_8s_infinite_1s]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
            PIRATE LOG #001
          </h2>
          <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
            Captain's Log
          </h3>
          <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
        </div>

        {/* Ancient Log Book Parchment Container */}
        <div className="parchment-bg p-8 md:p-12 rounded-lg relative overflow-hidden">
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#5a3c1e]" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#5a3c1e]" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#5a3c1e]" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#5a3c1e]" />

          {/* Captain profile block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left page: Photo Frame / Seal */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#5a3c1e]/40 rounded bg-white/20">
              {/* Golden Compass Seal */}
              <div className="w-24 h-24 rounded-full border-4 border-double border-[#5a3c1e] flex items-center justify-center text-[#5a3c1e] mb-4 animate-spin-slow">
                <Compass className="w-12 h-12" />
              </div>
              <h4 className="font-cinzel font-bold text-lg text-[#3b2c1a] tracking-widest text-center">
                SHASHANK'S CREW
              </h4>
              <p className="font-mono text-[10px] text-[#5a3c1e]/80 uppercase mt-1 tracking-wider">
                Vessel: Thousand Sunny V2
              </p>
            </div>

            {/* Right page: Profile stats (Typewritten look) */}
            <div className="flex flex-col gap-6">
              {LOG_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-4 border-b border-[#5a3c1e]/20 pb-3"
                  >
                    <div className="mt-1 p-2 bg-[#5a3c1e]/10 rounded-full text-[#5a3c1e]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-cinzel text-xs tracking-wider text-[#5a3c1e]/80 uppercase block">
                        {item.label}
                      </span>
                      <span className="font-cinzel font-bold text-lg text-[#3b2c1a] tracking-wide">
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Captain's Statement Log (Paragraph) */}
          <motion.div
            variants={itemVariants}
            className="mt-10 border-t-2 border-[#5a3c1e]/20 pt-6 text-center md:text-left"
          >
            <span className="font-cinzel text-xs tracking-wider text-[#5a3c1e]/80 uppercase block mb-2">
              Captain's Mission Log
            </span>
            <p className="font-cinzel text-sm leading-relaxed text-[#3b2c1a] italic tracking-wide max-w-2xl">
              "We set sail into the turbulent digital ocean to build products that weather the storm. Full-stack development is not just about writing clean logic; it's about navigating the Grand Line of complex architectures and crafting beautiful interactive experiences. We search for the legendary code, and we won't stop until our flag flies on every digital server."
            </p>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
export default About;
