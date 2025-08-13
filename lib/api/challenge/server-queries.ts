// Server-side query functions for prefetching
// These run on the server during SSR/prefetching

import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import {
  MOCK_CHALLENGES_DETAILS,
  MOCK_CHALLENGES,
} from './challenge-mock-data';
import { createAuthenticatedServerAxios } from '../axios';

// Mock fetcher functions for server-side prefetching
// * Comment these when using real API *//

const fetchChallengeServer = async (name: string): Promise<Challenge> => {
  try {
    const axios = await createAuthenticatedServerAxios();
    const res = await axios.get(`/api/info/challenges/${name}`);
    console.log('challenge server response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching challenge server:', err);
    throw err;
  }
};

const fetchChallengeDetailsServer = (id: string): Promise<ChallengeDetails> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_CHALLENGES_DETAILS.find((challenge) => challenge.id === id)!
      );
    }, 1000);
  });
};

// Real server fetcher functions
const fetchAllChallengesMetadataServer = async (): Promise<
  ChallengeMetadata[]
> => {
  try {
    const axios = await createAuthenticatedServerAxios();
    const res = await axios.get('/api/info/challenges');
    console.log('Challenge metadata server response:', res.data);

    // TODO: Migrate this to backend itself
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
    console.error('Error fetching challenges metadata server:', err);
    throw err;
  }
};

// Server Query functions (for prefetching)
export const allChallengesMetadataServerQuery = () => ({
  queryKey: ['challenges'],
  queryFn: fetchAllChallengesMetadataServer,
});

export const challengeServerQuery = (name: string) => ({
  queryKey: ['challenge', name],
  queryFn: () => fetchChallengeServer(name),
  refetchOnWindowFocus: false,
});

export const challengeDetailsServerQuery = (id: string) => ({
  queryKey: ['challenge-details', id],
  queryFn: () => fetchChallengeDetailsServer(id),
});
