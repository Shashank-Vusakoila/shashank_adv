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
  githubLink?: string;
  screenshot: string; // fallback or real path
}

export const PROJECT_BOSSES: ProjectBoss[] = [
  {
    id: 'reyansh',
    projectName: 'Reyansh Skin & Hair',
    bossName: 'Dr. Alopecia',
    bossTitle: 'Overlord of Hair Fall & Acne',
    bossDescription: 'A clinical monster spreading bad hair days and dermatological disasters across the land.',
    theme: 'punch',
    combatText: 'UNLEASH CONQUEROR HAKI PUNCH!',
    rewardBounty: 250000000,
    description: 'A comprehensive medical consulting portal built for dermatology clinics, providing online appointment bookings, hair-fall assessments, and skin treatment tracking dashboards.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Resend Email API'],
    liveLink: 'https://reyanshskin.com',
    screenshot: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'orvexa',
    projectName: 'Orvexa Imports & Exports',
    bossName: 'Admiral Tariff',
    bossTitle: 'Garrison Commander of the Customs Fleet',
    bossDescription: 'A naval commander locking imports in iron ports, blocking shipping containers, and inflating trade taxes.',
    theme: 'cannon',
    combatText: 'FIRE THOUSAND SUNNY CANNONS!',
    rewardBounty: 320000000,
    description: 'An international trade management software facilitating cargo manifest tracking, custom clearance documentation pipelines, and multi-currency tariff calculators.',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize ORM', 'Chart.js'],
    liveLink: 'https://orvexa-trade.com',
    screenshot: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'relaxin',
    projectName: 'Relax-In',
    bossName: 'Stress Shogun',
    bossTitle: 'Wielder of the Burnout Blade',
    bossDescription: 'An ancient samurai entity sucking peace from developers, unleashing wave after wave of system alerts.',
    theme: 'slash',
    combatText: 'PERFORM THREE-SWORD STYLE CUT!',
    rewardBounty: 180000000,
    description: 'A mental wellness and task pacing SaaS web application. It integrates Pomodoro combat timers, ambient soundscapes, and AI-driven stress relief exercises.',
    techStack: ['Next.js', 'Zustand', 'Tailwind CSS', 'Howler.js', 'Firebase Auth', 'Firestore'],
    liveLink: 'https://relax-in-wellness.com',
    screenshot: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cakesss',
    projectName: 'Cakesss Delight',
    bossName: 'Sugar Titan',
    bossTitle: 'Empress of the Calorie Castle',
    bossDescription: 'A giant baking witch turning clean code into marshmallow spaghetti, unleashing glucose explosions.',
    theme: 'fire',
    combatText: 'IGNITE FIRE FIST EMBERS!',
    rewardBounty: 120000000,
    description: 'An e-commerce storefront specializing in custom-ordered confectioneries, displaying real-time customized cake decorators, recipe inventories, and secure checkout portals.',
    techStack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Stripe Integration', 'Node.js', 'MongoDB'],
    liveLink: 'https://cakesss-delight.com',
    screenshot: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  }
];
export default PROJECT_BOSSES;
