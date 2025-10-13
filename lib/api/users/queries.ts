import { UserInfo } from '@/lib/types';
import { getAuthenticatedAxios } from '../axios';

// MOCK API
// const fetchUsers = async (): Promise<UserInfo[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(MOCK_USERS);
//     }, 1000);
//   });
// };

const fetchUsers = async (): Promise<UserInfo[]> => {
  try {
    const axios = await getAuthenticatedAxios();
    const res = await axios.get('/api/info/users');
    return res.data;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const banUsers = async (userId: number[]): Promise<void> => {
  userId.forEach(async (userId) => {
    try {
      const axios = await getAuthenticatedAxios();
      const res = await axios.post(`/api/admin/users/ban/${userId.toString()}`);
    } catch (err) {
      throw err;
    }
  });
};

// Queries
export const userTableQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  };
};
