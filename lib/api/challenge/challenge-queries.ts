import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import {
  MOCK_CHALLENGES_DETAILS,
  MOCK_CHALLENGES,
  MOCK_CHALLENGES_METADATA,
} from './challenge-mock-data';

// Fetchers (mock-data) //
// * Comment these when using real API *//
const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHALLENGES_METADATA);
    }, 1000);
  });
};

const fetchChallenge = (id: string): Promise<Challenge> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHALLENGES.find((challenge) => challenge.id === id)!);
    }, 1000);
  });
};

const fetchChallengeDetails = (id: string): Promise<ChallengeDetails> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_CHALLENGES_DETAILS.find((challenge) => challenge.id === id)!
      );
    }, 2000);
  });
};

// Query functions
export const allChallengesMetadataQuery = () => ({
  queryKey: ['challenges'],
  queryFn: fetchAllChallengesMetadata,
});

export const challengeQuery = (id: string) => ({
  queryKey: ['challenge', id],
  queryFn: () => fetchChallenge(id),
  refetchOnWindowFocus: false,
});

export const challengeDetailsQuery = (id: string) => ({
  queryKey: ['challenge-details', id],
  queryFn: () => fetchChallengeDetails(id),
});
