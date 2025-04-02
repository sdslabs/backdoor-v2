export type Challenge = {
  title: string;
  category: string;
  points: number;
};

export type LeaderboardEntry = {
  rank: number;
  playerId: string;
  solvedChallenges: Challenge[];
  totalPoints: number;
  dateJoined: string; // New field to store the date when the player joined
  email: string; // New field to store the player's email address
};

export const challenges: Challenge[] = [
  { title: 'Challenge A', category: 'Cryptography', points: 1000 },
  { title: 'Challenge B', category: 'Web Security', points: 800 },
  { title: 'Challenge C', category: 'Reverse Engineering', points: 1200 },
  { title: 'Challenge D', category: 'Binary Exploitation', points: 1500 },
];
export const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    playerId: 'c4pt4in_h00k_1818',
    solvedChallenges: [
      challenges[0], // Challenge A
      challenges[1], // Challenge B
      challenges[2], // Challenge C
      challenges[3], // Challenge D
    ],
    totalPoints: 4500, // Sum of points of solved challenges
    dateJoined: '2023-01-15', // Example date
    email: 'captain_hook1818@example.com', // Example email
  },
  {
    rank: 2,
    playerId: 'h4shk4t',
    solvedChallenges: [
      challenges[0], // Challenge A
      challenges[1], // Challenge B
      challenges[2], // Challenge C
    ],
    totalPoints: 3000, // Sum of points of solved challenges
    dateJoined: '2023-02-20', // Example date
    email: 'hashkat@example.com', // Example email
  },
  {
    rank: 3,
    playerId: 'L0r3m_1a_2y2s',
    solvedChallenges: [
      challenges[0], // Challenge A
      challenges[1], // Challenge B
    ],
    totalPoints: 1800, // Sum of points of solved challenges
    dateJoined: '2023-03-10', // Example date
    email: 'lorem_1a_2y2s@example.com', // Example email
  },
  {
    rank: 4,
    playerId: 'n3on_n1nj4',
    solvedChallenges: [
      challenges[0], // Challenge A
      challenges[3], // Challenge D
    ],
    totalPoints: 2500, // Sum of points of solved challenges
    dateJoined: '2023-04-05', // Example date
    email: 'neon_ninja@example.com', // Example email
  },
  {
    rank: 5,
    playerId: 'b1nary_w0lf',
    solvedChallenges: [
      challenges[1], // Challenge B
      challenges[2], // Challenge C
    ],
    totalPoints: 2000, // Sum of points of solved challenges
    dateJoined: '2023-05-10', // Example date
    email: 'binary_wolf@example.com', // Example email
  },
  {
    rank: 6,
    playerId: 'cryp70_h4wk',
    solvedChallenges: [
      challenges[1], // Challenge B
      challenges[3], // Challenge D
    ],
    totalPoints: 2300, // Sum of points of solved challenges
    dateJoined: '2023-06-15', // Example date
    email: 'crypto_hawk@example.com', // Example email
  },
  {
    rank: 7,
    playerId: 'm3t4_ph4ntom',
    solvedChallenges: [
      challenges[2], // Challenge C
      challenges[3], // Challenge D
    ],
    totalPoints: 2700, // Sum of points of solved challenges
    dateJoined: '2023-07-01', // Example date
    email: 'meta_phantom@example.com', // Example email
  },
  {
    rank: 8,
    playerId: 's0rc3ry_k1ng',
    solvedChallenges: [
      challenges[0], // Challenge A
    ],
    totalPoints: 1000, // Sum of points of solved challenges
    dateJoined: '2023-08-10', // Example date
    email: 'sorcery_king@example.com', // Example email
  },
  {
    rank: 9,
    playerId: 'd4rk_m4g1c14n',
    solvedChallenges: [
      challenges[2], // Challenge C
    ],
    totalPoints: 1200, // Sum of points of solved challenges
    dateJoined: '2023-09-05', // Example date
    email: 'dark_magician@example.com', // Example email
  },
  {
    rank: 10,
    playerId: 'wh173_h47',
    solvedChallenges: [
      challenges[1], // Challenge B
    ],
    totalPoints: 800, // Sum of points of solved challenges
    dateJoined: '2023-10-20', // Example date
    email: 'white_hat@example.com', // Example email
  },
  // The last 35 users will have 0 points
  ...Array(35)
    .fill(null)
    .map((_, index) => ({
      rank: 11 + index,
      playerId: `user_${index + 11}`,
      solvedChallenges: [],
      totalPoints: 0, // These users have not solved any challenges
      dateJoined: `2023-12-${index + 1}`, // Example date
      email: `user_${index + 11}@example.com`, // Example email
    })),
];
