import { useQuery } from '@tanstack/react-query';
import { recentNotificationsQuery } from './client-queries';

export const useRecentNotifications = () => {
  return useQuery(recentNotificationsQuery());
};
