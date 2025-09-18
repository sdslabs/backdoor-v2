export type LeaderboardChallengeEntry = {
  title: string;
  category: string;
  points: number;
};

export type LeaderboardEntry = {
  rank: number;
  playerId: string;
  solvedChallenges: LeaderboardChallengeEntry[];
  totalPoints: number;
  dateJoined: string;
  email: string;
};

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
