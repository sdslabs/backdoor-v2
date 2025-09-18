import {
  LeaderboardEntry,
  LeaderBoardGraphEntry,
} from '@/lib/types/leaderboard';
import { createAuthenticatedClientAxios } from '../axios';

// Mock fetcher functions
// * Comment these when using real API *//

// const fetchLeaderboardGraph = (): Promise<
//   typeof MOCK_LEADERBOARD_GRAPH_DATA
// > => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_LEADERBOARD_GRAPH_DATA);
//     }, 5000);
//   });
// };

// const fetchLeaderboardTable = ({
//   limit,
//   page,
// }: {
//   limit: number;
//   page: number;
// }): Promise<{ data: LeaderboardEntry[]; total: number }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const skip = (page - 1) * limit;
//       const data = MOCK_LEADERBOARD_ENTRIES.slice(skip, skip + limit);
//       const total = MOCK_LEADERBOARD_ENTRIES.length;
//       resolve({ data, total });
//     }, 1000);
//   });
// };

// Real fetcher functions
const fetchLeaderboardTable = async ({
  page,
}: {
  page: number;
}): Promise<{ data: LeaderboardEntry[]; total: number }> => {
  try {
    const axios = createAuthenticatedClientAxios();
    const res = await axios.get('/api/info/leaderboard', {
      params: {
        page,
      },
    });
    console.log('leaderboard response:', res.data);

    // Transform API response to match expected LeaderboardEntry structure
    const transformedEntries: LeaderboardEntry[] = (res.data || []).map(
      (entry: any) => ({
        rank: entry.rank,
        playerId: entry.username,
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
    console.error('Error fetching leaderboard:', err);
    throw err;
  }
};

const fetchLeaderboardGraph = async () => {
  try {
    const axios = createAuthenticatedClientAxios();
    const res = await axios.get('/api/info/leaderboard-graph');
    return res.data as LeaderBoardGraphEntry[];
  } catch (err) {
    console.error('Error fetching leaderboard graph:', err);
    throw err;
  }
};

// Query functions (for prefetching)
export const leaderboardGraphQuery = () => {
  return {
    queryKey: ['leaderboardGraph'],
    queryFn: () => fetchLeaderboardGraph(),
  };
};

export const leaderboardTableQuery = ({
  page = 1,
  limit,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  return {
    queryKey: ['leaderboardTable', { page, limit }],
    queryFn: () => fetchLeaderboardTable({ page }),
  };
};
