import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import { getAuthenticatedAxios } from '../axios';

// Mock fetcher functions
// * Comment these when using real API *//

// const fetchAllChallengesMetadata = (): Promise<ChallengeMetadata[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_CHALLENGES_METADATA);
//     }, 1000);
//   });
// };

// Real fetcher functions using unified axios
const fetchAllChallengesMetadata = async (): Promise<ChallengeMetadata[]> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get('/api/info/challenges');
    console.log('newww Challenge metadata response:', res.data);

    // TODO: Migrate this to swagger
    // Transform API response to match frontend interface
    const transformedData: ChallengeMetadata[] = res.data.map(
      (challenge: unknown) => {
        const challengeData = challenge as Record<string, unknown>;
        return {
          id: challengeData.id?.toString() || '',
          name: (challengeData.name as string) || '',
          tags: (challengeData.tags as string[]) || [],
          points: (challengeData.points as number) || 0,
          difficulty: challengeData.difficulty || 'medium',
          solvesNumber: (challengeData.solvesNumber as number) || 0,
          solveStatus: challengeData.solveStatus ? 'solved' : 'unsolved',
          deployedStatus:
            (challengeData.status as string) === 'Deployed'
              ? 'deployed'
              : 'undeployed',
        };
      }
    );

    return transformedData;
  } catch (err) {
    console.error('Error fetching challenges metadata:', err);
    throw err;
  }
};

const fetchChallenge = async (name: string): Promise<Challenge> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/api/info/challenge/${name}`);
    console.log('Challenge response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching challenge:', err);
    throw err;
  }
};

const fetchChallengeDetails = async (
  name: string
): Promise<ChallengeDetails> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/api/info/challenge/${name}`);
    console.log('Challenge details response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching challenge details:', err);
    throw err;
  }
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

export const challengeDetailsQuery = (name: string) => ({
  queryKey: ['challenge-details', name],
  queryFn: () => fetchChallengeDetails(name),
});
