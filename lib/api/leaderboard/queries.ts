import { LEADERBOARD_TABLE_PAGE_LIMIT } from '@/lib/constants';
import {
  MOCK_LEADERBOARD_ENTRIES,
  MOCK_LEADERBOARD_GRAPH_DATA,
} from './mock-data';
import { LeaderboardEntry } from '@/lib/types/leaderboard';

// Mock fetcher functions
const fetchLeaderboardGraph = (): Promise<
  typeof MOCK_LEADERBOARD_GRAPH_DATA
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADERBOARD_GRAPH_DATA);
    }, 5000);
  });
};

const fetchLeaderboardTable = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<{ data: LeaderboardEntry[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const skip = (page - 1) * limit;
      const data = MOCK_LEADERBOARD_ENTRIES.slice(skip, skip + limit);
      const total = MOCK_LEADERBOARD_ENTRIES.length;
      resolve({ data, total });
    }, 1000);
  });
};

// Query functions (for prefetching)
export const leaderboardGraphQuery = () => {
  return {
    queryKey: ['leaderboardGraph'],
    queryFn: () => fetchLeaderboardGraph(),
  };
};

export const leaderboardTableQuery = ({
  limit = LEADERBOARD_TABLE_PAGE_LIMIT,
  page = 1,
}: {
  limit?: number;
  page?: number;
} = {}) => {
  return {
    queryKey: ['leaderboardTable', { limit, page }],
    queryFn: () => fetchLeaderboardTable({ limit, page }),
  };
};
