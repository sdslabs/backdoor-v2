import { Challenge, ChallengeDetails, ChallengeMetadata } from '@/lib/types';
import { getAuthenticatedAxios, getUnauthenticatedAxios } from '../axios';
import { API_BASE_URL } from '@/lib/constants';

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
    const res = await axios.get('/info/challenges');
    console.log('newww Challenge metadata response:', res.data);

    // TODO: Migrate this to swagger
    // Transform API response to match frontend interface
    const transformedData: ChallengeMetadata[] = res.data.map(
      (challenge: unknown) => {
        const challengeData = challenge as Record<string, unknown>;
        const instancedRaw =
          challengeData.instanced ?? challengeData.isInstanced;
        return {
          id: challengeData.id?.toString() || '',
          name: (challengeData.name as string) || '',
          tags: (challengeData.tags as string[]) || [],
          points: (challengeData.points as number) || 0,
          difficulty: challengeData.difficulty || 'medium',
          solvesNumber: (challengeData.solvesNumber as number) || 0,
          solveStatus: challengeData.solveStatus ? 'solved' : 'unsolved',
          isInstanced: instancedRaw === true,
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
    const res = await axios.get(`/info/challenge/${name}`);
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
    const res = await axios.get(`/info/challenge/${name}`);
    console.log('Challenge details response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching challenge details:', err);
    throw err;
  }
};

export const manageChallengeByName = async (vars: {
  name: string;
  action: string;
}): Promise<{ message: string }> => {
  try {
    const axios = await getAuthenticatedAxios();
    axios.defaults.headers['Content-Type'] = 'multipart/form-data';
    console.log(`Taking action ${vars.action} on ${vars.name}`);

    const res = await axios.post(`/manage/challenge/`, {
      name: vars.name,
      action: vars.action,
    });
    console.log('Challenge Action response:', res.data);
    return res.data;
  } catch (err) {
    console.error(
      `Error performing action(${vars.action}) on ${vars.name}:`,
      err
    );
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

export async function challengeDownloadAssets(
  challengeName: string,
  asset: string
) {
  const axios = getUnauthenticatedAxios();
  const url = `${API_BASE_URL}/info/download?challenge=${challengeName}&asset=${asset}`;
  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', asset);
    document.body.appendChild(link);
    link.click();
  });
}
