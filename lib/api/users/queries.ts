import { MOCK_USERS } from './mock-data';
import { UserInfo } from '@/lib/types';

// MOCK API
const fetchUsers = async (): Promise<UserInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USERS);
    }, 1000);
  });
};

// Queries
export const userTableQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  };
};

// For backward compatibility
export const userTableServerQuery = userTableQuery;
