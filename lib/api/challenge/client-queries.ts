import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import { MOCK_CHALLENGES_DETAILS } from './challenge-mock-data';
import { createAuthenticatedClientAxios } from '../axios';

// Fetchers (mock-data) //
// * Comment these when using real API *//

// const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_CHALLENGES_METADATA);
//     }, 1000);
//   });
// };

const fetchChallenge = (name: string): Promise<Challenge> => {
  return new Promise(async (resolve, reject) => {
    try {
      const axios = createAuthenticatedClientAxios();
      const res = await axios.get(`/api/info/challenge/${name}`);
      console.log('challenge response:', res.data);
      resolve(res.data);
    } catch (err) {
      console.error('Error fetching challenge:', err);
      reject(err);
    }
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
const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const axios = createAuthenticatedClientAxios();
      const res = await axios.get('/api/info/challenges');

      // TODO: Migrate this to backend itself
      // Transform API response to match frontend interface
      const transformedData: ChallengeMetadata[] = res.data.map(
        (challenge: any) => ({
          id: challenge.id.toString(),
          name: challenge.name,
          tags: challenge.tags || [],
          points: challenge.points,
          difficulty: 'medium', // Default difficulty since API doesn't provide it
          solvesNumber: challenge.solvesNumber,
          solveStatus: 'unsolved', // Default to unsolved since API doesn't provide user-specific solve status
          deployedStatus:
            challenge.status === 'Deployed' ? 'deployed' : 'undeployed',
        })
      );

      resolve(transformedData);
    } catch (err) {
      console.error('Error fetching challenges metadata:', err);
      reject(err);
    }
  });
};

// Query functions
export const allChallengesMetadataQuery = () => ({
  queryKey: ['challenges'],
  queryFn: fetchAllChallengesMetadata,
});

export const challengeQuery = (name: string) => ({
  queryKey: ['challenge', name],
  queryFn: () => fetchChallenge(name),
  refetchOnWindowFocus: false,
});

export const challengeDetailsQuery = (id: string) => ({
  queryKey: ['challenge-details', id],
  queryFn: () => fetchChallengeDetails(id),
});
