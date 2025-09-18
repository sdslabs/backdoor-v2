// Server-side query functions for prefetching
// These run on the server during SSR/prefetching

import { MOCK_USERS } from './mock-data';
import { UserInfo } from '@/lib/types';

// MOCK API
const fetchUsersServer = async (): Promise<UserInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USERS);
    }, 1000);
  });
};

// Queries
export const userTableServerQuery = () => ({
  queryKey: ['users'],
  queryFn: () => fetchUsersServer(),
});
