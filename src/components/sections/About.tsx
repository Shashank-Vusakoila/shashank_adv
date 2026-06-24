'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMAGES } from '@/data/assets';
import { BookOpen, Anchor, Award, Target, Compass, MapPin } from 'lucide-react';

const STATS = [
  { value: '5+', label: 'YEARS\nLEARNING' },
  { value: '25+', label: 'PROJECTS\nCOMPLETED' },
  { value: '1M+', label: 'LINES OF\nCODE' },
  { value: '∞', label: 'CUPS OF\nCOFFEE' },
];

const INFO_ITEMS = [
  { icon: Anchor,   label: 'Bounty on Dreams:', value: 'Anurag University' },
  { icon: Target,   label: 'Class:', value: 'Full Stack Developer' },
  { icon: Compass,  label: 'Crew / Agency:', value: 'DiveIn WebWorks' },
  { icon: MapPin,   label: 'Hobbies:', value: 'Code & Coffee' },
  { icon: Award,    label: 'Ultimate Dream:', value: 'Become World-class Software\nEngineer & Architect' },
];

export function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#0B132B] py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          PIRATE LOG #001
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase flex items-center justify-center gap-3">
          Captain&apos;s Log <BookOpen className="w-8 h-8 text-bounty-gold" />
        </h3>
        <p className="font-cinzel text-xs tracking-widest text-gray-400 uppercase mt-2">
          GET TO KNOW THE CAPTAIN
        </p>
      </motion.div>

      {/* Parchment Open Book */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-6xl mx-auto"
      >
        <div className="parchment-bg rounded-lg border-4 border-[#8B5A2B] shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#5a3c1e]" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#5a3c1e]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#5a3c1e]" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#5a3c1e]" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left Page: Bio + Stats */}
            <div className="lg:col-span-3 p-8 md:p-10 lg:border-r-2 border-[#5a3c1e]/30">
              <p className="font-sans text-sm text-[#3b2c1a] leading-relaxed mb-6">
                I&apos;m a Full Stack Developer passionate about crafting powerful, digital experiences using cutting-edge tech — from clean UI to powerful backends, I build products for massive impact.
              </p>
              <p className="font-sans text-sm text-[#3b2c1a] leading-relaxed mb-8 italic">
                My mission is to become a world-class software engineer and architect.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 border-t-2 border-[#5a3c1e]/20 pt-6">
                {STATS.map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="font-cinzel text-2xl md:text-3xl font-black text-[#3b2c1a] block">{s.value}</span>
                    <span className="font-mono text-[9px] tracking-wider text-[#5a3c1e]/70 uppercase whitespace-pre-line leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Page: Info + Portrait */}
            <div className="lg:col-span-2 p-8 md:p-10 flex flex-col">
              <div className="flex flex-col gap-3 mb-6">
                {INFO_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[#D62828] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-mono text-[9px] tracking-wider text-[#5a3c1e]/70 uppercase block">{item.label}</span>
                        <span className="font-cinzel text-xs font-bold text-[#3b2c1a] whitespace-pre-line">{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Portrait */}
              <div className="relative w-full max-w-[200px] mx-auto mt-auto">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#5a3c1e]/40 shadow-lg">
                  <Image
                    src={IMAGES.sitred.src}
                    alt="Shashank Vusakoila"
                    width={IMAGES.sitred.width}
                    height={IMAGES.sitred.height}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL={IMAGES.sitred.blurDataURL}
                  />
                </div>
                <span className="block text-center font-cinzel text-xs text-[#3b2c1a] italic mt-2 tracking-wide">Shashank Vusakoila</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
export default About;
