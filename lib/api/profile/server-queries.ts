// Server-side query functions for prefetching
// These run on the server during SSR/prefetching

import {
  CTFParticipation,
  PointsOverTime,
  SolveHistory,
  UserStats,
} from '@/lib/types/profile';
import {
  MOCK_CTF_PARTICIPATION,
  MOCK_POINTS_OVER_TIME,
  MOCK_POINTS_OVER_TIME_CRYPTOKID,
  MOCK_POINTS_OVER_TIME_REVERSEGOD,
  MOCK_POINTS_OVER_TIME_WEBWIZARD,
  MOCK_SOLVE_HISTORY,
  MOCK_SOLVE_HISTORY_CRYPTOKID,
  MOCK_SOLVE_HISTORY_REVERSEGOD,
  MOCK_SOLVE_HISTORY_WEBWIZARD,
  MOCK_USER_STATS,
  MOCK_USER_STATS_2,
  MOCK_USER_STATS_3,
  MOCK_USER_STATS_4,
} from './mock-data';

// Mock API functions for server-side prefetching
const fetchUserStatsServer = (username?: string): Promise<UserStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username) {
        if (username.toLowerCase() === 'webwizard') {
          return resolve(MOCK_USER_STATS_2);
        } else if (username.toLowerCase() === 'cryptokid') {
          return resolve(MOCK_USER_STATS_3);
        } else if (username.toLowerCase() === 'reversegod') {
          return resolve(MOCK_USER_STATS_4);
        }
      }

      resolve(MOCK_USER_STATS);
    }, 1000);
  });
};

const fetchSolveHistoryServer = (
  username?: string
): Promise<SolveHistory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username) {
        if (username.toLowerCase() === 'webwizard') {
          return resolve(MOCK_SOLVE_HISTORY_WEBWIZARD);
        } else if (username.toLowerCase() === 'cryptokid') {
          return resolve(MOCK_SOLVE_HISTORY_CRYPTOKID);
        } else if (username.toLowerCase() === 'reversegod') {
          return resolve(MOCK_SOLVE_HISTORY_REVERSEGOD);
        }
      }

      resolve(MOCK_SOLVE_HISTORY);
    }, 1000);
  });
};

const fetchPointsOverTimeServer = (
  username?: string
): Promise<PointsOverTime[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username) {
        if (username.toLowerCase() === 'webwizard') {
          return resolve(MOCK_POINTS_OVER_TIME_WEBWIZARD);
        } else if (username.toLowerCase() === 'cryptokid') {
          return resolve(MOCK_POINTS_OVER_TIME_CRYPTOKID);
        } else if (username.toLowerCase() === 'reversegod') {
          return resolve(MOCK_POINTS_OVER_TIME_REVERSEGOD);
        }
      }

      resolve(MOCK_POINTS_OVER_TIME);
    }, 1000);
  });
};

const fetchCTFParticipationServer = (): Promise<CTFParticipation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CTF_PARTICIPATION);
    }, 1000);
  });
};

// Server Query functions (for prefetching)
export const userStatsServerQuery = (username?: string) => ({
  queryKey: ['profile', 'stats', username],
  queryFn: () => fetchUserStatsServer(username),
});

export const solveHistoryServerQuery = (username?: string) => ({
  queryKey: ['profile', 'solveHistory', username],
  queryFn: () => fetchSolveHistoryServer(username),
});

export const pointsOverTimeServerQuery = (username?: string) => ({
  queryKey: ['profile', 'pointsOverTime', username],
  queryFn: () => fetchPointsOverTimeServer(username),
});

export const ctfParticipationServerQuery = () => ({
  queryKey: ['profile', 'ctfParticipation'],
  queryFn: fetchCTFParticipationServer,
});
