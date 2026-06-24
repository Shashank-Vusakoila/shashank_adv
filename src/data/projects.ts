export interface ProjectBoss {
  id: string;
  projectName: string;
  bossName: string;
  bossTitle: string;
  bossDescription: string;
  theme: 'punch' | 'cannon' | 'slash' | 'fire';
  combatText: string;
  rewardBounty: number;
  description: string;
  techStack: string[];
  liveLink: string;
  screenshot: string;
}

export const PROJECT_BOSSES: ProjectBoss[] = [
  {
    id: 'reyansh',
    projectName: 'Reyansh Skin & Hair',
    bossName: 'Dr. Alopecia',
    bossTitle: 'Overlord of Hair Fall & Acne',
    bossDescription: 'A clinical monster spreading dermatological alerts and follicle fatigue across the land.',
    theme: 'punch',
    combatText: 'UNLEASH CONQUEROR HAKI PUNCH!',
    rewardBounty: 250000000,
    description: 'A specialized medical consulting platform providing online appointment bookings, hair-fall assessments, and skin treatment tracking dashboards.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    liveLink: 'https://github.com/Shashank-Vusakoila', // Placeholder/link
    screenshot: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'orvexa',
    projectName: 'Orvexa Imports & Exports',
    bossName: 'Trade Emperor',
    bossTitle: 'Sovereign of Custom Docks & Tariffs',
    bossDescription: 'A trading tycoon blocking port gates, inflating tariff ratios, and capturing shipping containers.',
    theme: 'cannon',
    combatText: 'FIRE THOUSAND SUNNY CANNONS!',
    rewardBounty: 320000000,
    description: 'A professional import-export business platform showcasing trade pipelines, global cargo capabilities, and customs documentation gateways.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    liveLink: 'https://github.com/Shashank-Vusakoila',
    screenshot: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'relaxin',
    projectName: 'Relax-In',
    bossName: 'The Wanderer',
    bossTitle: 'Guardian of the Sleep-Deprived Gates',
    bossDescription: 'A mysterious swordsman slicing peace and keeping developers awake with code warnings.',
    theme: 'slash',
    combatText: 'PERFORM THREE-SWORD STYLE CUT!',
    rewardBounty: 180000000,
    description: 'A modern hotel booking and hospitality interface facilitating room availability tracking, reservation forms, and guest review systems.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    liveLink: 'https://github.com/Shashank-Vusakoila',
    screenshot: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cakesss',
    projectName: 'Cakesss Delight',
    bossName: 'Flame Chef',
    bossTitle: 'Sorcerer of Sweet Sugar Calamities',
    bossDescription: 'A blazing patissier setting server files on fire with glucose explosions and cake-baking alerts.',
    theme: 'fire',
    combatText: 'IGNITE FIRE FIST EMBERS!',
    rewardBounty: 120000000,
    description: 'A modern bakery e-commerce showcase displaying customizable orders, sweet recipe logs, and checkout gateways.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    liveLink: 'https://github.com/Shashank-Vusakoila',
    screenshot: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  }
];
export default PROJECT_BOSSES;
