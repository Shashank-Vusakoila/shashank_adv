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
    id: 'ssc',
    title: '10 GPA SSC',
    subtitle: 'Secondary School Board',
    bountyValue: 100000000,
    description: 'Awarded for securing a perfect 10.0 GPA (Grade Point Average) in the Secondary School Certificate board examinations.',
    details: [
      'Top 0.1% score in school board district.',
      'Perfect marks in Mathematics, Science, and Social Studies.',
      'Recognized by regional academic board panels for educational excellence.'
    ]
  },
  {
    id: 'intermediate',
    title: '95% Intermediate',
    subtitle: 'Higher Secondary Board',
    bountyValue: 120000000,
    description: 'Awarded for securing a 95% total score in the Higher Secondary Board Examinations with MPC stream.',
    details: [
      'Rigorous curriculum focusing on Mathematics, Physics, and Chemistry.',
      'Exemplary performance across state-level standardized evaluations.',
      'Secured merit ranks in collegiate engineering entrance preparations.'
    ]
  },
  {
    id: 'cs50x',
    title: 'Harvard CS50x',
    subtitle: 'Introduction to Computer Science',
    bountyValue: 180000000,
    description: 'Completed Harvard University\'s legendary introduction to the intellectual enterprises of computer science and the art of programming.',
    details: [
      'Comprehensive projects built in C, Python, SQL, HTML, CSS, and JavaScript.',
      'Deep study of algorithm complexities (Big O notation), data structures (linked lists, hash tables, trees).',
      'Developed a final full-stack web software verified by Harvard CS50 staff.'
    ]
  },
  {
    id: 'fullstackopen',
    title: 'Full Stack Open',
    subtitle: 'University of Helsinki',
    bountyValue: 220000000,
    description: 'Finished the University of Helsinki\'s advanced curriculum focusing on modern JavaScript-based web development.',
    details: [
      'Deep dive into Single Page Applications using React, Redux, Node.js, and Express.',
      'Implemented robust relational and non-relational database schemas using MongoDB and PostgreSQL.',
      'Explored CI/CD pipelines, containerization using Docker, and automated end-to-end testing (Cypress).'
    ]
  }
];
export default ACHIEVEMENT_BOUNTIES;
