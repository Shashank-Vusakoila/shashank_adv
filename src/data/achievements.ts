export interface AchievementBounty {
  id: string;
  title: string;
  subtitle: string;
  bountyValue: number;
  description: string;
  details: string[];
}

export const ACHIEVEMENT_BOUNTIES: AchievementBounty[] = [
  {
    id: 'fullstackopen',
    title: 'Full Stack Open',
    subtitle: 'University of Helsinki',
    bountyValue: 220000000,
    description: 'Awarded for completing the advanced full-stack programming curriculum of the University of Helsinki, focusing on modern React, Redux, Node.js, and CI/CD pipelines.',
    details: [
      'Deep study of Single Page Application (SPA) architectures.',
      'Implemented backend services with Express.js, MongoDB, and SQL databases.',
      'Completed CI/CD and containerization units with 100% test coverage.'
    ]
  },
  {
    id: 'cs50x',
    title: 'Harvard CS50x',
    subtitle: 'Harvard University',
    bountyValue: 180000000,
    description: 'Completed Harvard University\'s legendary introduction to the intellectual enterprises of computer science and the art of programming.',
    details: [
      'Gained deep familiarity with low-level memory allocation in C.',
      'Explored data structures, sorting algorithms, and complexity measurements.',
      'Developed multiple software projects in C, Python, SQL, and JavaScript.'
    ]
  },
  {
    id: 'jsalgorithms',
    title: 'JS Algorithms',
    subtitle: 'freeCodeCamp Certification',
    bountyValue: 180000000,
    description: 'Certified in JavaScript Algorithms and Data Structures, demonstrating advanced logic problem solving and object-oriented programming concepts.',
    details: [
      'Mastered core scripting algorithms and regular expressions.',
      'Implemented object-oriented and functional programming models.',
      'Built multiple projects including palindrome checkers and cash registers.'
    ]
  },
  {
    id: 'responsiveweb',
    title: 'Responsive Web Design',
    subtitle: 'freeCodeCamp Certification',
    bountyValue: 150000000,
    description: 'Certified in Responsive Web Design, demonstrating proficiency in HTML5, CSS3 layout templates, accessibility rules, and mobile-first responsive structures.',
    details: [
      'Mastered Flexbox, CSS Grid layouts, and standard design systems.',
      'Implemented strict accessibility criteria (aria roles, page semantic tags).',
      'Created custom portfolios, survey pages, and documentation layouts.'
    ]
  }
];
export default ACHIEVEMENT_BOUNTIES;
