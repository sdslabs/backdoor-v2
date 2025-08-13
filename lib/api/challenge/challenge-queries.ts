import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import {
  MOCK_CHALLENGES_DETAILS,
  MOCK_CHALLENGES,
} from './challenge-mock-data';
import { createAuthenticatedServerAxios } from '../axios';

// Fetchers (mock-data) //
// * Comment these when using real API *//
// const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_CHALLENGES_METADATA);
//     }, 1000);
//   });
// };

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
    }, 1000);
  });
};

// Real fetcher functions
const fetchAllChallengesMetadata = async (): Promise<ChallengeMetadata[]> => {
  try {
    const axios = await createAuthenticatedServerAxios();
    const res = await axios.get('/api/info/challenges');

    // TODO: Migrate this to backend
    // Transform API response to match frontend interface
    const transformedData: ChallengeMetadata[] = res.data.map(
      (challenge: any) => ({
        id: challenge.id.toString(),
        name: challenge.name,
        tags: challenge.tags || [],
        points: challenge.points,
        difficulty: 'medium', // Default difficulty since API doesn't provide it
        solvesNumber: challenge.solvesNumber || 0,
        solveStatus: 'unsolved', // Default to unsolved since API doesn't provide user-specific solve status
        deployedStatus:
          challenge.status === 'Deployed' ? 'deployed' : 'undeployed',
      })
    );

    return transformedData;
  } catch (err) {
    console.error('Error fetching challenges metadata:', err);
    throw err;
  }
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
