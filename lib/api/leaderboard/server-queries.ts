// Server-side query functions for prefetching
// These run on the server during SSR/prefetching

import { MOCK_LEADERBOARD_GRAPH_DATA } from './mock-data';
import { LeaderboardEntry } from '@/lib/types/leaderboard';
import { createAuthenticatedServerAxios } from '../axios';

// Mock fetcher functions for server-side prefetching
// * Comment these when using real API *//

const fetchLeaderboardGraphServer = (): Promise<
  typeof MOCK_LEADERBOARD_GRAPH_DATA
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADERBOARD_GRAPH_DATA);
    }, 5000);
  });
};

// Real server fetcher functions
const fetchLeaderboardTableServer = async ({
  page,
}: {
  page: number;
}): Promise<{ data: LeaderboardEntry[]; total: number }> => {
  try {
    const axios = await createAuthenticatedServerAxios();
    const res = await axios.get('/api/info/leaderboard', {
      params: {
        page,
      },
    });
    console.log('leaderboard server response:', res.data);

    // Transform API response to match expected LeaderboardEntry structure
    const transformedEntries: LeaderboardEntry[] = (res.data || []).map(
      (entry: any) => ({
        rank: entry.rank,
        playerId: entry.id,
        totalPoints: entry.score,
        solvedChallenges: [], // API doesn't provide this, set as empty array
        dateJoined: new Date().toISOString(), // API doesn't provide this, use current date
        email: entry.email,
      })
    );

    const transformedData = {
      data: transformedEntries,
      total: transformedEntries.length,
    };

    return transformedData;
  } catch (err) {
    console.error('Error fetching leaderboard server:', err);
    throw err;
  }
};

// Server Query functions (for prefetching)
export const leaderboardGraphServerQuery = () => {
  return {
    queryKey: ['leaderboardGraph'],
    queryFn: () => fetchLeaderboardGraphServer(),
  };
};

export const leaderboardTableServerQuery = ({
  page = 1,
  limit,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return {
    queryKey: ['leaderboardTable', { page, limit }],
    queryFn: () => fetchLeaderboardTableServer({ page }),
  };
};
