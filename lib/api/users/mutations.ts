import { getAuthenticatedAxios } from '../axios';

export const banUsers = async (userIds: number[]): Promise<void> => {
  userIds.forEach(async (userId) => {
    try {
      const axios = await getAuthenticatedAxios();
      const res = await axios.post(`/admin/users/ban/${userId.toString()}`);
    } catch (err) {
      throw err;
    }
  });
};
export const unbanUsers = async (userIds: number[]): Promise<void> => {
  userIds.forEach(async (userId) => {
    try {
      const axios = await getAuthenticatedAxios();
      const res = await axios.post(`/admin/users/unban/${userId.toString()}`);
    } catch (err) {
      throw err;
    }
  });
};
export const banUserMutation = () => {
  return {
    mutationFn: banUsers,
  };
};
export const unbanUserMutation = () => {
  return {
    mutationFn: unbanUsers,
  };
};
