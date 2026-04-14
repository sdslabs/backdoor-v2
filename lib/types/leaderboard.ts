export type LeaderboardChallengeEntry = {
  title: string;
  category: string;
  points: number;
};

export type LeaderboardMode = 'overall' | 'my_bhawan' | 'bhawan_rankings';

export type LeaderboardEntry = {
  rank: number;
  playerId: string;
  solvedChallenges: LeaderboardChallengeEntry[];
  totalPoints: number;
  dateJoined: string;
  email: string;
  bhawan: string;
};

export type BhawanRankingEntry = {
  rank: number;
  bhawan: string;
  topPoints: number;
  topPlayer: string;
  topUserId: number;
};

export type LeaderboardTableResult =
  | { mode: 'overall' | 'my_bhawan'; data: LeaderboardEntry[]; total: number }
  | { mode: 'bhawan_rankings'; data: BhawanRankingEntry[]; total: number };

export type LeaderBoardGraphEntry = {
  id: string;
  username: string;
  score: number;
  rank: number;
  timeSeriesData: {
    timestamp: string; // ISO string
    score: number;
  }[];
};
