'use client';

import { motion } from 'framer-motion';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CREW_SOCIALS = [
  {
    name: 'GitHub',
    title: 'Straw Hat Repository',
    description: 'The captain\'s personal vault containing battle codes, automated scripts, and system fleets.',
    icon: GithubIcon,
    artifact: 'Straw Hat Emblem',
    color: '#F4D35E', // Gold
    url: 'https://github.com/Shashank-Vusakoila',
    svgArt: (
      <svg className="w-24 h-24 text-bounty-gold mx-auto drop-shadow-[0_0_15px_#F4D35E]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Straw Hat Silhouette outline */}
        <path d="M15 70 C 25 70, 30 50, 50 50 C 70 50, 75 70, 85 70" />
        <ellipse cx="50" cy="70" rx="35" ry="12" />
        <path d="M32 63 C 32 40, 68 40, 68 63" fill="#D62828" opacity="0.8" />
        <path d="M30 65 L 70 65" stroke="#D62828" strokeWidth="4" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    title: 'Log Pose Navigator',
    description: 'Establish professional alignments, recruit officers, and negotiate contract alliances across corporate ports.',
    icon: LinkedinIcon,
    artifact: 'Glass Log Pose',
    color: '#00D8FF', // Ocean Cyan
    url: 'https://www.linkedin.com/in/shashank-vusakoila-5b171733a',
    svgArt: (
      <svg className="w-24 h-24 text-cyan-400 mx-auto drop-shadow-[0_0_15px_#00D8FF]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Glass sphere compass */}
        <circle cx="50" cy="50" r="30" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="28" />
        {/* Center compass needle */}
        <path d="M50 28 L56 50 L50 46 L44 50 Z" fill="currentColor" className="animate-[spin_4s_linear_infinite]" />
        <path d="M50 72 L56 50 L50 54 L44 50 Z" fill="#D62828" className="animate-[spin_4s_linear_infinite]" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        {/* Wrist strap loops */}
        <path d="M20 50 C 20 20, 80 20, 80 50" strokeWidth="1" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    title: 'Vivre Card Log',
    description: 'Track the captain\'s casual travel journals, food expeditions, and visual logs beyond code realms.',
    icon: InstagramIcon,
    artifact: 'Burning Paper',
    color: '#F77F00', // Orange
    url: 'https://www.instagram.com/divein_webworks',
    svgArt: (
      <svg className="w-24 h-24 text-sunny-orange mx-auto drop-shadow-[0_0_15px_#F77F00]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Irregular burning paper shape */}
        <path d="M30 20 C 35 25, 65 15, 75 25 C 80 45, 68 75, 70 85 C 55 80, 35 85, 25 75 C 20 55, 25 35, 30 20 Z" fill="rgba(255,255,255,0.05)" />
        {/* Flame sparks rising from edges */}
        <path d="M68 22 C 72 15, 75 25, 70 28 Z" fill="#F77F00" stroke="none" />
        <path d="M26 73 C 22 68, 28 65, 30 70 Z" fill="#D62828" stroke="none" />
        {/* Kanji/Symbol inside paper representing Shashank */}
        <text x="50" y="55" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontFamily="serif" fill="currentColor" fontWeight="bold">S</text>
      </svg>
    )
  }
];

export function Socials() {
  return (
    <section
      id="socials"
      className="relative w-full flex flex-col items-center justify-center bg-[#0B132B] py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(28,37,65,0.4),transparent_60%)] pointer-events-none" />

      {/* Section Titles */}
      <div className="text-center mb-16 z-10">
        <h2 className="font-cinzel text-xs tracking-[0.3em] text-sunny-orange font-bold uppercase mb-2">
          PIRATE CREW NETWORK
        </h2>
        <h3 className="font-cinzel text-3xl md:text-5xl font-black text-white tracking-widest uppercase">
          Straw Hat Alliances
        </h3>
        <div className="w-24 h-1 bg-bounty-gold mx-auto mt-4 rounded-full shadow-[0_0_8px_#F4D35E]" />
      </div>

      {/* Social artifacts grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center relative z-10">
        {CREW_SOCIALS.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && window.triggerSFX) window.triggerSFX('click');
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
              }}
              className="glass-panel p-8 rounded-lg text-center flex flex-col justify-between items-center w-full max-w-sm border border-white/5 transition-all shadow-lg hover:border-bounty-gold/30 hover:shadow-[0_10px_30px_rgba(244,211,94,0.1)] group relative overflow-hidden"
            >
              {/* Highlight background glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: social.color }}
              />

              <div className="w-full">
                {/* SVG Themed Artifact Representation */}
                <div className="mb-6 relative flex items-center justify-center h-28">
                  {social.svgArt}
                </div>

                <span className="font-mono text-[9px] tracking-widest text-sunny-orange uppercase block font-bold mb-2">
                  Artifact: {social.artifact}
                </span>

                <h4 className="font-cinzel text-xl font-black text-white uppercase mb-1">
                  {social.name}
                </h4>
                
                <h5 className="font-cinzel text-xs text-bounty-gold tracking-widest uppercase mb-4 opacity-80">
                  {social.title}
                </h5>

                <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {social.description}
                </p>
              </div>

              {/* Visit link arrow */}
              <div className="mt-8 flex items-center gap-2 font-cinzel text-xs tracking-wider text-white group-hover:text-bounty-gold transition-colors font-bold uppercase">
                <Icon className="w-4 h-4" />
                ESTABLISH VIVRE BOND
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
export default Socials;
