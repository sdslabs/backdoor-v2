import {
  CTFParticipation,
  PointsOverTime,
  SolveHistory,
  UserStats,
} from '@/lib/types/profile';
import { useQuery } from '@tanstack/react-query';
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

// Mock API functions
const fetchUserStats = (username?: string): Promise<UserStats> => {
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

const fetchSolveHistory = (username?: string): Promise<SolveHistory[]> => {
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

const fetchPointsOverTime = (username?: string): Promise<PointsOverTime[]> => {
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

const fetchCTFParticipation = (): Promise<CTFParticipation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CTF_PARTICIPATION);
    }, 1000);
  });
};

// Query functions
export const useUserStats = (username?: string) => {
  return useQuery({
    queryKey: ['profile', 'stats', username],
    queryFn: () => fetchUserStats(username),
  });
};

export const useSolveHistory = (username?: string) => {
  return useQuery({
    queryKey: ['profile', 'solveHistory', username],
    queryFn: () => fetchSolveHistory(username),
  });
};

export const usePointsOverTime = (username?: string) => {
  return useQuery({
    queryKey: ['profile', 'pointsOverTime', username],
    queryFn: () => fetchPointsOverTime(username),
  });
};

export const useCTFParticipation = () => {
  return useQuery({
    queryKey: ['profile', 'ctfParticipation'],
    queryFn: fetchCTFParticipation,
  });
};
