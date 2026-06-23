export interface JourneyMilestone {
  id: string;
  name: string;
  epoch: string;
  details: string;
  coordinate: { x: number; y: number }; // percentage positions on map (0 - 100)
}

export const VOYAGE_MILESTONES: JourneyMilestone[] = [
  {
    id: 'school',
    name: 'Log Pose: Schooling',
    epoch: '2010 - 2020',
    details: 'Completed foundational schooling. Developed an early curiosity for hardware mechanics, logical problem solving, and basic video games.',
    coordinate: { x: 12, y: 20 }
  },
  {
    id: 'intermediate',
    name: 'Log Pose: MPC Board',
    epoch: '2020 - 2022',
    details: 'Pursued Math, Physics, and Chemistry. Deepened mathematical logic foundations and encountered algorithmic programming for the first time.',
    coordinate: { x: 32, y: 65 }
  },
  {
    id: 'university',
    name: 'Log Pose: CSE University',
    epoch: '2022 - 2026',
    details: 'Set sail at Anurag University for Computer Science Engineering. Learned data structures, computer networks, and full stack web architectures.',
    coordinate: { x: 55, y: 30 }
  },
  {
    id: 'projects',
    name: 'Log Pose: Sea Battles',
    epoch: '2025 - Present',
    details: 'Created full-stack portals like Reyansh Skin, Orvexa imports, and Relax-In wellness SaaS. Fought back-end latency and state management bosses.',
    coordinate: { x: 74, y: 75 }
  },
  {
    id: 'future',
    name: 'Log Pose: New World',
    epoch: 'Future Voyage',
    details: 'Seeking a world-class Software Engineering crew to build cutting-edge systems, AI-powered automation pipelines, and scalable web infrastructures.',
    coordinate: { x: 90, y: 40 }
  }
];
export default VOYAGE_MILESTONES;
