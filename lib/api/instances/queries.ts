import { InstanceResponse, AdminInstanceResponse } from '@/lib/types/instance';
import { getAuthenticatedAxios } from '../axios';

// User instance queries

/**
 * Get all instances for the authenticated user
 */
const fetchUserInstances = async (): Promise<InstanceResponse[]> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get('/instances');
    console.log('User instances response:', res.data);
    return res.data || [];
  } catch (err) {
    console.error('Error fetching user instances:', err);
    throw err;
  }
};

/**
 * Get user's instance for a specific challenge
 */
const fetchUserInstanceByChallenge = async (
  challengeName: string
): Promise<InstanceResponse | null> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/instances/${challengeName}`);
    console.log('User instance for challenge response:', res.data);
    return res.data;
  } catch (err: unknown) {
    // 404 means no instance exists, which is valid
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status === 404) {
        return null;
      }
    }
    console.error('Error fetching user instance by challenge:', err);
    throw err;
  }
};

// Admin instance queries

/**
 * Get all active instances (admin only)
 */
const fetchAllInstances = async (): Promise<AdminInstanceResponse[]> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get('/admin/instances');
    console.log('All instances (admin) response:', res.data);
    return res.data || [];
  } catch (err) {
    console.error('Error fetching all instances:', err);
    throw err;
  }
};

/**
 * Get a specific instance by ID (admin only)
 */
const fetchInstanceById = async (
  instanceId: string
): Promise<AdminInstanceResponse | null> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get(`/admin/instances/${instanceId}`);
    console.log('Instance by ID (admin) response:', res.data);
    return res.data;
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status === 404) {
        return null;
      }
    }
    console.error('Error fetching instance by ID:', err);
    throw err;
  }
};

// Query function exports for TanStack Query

export const userInstancesQuery = () => ({
  queryKey: ['user-instances'],
  queryFn: fetchUserInstances,
  refetchInterval: 30000, // Refresh every 30 seconds to keep TTL updated
});

export const userInstanceByChallengeQuery = (challengeName: string) => ({
  queryKey: ['user-instance', challengeName],
  queryFn: () => fetchUserInstanceByChallenge(challengeName),
  refetchInterval: 10000, // Refresh every 10 seconds to keep TTL updated
});

export const adminAllInstancesQuery = () => ({
  queryKey: ['admin-instances'],
  queryFn: fetchAllInstances,
  refetchInterval: 15000, // Refresh every 15 seconds
});

export const adminInstanceByIdQuery = (instanceId: string) => ({
  queryKey: ['admin-instance', instanceId],
  queryFn: () => fetchInstanceById(instanceId),
});
