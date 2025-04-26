import { Challenge, ChallengeMetadata } from '@/lib/types';
import {
  MOCK_CHALLENGES,
  MOCK_CHALLENGES_METADATA,
} from './challenge-mock-data';
import { useQuery } from '@tanstack/react-query';

// Fetchers (mock-data) //
// * Comment these when using real API *//
const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHALLENGES_METADATA);
    }, 1000);
  });
};

const fetchChallengeDetails = (id: string): Promise<Challenge> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHALLENGES.find((challenge) => challenge.id === id)!);
    }, 1000);
  });
};

// Query functions
export const allChallengesMetadataQuery = () => ({
  queryKey: ['challenges'],
  queryFn: fetchAllChallengesMetadata,
});

export const challengeDetailsQuery = (id: string) => ({
  queryKey: ['challenge', id],
  queryFn: () => fetchChallengeDetails(id),
  refetchOnWindowFocus: false,
});
