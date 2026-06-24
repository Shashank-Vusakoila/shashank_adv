export interface JourneyMilestone {
  id: string;
  name: string;
  label: string;
  epoch: string;
  details: string;
  coordinate: { x: number; y: number };
}

export const VOYAGE_MILESTONES: JourneyMilestone[] = [
  {
    id: 'schooling',
    name: 'ISLAND 01',
    label: 'Schooling',
    epoch: '2008 - 2016',
    details: 'Completed foundational education at Sri Raga High School. Achieved a perfect 10 GPA in SSC. Developed early curiosity for computers and technology.',
    coordinate: { x: 6, y: 50 }
  },
  {
    id: 'intermediate',
    name: 'ISLAND 02',
    label: 'Intermediate',
    epoch: '2016 - 2018',
    details: 'Excelled at Krishnaveni Jr. College with 95% in MPC. Deepened mathematical and logical thinking.',
    coordinate: { x: 17, y: 50 }
  },
  {
    id: 'anurag',
    name: 'ISLAND 03',
    label: 'Anurag University',
    epoch: '2018 - 2022',
    details: 'Enrolled in B.Tech Computer Science Engineering at Anurag University, Hyderabad. Mastered data structures, algorithms, and full-stack web technologies.',
    coordinate: { x: 28, y: 50 }
  },
  {
    id: 'firstdev',
    name: 'ISLAND 04',
    label: 'First Dev Projects',
    epoch: '2020',
    details: 'Built the first production-grade web applications. Launched real client websites with live users.',
    coordinate: { x: 39, y: 50 }
  },
  {
    id: 'clientprojects',
    name: 'ISLAND 05',
    label: 'Client Projects',
    epoch: '2021 - 2022',
    details: 'Took on professional client projects. Built premium websites and managed full-stack pipelines independently.',
    coordinate: { x: 50, y: 50 }
  },
  {
    id: 'divein',
    name: 'ISLAND 06',
    label: 'DiveIn WebWorks',
    epoch: '2023 - Present',
    details: 'Founded DiveIn WebWorks — a web development agency building digital experiences for businesses worldwide.',
    coordinate: { x: 61, y: 50 }
  },
  {
    id: 'architect',
    name: 'ISLAND 07',
    label: 'Software Architect',
    epoch: '2023',
    details: 'Leveled up to architect-level thinking. Designing scalable systems, micro-frontends, and serverless architectures.',
    coordinate: { x: 72, y: 50 }
  },
  {
    id: 'startup',
    name: 'ISLAND 08',
    label: 'Startup Founder',
    epoch: '2024',
    details: 'Planning to launch innovative SaaS products and software-powered startups that solve real-world problems.',
    coordinate: { x: 83, y: 50 }
  },
  {
    id: 'worldclass',
    name: 'ISLAND 09',
    label: 'World-Class Engineer',
    epoch: 'Next Stop',
    details: 'The ultimate destination — becoming a world-class software engineer building products used by millions.',
    coordinate: { x: 94, y: 50 }
  },
];
export default VOYAGE_MILESTONES;
