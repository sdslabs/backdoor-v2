import { InstanceResponse, HTTPPlainResp, CheckSolutionResponse } from '@/lib/types/instance';
import { getAuthenticatedAxios } from '../axios';

// User instance mutations

/**
 * Spawn a new instance for a challenge
 */
export const spawnInstance = async (
  challengeName: string
): Promise<InstanceResponse> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.post(`/instances/${challengeName}/spawn`);
    console.log('Spawn instance response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error spawning instance:', err);
    throw err;
  }
};

/**
 * Check if a challenge has been solved by running the check script in the container
 * @param challengeId - The challenge ID
 * @param instanceId - The instance ID
 */
export const checkSolution = async (
  challengeId: string,
  instanceId: string
): Promise<CheckSolutionResponse> => {
  try {
    const axios = await getAuthenticatedAxios();
    const formData = new FormData();
    formData.append('chall_id', challengeId);
    formData.append('instance_id', instanceId);
    const res = await axios.post('/check/challenge', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Check solution response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error checking solution:', err);
    throw err;
  }
};

/**
 * Extend an instance's lifetime
 * @param challengeName - The challenge name
 * @param seconds - Number of seconds to extend (default: 300)
 */
export const extendInstance = async (
  challengeName: string,
  seconds: number = 300
): Promise<InstanceResponse> => {
  try {
    const axios = await getAuthenticatedAxios();
    const formData = new FormData();
    formData.append('seconds', seconds.toString());
    const res = await axios.post(
      `/instances/${challengeName}/extend`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Extend instance response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error extending instance:', err);
    throw err;
  }
};

/**
 * Kill/destroy a user's instance
 */
export const killInstance = async (
  challengeName: string
): Promise<HTTPPlainResp> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.delete(`/instances/${challengeName}`);
    console.log('Kill instance response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error killing instance:', err);
    throw err;
  }
};

// Admin instance mutations

/**
 * Kill a specific instance by ID (admin only)
 */
export const adminKillInstance = async (
  instanceId: string
): Promise<HTTPPlainResp> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.delete(`/admin/instances/${instanceId}`);
    console.log('Admin kill instance response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error killing instance (admin):', err);
    throw err;
  }
};

/**
 * Kill all instances for a specific user (admin only)
 */
export const adminKillUserInstances = async (
  userId: string
): Promise<HTTPPlainResp> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.delete(`/admin/instances/user/${userId}`);
    console.log('Admin kill user instances response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error killing user instances (admin):', err);
    throw err;
  }
};

/**
 * Kill all instances for a specific challenge (admin only)
 */
export const adminKillChallengeInstances = async (
  challengeName: string
): Promise<HTTPPlainResp> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.delete(`/admin/instances/challenge/${challengeName}`);
    console.log('Admin kill challenge instances response:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error killing challenge instances (admin):', err);
    throw err;
  }
};
