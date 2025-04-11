import {
  CTFParticipation,
  PointsOverTime,
  SolveHistory,
  UserProfile,
  UserStats,
} from '@/lib/types/profile';

// Mock user stats
export const userStats: UserStats = {
  totalPoints: 1250,
  rank: 15,
  totalSolves: 42,
  totalChallenges: 50,
  solveRate: 84,
  averageTimeToSolve: 45, // in minutes
  favoriteCategory: 'pwn',
  categories: {
    pwn: 15,
    web: 12,
    rev: 8,
    crypto: 7,
  },
};

// Mock user profile data
export const userProfile: UserProfile = {
  id: '1',
  username: 'hacker123',
  email: 'hacker123@example.com',
  name: 'Hacker Kumar',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hacker123',
  role: 'user',
  createdAt: new Date('2023-01-01'),
  lastActive: new Date('2024-03-20'),
  bio: 'Security enthusiast and CTF player. Love solving challenges and learning new things!',
  socialLinks: {
    github: 'https://github.com/hacker123',
    twitter: 'https://twitter.com/hacker123',
    website: 'https://hacker123.dev',
  },
  stats: userStats,
};

// Mock solve history
export const solveHistory: SolveHistory[] = [
  {
    id: '1',
    challengeId: '1',
    challengeName: 'Buffer Overflow',
    points: 100,
    solvedAt: new Date('2024-01-15T14:30:00'),
    category: 'pwn',
  },
  {
    id: '2',
    challengeId: '2',
    challengeName: 'SQL Injection',
    points: 50,
    solvedAt: new Date('2024-02-10T09:15:00'),
    category: 'web',
  },
  {
    id: '3',
    challengeId: '3',
    challengeName: 'Reverse Engineering',
    points: 75,
    solvedAt: new Date('2024-03-05T16:45:00'),
    category: 'rev',
  },
];

export const ctfParticipation: CTFParticipation[] = [
  {
    id: '1',
    name: 'NOOBCTF 2024',
    points: 100,
    position: 1,
    flagsSubmitted: 10,
    timestampStart: new Date('2024-01-01T14:30:00'),
    timestampEnd: new Date('2024-01-01T15:30:00'),
  },
];

// Mock points over time data for the graph
export const pointsOverTime = [
  { date: new Date('2024-01-01'), points: 150 },
  { date: new Date('2024-02-01'), points: 300 },
  { date: new Date('2024-03-01'), points: 450 },
  { date: new Date('2024-04-01'), points: 600 },
  { date: new Date('2024-05-01'), points: 800 },
  { date: new Date('2024-06-01'), points: 450 },
  { date: new Date('2024-07-01'), points: 1100 },
  { date: new Date('2024-08-01'), points: 1250 },
];

// Mock API functions
export const fetchUserProfile = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userProfile);
    }, 1000);
  });
};

export const fetchUserStats = (): Promise<UserStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userStats);
    }, 1000);
  });
};

export const fetchSolveHistory = (): Promise<SolveHistory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(solveHistory);
    }, 1000);
  });
};

export const fetchPointsOverTime = (): Promise<PointsOverTime[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pointsOverTime);
    }, 1000);
  });
};

export const fetchCTFParticipation = (): Promise<CTFParticipation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ctfParticipation);
    }, 1000);
  });
};
