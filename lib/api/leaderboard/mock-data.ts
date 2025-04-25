import { LeaderboardChallengeEntry, LeaderboardEntry } from '@/lib/types';

export const MOCK_LEADERBOARD_GRAPH_DATA = [
  {
    playerId: 'c4pt4in_h00k_1818',
    hourlyProgress: [
      { hour: '2023-01-15T00:00', points: 1000 },
      { hour: '2023-01-15T01:00', points: 1800 },
      { hour: '2023-01-15T02:00', points: 3000 },
      { hour: '2023-01-15T03:00', points: 4500 },
    ],
  },
  {
    playerId: 'h4shk4t',
    hourlyProgress: [
      { hour: '2023-02-20T00:00', points: 1000 },
      { hour: '2023-02-20T01:00', points: 1800 },
      { hour: '2023-02-20T02:00', points: 3000 },
    ],
  },
  {
    playerId: 'L0r3m_1a_2y2s',
    hourlyProgress: [
      { hour: '2023-03-10T00:00', points: 1000 },
      { hour: '2023-03-10T01:00', points: 1800 },
    ],
  },
  {
    playerId: 'n3on_n1nj4',
    hourlyProgress: [
      { hour: '2023-04-05T00:00', points: 1000 },
      { hour: '2023-04-05T01:00', points: 2500 },
    ],
  },
  {
    playerId: 'b1nary_w0lf',
    hourlyProgress: [
      { hour: '2023-05-10T00:00', points: 800 },
      { hour: '2023-05-10T01:00', points: 2000 },
    ],
  },
  {
    playerId: 'cryp70_h4wk',
    hourlyProgress: [
      { hour: '2023-06-15T00:00', points: 800 },
      { hour: '2023-06-15T01:00', points: 2300 },
    ],
  },
  {
    playerId: 'm3t4_ph4ntom',
    hourlyProgress: [
      { hour: '2023-07-01T00:00', points: 1200 },
      { hour: '2023-07-01T01:00', points: 2700 },
    ],
  },
  {
    playerId: 's0rc3ry_k1ng',
    hourlyProgress: [{ hour: '2023-08-10T00:00', points: 1000 }],
  },
  {
    playerId: 'd4rk_m4g1c14n',
    hourlyProgress: [{ hour: '2023-09-05T00:00', points: 1200 }],
  },
  {
    playerId: 'wh173_h47',
    hourlyProgress: [{ hour: '2023-10-20T00:00', points: 800 }],
  },
];

export const LEADERBOARD_CHALLENGES: LeaderboardChallengeEntry[] = [
  { title: 'Challenge A', category: 'Cryptography', points: 1000 },
  { title: 'Challenge B', category: 'Web Security', points: 800 },
  { title: 'Challenge C', category: 'Reverse Engineering', points: 1200 },
  { title: 'Challenge D', category: 'Binary Exploitation', points: 1500 },
];

export const MOCK_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    playerId: 'c4pt4in_h00k_1818',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[0], // Challenge A
      LEADERBOARD_CHALLENGES[1], // Challenge B
      LEADERBOARD_CHALLENGES[2], // Challenge C
      LEADERBOARD_CHALLENGES[3], // Challenge D
    ],
    totalPoints: 4500, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-01-15', // Example date
    email: 'captain_hook1818@example.com', // Example email
  },
  {
    rank: 2,
    playerId: 'h4shk4t',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[0], // Challenge A
      LEADERBOARD_CHALLENGES[1], // Challenge B
      LEADERBOARD_CHALLENGES[2], // Challenge C
    ],
    totalPoints: 3000, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-02-20', // Example date
    email: 'hashkat@example.com', // Example email
  },
  {
    rank: 3,
    playerId: 'L0r3m_1a_2y2s',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[0], // Challenge A
      LEADERBOARD_CHALLENGES[1], // Challenge B
    ],
    totalPoints: 1800, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-03-10', // Example date
    email: 'lorem_1a_2y2s@example.com', // Example email
  },
  {
    rank: 4,
    playerId: 'n3on_n1nj4',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[0], // Challenge A
      LEADERBOARD_CHALLENGES[3], // Challenge D
    ],
    totalPoints: 2500, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-04-05', // Example date
    email: 'neon_ninja@example.com', // Example email
  },
  {
    rank: 5,
    playerId: 'b1nary_w0lf',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[1], // Challenge B
      LEADERBOARD_CHALLENGES[2], // Challenge C
    ],
    totalPoints: 2000, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-05-10', // Example date
    email: 'binary_wolf@example.com', // Example email
  },
  {
    rank: 6,
    playerId: 'cryp70_h4wk',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[1], // Challenge B
      LEADERBOARD_CHALLENGES[3], // Challenge D
    ],
    totalPoints: 2300, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-06-15', // Example date
    email: 'crypto_hawk@example.com', // Example email
  },
  {
    rank: 7,
    playerId: 'm3t4_ph4ntom',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[2], // Challenge C
      LEADERBOARD_CHALLENGES[3], // Challenge D
    ],
    totalPoints: 2700, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-07-01', // Example date
    email: 'meta_phantom@example.com', // Example email
  },
  {
    rank: 8,
    playerId: 's0rc3ry_k1ng',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[0], // Challenge A
    ],
    totalPoints: 1000, // Sum of points of solved LEADERBOARD_CHALLENGES
    dateJoined: '2023-08-10', // Example date
    email: 'sorcery_king@example.com', // Example email
  },
  {
    rank: 9,
    playerId: 'd4rk_m4g1c14n',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[2], // Challenge C
    ],
    totalPoints: 1200, // Sum of points of solved challenges
    dateJoined: '2023-09-05', // Example date
    email: 'dark_magician@example.com', // Example email
  },
  {
    rank: 10,
    playerId: 'wh173_h47',
    solvedChallenges: [
      LEADERBOARD_CHALLENGES[1], // Challenge B
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
