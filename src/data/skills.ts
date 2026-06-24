export interface SkillFruit {
  id: string;
  name: string;
  type: string;
  powerLevel: number;
  color: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical';
  description: string;
  skills: string[];
  image: string;
  category: string;
}

export const SKILL_FRUITS: SkillFruit[] = [
  {
    id: 'frontend',
    name: 'Gomu Gomu',
    type: 'Paramecia',
    powerLevel: 95,
    color: '#E84393',
    rarity: 'Legendary',
    description: 'Grants the user the ability to stretch UI boundaries and build dynamic, elastic interfaces.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/devil-fruits/frontend.jpg',
    category: 'FRONTEND',
  },
  {
    id: 'backend',
    name: 'Mera Mera',
    type: 'Logia',
    powerLevel: 90,
    color: '#E17055',
    rarity: 'Legendary',
    description: 'Burns through server-side challenges with blazing API architecture.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL'],
    image: '/assets/devil-fruits/backend.jpg',
    category: 'BACKEND',
  },
  {
    id: 'mobile',
    name: 'Raiku Raiku',
    type: 'Zoan',
    powerLevel: 80,
    color: '#A29BFE',
    rarity: 'Epic',
    description: 'Lightning-fast mobile development across platforms.',
    skills: ['React Native', 'Expo', 'Prototyping', 'Push Notifications'],
    image: '/assets/devil-fruits/mobile.jpg',
    category: 'MOBILE',
  },
  {
    id: 'ai',
    name: 'Ito Ito',
    type: 'Mythical Zoan',
    powerLevel: 85,
    color: '#00CEC9',
    rarity: 'Epic',
    description: 'Strings together AI threads to control machine learning and automation.',
    skills: ['Python', 'Machine Learning', 'OpenAI API', 'LangChain'],
    image: '/assets/devil-fruits/ai.jpg',
    category: 'AI & ML',
  },
  {
    id: 'database',
    name: 'Hie Hie',
    type: 'Paramecia',
    powerLevel: 85,
    color: '#74B9FF',
    rarity: 'Rare',
    description: 'Freezes data in time — absolute control over persistence and queries.',
    skills: ['MongoDB', 'PostgreSQL', 'Prisma/ORM'],
    image: '/assets/devil-fruits/database.jpg',
    category: 'DATABASE',
  },
  {
    id: 'devops',
    name: 'Yami Yami',
    type: 'Logia',
    powerLevel: 90,
    color: '#636E72',
    rarity: 'Rare',
    description: 'Absorbs the darkness of deployment complexity and masters the cloud.',
    skills: ['Docker', 'AWS', 'CI/CD', 'Git'],
    image: '/assets/devil-fruits/devops.jpg',
    category: 'DEVOPS',
  }
];
