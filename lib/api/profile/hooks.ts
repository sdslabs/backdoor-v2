import { useQuery } from '@tanstack/react-query';
import {
  userStatsQuery,
  solveHistoryQuery,
  pointsOverTimeQuery,
  ctfParticipationQuery,
} from './client-queries';

export const useUserStats = (username?: string) => {
  return useQuery(userStatsQuery(username));
};

export const useSolveHistory = (username?: string) => {
  return useQuery(solveHistoryQuery(username));
};

export const usePointsOverTime = (username?: string) => {
  return useQuery(pointsOverTimeQuery(username));
};

export const useCTFParticipation = () => {
  return useQuery(ctfParticipationQuery());
};
