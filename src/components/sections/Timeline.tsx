'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VOYAGE_MILESTONES, JourneyMilestone } from '@/data/timeline';
import { Anchor, Navigation, Calendar } from 'lucide-react';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<JourneyMilestone | null>(VOYAGE_MILESTONES[0]);

  // Track scroll through the timeline section
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress starting when container enters scroll view and ending when it scrolls out
      const totalHeight = rect.height;
      const progress = Math.min(1, Math.max(0, -rect.top / (totalHeight - windowHeight)));
      setScrollProgress(progress);

      // Determine active milestone based on progress range
      const index = Math.min(
        VOYAGE_MILESTONES.length - 1,
        Math.floor(progress * VOYAGE_MILESTONES.length)
      );
      setActiveMilestone(VOYAGE_MILESTONES[index]);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute ship position & steering rotation angle along course
  const getShipCoords = (p: number) => {
    const segmentCount = VOYAGE_MILESTONES.length - 1;
    const segmentSize = 1 / segmentCount;
    
    const segmentIdx = Math.min(segmentCount - 1, Math.floor(p / segmentSize));
    const segmentProgress = (p - segmentIdx * segmentSize) / segmentSize;

    const start = VOYAGE_MILESTONES[segmentIdx].coordinate;
    const end = VOYAGE_MILESTONES[segmentIdx + 1].coordinate;

    const x = start.x + (end.x - start.x) * segmentProgress;
    const y = start.y + (end.y - start.y) * segmentProgress;
    
    // Compute steering rotation angle (Math.atan2)
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    return { x, y, angle };
  };

  const ship = getShipCoords(scrollProgress);

  // Generate SVG path string matching the coordinates in viewBox 0 0 100 100
  const pathD = VOYAGE_MILESTONES.reduce((acc, m, idx) => {
    return acc + `${idx === 0 ? 'M' : 'L'} ${m.coordinate.x} ${m.coordinate.y} `;
  }, '');

  return (
    <div
      ref={containerRef}
      id="timeline"
      className="relative w-full h-[200vh] bg-[#0B132B]"
    >
      {/* Sticky Content Wrapper (sticks for the scroll length) */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-6 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-6 z-10">
          <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
            GRAND LINE JOURNEY
          </h2>
          <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
            Voyage Logbook
          </h3>
          <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-[70vh]">
          
          {/* Left: Interactive map canvas (8 cols on desktop) */}
          <div className="lg:col-span-8 bg-[#151c33]/40 border-2 border-bounty-gold/15 rounded-lg p-4 relative h-full flex items-center justify-center overflow-hidden">
            {/* Map lines, islands, and Sunny Ship */}
            <div className="relative w-full h-full aspect-[16/10] max-h-full">
              
              {/* Sea Waves displacement grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,211,94,0.02)_0%,transparent_100%)] bg-[size:20px_20px] bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

              {/* Dotted Voyage Route SVG */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#F4D35E"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  className="opacity-40"
                />
              </svg>

              {/* Voyage Milestones (Islands) */}
              {VOYAGE_MILESTONES.map((m) => {
                const isActive = activeMilestone?.id === m.id;
                return (
                  <div
                    key={m.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                    style={{ left: `${m.coordinate.x}%`, top: `${m.coordinate.y}%` }}
                    onClick={() => {
                      setActiveMilestone(m);
                      if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
                    }}
                  >
                    {/* Pulsing Island Anchor point */}
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-sunny-orange scale-125 shadow-[0_0_12px_#F77F00]' 
                        : 'bg-bounty-gold hover:bg-white scale-100'
                    }`}>
                      <Anchor className="w-2.5 h-2.5 text-black" />
                    </div>

                    {/* Label floating above node */}
                    <span className={`absolute -top-6 font-cinzel text-[8px] md:text-[10px] tracking-wider whitespace-nowrap px-2 py-0.5 rounded bg-black/80 border transition-all ${
                      isActive ? 'border-sunny-orange text-sunny-orange' : 'border-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      {m.name.replace('Log Pose: ', '')}
                    </span>
                  </div>
                );
              })}

              {/* Thousand Sunny Ship */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 transition-transform duration-100 ease-out z-20 pointer-events-none"
                style={{ 
                  left: `${ship.x}%`, 
                  top: `${ship.y}%`,
                  transform: `translate(-50%, -50%) rotate(${ship.angle}deg)` 
                }}
              >
                {/* Ship icon (Using styled compass or SVG boat) */}
                <div className="w-full h-full bg-gradient-to-r from-sunny-orange to-bounty-gold rounded-full flex items-center justify-center shadow-[0_0_12px_#F77F00] border-2 border-white animate-[pulse_1.5s_infinite]">
                  <Navigation className="w-4.5 h-4.5 text-black rotate-45" />
                </div>
              </div>

            </div>
          </div>

          {/* Right: Selected Logbook Entry Details (4 cols on desktop) */}
          <div className="lg:col-span-4 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeMilestone && (
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="parchment-bg p-6 rounded-lg border-2 border-[#5a3c1e]"
                >
                  <div className="flex items-center gap-2 text-[#D62828] mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold">{activeMilestone.epoch}</span>
                  </div>
                  
                  <h4 className="font-cinzel text-lg font-black text-[#3b2c1a] uppercase mb-4">
                    {activeMilestone.name}
                  </h4>
                  
                  <p className="font-sans text-xs md:text-sm text-[#3b2c1a] leading-relaxed italic">
                    "{activeMilestone.details}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
export default Timeline;
