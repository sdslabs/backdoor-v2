import { getAuthenticatedAxios } from '../axios';

export const banUsers = async (userId: number[]): Promise<void> => {
  userId.forEach(async (userId) => {
    try {
      const axios = await getAuthenticatedAxios();
      const res = await axios.post(`/admin/users/ban/${userId.toString()}`);
    } catch (err) {
      throw err;
    }
  });
};
export const banUserQuery = () => {
  return {
    mutationFn: banUsers,
  };
};
