import {
  BhawanRankingEntry,
  LeaderBoardGraphEntry,
  LeaderboardEntry,
  LeaderboardMode,
  LeaderboardTableResult,
} from '@/lib/types/leaderboard';
import { getAuthenticatedAxios } from '../axios';

const fetchLeaderboardTable = async ({
  page,
  mode,
}: {
  page: number;
  mode: LeaderboardMode;
}): Promise<LeaderboardTableResult> => {
  const axios = await getAuthenticatedAxios();
  const res = await axios.get('/info/leaderboard', {
    params: {
      page,
      mode,
    },
  });

  if (mode === 'bhawan_rankings') {
    const raw = (res.data || []) as Record<string, unknown>[];
    const data: BhawanRankingEntry[] = raw.map((row) => ({
      rank: Number(row.rank) || 0,
      bhawan: String(row.bhawan ?? ''),
      topPoints: Number(row.top_score) || 0,
      topPlayer: String(row.top_username ?? ''),
      topUserId: Number(row.top_user_id) || 0,
    }));
    return { mode: 'bhawan_rankings', data, total: data.length };
  }

  const raw = (res.data || []) as Record<string, unknown>[];
  const data: LeaderboardEntry[] = raw.map((entryData) => ({
    rank: Number(entryData.rank) || 0,
    playerId: String(entryData.username ?? ''),
    totalPoints: Number(entryData.score) || 0,
    solvedChallenges: [],
    dateJoined: new Date().toISOString(),
    email: String(entryData.email ?? ''),
    bhawan: String(entryData.bhawan ?? ''),
  }));

  return { mode, data, total: data.length };
};

const fetchLeaderboardGraph = async () => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get('/info/leaderboard-graph');
    return res.data as LeaderBoardGraphEntry[];
  } catch (err) {
    console.error('Error fetching leaderboard graph:', err);
    throw err;
  }
};

export const leaderboardGraphQuery = () => {
  return {
    queryKey: ['leaderboardGraph'],
    queryFn: () => fetchLeaderboardGraph(),
  };
};

export const leaderboardTableQuery = ({
  page = 1,
  limit,
  mode = 'overall',
}: {
  page?: number;
  limit?: number;
  mode?: LeaderboardMode;
} = {}) => {
  return {
    queryKey: ['leaderboardTable', { page, limit, mode }],
    queryFn: () => fetchLeaderboardTable({ page, mode }),
  };
};
