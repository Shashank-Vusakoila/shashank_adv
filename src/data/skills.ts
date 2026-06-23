export interface SkillFruit {
  id: string;
  name: string;
  fruitName: string;
  type: string;
  description: string;
  mastery: number; // percentage (0 - 100)
  level: string; // e.g. "Advanced", "Intermediate"
  projectsUsed: string[];
  color: string;
  geometryType: 'torusKnot' | 'dodecahedron' | 'icosahedron' | 'cone' | 'octahedron' | 'sphere' | 'torus' | 'tetrahedron';
}

export const SKILL_FRUITS: SkillFruit[] = [
  {
    id: 'react',
    name: 'React.js / Next.js',
    fruitName: 'Re-Re Fruit (Model: Next)',
    type: 'Logia (System Control)',
    description: 'Allows the user to control rendering cycles, manipulate DOM states seamlessly, and deploy server-side portals across the Web.',
    mastery: 95,
    level: 'Grandmaster',
    projectsUsed: ['Reyansh Skin & Hair', 'Orvexa Imports', 'Cakesss Delight'],
    color: '#00D8FF',
    geometryType: 'torusKnot'
  },
  {
    id: 'javascript',
    name: 'TypeScript / JavaScript',
    fruitName: 'Sci-Sci Fruit (Model: Script)',
    type: 'Paramecia (Engine Mastery)',
    description: 'Grants the ability to manipulate memory addresses, compile synchronous instructions, and invoke asynchronous web execution.',
    mastery: 92,
    level: 'Master',
    projectsUsed: ['Reyansh Skin & Hair', 'Orvexa Imports', 'Relax-In', 'Cakesss Delight'],
    color: '#F4D35E',
    geometryType: 'dodecahedron'
  },
  {
    id: 'node',
    name: 'Node.js / Express',
    fruitName: 'No-No Fruit (Model: Server)',
    type: 'Logia (Stream Flow)',
    description: 'Provides command over asynchronous event loops, I/O ocean streams, and back-end server routing chambers.',
    mastery: 88,
    level: 'Master',
    projectsUsed: ['Orvexa Imports', 'Relax-In'],
    color: '#339933',
    geometryType: 'icosahedron'
  },
  {
    id: 'mongodb',
    name: 'MongoDB / PostgreSQL',
    fruitName: 'Clu-Clu Fruit (Model: Cluster)',
    type: 'Paramecia (Storage Haki)',
    description: 'Empowers the user to create massive document structures, execute querying spells, and lock data records.',
    mastery: 85,
    level: 'Expert',
    projectsUsed: ['Orvexa Imports', 'Relax-In'],
    color: '#47A248',
    geometryType: 'cone'
  },
  {
    id: 'python',
    name: 'Python / Django',
    fruitName: 'Py-Py Fruit (Model: Constrictor)',
    type: 'Zoan (Beast Processor)',
    description: 'Transforms the user into a high-speed data cruncher, capable of processing neural nets and automation scripts.',
    mastery: 80,
    level: 'Expert',
    projectsUsed: ['Automation Pipelines', 'AI Agents'],
    color: '#3776AB',
    geometryType: 'octahedron'
  },
  {
    id: 'reactnative',
    name: 'React Native',
    fruitName: 'Mo-Mo Fruit (Model: Mobile)',
    type: 'Paramecia (App Expansion)',
    description: 'Allows the user to project fluid UI shells directly onto iOS and Android pocket dimensions simultaneously.',
    mastery: 82,
    level: 'Expert',
    projectsUsed: ['Mobile Client Portals'],
    color: '#61DAFB',
    geometryType: 'sphere'
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    fruitName: 'Lo-Lo Fruit (Model: Version)',
    type: 'Paramecia (Timeline Split)',
    description: 'Grants the power to split timelines (branches), merge dimensional changes, and rollback catastrophic historical mistakes.',
    mastery: 90,
    level: 'Master',
    projectsUsed: ['All Battle Repositories'],
    color: '#F05032',
    geometryType: 'torus'
  },
  {
    id: 'vercel',
    name: 'Vercel / Cloud Infrastructure',
    fruitName: 'Ne-Ne Fruit (Model: Cloud)',
    type: 'Logia (Edge Deployment)',
    description: 'Enables instantaneous global distribution of applications via edge CDN streams and cloud hosting vectors.',
    mastery: 88,
    level: 'Expert',
    projectsUsed: ['Reyansh Skin & Hair', 'Orvexa Imports', 'Cakesss Delight'],
    color: '#FFFFFF',
    geometryType: 'tetrahedron'
  }
];
