import {
  CTFParticipation,
  PointsOverTime,
  SolveHistory,
  UserStats,
} from '@/lib/types/profile';
import { getAuthenticatedAxios } from '../axios';

/**
 * Backend user info response shape from GET /api/info/user/:username
 */
interface BackendUserResp {
  id: number;
  username: string;
  role: string;
  status: number;
  score: number;
  rank: number;
  email: string;
  challenges: BackendChallengeSolve[];
}

interface BackendChallengeSolve {
  id: number;
  name: string;
  category: string;
  tags: string[];
  solvedAt: string;
  points: number;
}

/**
 * Fetch user info from the backend and extract UserStats.
 */
const fetchUserStats = async (username?: string): Promise<UserStats> => {
  if (!username) {
    return {
      totalPoints: 0,
      rank: 0,
      totalSolves: 0,
      totalChallenges: 0,
      solveRate: 0,
      averageTimeToSolve: 0,
      favoriteCategory: 'N/A',
      categories: {},
    };
  }

  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/info/user/${encodeURIComponent(username)}`);
    const data = res.data as BackendUserResp;
    const challenges = data.challenges || [];

    const categories: Record<string, number> = {};
    for (const ch of challenges) {
      const cat = ch.category || 'misc';
      categories[cat] = (categories[cat] || 0) + 1;
    }

    let favoriteCategory = 'N/A';
    let maxCount = 0;
    for (const [cat, count] of Object.entries(categories)) {
      if (count > maxCount) {
        maxCount = count;
        favoriteCategory = cat;
      }
    }

    return {
      totalPoints: data.score,
      rank: data.rank,
      totalSolves: challenges.length,
      totalChallenges: challenges.length,
      solveRate: 0,
      averageTimeToSolve: 0,
      favoriteCategory,
      categories,
    };
  } catch (err) {
    console.error('Error fetching user stats:', err);
    return {
      totalPoints: 0,
      rank: 0,
      totalSolves: 0,
      totalChallenges: 0,
      solveRate: 0,
      averageTimeToSolve: 0,
      favoriteCategory: 'N/A',
      categories: {},
    };
  }
};

/**
 * Fetch solve history from the backend.
 * Maps backend `challenges` array to the SolveHistory type.
 */
const fetchSolveHistory = async (
  username?: string
): Promise<SolveHistory[]> => {
  if (!username) {
    return [];
  }

  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/info/user/${encodeURIComponent(username)}`);
    const data = res.data as BackendUserResp;
    const challenges = data.challenges || [];

    return challenges.map((ch) => ({
      id: String(ch.id),
      challengeId: String(ch.id),
      challengeName: ch.name,
      points: ch.points,
      solvedAt: new Date(ch.solvedAt),
      category: ch.category || 'misc',
    }));
  } catch (err) {
    console.error('Error fetching solve history:', err);
    return [];
  }
};

/**
 * Derive points-over-time from the solve history.
 * Groups solves by month and accumulates points chronologically.
 */
const fetchPointsOverTime = async (
  username?: string
): Promise<PointsOverTime[]> => {
  if (!username) {
    return [];
  }

  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/info/user/${encodeURIComponent(username)}`);
    const data = res.data as BackendUserResp;
    const challenges = data.challenges || [];

    if (challenges.length === 0) {
      return [];
    }

    // Sort challenges by solve date
    const sorted = [...challenges].sort(
      (a, b) => new Date(a.solvedAt).getTime() - new Date(b.solvedAt).getTime()
    );

    // Group by month and accumulate points
    const monthlyPoints: Map<string, number> = new Map();
    let cumulativePoints = 0;

    for (const ch of sorted) {
      const date = new Date(ch.solvedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
      cumulativePoints += ch.points;
      monthlyPoints.set(monthKey, cumulativePoints);
    }

    return Array.from(monthlyPoints.entries()).map(([dateStr, points]) => ({
      date: new Date(dateStr),
      points,
    }));
  } catch (err) {
    console.error('Error fetching points over time:', err);
    return [];
  }
};

/**
 * CTF participation is not available in the backend API.
 * Returns an empty array.
 */
const fetchCTFParticipation = async (): Promise<CTFParticipation[]> => {
  return [];
};

// Query functions
export const userStatsQuery = (username?: string) => ({
  queryKey: ['profile', 'stats', username],
  queryFn: () => fetchUserStats(username),
});

export const solveHistoryQuery = (username?: string) => ({
  queryKey: ['profile', 'solveHistory', username],
  queryFn: () => fetchSolveHistory(username),
});

export const pointsOverTimeQuery = (username?: string) => ({
  queryKey: ['profile', 'pointsOverTime', username],
  queryFn: () => fetchPointsOverTime(username),
});

export const ctfParticipationQuery = () => ({
  queryKey: ['profile', 'ctfParticipation'],
  queryFn: fetchCTFParticipation,
});

// For backward compatibility
export const userStatsServerQuery = userStatsQuery;
export const solveHistoryServerQuery = solveHistoryQuery;
export const pointsOverTimeServerQuery = pointsOverTimeQuery;
export const ctfParticipationServerQuery = ctfParticipationQuery;
